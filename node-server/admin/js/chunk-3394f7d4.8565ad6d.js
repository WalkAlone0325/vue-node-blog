(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3394f7d4"],{4722:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"skilllist-page"},[a("h2",[e._v("技能管理")]),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:function(t){e.addDialog=!0}}},[e._v("添加技能")]),a("el-dialog",{attrs:{title:"添加技能","modal-append-to-body":!1,visible:e.addDialog,width:"30%","before-close":function(e){return e()}},on:{"update:visible":function(t){e.addDialog=t}}},[a("el-form",{ref:"createForm",attrs:{model:e.create,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"技能名称",prop:"name"}},[a("el-input",{model:{value:e.create.name,callback:function(t){e.$set(e.create,"name",t)},expression:"create.name"}})],1),a("el-form-item",{attrs:{label:"熟练度",prop:"progress_bar"}},[a("el-input",{model:{value:e.create.progress_bar,callback:function(t){e.$set(e.create,"progress_bar",t)},expression:"create.progress_bar"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.addDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary",loading:e.createLoading},on:{click:function(t){return e.createSkill("create")}}},[e._v("添 加")])],1)],1),a("el-dialog",{attrs:{title:"编辑技能","modal-append-to-body":!1,visible:e.updateDialog,width:"30%","before-close":function(e){return e()}},on:{"update:visible":function(t){e.updateDialog=t}}},[a("el-form",{ref:"updateForm",attrs:{model:e.update,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"技能名称",prop:"name"}},[a("el-input",{model:{value:e.update.name,callback:function(t){e.$set(e.update,"name",t)},expression:"update.name"}})],1),a("el-form-item",{attrs:{label:"熟练度",prop:"progress_bar"}},[a("el-input",{attrs:{value:"/"},model:{value:e.update.progress_bar,callback:function(t){e.$set(e.update,"progress_bar",t)},expression:"update.progress_bar"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.updateDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.updateSkill(e.update)}}},[e._v("修 改")])],1)],1),a("el-table",{staticStyle:{width:"80%",margin:"0 auto","margin-top":"20px"},attrs:{data:e.skillList,border:""}},[a("el-table-column",{attrs:{type:"index",width:"100"}}),a("el-table-column",{attrs:{prop:"name",label:"技能名称"}}),a("el-table-column",{attrs:{prop:"progress_bar",label:"熟练度"}}),a("el-table-column",{attrs:{prop:"updated",label:"更新时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("timeFormat")(t.row.updated)))])]}}])}),a("el-table-column",{attrs:{label:"操作",width:"150",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.setCurrent(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.removed(t.row)}}},[e._v("删除")])]}}])})],1)],1)},n=[],s=(a("b0c0"),a("d3b7"),a("96cf"),{name:"List",data:function(){return{addDialog:!1,updateDialog:!1,createLoading:!1,updateLoading:!1,create:{name:"",progress_bar:""},update:{name:"",progress_bar:0},skillList:[]}},methods:{createSkill:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return this.createLoading=!0,e.next=3,regeneratorRuntime.awrap(this.$http.post("/skill",this.create));case 3:this.$message.success("创建技能成功！"),this.addDialog=!1,this.createLoading=!1,this.reset(),this.getSkill();case 8:case"end":return e.stop()}}),null,this)},reset:function(){this.$refs.createForm.resetFields()},setCurrent:function(e){this.update._id=e._id,this.update.name=e.name,this.update.progress_bar=e.progress_bar,this.updateDialog=!0},updateSkill:function(e){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return this.updateLoading=!0,t.next=3,regeneratorRuntime.awrap(this.$http.put("/skill/".concat(e._id),this.update));case 3:this.$message.success("修改技能成功！"),this.updateDialog=!1,this.updateLoading=!1,this.getSkill();case 7:case"end":return t.stop()}}),null,this)},removed:function(e){var t=this;this.$confirm('是否删除技能 "'.concat(e.name,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(t.$http.delete("/skill/".concat(e._id)));case 2:t.$message({type:"success",message:"删除成功!"}),t.getSkill();case 4:case"end":return a.stop()}}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},getSkill:function(){var e;return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(this.$http("/skill"));case 2:e=t.sent,this.skillList=e.data;case 4:case"end":return t.stop()}}),null,this)}},created:function(){this.getSkill()}}),i=s,o=(a("7c4a"),a("2877")),l=Object(o["a"])(i,r,n,!1,null,null,null);t["default"]=l.exports},"7c4a":function(e,t,a){"use strict";var r=a("b344"),n=a.n(r);n.a},b0c0:function(e,t,a){var r=a("83ab"),n=a("9bf2").f,s=Function.prototype,i=s.toString,o=/^\s*function ([^ (]*)/,l="name";!r||l in s||n(s,l,{configurable:!0,get:function(){try{return i.call(this).match(o)[1]}catch(e){return""}}})},b344:function(e,t,a){}}]);
//# sourceMappingURL=chunk-3394f7d4.8565ad6d.js.map