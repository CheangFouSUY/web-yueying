<template>
<div class="nav">
    <a href="/" id="logoName">
        <img id="headerLogo" src="@/assets/LogoWhite.svg">
        阅·影
    </a>
    <a href="/book" class="navLink">图书</a>
    <a href="/drama" class="navLink">影视</a>
    <a href="/feed" class="navLink">话题</a>
    <a href="/group" class="navLink">小组</a>
    <div class='searchBox'>
                <select id="Type" name="Type">
                    <option value="all">全部</option>
                    <option value="books">图书</option>
                    <option value="dramas">影视</option>
                    <option value="feeds">话题</option>
                    <option value="groups">小组</option>
                </select>
        <input type='text' v-model='search' placeholder="输入你想搜索的内容">
        <img class="navicon" src="@/assets/Search.svg" alt="search_icon">
    </div>
    <a href="/login" id='login'>登录</a>
</div>
</template>

<script>
export default {
    name:'Header'
}
</script>

<style scoped>
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
    font-size: 22px;
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
    margin: auto;
    padding: 10px 15px;
    padding-right: 15px;
    color: white;
    text-decoration: none;
}
.searchBox{
    display: inline-block;
    border-radius: 10px;
    background-color: rgba(208, 232, 242, 0.1);
    height: 40px;
    width: 400px;
    margin-top: 8px;
    margin-left: 300px; 
}
.searchBox input{
    font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
    height: 30px;
    width: 275px;
    margin-top: 5px;
    margin-left: 10px;
    border: none;
    color: white;
    background-color: rgba(208, 232, 242, 0.01);
}
.searchBox input::placeholder{
    color: white;
}
.searchBox input:focus {
    outline: none;
}
.navicon {
    width: 30px;
    float: right;
    margin-top: 5px;
    margin-right: 5px;
}
.navicon:hover{
    cursor: pointer;
}
#login{
    float:right;
}
#Type{
    float: left;
    height: 30px;
    background-color: rgba(208, 232, 242, 0.01);
    margin-left: 10px;
    margin-top: 5px;
    font-size: 16px;
    color: white;
    font-family: "Microsoft JhengHei", 微软正黑体, "Microsoft YaHei", 微软雅黑;
    outline: none;
    position: relative;
    border: none;
}
#Type:hover{
    cursor: pointer;
}
#Type option{
    background-color: #79A3B1;
}
</style>
