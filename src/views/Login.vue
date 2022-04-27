<template>
    <div class='login'>
        <Header/>
        <h1>阅·影</h1>
        <div>
        <input type="text" v-model="email" placeholder="输入你的邮箱">
        </div>
        <div>
        <input type="password" v-model="password" placeholder="输入你的密码">
        </div>
        <div class='ForgetnRegister'>
        <span @click='ForgetPw'>忘记密码</span>
        <span id='symbol'>|</span>
        <span @click='RegisterNow'>立即注册</span>
        </div>
        <button @click='Login'>登录</button>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Login',
  components: {
    Header
  },
  methods: {
    ForgetPw() {
        this.$router.push("/emailverify");
    },
    RegisterNow() {
        this.$router.push("/register");
    },
    Login() {
        this.$router.push("/");
    },
  }
}
</script>

<style>
.login h1{
    margin-top: 50px;
    text-align: center;
    font-size: 72px;
    color: #456268;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.login input{
    display: block;
    background: rgba(121, 163, 177, 0.4);
    width: 350px;
    height: 55px;
    margin: 30px;
    margin-left: auto;
    margin-right: auto;
    border: none;
    font-size:20px;
    border-radius: 10px;
    padding-left: 80px;  
}
.login input:focus{
    background-color: rgba(121, 163, 177, 0.6);
    outline: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}
.login button{
    display: block;
    margin-top: 20px;
    height: 55px;
    width: 400px;
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
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
    width: 420px;
    display:inline-block;
    position: relative;
    top: -20px;
    text-align: right;
}
.ForgetnRegister span:hover{
    color: rgba(121, 163, 177, 0.6);
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
;
}
.login{
    text-align: center;
}
</style>