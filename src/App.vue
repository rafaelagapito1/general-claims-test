<template>
  <div class="global">
    <opening></opening>
    <router-view />
  </div>
</template>

<script>
import opening from "../src/components/opening/index.vue";
export default {
  components: {
    opening,
  },
};
</script>
