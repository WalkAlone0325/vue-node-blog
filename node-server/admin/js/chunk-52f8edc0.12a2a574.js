(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52f8edc0"],{"4e82":function(t,e,a){"use strict";var r=a("23e7"),n=a("1c0b"),s=a("7b0b"),o=a("d039"),i=a("b301"),c=[].sort,l=[1,2,3],u=o((function(){l.sort(void 0)})),d=o((function(){l.sort(null)})),p=i("sort"),f=u||!d||p;r({target:"Array",proto:!0,forced:f},{sort:function(t){return void 0===t?c.call(s(this)):c.call(s(this),n(t))}})},"760a":function(t,e,a){"use strict";var r=a("fd04"),n=a.n(r);n.a},"8ea7":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tagsList-page"},[a("h2",[t._v("标签管理")]),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:function(e){t.addDialog=!0}}},[t._v("添加标签")]),a("el-dialog",{attrs:{title:"添加标签","modal-append-to-body":!1,visible:t.addDialog,width:"30%","before-close":function(t){return t()}},on:{"update:visible":function(e){t.addDialog=e}}},[a("el-form",{ref:"createForm",attrs:{rules:t.rules,model:t.create,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"标签名称",prop:"tag"}},[a("el-input",{model:{value:t.create.tag,callback:function(e){t.$set(t.create,"tag",e)},expression:"create.tag"}})],1),a("el-form-item",{attrs:{label:"标签描述",prop:"desc"}},[a("el-input",{model:{value:t.create.desc,callback:function(e){t.$set(t.create,"desc",e)},expression:"create.desc"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.createTag("create")}}},[t._v("添 加")])],1)],1),a("el-dialog",{attrs:{title:"编辑标签","modal-append-to-body":!1,visible:t.updateDialog,width:"30%","before-close":function(t){return t()}},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{ref:"updateForm",attrs:{rules:t.rules,model:t.update,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"标签名称",prop:"tag"}},[a("el-input",{model:{value:t.update.tag,callback:function(e){t.$set(t.update,"tag",e)},expression:"update.tag"}})],1),a("el-form-item",{attrs:{label:"标签描述",prop:"desc"}},[a("el-input",{model:{value:t.update.desc,callback:function(e){t.$set(t.update,"desc",e)},expression:"update.desc"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateTag(t.update)}}},[t._v("修 改")])],1)],1),a("el-table",{staticStyle:{width:"80%",margin:"0 auto","margin-top":"20px"},attrs:{data:t.tagsList,border:""}},[a("el-table-column",{attrs:{type:"index",width:"100"}}),a("el-table-column",{attrs:{prop:"tag",label:"标签名称"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[a("el-tag",{staticStyle:{margin:"0 3px","font-size":"14px"},attrs:{effect:"dark"}},[t._v(t._s(r.tag))])]}}])}),a("el-table-column",{attrs:{prop:"desc",label:"描述"}}),a("el-table-column",{attrs:{prop:"numList",label:"文章数量"}}),a("el-table-column",{attrs:{prop:"created",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("timeFormat")(e.row.created)))])]}}])}),a("el-table-column",{attrs:{prop:"updated",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("timeFormat")(e.row.updated)))])]}}])}),a("el-table-column",{attrs:{label:"操作",width:"150",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.setCurrent(e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return t.removed(e.row)}}},[t._v("删除")])]}}])})],1)],1)},n=[],s=(a("7db0"),a("4160"),a("4e82"),a("d3b7"),a("159b"),a("96cf"),{name:"List",data:function(){return{addDialog:!1,updateDialog:!1,create:{tag:"",desc:""},update:{tag:"",desc:""},rules:{name:[{required:!0,message:"请输入标签名称",trigger:"blur"},{min:2,max:10,message:"长度在 2 到 10 个字符"}]},tagsList:[]}},methods:{createTag:function(){var t=this;this.$refs.createForm.validate((function(e){return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:if(!e){a.next=9;break}return a.next=3,regeneratorRuntime.awrap(t.$http.post("/tag",t.create));case 3:t.$message.success("创建标签成功！"),t.addDialog=!1,t.reset(),t.getTag(),a.next=10;break;case 9:return a.abrupt("return",!1);case 10:case"end":return a.stop()}}))}))},reset:function(){this.$refs.createForm.resetFields()},setCurrent:function(t){this.update._id=t._id,this.update.tag=t.tag,this.update.desc=t.desc,this.updateDialog=!0},updateTag:function(t){var e=this;this.$refs.updateForm.validate((function(a){return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:if(!a){r.next=8;break}return r.next=3,regeneratorRuntime.awrap(e.$http.put("/tag/".concat(t._id),e.update));case 3:e.$message.success("修改标签成功！"),e.updateDialog=!1,e.getTag(),r.next=9;break;case 8:return r.abrupt("return",!1);case 9:case"end":return r.stop()}}))}))},removed:function(t){var e=this;this.$confirm('是否删除标签 "'.concat(t.tag,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(e.$http.delete("/tag/".concat(t._id)));case 2:e.$message({type:"success",message:"删除成功!"}),e.getTag();case 4:case"end":return a.stop()}}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},getTag:function(){var t,e,a;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(this.$http("/tag"));case 2:t=r.sent,e=t.data.data.tags_list,a=t.data.data.article_num_list,e.forEach((function(t){var e=a.find((function(e){return e._id==t._id}));t.numList=null==e?0:e.count})),t.data=e.sort((function(t,e){return t.numList<e.numList})),this.tagsList=e;case 8:case"end":return r.stop()}}),null,this)}},created:function(){this.getTag()}}),o=s,i=(a("760a"),a("2877")),c=Object(i["a"])(o,r,n,!1,null,null,null);e["default"]=c.exports},fd04:function(t,e,a){}}]);
//# sourceMappingURL=chunk-52f8edc0.12a2a574.js.map