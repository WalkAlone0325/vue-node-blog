exports.ids=[2],exports.modules={108:function(t,e,r){"use strict";r.r(e);var c=r(14),n={filters:{format(t){const e=t.split("-");return`${e[0]} 年 ${e[1]} 月`}},props:{list:{type:Array,default:null},title:{type:String,default:""}}},l=r(1);var o={components:{ArchiveItem:Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"arch-item"},[t._ssrNode('<div class="arch-item-title"><span>'+t._ssrEscape(t._s(t._f("format")(t.title)))+"</span></div> "),t._ssrNode("<ul>","</ul>",t._l(t.list,(function(e,c){return r("router-link",{key:c,attrs:{to:"/article/"+e._id}},[r("li",[t._v(t._s(e.created.substring(0,10)+" => "+e.title))])])})),1)],2)}),[],!1,(function(t){var e=r(78);e.__inject__&&e.__inject__(t)}),null,"acc04e1a").exports},data:()=>({archiveList:[]}),head:{title:"独行的博客-归档"},computed:{list(){const t={};return this.archiveList.forEach(e=>{const time=e.created.substring(0,7);null==t[time]&&(t[time]=[]),t[time].push(e)}),t}},created(){this.getArchive()},methods:{async getArchive(){const t=await this.$axios("/archives");this.archiveList=t.data.archiveList,this.archiveList.map(t=>({_id:t._id,title:t.title,created:Object(c.b)(t.created),updated:Object(c.b)(t.updated)}))}}},d=Object(l.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"archive-page"},[this._ssrNode('<div class="page_container">',"</div>",this._l(this.list,(function(t,r,c){return e("ArchiveItem",{key:c,attrs:{title:r,list:t}})})),1)])}),[],!1,null,null,"3f2685ba");e.default=d.exports},62:function(t,e,r){var content=r(79);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var c=r(3).default;t.exports.__inject__=function(t){c("8cc0317c",content,!0,t)}},78:function(t,e,r){"use strict";r.r(e);var c=r(62),n=r.n(c);for(var l in c)"default"!==l&&function(t){r.d(e,t,(function(){return c[t]}))}(l);e.default=n.a},79:function(t,e,r){(t.exports=r(2)(!1)).push([t.i,".arch-item{width:80%;margin:0 auto;border-left:2px solid #3495db}.arch-item .arch-item-title{font-size:24px;font-weight:700;margin:20px 10px}.arch-item .arch-item-title span{color:#515a6e}.arch-item ul{padding-left:50px;font-size:16px;list-style:none}.arch-item ul a{text-decoration:none}.arch-item ul a li{padding:10px 0;color:#666}.arch-item ul a:hover li{color:#3495db}",""])}};