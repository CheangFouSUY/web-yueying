<template>
  <div>
    <Header :isLogin="isLogin" :userInfo="userInfo"></Header>
    <el-row>
      <el-col :span="24"><div class="mainSwiper"></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="1"><div class="BooknDrama">
        <el-row>
          <el-col :span="24" :offset="1"><div class="Book">
            <img src="@/assets/Book.svg" alt="book icon" /><span>图书</span>
          </div></el-col>
          <el-col :span="23" :offset="0"><Swiper id="Swiper"></Swiper></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="4" :offset="1"><div class="Drama">
           <img src="@/assets/Video.svg" alt="video icon" /><span>影视</span>
          </div></el-col>
          <el-col :span="23" :offset="0"><Swiper id="Swiper"></Swiper></el-col>
        </el-row>
        </div></el-col>
      <el-col :span="6" :offset="1"><div class="Leaderboard bg-blue">
        <el-row>
          <el-col :span="24"><div class="lbTitle">热榜</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="lbType1">图书</div></el-col>
          <el-col :span="12"><div class="lbType2">影视</div></el-col>
        </el-row>
        <el-row>
        </el-row>
        </div></el-col>
    </el-row>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Swiper from "@/components/MainpageSwiper.vue"

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
    Swiper,
  },
  data() {
    return {
        isLogin:'false',
        userInfo: {
        username:'小黄鸭',
        useravatar:'',
        }
    }
  }
}
</script>

<style scoped>
.mainSwiper{
  background-color: grey; 
  height: 450px;
  margin-bottom: 30px;
}
.BooknDrama{
  /* height: 450px; */
  /* padding-top: 10px; */
  margin-bottom: 20px;
  background-color: #FCF8EC;
}
.Book, .Drama{
  /* border: solid 1px black; */
  margin-bottom: 10px;
  background-color: #FCF8EC;
  font-size: 24px;
  display: flex;
  align-items: center;

}
.Leaderboard{
  height: 450px;
  margin-bottom: 20px;
}
.lbTitle{
  background-color: #79A3B1;
  text-align: center;
  font-size: 36px;
}
.lbType1, .lbType2{
  background-color: #79A3B1;
  text-align: center;
  font-size: 24px;
}
.lbType1{
  /* border-right: 1px solid white; */
}
.lbType2{
  /* border-left: 1px solid white; */
}
.bg-red{
  background-color: red;
}
.bg-blue{
  background-color: blue;
}
#footer{
  position: relative;
  height: 88px;
}
#Swiper{
  margin-top: 0px;
}
</style>
