<template>
  <div class="cup">
    <div class="web-login">
      <div class="logo">
        <img src="../imgs/登录界面图片.png" alt="" />
      </div>
      <div class="login-info">
        <div class="phone">
          <input type="tel" placeholder="手机号" />
          <p>获取验证码</p>
        </div>
        <input placeholder="验证码" />
      </div>
      <div class="log-in">
        <span>登录</span>
      </div>
      <div class="fail"><span>收不到验证</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'jump'
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.web-login,
.logo {
  margin: 79px auto 40px;
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.logo img {
  height: 60px;
}
.login-info input {
  border: 0;
  border-bottom: 1px solid #f4f4f4;
  width: 80%;
  line-height: 55px;
  margin: 0 25px;
  font-size: 15px;
  outline-width: 0;
}
.phone {
  position: relative;
}
.phone p {
  position: absolute;
  right: 30px;
  top: 2px;
  color: #bdc0c5;
  font-size: 13px;
  
}

.log-in {
  line-height: 45px;
  font-size: 16px;
  margin: 70px 25px 0;
  border-radius: 3px;
  text-align: center;
  background-color: #ff5f16;
  height: 44px;
  color: #f4f4f4;
  border: none;
}
.fail {
  text-align: right;
  margin: 15px 25px 0;
  color: #797d82;
  font-size: 13px;
  margin-top:-10px;

}
</style>