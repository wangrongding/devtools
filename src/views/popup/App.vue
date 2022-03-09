<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Form from "@/components/element/Form.vue";
import { translate } from "@/api/index";
const state = reactive({
  show: false,
  //表单参数
  formParams: {
    data: { text: "", content: "" } as any, // 表单数据对象
    formList: {
      text: {
        type: "textarea",
        mode: "textarea",
        label: "查询: ",
        width: "100%",
        rows: 5,
        placeholder: "请输入要翻译的内容",
      },
      content: {
        type: "textarea",
        mode: "textarea",
        label: "译文: ",
        width: "100%",
        rows: 5,
        placeholder: "翻译的结果",
      },
    },
    rules: {},
    // labelWidth: "0px",
    // inline: true,
    submit: {
      submitText: "查询",
      submitFunction: query,
      reset: true,
    },
  },
});

function query() {
  state.show = !state.show;
  translate({
    q: state.formParams.data.text,
    from: "Auto",
    to: "Auto",
  }).then((res): any => {
    console.log("🚀🚀🚀 / res", res);
    state.formParams.data.content = res.translation[0];
    // ElMessage({
    //   type: "success",
    //   message: "Translation Successful",
    // });
  });
}
</script>

<template>
  <div class="main">
    <img alt="Vue logo" style="width: 30px" src="../../assets/logo.png" />
    <div>
      <Form :formParams="state.formParams"></Form>
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
  padding: 20px;
  border-radius: 30px;
}
</style>
