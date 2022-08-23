<template>
  <div>
    <div class="home">
      <div class="homeh" :class="{titles:flags}">
        <div class="header" v-if="isShow">
          <div class="left">
            <span @click="city"
              >{{ message }}<img src="../imgs/下拉箭头.png" alt=""
            /></span>
          </div>
          <div class="center">电影</div>
        </div>
        <div class="cinema">
          <div
            v-for="item in list"
            :key="item.id"
            :class="{ active: activeIndex == item.id }"
            @click="change(item)"
          >
            {{ item.msg }}
          </div>
        </div>
      </div>
      <component :is="com" class="middle"></component>
    </div>
  </div>
</template>
<script>
import NowPlaying from "../fine/NowPlaying.vue";
import ComingSoon from "../fine/ComingSoon.vue";
export default {
  components: {
    NowPlaying,
    ComingSoon,
  },
  data() {
    return {
      flags:true,
      list: [
        {
          id: 1,
          msg: "正在热映",
          com: "NowPlaying",
        },
        {
          id: 2,
          msg: "即将上映",
          com: "ComingSoon",
        },
      ],

      activeIndex: 1,
      com: "NowPlaying",
      isShow: false,
    };
  },
  computed: {
    message() {
      return this.$store.state.name;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll); // 监听页面滚动
  },
  methods: {
    change(item) {
      this.activeIndex = item.id;
      this.com = item.com;
    },
    // 获取页面滚动距离
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop, '滚动距离')
      if (scrollTop > 80) {
        this.isShow = true;
        this.flags=false
      } else {
        this.isShow = false;
        this.flags = true
      }
    },
    city() {
      this.$router.push("/city");
    },
  },
  // 滚动重置
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header {
  height: 50px;
  line-height: 50px;
  position: sticky;
  z-index: 9999;
  background-color: #fff;
}
.center {
  margin-top: -1px;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
.homeh{
  height: 100px;
  width: 100%;
  position: absolute;
  position: fixed;
  top: 0px;
  z-index: 99;
  /* pointer-events: none; */
}
.home {
  display: flex;
  flex-direction: column; 
}
.left {
  position: absolute;
  font-size: 12px;
  text-align: center;
}
.left img {
  width: 6px;
  height: 3px;
  text-align: center;
  margin-left: 5px;
  margin-bottom: 3px;
}
.cinema {
  display: flex;
  top: 0;
  left: 0;
  justify-content: space-around;
  line-height: 50px;
  height: 50px;
  font-size: 13px;
  background-color: #fff;
  border-bottom: solid 1px rgb(253, 237, 237);
  margin-top: -2px;
}
.middle {
  flex: 1;
}
.active {
  color: red;
  border-bottom: 2px solid #ff5f16;
}
.titles{
  height: 50px;
}
</style>