<template>
  <div class="main-layout">
    <Header></Header>
    <div class="main-content">
      <div class="top-content">
        <div class="item text-left">
          <h2>{{ total }} results</h2>
          <div class="swith">
            <span>Favorites first</span>
            <br />
            <el-switch
              v-model="Favorites"
              @change="getCaracters(calculOffset()); FavoriteChange();
              "
              class="ml-2"
              active-color="#00b6ff"
              inactive-color="#a7a7a7"
            />
          </div>
        </div>
        <div class="item text-center">
          <div class="mt-4">
            <el-input v-model="SearchKey" placeholder="Insert name" class="input-with-select">
              <template #append>
                <el-button
                  style="
                    background: #0066ff;
                    color: white;
                    border: none;
                    margin-right: -22px;
                  "
                  @click="getCaracters(0)"
                  :icon="Search"
                >
                  <i class="fas fa-search"></i>
                  <a
                    href="#"
                    v-if="SearchKey.length > 0"
                    class="clear"
                    @click.prevent="clearSearchKey()"
                  >
                    <i class="fas fa-times-circle"></i>
                  </a>
                </el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div class="item text-right">
          <label for>Order by</label>
          <div>
            <el-select
              v-model="orderSelected"
              clearable
              placeholder="Select"
              @change="getCaracters(0)"
              default-first-option="true"
            >
              <el-option label="Name (A-Z)" value="name"></el-option>
              <el-option label="Name (Z-A)" value="-name"></el-option>
              <el-option label="Last update" value="modified"></el-option>
              <el-option label="Old update" value="-modified"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="list-itens" id="list-itens" v-loading="load">
        <Details
          :Caracters="Caracters"
          @getBanned="getBanned"
          @getFavorite="getFavorite"
          @RemoveFavoriteByid="RemoveFavoriteByid"
        ></Details>
      </div>
      <div class="bottom-item">
        <Pagination
          :currentPage="currentPage"
          :countPages="countPages"
          @prevPage="prevPage"
          @nextPage="nextPage"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Endpoints from "../../services/Endpoints";
