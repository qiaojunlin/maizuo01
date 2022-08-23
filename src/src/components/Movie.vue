<template>
  <div class="cinema">
    <div class="xiting">
      <div class="header">
        <div class="left">
          <span @click="city">{{ message }}</span>
          <img src="../imgs/下拉箭头.png" alt="" />
        </div>
        <div class="center">影院</div>
        <img src="../imgs/search.png" alt="" class="search" />
      </div>

      <div class="cinema_list">
        <van-dropdown-menu class="item">
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
          <van-dropdown-item v-model="value3" :options="option3" />
        </van-dropdown-menu>
      </div>
    </div>
    <ul class="area_list">
      <li v-for="(item, index) in newList" :key="index" @click="studios(item)">
        <div class="left">
          <div class="cinema_name">{{ item.name }}</div>
          <div class="cinema_address">
            {{ item.address }}
          </div>
        </div>
        <div class="right">
          <div class="price_fmt">¥{{ item.lowPrice / 100 }}起</div>
          <p>距离未知</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
Vue.prototype.axios = axios;
export default {
  data() {
    return {
      list: [],
      array2:[],
      newList:[],
      value1: 0,
      value2: "a",
      value3: "d",
      option1: [{ text: "全城", value: 0 }],
      option2: [
        { text: "app兑票", value: "a" },
        { text: "前台兑换", value: "b" },
      ],
      option3: [
        { text: "最近去过", value: "c" },
        { text: "离我最近", value: "d" },
      ],
     
      url1: "https://m.maizuo.com/gateway?cityId=",
      url3: "&ticketFlag=1&k=6479530",
    };
  },
  watch: {
    //监听下拉菜单的索引
    value1: function(newVal, oldVal){
      if(newVal == 0){
        this.newList=this.list
      }else{
        this.newList=this.array2[newVal-1]
      }
      console.log(newVal);

    },
  },
  computed: {
    message() {
      return this.$store.state.name;
    },
    url() {
      return this.url1 + this.$store.state.url2 + this.url3;
    },
  },
  created() {
    let that = this;
    axios
      .get(that.url, {
        headers: {
          "X-Host": "mall.film-ticket.cinema.list",
        },
      })
      .then((res) => {
        that.list = res.data.data.cinemas;
        console.log(that.list);
        let array1 = [];
        //通过array1拿到各个区
        for (let index = 0; index < that.list.length; index++) {
          if (array1.indexOf(that.list[index].districtName) == -1) {
            array1.push(that.list[index].districtName);
          }
        }
        console.log(array1);
        
        //渲染每个区的数组
        for (let index = 0; index < array1.length; index++) {
          that.option1.push({ text: array1[index], value: index + 1 });
        }
        console.log(that.option1);
        
       //数组的数据放到每个区下面的电影院
        for (let index = 0; index < array1.length; index++) {
          let temp1=[];
          for (let j = 0; j < that.list.length; j++) {
           if (array1[index] == that.list[j].districtName) {
            temp1.push(that.list[j])
           }           
          }
          that.array2.push(temp1)
          temp1=[];
        }
        console.log(that.array2);
        this.newList=this.list;
      });
      // this.value1=0;
      
  },
  methods: {
    city() {
      this.$router.push("/city");
    },
    studios(e) {
      this.$router.push("/studios");
      this.$store.commit("dianyingyuan", e);
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.xiting {
  position: sticky;
  top: 0;
  background-color: white;
}
.header {
  display: flex;
  justify-content: space-between;
  height: 44px;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid rgb(249, 249, 249);
}
.header .center {
  font-size: 17px;
}
.header .left {
  margin-left: 20px;
}
.header .left span {
  font-size: 13px;
  padding: 0 5px;
}
.search {
  margin-right: 20px;
  width: 18px;
  height: 18px;
}
.cinema_list {
  width: 100%;
  height: 49px;
  display: flex;
  border-bottom: 1px solid rgb(249, 249, 249);
}
.item {
  width: 100%;
}
.area_list li {
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(249, 249, 249);
}
.cinema_name {
  width: 200px;
  text-indent: 20px;
  text-align: left;
  font-size: 15px;
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.cinema_address {
  width: 212px;
  font-size: 12px;
  text-align: left;
  text-indent: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.right {
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}
.right .price_fmt {
  font-size: 15px;
  color: #ff5f16;
  margin-bottom: 10px;
}
.right p {
  font-size: 12px;
  color: #999;
}
.left img {
  width: 6px;
  height: 3px;
}
.item img {
  width: 6px;
  height: 3px;
}
</style>
