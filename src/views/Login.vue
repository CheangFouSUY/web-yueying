<template>
    <div class='login'>
        <Header/>
        <div class="info">
        <div id='logo'>
        <img id="logoBook" src="@/assets/LogoBlue.svg">
        <h1>阅·影</h1>
        </div>
        <div class='inputBox'>
        <img class="icon" src="@/assets/Email.svg" alt="email_icon">
        <input type="text" v-model="form.email" placeholder="输入你的邮箱">
        </div>
        <div class='inputBox'>
        <img class="icon" src="@/assets/Password.svg" alt="password_icon">  
        <input type="password" v-model="form.password" placeholder="输入你的密码">
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
import qs from "qs";

export default {
  name: 'Login',
  components: {
    Header,
    Footer,
  },
  data() {
      return {
        form: {
            email:'',
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
    Login() {
        const self = this;
        const formData = new FormData();
        formData.append("username", self.form.email);
        formData.append("password", self.form.password);

        if (this.form.email === '' || this.form.password === '') {
        this.$message.warning("请输入邮箱和密码！");
        return;
      }

        self.$axios({
            method: 'post',           /* 指明请求方式，可以是 get 或 post */
            url: '/api/v1/auth/login/',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
            data: formData,
            // data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            // username: this.email,
            // password: this.password
            // })
        })
        .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.status_code) {
            case 200:
                this.$message.success("登录成功！");
                /* 将后端返回的 user 信息使用 vuex 存储起来 */
                this.$store.dispatch('saveUserInfo', {
                user: {
                    'username': res.data.username,
                    'confirmed': true,
                    // 'token': res.data.token,
                    // 'userId': res.data.user_id
                }
                });
                this.$router.push('/');
                // /* 从 localStorage 中读取 preRoute 键对应的值 */
                // const history_pth = localStorage.getItem('preRoute');
                // /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
                // setTimeout(() => {
                // if (history_pth == null || history_pth === '/register') {
                //     this.$router.push('/');
                // } else {
                //     this.$router.push({ path: history_pth });
                // }
                // }, 1000);
                break;
            case 400:
                window.alert("????");
                break;
            // case 401:
            //     window.alert("用户名不存在！");
            //     break;
            // case 402:
            //     window.alert("密码错误！");
            //     break;
            }
        })
        .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
}
  }
}
</script>

<style scoped>
.login #logo{
    width: 350px;
    margin: 0px auto 40px;
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
    width: 480px;
    margin-top: 80px;
    padding-top: 40px;
    padding-bottom: 40px;
    border-radius: 10px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.25);
}
</style>