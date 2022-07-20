"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[763],{667:function(t,e,i){i.d(e,{Z:function(){return h}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrapper"},[i("el-row",{attrs:{gutter:20,type:"flex",justify:"center"}},[i("el-col",{attrs:{span:22}},[i("div",{attrs:{id:"father"}},[i("div",{style:{transform:"translateX("+t.currentOffset+"px)"},attrs:{id:"swiper-box"}},t._l(t.showList,(function(e){return i("div",{key:e.id,staticClass:"item-box",style:{minWidth:t.width,maxWidth:t.width}},[i("div",{staticClass:"image-box"},[i("el-image",{staticClass:"poster",attrs:{src:e.thumbnail},on:{click:function(i){return t.goDetails(e.id)}}})],1),i("div",{staticClass:"title-wrap"},[i("span",{staticClass:"book-title",on:{click:function(i){return t.goDetails(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),i("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])])})),0),i("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset<-5,expression:"currentOffset < -5"}],staticClass:"el-icon-arrow-left",on:{click:t.left}}),i("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset>-854&&t.listLength>6,expression:"currentOffset > -854 && listLength>6"}],staticClass:"el-icon-arrow-right",on:{click:t.right}})])])],1)],1)},o=[],r={name:"MainpageSwiper",props:{initialList:Array,listType:String,width:{default:"16.67%"}},data(){return{showList:this.initialList,listLength:"",type:this.listType,currentOffset:0,boxWidth:"",fatherWith:0}},mounted(){this.setCardWidth(),this.listLength=this.showList.length},methods:{setCardWidth(){const t=document.querySelector("#father");this.fatherWith=t.clientWidth,this.boxWidth=this.fatherWith/6+"px"},right(){this.currentOffset<=-this.fatherWith/6*4||(this.currentOffset-=this.fatherWith/6,console.log(this.currentOffset))},left(){this.currentOffset>=0||(this.currentOffset+=this.fatherWith/6,console.log(this.currentOffset))},goDetails(t){"book"==this.listType?this.$router.push({path:`/book/detail/${t}`}):"movie"==this.listType&&this.$router.push({path:`/movie/detail/${t}`})}}},a=r,n=i(1001),l=(0,n.Z)(a,s,o,!1,null,"738b8f42",null),h=l.exports},8763:function(t,e,i){i.r(e),i.d(e,{default:function(){return u}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Header",{attrs:{id:"header"}}),i("div",{style:{"min-height":t.mainMinHeight+"px"},attrs:{id:"main"}},[t._m(0),i("el-row",{staticClass:"ctg-title"},[t._v("分类")]),i("el-row",{staticClass:"ctg-list"},[i("el-col",{staticClass:"ctg-list-type",attrs:{span:2}},[t._v("类型")]),i("el-col",{attrs:{span:18}},t._l(t.categoryList,(function(e){return i("li",{key:e.id,on:{click:function(i){return t.goFilter(e.id)}}},[t._v(" "+t._s(e.des)+" ")])})),0)],1),i("el-divider"),i("el-row",{staticClass:"ctg-title"},[t._v("热门")]),i("el-row",[t.hotBook.length?i("Swiper",{attrs:{initialList:t.hotBook,listType:"book"}}):t._e()],1),i("el-row",{staticClass:"ctg-title"},[t._v("最新上架")]),i("el-row",[t.newBook.length?i("Swiper",{attrs:{initialList:t.newBook,listType:"book"}}):t._e()],1),i("el-row",{staticClass:"ctg-title"},[t._v("爱情")]),i("el-row",[t.romanceBook.length?i("Swiper",{attrs:{initialList:t.romanceBook,listType:"book"}}):t._e()],1),i("el-row",{staticClass:"ctg-title"},[t._v("悬疑")]),i("el-row",[t.suspenseBook.length?i("Swiper",{attrs:{initialList:t.suspenseBook,listType:"book"}}):t._e()],1)],1),i("Footer",{attrs:{id:"footer"}})],1)},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-title"},[s("img",{attrs:{src:i(1160),alt:"book icon"}}),s("span",[t._v("图书")])])}],r=i(3083),a=i(3445),n=i(667),l={name:"BookMainpage",components:{Header:r.Z,Footer:a.Z,Swiper:n.Z},data(){return{categoryList:[{id:99,des:"全部"},{id:1,des:"爱情"},{id:2,des:"恐怖"},{id:3,des:"悬疑"},{id:4,des:"科幻"},{id:5,des:"艺术"},{id:6,des:"体育"},{id:7,des:"烹饪"},{id:8,des:"漫画"},{id:9,des:"教育"},{id:10,des:"哲学"},{id:11,des:"文学"},{id:0,des:"其他"}],hotBook:[],newBook:[],romanceBook:[],suspenseBook:[],mainMinHeight:""}},mounted(){this.getAllBook(),this.mainMinHeight=document.documentElement.clientHeight-$("#header").outerHeight(!0)-$("#footer").outerHeight(!0)-6},methods:{goFilter(t){this.$router.push({path:`/book/filter=category${t}`})},getAllBook(){this.$axios.all([this.getHotBook(),this.getNewBook(),this.getRomanceBook(),this.getSuspenseBook()]).then(this.$axios.spread(((t,e,i,s)=>{this.hotBook=t.data.results,this.newBook=e.data.results,this.romanceBook=i.data.results,this.suspenseBook=s.data.results,this.setRating(this.hotBook),this.setRating(this.newBook),this.setRating(this.romanceBook),this.setRating(this.suspenseBook)}))).catch((t=>{console.log(t)}))},getHotBook(){return this.$axios({method:"get",url:"/api/v1/book/list?orderBy=r"})},getNewBook(){return this.$axios({method:"get",url:"/api/v1/book/list"})},getRomanceBook(){return this.$axios({method:"get",url:"/api/v1/book/list?category=1"})},getSuspenseBook(){return this.$axios({method:"get",url:"/api/v1/book/list?category=3"})},setRating(t){return t.forEach((function(t,e,i){i[e].rating=i[e].rating.toFixed(1)}))}}},h=l,c=i(1001),d=(0,c.Z)(h,s,o,!1,null,"e03cce86",null),u=d.exports}}]);
//# sourceMappingURL=763.8b166540.js.map