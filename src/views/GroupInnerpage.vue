<template>
  <div class="groupInner">
      <Header></Header>
      <el-row>
        <el-col :span="20">
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
             <el-col :span="12"><div class="info "><span class="infoText">创建人&nbsp;:&nbsp;</span><span class="infoText2">{{ groupInfo.owner }}</span></div>
             </el-col>
             <el-col :span="12"><div class="info"><span class="infoText">类型&nbsp;:&nbsp;</span><span class="infoText2">{{ groupInfo.type }}</span></div>
             </el-col>
           </el-row>
            <el-row>
             <el-col :span="12"><div class="info"><span class="infoText">创建日期&nbsp;:&nbsp;</span><span class="infoText2">{{ groupInfo.date }}</span></div>
             </el-col>
             <el-col :span="12"><div class="info"><span class="infoText">人数&nbsp;:&nbsp;</span><span class="infoText2">{{ groupInfo.peoplecount }}</span></div>
             </el-col>
           </el-row>
            <el-row>
              <el-col :span="20"><div class="info2"><span class="infoText">简介&nbsp;:&nbsp;</span><span class="infoText2">{{ groupInfo.desc }}</span></div></el-col>
              <el-button id="post" @click="post" icon="el-icon-position">发表话题</el-button>
           </el-row>
         </div>
       </el-col>
     </el-row>
      </div>
      <el-row v-for="item in feeds" :key="item.id">
      <div class="groupPost">
        <el-row :gutter="70" align="middle" type="flex">
         <el-col :span="1" :offset="1"><div class=""><el-avatar :size="50" icon="el-icon-user-solid"></el-avatar></div></el-col>
         <el-col :span="17"><el-row class="feed-publisher">{{ item.publisher }}</el-row>
            <el-row class="feed-time">
              <i class="el-icon-time"></i>
              {{ item.time }}
            </el-row></el-col>
         <button class="feed-follow" v-if="item.isFollow === false" @click="follow(item)">关注</button>
         <button class="feed-unfollow" v-else @click="unfollow(item)">取消关注</button>
        </el-row>
      </div>
      </el-row>
      </el-col>
      <el-col :span="4">
        <div class="groupMember">
        <el-row>
          <el-col :span="24"><div class="adminbar"><span>管理员&nbsp;({{ groupInfo.admin.length}})</span></div></el-col>
        </el-row>
        <el-row v-for="item in groupInfo.admin" :key="item.id">
          <el-col :span="24"><div class="adminlist"><el-avatar :size="30" icon="el-icon-user-solid"></el-avatar><span>&nbsp;{{ item.name }}</span></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="memberbar"><span>成员&nbsp;({{ groupInfo.member.length }})</span></div></el-col>
        </el-row>
        <el-row  v-for="item in groupInfo.member" :key="item.id">
          <el-col :span="24"><div class="memberlist"><el-avatar :size="30" icon="el-icon-user-solid"></el-avatar><span>&nbsp;{{ item.name }}</span></div></el-col>
        </el-row>
      </div>
      </el-col>
      </el-row>
      <Footer id="footer"></Footer>
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
    follow(item) {
      item.isFollow = true;
    },
    unfollow(item) {
      item.isFollow = false;
    },
  },
  data() {
    return {
      isGroupMember: true,
      isOwner: true,
      url:'@/assets/Book.svg',
      groupInfo: {
        name:'皮卡一家亲',
        owner:'小黄乐',
        date:'2022-05-08',
        type:'图书',
        peoplecount:'55',
        desc:'欢迎加入皮卡一家亲，希望你们都喜欢皮卡丘~皮卡皮卡~',
        admin: [
          { 
            id:'A0001',
            name:'皮卡丘',
          },
          {
            id:'A0002',
            name:'杰尼龟',
          },
          {
            id:'A0003',
            name:'鲤鱼王',
          },
        ],
          member: [
          { 
            id:'M0001',
            name:'小火龙',
          },
          {
            id:'M0002',
            name:'佐助',
          },
          {
            id:'M0003',
            name:'佐助2',
          },
          {
            id:'M0004',
            name:'佐助3',
          },
          {
            id:'M0005',
            name:'佐助4',
          },
          {
            id:'M0006',
            name:'佐助5',
          },
                    {
            id:'M0007',
            name:'佐助6',
          },
                    {
            id:'M0008',
            name:'佐助7',
          },
                    {
            id:'M0009',
            name:'佐助8',
          },
        ],
      },
      feeds: [
        {
          id: "F0001",
          publisher: "娱乐八卦姐",
          time: "2022-05-07 21:08",
          title: "布魯斯威利罹失語症宣布息影　「壓箱作」導演：他是偉大的人",
          content:
            "67歲美國影星布魯斯威利（Bruce Willis）在今年3月閃電宣布引退，家人證實他罹患失語症，將漸漸失去說話和閱讀的能力。今年來他接片數量雖不少，但戲份大多不如以往，壓箱作品之一的《終極夜路》（Gasoline Alley），也將於近期在台灣上映。\n\n以洛杉磯街頭為背景的《終極夜路》，由布魯斯威利和戴文沙瓦（Devon Sawa）主演。故事描述一名有前科的刺青師，被警方認定為一宗連續殺人案的嫌疑犯，為了證明自己的清白，他必須設法查出真相。導演愛德華德雷克（Edward Drake）已經是第四次與布魯斯威利合作，對於這位昔日動作天王的表現，他依舊是讚譽有佳：「布魯斯是我有幸認識和合作過的最善良的人之一。」為了向布魯斯威利過去的事蹟致意，他表示劇組很認真的在製作這部電影，「我對這個人的評價不能再高了，他是個偉大的人。」\n\n除了布魯斯威利之外，愛德華德雷克這次還邀請曾演出《絕命終結站》的性格男星戴文沙瓦演出，對於這次和他合作的心得，愛德華德雷克表示：「戴文是我合作過最好的演員之一。他是非凡的。你可以從他的眼神中看出他的角色正在做決定，當他在推測他的選擇可能帶來的後果。」他又說：「當我遇到戴文之後，我才意識到我們有機會製作一部非常特別的作品。」《終極夜路》將於6月2日上映。\n\n转载于：ETtoday新聞雲",
          likeCount: 204,
          commentCount: 23,
          isFollow: true,
          isLike: true,
          comments: [
            {
              id: "C2001",
              publisher: "老公是王一博",
              likes: 12,
              dislikes: 0,
              contents: "太帅啦",
            },
            {
              id: "C2002",
              publisher: "我是我，不一样的花火",
              likes: 8,
              dislikes: 2,
              contents: "布鲁斯威利yyds!!!!",
            },
          ],
        },
        {
          id: "F0002",
          publisher: "娱乐八卦哥",
          time: "2022-05-07 21:08",
          title: "布魯斯威利罹失語症宣布息影　「壓箱作」導演：他是偉大的人",
          content:
            "67歲美國影星布魯斯威利（Bruce Willis）在今年3月閃電宣布引退，家人證實他罹患失語症，將漸漸失去說話和閱讀的能力。今年來他接片數量雖不少，但戲份大多不如以往，壓箱作品之一的《終極夜路》（Gasoline Alley），也將於近期在台灣上映。\n\n以洛杉磯街頭為背景的《終極夜路》，由布魯斯威利和戴文沙瓦（Devon Sawa）主演。故事描述一名有前科的刺青師，被警方認定為一宗連續殺人案的嫌疑犯，為了證明自己的清白，他必須設法查出真相。導演愛德華德雷克（Edward Drake）已經是第四次與布魯斯威利合作，對於這位昔日動作天王的表現，他依舊是讚譽有佳：「布魯斯是我有幸認識和合作過的最善良的人之一。」為了向布魯斯威利過去的事蹟致意，他表示劇組很認真的在製作這部電影，「我對這個人的評價不能再高了，他是個偉大的人。」\n\n除了布魯斯威利之外，愛德華德雷克這次還邀請曾演出《絕命終結站》的性格男星戴文沙瓦演出，對於這次和他合作的心得，愛德華德雷克表示：「戴文是我合作過最好的演員之一。他是非凡的。你可以從他的眼神中看出他的角色正在做決定，當他在推測他的選擇可能帶來的後果。」他又說：「當我遇到戴文之後，我才意識到我們有機會製作一部非常特別的作品。」《終極夜路》將於6月2日上映。\n\n转载于：ETtoday新聞雲",
          likeCount: 204,
          commentCount: 23,
          isFollow: true,
          isLike: true,
          comments: [
            {
              id: "C2001",
              publisher: "老公是王一博",
              likes: 12,
              dislikes: 0,
              contents: "太帅啦",
            },
            {
              id: "C2002",
              publisher: "我是我，不一样的花火",
              likes: 8,
              dislikes: 2,
              contents: "布鲁斯威利yyds!!!!",
            },
          ],
        },
      ],
    }
  }
}
</script>

