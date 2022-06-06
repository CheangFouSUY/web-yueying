<template>
  <div class="feedback">
      <Header id="header"></Header>
      <div id="main" :style="{ 'min-height': mainMinHeight + 'px' }">
        <div class="name">
          <span id="namespan">反馈者姓名     :</span>
          <span id='name'>{{ form.feedbacker }}</span>
      </div>
      <div class="content">
          <div>
          <span>反馈标题     :</span>
          <input type="text" v-model="form.title" placeholder="请输入反馈标题">
          </div>
          <div>
          <span>反馈类型     :</span>
          <select id="feedbackType" name="feedbackType" v-model="form.category">
                    <option value=0 style="display: none"></option>
                    <option value=1>网页bug</option>
                    <option value=2>网页意见</option>
                    <option value=3>其他</option>
                </select>
          </div>
          <div class="concontent">
          <span>反馈详情     :</span>
          <textarea id="content" name="content" v-model="form.description" placeholder="请输入反馈详情(不少于15字符)"></textarea>
          </div>
          <button @click='Submit'>提交</button>
      </div>
      </div>
      <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import user from "@/store/user";

export default {
  components: { 
      Header,
      Footer,
  },
      data() {
        return {
            form: {
                feedbacker:'',
                category:0,
                title:'',
                description:'',
            },
            mainMinHeight: "",
        }
    },
    created() {
        const userInfo = user.getters.getUser(user.state());
        this.form.feedbacker = userInfo.user.username;
    this.mainMinHeight =
      document.documentElement.clientHeight -
      $("#header").outerHeight(true) -
      $("#footer").outerHeight(true) -
      6;
    },
    methods: {
        Submit() {
        if(this.form.category === 0 || this.form.title === '' || this.form.description == '') {
            this.$message.warning("反馈标题、类型、详情不可为空！");
            return;
        }
        else if(this.form.description.length < 15) {
            this.$message.warning("反馈详情不可少于15字符！");
            return;
        }
        const formData = new FormData();
        formData.append("feedbacker", this.form.feedbacker);
        formData.append("title", this.form.title);
        formData.append("description", this.form.description);
        formData.append("category", this.form.category);

        var header = {}
        if (localStorage.getItem('token'))
            header = { 'Authorization': 'Bearer ' + localStorage.getItem('token')}

        this.$axios({
            method: 'post',  
            url: '/api/v1/feedback/',
            data: formData,
            headers: header,
        })
        .then(res => {
        console.log(res);
        switch (res.status) {
            case 201:
                this.$message({
                showClose: true,
                message: '提交成功，感谢您的反馈！',
                type: 'success'
                })
                this.$router.push("/"); 
                break;
            }
        }) 
        .catch(err => {
            this.$message.warning("反馈失败")
         })     
        },
    },

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
    margin: 20px auto 23px 100px;
    padding-top: 12px;
    width: 1300px;
    height: 420px;
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
    margin-top: 210px;
    width: 150px;
    height: 45px;
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
    height: 210px;
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
#main {
  margin: auto;
  padding: 30px 0;
  box-sizing: border-box;
}
#footer {
  bottom: 0;
}
</style>