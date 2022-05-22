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
              :style="{ minWidth: width }"
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
            v-show="currentOffset < 0"
            @click="left"
          ></i>
          <i
            class="el-icon-arrow-right"
            v-show="currentOffset > -854"
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
    width: {
      default: "16.67%",
    },
  },
  data() {
    return {
      showList: this.initialList,
      currentOffset: 0,
      boxWidth: "",
      fatherWith: 0,
    };
  },
  mounted() {
    this.setCardWidth();
    window.addEventListener("resize", () => {
      this.currentOffset = 0;
      this.setCardWidth();
    });
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
    },
    left() {
      if (this.currentOffset >= 0) return;
      this.currentOffset += this.fatherWith / 6;
    },
    goDetails(id) {
      this.$router.push({ path: `/book/${id}` });
    },
  },
};
</script>

<style scoped>
.el-row {
  outline: 1px red solid;
}
#swiper-box {
  display: flex;
  transition: all 0.5s;
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
  outline: 1px red solid;
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