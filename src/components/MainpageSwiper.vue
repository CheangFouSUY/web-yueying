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
              v-for="item in books"
              :key="item.id"
              :style="{ minWidth: width }"
            >
              <div class="image-box" @click="gotodetails">
                <img :src="item.src" alt="" />
              </div>
              <div class="title-wrap">
                <a class="book-title" href="item.url">{{ item.name }}</a>
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
  name: "HotBook",

  props: {
    width: {
      default: "16.67%",
    },
  },
  data() {
    return {
      currentOffset: 0,
      boxWidth: "",
      fatherWith: 0,
      books: [
        {
          id: "B001",
          name: "盗墓笔记1",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          url: "/daomubiji"
        },
        {
          id: "D002",
          name: "猎罪图鉴2",
          rating: 4.8,
          src: require("../assets/poster/LieZuiTuJian.jpg"),
          url: "/liezuitujian"
        },
        {
          id: "B003",
          name: "盗墓笔记3",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          url: "/daomubiji"
        },
        {
          id: "B004",
          name: "盗墓笔记4",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          url: "/daomubiji"
        },
        {
          id: "B005",
          name: "盗墓笔记5",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          url: "/daomubiji"
        },
        {
          id: "B006",
          name: "盗墓笔记6",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          url: "/daomubiji"
        },
        {
          id: "B007",
          name: "盗墓笔记7",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          url: "/daomubiji"
        },
        {
          id: "B008",
          name: "盗墓笔记8",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          url: "/daomubiji"
        },
        {
          id: "B009",
          name: "盗墓笔记9",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          url: "/daomubiji"
        },
        {
          id: "B0010",
          name: "盗墓笔记10",
          rating: 4.6,
          src: require("../assets/poster/DaoMuBiJi.jpg"),
          url: "/daomubiji"
        },
      ],
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
    gotodetails(){

    }
  },
};
</script>

<style scoped>
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
img {
  width: 100%;
}
.image-box{
  height: 270px;
  overflow: hidden;
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