<template>
  <div class="cup" @click="jump">
    <div class="top">
      <div class="log-in-img">
        <img src="../imgs/立即登录.png" alt="" />
        <div class="log-in-text">立即登录</div>
      </div>
    </div>

    <div class="order">
      <ul>
        <li>
          <img src="../imgs/电影订单.png" alt="" />
          <p>电影订单</p>
        </li>
        <li>
          <img src="../imgs/商品订单.png" alt="" />
          <p>商品订单</p>
        </li>
      </ul>
    </div>

    <div class="quan font">
      <img class="left" src="../imgs/卖座券.png" />
      <p>卖座券</p>
      <img class="right" src="../imgs/向右箭头.png" alt="" />
    </div>

    <div class="hongbao font">
      <img class="left" src="../imgs/组合红包.png" />
      <p>组合红包</p>
      <img class="right" src="../imgs/向右箭头.png" alt="" />
    </div>

    <div class="yue font">
      <img class="left" src="../imgs/余额.png" />
      <p>余额</p>
      <span class="price_two">
        <i style="font-size: 11px">￥</i>
        <span style="font-size: 15px">0</span>
      </span>
      <img class="right" src="../imgs/向右箭头.png" alt="" />
    </div>

    <div class="help font">
      <img class="left" src="../imgs/客服与帮助.png" />
      <p>帮助与客服</p>
      <img class="right" src="../imgs/向右箭头.png" alt="" />
    </div>

    <div class="setup font">
      <img class="left" src="../imgs/设置.png" />
      <p>设置</p>
      <img class="right" src="../imgs/向右箭头.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jump() {
      this.$router.push("/jump");
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
.cup {
  background: #f4f4f4;
}
.top {
  width: 100%;
  height: 180px;
  background: url("../imgs/背景图片.png");
  background-size: cover;
}
.log-in-img img {
  width: 67px;
  height: 67px;
  border: 2px solid #fff;
  border-radius: 35px;
}
.log-in-img {
  display: flex;
  padding-left: 22px;
  padding-top: 64px;
  color: #f4f4f4;
}
.log-in-text {
  margin-left: 20px;
  padding-top: 20px;
}
.order {
  margin: 0 auto;
  display: flex;
  text-align: center;
  font-size: 13px;
  padding: 0;
  background: #fff;
  margin-bottom: 10px;
}
ul img {
  height: 26px;
  width: 26px;
}
ul {
  display: flex;
  width: 100%;
  margin-block-start: 1em;
  margin-block-end: 1em;
}
ul li {
  width: 100%;
  height: 100%;
  list-style: none;
  width: calc(100% / 2);
}
ul p {
  color: #797d82;
}
div img {
  width: 20px;
  height: 20px;
}
.font {
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  color: black;
  width: 100%;
  height: 49px;
  padding: 0 15px;
  background: #fff;
  line-height: 49px;
  padding-left: 30px;
  position: relative;
}
.quan {
  margin-top: 10px;
}
.font p {
  padding-left: 10px;
}
.yue span {
  color: #797d82;
  margin-right: 5px;
}
.font .left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.right {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 11px;
}
.price_two {
  text-align: right;
  transform: translateX(-10%);
  flex: 1;
}

.yue font {
  display: flex;
}
</style>