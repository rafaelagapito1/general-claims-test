<template>
  <div class="header">
    <div class="logo-header">
      <img class="img-fluid" src="../../assets/images/marvel.png" alt="" />
    </div>
    <div class="content">
      <div class="links">
        <div class="link" @click="goTO('/characters')">
          <span> Characters </span>
        </div>
     
        <div class="link" @click="goTO('/blacklist')">
          <span> Blacklist </span>
        </div>
      </div>
    </div>
    <!-- <a href="#" @click="goTO('/comics')">comics</a>
    <a href="#" @click="goTO('/characters')">Characters</a> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  methods: {
    goTO(url) {
      this.$router.push(url);
    },
  },
  mounted() {},
  created() {},
};
</script>
