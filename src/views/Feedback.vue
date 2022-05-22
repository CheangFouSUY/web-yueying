<template>
  <div class="feedback">
      <Header></Header>
      <div class="name">
          <span id="namespan">反馈者姓名     :</span>
          <span id='name'>{{ feedbacker }}</span>
      </div>
      <div class="content">
          <div>
          <span>反馈标题     :</span>
          <input type="text" placeholder="反馈标题">
          </div>
          <div>
          <span>反馈类型     :</span>
          <select id="feedbackType" name="feedbackType">
                    <option style="display: none"></option>
                    <option value="bug">网页bug</option>
                    <option value="suggestions">网页意见</option>
                    <option value="others">其他</option>
                </select>
          </div>
          <div class="concontent">
          <span>反馈详情     :</span>
          <textarea id="content" name="content" placeholder="请输入反馈详情(不少于15字符)"></textarea>
          </div>
          <button @click='Submit'>提交</button>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import DaoMuBiJi from './BookInnerpage.vue'

export default {
  components: { 
      Header,
      Footer,
      DaoMuBiJi,
  },
    methods: {
        Submit() {
            this.$message({
            showClose: true,
            message: '提交成功，感谢您的反馈！',
            type: 'success'
        })
            this.$router.push("/");        
        }
    },
    data() {
        return {
            feedbacker:'小乐子',
        }
    }

}
</script>

<style scoped>
.name{
    background-color: #FCF8EC;
    /* border: black solid 1px; */
    margin: 20px auto auto 100px;
    width: 500px;
    height: 55px;
    box-shadow: 0px 4px 5px rgba(0, 9, 236, 0.25);
}
.name span{
    display: inline-block;
    /* outline: black solid 1px; */
    font-size: 24px;
    vertical-align: middle;
    margin-left: 10px;
}
#name{
    display: inline-block;
    margin-left: 10px;
    height: 40px;
    width: 300px;
    margin-top: 6px;
    padding-top: 5px;
    padding-left: 5px;
    border-radius: 10px;
    background-color: #D0E8F2;
    border: none;
    font-size: 22px;
}
#namespan{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.content {
    background-color: #FCF8EC;
    /* border: black solid 1px; */
    margin: 20px auto auto 100px;
    padding-top: 12px;
    width: 1300px;
    height: 480px;
    box-shadow: 0px 4px 5px rgba(0, 9, 236, 0.25);
}
.content span{
    display: inline-block;
    font-size: 24px;
    margin-left: 20px;
    /* vertical-align: middle; */
}
.content input, .content select{
    margin-left: 22px;
    display: inline-block;
    height: 40px;
    width: 1130px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: none;
    background-color: #D0E8F2;
    font-size: 22px;
    padding-left: 5px;
}
.content input:focus, .content textarea:focus{
    outline: none;
}
.concontent{
    margin-top: 10px;
}
.content button{
    display: block;
    float: right;
    margin-right: 20px;
    margin-top: 270px;
    width: 165px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #456268;
    color: #FCF8EC;
    font-size: 20px;
}
.content button:hover{
    cursor: pointer;
    background-color: rgba(121, 163, 177);
    outline: none;
}
#feedbackType{
    width: 300px;
}
#content{
    display: inline-block;
    height: 280px;
    border: none;
    resize: none;
    position: absolute;
    border-radius: 10px;
    background-color: #D0E8F2;
    margin-left: 22px;
    font-size: 22px;
    width: 1130px;
    padding-left: 5px;
    padding-top: 5px;
}
</style>