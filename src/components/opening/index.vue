<template>
  <div class="loading-main" v-if="status">
    <input
      class="retrigger"
      type="radio"
      name="rerun"
      id="retrigger--1"
    /><input
      class="retrigger"
      type="radio"
      name="rerun"
      id="retrigger--2"
      checked="checked"
    />
    <div class="bg"></div>

    <div class="pane">
      <div class="rotate">
        <img class="logo-img" src="../../assets/images/marvel.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      status: true,
    };
  },
  created() {
    setTimeout(() => {
      this.status = false;
    }, 5000);
  },
};
</script>

