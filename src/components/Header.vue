<template>
<div class="nav">
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
#logoName{
    font-size: 50px;
    margin: auto auto auto 70px;
    /* margin-left: 100px;
    margin-top: 0px;
    margin-right: ; */
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
