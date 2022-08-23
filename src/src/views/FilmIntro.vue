<template>
  <div class="big">
    <div class="main">
      <div class="goback">
        <img src="../imgs/向左返回.png" alt="" @click="fanhui" />
      </div>
      <div class="lazy-img film-poster">
        <div class="lazy-img-wrap">
          <img class="target-img" :src="list.poster" alt="" />
        </div>
      </div>
      <div class="film-detail" :class="{ testT: flagT }">
        <div class="col">
          <div class="film-name">
            <span class="name">{{ list.name }}</span>
            <span class="item">{{ names }}</span>
          </div>

          <div class="film-grade">
            <span class="grade">{{ list.grade }}</span>
            <span class="grade-text">分</span>
          </div>
        </div>

        <div class="film-category grey-text">{{ list.category }}</div>
        <div class="film-premiere-time grey-text">
          {{ list.premiereAt | datefilter("xxxx年yy月xx日") }}上映
        </div>
        <div class="film-nation-runtime grey-text">
          {{ list.nation }} | {{ list.runtime }}分钟
        </div>
        <div :class="{ testT: flagT }" class="test grey-text" v-if="show1">
          {{ list.synopsis }}
        </div>

        <div class="toggle" @click="flagT = !flagT">
          <img
            :class="{ imgJb: flagT }"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAYAAADwdn+XAAAAAXNSR0IArs4c6QAAAQlJREFUKBWNkT1Lw1AUht8TIlJExKlj/4WQFNIacWyHCoLQ1cXdj59g7e7i6CA4OAhOpbdNIKn2X3Ts1NGhocdzbgmk1NJmuCHnvM+Tc+8lEyVfDBzDxdVZtTrBDk8/SSrI8EbAzBH4EAwPc/qJ4/RkG28zklVGWefoYL8BQg/gcsYYmmjU2iQx8feFZjSrjLIyBTBgdjlKn8V4TUQszfsw8LtFkYnTW/lrh5lJoBeq+TenRJkV5EEzHN2B+LEY0t6KnOkhrHtPObMi0KKOCV68iqS03JoacC6T/QLUDmveRw7re02gRT2o+QKfdq9aAE33HDSDwB/bz8Lyr0D7y6uid5t1+XLTFf8Bk+NpPwQfd0oAAAAASUVORK5CYII="
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="actors">
      <div class="actors-title-bar">
        <span class="actors-title-text">演职人员</span>
      </div>

      <div class="row-scoll-wrapper actor-list">
        <ul class="row-scroll-items-nav">
          <li
            class="row-scroll-item"
            v-for="(item, index) in list.actors"
            :key="index"
          >
            <div class="actors-item">
              <img :src="item.avatarAddress"  alt="" />
            </div>
            <p class="actors-name">{{ item.name }}</p>
            <span>{{ item.role }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="photo">
      <div class="actors-title-bar second">
        <span class="actors-title-text">剧照</span>
        <span class="all">全部({{ length }})></span>
      </div>

      <div class="last">
        <ul>
          <li v-for="(item, index) in list.photos" :key="index">
            <div class="mg"><img v-image-preview :src="item" /></div>
          </li>
        </ul>
      </div>
    </div>
    <button @click="gotoBuy">选座购票</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  filters: {
    datefilter(time, str) {
      let date = new Date(time * 1000);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      str = str.replace("xxxx", year).replace("yy", month).replace("xx", day);
      return str;
    },
  },
  data() {
    return {
      list: [],
      names: "",
      length: "",
      urla: "https://m.maizuo.com/gateway?filmId=",
      urlc: "&k=3750969",
      flagT: false,
      show1: true,
      show: 0,
      listNew:[]
    };
  },
  computed: {
    url() {
      return this.urla + this.$store.state.urlb + this.urlc;
    },
  },
  created() {
    let that = this;
    axios
      .get(that.url, {
        headers: { "X-host": "mall.film-ticket.film.info" },
      })
      .then((res) => {
        that.list = res.data.data.film;
        console.log(that.list);
        that.names = that.list.filmType.name;
        that.length = that.list.photos.length;
        // that.listNew= that.list.photos
        // console.log(that.listNew);
      });
  },
  methods: {
    fanhui() {
      this.$router.go(-1);
    },
    gotoBuy() {
      this.$router.push("/gotoBuy");
    },
    
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.big {
  background: #f4f4f4;
}
.main {
  height: 100%;
}
.lazy-img-wrap {
  width: 100%;
  height: 218px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.target-img {
  width: 100%;
}
.goback img {
  width: 30px;
  height: 30px;
}
.goback {
  position: absolute;
  top: 3px;
  left: 3px;
}
.col {
  display: flex;
  justify-content: space-between;
}
.film-detail {
  padding: 15px;
  width: 100%;
  height: 190px;
  background: white;
  font-size: 13px;
  color: #797d82;
  position: relative;
  transition: all 0.5s linear;
}
.film-detail div {
  margin-top: 6px;
}
.film-name {
  width: 252px;
  height: 24px;
}

.name {
  font-size: 18px;
  color: #191a1b;
}
.item {
  font-size: 12px;
  width: 20px;
  height: 14px;
  background: #d2d6dc;
  color: white;
  display: inline-block;
  transform: translateY(-2px);
  margin-left: 10px;
  padding: 0 2px;
}
.grade {
  font-size: 18px;
  color: #ffb332;
  font-style: italic;
}
.grade-text {
  font-size: 12px;
  color: #ffb332;
}
.toggle {
   display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: absolute;
  height: 20px;
  left: 0;
  right: 0;
  bottom: 0px;
  height: 20px;
  /* background: white; */
  text-align: center;
  z-index: 999;
}
.toggle img {
  width: 8px;
  height: 4px;
}
.actors {
  width: 100%;
  height: 192.5px;
  background: white;
  margin-top: 10px;
}
.actors-title-bar {
  width: 100%;
  height: 52.5px;
  padding: 15px;
  font-size: 16px;
  color: #191a1b;
  display: flex;
}
.row-scoll-wrapper {
  width: 100%;
  height: 131px;
}
.row-scroll-item {
  width: 85px;
  height: 131px;
}
.actors-item {
  width: 85px;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.actors-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row-scroll-items-nav {
  margin-left: 15px;
  display: flex;
  overflow-x: auto;
}
.actors-item img {
  width: 85px;
}
.row-scroll-item {
  font-size: 12px;
  text-align: center;
  margin-right: 15px;
}
.row-scroll-item span {
  color: #797d82;
}
.row-scroll-item p {
  padding-top: 10px;
}
.photo {
  background: white;
  margin-top: 15px;
  width: 100%;
  height: 177px;
}
.second {
  display: flex;
  justify-content: space-between;
}
.all {
  font-size: 13px;
  color: #797d82;
}
.last ul {
  padding-left: 15px;
  overflow-x: auto;
  display: flex;
  flex-shrink: 0;
}
/* .last li {
  width: 150px;
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
} */

.mg {
  height: 100px;
  width: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.last li img {
  width: 100%;
}
button {
  width: 100%;
  height: 49px;
  background: #ff5f16;
  position: fixed;
  z-index: 22;
  bottom: 0px;
  border: none;
  color: white;
}
.test {
  overflow: hidden;
  height: 35px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.testT {
  padding-bottom: 15px;
  height: auto;
}
.imgJb {
  transform: rotate(180deg);
}
</style>
