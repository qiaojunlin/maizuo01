<template>
  <div>
    <div class="">
      <ul>
        <li
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="judge(item)"
        >
          <div class="left">
            <img :src="item.poster" alt="" />
          </div>
          <div class="right">
            <div class="msg">
              <div class="info_item">
                <div class="name">
                  {{ item.name }}
                  <span class="fileType">{{ item.filmType.name }}</span>
                </div>
              </div>

              <div class="info_item">
                <span>主演:&ensp;</span>
                <span class="actor">
                  <span
                    v-for="arr in item.actors"
                    :key="item.actors.indexOf(arr)"
                    >{{ arr.name }}&ensp;</span
                  >
                </span>
              </div>
              <div class="info_item">
                <div class="nation">上映时间&ensp;|&ensp;</div>
                <div class="runtime">
                  {{ item.premiereAt | datefilter("yy月xx日") }}
                </div>
              </div>
            </div>
            <div class="yuyue">
              <button @click="gotoBuy(item)" onClick="event.cancelBubble = true" v-if="item.isPresale">预购</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template> 

<script>
import Vue from "vue";
import axios from "axios";
Vue.prototype.axios = axios;
export default {
  filters: {
    datefilter(time, str) {
      let date = new Date(time * 1000);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      str = str.replace("yy", month).replace("xx", day);
      return str;
    },
  },
  data() {
    return {
      list: [],
      url1: "https://m.maizuo.com/gateway?cityId=",
      url3: "&pageNum=1&pageSize=10&type=2&k=846534",
    };
  },
  computed: {
    url() {
      return this.url1 + this.$store.state.url2 + this.url3;
    },
  },
  created() {
    let that = this;
    axios
      .get(that.url, {
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      })
      .then((res) => {
        this.list = res.data.data.films;
      });
  },
  methods: {
    judge(e) {
      this.$router.push("/FilmSoon");
      this.$store.commit("FilmSoon", e);
    },
     gotoBuy(e) {
      this.$router.push("/gotoBuy");
      this.$store.commit("gotoBuy", e);
      this.$store.commit("FilmIntro", e);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
ul {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 60px;
  margin-top: 50px;
}
li {
  width: 345px;
  height: 94px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(249, 249, 249);
}
li img {
  width: 66px;
  height: 92.5px;
}
.right {
  display: flex;
  flex: 1;
  align-items: center;
  position: relative;
}
.right .msg {
  position: absolute;
  left: 20px;
  width: 200px;
  height: 94px;
}
.right .yuyue {
  width: 50px;
  height: 25px;
  /* border: 1px solid #ff5f16; */
  background-color: white;
  color: #ff5f16;
  margin-top: 10px;
  position: absolute;
  right: 0;
}
.yuyue button {
  border: 1px solid orange;
  background-color: white;
  color: orange;
  margin-top: -25px;
  width: 50px;
  height: 25px;
  line-height: 25px;
  font-size: 13px;
  text-align: center;
  border-radius: 3px;
}
.info_item {
  display: flex;
  font-size: 13px;
  height: 25px;
  line-height: 25px;
  align-items: center;
  color: #797d82;
  margin-left: -10px;
}
.name {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item .info_item .name {
  color: #191a1b;
}
.fileType {
  padding: 0 2px;
  padding-top: 1px;
  background-color: #d2d6dc;
  color: white;
  width: 8px;
  height: 10px;
  line-height: 10px;
  text-align: center;

  font-size: 10px;
}
.info_item .name {
  font-size: 16px;
}
.info_item .score {
  color: #ffb232;
  font-size: 14px;
}
.actor {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 170px;
  align-items: center;
}
</style>