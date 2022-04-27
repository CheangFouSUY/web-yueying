<template>
<div class="nav">
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
#logoName{
    font-size: 50px;
    margin: auto 40px auto 100px;
    /* margin-left: 100px;
    margin-top: 0px;
    margin-right: ; */
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
    padding-left: 20px;
    padding-right: 20px;
    color: white;
    text-decoration: none;
}
</style>
