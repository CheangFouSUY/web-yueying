<template>
<div class="nav">
    <img id="headerLogo" src="../../public/LogoWhite.svg">
    <a href="/" id="logoName">阅·影</a>
    <a href="#">图书</a>
    <a href="#">影视</a>
    <a href="#">话题</a>
    <a href="#">小组</a>
    <router-link id='login' to="/login">登录</router-link>
</div>
</template>
<script>
export default {
    name:'Header'
}
</script>

<style>
#headerLogo{
    width: 80px;
    float: left;
    margin-top: -5px;
}

#logoName{
    font-size: 50px;
    font-weight: 100;
    margin: auto 10px auto -20px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.nav{
    height: 70px;
    padding: 5px;
    font-size: 32px;
    background-color: #79A3B1;
}
a{
    display: block;
    float: left;
    /* border: 1px black solid; */
    margin-top: 20px;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
    text-decoration: none;
}
#login{
    float:right;
}
</style>
