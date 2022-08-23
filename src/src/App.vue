<template>
  <div id="app">
    <div v-if="show" class="cover">
      <div class="photo"> 
        <img
          src="https://static.maizuo.com/v5/upload/6039de152eb4b587b5f49bd3ea05a71d.jpg"
          alt=""
          class="close-img"
        />
        <img
          @click="appAdd"
          src="../src/imgs/叉叉.png"
          alt=""
          class="close-btn"
        />
      </div>
    </div>
    <component :is="maizuoName" class="centre"></component>
    <div class="footer">
      <span
        class="iconfont icon-dianying"
        @click="maizuoName = 'cinema'"
        :class="{ active: maizuoName == 'cinema' }"
      >
        <p>电影</p>
      </span>
      <span
        class="iconfont icon-yingyuan"
        @click="maizuoName = 'movie'"
        :class="{ active: maizuoName == 'movie' }"
      >
        <p>影院</p>
      </span>
      <span
        class="iconfont icon-zixun"
        @click="maizuoName = 'info'"
        :class="{ active: maizuoName == 'info' }"
      >
        <p>资讯</p>
      </span>
      <span
        class="iconfont icon-wode"
        @click="maizuoName = 'mine'"
        :class="{ active: maizuoName == 'mine' }"
      >
        <p>我的</p>
      </span>
    </div>
  </div>
</template>
<script>
import cinema from "./components/Cinema.vue";
import movie from "./components/Movie.vue";
import info from "./components/Info.vue";
import mine from "./components/Mine.vue";
export default {
  data() {
    return {
      maizuoName: "cinema",
      //active:class的默认值
    };
  },
  components: {
    cinema,
    movie,
    info,
    mine,
  },
  computed:{
    //从状态管理里面取值  
    show(){
      return this.$store.state.show
    }
  },
  methods:{
    //遮盖层 show的值赋值给状态管理
    appAdd(){
      this.$store.commit('add', false)
     
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.centre {
  flex: 1;
  z-index: 999;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0px;
  display: flex;
  height: 50px;
  border-top: solid 1px rgb(253, 237, 237);
  background-color: #fff;
  z-index: 999;
}
span {
  width: 25%;
  text-align: center;
  margin-top: 6px;
}
span p {
  font-size: 12px;
  color: rgb(121, 118, 118);
}
.active p {
  color: #ff5f16;
}
.active {
  color: #ff5f16;
}
.cover {
 width: 100%;
 height: 100%;
 z-index: 100000;
 position: fixed;
 top: 0;
 background: rgba(102, 102, 102, 0.6);
}
.photo {
 width: 100%;
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate3d(-50%, -50%, 0);
}
.close-btn {
 display: block;
 padding-top: 15px;
 width: 35px;
 /* height: 45px; */
 position: absolute;
 left: 50%;
 margin-left: -17.5px;
}
.close-img {
 width: 60%;
 margin: 0 20%;
}

</style>
