<template>
  <div>
    <Header id="header"></Header>
    <div id="main" :style="{ 'min-height': mainMinHeight + 'px' }">
      <FeedBox
      v-if="id"
        :initialFeedId="id"
        :initialIsInnerpage="true"
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
      mainMinHeight: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.mainMinHeight =
      document.documentElement.clientHeight -
      $("#header").outerHeight(true) -
      $("#footer").outerHeight(true) -
      6;
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
#main {
  width: 1200px;
  margin: auto;
  padding: 30px 0;
  box-sizing: border-box;
}
#footer {
  bottom: 0;
}
</style>