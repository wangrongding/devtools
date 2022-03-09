<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  formParams: {
    type: Object,
    default: () => {
      return {
        data: {}, // 表单数据对象
        formList: [],
        rules: {}, // 表单验证规则
        inline: false, // 行内表单模式
        labelPosition: "right", // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width 可选值：right/left/top
        labelWidth: "80px", // 表单域标签的宽度 支持 auto
        labelSuffix: "", // 表单域标签的后缀
        hideRequiredAsterisk: false, // 是否显示必填字段的标签旁边的红色星号
        showMessage: true, // 是否显示校验错误信息
        inlineMessage: false, // 是否以行内形式展示校验信息
        statusIcon: false, // 是否在输入框中显示校验结果反馈图标
        validateOnRuleChange: true, // 是否在 rules 属性改变后立即触发一次验证
        size: "", // 用于控制该表单内组件的尺寸 可选值：medium / small / mini
        disabled: false, // 是否禁用该表单内的所有组件
      };
    },
    required: true,
  },
});
const FormDom = ref<any>();

function getOption(value: any, defaultValue: any) {
  return value === void 0 ? defaultValue : value;
}
//提交表单
function submitForm(submit: any) {
  console.log(props.formParams.data);
  FormDom.value.validate((valid: any) => {
    if (valid) {
      submit && submit();
    } else {
      console.log("error submit!!");
      return false;
    }
  });
}
//重置表单
function resetForm() {
  FormDom.value.resetFields();
}
//取消
function cancelSubmit(cancel: any) {
  cancel && cancel();
}

