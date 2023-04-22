<template>
  <div class="login">
    <div class="login-in">
      <p>图书管理系统</p>
      <div class="form-group">
        <input type="email" class="form-control username" id="exampleInputEmail1"
               placeholder="请输入用户名" v-model.trim="username">
      </div>
      <div class="form-group">
        <input type="password" class="form-control password" id="exampleInputPassword1"
               placeholder="请输入密码" v-model.trim="password">
      </div>
      <el-button type="submit" class="btn btn-default btn-primary"
                 @click="login" :plain="true">登录
      </el-button>
      <el-button type="submit" class="btn btn-default btn-primary"
                 @click="register" :plain="true">注册
      </el-button>
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
          <el-button :plain="true" type="primary" @click="registerUserinfo">提交</el-button>
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
      username: '',
      password: '',
      user:'',
      passwd: '',
    }
  },
  methods: {
    register() {
      const join = document.querySelector('.join');
      join.style.visibility = "visible";
    },
    out() {
      const join = document.querySelector('.join');
      join.style.visibility = "hidden";
    },
    reset() {
      this.user = ''
      this.passwd = ''
    },



    login() {
      axios({
        method: 'get',
        url: '/login',
        params: {
          user: this.username,
          passwd: this.password
        }
      }).then((res) => {
        console.log(res)
        if (res.data.data.length === 1) {
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          localStorage.setItem('token',res.data.token)
          if (res.data.data[0].user === 'root') {
            this.$router.push('/userInterface')
          } else {
            localStorage.setItem('username',this.username)
            this.$router.push('/clientInterface')
          }
        } else {
          this.$message.error('登录失败，请重新重试')
        }
      })


    },
    registerUserinfo() {
      axios({
        method:'post',
        url:'/register',
        data:{
          user:this.user,
          passwd:this.passwd
        }
      }).then((res)=>{
        if (res.data.status === 0){
          const join = document.querySelector('.join');
          join.style.visibility = "hidden";
          this.user = ''
          this.passwd = ''
          this.$message({
            type:'success',
            message:'用户注册成功'
          })
        }else {
          this.$message.error('用户创建失败请重新尝试')
        }
      })
    },
  },

}
</script>

<style scoped lang="less">
.login {
  height: 100%;
  width: 100%;
  text-align: center;
  background: url("./login.png") no-repeat;
  background-size: cover;

  p {
    font-size: 40px;
    padding-bottom: 40px;
  }

  .login-in {
    padding-top: 150px;
    margin: 0 auto;
    width: 800px;
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
}
</style>