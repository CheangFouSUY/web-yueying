<template>
  <div class="groupInner">
      <Header></Header>
      <div class="groupInfo">
     <el-row>
       <el-col :span="7" :offset="1"><div class="title"><span>{{ groupInfo.name }}</span></div></el-col>
       <el-col :span="15" :offset="1"><div class="buttonSlot">
        <el-button id="changeName" @click="change" v-if="isOwner">更改组名</el-button>
        <el-button id="changeName" @click="change" v-else>更改组名</el-button>
         <el-button id="joinGroup"  @click="joinleave" v-if="isGroupMember">加入小组</el-button>
         <el-button id="joinGroup" @click="joinleave" v-else>离开小组</el-button>
       </div></el-col>
     </el-row>
     <el-row>
       <el-col :span="4" :offset="1"><div class="groupPic">
         <el-image
          style="width: 200px; height: 250px"
          :src="require('@/assets/poster/DaoMuBiJi.jpg')"
          :fit="fill"></el-image>
         </div>
       </el-col>
       <el-col :span="10">
         <div class="groupInfoInfo">
         </div>
       </el-col>
     </el-row>
      </div>
      <div class="groupMember">
      </div>
      <div class="groupPost">
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'CreateGroup',
  components: {
    Header,
    Footer,
  },
  methods: {
    joinleave() {
      this.isGroupMember = !this.isGroupMember;
    },
    chane() {

    },
  },
  data() {
    return {
      isGroupMember: true,
      isOwner: true,
      url:'@/assets/Book.svg',
      groupInfo: {
        name:'皮卡一家亲',
        owner:'',
        date:'',
        type:'',
        peoplecount:'',
        desc:'',
      }
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-red {
  background: rgb(255, 0, 0);
}
.bg-blue {
  background: blue;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.groupInfo{
  display: inline-block;
  border: 1px solid black;
  width: 78%;
  height: 350px;
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #FCF8EC;
}
.title{
  margin-top: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #456268;
  /* border: 1px solid black; */
}
.buttonSlot{
  margin-top: 20px;
  height: 50px;
}
.groupMember{
  margin-top: 10px;
  border: 1px solid black;
  width: 15%;
  height: 500px;
  float: right;
}
.groupPost{
  border: 1px solid black;
  width: 78%;
  height: 200px;
  margin-left: 50px;
  background-color: #FCF8EC;
}
.groupPic{
  height: 250px;
}
.groupInfoInfo{
  border: solid black 1px;
  height: 250px;
  margin-left: 30px;
}
#changeName{
  margin-top: 5px;
  color: #456268;
  border-color: #456268;
  background-color: #FCF8EC;
}
#changeName:hover{
  background-color: whitesmoke;
}
#joinGroup{
  margin-top: 5px;
  float: right;
  margin-right: 20px;
  background-color: #456268;
  color: #FCF8EC;
}
#joinGroup:hover{
  background-color: #79A3B1;
}
</style>