const formStyle = ref({
  textAlign: props.formParams.align || "left",
  submitButton: props.formParams.align ? "block" : "inline-block",
  formWidth: props.formParams.align ? "100%" : "",
});
</script>
<template>
  <div class="form-container">
    <el-form
      ref="FormDom"
      v-loading="formParams.loading"
      :model="formParams.data"
      :rules="formParams.rules"
      :inline="formParams.inline"
      :label-position="formParams.labelPosition"
      :label-width="formParams.labelWidth"
      :label-suffix="formParams.labelSuffix"
      :hide-required-asterisk="formParams.hideRequiredAsterisk"
      :show-message="formParams.showMessage"
      :inline-message="formParams.inlineMessage"
      :status-icon="formParams.statusIcon"
      :validate-on-rule-change="formParams.validateOnRuleChange"
      :size="formParams.size"
      :disabled="formParams.disabled"
    >
      <el-form-item
        v-for="(itemForm, key) in formParams.formList"
        v-show="getOption(itemForm.isShow, true)"
        :key="key"
        :prop="key.toString()"
        :label="itemForm.label"
        :style="itemForm.style"
      >
        <el-radio-group
          v-if="itemForm.type === 'radio'"
          v-model="formParams.data[key]"
        >
          <el-radio
            v-for="(radioOption, index) in itemForm.radioOptions"
            :key="index"
            :label="radioOption.value"
          >
            {{ radioOption.text }}
          </el-radio>
        </el-radio-group>
        <el-checkbox
          v-if="itemForm.type === 'checkbox'"
          v-model="formParams.data[key]"
          :true-label="
            itemForm.checkboxOption.trueLabel != undefined
              ? itemForm.checkboxOption.trueLabel
              : true
          "
          :false-label="
            itemForm.checkboxOption.falseLabel != undefined
              ? itemForm.checkboxOption.falseLabel
              : false
          "
        >
          {{
            itemForm.checkboxOption.label
              ? itemForm.checkboxOption.label
              : itemForm.checkboxOption
          }}
        </el-checkbox>
        <el-checkbox-group
          v-if="itemForm.type === 'checkboxGroup'"
          v-model="formParams.data[key]"
        >
          <el-checkbox
            v-for="(checkboxOption, index) in itemForm.checkboxOptions"
            :key="index"
            :true-label="checkboxOption.trueLabel || true"
            :false-label="checkboxOption.falseLabel || false"
            :label="
              checkboxOption.label ? checkboxOption.label : checkboxOption
            "
          />
        </el-checkbox-group>
        <el-input
          v-if="['text', 'textarea'].includes(itemForm.type)"
          v-model="formParams.data[key]"
          :type="itemForm.mode"
          :maxlength="itemForm.maxlength"
          :show-word-limit="!!itemForm.maxlength"
          :placeholder="itemForm.placeholder"
          :disabled="itemForm.disabled"
          :style="`${itemForm.width ? 'width:' + itemForm.width : ''}`"
          :rows="itemForm.rows"
          clearable
          :show-password="itemForm.isPassword"
        />
        <el-input
          v-if="itemForm.type === 'number'"
          v-model.number="formParams.data[key]"
          :type="'text'"
          :maxlength="itemForm.maxlength"
          :show-word-limit="!!itemForm.maxlength"
          :placeholder="itemForm.placeholder"
          :disabled="itemForm.disabled"
          clearable
          :show-password="itemForm.isPassword"
        />
        <el-input-number
          v-if="itemForm.type === 'input-number'"
          v-model="formParams.data[key]"
        />
        <el-select
          v-if="itemForm.type === 'select'"
          v-model="formParams.data[key]"
          :multiple="itemForm.multiple"
          :multiple-limit="itemForm.multipleLimit"
          :style="`${itemForm.width ? 'width:' + itemForm.width : ''}`"
          clearable
          :disabled="itemForm.disabled"
          :placeholder="itemForm.placeholder"
          filterable
          @change="itemForm.onChange"
        >
          <template
            v-if="
              itemForm.selectOptions[0] && itemForm.selectOptions[0].options
            "
          >
            <el-option-group
              v-for="selectOption in itemForm.selectOptions"
              :key="selectOption.label"
              :label="selectOption.label"
            >
              <el-option
                v-for="item in selectOption.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-option-group>
          </template>
          <template v-else>
            <el-option
              v-for="(selectOption, index) in itemForm.selectOptions"
              :key="index"
              :label="
                itemForm.customLabelValue
                  ? selectOption[itemForm.customLabelValue.label]
                  : selectOption.label
              "
              :value="
                itemForm.customLabelValue
                  ? selectOption[itemForm.customLabelValue.value]
                  : selectOption.value
              "
            />
          </template>
        </el-select>
        <el-cascader
          v-if="itemForm.type === 'cascader'"
          v-model="formParams.data[key]"
          :options="itemForm.cascaderOptions"
          :disabled="itemForm.disabled"
          :placeholder="itemForm.placeholder"
          @change="itemForm.onChange"
          :style="`${itemForm.width ? 'width:' + itemForm.width : ''}`"
          clearable
          filterable
        />
        <el-switch
          v-if="itemForm.type === 'switch'"
          v-model="formParams.data[key]"
          :active-text="itemForm.activeText"
          :inactive-text="itemForm.inactiveText"
        />
        <el-slider
          v-if="itemForm.type === 'slider'"
          v-model="formParams.data[key]"
        />
        <el-time-select
          v-if="itemForm.type === 'time-select'"
          :disabled="itemForm.disabled"
          v-model="formParams.data[key]"
          :placeholder="itemForm.placeholder"
        />
        <el-time-picker
          :disabled="itemForm.disabled"
          v-if="itemForm.type === 'time-picker'"
          v-model="formParams.data[key]"
          :placeholder="itemForm.placeholder"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :is-range="itemForm.isRange"
          :value-format="formParams.valueFormat || 'HH:mm:ss'"
        />
        <el-date-picker
          v-if="itemForm.type === 'date-picker'"
          :disabled="itemForm.disabled"
          v-model="formParams.data[key]"
          :placeholder="itemForm.placeholder"
          :disabled-date="itemForm.disabledDate"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :style="'width:100%'"
          :type="itemForm.mode"
          :value-format="itemForm.valueFormat || 'YYYY-MM-DD'"
          :default-time="itemForm.defaultTime"
          @change="itemForm.onChange"
        />
        <el-rate
          v-if="itemForm.type === 'rate'"
          v-model="formParams.data[key]"
        />
        <el-color-picker
          v-if="itemForm.type === 'color-picker'"
          v-model="formParams.data[key]"
        />
        <el-transfer
          v-if="itemForm.type === 'transfer'"
          v-model="formParams.data[key]"
          :data="itemForm.transferData"
        />
        <!-- id="richText" -->
        <div
          v-if="itemForm.type === 'richText'"
          :id="key.toString()"
          ref="richText"
        />
        <slot
          v-if="itemForm.type === 'customItem'"
          :name="itemForm.name ? itemForm.name : 'customItem'"
          :itemForm="itemForm"
          :formDate="formParams.data"
          :itemKey="key"
        />
      </el-form-item>

      <el-form-item v-if="formParams.submit">
        <el-button
          type="primary"
          @click="submitForm(formParams.submit.submitFunction)"
          :disabled="formParams.submit.disabled"
        >
          {{ formParams.submit.submitText || "提交" }}
        </el-button>
        <el-button
          v-if="formParams.submit.reset"
          type="info"
          @click="resetForm"
        >
          重置
        </el-button>
        <el-button
          v-if="formParams.submit.cancel"
          type="info"
          @click="cancelSubmit(formParams.submit.cancelFunction)"
        >
          {{ formParams.submit.cancelText || "取消" }}
        </el-button>
      </el-form-item>
      <slot name="buttonGroup" />
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.form-container {
  // text-align: v-bind("formStyle.textAlign");
  .el-form {
    width: v-bind("formStyle.formWidth");
  }
  .el-form-item:last-child {
    display: v-bind("formStyle.submitButton");
    // margin: 0 auto;
    text-align: center;
  }
}
.form-item-box {
  width: 50%;
}
.el-select,
.el-cascader,
.el-time-select,
.el-time-picker,
.el-date-picker {
  width: 100%;
}
.el-form {
  // margin-top: 20px;
}
//行内表单
.el-form--inline {
  display: inline-block;
  // :deep .el-form-item__label-wrap {
  //   margin-left: 0 !important;
  // }
}
#richText {
  z-index: 2000;
}
</style>
