<template>
    <div>
        <Header></Header>
        <div id="registerBox">
            <div id="logo">
                <img id="logoBook" src="@/assets/LogoBlue.svg">
                <h1>阅·影</h1>
            </div>
            <div>
                <span>昵称</span>
                <input type="text">
            </div>
            <div>
                <span>邮箱</span>
                <input type="email">
            </div>
            <div>
                <span>密码</span>
                <input type="password">
            </div>
            <div>
                <span>重复密码</span>
                <input type="password">
            </div>
            <div>
                <span>密保问题</span>
                <select id="sQuestion" name="sQuestion">
                    <option style="display: none"></option>
                    <option value="colour">您最喜欢的颜色是？</option>
                    <option value="food">您最讨厌的食物？</option>
                    <option value="friend">您的最要好闺蜜/兄弟是？</option>
                    <option value="hobby">您的爱好是？</option>
                    <option value="love">您的初恋是？</option>
                </select>
            </div>
            <div>
                <span>密保答案</span>
                <input type="text">
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

export default {
    name:'Register',
    components:{
        Header
    },
    methods:{
        Login(){
            this.$router.push('/login');
        },
        Submit(){
            this.$router.push('/register');
        }
    }
}
</script>

<style scoped>
#logo{
    width: 350px;
    margin: auto;
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
    height: 40px;
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
    height: 40px;
    width: 350px;
    margin: 25px auto;
    background-color: #79A3B1;
    border: none;
    color: white;
    font-size: 20px;
    border-radius: 10px;
    letter-spacing: 4em;
    text-indent: 4em;
    text-align: center;
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
    width: 600px;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    /* outline: 1px black solid; */
}
</style>