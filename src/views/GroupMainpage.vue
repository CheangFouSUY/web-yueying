<template>
  <div class="group">
    <Header></Header>
    <button @click="Create">创建小组</button>
  <div>

  </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'GroupMainpage',
  components: {
    Header,
    Footer,
  },
  methods: {
    Create(){
      this.$router.push('/creategroup')
    },
  }
}

</script>
