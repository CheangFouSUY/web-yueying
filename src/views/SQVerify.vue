<template>
  <div>
    <Header id="header"></Header>
    <img id="bg" src="@/assets/background.jpg"/>
    <div id="Border">
      <div id="logo">
        <img src="@/assets/logo.png" />
      </div>
      <h1 class="sqTitle">密保问题验证</h1>
      <div class="verifyBox">
        <button id="getQuest" @click="GetQuestion">获取密保问题</button>
        <div class="inputBox">
          <img class="icon" src="@/assets/Usericon.svg" alt="email_icon">  
          <input type="text" v-model="username" placeholder="输入用户名">
        </div>
        <div class="inputBox">
          <img class="icon" src="@/assets/Question.svg" alt="question_icon">  
          <span id="sQuestion">{{ sQuestion }}</span>
        </div>
        <div v-if="isCorrect" class="inputBox">
          <img class="icon" src="@/assets/Check.svg" alt="answer_icon">  
          <input type="text" v-model="sAnswer" placeholder="输入密保答案">
        </div>
        <div v-if="isCorrect" class="inputBox">
          <img class="icon" src="@/assets/Key.svg" alt="key_icon">  
          <input type="password" v-model="password1" placeholder="输入新密码">
        </div>
        <div v-if="isCorrect" class="inputBox">
          <img class="icon" src="@/assets/Key.svg" alt="key_icon">  
          <input type="password" v-model="password2" placeholder="重新输入新密码">
        </div>
        <div class='changeLoginWay'>
          <button @click='EmailVerify'>邮箱验证</button>
          <span class='symbol'>|</span>
          <button @click='Login'>回到登录</button>
          <span class='symbol'>|</span>
          <button @click='RegisterNow'>立即注册</button>
        </div>
        <button id="submit" @click="Submit" v-loading.fullscreen.lock="fullscreenLoading">确定设置</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'SQVerify',
  components: {
    Header
  },
  data() {
    return {
      username:'',
      sQuestion:'',
      sQuestionNum:0,
      sAnswer:'',
      password1:'',
      password2:'',
      isCorrect: false,
      fullscreenLoading: false,
    }
  },
  methods:{
    EmailVerify(){
      this.$router.push('/emailverify')
    },
    Login(){
      this.$router.push('/login')
    },
    RegisterNow(){
      this.$router.push('/register')
    },
    Submit() {
      if(this.username == '' || this.password1 == '' || this.password2 == '' || this.sAnswer == '') {
        this.$message.warning("请填写所有空格");
        return;
      }
      this.fullscreenLoading = true;
      const formData = new FormData();
      formData.append("username", this.username);
      formData.append("newpassword", this.password1);
      formData.append("newpassword2", this.password2);
      formData.append("securityQuestion", this.sQuestionNum);
      formData.append("securityAnswer", this.sAnswer);

      this.$axios({
        method:'put',
        url:'/api/v1/auth/resetpwd/question/',
        data: formData,
      })
      .then(res =>{
        console.log(res);
        this.fullscreenLoading = false;
        this.$message.success("设置成功！快用新密码登录吧~")
        this.$router.push({ path:'/login'})
      })
      .catch(err =>{
        console.log(err);
        switch(err.response.data.message) {
          case "Password not match.":
            this.$message.warning("新密码和重复新密码不匹配");
            break;
          case "Password too simple.":
            this.$message.warning("密码需包含字母、数字及符号且字符数>=8");
            break;
          default:
            this.$message.warning("重置失败！");
        }
      })
    },
    GetQuestion(){
      if(this.username == '') {
        this.$message.warning("用户名不可为空");
        return;
      }

      this.$axios({
        method:'get',
        url:'/api/v1/auth/requestquestion/?username=' + this.username,
      })
      .then(res =>{
        console.log(res);
        this.isCorrect = true;
        switch(res.data.securityQuestion) {
          case 1:
            this.sQuestion = "您最喜欢的颜色是？";
            this.sQuestionNum = 1;
            console.log("THIS IS 1");
            break;
          case 2:
            this.sQuestion = "您最讨厌的食物？";
            console.log("THIS IS 2");
            this.sQuestionNum = 2;
            break;
          case 3:
            this.sQuestion = "您的最要好闺蜜/兄弟是？";
            console.log("THIS IS 3");
            this.sQuestionNum = 3;
            break;
          case 4:
            this.sQuestion = "您的爱好是？";
            console.log("THIS IS 4");
            this.sQuestionNum = 4;
            break;
          case 5:
            this.sQuestion = "您的初恋是？";
            console.log("THIS IS 5");
            this.sQuestionNum = 5;
            break;            
        }
      })
      .catch(err =>{
        console.log(err);
        this.$message.warning("用户名不存在");
      })
    }
  }
}
</script>

<style scoped>
::placeholder{
  color: rgba(245, 245, 245, 0.5);
  font-size: 18px;
}
/* logo和标题 */
#logo img{
  width: 280px;
}
.sqTitle{
  font-weight: 100;
  color: whitesmoke;
  text-align: center;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  margin: 0 auto 20px;
}

/* 输入框 */
.inputBox{
  height: 55px;
  width: 400px;
  margin: 0 auto 20px;
  text-align: left;
  border-radius: 10px;
  background-color: rgba(90, 86, 86, 0.5);
}
.icon{
  display: block;
  float: left;
  width: 40px;
  margin: 7px 10px;
}
input:focus{
  outline: none;
}
.inputBox:focus-within{
  background-color: rgba(77, 72, 65, 0.6);
}
.inputBox:hover{
  background-color: rgba(77, 72, 65, 0.6);
}
input{
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
  display: inline-block;
  height: 50px;
  width: 320px;
  border: none;
  background: none;
  color: whitesmoke;
  font-size: 20px;
}
.inputBox span{
  display: block;
  float: left;
  height: 20px;
  width: 320px;
  padding: 12px 1px;
  color: whitesmoke;
  text-align: left;
}
#getQuest{
  height: 50px;
  float: right;
  font-size: 20px;
  color: whitesmoke;
  border: none;
  background: none;
}
/* 跳转链接 */
.changeLoginWay button{
  display: inline-block;
  font-size: 16px;
  color: whitesmoke;
  border: none;
  background: none;
}
.changeLoginWay{
  width: 390px;
  margin: -20px auto 10px;
  text-align: right;
}
.changeLoginWay button:hover, #getQuest:hover{
  color: rgb(248, 225, 202);
}
.symbol{
  color: rgba(245, 245, 245, 0.523);
  font-weight: 100;
  font-size: 16px;
  margin: auto 2px;
}
#submit{
  margin: auto;
  display: block;
  margin: 20px auto;
  height: 50px;
  width: 420px;
  border: none;
  background-color: rgba(245, 245, 245, 0.459);
  border-radius: 10px;
  font-size: 20px;
  letter-spacing: 2.5em;
  text-indent: 2.5em;
  color: rgb(72, 44, 1);
}
#submit:hover{
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}
button{
  font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
  cursor: pointer;
}
.verifyBox{
    width: 680px;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
}
#sQuestion{
  font-size: 18px;
  margin-top: 3px;
}
#bg {
  width: 100%;
  position: absolute;
  z-index: -1;
  object-fit: cover;
}
#Border{
  text-align: center;
  width: 720px;
  margin: 30px auto;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: rgba(245, 245, 245, 0.326);
}
</style>