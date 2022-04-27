<template>
    <div>
        <Header></Header>
        <div id="registerBox">
            <div id="logo">
                <img id="logoBook" src="../../public/LogoBlue.svg">
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
                <form action="">
                    <input list="securityQuestions" name="securityQuestion">
                    <datalist id="securityQuestions">
                        <option value="您最喜欢的颜色是？"></option>
                        <option value="您最讨厌的食物？"></option>
                        <option value="您的最要好闺蜜/兄弟是？"></option>
                        <option value="您的爱好是？"></option>
                        <option value="您的初恋是？"></option>
                    </datalist>
                </form>
            </div>
            <div>
                <span>密保答案</span>
                <input type="text">
            </div>
            <div>
                <span></span>
                <button>登录</button>
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
    }
}
</script>

<style scoped>
#logo{
    border: 1px black solid;
}

#logoBook{
    width: 130px;
    border: 1px black solid;
    /* position: relative;
    top: 20px; */
    margin: 20px auto;
}

h1{
    display: inline-block;
    font-size: 80px;
    color: #456268;
    font-weight: 100;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

input:focus{
    background-color: rgba(121, 163, 177, 0.6);
    outline: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}

input:hover{
    background-color: rgba(121, 163, 177, 0.6);
}

input{
    display: inline-block;
    margin: 13px auto;
    height: 50px;
    width: 350px;
    padding-left: 20px;
    border: none;
    border-radius: 10px;
    background-color: rgba(121, 163, 177, 0.4);
    color: #456268;
    font-size: 24px;
    vertical-align: middle;
}

select{
    background-color: white;
}

form{
    display: inline-block;
}

button{
    height: 50px;
    width: 373px;
    margin: 15px auto;
    background-color: #456268;
    border: none;
    color: white;
    font-size: 26px;
    border-radius: 10px;
}

#registerBox span{
    width: 110px;
    display: inline-block;
    color: #456268;
    margin: auto 20px auto ;
    vertical-align: middle;
    text-align: right;
}

#registerBox{
    height: 700px;
    text-align: center;
    font-size: 26px;
    /* background-color: aquamarine; */
}
</style>