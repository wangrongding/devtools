<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { translate } from "@/api/index";
const state = reactive({
  show: false,
  message: "Hello World",
  test() {
    state.show = !state.show;
    translate({
      q: "Hello World",
      from: "Auto",
      to: "Auto",
    }).then(() => {
      ElMessage({
        type: "success",
        message: "Translation Successful",
      });
    });
  },
});
</script>

<template>
  <div class="main">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <div>
      <el-button type="primary" size="default" @click="state.test">
        {{ state.show }}
      </el-button>
    </div>
  </div>
</template>

<style>
.main {
  width: 500px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
}
</style>
