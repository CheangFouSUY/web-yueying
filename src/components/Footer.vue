<template>
  <div class="footer">
      <p class="info">电话: 012-3456789</p>
      <p class="info">邮箱: pikatea@buaa.edu.cn</p>
      <span @click='Feedback' class="feedback">反馈</span>
      <img class="icon" src="@/assets/Feedback.svg" alt="feedback_icon">
      <p class="info">地址: 北航大运村10号楼留学生公寓</p>
      <p class="info">Copyright © 2022 PikaTea. All Rights Reserved.</p>
  </div>
</template>

<script>
export default {
    name:'Footer',
    methods: {
        Feedback() {
            this.$router.push("/feedback")
        }
    }
}
</script>

<style scoped>
.footer {
    /* position: fixed; */
    /* left: 0; */
    /* bottom: 0; */
    width: 100%;
    height: 93px;
    background-color: #D0E8F2;
    color: #456268;
}
.footer p{
    text-align: left;
    padding-left:10px;
    margin-top: 5px;
    margin-bottom: 12px;
    height: 10px;
    font-family: 'Times New Roman', Times, serif;
}
.footer span{
    /* border: 1px solid black; */
    font-size: 25px;
    float: right;
    margin-right: 10px;
}
.footer span:hover{
    cursor: pointer;
}
.icon {
    float: right;
    /* border: 1px solid black; */
    width: 35px;
    /* position: relative;
    top: -15px; */
}
</style>