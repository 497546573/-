<template>
  <div class="userInterface">
    <div class="leftNavMenu">
      <el-col :span="12">
        <p class="leftNavMenu-title">图书管理系统</p>

        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3">
                <router-link to="/userInterface/userinfo">用户信息管理</router-link>
              </el-menu-item>
              <el-menu-item index="4">
                <router-link to="/userInterface/bookstype">书籍类型管理</router-link>
              </el-menu-item>
              <el-menu-item index="5">
                <router-link to="/userInterface/booksManager">书籍管理</router-link>
              </el-menu-item>
              <el-menu-item index="6">
                <router-link to="/userInterface/readManager">借阅管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>

      </el-col>
    </div>
    <div class="right">
      <!--   右侧头部   -->
      <div class="right-top">

      </div>
      <div class="right-body">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push('/userInterface/home')
    }
  }
}
</script>

<style scoped lang="less">
.userInterface {
  display: flex;
  width: 100%;
  height: 100%;

  .leftNavMenu {
    height: 100%;
    flex: 1;


    .el-col {
      width: 270px;
      height: 100%;
      background-color: #545c64;

      .leftNavMenu-title {
        font-size: 36px;
        text-align: center;
        color: white;
      }

      .el-menu-item a {
        display: block;
        color: white;
        text-decoration: none;
      }
    }

  }

  .right {
    padding-left: 1px;
    flex: 8;
    height: 100%;
    background-color: antiquewhite;

    .right-top {
      height: 15%;
      background-color: blue;
    }

    .right-body {
      padding: 20px;
      height: 85%;
    }
  }


}
</style>