"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[463],{9463:function(t,e,s){s.r(e),s.d(e,{default:function(){return i}});var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("Header"),s("div",{staticClass:"activateSuccess"},[s("el-row",[s("el-col",{attrs:{lg:24}},[s("el-result",{attrs:{icon:"success",title:"恭喜！账号激活成功",subTitle:"赶快到登录界面登录吧~"}},[s("template",{slot:"extra"},[s("el-button",{attrs:{type:"primary"},on:{click:t.returnLogin}},[t._v("返回登录")])],1)],2)],1)],1)],1)],1)},n=[],o=s(3083),a={name:"ActivateSuccess",components:{Header:o.Z},data(){return{}},methods:{returnLogin(){this.$router.push({path:"/login"})},getToken(t){this.$axios({method:"get",url:"/api/v1/auth/activate/?token="+t}).then((t=>{console.log(t)})).catch((t=>{console.log(t),this.$message.warning("此链接已过期"),this.$router.push({path:"/register"})}))}},mounted(){const t=this.$route.query.token;this.getToken(t)}},u=a,c=s(1001),l=(0,c.Z)(u,r,n,!1,null,null,null),i=l.exports}}]);
//# sourceMappingURL=463.2b474cfa.js.map