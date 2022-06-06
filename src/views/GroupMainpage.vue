<template>
  <div class="group">
    <Header></Header>
    <div id="main">
      <div class="create">
      <el-button @click="createGroup" icon="el-icon-s-flag">创建小组</el-button>
    </div>
  <div class="leaderboard">
    <el-row>
      <el-col :span="7"><div class="grid-content bg-blue"><div class="title"><p id="title">图书</p><div id="line"></div></div>
      <el-table class="table"
      :data="leaderboardDataB.slice(0,10)"
      style="width: 90%"
      :header-cell-style="{background : '#D0E8F2', color : '#456268' }"
      :cell-style="{background : '#D0E8F2' }"
      @row-click="rowClick"
      :cell-class-name="cellCSS">
      <el-table-column
        type=index
        label="排名"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="小组名字"
        width="200">
      </el-table-column>
      <el-table-column
        prop="members"
        label="成员数量"
        align="center">
      </el-table-column>
    </el-table>
    </div></el-col>
      <el-col :span="7"><div class="grid-content bg-blue"><div class="title"><p id="title">影视</p><div id="line"></div></div>
      <el-table class="table"
      :data="leaderboardDataM.slice(0,10)"
      style="width: 90%"
      :header-cell-style="{background : '#D0E8F2', color : '#456268' }"
      :cell-style="{background : '#D0E8F2' }"
      @row-click="rowClick"
      :cell-class-name="cellCSS">
      <el-table-column
        type=index
        label="排名"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column 
        prop="groupName"
        label="小组名字"
        width="200">
      </el-table-column>
      <el-table-column
        prop="members"
        label="成员数量"
        align="center">
      </el-table-column>
    </el-table>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-blue"><div class="title"><p id="title">其他</p><div id="line"></div></div>
      <el-table class="table"
      :data="leaderboardDataO.slice(0,10)"
      style="width: 90%"
      :header-cell-style="{background : '#D0E8F2', color : '#456268' }"
      :cell-style="{background : '#D0E8F2' }"
      @row-click="rowClick"
      :cell-class-name="cellCSS">
      <el-table-column
        type=index
        label="排名"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column 
        prop="groupName"
        label="小组名字"
        width="200">
      </el-table-column>
      <el-table-column
        prop="members"
        label="成员数量"
        align="center">
      </el-table-column>
    </el-table>
      </div></el-col>
    </el-row>
  </div>
  <div class="showgroups">
    <div class="showgroups_title">
      <span>已加入小组</span>
      <div id="line2"></div>
    </div>
    <el-row v-if="groupData.length > 0" justify="center" type="flex">
        <div class="container">
        <div class="col" v-for="column in columns" :key="column">
          <div class="item-container" v-for="item in column" :key="item.id">
              <el-avatar :src="item.img" @click.native="toGroupInner(item.id)"></el-avatar>
              <span @click="toGroupInner(item.id)">{{item.groupName}}</span></div>
        </div></div>
    </el-row>
    <el-row v-else>
      <div class="noGroups"><span>目前无加入任何小组，马上去加入一个小组吧！</span></div>
    </el-row>
  </div>
    </div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import User from "@/store/user";

