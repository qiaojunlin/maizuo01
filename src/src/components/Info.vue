<template>
  <div>
    <p v-html="list"></p>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
Vue.prototype.axios = axios;

export default {
  name: "info",
  data() {
    return {
      list: [],
      show: true,
    };
  },
  created() {
    let that = this;
    axios
      .get("https://m.maizuo.com/gateway?actId=ElzMZU125260", {
        headers: { "X-Host": "mall.act.static-page.info" },
      })
      .then((res) => {
        this.list = res.data.data.data.content;
      });
      window.AppBridge = {
        redirect(type, opation){
          if (type == 'movie-film') {
            that.$store.commit({
              type:'filmDetail',
              filmId:opation.filmId
            })
            that.$router.push({
              path:'/filmDetail',
              query:{
                filmId:opation.filmId
              }
            })
          } else {
            window.location.href = opation.url
          }
        }
      }
  },
  
};
</script>

<style scoped>
</style>