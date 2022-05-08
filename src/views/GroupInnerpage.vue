<template>
  <div class="groupInner">
      <Header></Header>
      <div class="groupInfo">
     <el-row>
       <el-col :span="7" :offset="1"><div class="title"><span>{{ groupInfo.name }}</span></div></el-col>
       <el-col :span="15" :offset="1"><div class="buttonSlot">
        <el-button id="changeName" @click="change" v-if="isOwner">更改组名</el-button>
         <el-button id="joinGroup"  @click="joinleave" v-if="isGroupMember">加入小组</el-button>
         <el-button id="leaveGroup" @click="joinleave" v-else>离开小组</el-button>
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
       <el-col :span="18">
         <div class="groupInfoInfo">
           <el-row>
             <el-col :span="2"><div class="info bg-red"></div>
             </el-col>
             <el-col :span="2" :offset="2"><div class="info bg-blue"></div>
             </el-col>
           </el-row>
            <el-row>
           </el-row>
            <el-row>
           </el-row>
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
    change() {
          this.$prompt('请输入新的小组名字（小组名少于10字符）', '更新小组名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '小组名少于10字符',
          inputValidator: this.validateInput,
        }).then(({ value }) => {
          this.groupInfo.name = value;
          this.$message({
            type: 'success',
            message: '更改小组名成功',
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    validateInput(input) {
        if(input.length > 9) {
          return '小组名少于10字符';
        } else return true;
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
  /* border: 1px solid black; */
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
.info {
  width: 200px;
  height: 30px;
}
#changeName{
  margin-top: 5px;
  color: #456268;
  border-color: #456268;
  background-color: #FCF8EC;
}
#changeName:hover, #leaveGroup:hover{
  background-color: rgb(205, 205, 205);
}
#joinGroup{
  margin-top: 5px;
  float: right;
  margin-right: 20px;
  background-color: #456268;
  color: #FCF8EC;
}
#leaveGroup{
  margin-top: 5px;
  float: right;
  margin-right: 20px;
  border-color: #456268;
  background-color: #FCF8EC;
  color: #456268;
}
#joinGroup:hover{
  background-color: #79A3B1;
}
</style>