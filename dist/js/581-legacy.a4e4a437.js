"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[581],{30667:function(t,e,i){i.d(e,{Z:function(){return l}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrapper"},[i("el-row",{attrs:{gutter:20,type:"flex",justify:"center"}},[i("el-col",{attrs:{span:22}},[i("div",{attrs:{id:"father"}},[i("div",{style:{transform:"translateX("+t.currentOffset+"px)"},attrs:{id:"swiper-box"}},t._l(t.showList,(function(e){return i("div",{key:e.id,staticClass:"item-box",style:{minWidth:t.width,maxWidth:t.width}},[i("div",{staticClass:"image-box"},[i("el-image",{staticClass:"poster",attrs:{src:e.thumbnail},on:{click:function(i){return t.goDetails(e.id)}}})],1),i("div",{staticClass:"title-wrap"},[i("span",{staticClass:"book-title",on:{click:function(i){return t.goDetails(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),i("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])])})),0),i("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset<-5,expression:"currentOffset < -5"}],staticClass:"el-icon-arrow-left",on:{click:t.left}}),i("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset>-854&&t.listLength>6,expression:"currentOffset > -854 && listLength>6"}],staticClass:"el-icon-arrow-right",on:{click:t.right}})])])],1)],1)},a=[],r={name:"MainpageSwiper",props:{initialList:Array,listType:String,width:{default:"16.67%"}},data:function(){return{showList:this.initialList,listLength:"",type:this.listType,currentOffset:0,boxWidth:"",fatherWith:0}},mounted:function(){this.setCardWidth(),this.listLength=this.showList.length},methods:{setCardWidth:function(){var t=document.querySelector("#father");this.fatherWith=t.clientWidth,this.boxWidth=this.fatherWith/6+"px"},right:function(){this.currentOffset<=-this.fatherWith/6*4||(this.currentOffset-=this.fatherWith/6,console.log(this.currentOffset))},left:function(){this.currentOffset>=0||(this.currentOffset+=this.fatherWith/6,console.log(this.currentOffset))},goDetails:function(t){"book"==this.listType?this.$router.push({path:"/book/detail/".concat(t)}):"movie"==this.listType&&this.$router.push({path:"/movie/detail/".concat(t)})}}},n=r,o=i(1001),c=(0,o.Z)(n,s,a,!1,null,"738b8f42",null),l=c.exports},87360:function(t,e,i){i.r(e),i.d(e,{default:function(){return d}});var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("Header"),s("div",{staticClass:"main"},[s("el-row",{staticClass:"Top",attrs:{align:"middle",type:"flex"}},[s("img",{staticClass:"searchicon",attrs:{src:i(65131),alt:"search_icon"}}),s("span",[t._v('搜索"'+t._s(t.searchItem)+'"')])]),s("el-row",{staticClass:"noResult"},[t.noData?s("span",[t._v("抱歉！没有结果")]):t._e()]),t.noData?t._e():s("el-row",{staticClass:"Drama"},[s("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[s("img",{attrs:{src:i(67244),alt:"video icon"}}),s("span",[t._v("影视")])]),s("el-row",{staticClass:"result-wrap"},t._l(t.hotMovie,(function(e){return s("div",{key:e.id,staticClass:"item-box"},[s("el-image",{staticClass:"poster",attrs:{src:e.thumbnail,fit:"cover"},on:{click:function(i){return t.enterMovie(e.id)}}}),s("div",{staticClass:"title-wrap"},[s("span",{staticClass:"book-title",on:{click:function(i){return t.enterMovie(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),s("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])],1)})),0)],1)],1)],1)},a=[],r=(i(41539),i(54747),i(56977),i(68309),i(13083)),n=i(43445),o=i(30667),c=i(75095),l={name:"Search",components:{Header:r.Z,Footer:n.Z,Swiper:o.Z,FeedBox:c.Z},data:function(){return{type:"0",searchItem:"",hotMovie:[],noData:!1}},watch:{$route:{handler:"searchReload"}},methods:{getDrama:function(){var t=this;this.$axios({method:"get",url:"/api/v1/movie/list?search="+this.searchItem}).then((function(e){console.log(e),t.hotMovie=e.data.results,t.setRating(t.hotMovie),0==t.hotMovie.length&&(t.noData=!0)})).catch((function(t){console.log(t)}))},searchReload:function(){location.reload()},setRating:function(t){return t.forEach((function(t,e,i){i[e].rating=i[e].rating.toFixed(1)}))},enterMovie:function(t){this.$router.push({path:"/movie/detail/".concat(t)})}},mounted:function(){this.searchItem=this.$route.query.name,this.getDrama()}},h=l,u=i(1001),f=(0,u.Z)(h,s,a,!1,null,"08c74d4c",null),d=f.exports},65131:function(t,e,i){t.exports=i.p+"img/Search2.b73c1841.svg"}}]);
//# sourceMappingURL=581-legacy.a4e4a437.js.map