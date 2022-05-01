<template>
  <div>
    <Header></Header>
    <h1>Drama Mainpage</h1>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'DramaMainpage',
  components: {
    Header,
    Footer,
  }
}
</script>