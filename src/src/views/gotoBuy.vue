<template>
  <div>
    <div class="header">
      <div class="left">
        <span @click="fanhui"></span>
        <img src="../imgs/向左箭头.png" alt="" />
      </div>
      <div class="center">{{ message }}</div>
      <img src="../imgs/search.png" alt="" class="search" />
    </div>
    <van-tabs @change="sh" v-model="title">
      <van-tab
        v-for="(item, index) in showlist"
        :title="item.time"
        :key="index"
      >
        <div>
          <van-dropdown-menu class="item">
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
          </van-dropdown-menu>
        </div>
        <ul class="area_list">
          <li
            v-for="(item, index) in newList"
            :key="index"
            @click="studios(item)"
          >
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
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      value1: 0,
      value2: "a",
      title: 0,
      list: [],
      showlist: [],
      yinyuan: [],
      newyinyuan: [],
      newList: [],
      cinList: [],
      cinListid: [],
      url1: "https://m.maizuo.com/gateway/?filmId=",
      url3: "&cityId=",
      url4: "&k=7874915",
      option1: [{ text: "全城", value: 0 }],
      option2: [
        { text: "最近去过", value: "a" },
        { text: "离我最近", value: "b" },
      ],
    };
  },

  computed: {
    message() {
      return this.$store.state.pianming;
    },

    url() {
      return (
        this.url1 +
        this.$store.state.urlb +
        this.url3 +
        this.$store.state.url2 +
        this.url4
      );
    },
  },
  watch: {
    value1: function (newVal, oldVal) {
      if (newVal == 0) {
        this.newList = this.yinyuan;
      } else {
        this.newList = this.newyinyuan[newVal - 1];
      }
    },
    title: function (newVal) {
      this.value1 = 0;
    },
  },
  created() {
    let that = this;
    axios
      .get(that.url, {
        headers: {
          "X-Host": "mall.film-ticket.cinema.film-show-cinema",
        },
      })
      .then((res) => {
        that.list = res.data.data.showCinemas;
        for (let i = 0; i < that.list.length; i++) {
          that.showlist.push({
            id: that.list[i].cinemaList,
            time: that.getPemiereAt(
              that.showlist.length,
              that.list[i].showDate
            ),
          });
        }
      
        for (let i = 0; i < that.list.length; i++) {
          that.cinListid.push(that.list[i].cinemaList);
        }
        return that.cinListid;
      })
      .then(() => {
        this.title = 0;
        this.ax();
      });
  },
  methods: {
    sh(name, title) {
      (this.option1 = [{ text: "全城", value: 0 }]), (this.title = name);
      this.yinyuan = [];
      this.ax();
    },
    ax() {
      // .then((res) => {
      let re = JSON.stringify(this.cinListid[this.title]);
      let that = this;
      this.axios
        .post(
          "https://m.maizuo.com/gateway?k=5407972",
          JSON.stringify({
            cityId: 320500,
            cinemaIds: re,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              "X-Host": "mall.film-ticket.cinema.batch-cinema",
            },
          }
        )
        .then((res) => {
          that.yinyuan = res.data.data.cinemas;
          let array1 = [];
          for (let index = 0; index < that.yinyuan.length; index++) {
            if (array1.indexOf(that.yinyuan[index].districtName) == -1) {
              array1.push(that.yinyuan[index].districtName);
            }
          }
          for (let index = 0; index < array1.length; index++) {
            that.option1.push({ text: array1[index], value: index + 1 });
          }

          for (let index = 0; index < array1.length; index++) {
            let temp1 = [];
            for (let j = 0; j < that.yinyuan.length; j++) {
              if (array1[index] == that.yinyuan[j].districtName) {
                temp1.push(that.yinyuan[j]);
              }
            }
            that.newyinyuan.push(temp1);
            temp1 = [];
          }
          this.newList = this.yinyuan;
        });
    },

    fanhui() {
      this.$router.go(-1);
    },
    studios(e) {
      this.$router.push("/studios");
      this.$store.commit("dianyingyuan", e);
    },
    getPemiereAt(day, timer) {
      var date = new Date(timer * 1000);
      var M = date.getMonth() + 1;
      var D = date.getDate();
      var d = date.getDay();
      var x = "";
      if (day < 3) {
        switch (day) {
          case 0:
            x = "今天";
            break;
          case 1:
            x = "明天";
            break;
          case 2:
            x = "后天";
            break;
        }
      } else {
        switch (d) {
          case 0:
            x = "周日";
            break;
          case 1:
            x = "周一";
            break;
          case 2:
            x = "周二";
            break;
          case 3:
            x = "周三";
            break;
          case 4:
            x = "周四";
            break;
          case 5:
            x = "周五";
            break;
          case 6:
            x = "周六";
            break;
        }
      }
      return x + M + "月" + D + "日";
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 44px;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid rgb(249, 249, 249);
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 9;
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
.left img {
  width: 11px;
  height: 18px;
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
</style>