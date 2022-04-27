<template>
  <div id="app">
    <nav>
      <router-link to="/">主页</router-link> |
      <router-link to="/book">图书</router-link>
      <router-link to="/drama">影视</router-link>
      <router-link to="/post">话题</router-link>
      <router-link to="/group">小组</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #456268;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
