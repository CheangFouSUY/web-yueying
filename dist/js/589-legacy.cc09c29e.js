"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[589],{74589:function(s,e,t){t.r(e),t.d(e,{default:function(){return l}});var a=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",[a("Header",{attrs:{id:"header"}}),a("img",{attrs:{id:"bg",src:t(49122)}}),a("div",{attrs:{id:"Border"}},[s._m(0),a("h1",{staticClass:"sqTitle"},[s._v("密保问题验证")]),a("div",{staticClass:"verifyBox"},[a("button",{attrs:{id:"getQuest"},on:{click:s.GetQuestion}},[s._v("获取密保问题")]),a("div",{staticClass:"inputBox"},[a("img",{staticClass:"icon",attrs:{src:t(52891),alt:"email_icon"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:s.username,expression:"username"}],attrs:{type:"text",placeholder:"输入用户名"},domProps:{value:s.username},on:{input:function(e){e.target.composing||(s.username=e.target.value)}}})]),a("div",{staticClass:"inputBox"},[a("img",{staticClass:"icon",attrs:{src:t(28347),alt:"question_icon"}}),a("span",{attrs:{id:"sQuestion"}},[s._v(s._s(s.sQuestion))])]),s.isCorrect?a("div",{staticClass:"inputBox"},[a("img",{staticClass:"icon",attrs:{src:t(13101),alt:"answer_icon"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:s.sAnswer,expression:"sAnswer"}],attrs:{type:"text",placeholder:"输入密保答案"},domProps:{value:s.sAnswer},on:{input:function(e){e.target.composing||(s.sAnswer=e.target.value)}}})]):s._e(),s.isCorrect?a("div",{staticClass:"inputBox"},[a("img",{staticClass:"icon",attrs:{src:t(49552),alt:"key_icon"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:s.password1,expression:"password1"}],attrs:{type:"password",placeholder:"输入新密码"},domProps:{value:s.password1},on:{input:function(e){e.target.composing||(s.password1=e.target.value)}}})]):s._e(),s.isCorrect?a("div",{staticClass:"inputBox"},[a("img",{staticClass:"icon",attrs:{src:t(49552),alt:"key_icon"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:s.password2,expression:"password2"}],attrs:{type:"password",placeholder:"重新输入新密码"},domProps:{value:s.password2},on:{input:function(e){e.target.composing||(s.password2=e.target.value)}}})]):s._e(),a("div",{staticClass:"changeLoginWay"},[a("button",{on:{click:s.EmailVerify}},[s._v("邮箱验证")]),a("span",{staticClass:"symbol"},[s._v("|")]),a("button",{on:{click:s.Login}},[s._v("回到登录")]),a("span",{staticClass:"symbol"},[s._v("|")]),a("button",{on:{click:s.RegisterNow}},[s._v("立即注册")])]),a("button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:s.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{id:"submit"},on:{click:s.Submit}},[s._v("确定设置")])])])],1)},i=[function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",{attrs:{id:"logo"}},[a("img",{attrs:{src:t(66949)}})])}],n=t(13083),o={name:"SQVerify",components:{Header:n.Z},data:function(){return{username:"",sQuestion:"",sQuestionNum:0,sAnswer:"",password1:"",password2:"",isCorrect:!1,fullscreenLoading:!1}},methods:{EmailVerify:function(){this.$router.push("/emailverify")},Login:function(){this.$router.push("/login")},RegisterNow:function(){this.$router.push("/register")},Submit:function(){var s=this;if(""!=this.username&&""!=this.password1&&""!=this.password2&&""!=this.sAnswer){this.fullscreenLoading=!0;var e=new FormData;e.append("username",this.username),e.append("newpassword",this.password1),e.append("newpassword2",this.password2),e.append("securityQuestion",this.sQuestionNum),e.append("securityAnswer",this.sAnswer),this.$axios({method:"put",url:"/api/v1/auth/resetpwd/question/",data:e}).then((function(e){console.log(e),s.fullscreenLoading=!1,s.$message.success("设置成功！快用新密码登录吧~"),s.$router.push({path:"/login"})})).catch((function(e){switch(console.log(e),e.response.data.message){case"Password not match.":s.$message.warning("新密码和重复新密码不匹配");break;case"Password too simple.":s.$message.warning("密码需包含字母、数字及符号且字符数>=8");break;default:s.$message.warning("重置失败！")}}))}else this.$message.warning("请填写所有空格")},GetQuestion:function(){var s=this;""!=this.username?this.$axios({method:"get",url:"/api/v1/auth/requestquestion/?username="+this.username}).then((function(e){switch(console.log(e),s.isCorrect=!0,e.data.securityQuestion){case 1:s.sQuestion="您最喜欢的颜色是？",s.sQuestionNum=1,console.log("THIS IS 1");break;case 2:s.sQuestion="您最讨厌的食物？",console.log("THIS IS 2"),s.sQuestionNum=2;break;case 3:s.sQuestion="您的最要好闺蜜/兄弟是？",console.log("THIS IS 3"),s.sQuestionNum=3;break;case 4:s.sQuestion="您的爱好是？",console.log("THIS IS 4"),s.sQuestionNum=4;break;case 5:s.sQuestion="您的初恋是？",console.log("THIS IS 5"),s.sQuestionNum=5;break}})).catch((function(e){console.log(e),s.$message.warning("用户名不存在")})):this.$message.warning("用户名不可为空")}}},r=o,c=t(1001),u=(0,c.Z)(r,a,i,!1,null,"3aae3877",null),l=u.exports},13101:function(s,e,t){s.exports=t.p+"img/Check.ff5b3165.svg"},49552:function(s,e,t){s.exports=t.p+"img/Key.aec0a518.svg"},28347:function(s,e,t){s.exports=t.p+"img/Question.0733a2d3.svg"},52891:function(s,e,t){s.exports=t.p+"img/Usericon.d11af7d5.svg"},49122:function(s,e,t){s.exports=t.p+"img/background.cc6328a5.jpg"}}]);
//# sourceMappingURL=589-legacy.cc09c29e.js.map