<template>
  <div class="main-layout">
    <Header></Header>
    <div class="main-content" v-loading="load">
      <div class="character">
        <div class="img">
          <img :src="img" class="img-fluid" />
        </div>
        <div class="text">
          <h2>{{ Caracter.name }}</h2>
          <p v-if="Caracter.description">{{ Caracter.description }}</p>
        </div>
      </div>
      <div class="comics" v-loading="loadComics" v-if="Comics">
        <h2>Comics</h2>

        <div class="list-slider">
          <div class="item" v-for="item in Comics.splice(0, 5)" :key="item">
            <img :src="returnURL(item)" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Endpoints from "../../services/Endpoints";
import Header from "../../components/header/index.vue";

export default {
  name: "Home",
  components: {
    Header,

  },
  data() {
    return {
      Caracter: [],
      load: true,
      img: false,
      Comics: false,
      loadComics: false,

    };
  },

  methods: {
    returnURL(row) {
      return row.thumbnail.path + '.' + row.thumbnail.extension;
    },
    getCaracters(id) {
      this.load = true;
      Endpoints.getCharacterByid(id)
        .then((r) => {
          this.Caracter = r.data.data.results[0];
          this.img = this.Caracter.thumbnail.path + '.' + this.Caracter.thumbnail.extension;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.load = false;
        });
    },
    GetComics(id) {
      this.loadComics = true;
      Endpoints.getComicsByid(id)
        .then((r) => {
          this.Comics = r.data.data.results;
          console.log(this.Comics)
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.loadComics = false;
        });
    },

  },
  mounted() {
    if (this.$route.params.id.length > 0) {
      this.getCaracters(this.$route.params.id);
      this.GetComics(this.$route.params.id);
    } else {
      this.$router.push('/');
    }
  },
};
</script>


