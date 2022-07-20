"use strict";(self["webpackChunkse_project"]=self["webpackChunkse_project"]||[]).push([[803],{667:function(t,e,i){i.d(e,{Z:function(){return h}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrapper"},[i("el-row",{attrs:{gutter:20,type:"flex",justify:"center"}},[i("el-col",{attrs:{span:22}},[i("div",{attrs:{id:"father"}},[i("div",{style:{transform:"translateX("+t.currentOffset+"px)"},attrs:{id:"swiper-box"}},t._l(t.showList,(function(e){return i("div",{key:e.id,staticClass:"item-box",style:{minWidth:t.width,maxWidth:t.width}},[i("div",{staticClass:"image-box"},[i("el-image",{staticClass:"poster",attrs:{src:e.thumbnail},on:{click:function(i){return t.goDetails(e.id)}}})],1),i("div",{staticClass:"title-wrap"},[i("span",{staticClass:"book-title",on:{click:function(i){return t.goDetails(e.id)}}},[t._v(" "+t._s(e.title)+" ")]),i("span",{staticClass:"rating"},[t._v(t._s(e.rating))])])])})),0),i("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset<-5,expression:"currentOffset < -5"}],staticClass:"el-icon-arrow-left",on:{click:t.left}}),i("i",{directives:[{name:"show",rawName:"v-show",value:t.currentOffset>-854&&t.listLength>6,expression:"currentOffset > -854 && listLength>6"}],staticClass:"el-icon-arrow-right",on:{click:t.right}})])])],1)],1)},r=[],o={name:"MainpageSwiper",props:{initialList:Array,listType:String,width:{default:"16.67%"}},data(){return{showList:this.initialList,listLength:"",type:this.listType,currentOffset:0,boxWidth:"",fatherWith:0}},mounted(){this.setCardWidth(),this.listLength=this.showList.length},methods:{setCardWidth(){const t=document.querySelector("#father");this.fatherWith=t.clientWidth,this.boxWidth=this.fatherWith/6+"px"},right(){this.currentOffset<=-this.fatherWith/6*4||(this.currentOffset-=this.fatherWith/6,console.log(this.currentOffset))},left(){this.currentOffset>=0||(this.currentOffset+=this.fatherWith/6,console.log(this.currentOffset))},goDetails(t){"book"==this.listType?this.$router.push({path:`/book/detail/${t}`}):"movie"==this.listType&&this.$router.push({path:`/movie/detail/${t}`})}}},a=o,l=i(1001),n=(0,l.Z)(a,s,r,!1,null,"738b8f42",null),h=n.exports},3803:function(t,e,i){i.r(e),i.d(e,{default:function(){return u}});var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Header",{attrs:{id:"header"}}),i("div",{style:{"min-height":t.mainMinHeight+"px"},attrs:{id:"main"}},[t._m(0),i("el-row",{staticClass:"ctg-title"},[t._v("分类")]),i("el-row",{staticClass:"ctg-list"},[i("el-col",{staticClass:"ctg-list-type",attrs:{span:2}},[t._v("类型")]),i("el-col",{attrs:{span:18}},t._l(t.categoryList.slice(0,12),(function(e){return i("li",{key:e.id,on:{click:function(i){return t.goFilter(e.id+"&99")}}},[t._v(" "+t._s(e.des)+" ")])})),0)],1),i("el-row",{staticClass:"ctg-list"},[i("el-col",{staticClass:"ctg-list-type",attrs:{span:2}},[t._v("地区")]),i("el-col",{attrs:{span:18}},t._l(t.areaList,(function(e){return i("li",{key:e.id,on:{click:function(i){return t.goFilter("99&"+e.id)}}},[t._v(" "+t._s(e.des)+" ")])})),0)],1),i("el-divider"),i("el-row",{staticClass:"ctg-title"},[t._v("热门")]),i("el-row",[t.hotMovie.length?i("Swiper",{attrs:{initialList:t.hotMovie,listType:"movie"}}):t._e()],1),i("el-row",{staticClass:"ctg-title"},[t._v("最新上架")]),i("el-row",[t.newMovie.length?i("Swiper",{attrs:{initialList:t.newMovie,listType:"movie"}}):t._e()],1),i("el-row",{staticClass:"ctg-title"},[t._v("爱情")]),i("el-row",[t.romanceMovie.length?i("Swiper",{attrs:{initialList:t.romanceMovie,listType:"movie"}}):t._e()],1),i("el-row",{staticClass:"ctg-title"},[t._v("恐怖")]),i("el-row",[t.horrorMovie.length?i("Swiper",{attrs:{initialList:t.horrorMovie,listType:"movie"}}):t._e()],1)],1),i("Footer",{attrs:{id:"footer"}})],1)},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-title"},[s("img",{attrs:{src:i(7244),alt:"video icon"}}),s("span",[t._v("影视")])])}],o=i(3083),a=i(3445),l=i(667),n={name:"DramaMainpage",components:{Header:o.Z,Footer:a.Z,Swiper:l.Z},mounted(){this.getAllMovie(),this.mainMinHeight=document.documentElement.clientHeight-$("#header").outerHeight(!0)-$("#footer").outerHeight(!0)-6},methods:{goFilter(t){this.$router.push({path:`/movie/filter=category${t}`})},getAllMovie(){this.$axios.all([this.getHotMovie(),this.getNewMovie(),this.getRomanceMovie(),this.getHorrorMovie()]).then(this.$axios.spread(((t,e,i,s)=>{this.hotMovie=t.data.results,this.newMovie=e.data.results,this.romanceMovie=i.data.results,this.horrorMovie=s.data.results,this.setRating(this.hotMovie),this.setRating(this.newMovie),this.setRating(this.romanceMovie),this.setRating(this.horrorMovie)}))).catch((t=>{console.log(t)}))},getHotMovie(){return this.$axios({method:"get",url:"/api/v1/movie/list?orderBy=r"})},getNewMovie(){return this.$axios({method:"get",url:"/api/v1/movie/list"})},getRomanceMovie(){return this.$axios({method:"get",url:"/api/v1/movie/list?category=1"})},getHorrorMovie(){return this.$axios({method:"get",url:"/api/v1/movie/list?category=2"})},setRating(t){return t.forEach((function(t,e,i){i[e].rating=i[e].rating.toFixed(1)}))}},data(){return{areaList:[{id:"99",des:"全部"},{id:"0",des:"中国"},{id:"1",des:"美国"},{id:"2",des:"英国"},{id:"3",des:"韩国"},{id:"4",des:"日本"},{id:"5",des:"泰国"},{id:"6",des:"马来西亚"}],categoryList:[{id:"99",des:"全部"},{id:"1",des:"爱情"},{id:"2",des:"恐怖"},{id:"3",des:"悬疑"},{id:"4",des:"冒险"},{id:"5",des:"喜剧"},{id:"6",des:"动作"},{id:"7",des:"科幻"},{id:"8",des:"综艺"},{id:"9",des:"动漫"},{id:"10",des:"卡通"},{id:"11",des:"LGBT"},{id:"0",des:"其他"}],hotMovie:[],newMovie:[],romanceMovie:[],horrorMovie:[],mainMinHeight:""}}},h=n,c=i(1001),d=(0,c.Z)(h,s,r,!1,null,"383d89a0",null),u=d.exports}}]);
//# sourceMappingURL=803.394bd2e2.js.map