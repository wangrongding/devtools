<template>
  <div class="easy-dialog">
    <el-dialog
      :model-value.sync="dialogForm.dialogShow"
      :title="dialogForm.title"
      :width="dialogForm.width"
      :fullscreen="dialogForm.fullscreen"
      :modal="dialogForm.modal"
      :top="dialogForm.top"
      :center="dialogForm.center"
      :append-to-body="dialogForm.appendToBody"
      :lock-scroll="dialogForm.lockScroll"
      :custom-class="dialogForm.customClass"
      :open-delay="dialogForm.openDelay"
      :close-delay="dialogForm.closeDelay"
      :close-on-click-modal="dialogForm.closeOnClickModal"
      :close-on-press-escape="dialogForm.closeOnPressEscape"
      :show-close="dialogForm.showClose"
      :destroy-on-close="dialogForm.destroyOnClose"
      :before-close="dialogForm.beforeClose"
      @open="dialogForm.open"
      @opened="dialogForm.opened"
      @close="dialogForm.close"
      @closed="dialogForm.closed"
    >
      <!-- 内容区域 -->
      <slot name="dialogContent"></slot>

      <template #footer v-if="!dialogForm.hiddenFooter">
        <span>
          <el-button @click="dialogForm.cancelFunction()" v-if="dialogForm.cancelFunction">
            {{ dialogForm.cancelText || "取 消" }}
          </el-button>
          <el-button
            type="primary"
            @click="dialogForm.confirmFunction()"
            v-if="dialogForm.confirmFunction"
          >
            {{ dialogForm.confirmText || "确 定" }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  dialogForm: {
    type: Object,
    default: () => {
      return {
        dialogShow: false, //是否显示 Dialog，支持 .sync 修饰符
        title: "", //Dialog 的标题，也可通过具名 slot传入
        // width: "", //Dialog 的宽度,默认50%
        center: false, //是否对头部和底部采用居中布局
        fullscreen: false, //是否为全屏 Dialog
        // top, //Dialog CSS 中的 margin-top 值,默认15vh
        modal: true, //是否需要遮罩层
        lockScroll: true, //是否在 Dialog 出现时将 body 滚动锁定
        // customClass, //Dialog 的自定义类名
        showClose: true, //是否显示关闭按钮
        closeOnClickModal: false, //是否可以通过点击 modal 关闭 Dialog
        closeOnPressEscape: false, //是否可以通过按下 ESC 关闭 Dialog
        destroyOnClose: true, //关闭时销毁 Dialog 中的元素
        appendToBody: false, //Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
        modalAppendToBody: false, //遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
        beforeClose: (done: any) => {
          done();
        }, //关闭前的回调，会暂停 Dialog 的关闭,function(done)，done 用于关闭 Dialog
        //============回调事件 ↓
        open: () => {}, //Dialog 打开的回调
        opened: () => {}, //Dialog 打开动画结束时的回调
        close: () => {}, //Dialog 关闭的回调
        closed: () => {}, //Dialog 关闭动画结束时的回调
      };
    },
  },
});

//确定回调
function dialogConfirm() {
  props.dialogForm.dialogConfirm && props.dialogForm.dialogConfirm();
}
//取消回调
function dialogCancel() {
  // props.dialogForm.dialogCancel && props.dialogForm.dialogCancel();
}
</script>

<style scoped lang="scss"></style>
