<script setup lang="ts">
import { ref } from "vue";
import type { ElTable } from "element-plus";
const tableDom = ref<InstanceType<typeof ElTable>>();
defineExpose({
  tableDom,
});
const props = defineProps({
  tableParams: {
    type: Object,
    default: {
      data: [],
      columnProps: [
        /* {
          label: "名称",
          prop: "name",
          formatter: (a: any, b: any, c: any) => {
            return c == "0" ? "其它" : c == "1" ? "后台用户" : "手机端用户";
          },
        }, */
      ],
      tempSelectList: [],
    },
  },
});

const emit = defineEmits(["selectionChange"]);

const getOption = (value: any, defaultValue: any) => {
  return value === void 0 ? defaultValue : value;
};
const handleRowClick = (row: any, column: any, event: any) => {
  console.log("row:", row);
};

const selectionChange = (val: any) => {
  //选中需要确认后赋值
  console.log("选中的行：", val, val.length);
  props.tableParams.selectList = val;
  emit("selectionChange", val);
};
</script>
<template>
  <div>
    <el-table
      :ref="tableParams.ref || 'tableDom'"
      v-loading="tableParams.loading"
      :data="tableParams.data"
      :height="tableParams.height"
      :max-height="tableParams.maxHeight"
      :stripe="tableParams.stripe"
      :border="getOption(tableParams.border, true)"
      :size="tableParams.size"
      :fit="tableParams.fit || true"
      :show-header="getOption(tableParams.showHeader, true)"
      :highlight-current-row="getOption(tableParams.highlightCurrentRow, true)"
      :empty-text="tableParams.emptyText"
      :default-expand-all="tableParams.defaultExpandAll"
      :expand-row-keys="tableParams.expandRowKeys"
      :default-sort="tableParams.defaultSort"
      :tooltip-effect="tableParams.tooltipEffect"
      :show-summary="tableParams.showSummary"
      :sum-text="tableParams.sumText"
      :summary-method="tableParams.summaryMethod"
      :span-method="tableParams.spanMethod"
      :select-on-indeterminate="tableParams.selectOnIndeterminate"
      :indent="tableParams.indent"
      :lazy="tableParams.lazy"
      :load="tableParams.load"
      :tree-props="tableParams.treeProps"
      :header-cell-style="{
        background: 'rgba(197, 255, 246, 1)',
        fontWeight: 'bold',
        color: '#000',
        padding: '5px',
      }"
      :cell-style="{ height: '40px', padding: '5px', fontSize: '14px', boxSizing: 'content-box' }"
      :row-key="tableParams.rowKey"
      :row-style="tableParams.rowStyle"
      @row-click="handleRowClick"
      @selection-change="selectionChange"
    >
      <template v-if="typeof tableParams.emptyText === 'boolean'" #empty>
        <slot name="empty" />
      </template>
      <el-table-column
        v-for="(item, index) in tableParams.columnProps"
        :key="index"
        :type="item.type"
        :align="getOption(item.align, 'center')"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :fixed="item.fixed"
        :formatter="item.formatter"
      >
        <template v-if="item.slots && item.slots.header" #header="{ column, $index }">
          <slot :name="item.slots.header" :column="column" :index="$index" />
        </template>
        <template v-if="item.slots && item.slots.default" #default="{ row, column, $index }">
          <slot :name="item.slots.default" :row="row" :column="column" :index="$index" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
.el-table {
  border-radius: 10px;
}
</style>
