<template>
<div class="nav">
    <img id="headerLogo" src="../../public/LogoWhite.svg">
    <a href="#" id="logoName">阅·影</a>
    <a href="#">主页</a>
    <a href="#">图书</a>
    <a href="#">影视</a>
    <a href="#">话题</a>
    <a href="#">小组</a>
</div>
</template>
<script>
export default {
    name:'Header'
}
</script>
<style>
#headerLogo{
    width: 90px;
    float: left;
    margin-top: -10px;
}

#logoName{
    font-size: 50px;
    font-weight: 100;
    margin: auto 40px auto -10px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.nav{
    height: 70px;
    padding: 20px;
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
</style>
