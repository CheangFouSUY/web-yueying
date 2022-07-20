"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[183],{667:function(t,e,s){s.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("el-row",{attrs:{gutter:20,type:"flex",justify:"center"}},[s("el-col",{attrs:{span:22}},[s("div",{attrs:{id:"father"}},[s("div",{style:{transform:"translateX("+t.currentOffset+"px)"},attrs:{id:"swiper-box"}},t._l(t.showList,(function(e){return s("div",{key:e.id,staticClass:"item-box",style:{minWidth:t.width,maxWidth:t.width}},[s("div",{staticClass:"image-box"},[s("el-image",{staticClass:"poster",attrs:{src:e.thumbnail},on:{click:function(s){return t.goDetails(e.id)}}})],1),s("div",{staticClass:"title-wrap"},[s("span",{staticClass:"book-title",on:{click:function(s){return t.goDetails(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),s("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])])})),0),s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset<-5,expression:"currentOffset < -5"}],staticClass:"el-icon-arrow-left",on:{click:t.left}}),s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset>-854&&t.listLength>6,expression:"currentOffset > -854 && listLength>6"}],staticClass:"el-icon-arrow-right",on:{click:t.right}})])])],1)],1)},a=[],r={name:"MainpageSwiper",props:{initialList:Array,listType:String,width:{default:"16.67%"}},data(){return{showList:this.initialList,listLength:"",type:this.listType,currentOffset:0,boxWidth:"",fatherWith:0}},mounted(){this.setCardWidth(),this.listLength=this.showList.length},methods:{setCardWidth(){const t=document.querySelector("#father");this.fatherWith=t.clientWidth,this.boxWidth=this.fatherWith/6+"px"},right(){this.currentOffset<=-this.fatherWith/6*4||(this.currentOffset-=this.fatherWith/6,console.log(this.currentOffset))},left(){this.currentOffset>=0||(this.currentOffset+=this.fatherWith/6,console.log(this.currentOffset))},goDetails(t){"book"==this.listType?this.$router.push({path:`/book/detail/${t}`}):"movie"==this.listType&&this.$router.push({path:`/movie/detail/${t}`})}}},o=r,n=s(1001),l=(0,n.Z)(o,i,a,!1,null,"738b8f42",null),c=l.exports},5128:function(t,e,s){s.r(e),s.d(e,{default:function(){return p}});var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Header"),i("div",{staticClass:"main"},[i("el-row",{staticClass:"Top",attrs:{align:"middle",type:"flex"}},[i("img",{staticClass:"searchicon",attrs:{src:s(5130),alt:"search_icon"}}),i("span",[t._v('搜索"'+t._s(t.searchItem)+'"')])]),i("el-row",{staticClass:"noResult"},[t.noData?i("span",[t._v("抱歉！没有结果")]):t._e()]),t.noBookData?t._e():i("el-row",{staticClass:"Book"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("img",{attrs:{src:s(1160),alt:"book icon"}}),i("span",[t._v("图书")])]),i("el-row",{staticClass:"result-wrap"},t._l(t.hotBook,(function(e){return i("div",{key:e.id,staticClass:"item-box"},[i("el-image",{staticClass:"poster",attrs:{src:e.thumbnail,fit:"cover"},on:{click:function(s){return t.enterBook(e.id)}}}),i("div",{staticClass:"title-wrap"},[i("span",{staticClass:"book-title",on:{click:function(s){return t.enterBook(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),i("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])],1)})),0)],1),t.noMovieData?t._e():i("el-row",{staticClass:"Drama"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("img",{attrs:{src:s(7244),alt:"video icon"}}),i("span",[t._v("影视")])]),i("el-row",{staticClass:"result-wrap"},t._l(t.hotMovie,(function(e){return i("div",{key:e.id,staticClass:"item-box"},[i("el-image",{staticClass:"poster",attrs:{src:e.thumbnail,fit:"cover"},on:{click:function(s){return t.enterMovie(e.id)}}}),i("div",{staticClass:"title-wrap"},[i("span",{staticClass:"book-title",on:{click:function(s){return t.enterMovie(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),i("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])],1)})),0)],1),t.noTagData?t._e():i("el-row",{staticClass:"Tag"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-position"}),i("span",[t._v("话题")])]),t._l(t.tags,(function(e){return i("el-row",{key:e.id},[i("el-col",{attrs:{span:12,offset:2}},[i("div",{staticClass:"TagContent"},[i("span",{attrs:{id:"tagCon"},on:{click:function(s){return t.toTag(e.id)}}},[t._v("#"+t._s(e.title))])])])],1)}))],2),t.noFeedData?t._e():i("el-row",{staticClass:"Feed"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-position"}),i("span",[t._v("话题帖子")])]),i("el-row",{attrs:{justify:"center",type:"flex"}},[i("div",{staticClass:"container"},t._l(t.columns,(function(e){return i("div",{key:e,staticClass:"col"},t._l(e,(function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("span",{attrs:{id:"feedTitle"},on:{click:function(s){return t.toFeed(e.id)}}},[t._v(t._s(e.title))]),i("br"),i("span",{attrs:{id:"feedCon"},on:{click:function(s){return t.toFeed(e.id)}}},[t._v(t._s(e.description))])])})),0)})),0)])],1),t.noGroupData?t._e():i("el-row",{staticClass:"Group"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-s-flag"}),i("span",[t._v("小组")])]),i("el-row",{attrs:{justify:"center",type:"flex"}},[i("div",{staticClass:"container"},t._l(t.columns2,(function(e){return i("div",{key:e,staticClass:"col"},t._l(e,(function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("el-avatar",{attrs:{src:e.img}}),i("div",{staticClass:"textInside"},[i("span",{on:{click:function(s){return t.toGroup(e.id)}}},[t._v(t._s(e.groupName))])])],1)})),0)})),0)])],1),t.noGroupFeedData?t._e():i("el-row",{staticClass:"Feed"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("i",{staticClass:"el-icon-s-flag"}),i("span",[t._v("小组帖子")])]),i("el-row",{attrs:{justify:"center",type:"flex"}},[i("div",{staticClass:"container"},t._l(t.columns3,(function(e){return i("div",{key:e,staticClass:"col"},t._l(e,(function(e){return i("div",{key:e.id,staticClass:"item-container"},[i("span",{attrs:{id:"feedTitle"},on:{click:function(s){return t.toGroupFeed(e.id)}}},[t._v(t._s(e.title))]),i("br"),i("span",{attrs:{id:"feedCon"},on:{click:function(s){return t.toGroupFeed(e.id)}}},[t._v(t._s(e.description))])])})),0)})),0)])],1)],1)],1)},a=[],r=s(3083),o=s(3445),n=s(667),l=s(5095),c={name:"Search",components:{Header:r.Z,Footer:o.Z,Swiper:n.Z,FeedBox:l.Z},watch:{$route:{handler:"searchReload"}},data(){return{searchItem:"",hotBook:[],hotMovie:[],feeds:[],groupData:[],tags:[],groupFeedData:[],noData:!1,noBookData:!1,noMovieData:!1,noFeedData:!1,noGroupData:!1,noTagData:!1,noGroupFeedData:!1}},computed:{columns(){let t=[],e=this.feeds.length/3,s=3;for(let i=0;i<e;i++)t.push(this.feeds.slice(i*s,i*s+s));return t},columns2(){let t=[],e=this.groupData.length/3,s=3;for(let i=0;i<e;i++)t.push(this.groupData.slice(i*s,i*s+s));return t},columns3(){let t=[],e=this.groupFeedData.length/3,s=3;for(let i=0;i<e;i++)t.push(this.groupFeedData.slice(i*s,i*s+s));return t}},methods:{getAll(){this.$axios.all([this.getBook(),this.getMovie(),this.getFeed(),this.getGroup(),this.getTag(),this.getGroupFeed()]).then(this.$axios.spread(((t,e,s,i,a,r)=>{console.log(s.data.results),this.hotBook=t.data.results,this.hotMovie=e.data.results,this.feeds=s.data.results,this.groupData=i.data.results,this.tags=a.data.results,this.groupFeedData=r.data.results,this.setRating(this.hotBook),this.setRating(this.hotMovie),0==this.hotBook.length&&(this.noBookData=!0),0==this.hotMovie.length&&(this.noMovieData=!0),0==this.feeds.length&&(this.noFeedData=!0),0==this.groupData.length&&(this.noGroupData=!0),0==this.groupFeedData.length&&(this.noGroupFeedData=!0),0==this.tags.length&&(this.noTagData=!0),0==this.hotBook.length&&0==this.hotMovie.length&&0==this.feeds.length&&0==this.groupData.length&&0==this.tags.length&&0==this.groupFeedData.length&&(this.noData=!0)}))).catch((t=>{console.log(t)}))},getBook(){return this.$axios({method:"get",url:"/api/v1/book/list?search="+this.searchItem})},getMovie(){return this.$axios({method:"get",url:"/api/v1/movie/list?search="+this.searchItem})},getFeed(){return this.$axios({method:"get",url:"/api/v1/feed/list?search="+this.searchItem+"&isPublic=True"})},getGroup(){return this.$axios({method:"get",url:"/api/v1/group/list?searchName="+this.searchItem})},getTag(){return this.$axios({method:"get",url:"/api/v1/tag/list?search="+this.searchItem})},getGroupFeed(){return this.$axios({method:"get",url:"/api/v1/feed/list?search="+this.searchItem+"&isPublic=False"})},toGroup(t){this.$router.push({path:`/group/${t}`})},toFeed(t){this.$router.push({path:`/feed/${t}`})},toTag(t){this.$router.push({path:`/tag/${t}`})},toGroupFeed(t){this.$router.push({path:`/feed/${t}`})},searchReload(){location.reload()},setRating(t){return t.forEach((function(t,e,s){s[e].rating=s[e].rating.toFixed(1)}))},enterBook(t){this.$router.push({path:`/book/detail/${t}`})},enterMovie(t){this.$router.push({path:`/movie/detail/${t}`})}},mounted(){this.searchItem=this.$route.query.name,this.getAll()}},h=c,u=s(1001),d=(0,u.Z)(h,i,a,!1,null,"111784b0",null),p=d.exports},5130:function(t,e,s){t.exports=s.p+"img/Search2.b73c1841.svg"}}]);
//# sourceMappingURL=183.ee2a6ebd.js.map