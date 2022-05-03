<template>
  <div>
      <Header></Header>
      <p>group inner yay</p>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'CreateGroup',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>

</style>