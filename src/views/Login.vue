<template>
    <div class='login'>
        <Header/>
        <div class="info">
        <div id='logo'>
            <img src="@/assets/logo.png" />
        <!-- <img id="logoBook" src="@/assets/LogoBlue.svg"> -->
        <!-- <h1>阅·影</h1> -->
        </div>
        <div class='inputBox'>
        <img class="icon" src="@/assets/Email.svg" alt="email_icon">
        <input type="text" v-model="form.username" placeholder="请输入用户名或邮箱">
        </div>
        <div class='inputBox'>
        <img class="icon" src="@/assets/Password.svg" alt="password_icon">  
        <input @keyup.enter="Login" type="password" v-model="form.password" placeholder="请输入密码">
        </div>
        <div class='ForgetnRegister'>
        <span @click='ForgetPw'>忘记密码</span>
        <span id='symbol'>|</span>
        <span @click='RegisterNow'>立即注册</span>
        </div>
        <button @click='Login'>登录</button>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Login',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
        form: {
            username:'',
            password:'',
        }
      }
  },
  methods: {
    ForgetPw() {
        this.$router.push("/emailverify");
    },
    RegisterNow() {
        this.$router.push("/register");
    },
    async Login() {
        if(this.form.username == '' || this.form.password == '') {
            this.$message.warning("邮箱/用户名和密码不可为空");
            return;
        }

        const formData = new FormData();
        formData.append("username", this.form.username);
        formData.append("password", this.form.password);

        await this.$axios({
            method: 'post',  
            url: '/api/v1/auth/login/',
            data: formData,
        })
        .then(res => {
            console.log(res);
            switch (res.status) {
            case 200:
                console.log(res.status);
                localStorage.setItem('token', res.data.tokens.access);
                this.$message.success("登录成功！");
                this.$store.dispatch('saveUserInfo', {
                user: {
                    'username': res.data.username,
                    "confirmed": true,
                    'id': res.data.id,
                    "profilePic": res.data.profile,
                }
                });

                const history_pth = localStorage.getItem('preRoute');
                setTimeout(() => {
                if (history_pth == null || history_pth === '/register') {
                    this.$router.push('/');
                } else {
                    this.$router.push({ path: history_pth });
                }
                }, 500);
                break;
            }
        })
        .catch(err => {
            console.log(err);
            this.$message.warning("用户名/邮箱不存在或密码错误");
         })
    }
  }
}
</script>

<style scoped>
::placeholder{
    font-size: 18px;
}
.login #logo img{
    width: 300px;
}
.login #logo{
    width: 350px;
    margin: 0 auto;
}
.login #logoBook{
    display: inline-block;
    vertical-align: middle;
    width: 130px;
    margin: auto 8px;
}
#logo h1{
    display: inline-block;
    vertical-align: middle;
    margin: auto;
    font-size: 80px;
    color: #456268;
    font-weight: 100;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.login h1{
    margin-top: 50px;
    text-align: center;
    font-size: 72px;
    color: #456268;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.login input{
    display: inline-block;
    background: none;
    border: none;
    width: 350px;
    height: 55px;
    font-size:20px;
    font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
}
.login input:focus{
    outline: none;
}
.login button{
    display: block;
    margin-top: 20px;
    height: 50px;
    width: 100px;
    border: none;
    margin-left: auto;
    margin-right: auto;
    background-color: #79A3B1;
    border-radius: 10px;
    font-size: 20px;
    color: white;
}
.login button:hover{
    cursor: pointer;
    background-color: rgba(121, 163, 177, 0.6);
    outline: none;
}
.ForgetnRegister span{
    display: inline-block;
    font-size: 18px;
    color: #456268;
    cursor: pointer;
    margin-left: 10px;
}
.ForgetnRegister{
    display: inline-block;
    margin-left: 220px;
    width: 190px;
    margin-bottom: 20px;
}
.ForgetnRegister span:hover{
    color: rgba(121, 163, 177, 0.6);
}
.login .inputBox{
  width: 420px;
  height: 55px;
  margin: 30px auto 0px;
  border-radius: 10px;
  background-color: rgba(121, 163, 177, 0.4);
}
.login .icon{
  display: inline;
  vertical-align: middle;
  width: 40px;
  margin: auto 10px 10px 10px;
}
.login .inputBox:focus-within{
    background-color: rgba(121, 163, 177, 0.6);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}
.login .inputBox:hover{
    background-color: rgba(121, 163, 177, 0.6);
}
#symbol{
    cursor: default;
    font-size: 25px;
}
#symbol:hover{
    color: #456268;
}
input, select, textarea{
    color: #456268;
}
input::placeholder{
  color:  #456268;
}
.info{
    text-align: center;
    margin: auto;
    width: 600px;
    margin: 50px auto;
    padding-top: 20px;
    padding-bottom: 20px;
    /* border-radius: 10px; */
    /* background-color: rgba(121, 163, 177, 0.5); */
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.25);
}
</style>