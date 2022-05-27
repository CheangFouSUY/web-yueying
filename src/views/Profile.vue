<template>
 <div class="Profile">
     <Header/>
     <el-row type="flex" justify="center">
        <el-col :span="20"><div class="profile-box">
        <el-row>
            <el-col :span="6"><div class="profile-content">
                <div class="profilePic">
                <el-upload v-if="isEdit"
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-image v-else :src="form.imageUrl"></el-image>
                </div>
                </div></el-col>
            <el-col :span="15"><div class="profile-content">
                <!-- <el-row>
                    <el-col :span="20"><div class="profile-info"><span class="profile-text1">ID&nbsp;:</span>
                    <span class="profile-text2">&nbsp;{{ form.id }}</span></div>
                    </el-col>
                </el-row> -->
                <el-row>
                    <el-col :span="20"><div class="profile-info"><span class="profile-text1">名字&nbsp;:</span>
                    <span v-if="!form.isEdit" class="profile-text2">&nbsp;{{ form.name }}</span>
                    <el-input v-else placeholder="请输入新昵称" v-model="form.name"></el-input></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20"><div class="profile-info"><span class="profile-text1">性别&nbsp;:</span>
                    <span class="profile-text2">&nbsp;{{ form.sex }}</span></div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20"><div class="profile-info"><span class="profile-text1">生日&nbsp;:</span>
                    <span class="profile-text2">&nbsp;{{ form.dob }}</span></div>
                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="20"><div class="profile-info"><span class="profile-text1">邮箱&nbsp;:</span>
                     <span class="profile-text2">&nbsp;{{ form.email }}</span></div>
                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="20"><div class="profile-info"><span class="profile-text1">自我介绍&nbsp;:</span>
                     <span class="profile-text2">&nbsp;{{ form.about }}</span></div>
                    </el-col>
                </el-row>
                </div></el-col>
            <el-col :span="3"><div class="profile-content"><el-button class="Edit" v-if="!form.isEdit" @click="form.isEdit = !form.isEdit">编辑资料</el-button>
                    <el-button class="EditFinish" type="danger" v-else @click="form.isEdit = !form.isEdit">完成编辑</el-button>
                 </div></el-col>
        </el-row>
        </div></el-col>
     </el-row>
     <el-row type="flex" justify="center">
         <el-col :span="20"><div>
        <FeedBox :initialFeed="feeds" :initialUser="user" :isShowFollow="isShowFollow"></FeedBox>
        </div></el-col>
     </el-row>
     <Footer id="footer" />
 </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FeedBox from "@/components/FeedBox.vue";
import user from "@/store/user";

