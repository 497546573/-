<template>
  <el-container class="clientInterface">
    <el-header class="clientHeader">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="$router.push('/clientInterface/personal')">用户中心</el-menu-item>
        <el-menu-item index="2" @click="$router.push('/clientInterface/books')">书籍中心</el-menu-item>
        <el-button :plain="true" class="exit" type="danger" round
        @click="exitUser">退出</el-button>
      </el-menu>
    </el-header>

    <el-main class="clientMain">
        <keep-alive>
          <router-view>
          </router-view>
        </keep-alive>
    </el-main>
  </el-container>
</template>

<script>
export default {
  methods:{
    exitUser(){
      this.$router.replace('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
  }
}
</script>

<style scoped lang="less">
.clientInterface {
  .clientHeader {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 100%;

    .el-row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .el-col {
      border-radius: 4px;
    }

    .bg-purple-dark {
      background: #99a9bf;
    }

    .bg-purple {
      background: #d3dce6;
    }

    .bg-purple-light {
      background: #e5e9f2;
    }

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }

    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }

    .el-menu-demo {
      padding-left: 100px;

      .exit {
        float: right;
        margin-top: 10px;
        margin-right: 100px;
      }
    }


  }

  .clientMain {
    margin-top: 70px;
  }
}

</style>