export default {
  name: 'GroupMainpage',
  components: {
    Header,
    Footer,
  },
  mounted() {
    var userInfo;
    if ((userInfo = User.getters.getUser(User.state()))) {
      this.islogin = true;
      this.userId = userInfo.user.id;
    }
    this.getGroup();
    this.mainMinHeight =
      document.documentElement.clientHeight -
      $("#header").outerHeight(true) -
      $("#footer").outerHeight(true) -
      6;
  },
  computed: {
    columns () {
      let columns = []
      let cols = this.groupData.length/3;
      let mid = 3;
      for (let col = 0; col < cols; col++) {
        columns.push(this.groupData.slice(col * mid, col * mid + mid))
      }
      return columns
    }
  },
  methods: {
    cellCSS({row, rowIndex}){
      if (rowIndex === 0) {
        return 'cellCSS1';
      }
      if (rowIndex === 1) {
        return 'cellCSS2';
      }
      return 'cellCSS3';
    },
    cellCSS2({row, rowIndex}) {
      return 'cellCSS4';
    },
    rowClick(row, column, event) {
      console.log(row.id);
      this.$router.push({path: `/group/${row.id}`})
    },
    createGroup() {
      this.$router.push('/creategroup')
    },
    toGroupInner(groupid) {
      this.$router.push({path: `/group/${groupid}`})
    },
    getGroup() {
      this.$axios
      .get("/api/v1/group/list?category=b")
      .then((res) => {
        var result = res.data.results;
        this.leaderboardDataB = result;
      })
      .catch((error) => {
        console.log(error);
      });
      this.$axios
      .get("/api/v1/group/list?category=m")
      .then((res) => {
        var result = res.data.results;
        this.leaderboardDataM = result;
      })
      .catch((error) => {
        console.log(error);
      });
      this.$axios
      .get("/api/v1/group/list?category=o")
      .then((res) => {
        var result = res.data.results;
        this.leaderboardDataO = result;
      })
      .catch((error) => {
        console.log(error);
      });

      var header = {}
        if (localStorage.getItem('token'))
            header = { 'Authorization': 'Bearer ' + localStorage.getItem('token')}

      if(this.islogin)
      this.$axios({
        method:'get',
        url:'/api/v1/group/joined',
        headers: header,
      })
      .then((res) => {
        console.log(res);
        var result = res.data.results;
        this.groupData = result;
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
  data() {
        return {
          islogin: false,
          leaderboardDataB: [],
          leaderboardDataM: [],
          leaderboardDataO: [],
        groupData: [],
        mainMinHeight: "",
        }
      },
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
  height: 610px;
  /* width: 1376px; */
  margin-left: 80px;
  margin-right: 80px;
  padding-top: 20px;
  /* width: 1536px; */
}
.showgroups{
  background-color: #FCF8EC;
  margin-top: 20px;
  margin-bottom: 20px;
  min-height: 120px;
  /* width: 1376px; */
  margin-left: 80px;
  margin-right: 80px;
  text-align: center;
}
.showgroups_title{
  display: inline-block;
  width: 180px;
  height: 45px;
  font-size: 24px;
  border-radius: 0 0 10px 10px;
  padding-top: 5px;
  margin-bottom: 10px;
}
.title{
  background-color: #E9FBFF;
  width: 100px;
  height: 50px;
  margin-left: 140px;
  border-radius: 0 0 10px 10px;
}
.noGroups span{
  color: grey;
  font-size: 16px;
  /* font-weight: bold; */
}
#title {
  display: inline;
  margin-left: 20px;
  font-size: 28px;
}
#line{
  background-color: #005773;
  height: 2px;
  width: 70px;
  margin-left: 15px;
}
#line2{
  background-color: #005773;
  height: 2px;
  width: 140px;
  margin-left: 20px;
}
.leaderboard .el-row {
  margin-left: 40px;
  margin-right: 40px;
}
.leaderboard .el-col {
  border-radius: 4px;
  margin-left: 30px;
  margin-right: 20px;
}
.leaderboard .bg-blue {
  background-color: #D0E8F2;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.25);
}
.leaderboard .grid-content {
  border-radius: 10px;
  min-height: 600px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.table{
  margin-left: 20px;
  margin-top: 10px;
  max-height: 526px;
  overflow: auto;
}
.table::-webkit-scrollbar { 
    width: 5px;
}
.table::-webkit-scrollbar-thumb {
  background: rgba(1, 1, 255, 0.3); 
  border-radius: 20px;
}
.table2{
  margin-left: 18px;
  max-height: 526px;
}
.showgroups .bg-lightblue {
  background-color: #E9FBFF;
}
.showgroups .grid-content {
  border-radius: 10px;
  min-height: 280px;
}
.showgroups .el-row {
  margin-left: 40px;
  margin-right: 40px;
}
.showgroups .el-col {
  border-radius: 4px;
  margin-left: 30px;
  margin-right: 20px;
}
.showgroups .item-container {
  /* border: 1px solid; */
  padding: 5px;
  margin: 5px;
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.showgroups .item-container span:hover {
  color: #0BA7CA;
  cursor: pointer;
}
.col {
  margin: 10px;
  /* border: 1px solid; */
  flex-grow: 1;
  display: flex;
  flex-direction: row;
}
#main {
  margin: auto;
  padding: 30px 0;
  box-sizing: border-box;
}
#footer {
  bottom: 0;
}
</style>

<style>
.el-table .cellCSS1 {
  color: #077C96;
  font-size: 22px;
  font-weight: bold;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: whitesmoke !important;
}
.el-table .cellCSS1:hover,.el-table .cellCSS2:hover,.el-table .cellCSS3:hover,.el-table .cellCSS4:hover {
  cursor: pointer;
}
.el-table .cellCSS3  {
  color: #79A3B1;
  font-weight: bold;
}
.el-table .cellCSS2 {
  color: #0BA7CA;
  font-size: 16px;
  font-weight: bold;
}
.el-table .cellCSS4 {
  color: #077C96;
  font-size: 18px;
  font-weight: bold;
}
</style>

