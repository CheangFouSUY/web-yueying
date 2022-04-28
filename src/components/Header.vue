<template>
<div class="nav">
    <!-- <img id="headerLogo" src="../../public/LogoWhite.svg"> -->
    <a href="/" id="logoName">
        <img id="headerLogo" src="../../public/LogoWhite.svg">
        阅·影
    </a>
    <a href="#" class="navLink">图书</a>
    <a href="#" class="navLink">影视</a>
    <a href="#" class="navLink">话题</a>
    <a href="#" class="navLink">小组</a>
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
    width: 55px;
    float: left;
    margin-left: 30px;
    margin-top: -4px;
}

#logoName{
    height: 45px;
    font-size: 36px;
    font-weight: 100;
    margin: -3px 20px auto -15px;
    padding: 5px 20px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.nav{
    height: 55px;
    font-size: 24px;
    background-color: #79A3B1;
}
.navLink:hover{
    background-color: #6f9caa;
}
a{
    display: block;
    float: left;
    height: 35px;
    /* outline: 1px black solid; */
    margin: auto ;
    padding: 10px 15px;
    padding-right: 15px;
    color: white;
    text-decoration: none;

}
#login{
    float:right;
}
</style>