<style scoped>
.groupInfo .el-row {
  margin-bottom: 10px;
}
.groupInfoInfo .el-row{
  margin-bottom: 20px;
}
.groupMember .el-row{
  margin-bottom: 0px;
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
  /* display: inline-block; */
  width: 92%;
  height: 350px;
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: 40px;
  background-color: #FCF8EC;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.25);
  /* border: solid black 1px; */
}
.title{
  margin-top: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #456268;
}
.buttonSlot{
  margin-top: 20px;
  height: 50px;
}
.groupMember{
  /* display: inline-block; */
  margin-top: 20px;
  max-height: 500px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px 0 0 0;
  overflow-y: scroll;
}
.groupPost{
  /* border: 1px solid black; */
  width: 92%;
  height: 500px;
  padding-top: 20px;
  margin-left: 50px;
  margin-bottom: 30px;
  background-color: #FCF8EC;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.25);
}
.groupPic{
  height: 250px;
}
.groupInfoInfo{
  height: 250px;
  margin-left: 30px;
}
.info {
  font-size: 24px;
}
.info2 {
  font-size: 24px;
  height: 130px;
}
.infoText{
  color: #79A3B1;
  font-weight: bold;  
}
.infoText2{
  color: #456268;
}
.adminbar, .memberbar{
  height: 30px;
  background-color: #D0E8F2;
  color: #456268;
  border-radius: 10px 0 0 0;
  padding-left: 10px;
}
.adminlist, .memberlist{
  display: flex;
  font-size: 20px;
  /* border: 1px solid black; */
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.feed-publisher {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 0px;
  /* outline: 1px black solid; */
}
.feed-unfollow:hover,
.feed-follow:hover {
  cursor: pointer;
}
.feed-unfollow {
  width: 130px;
  margin-left: 20px;
  font-size: 18px;
  line-height: 32px;
  font-weight: 600;
  border-radius: 15px;
  background: none;
  color: #456268;
  border: #456268 1px solid;
}
.feed-follow {
  width: 130px;
  margin-left: 20px;
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  border: 1px #456268 solid;
  color: #fcf8ec;
  background-color: #456268;
  border-radius: 15px;
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
#post{
  font-size: 20px;
  float: right;
  position: absolute;
  margin-left: 30px;
  margin-top: 90px;
  background-color: #D0E8F2;
  color: #456268;
}
/* button {
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
} */
#footer{
  position: relative;
  height: 88px;
}
</style>