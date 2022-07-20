"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[27],{30667:function(t,e,s){s.d(e,{Z:function(){return l}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("el-row",{attrs:{gutter:20,type:"flex",justify:"center"}},[s("el-col",{attrs:{span:22}},[s("div",{attrs:{id:"father"}},[s("div",{style:{transform:"translateX("+t.currentOffset+"px)"},attrs:{id:"swiper-box"}},t._l(t.showList,(function(e){return s("div",{key:e.id,staticClass:"item-box",style:{minWidth:t.width,maxWidth:t.width}},[s("div",{staticClass:"image-box"},[s("el-image",{staticClass:"poster",attrs:{src:e.thumbnail},on:{click:function(s){return t.goDetails(e.id)}}})],1),s("div",{staticClass:"title-wrap"},[s("span",{staticClass:"book-title",on:{click:function(s){return t.goDetails(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),s("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])])})),0),s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset<-5,expression:"currentOffset < -5"}],staticClass:"el-icon-arrow-left",on:{click:t.left}}),s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset>-854&&t.listLength>6,expression:"currentOffset > -854 && listLength>6"}],staticClass:"el-icon-arrow-right",on:{click:t.right}})])])],1)],1)},a=[],n={name:"MainpageSwiper",props:{initialList:Array,listType:String,width:{default:"16.67%"}},data:function(){return{showList:this.initialList,listLength:"",type:this.listType,currentOffset:0,boxWidth:"",fatherWith:0}},mounted:function(){this.setCardWidth(),this.listLength=this.showList.length},methods:{setCardWidth:function(){var t=document.querySelector("#father");this.fatherWith=t.clientWidth,this.boxWidth=this.fatherWith/6+"px"},right:function(){this.currentOffset<=-this.fatherWith/6*4||(this.currentOffset-=this.fatherWith/6,console.log(this.currentOffset))},left:function(){this.currentOffset>=0||(this.currentOffset+=this.fatherWith/6,console.log(this.currentOffset))},goDetails:function(t){"book"==this.listType?this.$router.push({path:"/book/detail/".concat(t)}):"movie"==this.listType&&this.$router.push({path:"/movie/detail/".concat(t)})}}},r=n,o=s(1001),c=(0,o.Z)(r,i,a,!1,null,"738b8f42",null),l=c.exports},83154:function(t,e,s){s.r(e),s.d(e,{default:function(){return d}});var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Header"),i("div",{staticClass:"main"},[i("el-row",{staticClass:"Top",attrs:{align:"middle",type:"flex"}},[i("img",{staticClass:"searchicon",attrs:{src:s(65131),alt:"search_icon"}}),i("span",[t._v('搜索"'+t._s(t.searchItem)+'"')])]),i("el-row",{staticClass:"noResult"},[t.noData&&t.noData2?i("span",[t._v("抱歉！没有结果")]):t._e()]),t.noData2?t._e():i("el-row",{staticClass:"Tag"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-position"}),i("span",[t._v("话题")])]),t._l(t.tags,(function(e){return i("el-row",{key:e.id},[i("el-col",{attrs:{span:12,offset:2}},[i("div",{staticClass:"TagContent"},[i("span",{attrs:{id:"tagCon"},on:{click:function(s){return t.toTag(e.id)}}},[t._v("#"+t._s(e.title))])])])],1)}))],2),t.noData?t._e():i("el-row",{staticClass:"Feed"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-position"}),i("span",[t._v("话题帖子")])]),i("el-row",{attrs:{justify:"center",type:"flex"}},[i("div",{staticClass:"container"},t._l(t.columns,(function(e){return i("div",{key:e,staticClass:"col"},t._l(e,(function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("span",{attrs:{id:"feedTitle"},on:{click:function(s){return t.toFeed(e.id)}}},[t._v(t._s(e.title))]),i("br"),i("span",{attrs:{id:"feedCon"},on:{click:function(s){return t.toFeed(e.id)}}},[t._v(t._s(e.description))])])})),0)})),0)])],1)],1)],1)},a=[],n=(s(47042),s(68309),s(13083)),r=s(43445),o=s(30667),c=s(75095),l={name:"Search",components:{Header:n.Z,Footer:r.Z,Swiper:o.Z,FeedBox:c.Z},data:function(){return{searchItem:"",feeds:[],feedsId:[],tags:[],noData:!1,noData2:!1}},watch:{$route:{handler:"searchReload"}},computed:{columns:function(){for(var t=[],e=this.feeds.length/3,s=3,i=0;i<e;i++)t.push(this.feeds.slice(i*s,i*s+s));return t}},methods:{getFeed:function(){var t=this;this.$axios({method:"get",url:"/api/v1/feed/list?search="+this.searchItem+"&isPublic=True"}).then((function(e){console.log(e.data.results),t.feeds=e.data.results,0==t.feeds.length&&(t.noData=!0)})).catch((function(t){console.log(t)}))},getTag:function(){var t=this;this.$axios({method:"get",url:"/api/v1/tag/list?search="+this.searchItem}).then((function(e){console.log(e.data.results),t.tags=e.data.results,0==t.tags.length&&(t.noData2=!0)})).catch((function(t){console.log(t)}))},toFeed:function(t){this.$router.push({path:"/feed/".concat(t)})},toTag:function(t){this.$router.push({path:"/tag/".concat(t)})},searchReload:function(){location.reload()}},mounted:function(){this.searchItem=this.$route.query.name,this.getFeed(),this.getTag()}},h=l,u=s(1001),f=(0,u.Z)(h,i,a,!1,null,"2cd17ae4",null),d=f.exports},65131:function(t,e,s){t.exports=s.p+"img/Search2.b73c1841.svg"}}]);
//# sourceMappingURL=27-legacy.7130ce7b.js.map