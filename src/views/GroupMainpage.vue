<template>
  <div class="group">
    <Header></Header>
    <div class="create">
      <el-button icon="el-icon-s-flag">创建小组</el-button>
    </div>
  <div class="leaderboard">
    <div class="books">
    </div>
    <div class="dramas">
    </div>
    <div class="others">
    </div>
  </div>
  <div class="showgroups">
  </div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'GroupMainpage',
  components: {
    Header,
    Footer,
  },
  methods: {
    Create(){
      this.$router.push('/creategroup')
    },
  }
}

</script>

<style scoped>
.create button{
  background-color: #D0E8F2; 
  color: #456268;
  font-size: 22px; 
  border-radius: 15px;
}
.create{
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.leaderboard{
  background-color: #FCF8EC;
  height: 520px;
  width: 1376px;
  margin-left: 80px;
  padding-top: 20px;
  /* width: 1536px; */
}
.books{
  background-color: #D0E8F2;
  width: 300px;
  height: 500px;
  margin: 0 0 0 50px;
  border-radius: 20px;
}
.showgroups{
  background-color: #FCF8EC;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 300px;
  width: 1376px;
  margin-left: 80px;

}
#footer{
  position: relative;
  height: 88px;
}

</style>
