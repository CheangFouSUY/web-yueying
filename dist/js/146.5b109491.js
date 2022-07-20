"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[146],{7492:function(e,t,o){o.r(t),o.d(t,{default:function(){return g}});var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"groupInner"},[o("Header",{attrs:{id:"header"}}),o("el-row",{style:{"min-height":e.mainMinHeight+"px"},attrs:{id:"main"}},[o("el-col",{attrs:{span:20}},[o("div",{staticClass:"groupInfo"},[o("el-row",[o("el-col",{attrs:{span:7,offset:1}},[o("div",{staticClass:"title"},[o("span",[e._v(e._s(e.groupInfo.name))])])]),o("el-col",{attrs:{span:15,offset:1}},[o("div",{staticClass:"buttonSlot"},[e.isOwnerOrAdmin?o("el-button",{attrs:{id:"changeName"},on:{click:function(t){e.changeVisible=!0}}},[e._v("更改小组信息")]):e._e(),o("el-dialog",{attrs:{title:"更改小组信息",visible:e.changeVisible,"close-on-click-modal":!1,"show-close":!1},on:{"update:visible":function(t){e.changeVisible=t}}},[o("el-form",{attrs:{"label-position":"top",model:e.groupInfo}},[o("el-form-item",{attrs:{label:"小组名字","label-width":e.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off",maxlength:"10","show-word-limit":""},model:{value:e.groupInfo.nameTemp,callback:function(t){e.$set(e.groupInfo,"nameTemp",t)},expression:"groupInfo.nameTemp"}})],1),o("el-form-item",{attrs:{label:"小组简介","label-width":e.formLabelWidth}},[o("el-input",{attrs:{type:"textarea",autosize:"",autocomplete:"off","show-word-limit":"",resize:"none"},model:{value:e.groupInfo.descTemp,callback:function(t){e.$set(e.groupInfo,"descTemp",t)},expression:"groupInfo.descTemp"}})],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:e.cancelChanges}},[e._v("取消")]),o("el-button",{attrs:{type:"primary"},on:{click:e.updateGroupInfo}},[e._v(" 确定更改 ")])],1)],1),e.isOwnerOrAdmin?o("el-button",{attrs:{id:"manageGroup"},on:{click:e.manageGroup}},[e._v("查看管理员申请")]):e._e(),e.isOwner?o("el-button",{attrs:{id:"disbandGroup",type:"danger"},on:{click:e.disbandGroup}},[e._v("解散小组")]):e._e(),!e.isGroupMember&&e.isLogin?o("el-button",{attrs:{id:"joinGroup"},on:{click:e.join}},[e._v("加入小组")]):e._e(),e.isGroupMember&&e.isLogin?o("el-button",{attrs:{id:"leaveGroup"},on:{click:e.leave}},[e._v("退出小组")]):e._e(),e.isGroupMember&&!e.isOwnerOrAdmin?o("el-button",{attrs:{id:"requestAdmin"},on:{click:e.requestAdmin}},[e._v("申请成为管理员")]):e._e()],1)])],1),o("el-row",[o("el-col",{attrs:{span:5,offset:1}},[o("div",{staticClass:"groupPic"},[e.isOwnerOrAdmin?o("el-upload",{attrs:{id:"avatar-uploader",action:"","http-request":e.uploadAvatar,"show-file-list":!1,accept:"image/jpeg,image/gif,image/png,image/jpg"}},[e.groupInfo.pic?o("el-avatar",{attrs:{shape:"square",size:256,src:e.groupInfo.pic}}):o("el-avatar",{attrs:{shape:"square",size:256,icon:"el-icon-lollipop"}}),o("div",{attrs:{id:"change-pic"}},[e._v("更换头像")])],1):o("div",[e.groupInfo.pic?o("el-avatar",{attrs:{shape:"square",size:256,src:e.groupInfo.pic}}):o("el-avatar",{attrs:{shape:"square",size:256,icon:"el-icon-lollipop"}})],1)],1)]),o("el-col",{attrs:{span:18}},[o("div",{staticClass:"groupInfoInfo"},[o("el-row",[o("el-col",{attrs:{span:12}},[o("div",{staticClass:"info"},[o("span",{staticClass:"infoText"},[e._v("创建人 : ")]),o("span",{staticClass:"infoText2"},[e._v(e._s(e.groupInfo.owner))])])]),o("el-col",{attrs:{span:12}},[o("div",{staticClass:"info"},[o("span",{staticClass:"infoText"},[e._v("类型 : ")]),o("span",{staticClass:"infoText2"},[e._v(e._s(e.groupInfo.type))])])])],1),o("el-row",[o("el-col",{attrs:{span:12}},[o("div",{staticClass:"info"},[o("span",{staticClass:"infoText"},[e._v("创建日期 : ")]),o("span",{staticClass:"infoText2"},[e._v(e._s(e.groupInfo.date))])])]),o("el-col",{attrs:{span:12}},[o("div",{staticClass:"info"},[o("span",{staticClass:"infoText"},[e._v("人数 : ")]),o("span",{staticClass:"infoText2"},[e._v(" "+e._s(e.groupInfo.peoplecount)+" ")])])])],1),o("el-row",[o("el-col",{attrs:{span:20}},[o("div",{staticClass:"info2"},[o("span",{staticClass:"infoText"},[e._v("简介 : ")]),o("span",{staticClass:"infoText3"},[e._v(e._s(e.groupInfo.desc))])])])],1),e.isGroupMember?o("el-button",{attrs:{id:"post",icon:"el-icon-position"},on:{click:e.openPostFeed}},[e._v("发布帖子")]):e._e(),o("el-dialog",{attrs:{title:"发布帖子",visible:e.formVisible},on:{"update:visible":function(t){e.formVisible=t}}},[o("el-form",{attrs:{"label-position":"top",model:e.form}},[o("el-form-item",{attrs:{label:"标题","label-width":e.formLabelWidth}},[o("el-input",{attrs:{autocomplete:"off",maxlength:"25","show-word-limit":""},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),o("el-form-item",{attrs:{label:"内容","label-width":e.formLabelWidth}},[o("el-input",{attrs:{type:"textarea",autosize:"",autocomplete:"off",minlength:"25","show-word-limit":"",resize:"none"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}}),o("el-upload",{attrs:{action:"","auto-upload":!1,"on-change":e.handleChange,"before-remove":e.beforeRemove,limit:1,accept:"image/jpeg,image/gif,image/png,image/jpg","on-exceed":e.handleExceed}},[o("el-button",{staticClass:"form-upload-img",attrs:{size:"small",type:"primary"}},[o("i",{staticClass:"el-icon-picture-outline-round"}),e._v(" 上传图片 ")])],1)],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.formVisible=!1}}},[e._v("取消")]),o("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"primary"},on:{click:function(t){return e.postFeed()}}},[e._v("发布")])],1)],1)],1)])],1)],1),o("el-row",[o("el-row",{staticClass:"feed-header"},[o("span",{style:{color:e.allColor},on:{click:function(t){return e.showAll()}}},[e._v(" 所有 ")]),o("el-divider",{attrs:{direction:"vertical"}}),o("span",{style:{color:e.featureColor},on:{click:function(t){return e.showFeature()}}},[e._v(" 精华 ")])],1),e.isShowFeature&&e.status?o("div",{staticClass:"group-feed"},e._l(e.featuredFeeds,(function(t){return o("FeedBox",{key:t.id,attrs:{initialFeedId:t.id,initialIsGroup:!0,initialIsPin:t.isPin,initialIsFeatured:t.isFeature,initialIsAdmin:e.isOwnerOrAdmin}})})),1):!e.isShowFeature&&e.status?o("div",{staticClass:"group-feed"},e._l(e.feeds,(function(t){return o("FeedBox",{key:t.id,attrs:{initialFeedId:t.id,initialIsInnerpage:!1,initialIsGroup:!0,initialIsPin:t.isPin,initialIsFeatured:t.isFeatured,initialIsAdmin:e.isOwnerOrAdmin}})})),1):e._e()],1)],1),o("el-col",{attrs:{span:4}},[o("div",{staticClass:"groupMember"},[o("el-row",[o("el-col",{attrs:{span:24}},[o("div",{staticClass:"adminbar"},[o("span",[e._v(" 管理员 ("+e._s(e.groupInfo.admin.length+e.groupInfo.mainadmin.length)+") ")])])])],1),e._l(e.groupInfo.mainadmin,(function(t){return o("el-row",{key:t.id},[o("el-col",{attrs:{span:24}},[o("div",{staticClass:"adminlist"},[t.profile?o("el-avatar",{attrs:{size:30,src:t.profile}}):o("el-avatar",{attrs:{size:30,icon:"el-icon-user-solid"}}),o("span",{staticClass:"setRole",on:{click:function(o){return e.toProfile(t.id)}}},[e._v(" "+e._s(t.username))]),o("i",{staticClass:"el-icon-star-off"})],1)])],1)})),e._l(e.groupInfo.admin,(function(t){return o("el-row",{key:t.id},[o("el-col",{attrs:{span:24}},[o("div",{staticClass:"adminlist"},[t.profile?o("el-avatar",{attrs:{size:30,src:t.profile}}):o("el-avatar",{attrs:{size:30,icon:"el-icon-user-solid"}}),o("span",{staticClass:"setRole",on:{click:function(o){return e.toProfile(t.id)}}},[e._v(" "+e._s(t.username))]),o("i",{staticClass:"el-icon-star-off"}),e.isOwner?o("i",{staticClass:"el-icon-more",on:{click:function(o){return e.setRole1(t.id)}}}):e._e()],1)])],1)})),o("el-row",[o("el-col",{attrs:{span:24}},[o("div",{staticClass:"memberbar"},[o("span",[e._v("成员 ("+e._s(e.groupInfo.member.length)+")")])])])],1),e._l(e.groupInfo.member,(function(t){return o("el-row",{key:t.id},[o("el-col",{attrs:{span:24}},[o("div",{staticClass:"memberlist"},[t.profile?o("el-avatar",{attrs:{size:30,src:t.profile}}):o("el-avatar",{attrs:{size:30,icon:"el-icon-user-solid"}}),o("span",{staticClass:"setRole",on:{click:function(o){return e.toProfile(t.id)}}},[e._v("  "+e._s(t.username)+" ")]),e.isOwnerOrAdmin?o("i",{staticClass:"el-icon-more",on:{click:function(o){return e.setRole2(t.id)}}}):e._e()],1)])],1)}))],2),o("el-dialog",{attrs:{title:"组员设置",visible:e.setRoleVisible,"close-on-click-modal":!1,"show-close":!1},on:{"update:visible":function(t){e.setRoleVisible=t}}},[o("el-form",{attrs:{"label-position":"top",model:e.groupInfo}},[o("el-form-item",{attrs:{label:"设置小组职位"}},[e.isOwner?o("el-button",{attrs:{type:"primary"},on:{click:e.setOwner}},[e._v("主管理员")]):e._e(),o("el-button",{attrs:{type:"primary"},on:{click:e.setAdmin}},[e._v("管理员")]),o("el-button",{attrs:{type:"primary"},on:{click:e.setMember}},[e._v("普通成员")])],1),e.isOwnerOrAdmin?o("el-form-item",{attrs:{label:"其他"}},[o("el-button",{attrs:{type:"danger"},on:{click:e.banUser}},[e._v("移出小组")])],1):e._e()],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:e.cancelSetRole}},[e._v("取消")])],1)],1)],1)],1),o("Footer",{attrs:{id:"footer"}}),o("el-backtop",{attrs:{target:".groupInner"}},[o("i",{staticClass:"el-icon-arrow-up",staticStyle:{color:"#456268"}})])],1)},i=[],a=o(3083),r=o(3445),n=o(5095),l=o(2282),p={name:"CreateGroup",components:{Header:a.Z,Footer:r.Z,FeedBox:n.Z},mounted(){this.getGroupInfo(),this.getFeed(),this.mainMinHeight=document.documentElement.clientHeight-$("#header").outerHeight(!0)-$("#footer").outerHeight(!0)-6},created(){const e=l.Z.getters.getUser(l.Z.state());e&&(this.userId=e.user.id,this.isLogin=!0),console.log(this.groupInfo)},methods:{join(){var e={};localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"post",url:"/api/v1/group/joinleave/"+this.$route.params.id,headers:e}).then((e=>{console.log(e),setTimeout((function(){location.reload(!0)}),500),this.$message.success("成功加入小组")})).catch((e=>{switch(console.log(e),e.response.data.message){case"User already join the group":this.$notify({title:"您已被该小组移除，请于7天后再申请加入小组。",type:"warning",position:"top-left"});break;default:this.$notify({title:"请先登录！",type:"warning",position:"top-left"})}}))},leave(){var e={};localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"delete",url:"/api/v1/group/joinleave/"+this.$route.params.id,headers:e}).then((e=>{console.log(e),setTimeout((function(){location.reload(!0)}),500),this.$message.success("成功退出小组")})).catch((e=>{switch(console.log(e.response.status),e.response.status){case 403:this.$message.warning("请在退出小组前将主管理员职位转移");break;default:this.$message.warning("无法退出小组")}}))},cancelChanges(){this.changeVisible=!1,this.groupInfo.nameTemp=this.groupInfo.name,this.groupInfo.descTemp=this.groupInfo.desc,this.$message.info("取消更改")},validateInput(e){return!(e.length>9)||"小组名少于10字符"},async getGroupInfo(){await this.$axios.all([this.getGroupDetail(),this.getGroupMainAdmin(),this.getGroupAdmin(),this.getGroupMember(),this.getFeed()]).then(this.$axios.spread(((e,t,o,s)=>{console.log(e),this.groupInfo.groupId=e.data.id,this.groupInfo.name=e.data.groupName,this.groupInfo.nameTemp=e.data.groupName,this.groupInfo.owner=e.data.owner,this.groupInfo.pic=e.data.img,this.groupInfo.date=e.data.createdAt.slice(0,10),"b"===e.data.category?this.groupInfo.type="图书":"m"===e.data.category?this.groupInfo.type="影视":"o"===e.data.category&&(this.groupInfo.type="其他"),this.groupInfo.peoplecount=e.data.members,this.groupInfo.desc=e.data.description,this.groupInfo.descTemp=e.data.description,this.groupInfo.member=s.data.results,this.groupInfo.admin=o.data.results,this.groupInfo.mainadmin=t.data.results;for(let i=0;i<o.data.results.length;i++)if(o.data.results[i].id===this.userId){this.isOwnerOrAdmin=!0,this.isGroupMember=!0,this.isAdmin=!0,this.isOwnerOrAdminTemp=!0;break}for(let i=0;i<s.data.results.length;i++)if(s.data.results[i].id===this.userId){this.isGroupMember=!0;break}t.data.results[0].id===this.userId&&(this.isOwnerOrAdmin=!0,this.isOwnerOrAdminTemp=!0,this.isGroupMember=!0,this.isOwner=!0,this.isOwnerTemp=!0),this.status=!0}))).catch((e=>{console.log(e)}))},getGroupDetail(){return this.$axios({method:"get",url:"/api/v1/group/"+this.$route.params.id})},getGroupMainAdmin(){return this.$axios({method:"get",url:"/api/v1/group/members/"+this.$route.params.id+"?role=1"})},getGroupAdmin(){return this.$axios({method:"get",url:"/api/v1/group/members/"+this.$route.params.id+"?role=2"})},getGroupMember(){return this.$axios({method:"get",url:"/api/v1/group/members/"+this.$route.params.id+"?role=3"})},openPostFeed(){this.isLogin?this.formVisible=!0:this.$notify({title:"请先登录！",type:"warning",position:"top-left"})},postFeed(){if(!this.form.title)return void this.$notify({showClose:!0,type:"warning",title:"标题不能为空",position:"top-left"});if(this.form.description.length<25)return void this.$notify({showClose:!0,type:"warning",title:"帖子内容不能少于25字",position:"top-left"});this.fullscreenLoading=!0;let e=new FormData;e.append("title",this.form.title),e.append("description",this.form.description),e.append("img",this.form.img),e.append("groupId",this.$route.params.id);var t={};localStorage.getItem("token")&&(t={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"post",url:"/api/v1/group/feed/create/"+this.$route.params.id,data:e,headers:t}).then((e=>{switch(this.formVisible=!1,console.log(e),this.fullscreenLoading=!1,e.status){case 201:this.$notify({showClose:!0,message:"已发布帖子",type:"success",position:"top-left"}),setTimeout((function(){location.reload()}),1500);break}})).catch((e=>{switch(console.log(e),e.response.status){case 400:this.$notify({title:"标题和内容不能为空！",type:"warning",position:"top-left"});break;case 401:this.$notify({title:"请先加入小组！",type:"warning",position:"top-left"});break}}))},async uploadAvatar(e){const t=new FormData;t.append("groupName",this.groupInfo.name),t.append("description",this.groupInfo.desc),t.append("img",e.file),t.append("groupId",this.$route.params.id),console.log(e.file);var o={};localStorage.getItem("token")&&(o={Authorization:"Bearer "+localStorage.getItem("token")}),await this.$axios({method:"put",url:"/api/v1/group/"+this.$route.params.id,data:t,headers:o}).then((e=>{console.log(e),this.groupInfo.pic=e.data.profile,location.reload()})).catch((e=>{console.log(e)}))},updateGroupInfo(){const e=new FormData;e.append("groupName",this.groupInfo.nameTemp),e.append("description",this.groupInfo.descTemp),e.append("owner",this.groupInfo.owner),e.append("groupId",this.$route.params.id);var t={};localStorage.getItem("token")&&(t={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"put",url:"/api/v1/group/"+this.$route.params.id,data:e,headers:t}).then((e=>{console.log(e),this.groupInfo.name=this.groupInfo.nameTemp,this.groupInfo.desc=this.groupInfo.descTemp,this.changeVisible=!1,this.$message.success("修改信息成功！")})).catch((e=>{console.log(e)}))},async getFeed(){var e={};localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),await this.$axios({method:"get",url:"/api/v1/group/feed/list/"+this.$route.params.id,headers:e}).then((e=>{this.feeds=e.data.results;for(let t=0;t<this.feeds.length;t++)0==this.feeds[t].isPin?this.feeds[t].isPin=!1:this.feeds[t].isPin=!0,0==this.feeds[t].isFeatured?this.feeds[t].isFeatured=!1:this.feeds[t].isFeatured=!0;console.log(this.feeds)}))},setRole1(e){this.isOwner?(this.setRoleVisible=!0,this.banOrput=e):this.$message.warning("非主管理员，无法对管理员进行操作")},setRole2(e){console.log(e),this.isGroupMember&&!this.isOwnerOrAdmin?this.$message.warning("非小组管理员，无法对用户进行操作"):this.isOwnerOrAdmin?(this.setRoleVisible=!0,this.banOrput=e):this.$message.warning("非小组成员，无法对用户进行操作")},cancelSetRole(){this.setRoleVisible=!1},banUser(){var e={};localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"put",url:"/api/v1/group/banMember/"+this.groupInfo.groupId+"/"+this.banOrput,headers:e}).then((e=>{console.log(e),this.setRoleVisible=!1,location.reload()})).catch((e=>{console.log(e)}))},setOwner(){var e={};localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"put",url:"/api/v1/group/setRole/"+this.groupInfo.groupId+"/"+this.banOrput+"/1",headers:e}).then((e=>{console.log(e),this.setRoleVisible=!1,location.reload()})).catch((e=>{console.log(e)}))},setAdmin(){var e={};localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"put",url:"/api/v1/group/setRole/"+this.groupInfo.groupId+"/"+this.banOrput+"/2",headers:e}).then((e=>{console.log(e),this.setRoleVisible=!1,location.reload()})).catch((e=>{console.log(e)}))},setMember(){var e={};localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"put",url:"/api/v1/group/setRole/"+this.groupInfo.groupId+"/"+this.banOrput+"/3",headers:e}).then((e=>{console.log(e),this.setRoleVisible=!1,location.reload()})).catch((e=>{console.log(e)}))},handleChange(e,t){this.form.img=e.raw,console.log(this.form.img)},handleExceed(e,t){this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${e.length} 个文件，共选择了 ${e.length+t.length} 个文件`)},beforeRemove(e,t){return this.$confirm(`确定移除 ${e.name}？`)},showAll(){this.isShowFeature=!1,this.allColor="#79A3B1",this.featureColor="#456268"},showFeature(){this.isShowFeature=!0,this.featureColor="#79A3B1",this.allColor="#456268"},manageGroup(){this.$router.push({path:"/managegroup/"+this.groupInfo.groupId})},disbandGroup(){var e={};localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"delete",url:"/api/v1/group/"+this.groupInfo.groupId,headers:e}).then((e=>{console.log(e),this.$message.success("解散小组成功！"),this.$router.push({path:"/group"})})).catch((e=>{console.log(e)}))},requestAdmin(){const e=new FormData;e.append("user",this.userId),e.append("group",this.groupInfo.groupId),e.append("groupId",this.groupInfo.groupId);var t={};localStorage.getItem("token")&&(t={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"post",url:"/api/v1/group/admin/"+this.groupInfo.groupId,data:e,headers:t}).then((e=>{console.log(e),this.$message.success("申请成功！请耐心等待管理员的批审")})).catch((e=>{console.log(e)}))},toProfile(e){this.$router.push({path:`/profile/${e}`})}},computed:{featuredFeeds(){return this.feeds.filter((e=>e.isFeatured||e.isPin))}},data(){return{status:!1,fullscreenLoading:!1,isGroupMember:!1,isOwnerOrAdmin:!1,isOwnerOrAdminTemp:!1,isOwner:!1,isOwnerTemp:!1,isAdmin:!1,isLogin:!1,banOrput:"",url:"@/assets/Book.svg",userId:"",groupInfo:{groupId:"",name:"",nameTemp:"",pic:"",owner:"",date:"",time:"",type:"",peoplecount:"",desc:"",descTemp:"",mainadmin:[],admin:[],member:[]},form:{title:"",description:"",img:""},formVisible:!1,changeVisible:!1,setRoleVisible:!1,feeds:[],formLabelWidth:"120px",isShowFeature:!1,allColor:"#79A3B1",featureColor:"#456268",mainMinHeight:""}}},u=p,c=o(1001),d=(0,c.Z)(u,s,i,!1,null,"4060f8b4",null),g=d.exports}}]);
//# sourceMappingURL=146.5b109491.js.map