export default {
    name:'Profile',
    components: {
        Header,
        Footer,
        FeedBox,
    },
    data() {
        return {
            form: {
                imageUrl:'',
                isEdit: false,
                id:'',
                name:'',
                sex:'',
                dob:'',
                email:'',
                about:'',
            },
            feeds: [
                {
                id: "F0001",
                publisher: "娱乐八卦姐",
                time: 1642014005919,
                title: "布魯斯威利罹失語症宣布息影　「壓箱作」導演：他是偉大的人",
                fullContent:
                    "67歲美國影星布魯斯威利（Bruce Willis）在今年3月閃電宣布引退，家人證實他罹患失語症，將漸漸失去說話和閱讀的能力。今年來他接片數量雖不少，但戲份大多不如以往，壓箱作品之一的《終極夜路》（Gasoline Alley），也將於近期在台灣上映。\n\n以洛杉磯街頭為背景的《終極夜路》，由布魯斯威利和戴文沙瓦（Devon Sawa）主演。故事描述一名有前科的刺青師，被警方認定為一宗連續殺人案的嫌疑犯，為了證明自己的清白，他必須設法查出真相。導演愛德華德雷克（Edward Drake）已經是第四次與布魯斯威利合作，對於這位昔日動作天王的表現，他依舊是讚譽有佳：「布魯斯是我有幸認識和合作過的最善良的人之一。」為了向布魯斯威利過去的事蹟致意，他表示劇組很認真的在製作這部電影，「我對這個人的評價不能再高了，他是個偉大的人。」\n\n除了布魯斯威利之外，愛德華德雷克這次還邀請曾演出《絕命終結站》的性格男星戴文沙瓦演出，對於這次和他合作的心得，愛德華德雷克表示：「戴文是我合作過最好的演員之一。他是非凡的。你可以從他的眼神中看出他的角色正在做決定，當他在推測他的選擇可能帶來的後果。」他又說：「當我遇到戴文之後，我才意識到我們有機會製作一部非常特別的作品。」《終極夜路》將於6月2日上映。\n\n转载于：ETtoday新聞雲",
                showContent: "",
                isExpand: false,
                image: [
                    require("@/assets/feedpic1.jpg"),
                    require("@/assets/feedpic2.jpg"),
                ],
                likeCount: 204,
                commentCount: 2,
                userComment: "",
                isFollow: false,
                isLike: true,
                comments: [
                    {
                    id: "C2001",
                    publisher: "老公是王一博",
                    time: "1651014005919",
                    contents: "太帅啦",
                    image: [],
                    likes: 12,
                    dislikes: 0,
                    isLike: true,
                    isDislike: false,
                    },
                    {
                    id: "C2002",
                    publisher: "我是我，不一样的花火",
                    time: "1651815905919",
                    contents: "布鲁斯威利yyds!!!!",
                    image: [require("@/assets/feedpic3.jpg")],
                    likes: 8,
                    dislikes: 2,
                    isLike: false,
                    isDislike: false,
                    },
                ],
                },
                {
                id: "F0002",
                publisher: "周董啦啦啦",
                time: 1651714005919,
                title: "快訊／昆凌生了！　周杰倫罕見「曝光三女兒正臉超Q照」：辛苦了",
                fullContent:
                    "周杰倫和昆凌終於迎接三寶誕生！稍早昆凌在IG發文，正式官宣兩人的三女兒來到，「Just when you think you know Love, something little comes along to remind you just HOW BIG IT REALLY IS.」（當你以為你已經了解什麼是愛，有些小事情就會來提醒你，愛有多麽巨大。）\n\n而周杰倫更是罕見直接PO出女兒的正臉照，「母女兩位都辛苦了，@hannah_quinlivan，Thank God for this beautiful gift! （感謝神送來這麼美麗的禮物）」以往大女兒和二兒子幾乎沒有曝光過正面清晰長相，周董這回卻罕見讓小女兒露臉，可見得他心情有多麽愉悅。不過根據照片，小朋友看起來應已出生一陣子。\n\n先前周董好友劉畊宏在直播中，不小心透露周董女兒在上個月21日出生，雖然隨後他表示是誤會一場，但還是讓不少網友發現些許疑點，認為周董女兒很有可能真的已經出生，如今周董和昆凌選擇親自公布喜訊，瞬間也湧進不少粉絲祝福。對此，目前周董所屬杰威爾暫無回應。",
                showContent: "",
                isExpand: false,
                image: [
                    require("@/assets/feedpic4.jpg"),
                    require("@/assets/feedpic5.jpg"),
                ],
                likeCount: 204,
                commentCount: 5,
                userComment: "",
                isFollow: true,
                isLike: false,
                comments: [
                    {
                    id: "C3001",
                    publisher: "看什么看",
                    time: "1651814005919",
                    contents: "太可爱了吧",
                    image: [],
                    likes: 80,
                    dislikes: 0,
                    isLike: true,
                    isDislike: false,
                    },
                    {
                    id: "C3002",
                    publisher: "没看过帅哥？",
                    time: "1651955905919",
                    contents: "要99鸭！！！！",
                    image: [],
                    likes: 45,
                    dislikes: 0,
                    isLike: false,
                    isDislike: false,
                    },
                    {
                    id: "C3003",
                    publisher: "还是没看过美女？",
                    time: "1651966905919",
                    contents: "好可爱！！",
                    image: [],
                    likes: 40,
                    dislikes: 0,
                    isLike: false,
                    isDislike: false,
                    },
                    {
                    id: "C3004",
                    publisher: "再看也不是你的",
                    time: "1652055905919",
                    contents: "周董yyds",
                    image: [],
                    likes: 61,
                    dislikes: 0,
                    isLike: false,
                    isDislike: false,
                    },
                    {
                    id: "C3005",
                    publisher: "你可以走了",
                    time: "1652072905919",
                    contents: "芜湖",
                    image: [],
                    likes: 20,
                    dislikes: 2,
                    isLike: false,
                    isDislike: false,
                    },
                ],
                },
            ],
        }
    },
    created() {
    const userInfo = user.getters.getUser(user.state());
    this.form.id = userInfo.user.id;
    this.$axios({
    method: 'get',  
    url: `/api/v1/user/${this.form.id}`,
    })
    .then(res => {
        console.log(res);
        this.form.name = res.data.username;
        this.form.sex = res.data.gender;
        this.form.dob = res.data.dob;
        this.form.email = res.data.email;
        this.form.about = res.data.about;
        this.form.imageUrl = res.data.profile;
    })
    .catch(err => {
        this.$message.warning(err)
        })
    },
    methods: {
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isTypeTrue = 
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isTypeTrue) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isTypeTrue && isLt2M);
      },
    }
}
</script>

<style scoped>
.profile-box{
    margin-top: 20px;
    padding-top: 35px;
    height: 300px;
    /* width: 1266px; */
    background-color: #FCF8EC;
    box-shadow: 0px 4px 20px 3px rgba(0, 0, 0, 0.25);
    margin-bottom: 40px;
}
.profile-content{
    height: 300px;
}
.profile-content .el-row{
    margin-bottom: 10px;
}
.profilePic{
  margin: auto;
  width: 256px;
  height: 256px;
}
.profilePic .el-image{
    display: block;
    width: 256px;
    height: 256px;
}
.profile-info{
    font-size: 20px;
    margin-top: 15px;
}
.profile-info .el-input{
    display: inline-block;
    width: 200px;
    margin-left: 10px;
    font-size: 19px;
    position: absolute;
    top: 10px;
}
.profile-text1{
    color: #79A3B1;
}
.profile-text2{
    color: #456268;
}
.Edit{
    background-color: #456268;
    color: #FCF8EC;
}
.bg-blue{
    background: blue;
}
.bg-red{
    background: red;
}
.bg-yellow{
    background: yellow;
}
.feedbox{
    width: 1266px;
}
#footer{
    position: relative;
    height: 88px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 256px;
  height: 256px;
  line-height: 256px;
  text-align: center;
  background-color: white;
}
.avatar {
  width: 256px;
  height: 256px;
  display: block;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>