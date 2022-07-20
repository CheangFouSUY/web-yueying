"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[440],{667:function(t,e,s){s.d(e,{Z:function(){return h}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("el-row",{attrs:{gutter:20,type:"flex",justify:"center"}},[s("el-col",{attrs:{span:22}},[s("div",{attrs:{id:"father"}},[s("div",{style:{transform:"translateX("+t.currentOffset+"px)"},attrs:{id:"swiper-box"}},t._l(t.showList,(function(e){return s("div",{key:e.id,staticClass:"item-box",style:{minWidth:t.width,maxWidth:t.width}},[s("div",{staticClass:"image-box"},[s("el-image",{staticClass:"poster",attrs:{src:e.thumbnail},on:{click:function(s){return t.goDetails(e.id)}}})],1),s("div",{staticClass:"title-wrap"},[s("span",{staticClass:"book-title",on:{click:function(s){return t.goDetails(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),s("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])])})),0),s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset<-5,expression:"currentOffset < -5"}],staticClass:"el-icon-arrow-left",on:{click:t.left}}),s("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset>-854&&t.listLength>6,expression:"currentOffset > -854 && listLength>6"}],staticClass:"el-icon-arrow-right",on:{click:t.right}})])])],1)],1)},a=[],r={name:"MainpageSwiper",props:{initialList:Array,listType:String,width:{default:"16.67%"}},data(){return{showList:this.initialList,listLength:"",type:this.listType,currentOffset:0,boxWidth:"",fatherWith:0}},mounted(){this.setCardWidth(),this.listLength=this.showList.length},methods:{setCardWidth(){const t=document.querySelector("#father");this.fatherWith=t.clientWidth,this.boxWidth=this.fatherWith/6+"px"},right(){this.currentOffset<=-this.fatherWith/6*4||(this.currentOffset-=this.fatherWith/6,console.log(this.currentOffset))},left(){this.currentOffset>=0||(this.currentOffset+=this.fatherWith/6,console.log(this.currentOffset))},goDetails(t){"book"==this.listType?this.$router.push({path:`/book/detail/${t}`}):"movie"==this.listType&&this.$router.push({path:`/movie/detail/${t}`})}}},o=r,n=s(1001),l=(0,n.Z)(o,i,a,!1,null,"738b8f42",null),h=l.exports},1440:function(t,e,s){s.r(e),s.d(e,{default:function(){return f}});var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Header"),i("div",{staticClass:"main"},[i("router-view",{key:t.$route.fullPath}),i("el-row",{staticClass:"Top",attrs:{align:"middle",type:"flex"}},[i("img",{staticClass:"searchicon",attrs:{src:s(5130),alt:"search_icon"}}),i("span",[t._v('搜索"'+t._s(t.searchItem)+'"')])]),i("el-row",{staticClass:"noResult"},[t.noData?i("span",[t._v("抱歉！没有结果")]):t._e()]),t.noData?t._e():i("el-row",{staticClass:"Book"},[i("el-row",{staticClass:"Text",attrs:{align:"middle",type:"flex"}},[i("img",{attrs:{src:s(1160),alt:"book icon"}}),i("span",[t._v("图书")])]),i("el-row",{staticClass:"result-wrap"},t._l(t.hotBook,(function(e){return i("div",{key:e.id,staticClass:"item-box"},[i("el-image",{staticClass:"poster",attrs:{src:e.thumbnail,fit:"cover"},on:{click:function(s){return t.enterBook(e.id)}}}),i("div",{staticClass:"title-wrap"},[i("span",{staticClass:"book-title",on:{click:function(s){return t.enterBook(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),i("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])],1)})),0)],1)],1)],1)},a=[],r=s(3083),o=s(3445),n=s(667),l={name:"Search",components:{Header:r.Z,Footer:o.Z,Swiper:n.Z},data(){return{searchItem:"",hotBook:[],noData:!1}},watch:{$route:{handler:"searchReload"}},methods:{getBook(){this.$axios({method:"get",url:"/api/v1/book/list?search="+this.searchItem}).then((t=>{console.log(t),this.hotBook=t.data.results,this.setRating(this.hotBook),0==this.hotBook.length&&(this.noData=!0)})).catch((t=>{console.log(t)}))},searchReload(){location.reload()},setRating(t){return t.forEach((function(t,e,s){s[e].rating=s[e].rating.toFixed(1)}))},enterBook(t){this.$router.push({path:`/book/detail/${t}`})}},mounted(){this.searchItem=this.$route.query.name,this.getBook()}},h=l,c=s(1001),u=(0,c.Z)(h,i,a,!1,null,"1ffb61c8",null),f=u.exports},5130:function(t,e,s){t.exports=s.p+"img/Search2.b73c1841.svg"}}]);
//# sourceMappingURL=440.69ebb3b1.js.map