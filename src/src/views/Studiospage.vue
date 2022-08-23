<template>
  <div>
    <div class="cinema-schedule">
      <img src="../imgs/向左箭头.png" @click="fanhui" />
    </div>
    <div class="header-title">{{ list.name }}</div>
    <div class="taga">
      <span class="tag" v-for="(item, index) in list.services" :key="index">{{
        item.name
      }}</span>
    </div>
    <div class="address">
      <div class="address-title"><img src="../imgs/地址.png" alt="" /></div>
      <div class="address-content">{{ list.address }}</div>
      <div class="address-right"><img src="../imgs/打电话.png" alt="" /></div>
    </div>
    <div class="moviedh">
      <el-carousel
        type="card"
        height="100px"
        :autoplay="false"
        :loop="false"
        indicator-position="none"
        arrow="never"
      >
        <el-carousel-item
          v-for="(item, index) in obj"
          :key="index"
          :style="(position = 'relative')"
        >
          <img
            :src="item.poster"
            alt=""
            class="showImg"
            @click="getFilmMsg(item)"
          />
          <img :src="item.poster" alt="" class="bgImg" />
        </el-carousel-item>
      </el-carousel>
      <div class="filmMsg">
          <div class="firstLine">
            <span class="filmMsg-title">{{ filmMsg.name }}</span>
            <span class="filmMsg-score">{{ filmMsg.grade }}分</span>
          </div>
          <div class="secondLine">
            <span class="filmMsg-type">{{ filmMsg.category }}</span>
            <span class="filmMsg-time">|{{ filmMsg.runtime }}分钟</span>
            <span class="filmMsg-director">|{{ filmMsg.director }}|</span>
            <span v-for="(item, index) in filmMsg.actors" :key="index">
              <span class="filmMsg-actors">{{ item.name }}</span>
            </span>
          </div>
          <div class="toFilmdetail" @click="setFilmId(filmMsg.filmId)">></div>
        </div>
        <div class="showDate">
          <span v-for="(item, index) in showDate" :key="index">
            <span
              class="showDate-date"
              :class="{ active: item == flag }"
            >
              {{ $dayjs(item * 1000).format("MM月DD日") }}
            </span>
          </span>
        </div>
        <div class="filmShow">
          <div class="everyFilm" v-for="(item, index) in filmShow" :key="index">
            <div class="showTime column startText">
              <p class="startTime">
                {{ $dayjs(item.showAt * 1000).format("HH:mm") }}
              </p>
              <p class="endTime endText">
                {{ $dayjs(item.endAt * 1000).format("HH:mm") }}散场
              </p>
            </div>
            <div class="typeMsg column startText">
              <p class="leixing">
                {{ item.filmLanguage + item.imagery }}
              </p>
              <p class="whatTing endText">
                {{ item.hallName }}
              </p>
            </div>
            <div class="price startText">
              <span>￥</span>
              {{ item.salePrice / 200 }}
            </div>
            <div class="buy" >
              <div @click="toDenglu">购票</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      urlx: "https://m.maizuo.com/gateway/?cinemaId=",
      urlz: "&k=2398271",
      obj: [],
      filmMsg: {},
      showDate: [],
      filmShow: [],
      flag: "",
    };
  },
  
  computed: {
    url() {
      return this.urlx + this.$store.state.urly + this.urlz;
    }, 
    urly(){
      return this.$store.state.urly
    }
  },
  created() {
    let that = this;
    this.axios
      .get(that.url, {
        headers: {
          "X-Host": "mall.film-ticket.cinema.info",
        },
      })
      .then((res) => {
        that.list = res.data.data.cinema;
        console.log(that.list);
      });
    that.axios
      .get(that.url, {
        headers: { 
          "X-Host": "mall.film-ticket.film.cinema-show-film" 
          },
      })
      .then((res) => {
        that.obj = res.data.data.films;
        that.filmMsg = res.data.data.films[0];
        that.showDate = res.data.data.films[0].showDate;
        that.flag = that.showDate[0];
        console.log(that.obj);
      });
  },
  methods: {
    fanhui() {
      this.$router.go(-1);
    },
     getFilmMsg(item) {
      this.filmMsg = item;
      console.log(this.filmMsg);
      this.showDate = item.showDate;
      console.log(this.showDate);
       let that = this;
      let url =
        "https://m.maizuo.com/gateway/?filmId=" +
        item.filmId +
        "&cinemaId=" +
         that.urly+
        "&date=" +
        item.showDate[0] +
        "&k=4753579";
        axios
        .get(url, {
          headers: { "X-Host": "mall.film-ticket.schedule.list" },
        })
        .then((res) => {
          that.filmShow = res.data.data.schedules;
          console.log(that.filmShow);
        });
     },
     toDenglu() {
      this.$router.push("/jump");
    },
    setFilmId(){
      this.$router.push("/FilmIntro");
     
    }
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.cinema-schedule {
  width: 100%;
  height: 44px;
  background-color: white;
}
.cinema-schedule img {
  width: 11px;
  height: 18px;
  text-align: center;
  margin-left: 15px;
  margin-top: 15px;
}
.header-title {
  width: 100%;
  text-align: center;
  font-size: 17px;
  line-height: 44px;
}
.taga {
  width: 100%;
  height: 38px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: #ffb232;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(249, 249, 249);
}
.tag {
  margin-left: 3px;
  padding: 0 5px;
  border-right: 1px solid #ffb232;
  border-bottom: 1px solid #ffb232;
}
.address {
  display: flex;
  height: 50px;
  width: 100%;
  background-color: white;
  align-items: center;
}
.address-title {
  margin-left: 20px;
}
.address-title img {
  width: 14px;
  height: 21px;
}
.address-content {
  width: 75%;
  margin-left: 10px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 50px;
}
.address-right {
  margin-right: 20px;
}
.address-right img {
  width: 17px;
  height: 18px;
}
.cinma-name {
  font-size: 15px;
  color: #333;
  text-align: center;
}
.small-font {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.small-font div {
  color: orange;
  border: 1px solid orange;
  padding: 2px;
  font-size: 12px;
  margin-right: 8px;
}
.icon {
  border: none !important;
  font-size: 14px !important;
}
.address {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.address-font {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 70%;
}
/* element样式 */
.el-carousel__item {
  text-align: center;
}
.moviedh {
  margin-top: 15px;
}
.showImg {
  position: absolute;
  z-index: 9;
  width: 40%;
  left: 50%;
  transform: translateX(-50%);
}
.bgImg {
  width: 100%;
  opacity: 0.5;
  position: absolute;
  /* 模糊 */
  filter: blur(5px);
  top: 0;
  left: 0;
}
.filmMsg {
  text-align: center;
  padding: 10px 50px;
  position: relative;
}
.filmMsg-score {
  margin-left: 10px;
  color: orange;
}
.secondLine {
  margin-top: 8px;
  font-size: 14px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.toFilmdetail {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  right: 0;
  bottom: 50%;
  transform: translateY(50%);
}
.secondLine span {
  margin-left: 2px;
}
.showDate {
  margin-top: 10px;
  padding-left: 20px;
  color: #555;
  white-space: nowrap;
  overflow: auto;
}
.everyFilm {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 15px;
}
.everyFilm .column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.everyFilm .startText {
  font-size: 15px;
}
.everyFilm .startText span {
  font-size: 12px;
}
.everyFilm .endText {
  font-size: 13px;
  margin-top: 2px;
  color: #797d82;
}
.everyFilm .typeMsg {
  width: 40%;
}
.everyFilm .price {
  color: #ff5f16;
}
.everyFilm .buy {
  padding: 7px 0;
  display: flex;

  flex-direction: column;
  justify-content: center;
}
.everyFilm .buy div {
  border: 1px solid #ff5f16;
  height: 25px;
  width: 50px;
  line-height: 25px;
  color: #ff5f16;
  border-radius: 2px;
  text-align: center;
  font-size: 10px;
  font-weight: 600;
}
.everyFilm .price {
  line-height: 39px;
}
</style>