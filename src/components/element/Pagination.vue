<template>
  <el-pagination
    class="pagination"
    :background="background"
    :current-page.sync="page"
    :page-size.sync="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :total="total"
    v-bind="$attrs"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { scrollTo } from "@/utils/scroll-to.ts";
import { computed, ref } from "vue";
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 10,
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50, 100];
    },
  } as any,
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  background: {
    type: Boolean,
    default: true,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  execFunction: {
    type: Function,
    default: () => {},
  },
});
const emit = defineEmits(["update:page", "update:limit", "pagination"]);
const page = computed({
  get() {
    return props.page;
  },
  set(val) {
    emit("update:page", val);
  },
}) as any;
const pageSize = computed({
  get() {
    return props.limit;
  },
  set(val) {
    emit("update:limit", val);
  },
}) as any;

function handleSizeChange(val: number) {
  emit("pagination", { page: page.value, pageSize: val });
}

function handleCurrentChange(val: number) {
  emit("pagination", { page: val, pageSize: pageSize.value });
}
</script>

<style scss scoped>
.pagination {
  margin: 10px 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: auto;
}
@media (max-width: 992px) {
  :deep(.el-pager),
  :deep(.btn-prev),
  :deep(.btn-next) {
    display: none !important;
  }
  .pagination {
    justify-content: center;
  }
}
</style>
