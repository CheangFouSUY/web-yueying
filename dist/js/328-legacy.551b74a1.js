"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[328],{94328:function(e,t,r){r.r(t),r.d(t,{default:function(){return m}});var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Header"),r("el-row",{attrs:{justify:"center",type:"flex"}},[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"manageGroup"},[r("span",[e._v("管理员申请")])])])],1),e._l(e.requestList,(function(t){return r("el-row",{key:t.id,attrs:{justify:"center",type:"flex"}},[r("el-col",{attrs:{span:12}},[r("div",{staticClass:"adminRequest"},[t.profile?r("el-avatar",{attrs:{id:"userAvatar",src:t.profile}}):r("el-avatar",{attrs:{id:"userAvatar",icon:"el-icon-user-solid"}}),r("span",{attrs:{id:"itemUsername"}},[e._v(e._s(t.username))]),r("el-button",{staticClass:"accdecButton",attrs:{type:"success",round:""},on:{click:function(r){return e.acceptRequest(t.id)}}},[e._v("同意")]),r("el-button",{staticClass:"accdecButton",attrs:{type:"danger",round:""},on:{click:function(r){return e.declineRequest(t.id)}}},[e._v("拒绝")])],1)])],1)})),r("el-row",{attrs:{justify:"center",type:"flex"}},[0==e.requestList.length?r("el-col",{attrs:{span:12}},[r("div",{staticClass:"noRequest"},[r("span",[e._v("抱歉！目前暂无申请")])])]):e._e()],1)],2)},n=[],o=r(16198),a=(r(78975),r(13083)),i=r(43445),u=r(22282),c={name:"Manage Group",components:{Header:a.Z,Footer:i.Z},data:function(){return{requestList:[],userId:"",isOwnerOrAdmin:!1,admin:[],mainadmin:[]}},methods:{getRequest:function(){var e=this;this.$axios({method:"get",url:"/api/v1/group/requestuser/"+this.$route.params.id}).then((function(t){console.log(t),console.log(t.data.results.length),e.requestList=t.data.results})).catch((function(e){console.log(e)}))},acceptRequest:function(e){var t=this,r={};localStorage.getItem("token")&&(r={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"put",url:"/api/v1/group/setRole/"+this.$route.params.id+"/"+e+"/2",headers:r}).then((function(e){console.log(e),t.$message.success("同意成功！"),setTimeout((function(){location.reload(!0)}),500)})).catch((function(e){console.log(e)}))},declineRequest:function(e){var t=this,r={};localStorage.getItem("token")&&(r={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"put",url:"/api/v1/group/setRole/"+this.$route.params.id+"/"+e+"/3",headers:r}).then((function(e){console.log(e),t.$message.success("拒绝成功！"),setTimeout((function(){location.reload(!0)}),500)})).catch((function(e){console.log(e)}))},getGroupInfo:function(){var e=this;return(0,o.Z)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.all([e.getGroupMainAdmin(),e.getGroupAdmin()]).then(e.$axios.spread((function(t,r){e.admin=r.data.results,e.mainadmin=t.data.results;for(var s=0;s<r.data.results.length;s++)if(r.data.results[s].id===e.userId){e.isOwnerOrAdmin=!0;break}t.data.results[0].id===e.userId&&(e.isOwnerOrAdmin=!0),e.isOwnerOrAdmin||e.$router.push({path:"/group/"+e.$route.params.id}),console.log(e.isOwnerOrAdmin)}))).catch((function(e){console.log(e)}));case 2:case"end":return t.stop()}}),t)})))()},getGroupMainAdmin:function(){return this.$axios({method:"get",url:"/api/v1/group/members/"+this.$route.params.id+"?role=1"})},getGroupAdmin:function(){return this.$axios({method:"get",url:"/api/v1/group/members/"+this.$route.params.id+"?role=2"})}},mounted:function(){this.getRequest(),this.getGroupInfo()},created:function(){var e;(e=u.Z.getters.getUser(u.Z.state()))&&e.user.confirmed&&(this.userId=e.user.id)}},l=c,d=r(1001),p=(0,d.Z)(l,s,n,!1,null,"3f8a0282",null),m=p.exports}}]);
//# sourceMappingURL=328-legacy.551b74a1.js.map