<template>
  <div class="userinfo-content">
    <div class="userinfo-top">
      <el-row>
        <el-button type="primary" @click="add">添加</el-button>
      </el-row>
    </div>

    <div class="userinfo-body">
      <table class="table table-hover table-bordered table-striped" style="text-align: center">
        <tr class="first-tr">
          <th style="width: 300px;">ID</th>
          <th style="width: 300px;">用户</th>
          <th style="width: 300px;">密码</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,i) in pageArr" :key="i">
          <td>{{ item.id }}</td>
          <td>{{ item.user }}</td>
          <td>{{ item.passwd }}</td>
          <td>
            <el-row>
              <el-button type="primary" @click="updata($event)">修改</el-button>
              <el-button type="primary" @click="deletebtn($event)">删除</el-button>
            </el-row>
          </td>
        </tr>
      </table>
    </div>

    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=pageNum
          :page-sizes="[5, 7]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=arrlength>
      </el-pagination>
    </div>

    <div class="join" style="visibility: hidden">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户">
          <el-input v-model.trim="user"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model.trim="passwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="adduserinfo">提交</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="out">取消</el-button>
        </el-form-item>
      </el-form>
    </div>


    <div class="join_updata" style="visibility: hidden">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="ID" class="join_id">
          <el-input v-model.trim="clickElementID" class="input-ID" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户">
          <el-input v-model.trim="user"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model.trim="passwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary"
                     @click="updateUserInfo">提交
          </el-button>
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
  data() {
    return {
      arrlength: 0,
      user: '',
      passwd: '',
      pageNum: 1,
      pageSize: 5,
      pageArr: [],
      clickElementID: 0,
      deleteElementID:0,
    }
  },
  methods: {
    add() {
      const join = document.querySelector('.join');
      join.style.visibility = "visible";
    },
    out() {
      const join = document.querySelector('.join');
      const join_updata = document.querySelector('.join_updata');
      join.style.visibility = "hidden";
      join_updata.style.visibility = "hidden";
    },
    reset() {
      this.type = '';
      this.typeCount = ''
      this.user = ''
      this.passwd = ''
    },
    /*   每页多少条  */
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserinfoList()
    },
    /*   当前页   */
    handleCurrentChange(val) {
      this.pageNum = val
      this.getUserinfoList()
    },
    updata(e) {
      const joinId = document.querySelector('.join_updata');
      joinId.style.visibility = "visible";

      this.clickElementID = e.currentTarget.parentElement
          .parentElement.parentElement.firstElementChild.innerHTML
    },
    deletebtn(event){
      this.deleteElementID = event.currentTarget.parentElement
          .parentElement.parentElement.firstElementChild.innerHTML
      axios({
        method:'post',
        url:'/deleteUserinfo',

        data:{
          id:this.deleteElementID
        },
        config:{
          headers:{
            'Authorization' : window.localStorage.getItem('token')
          }
        }
      }).then((res)=>{
        if (res.data.status === 0){
          this.$message({
            type:'success',
            message:'用户删除成功'
          })
          this.getUserinfoList()
        }else {
          this.$message.error('用户信息删除失败，请重试')
        }
      })
    },
    updateUserInfo() {
      axios({
        method:'post',
        url:'/updateUserinfo',
        data:{
          id:this.clickElementID,
          user:this.user,
          passwd:this.passwd
        },
        config:{
          headers:{
            'Authorization' : window.localStorage.getItem('token')
          }
        }
      }).then((res)=>{
        if (res.data.status === 0) {
          this.getUserinfoList()
          const join_updata = document.querySelector('.join_updata');
          join_updata.style.visibility = "hidden";
          this.user = ''
          this.passwd = ''
          this.$message({
            type:'success',
            message:'用户信息修改成功'
          })
        }else {
          this.$message.error('用户信息修改失败，请重新尝试')
        }
      })


    },
    getUserinfo() {
      axios.get('/getuserinfo',
          {
            headers:{
              'Authorization' : window.localStorage.getItem('token')
            }
          }
      ).then((res) => {
        console.log(res)
        this.arrlength = res.data.data.length

      })
    },
    getUserinfoList() {
      axios({
        method: 'get',
        url: '/getuserinfo/limit',
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        },
        config:{
          headers:{
            'Authorization' : window.localStorage.getItem('token')
          }
        }
      }).then((res) => {
        console.log(res)
        this.pageArr = res.data.data
      })
    },
    adduserinfo() {
      if (this.user === '' || this.passwd === '') {
        this.$message.error('信息不可以为空')
        return
      }

      axios({
        method: 'post',
        url: '/adduserinfo',
        data: {
          user: this.user,
          passwd: this.passwd
        },
        config:{
          headers:{
            'Authorization' : window.localStorage.getItem('token')
          }
        }
      }).then((res) => {
        if (res.data.status === 0) {
          const join = document.querySelector('.join');
          join.style.visibility = "hidden";

          this.$message({
            type: 'success',
            message: '成功'
          })
          this.reset()
          this.getUserinfo()
          this.getUserinfoList()
        } else {
          this.$message.error('用户创建失败，请重新创建')
        }
      })
    },
  },
  created() {
    this.getUserinfo()
    this.getUserinfoList()
  },
  updated() {
    this.getUserinfoList()
    this.getUserinfo()
  }
}
</script>

<style scoped lang="less">
.userinfo-content {
  .userinfo-top {
    margin-bottom: 10px;
  }

  .userinfo-body {
    table {
      .first-tr {
        th {
          font-size: 18px;
        }
      }

      tr:nth-child(n+2) {
        line-height: 40px;
        font-size: 20px;
      }
    }
  }

  .join {
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

  .join_updata {
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