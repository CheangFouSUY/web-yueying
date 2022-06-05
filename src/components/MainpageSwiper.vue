<template>
  <div class="wrapper">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="22">
        <div id="father">
          <div
            id="swiper-box"
            :style="{ transform: 'translateX(' + currentOffset + 'px)' }"
          >
            <div
              class="item-box"
              v-for="item in showList"
              :key="item.id"
              :style="{ minWidth: width, maxWidth: width}"
            >
              <div class="image-box">
                <el-image
                  class="poster"
                  :src="item.thumbnail"
                  @click="goDetails(item.id)"
                ></el-image>
              </div>
              <div class="title-wrap">
                <span class="book-title" @click="goDetails(item.id)">
                  {{ item.title }}
                </span>
                <span class="rating">{{ item.rating }}</span>
              </div>
            </div>
          </div>
          <i
            class="el-icon-arrow-left"
            v-show="currentOffset < -5"
            @click="left"
          ></i>
          <i
            class="el-icon-arrow-right"
            v-show="currentOffset > -854 && listLength>6"
            @click="right"
          ></i>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MainpageSwiper",
  props: {
    initialList: Array,
    listType: String,
    width: {
      default: "16.67%",
    },
  },
  data() {
    return {
      showList: this.initialList,
      listLength: "",
      type: this.listType,
      currentOffset: 0,
      boxWidth: "",
      fatherWith: 0,
    };
  },
  mounted() {
    this.setCardWidth();
    this.listLength = this.showList.length;
  },
  methods: {
    setCardWidth() {
      const father = document.querySelector("#father");
      this.fatherWith = father.clientWidth;
      this.boxWidth = this.fatherWith / 6 + "px";
    },
    right() {
      if (this.currentOffset <= (-this.fatherWith / 6) * 4) return;
      this.currentOffset -= this.fatherWith / 6;
      console.log(this.currentOffset);
    },
    left() {
      if (this.currentOffset >= 0) return;
      this.currentOffset += this.fatherWith / 6;
      console.log(this.currentOffset);
    },
    goDetails(id) {
      if(this.listType == "book")
        this.$router.push({ path: `/book/detail/${id}` });
      else if(this.listType == "movie")
        this.$router.push({ path: `/movie/detail/${id}` });
    },
  },
};
</script>

<style scoped>
#swiper-box {
  display: flex;
  transition: all 0.5s;
  height: 350px;
}
#father {
  overflow: hidden;
}
.item-box {
  padding: 0 5px;
  box-sizing: border-box;
}

.rating {
  display: block;
  float: right;
}
.book-title:hover {
  color: #79a3b1;
  cursor: pointer;
}
.book-title {
  display: block;
  float: left;
  width: 150px;
  text-decoration: none;
  color: #456268;
}
.title-wrap {
  height: 60px;
  padding: 5px;
  position: relative;
  top: -4px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: #fcf8ec;
}
.image-box {
  height: 270px;
  overflow: hidden;
}
.poster {
  width: 100%;
  height: 270px;
}
.poster:hover {
  cursor: pointer;
}
.item-box a {
  display: block;
  overflow: hidden;
}

.el-icon-arrow-left,
.el-icon-arrow-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  cursor: pointer;
  color: #79a3b1;
}
.el-icon-arrow-left {
  left: 10px;
}
.el-icon-arrow-right {
  right: 10px;
}

.wrapper {
  margin-top: 20px;
}
</style>