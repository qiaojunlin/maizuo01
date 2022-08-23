<template>
  <div>
    <van-sticky>
      <van-nav-bar title="当前城市" left-arrow @click-left="gomine" />
      <van-search
        v-model="message"
        @input="input"
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        
      />
    </van-sticky>
    <van-index-bar v-if="show">
      <van-cell :title="e.name" v-for="(e, i) in otherCity" :key="i"  @click="goCity(e)"/>
    </van-index-bar>
    <div v-else>
      <div class="hot">热门城市</div>
      <div class="parest">
        <p
          class="mydiv"
          v-for="(item, index) in hotindexList"
          :key="index"
          @click="goCity(item)"
        >
          {{ item.name }}
        </p>
      </div>
      <van-index-bar>
        <span v-for="(item, num) in indexList" :key="num">
          <van-index-anchor :index="item.index" />
          <van-cell
            v-for="(subItem, i) in item.list"
            :title="subItem.name"
            :key="i"
            @click="goCity(subItem)"
          />
        </span>
      </van-index-bar>
    </div>
  </div>
</template>
    
    <script>
import axios from "axios";
export default {
  data() {
    return {
      hotindexList: [],
      indexList: [],
      otherCity: [],
      cityList:[],
      show: false,
      message: "",
    };
  },
  created() {
    let url = "https://m.maizuo.com/gateway?k=4935597";
    // let url = "http://localhost:2000/api/city";
    let that = this;
    axios
      .get(url, {
        headers: { "X-Host": "mall.film-ticket.city.list" },
      })
      .then(function (response) {
        console.log(response);
        that.handleList(response.data.data.cities);
        that.cityList=response.data.data.cities
        
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  watch: {
    message(newVal) {
      this.show = true;
    },
  },
  methods: {
    gomine() {
      let path = "/";
      this.$router.push(path);
    },
    goCity(subItem) {
      this.$store.commit("getCitymsg", subItem);
      this.$router.push("/");
    },
    handleList(list) {
      let indexObj = {};
      for (let i = 0; i < list.length; i++) {
        let firstLetter = list[i].pinyin[0].toUpperCase();

        if (!indexObj[firstLetter]) {
          indexObj[firstLetter] = {};
        }
        if (!indexObj[firstLetter].list) {
          indexObj[firstLetter].list = [];
        }
        indexObj[firstLetter].list.push(list[i]);

        if (list[i].isHot == 1) {
          this.hotindexList.push(list[i]);
        }
      }

      for (let i in indexObj) {
        this.indexList.push({
          index: i,
          list: indexObj[i].list,
        });
      }

      this.indexListSort();
    },

    indexListSort() {
      this.indexList.sort(function (a, b) {
        return a.index.charCodeAt(0) - b.index.charCodeAt(0);
        
      });
    },
    onCancel() {
      this.show = false;
    },
    clear(){
      console.log("111");
    },
    input() {
            console.log(22);
            for (let i = 0; i < this.cityList.length; i++) {
                if (this.cityList[i].pinyin.includes(this.message) && !this.otherCity.includes(this.cityList[i])) {
                    this.otherCity.push(this.cityList[i]);
                };
            };
            for (let j = 0; j < this.otherCity.length; j++) {
                if (!this.otherCity[j].pinyin.includes(this.message)) {
                    this.otherCity.splice(j, 1);
                    j--;
                }
            }
            console.log(this.otherCity);
            if (!this.message) {
                this.otherCity = [];
                this.show = true;
            }
            for (let i = 0; i < this.cityList.length; i++) {
                if (this.cityList[i].name.indexOf(this.message) != -1) {
                    this.otherCity.push(this.cityList[i])
                }
            }
      },
    },
  
};
</script>
<style scoped>
.parest {
  width: 100%;
}
.mydiv {
  display: inline-block;
  margin: 6px 13px;
  width: 26%;
  background: #f4f4f4;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
}
.hot {
  height: 19.5px;
  font-size: 13px;
  color: #797d82;
  margin-bottom: 10px;
  padding: 0 16px;
}
.van-field-clear{
  width: 50px;
  height: 40px;
  transform: translateX(10px);
}
</style>