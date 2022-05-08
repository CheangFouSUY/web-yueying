<template>
  <div class="report">
      <Header></Header>
      <div class="name">
          <el-row>
          <span id="namespan">举报者姓名&nbsp;:</span>
          <span id='name'>{{ Report.reporter }}</span>
          </el-row>
          <el-row>
          <span id="conspan">&nbsp;&nbsp;举报内容&nbsp;&nbsp;:</span>
          <span id="con">[{{ Report.getreport}}] {{ Report.con }}</span>
          </el-row>
      </div>
      <div class="content">
          <div>
          <span>举报标题     :</span>
          <input type="text" placeholder="举报标题">
          </div>
          <div>
          <span>举报类型     :</span>
          <select id="reportType" name="reportType">
                    <option style="display: none"></option>
                    <option value="trash">垃圾内容</option>
                    <option value="pornography">色情内容</option>
                    <option value="illegal">非法活动</option>
                    <option value="copyrights">侵犯版权</option>
                    <option value="bully">骚扰、欺凌和威胁</option>
                    <option value="revenge">仇恨言论</option>
                    <option value="violence">暴力内容</option>
                    <option value="others">其他</option>
                </select>
          </div>
          <div class="concontent">
          <span>举报详情     :</span>
          <textarea id="content" name="content" placeholder="请输入举报详情(不少于15字符)"></textarea>
          </div>
          <button @click='Submit'>提交</button>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import DaoMuBiJi from './DaoMuBiJi.vue'

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
            message: '提交成功，感谢您的举报！',
            type: 'success'
        })
            this.$router.push("/");        
        }
    },
    data() {
        return {
            Report: {
            reporter:'乐乐',
            getreport:'黄乐一',
            con:'惊！到底是道德沦丧还是人性扭曲？为什么会出现这样惊人的现象，我们细看',
            title:'',
            type:'',
            content:'',
            }
        }
    },
}
</script>

<style scoped>
.name{
    background-color: #FCF8EC;
    /* border: black solid 1px; */
    margin: 20px auto auto 100px;
    width: 800px;
    height: 110px;
    box-shadow: 0px 4px 5px rgba(0, 9, 236, 0.25);
}
.name span{
    display: inline-block;
    /* outline: black solid 1px; */
    font-size: 24px;
    vertical-align: middle;
    margin-left: 10px;
}
#name, #con{
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
#conspan{
    margin-left: 13px;
}
#con{
    width: 620px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
    height: 430px;
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
    margin-top: 225px;
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
#reportType{
    width: 300px;
}
#content{
    display: inline-block;
    height: 240px;
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