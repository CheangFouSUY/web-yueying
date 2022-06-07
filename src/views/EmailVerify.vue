<template>
  <div>
    <Header id="header"></Header>
    <img id="bg" src="@/assets/background.jpg" :style="{ height: bgHeight + 'px' }"/>
    <div id="Border">
      <div id="logo">
        <img src="@/assets/logo.png" />
      </div>
      <h1 class="emailTitle">邮箱验证</h1>
      <div class="verifyBox">
        <div class="inputBox">
          <img class="icon" src="@/assets/Email.svg" alt="email_icon">  
          <input type="text" v-model="email" placeholder="输入邮箱">
        </div>
        <div class="inputBox">
          <img class="icon" src="@/assets/Usericon.svg" alt="user_icon">  
          <input type="text" v-model="username" placeholder="输入名字">
        </div>
        <div class='changeLoginWay'>
          <button @click='QuesVerify'>密保问题验证</button>
          <span class='symbol'>|</span>
          <button @click='Login'>回到登录</button>
          <span class='symbol'>|</span>
          <button @click='RegisterNow'>立即注册</button>
        </div>
        <button id="submit" @click="getResetLink">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'EmailVerify',
  components: {
    Header
  },
  data() {
    return {
      email:'',
      username:'',
      bgHeight:'',
    }
  },
  mounted() {
    this.bgHeight =  document.documentElement.clientHeight - $("#header").outerHeight(true) - 1;
  },
  methods:{
    QuesVerify(){
      this.$router.push('/sqverify')
    },
    Login(){
      this.$router.push('/login')
    },
    RegisterNow(){
      this.$router.push('/register')
    },
    getResetLink(){
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("username", this.username);

      this.$axios({
            method: 'post',  
            url: '/api/v1/auth/request/',
            data: formData,
      })
      .then(res => {
        console.log(res);
        this.$message.success("发送成功！请到邮箱进行密码恢复");
        this.$router.push({ path:'/login'});
      })
      .catch(err =>{
        console.log(err);
        this.$message.warning("邮箱和用户名错误");
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
.emailTitle{
  font-weight: 100;
  color: whitesmoke;
  text-align: center;
  letter-spacing: 1em;
  text-indent: 1em;
  margin: 0 auto 20px;
}

/* 输入框 */
.inputBox{
  height: 55px;
  width: 400px;
  margin: 0px auto 40px;
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
  margin: -40px auto 10px;
  text-align: right;
}
.changeLoginWay button:hover{
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
  width: 400px;
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
    width: 650px;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    /* outline: 1px black solid; */
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
  margin: 50px auto;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: rgba(245, 245, 245, 0.326);
}
</style>