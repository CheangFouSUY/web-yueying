"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[183],{30667:function(t,e,s){s.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("el-row",{attrs:{gutter:20,type:"flex",justify:"center"}},[s("el-col",{attrs:{span:22}},[s("div",{attrs:{id:"father"}},[s("div",{style:{transform:"translateX("+t.currentOffset+"px)"},attrs:{id:"swiper-box"}},t._l(t.showList,(function(e){return s("div",{key:e.id,staticClass:"item-box",style:{minWidth:t.width,maxWidth:t.width}},[s("div",{staticClass:"image-box"},[s("el-image",{staticClass:"poster",attrs:{src:e.thumbnail},on:{click:function(s){return t.goDetails(e.id)}}})],1),s("div",{staticClass:"title-wrap"},[s("span",{staticClass:"book-title",on:{click:function(s){return t.goDetails(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),s("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])])})),0),s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset<-5,expression:"currentOffset < -5"}],staticClass:"el-icon-arrow-left",on:{click:t.left}}),s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset>-854&&t.listLength>6,expression:"currentOffset > -854 && listLength>6"}],staticClass:"el-icon-arrow-right",on:{click:t.right}})])])],1)],1)},a=[],o={name:"MainpageSwiper",props:{initialList:Array,listType:String,width:{default:"16.67%"}},data:function(){return{showList:this.initialList,listLength:"",type:this.listType,currentOffset:0,boxWidth:"",fatherWith:0}},mounted:function(){this.setCardWidth(),this.listLength=this.showList.length},methods:{setCardWidth:function(){var t=document.querySelector("#father");this.fatherWith=t.clientWidth,this.boxWidth=this.fatherWith/6+"px"},right:function(){this.currentOffset<=-this.fatherWith/6*4||(this.currentOffset-=this.fatherWith/6,console.log(this.currentOffset))},left:function(){this.currentOffset>=0||(this.currentOffset+=this.fatherWith/6,console.log(this.currentOffset))},goDetails:function(t){"book"==this.listType?this.$router.push({path:"/book/detail/".concat(t)}):"movie"==this.listType&&this.$router.push({path:"/movie/detail/".concat(t)})}}},n=o,r=s(1001),l=(0,r.Z)(n,i,a,!1,null,"738b8f42",null),c=l.exports},25128:function(t,e,s){s.r(e),s.d(e,{default:function(){return f}});var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Header"),i("div",{staticClass:"main"},[i("el-row",{staticClass:"Top",attrs:{align:"middle",type:"flex"}},[i("img",{staticClass:"searchicon",attrs:{src:s(65131),alt:"search_icon"}}),i("span",[t._v('搜索"'+t._s(t.searchItem)+'"')])]),i("el-row",{staticClass:"noResult"},[t.noData?i("span",[t._v("抱歉！没有结果")]):t._e()]),t.noBookData?t._e():i("el-row",{staticClass:"Book"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("img",{attrs:{src:s(81160),alt:"book icon"}}),i("span",[t._v("图书")])]),i("el-row",{staticClass:"result-wrap"},t._l(t.hotBook,(function(e){return i("div",{key:e.id,staticClass:"item-box"},[i("el-image",{staticClass:"poster",attrs:{src:e.thumbnail,fit:"cover"},on:{click:function(s){return t.enterBook(e.id)}}}),i("div",{staticClass:"title-wrap"},[i("span",{staticClass:"book-title",on:{click:function(s){return t.enterBook(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),i("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])],1)})),0)],1),t.noMovieData?t._e():i("el-row",{staticClass:"Drama"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("img",{attrs:{src:s(67244),alt:"video icon"}}),i("span",[t._v("影视")])]),i("el-row",{staticClass:"result-wrap"},t._l(t.hotMovie,(function(e){return i("div",{key:e.id,staticClass:"item-box"},[i("el-image",{staticClass:"poster",attrs:{src:e.thumbnail,fit:"cover"},on:{click:function(s){return t.enterMovie(e.id)}}}),i("div",{staticClass:"title-wrap"},[i("span",{staticClass:"book-title",on:{click:function(s){return t.enterMovie(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),i("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])],1)})),0)],1),t.noTagData?t._e():i("el-row",{staticClass:"Tag"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-position"}),i("span",[t._v("话题")])]),t._l(t.tags,(function(e){return i("el-row",{key:e.id},[i("el-col",{attrs:{span:12,offset:2}},[i("div",{staticClass:"TagContent"},[i("span",{attrs:{id:"tagCon"},on:{click:function(s){return t.toTag(e.id)}}},[t._v("#"+t._s(e.title))])])])],1)}))],2),t.noFeedData?t._e():i("el-row",{staticClass:"Feed"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-position"}),i("span",[t._v("话题帖子")])]),i("el-row",{attrs:{justify:"center",type:"flex"}},[i("div",{staticClass:"container"},t._l(t.columns,(function(e){return i("div",{key:e,staticClass:"col"},t._l(e,(function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("span",{attrs:{id:"feedTitle"},on:{click:function(s){return t.toFeed(e.id)}}},[t._v(t._s(e.title))]),i("br"),i("span",{attrs:{id:"feedCon"},on:{click:function(s){return t.toFeed(e.id)}}},[t._v(t._s(e.description))])])})),0)})),0)])],1),t.noGroupData?t._e():i("el-row",{staticClass:"Group"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-s-flag"}),i("span",[t._v("小组")])]),i("el-row",{attrs:{justify:"center",type:"flex"}},[i("div",{staticClass:"container"},t._l(t.columns2,(function(e){return i("div",{key:e,staticClass:"col"},t._l(e,(function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("el-avatar",{attrs:{src:e.img}}),i("div",{staticClass:"textInside"},[i("span",{on:{click:function(s){return t.toGroup(e.id)}}},[t._v(t._s(e.groupName))])])],1)})),0)})),0)])],1),t.noGroupFeedData?t._e():i("el-row",{staticClass:"Feed"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-s-flag"}),i("span",[t._v("小组帖子")])]),i("el-row",{attrs:{justify:"center",type:"flex"}},[i("div",{staticClass:"container"},t._l(t.columns3,(function(e){return i("div",{key:e,staticClass:"col"},t._l(e,(function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("span",{attrs:{id:"feedTitle"},on:{click:function(s){return t.toGroupFeed(e.id)}}},[t._v(t._s(e.title))]),i("br"),i("span",{attrs:{id:"feedCon"},on:{click:function(s){return t.toGroupFeed(e.id)}}},[t._v(t._s(e.description))])])})),0)})),0)])],1)],1)],1)},a=[],o=(s(47042),s(41539),s(54747),s(56977),s(68309),s(13083)),n=s(43445),r=s(30667),l=s(75095),c={name:"Search",components:{Header:o.Z,Footer:n.Z,Swiper:r.Z,FeedBox:l.Z},watch:{$route:{handler:"searchReload"}},data:function(){return{searchItem:"",hotBook:[],hotMovie:[],feeds:[],groupData:[],tags:[],groupFeedData:[],noData:!1,noBookData:!1,noMovieData:!1,noFeedData:!1,noGroupData:!1,noTagData:!1,noGroupFeedData:!1}},computed:{columns:function(){for(var t=[],e=this.feeds.length/3,s=3,i=0;i<e;i++)t.push(this.feeds.slice(i*s,i*s+s));return t},columns2:function(){for(var t=[],e=this.groupData.length/3,s=3,i=0;i<e;i++)t.push(this.groupData.slice(i*s,i*s+s));return t},columns3:function(){for(var t=[],e=this.groupFeedData.length/3,s=3,i=0;i<e;i++)t.push(this.groupFeedData.slice(i*s,i*s+s));return t}},methods:{getAll:function(){var t=this;this.$axios.all([this.getBook(),this.getMovie(),this.getFeed(),this.getGroup(),this.getTag(),this.getGroupFeed()]).then(this.$axios.spread((function(e,s,i,a,o,n){console.log(i.data.results),t.hotBook=e.data.results,t.hotMovie=s.data.results,t.feeds=i.data.results,t.groupData=a.data.results,t.tags=o.data.results,t.groupFeedData=n.data.results,t.setRating(t.hotBook),t.setRating(t.hotMovie),0==t.hotBook.length&&(t.noBookData=!0),0==t.hotMovie.length&&(t.noMovieData=!0),0==t.feeds.length&&(t.noFeedData=!0),0==t.groupData.length&&(t.noGroupData=!0),0==t.groupFeedData.length&&(t.noGroupFeedData=!0),0==t.tags.length&&(t.noTagData=!0),0==t.hotBook.length&&0==t.hotMovie.length&&0==t.feeds.length&&0==t.groupData.length&&0==t.tags.length&&0==t.groupFeedData.length&&(t.noData=!0)}))).catch((function(t){console.log(t)}))},getBook:function(){return this.$axios({method:"get",url:"/api/v1/book/list?search="+this.searchItem})},getMovie:function(){return this.$axios({method:"get",url:"/api/v1/movie/list?search="+this.searchItem})},getFeed:function(){return this.$axios({method:"get",url:"/api/v1/feed/list?search="+this.searchItem+"&isPublic=True"})},getGroup:function(){return this.$axios({method:"get",url:"/api/v1/group/list?searchName="+this.searchItem})},getTag:function(){return this.$axios({method:"get",url:"/api/v1/tag/list?search="+this.searchItem})},getGroupFeed:function(){return this.$axios({method:"get",url:"/api/v1/feed/list?search="+this.searchItem+"&isPublic=False"})},toGroup:function(t){this.$router.push({path:"/group/".concat(t)})},toFeed:function(t){this.$router.push({path:"/feed/".concat(t)})},toTag:function(t){this.$router.push({path:"/tag/".concat(t)})},toGroupFeed:function(t){this.$router.push({path:"/feed/".concat(t)})},searchReload:function(){location.reload()},setRating:function(t){return t.forEach((function(t,e,s){s[e].rating=s[e].rating.toFixed(1)}))},enterBook:function(t){this.$router.push({path:"/book/detail/".concat(t)})},enterMovie:function(t){this.$router.push({path:"/movie/detail/".concat(t)})}},mounted:function(){this.searchItem=this.$route.query.name,this.getAll()}},u=c,h=s(1001),d=(0,h.Z)(u,i,a,!1,null,"111784b0",null),f=d.exports},65131:function(t,e,s){t.exports=s.p+"img/Search2.b73c1841.svg"}}]);
//# sourceMappingURL=183-legacy.9e2e6c4c.js.map