import Header from "../../components/header/index.vue";
import Details from "../characters/details.vue";
import Pagination from "../characters/pagination.vue";
import _ from "lodash";
export default {
  name: "Home",
  components: {
    Header,
    Details,
    Pagination,
  },
  data() {
    return {
      Carousel: "",
      token: false,
      Caracters: [],
      Favorites: false,
      orderSelected: "name",
      total: 0,
      perPage: 20,
      currentPage: 0,
      totalResults: 0,
      load: true,
      SearchKey: "",
    };
  },
  computed: {
    countPages() {
      return Math.ceil(this.total / this.perPage);
    },
  },
  methods: {
    clearSearchKey() {
      this.SearchKey = "";
      this.getCaracters(0);
    },
    scrollTop() {
      window.scrollTo(0, 0);
      var myDiv = document.getElementById("list-itens");
      myDiv.scrollTop = 0;
    },
    calculOffset() {
      return this.currentPage * this.perPage;
    },
    nextPage() {
      this.currentPage += 1;
      this.getCaracters(this.calculOffset());
    },
    prevPage() {
      this.currentPage -= 1;
      this.getCaracters(this.calculOffset());
    },
    getCaracters(offset) {
      this.currentPage = offset == 0 ? 0 : this.currentPage;
      this.scrollTop();
      this.load = true;
      if (this.SearchKey != "") {
        Endpoints.getCharactersbyName(
          offset,
          this.orderSelected,
          this.SearchKey
        )
          .then((r) => {
            let result = [];
            result = this.filterBanned(r.data.data.results);
            this.Caracters =
              this.Favorites == true ? this.filterFavorites(result) : result;
            this.total = r.data.data.total;
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            this.load = false;
          });
      } else {
        Endpoints.getCharactersbyFilter(offset, this.orderSelected)
          .then((r) => {
            let result = [];
            result = this.filterBanned(r.data.data.results);
            this.Caracters =
              this.Favorites == true ? this.filterFavorites(result) : result;
            this.total = r.data.data.total;
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            this.load = false;
          });
      }
    },
    filterBanned(data) {
      let list = [];
      let atual = data;
      if (localStorage.getItem("@Blacklist") !== null) {
        list = JSON.parse(localStorage.getItem("@Blacklist"));
        data.map((dataC) => {
          list.map((listC) => {
            if (dataC.id === listC.id) {
              atual = atual.filter((item) => !(item.id == listC.id));
            }
          });
        });
        console.log(list)
        return atual;
      } else {
        return data;
      }
    },
    filterFavorites(data) {
      let OrderName = this.orderSelected == "name" ? "desc" : "asc";
      let list = [];
      let sortedFavorites = [];
      let atual = data;
      let totalArray = data;
      if (localStorage.getItem("@Favorites") !== null) {
        list = JSON.parse(localStorage.getItem("@Favorites"));
        sortedFavorites = _.orderBy(
          list,
          [(item) => item.name.toLowerCase()],
          [OrderName]
        );
        totalArray = totalArray.reverse();
        sortedFavorites.forEach((x) => totalArray.push(x));
        totalArray = totalArray.reverse();
        totalArray = _.uniqBy(totalArray, "id");
        return totalArray;
      } else {
        return data;
      }
    },
    verifyExistFavorite(row) {
      if (localStorage.getItem("@Favorites") !== null) {
        let favorites = JSON.parse(localStorage.getItem("@Favorites"));
        favorites.map((favoritesC) => {
          if (favoritesC.id === row.id) {
            console.log("existe");
            this.RemoveFavoriteByid(row);
          }
        });
      }
    },
    getBanned(row) {
      this.verifyExistFavorite(row);
      let blacklist = [];
      if (localStorage.getItem("@Blacklist") !== null) {
        blacklist = JSON.parse(localStorage.getItem("@Blacklist"));
        blacklist.push(row);
        localStorage.setItem("@Blacklist", JSON.stringify(blacklist));
        this.$message({
          message: "Banned: " + row.name + "!",
          customClass: "customADD",
          duration: 1500,
          offset: 200,
          type: "success",
        });
      } else {
        blacklist.push(row);
        localStorage.setItem("@Blacklist", JSON.stringify(blacklist));
        this.$message({
          message: "Banned: " + row.name + "!",
          customClass: "customADD",
          duration: 1500,
          offset: 200,
          type: "success",
        });
      }
      this.getCaracters(0);
    },
    getFavorite(row) {
      let favorites = [];
      if (localStorage.getItem("@Favorites") !== null) {
        favorites = JSON.parse(localStorage.getItem("@Favorites"));
        if (favorites.length < 5) {
          let json = row;
          json.favorite = true;
          favorites.push(json);
          localStorage.setItem("@Favorites", JSON.stringify(favorites));
          this.$message({
            message: "favorite added: " + row.name + "!",
            customClass: "customADD",
            duration: 1500,
            offset: 200,
            type: "success",
          });
        } else {
          this.$message({
            message: "limit of 5 favorites exceeded",
            customClass: "customADD",
            duration: 1500,
            offset: 200,
            type: "warning",
          });
        }
      } else {
        let json = row;
        json.favorite = true;
        favorites.push(json);
        localStorage.setItem("@Favorites", JSON.stringify(favorites));
        this.$message({
          message: "favorite added: " + row.name + "!",
          customClass: "customADD",
          duration: 1500,
          offset: 200,
          type: "success",
        });
      }
      this.getCaracters(0);
    },
    RemoveFavoriteByid(row) {
      let favorites = [];
      if (localStorage.getItem("@Favorites") !== null) {
        favorites = JSON.parse(localStorage.getItem("@Favorites"));
        favorites = _(favorites).filter(function (item) {
          return item.id !== row.id;
        });
        localStorage.setItem("@Favorites", JSON.stringify(favorites));
      }
      this.getCaracters(0);
    },
    FavoriteChange() {
      localStorage.setItem("@FavoriteStatus", JSON.stringify(this.Favorites));
    },
  },
  mounted() {
    this.getCaracters(0);
  },
  created() {
    if (localStorage.getItem("@FavoriteStatus") !== null) {
      this.Favorites = JSON.parse(localStorage.getItem("@FavoriteStatus"));
    }
  },
};
</script>
