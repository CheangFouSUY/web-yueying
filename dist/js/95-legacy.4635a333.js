"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[95],{75095:function(e,t,n){n.d(t,{Z:function(){return p}});var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-row",{staticClass:"feed-box"},[e.isPin||e.isFeatured?i("div",{staticClass:"feed-tag"}):e._e(),e.isPin?i("span",{staticClass:"feed-tag-span"},[e._v("置顶")]):e._e(),e.isFeatured&&!e.isPin?i("span",{staticClass:"feed-tag-span"},[e._v("精华")]):e._e(),e.isAdmin||e.isMine?i("el-dropdown",{attrs:{trigger:"click"}},[i("i",{staticClass:"el-icon-more"}),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e.isAdmin&&!e.isPin?i("el-dropdown-item",{nativeOn:{click:function(t){return e.pin()}}},[e._v("置顶")]):e.isAdmin&&e.isPin?i("el-dropdown-item",{nativeOn:{click:function(t){return e.pin()}}},[e._v("取消置顶")]):e._e(),e.isAdmin&&!e.isFeatured?i("el-dropdown-item",{nativeOn:{click:function(t){return e.feature()}}},[e._v("精华")]):e._e(),e.isAdmin&&e.isFeatured?i("el-dropdown-item",{nativeOn:{click:function(t){return e.feature()}}},[e._v("取消精华")]):e._e(),e.isMine||e.isAdmin?i("el-dropdown-item",{nativeOn:{click:function(t){e.deleteDialogVisible=!0}}},[e._v("删除帖子")]):e._e()],1)],1):e._e(),i("el-dialog",{attrs:{title:"删除帖子",visible:e.deleteDialogVisible,width:"30%"},on:{"update:visible":function(t){e.deleteDialogVisible=t}}},[i("span",[e._v("确认是否需要删除帖子")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.deleteDialogVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.deleteDialogVisible=!1,e.deleteFeed()}}},[e._v("确 定")])],1)]),i("el-row",{attrs:{gutter:70,align:"middle",type:"flex"}},[i("el-col",{attrs:{span:1}},[e.publisherAvatar?i("el-avatar",{attrs:{size:50,src:e.publisherAvatar},nativeOn:{click:function(t){return e.enterProfile(e.createdBy)}}}):i("el-avatar",{attrs:{size:50,icon:"el-icon-user-solid"},on:{click:function(t){return e.enterProfile(e.createdBy)}}})],1),i("el-col",{attrs:{span:20}},[i("el-row",{staticClass:"feed-publisher"},[e.isGroup||e.isPublic?e._e():i("span",[e._v(e._s(e.groupName))]),e.isGroup||e.isPublic?e._e():i("el-divider",{attrs:{direction:"vertical"}}),i("span",{staticStyle:{cursor:"pointer"},on:{click:function(t){return e.enterProfile(e.createdBy)}}},[e._v(" "+e._s(e.publisherName)+" ")])],1),i("el-row",{staticClass:"feed-time"},[i("i",{staticClass:"el-icon-time"}),e._v(" "+e._s(e.dateStr(e.createdAt))+" ")])],1)],1),i("el-row",{staticClass:"feed-title"},[i("span",{on:{click:function(t){return e.enterFeed()}}},[e._v(e._s(e.title))])]),i("el-row",{staticClass:"feed-content"},[e.isPublic?i("span",{staticClass:"feed-hashtag",on:{click:function(t){return e.enterTag(e.belongTag)}}},[e._v("#"+e._s(e.tagTitle)+"#")]):e._e(),i("span",{domProps:{innerHTML:e._s(e.descriptionCalc())}})]),i("el-row",{attrs:{type:"flex",justify:"end"}},[e.isNeedExpand&&!e.isShowComment?i("div",[!1===this.isExpand?i("button",{staticClass:"expand-button",on:{click:function(t){return e.changeExpand()}}},[e._v(" 展开"),i("i",{staticClass:"el-icon-arrow-down"})]):i("button",{staticClass:"expand-button",on:{click:function(t){return e.changeExpand()}}},[e._v(" 收起"),i("i",{staticClass:"el-icon-arrow-up"})])]):e._e()]),i("el-row",{staticClass:"feed-image",attrs:{type:"flex",justify:"center"}},[e.image?i("img",{attrs:{src:e.image,alt:"feed-image"}}):e._e()]),i("el-row",{staticClass:"like-comment-wrap"},["L"===e.response?i("img",{attrs:{src:n(392),alt:"love"},on:{click:function(t){return e.like()}}}):i("img",{attrs:{src:n(87970),alt:"love"},on:{click:function(t){return e.like()}}}),i("span",{staticClass:"like-count"},[e._v(e._s(e.likeCount))]),i("img",{attrs:{src:n(82392),alt:"comment"},on:{click:function(t){return e.enterFeed()}}}),i("span",{staticClass:"comment-count"},[e._v(e._s(e.commentCount))]),i("img",{attrs:{src:n(40506),alt:"report icon"},on:{click:function(t){return e.report("f&"+e.id)}}})]),e.isShowComment?i("div",{staticClass:"comment-wrap"},[e.islogin?i("el-row",{staticClass:"publish-box"},[i("el-row",{attrs:{gutter:70}},[i("el-col",{attrs:{span:1}},[e.userAvatar?i("el-avatar",{attrs:{size:50,src:e.userAvatar}}):i("el-avatar",{attrs:{size:50,icon:"el-icon-user-solid"}})],1),i("el-col",{attrs:{span:22}},[i("el-row",{staticClass:"comment-publisher"},[e._v(e._s(e.user))]),i("el-row",{staticClass:"publish-write"},[i("form",[i("div",{staticClass:"comment-autosize-wrapper"},[i("pre",{staticClass:"comment-autosize"},[e._v("                    "),i("br"),e._v(e._s(e.userComment.content)+"\n                  ")]),i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.userComment.content,expression:"userComment.content"}],attrs:{placeholder:"留下评论："},domProps:{value:e.userComment.content},on:{input:function(t){t.target.composing||e.$set(e.userComment,"content",t.target.value)}}})]),i("span",{staticClass:"showFileName"}),e.userComment.img?i("i",{staticClass:"el-icon-delete",staticStyle:{cursor:"pointer"},on:{click:function(t){return e.deleteImg()}}}):e._e(),i("input",{attrs:{id:"imgUpload",type:"file",accept:"image/png,image/gif,image/jpeg"},on:{change:function(t){return e.getImg(t)}}}),i("el-row",{staticClass:"publish-action",attrs:{span:20}},[i("i",{staticClass:"el-icon-picture-outline-round",attrs:{onclick:"$('input[id=imgUpload]').click();"}}),i("i",{staticClass:"el-icon-position",on:{click:function(t){return e.submitReview(t)}}})])],1)])],1)],1)],1):e._e(),e._l(e.comments,(function(t){return i("el-row",{key:t.id,staticClass:"comment-box"},[i("el-divider"),i("br"),i("el-row",{attrs:{gutter:70}},[i("el-col",{attrs:{span:1}},[t.publisherAvatar?i("el-avatar",{attrs:{size:50,src:t.publisherAvatar},nativeOn:{click:function(n){return e.enterProfile(t.createdBy)}}}):i("el-avatar",{attrs:{size:50,icon:"el-icon-user-solid"},nativeOn:{click:function(n){return e.enterProfile(t.createdBy)}}})],1),i("el-col",{attrs:{span:22}},[e.status?i("el-row",{on:{click:function(n){return e.enterProfile(t.createdBy)}}},[i("span",{staticClass:"comment-publisher",on:{click:function(n){return e.enterProfile(t.createdBy)}}},[e._v(e._s(t.publisherName))])]):e._e(),e.status?i("el-row",{staticClass:"comment-time"},[i("i",{staticClass:"el-icon-time"}),e._v(" "+e._s(e.dateStr(t.time))+" ")]):e._e(),i("span",{staticStyle:{"word-wrap":"break-word"},domProps:{innerHTML:e._s(e.contentCalc(t.description))}}),t.img?i("img",{staticClass:"comment-image",attrs:{src:t.img,alt:"comment-image"}}):e._e()],1)],1),i("el-row",{staticClass:"comment-action"},[i("el-col",{attrs:{span:3,offset:5}},[i("el-row",{attrs:{type:"flex",justify:"center"}},["L"===t.response?i("img",{attrs:{src:n(89337),alt:"happy icon"},on:{click:function(n){return e.commentResponse(t,"O")}}}):i("img",{attrs:{src:n(11816),alt:"happy icon"},on:{click:function(n){return e.commentResponse(t,"L")}}})]),i("el-row",{staticClass:"comment-like-count",attrs:{type:"flex",justify:"center"}},[e._v(e._s(t.likes))])],1),i("el-col",{attrs:{span:3,offset:1}},[i("el-row",{attrs:{type:"flex",justify:"center"}},["D"===t.response?i("img",{attrs:{src:n(24714),alt:"sad icon"},on:{click:function(n){return e.commentResponse(t,"O")}}}):i("img",{attrs:{src:n(95414),alt:"sad icon"},on:{click:function(n){return e.commentResponse(t,"D")}}})]),i("el-row",{staticClass:"comment-like-count",attrs:{type:"flex",justify:"center"}},[e._v(e._s(t.dislikes))])],1),i("el-col",{attrs:{span:3,offset:1}},[i("el-row",{attrs:{type:"flex",justify:"center"}},[i("img",{attrs:{id:"report",src:n(40506),alt:"report icon"},on:{click:function(n){return e.report("r&"+t.id)}}})])],1)],1)],1)}))],2):e._e()],1)],1)},o=[],r=n(16198),a=(n(78975),n(82526),n(41817),n(78783),n(33948),n(74916),n(15306),n(68309),n(22282)),s={name:"FeedBox",props:{initialFeedId:String,initialIsInnerpage:Boolean,initialIsGroup:Boolean,initialIsPin:Boolean,initialIsFeatured:Boolean,initialIsAdmin:Boolean},data:function(){return{status:!1,islogin:!1,deleteDialogVisible:!1,user:"",userId:"",userAvatar:"",id:this.initialFeedId,createdBy:"",publisherName:"",publisherAvatar:"",isMine:!1,createdAt:"",isPublic:!0,belongTo:"",belongTag:"",tagTitle:"",isPin:this.initialIsPin,isFeatured:this.initialIsFeatured,isAdmin:this.initialIsAdmin,isGroup:this.initialIsGroup,groupName:"",title:"",description:"",isExpand:!1,image:"",likeCount:0,commentCount:0,isShowComment:this.initialIsInnerpage,response:"O",userComment:{content:"",img:""},comments:[]}},mounted:function(){var e;(e=a.Z.getters.getUser(a.Z.state()))&&(this.islogin=!0,this.userId=e.user.id),this.getAll()},computed:{isNeedExpand:function(){return this.description.length<=180&&(this.isExpand=!0),this.description.length>180}},methods:{deleteFeed:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new FormData,n.append("feedId",e.id),e.isPublic||n.append("groupId",e.belongTo),i={},localStorage.getItem("token")&&(i={Authorization:"Bearer "+localStorage.getItem("token")}),t.next=7,e.$axios({method:"delete",url:"/api/v1/feed/"+e.id,data:n,headers:i}).then((function(t){console.log(t),e.initialIsInnerpage?e.$router.push("/feed"):location.reload()})).catch((function(e){console.log(e)}));case 7:case"end":return t.stop()}}),t)})))()},feature:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new FormData,n.append("feedId",e.id),n.append("groupId",e.belongTo),i={},localStorage.getItem("token")&&(i={Authorization:"Bearer "+localStorage.getItem("token")}),t.next=7,e.$axios({method:"put",url:"/api/v1/group/setFeatured/"+e.belongTo+"/"+e.id,data:n,headers:i}).then((function(t){console.log(t),e.isFeatured=!e.isFeatured})).catch((function(e){console.log(e)}));case 7:case"end":return t.stop()}}),t)})))()},pin:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new FormData,n.append("feedId",e.id),n.append("groupId",e.belongTo),i={},localStorage.getItem("token")&&(i={Authorization:"Bearer "+localStorage.getItem("token")}),t.next=7,e.$axios({method:"put",url:"/api/v1/group/setPin/"+e.belongTo+"/"+e.id,data:n,headers:i}).then((function(t){console.log(t),e.isPin=!e.isPin})).catch((function(e){console.log(e)}));case 7:case"end":return t.stop()}}),t)})))()},follow:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new FormData,n.append("isFollowed",!e.isFollow),n.append("feedId",e.id),i={},localStorage.getItem("token")&&(i={Authorization:"Bearer "+localStorage.getItem("token")}),t.next=7,e.$axios({method:"put",url:"/api/v1/feed/react/"+e.id,data:n,headers:i}).then((function(t){console.log(t),e.isFollow=!e.isFollow})).catch((function(t){switch(console.log(t),t.response.status){case 401:e.$notify({title:"请先加入小组！",type:"warning",position:"top-left"});break;case 403:e.$notify({title:"请先登录！",type:"warning",position:"top-left"});break}}));case 7:case"end":return t.stop()}}),t)})))()},like:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){var n,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n="L"==e.response?"O":"L",i=new FormData,i.append("response",n),i.append("feedId",e.id),o={},localStorage.getItem("token")&&(o={Authorization:"Bearer "+localStorage.getItem("token")}),t.next=8,e.$axios({method:"put",url:"/api/v1/feed/react/"+e.id,data:i,headers:o}).then((function(t){console.log(t),e.response=n,"L"==e.response?e.likeCount++:e.likeCount--})).catch((function(t){switch(console.log(t),t.response.status){case 401:e.$notify({title:"请先加入小组！",type:"warning",position:"top-left"});break;case 403:e.$notify({title:"请先登录",type:"warning",position:"top-left"});break}}));case 8:case"end":return t.stop()}}),t)})))()},commentResponse:function(e,t){var n=this;return(0,r.Z)(regeneratorRuntime.mark((function i(){var o,r;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return o=new FormData,o.append("response",t),o.append("reviewId",e.id),r={},localStorage.getItem("token")&&(r={Authorization:"Bearer "+localStorage.getItem("token")}),i.next=7,n.$axios({method:"put",url:"/api/v1/review/react/"+e.id,data:o,headers:r}).then((function(n){console.log(n),"O"==e.response?"L"==t?e.likes++:e.dislikes++:"L"==e.response?"O"==t?e.likes--:(e.likes--,e.dislikes++):("O"==t||e.likes++,e.dislikes--),e.response=t})).catch((function(e){switch(console.log(e),e.response.status){case 401:n.$notify({title:"请先加入小组！",type:"warning",position:"top-left"});break;case 403:n.$notify({title:"请先登录",type:"warning",position:"top-left"});break}}));case 7:case"end":return i.stop()}}),i)})))()},submitReview:function(e){var t=this;e.preventDefault();var n=new FormData;n.append("description",this.userComment.content),n.append("img",this.userComment.img),n.append("feed",this.id),n.append("book",""),n.append("movie","");var i={};localStorage.getItem("token")&&(i={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"post",url:"/api/v1/review/",data:n,headers:i}).then((function(e){console.log(e),t.$notify({showClose:!0,message:"已发布评论",type:"success",position:"top-left"}),location.reload()})).catch((function(e){switch(console.log(e),e.response.status){case 400:t.userComment.content.length>5e3?t.$notify({title:"评论长度不可超过5000字符！",type:"warning",position:"top-left"}):t.$notify({title:"评论不能为空！",type:"warning",position:"top-left"});break;case 401:t.$notify({title:"请先加入小组！",type:"warning",position:"top-left"});break}}))},getAll:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.all([e.getFeedDetail(),e.getComment()]).then(e.$axios.spread((function(t,n){var i=t.data;e.title=i.title,e.description=i.description,e.image=i.img,e.isPublic=i.isPublic,e.createdBy=i.createdBy,e.belongTo=i.belongTo,e.belongTag=i.belongTag,e.createdAt=new Date(i.createdAt).getTime(),e.likeCount=i.likes,e.commentCount=n.data.count,e.comments=n.data.results,e.response=i.response,e.isFollow=i.isFollow,e.isMine=i.createdBy==e.userId}))).catch((function(e){console.log(e)}));case 2:if(!e.islogin){t.next=5;break}return t.next=5,e.$axios.get("/api/v1/user/"+e.userId).then((function(t){e.user=t.data.username,e.userAvatar=t.data.profile})).catch((function(e){console.log(e)}));case 5:return t.next=7,e.$axios.get("/api/v1/user/"+e.createdBy).then((function(t){e.publisherName=t.data.username,t.data.profile&&(e.publisherAvatar=t.data.profile)})).catch((function(e){console.log(e)}));case 7:if(e.isPublic){t.next=12;break}return t.next=10,e.$axios.get("/api/v1/group/"+e.belongTo).then((function(t){e.groupName=t.data.groupName})).catch((function(e){console.log(e)}));case 10:t.next=14;break;case 12:return t.next=14,e.$axios.get("/api/v1/tag/"+e.belongTag).then((function(t){e.tagTitle=t.data.title})).catch((function(e){console.log(e)}));case 14:n=regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.comments[n].time=new Date(e.comments[n].createdAt).getTime(),t.next=3,e.$axios.get("api/v1/review/"+e.comments[n].id).then((function(t){e.comments[n].img=t.data.img,e.comments[n].likes=t.data.likes,e.comments[n].dislikes=t.data.dislikes})).catch((function(e){console.log(e)}));case 3:return t.next=5,e.$axios.get("/api/v1/user/"+e.comments[n].createdBy).then((function(t){e.comments[n].publisherName=t.data.username,t.data.profile&&(e.comments[n].publisherAvatar=t.data.profile),n==e.comments.length-1&&(e.status=!0)})).catch((function(e){console.log(e)}));case 5:case"end":return t.stop()}}),t)})),i=0;case 16:if(!(i<e.comments.length)){t.next=21;break}return t.delegateYield(n(i),"t0",18);case 18:i++,t.next=16;break;case 21:case"end":return t.stop()}}),t)})))()},getFeedDetail:function(){var e={};return localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"get",url:"/api/v1/feed/"+this.id,headers:e})},getComment:function(){var e={};return localStorage.getItem("token")&&(e={Authorization:"Bearer "+localStorage.getItem("token")}),this.$axios({method:"get",url:"/api/v1/review/list?feed="+this.id,headers:e})},getUser:function(){return this.$axios({method:"get",url:"/api/v1/user/"+this.userId})},dateStr:function(e){var t,n=(new Date).getTime();if(n=parseInt((n-e)/1e3),n<600)return"刚刚";if(n<3600)return t=Math.floor(n/60),t+"分钟前";if(n<86400)return t=Math.floor(n/60/60),t+"小时前";if(n<432e3)return t=Math.floor(n/60/60/24),t+"天前";e=new Date(parseInt(e));var i=e.getFullYear(),o=e.getMonth()<10?"0"+(e.getMonth()+1):e.getMonth()+1,r=e.getDate()<10?"0"+e.getDate():e.getDate(),a=e.getHours()<10?"0"+e.getHours():e.getHours(),s=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes();return i+"-"+o+"-"+r+" "+a+":"+s},descriptionCalc:function(){if(this.isShowComment)return this.description.replace(/(\r\n|\n|\r)/gm,"<br/>");var e="";return e=!1===this.isExpand?this.description.substring(0,180)+"...":this.description,e.replace(/(\r\n|\n|\r)/gm,"<br/>")},changeExpand:function(){this.isExpand=!this.isExpand},getImg:function(e){var t=e.target.files[0].name;$(".showFileName").html(t),this.userComment.img=e.target.files[0]},deleteImg:function(){$("#imgUpload").attr("type","text"),$("#imgUpload").attr("type","file"),$(".showFileName").html(""),this.userComment.img=""},contentCalc:function(e){return e.replace(/(\r\n|\n|\r)/gm,"<br/>")},report:function(e){this.$router.push({path:"/report/".concat(e)})},enterProfile:function(e){this.$router.push({path:"/profile/".concat(e)})},enterGroup:function(e){this.$router.push({path:"/group/".concat(e)})},enterTag:function(e){this.$router.push({path:"/tag/".concat(e)})},enterFeed:function(){this.$router.push({path:"/feed/".concat(this.id)})}}},c=s,l=n(1001),u=(0,l.Z)(c,i,o,!1,null,"19ad771c",null),p=u.exports},87970:function(e,t,n){e.exports=n.p+"img/Love.993dd4f0.svg"},392:function(e,t,n){e.exports=n.p+"img/Love_fill.98443daf.svg"}}]);
//# sourceMappingURL=95-legacy.4635a333.js.map