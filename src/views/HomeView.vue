<template>
  <div>
    <Header></Header>
    <h1>Hello World</h1>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    Header,
    Footer,
  }
}
</script>
