<template>
  <div>
    <Header></Header>
    <h1>Feed Mainpage</h1>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'FeedMainpage',
  components: {
    Header,
    Footer
  }
}
</script>