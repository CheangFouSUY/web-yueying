"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[824],{74824:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"feedback"},[a("Header",{attrs:{id:"header"}}),a("div",{attrs:{id:"main"}},[a("div",{staticClass:"name"},[a("span",{attrs:{id:"namespan"}},[e._v("反馈者姓名 :")]),a("span",{attrs:{id:"name"}},[e._v(e._s(e.form.feedbacker))])]),a("div",{staticClass:"content"},[a("div",[a("span",[e._v("反馈标题 :")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.form.title,expression:"form.title"}],attrs:{type:"text",placeholder:"请输入反馈标题"},domProps:{value:e.form.title},on:{input:function(t){t.target.composing||e.$set(e.form,"title",t.target.value)}}})]),a("div",[a("span",[e._v("反馈类型 :")]),a("select",{directives:[{name:"model",rawName:"v-model",value:e.form.category,expression:"form.category"}],attrs:{id:"feedbackType",name:"feedbackType"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.form,"category",t.target.multiple?a:a[0])}}},[a("option",{staticStyle:{display:"none"},attrs:{value:"0"}}),a("option",{attrs:{value:"1"}},[e._v("网页bug")]),a("option",{attrs:{value:"2"}},[e._v("网页意见")]),a("option",{attrs:{value:"3"}},[e._v("其他")])])]),a("div",{staticClass:"concontent"},[a("span",[e._v("反馈详情 :")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.form.description,expression:"form.description"}],attrs:{id:"content",name:"content",placeholder:"请输入反馈详情(不少于15字符)"},domProps:{value:e.form.description},on:{input:function(t){t.target.composing||e.$set(e.form,"description",t.target.value)}}})]),a("button",{on:{click:e.Submit}},[e._v("提交")])])]),a("Footer",{attrs:{id:"footer"}})],1)},o=[],s=(a(82526),a(41817),a(13083)),i=a(43445),n=a(22282),c={components:{Header:s.Z,Footer:i.Z},data:function(){return{form:{feedbacker:"",feedbackerId:"",category:0,title:"",description:""}}},created:function(){var e=n.Z.getters.getUser(n.Z.state());this.form.feedbackerId=e.user.id,this.getName()},methods:{Submit:function(){var e=this;if(0!==this.form.category&&""!==this.form.title&&""!=this.form.description)if(this.form.description.length<15)this.$message.warning("反馈详情不可少于15字符！");else{var t=new FormData;t.append("feedbacker",this.form.feedbacker),t.append("title",this.form.title),t.append("description",this.form.description),t.append("category",this.form.category);var a={};localStorage.getItem("token")&&(a={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"post",url:"/api/v1/feedback/",data:t,headers:a}).then((function(t){switch(console.log(t),t.status){case 201:e.$message({showClose:!0,message:"提交成功，感谢您的反馈！",type:"success"}),e.$router.push("/");break}})).catch((function(t){e.$message.warning("反馈失败")}))}else this.$message.warning("反馈标题、类型、详情不可为空！")},getName:function(){var e=this;this.$axios({method:"get",url:"/api/v1/user/"+this.form.feedbackerId}).then((function(t){e.form.feedbacker=t.data.username})).catch((function(e){console.log(e)}))}}},d=c,l=a(1001),m=(0,l.Z)(d,r,o,!1,null,"e39bb7cc",null),f=m.exports}}]);
//# sourceMappingURL=824-legacy.3cab224f.js.map