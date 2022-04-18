<template>
  <div class="main-layout">
    <Header></Header>
    <div class="main-content">
      <div v-if="blacklist.length > 0">
        <h1 class="text-center" style="color: white; margin-bottom: 50px;">Blacklist</h1>
        <div class="blacklist">
          <div class="list" v-for="(item, index) in blacklist" :key="index">
            <div class="content">
              <div class="left">
                <img :src="returnURL(item)" alt />
              </div>
              <div class="right">
                <h2>
                  <abbr :title="item.name">{{ formatName(item.name) }}</abbr>
                </h2>
                <div class="see-more">
                  <el-button round @click="removeBlacklist(item)">Remove blacklist</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="removeALL">
          <el-button round @click="removeALL()">Remove All</el-button>
        </div>
      </div>
      <div v-else>
        <h1 style="color: white; font-size: 97px; text-align: center; padding: 20vw;">No results</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Endpoints from "../../services/Endpoints";
import Header from "../../components/header/index.vue";
import _ from "lodash";
export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      blacklist: false,
    };
  },

  methods: {
    returnURL(row) {
      return row.thumbnail.path + '.' + row.thumbnail.extension;
    },
    formatName(name) {
      return name.length > 40 ? name.substring(0, 40) + " ..." : name;
    },

    getBanned() {
      if (localStorage.getItem("@Blacklist") !== null) {
        this.blacklist = JSON.parse(localStorage.getItem("@Blacklist"));
      }
    },
    removeBlacklist(row) {
      let list = [];
      if (localStorage.getItem("@Blacklist") !== null) {
        list = JSON.parse(localStorage.getItem("@Blacklist"));
        list = _(list).filter(function (item) {
          return item.id !== row.id;
        });
        localStorage.setItem("@Blacklist", JSON.stringify(list));
      }
      this.getBanned();
    },
    removeALL() {
      localStorage.setItem("@Blacklist", JSON.stringify([]));
      this.getBanned();
    }
  },
  mounted() {
    this.getBanned();
  },
};
</script>
