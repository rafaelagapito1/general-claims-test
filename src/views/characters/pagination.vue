<template>
  <div class="bottom-content">
    <div class="item">
      <el-button
        type="primary"
        @click="$emit('prevPage')"
        :disabled="currentPage <= 0"
        >Previous</el-button
      >
    </div>
    <div class="item">
      <h3>{{ currentPage + 1 }} / {{ countPages }}</h3>
    </div>
    <div class="item">
      <el-button
        type="primary"
        @click="$emit('nextPage')"
        :disabled="currentPage >= countPages - 1"
        >Next</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Array,
      default: [],
    },
    countPages: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    console.log("Load Details!");
  },
};
</script>

