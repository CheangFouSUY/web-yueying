<template>
    <div>
        <Header></Header>
        <div id="registerBox">
            <div id="logo">
                <img id="logoBook" src="@/assets/LogoBlue.svg">
                <h1>阅·影</h1>
            </div>
            <div class="Row">
                <span>昵称</span>
                <input type="text" v-model="form.username" placeholder="例 : 黄乐乐">
            </div>
            <div class="Row">
                <span>邮箱</span>
                <input type="email" v-model="form.email" placeholder="example@gmail.com">
            </div>
            <div class="Row">
                <span>密码</span>
                <input type="password" v-model="form.password" placeholder="密码需包含字母、数字及符号">
            </div>
            <div class="Row">
                <span>重复密码</span>
                <input type="password" v-model="form.password2" placeholder="请重新输入密码">
            </div>
            <div class="Row">
                <span>密保问题</span>
                <select id="sQuestion" name="sQuestion" v-model="form.securityQ">
                    <option value=0 style="display: none"></option>
                    <!-- <option value="">请选择一个密保问题</option> -->
                    <option value=1>您最喜欢的颜色是？</option>
                    <option value=2>您最讨厌的食物？</option>
                    <option value=3>您的最要好闺蜜/兄弟是？</option>
                    <option value=4>您的爱好是？</option>
                    <option value=5>您的初恋是？</option>
                </select>
            </div>
            <div class="Row">
                <span>密保答案</span>
                <input type="text" v-model="form.securityQans" placeholder="请输入密保答案">
            </div>
            <button id="goLogin" @click='Login'>已有帐号，立即登录</button>
            <div>
                <span></span>
                <button id="submit" @click="Submit">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
 import user from "@/store/user";

export default {
    name:'Register',
    components:{
        Header
    },
    data() {
        return {
            form: {
                username:'',
                email:'',
                password:'',
                password2:'',
                securityQ:0,
                securityQans:'',
            }

        }
    },
    methods:{
        Login(){
            this.$router.push('/login');
        },
        Submit(){
            if(this.form.username === '' || this.form.email === '' || this.form.password === '' || this.form.password2 === '' || 
            this.form.securityQ === 0 || this.form.securityQans === '') {
                this.$message.warning("请填写所有空格（包括密保问题）");
                return;
            }
            const formData = new FormData();
            formData.append("email",this.form.email);
            formData.append("username", this.form.username);
            formData.append("password", this.form.password);
            formData.append("password2",this.form.password2);
            formData.append("securityQuestion",this.form.securityQ);
            formData.append("securityAnswer",this.form.securityQans);

            this.$axios({
            method: 'post',  
            url: '/api/v1/auth/register/',
            data: formData,
        })
        .then(res => {
            console.log(res);
            switch (res.status) {
            case 201:
                // this.$message.success("注册成功，请到邮箱进行认证");
                this.$router.push('/registersuccess');
                this.$store.dispatch('saveUserInfo', {
                user: {
                    "confirmed": false,
                }
                });
                break;
            }
        })
        .catch(err => {
            console.log(err.response.data.code);
            // const key = Object.keys(err.response.data)[0];
            // switch(err.response.data[key][0]) {
            switch(err.response.data.code) {
            case 1001:
                this.$message.warning("邮箱已被使用");
                break;
            case 1002:
                this.$message.warning("用户名已被使用");
                break;
            case 1003:
                this.$message.warning("密码与重复密码不匹配");
                break;
            case 1004:
                this.$message.warning("密码需包含字母、数字及符号且字符数>=8");
                break;     
            default:
                this.$message.warning("填写信息错误");
            }
         })  
        }
    }
}
</script>

<style scoped>
::placeholder{
    font-size: 14px;
}
.Row{
    /* border: solid 1px; */
    padding-left: 30px;
}
#logo{
    width: 350px;
    margin: auto;
    height: 180px;
    /* border: solid 1px; */
}
#logoBook{
    display: inline-block;
    vertical-align: middle;
    width: 130px;
    margin: auto 8px;
}
h1{
    display: inline-block;
    vertical-align: middle;
    font-size: 80px;
    color: #456268;
    font-weight: 100;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
input:focus, select:focus{
    background-color: rgba(121, 163, 177, 0.6);
    outline: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}
input:hover{
    background-color: rgba(121, 163, 177, 0.6);
}
input, #sQuestion{
    display: inline-block;
    margin: 7px auto;
    height: 50px;
    width: 350px;
    padding-left: 20px;
    border: none;
    border-radius: 10px;
    background-color: rgba(121, 163, 177, 0.4);
    color: #456268;
    font-size: 20px;
    vertical-align: middle;
    box-sizing: border-box;
    -webkit-border-sizing: border-box;
    -moz-border-sizing: border-box;
}
#sQuestion:hover{
    background-color: rgba(121, 163, 177, 0.6);
    cursor: pointer;
}
#sQuestion{
    font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
    color: #456268;
    outline: none;
}
#sQuestion option{
    background-color: white;
}

#goLogin{
    width: 480px;
    margin: 0 auto;
    text-align: right;
    font-size: 14px;
    color: #456268;
    border: none;
    background: none;
}
#goLogin:hover{
    color: rgba(121, 163, 177, 0.6);
}

#submit{
    /* height: 40px; */
    /* width: 350px; */
    height: 50px;
    width: 100px;
    margin-top: 20px;
    margin-left: 140px;
    margin-bottom: 20px;
    background-color: #79A3B1;
    border: none;
    color: white;
    font-size: 20px;
    border-radius: 10px;
    /* letter-spacing: 4em; */
    /* text-indent: 4em; */
    /* text-align: center; */
}
#submit:hover{
    background-color: rgba(121, 163, 177, 0.6);
}
button{
    font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
    cursor: pointer;
}
#registerBox span{
    width: 80px;
    display: inline-block;
    color: #456268;
    margin: auto 15px auto ;
    vertical-align: middle;
    text-align: right;
    /* outline: 1px black solid; */
}
#registerBox{
    width: 580px;
    margin: 20px auto;
    border-radius: 10px;
    /* text-align: center; */
    font-size: 20px;
    /* outline: 1px black solid; */
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.25);
}
</style>