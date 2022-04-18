<template>
  <div
    :class="item.favorite ? 'item favorite' : 'item'"
    v-for="(item, index) in Caracters"
    :key="index"
  >
    <div
      class="content"
      :style="
        'background: linear-gradient(90deg, rgb(0 0 0/92%), rgb(0 0 0/60%)),url(' +
        item.thumbnail.path +
        '.' +
        item.thumbnail.extension +
        ')'
      "
    >
      <h2>
        <abbr :title="item.name">{{ formatName(item.name) }}</abbr>
      </h2>
      <div class="detail">
        <a href="#" v-if="item.favorite" @click="$emit('RemoveFavoriteByid', item)">
          <i class="fas fa-star"></i>
        </a>
        <a href="#" v-else @click="$emit('getFavorite', item)">
          <i class="fas fa-star"></i>
        </a>
        <a href="#" @click="$emit('getBanned', item)">
          <i class="fas fa-ban"></i>
        </a>
      </div>
      <div class="see-more">
        <el-button round @click="goTO('/character/'+item.id)">See More</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Caracters: {
      type: Array,  
      default: [],
    },
  },
  methods: {
    goTO(url) {
      console.log(url)
      this.$router.push(url);
    },
    formatName(name) {
      return name.length > 22 ? name.substring(0, 22) + " ..." : name;
    },
  },
  mounted() {
    console.log("Load Details!");
  },
};
</script>

