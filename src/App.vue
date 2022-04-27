<template>
  <div id="app">
    <nav>
      <HeaderComponent/>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </nav>
    <router-view/>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
export default {
  name:'App',
  components: {
    HeaderComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  padding:0;
  margin:0;
}

nav {
  /* padding: 30px; */
    background-color:beige;
    overflow:hidden;
}

nav a {
  color: #2c3e50;
  float:left;
  color:cornflowerblue;
  padding: 14px 16px;
  text-align: center;
  text-decoration: none;
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
