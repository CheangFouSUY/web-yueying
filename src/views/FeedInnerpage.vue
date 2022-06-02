<template>
  <div>
    <Header></Header>
    <div class="main">
      <FeedBox
      v-if="id"
        :initialFeedId="id"
        :initialIsPin="false"
        :initialIsFeatured="false"
        :initialIsAdmin="false"
      ></FeedBox>
    </div>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FeedBox from "@/components/FeedBox.vue";

export default {
  name: "FeedInnerpage",
  components: {
    Header,
    Footer,
    FeedBox,
  },
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  method: {
    getFeed() {
      this.$axios({
        method: "get",
        url: "",
      });
    },
  },
};
</script>

<style scoped>
.main {
  width: 1200px;
  margin: 30px auto;
}
#footer {
  position: relative;
  height: 88px;
}
</style>