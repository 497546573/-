<template>
  <div class="personal">
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">{{ username }}</el-descriptions-item>
      <el-descriptions-item label="密码">{{ password }}</el-descriptions-item>
    </el-descriptions>
    <el-button round type="success" class="updataPasswd"
               @click="updataPasswd">修改密码
    </el-button>
    <div class="personal-body">
      <table class="table table-hover table-bordered table-striped" style="text-align: center">
        <tr class="first-tr">
          <th>书名</th>
          <th>编号</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,i) in borrowBooksArr" :key="i">
          <td>{{ item.book_name }}</td>
          <td class="book-id">{{ item.book_id }}</td>
          <td>{{ item.begin_time.split('T')[0] }}</td>
          <td>{{ item.end_time.split('T')[0] }}</td>
          <td>
            <el-button round type="primary" @click="returnBooks($event)">还书</el-button>
          </td>
        </tr>
      </table>
    </div>

    <div class="join" style="visibility: hidden">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model.trim="username" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model.trim="inputPasswd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="finishUpdatePasswd">提交</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="out">取消</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  methods: {
    updataPasswd() {
      const join = document.querySelector('.join');
      join.style.visibility = "visible";
    },
    out() {
      const join = document.querySelector('.join');
      join.style.visibility = "hidden";
    },
    reset() {
      this.inputPasswd = ''
    },

    getPersonal() {
      axios({
        method: 'get',
        url: '/personal',
        params: {
          user: localStorage.getItem('username')
        }
      }).then((res) => {
        this.username = res.data.data[0].user
        this.password = res.data.data[0].passwd
        this.userID = res.data.data[0].id
      })
    },
    getPersonalMsg() {
      axios({
        method: 'get',
        url: '/personal/getmsg',
        params: {
          id: this.userID
        }
      }).then((res) => {
       this.borrowBooksArr = res.data.data
      })
    },
    returnBooks(e) {
      const element = e.currentTarget.parentElement.parentElement
          .querySelector('.book-id').innerHTML
      this.$confirm('确定要还书?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'post',
          url: '/personal/returnbooks',
          data: {
            user_id: this.userID,
            book_id: element
          }
        }).then((res) => {
          if (res.data.status === 0) {
            this.$message({
              type: 'success',
              message: '还书成功!'
            });
          } else {
            this.$message.error('还书失败，请重新尝试')
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消还书'
        });
      });
    },
    finishUpdatePasswd() {
      axios({
        method: 'get',
        url: '/personal/updatepasswd',
        params: {
          id: this.userID,
          passwd: this.inputPasswd
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.out()
          this.reset()
          this.$message({
            type: 'success',
            message: '密码修改成功'
          })
        } else {
          this.$message.error('密码修改失败，请重试')
        }

      })
    },

  },
  data() {
    return {
      username: '',
      password: 0,
      userID: 0,
      borrowBooksArr: [],
      inputPasswd: ''
    }
  },
  created() {
    this.getPersonal()

  },
  updated() {
    this.getPersonalMsg()
  }

}
</script>

<style scoped lang="less">
.personal {
  padding: 10px 100px;

  .updataPasswd {
    margin-top: 10px;
  }

  .personal-body {
    margin-top: 20px;
  }

  .join {
    z-index: 99;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #cccc;

    .demo-ruleForm {
      position: absolute;
      display: block;
      width: 600px;
      height: 300px;
      left: 50%;
      top: 50%;
      padding-top: 30px;
      padding-right: 20px;
      background-color: white;
      text-align: center;
      transform: translate(-50%, -50%);
    }
  }
}

</style>