<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>


import Login from "@/components/Login";
import UserInterface from "@/components/UserInterface";

export default {
  components: {
    Login,
    UserInterface
  }
}
</script>

<style lang="less">
@import "assets/css/start.css";
#app{
  width: 100%;
  height: 100%;
}
</style>
