"use strict";(self.webpackChunkargon_dashboard_pro_angular=self.webpackChunkargon_dashboard_pro_angular||[]).push([[592],{8707:(C,u,i)=>{i.d(u,{Z:()=>v});var o=i(6154),d=i(3708),r=i(1571);const a=(0,d.Z)().domain([100,3e3]).range(["#AAAAAA","#444444"]);let m={Russia:{color:a(300)},Canada:{color:a(120)},China:{color:a(1300)},"United States":{color:a(2920)},Brazil:{color:a(550)},Australia:{color:a(760)},India:{color:a(200)},Argentina:{color:a(240)},Romania:{color:a(600)},Algeria:{color:a(540)}},p=(()=>{class t{getCountries(){return m}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=r.Yz7({token:t,factory:t.\u0275fac}),t})();var g=i(5661),c=i(7805);const f=function(){return[0,0,0,0]};let v=(()=>{class t{constructor(e){this.worldMap=o.world,this.countries=e.getCountries(),this.customizeTooltip=this.customizeTooltip.bind(this),this.customizeLayers=this.customizeLayers.bind(this),this.click=this.click.bind(this)}customizeTooltip(e){return{text:e.attribute("name"),color:"#FFFFFF",fontColor:"#000"}}customizeLayers(e){e.forEach(n=>{let l=this.countries[n.attribute("name")];n.applySettings(l?{color:l.color,hoveredColor:l.color,selectedColor:l.color}:{color:"#e4e4e4",hoveredColor:"#e4e4e4",selectedColor:"#e4e4e4"})})}click(e){let n=e.target;n&&this.countries[n.attribute("name")]&&n.selected(!n.selected())}}return t.\u0275fac=function(e){return new(e||t)(r.Y36(p))},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-vector-map-component"]],features:[r._Bn([p])],decls:5,vars:7,consts:[["id","vector-map",3,"bounds","onClick"],[3,"enabled","customizeTooltip"],["color","#fff"],[3,"visible"],[3,"dataSource","customize"]],template:function(e,n){1&e&&(r.TgZ(0,"dx-vector-map",0),r.NdJ("onClick",function(h){return n.click(h)}),r.TgZ(1,"dxo-tooltip",1),r._UZ(2,"dxo-font",2)(3,"dxo-border",3),r.qZA(),r._UZ(4,"dxi-layer",4),r.qZA()),2&e&&(r.Q6J("bounds",r.DdM(6,f)),r.xp6(1),r.Q6J("enabled",!0)("customizeTooltip",n.customizeTooltip),r.xp6(2),r.Q6J("visible",!1),r.xp6(1),r.Q6J("dataSource",n.worldMap)("customize",n.customizeLayers))},dependencies:[g.w,c.vhZ,c.zVO,c.enW,c.v6i],styles:["#vector-map {\n    min-height: 220px;\n    width: 100%;\n    display: block;\n}\n  #vector-map > svg > rect{\n  display: none;\n}"]}),t})()},4175:(C,u,i)=>{i.d(u,{HC:()=>v,O1:()=>f});var o=i(1571),d=i(1607),r=i(6895);const a=["*"];function _(t,s){1&t&&o.GkF(0)}function y(t,s){if(1&t&&(o.TgZ(0,"bar",3),o.Hsn(1),o.qZA()),2&t){const e=o.oxw();o.Q6J("type",e.type)("value",e._value)("max",e.max)("animate",e.animate)("striped",e.striped)}}function m(t,s){if(1&t&&(o.TgZ(0,"bar",3),o._uU(1),o.qZA()),2&t){const e=s.$implicit,n=o.oxw(2);o.Q6J("type",e.type)("value",e.value)("max",e.max||n.max)("animate",n.animate)("striped",n.striped),o.xp6(1),o.Oqu(e.label)}}function p(t,s){if(1&t&&o.YNc(0,m,2,6,"bar",4),2&t){const e=o.oxw();o.Q6J("ngForOf",e._values)}}let g=(()=>{class t{constructor(e,n){this.el=e,this.renderer=n,this.max=100,this.value=0,this.animate=!1,this.striped=!1,this.type="info",this.percent=100}get isBs3(){return(0,d.XA)()}ngOnChanges(e){(e.value||e.max)&&(this.percent=Number(e.value?.currentValue||this.value)/Number(e.max?.currentValue||this.max||100)*100),e.type&&this.applyTypeClasses()}applyTypeClasses(){if(this._prevType){const n=`bg-${this._prevType}`;this.renderer.removeClass(this.el.nativeElement,`progress-bar-${this._prevType}`),this.renderer.removeClass(this.el.nativeElement,n),this._prevType=void 0}if(this.type){const n=`bg-${this.type}`;this.renderer.addClass(this.el.nativeElement,`progress-bar-${this.type}`),this.renderer.addClass(this.el.nativeElement,n),this._prevType=this.type}}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(o.SBq),o.Y36(o.Qsj))},t.\u0275cmp=o.Xpm({type:t,selectors:[["bar"]],hostAttrs:["role","progressbar","aria-valuemin","0"],hostVars:15,hostBindings:function(e,n){2&e&&(o.uIk("aria-valuenow",n.value)("aria-valuetext",n.percent?n.percent.toFixed(0)+"%":"")("aria-valuemax",n.max),o.Udp("height","100","%")("width",n.percent,"%"),o.ekj("progress-bar",!0)("progress-bar-animated",!n.isBs3&&n.animate)("progress-bar-striped",n.striped)("active",n.isBs3&&n.animate))},inputs:{max:"max",value:"value",animate:"animate",striped:"striped",type:"type"},features:[o.TTD],ngContentSelectors:a,decls:1,vars:0,template:function(e,n){1&e&&(o.F$t(),o.Hsn(0))},encapsulation:2,changeDetection:0}),t})(),c=(()=>{class t{constructor(){this.animate=!1,this.max=100}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),f=(()=>{class t{constructor(e){this.max=100,this.animate=!1,this.striped=!1,this.isStacked=!1,this._value=0,Object.assign(this,e)}set value(e){this.isStacked=Array.isArray(e),"number"==typeof e?(this._value=e,this._values=void 0):(this._value=void 0,this._values=e)}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(c))},t.\u0275cmp=o.Xpm({type:t,selectors:[["progressbar"]],hostVars:3,hostBindings:function(e,n){2&e&&(o.uIk("max",n.max),o.ekj("progress",!0))},inputs:{max:"max",animate:"animate",striped:"striped",type:"type",value:"value"},ngContentSelectors:a,decls:5,vars:3,consts:[[4,"ngIf","ngIfThen","ngIfElse"],["NotStacked",""],["Stacked",""],[3,"type","value","max","animate","striped"],[3,"type","value","max","animate","striped",4,"ngFor","ngForOf"]],template:function(e,n){if(1&e&&(o.F$t(),o.YNc(0,_,1,0,"ng-container",0),o.YNc(1,y,2,5,"ng-template",null,1,o.W1O),o.YNc(3,p,1,1,"ng-template",null,2,o.W1O)),2&e){const l=o.MAs(2),h=o.MAs(4);o.Q6J("ngIf",!n.isStacked)("ngIfThen",l)("ngIfElse",h)}},dependencies:[g,r.O5,r.sg],styles:["[_nghost-%COMP%]{width:100%;display:flex}"],changeDetection:0}),t})(),v=(()=>{class t{static forRoot(){return{ngModule:t,providers:[]}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[r.ez]]}),t})()}}]);