"use strict";(self.webpackChunkargon_dashboard_pro_angular=self.webpackChunkargon_dashboard_pro_angular||[]).push([[23],{3023:(U,d,r)=>{r.r(d),r.d(d,{MapsModule:()=>w});var v=r(6895),g=r(5642),h=r(1681),e=r(1571);let f=(()=>{class t{constructor(){}ngOnInit(){var o=document.getElementById("map-custom"),a=o.getAttribute("data-lat"),n=o.getAttribute("data-lng"),c=new google.maps.LatLng(a,n),x={zoom:12,scrollwheel:!1,center:c,mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#5e72e4"},{visibility:"on"}]}]};o=new google.maps.Map(o,x);var u=new google.maps.Marker({position:c,map:o,animation:google.maps.Animation.DROP,title:"Hello World!"}),M=new google.maps.InfoWindow({content:'<div class="info-window-content"><h2>Argon Dashboard</h2><p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>'});google.maps.event.addListener(u,"click",function(){M.open(o,u)})}}return t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-google"]],decls:31,vars:0,consts:[[1,"header","bg-danger","pb-6"],[1,"container-fluid"],[1,"header-body"],[1,"row","align-items-center","py-4"],[1,"col-lg-6","col-7"],[1,"h2","text-white","d-inline-block","mb-0"],["aria-label","breadcrumb",1,"d-none","d-md-inline-block","ml-md-4"],[1,"breadcrumb","breadcrumb-links","breadcrumb-dark"],[1,"breadcrumb-item"],["href","javascript:void(0)"],[1,"fas","fa-home"],["aria-current","page",1,"breadcrumb-item","active"],[1,"col-lg-6","col-5","text-right"],["href","javascript:void(0)",1,"btn","btn-sm","btn-neutral"],[1,"container-fluid","mt--6"],[1,"row"],[1,"col"],[1,"card","border-0"],["data-lat","40.748817","data-lng","-73.985428","id","map-custom",1,"map-canvas",2,"height","600px"],["data-lat","40.748817","data-lng","-73.985428","id","map-default",1,"map-canvas",2,"height","600px"]],template:function(o,a){1&o&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h6",5),e._uU(6,"Google maps"),e.qZA(),e.TgZ(7,"nav",6)(8,"ol",7)(9,"li",8)(10,"a",9),e._UZ(11,"i",10),e.qZA()(),e.TgZ(12,"li",8)(13,"a",9),e._uU(14," Maps "),e.qZA()(),e.TgZ(15,"li",11),e._uU(16," Google maps "),e.qZA()()()(),e.TgZ(17,"div",12)(18,"a",13),e._uU(19," New "),e.qZA(),e.TgZ(20,"a",13),e._uU(21," Filters "),e.qZA()()()()()(),e.TgZ(22,"div",14)(23,"div",15)(24,"div",16)(25,"div",17),e._UZ(26,"div",18),e.qZA()()(),e.TgZ(27,"div",15)(28,"div",16)(29,"div",17),e._UZ(30,"div",19),e.qZA()()()())},encapsulation:2}),t})();var b=r(6154);const i=(0,r(3708).Z)().domain([100,3e3]).range(["#AAAAAA","#444444"]);let T={Russia:{color:i(300)},Canada:{color:i(120)},China:{color:i(1300)},"United States":{color:i(2920)},Brazil:{color:i(550)},Australia:{color:i(760)},India:{color:i(200)},Argentina:{color:i(240)},Romania:{color:i(600)},Algeria:{color:i(540)}},p=(()=>{class t{getCountries(){return T}}return t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),t})();var m=r(5661),s=r(7805);const Z=function(){return[0,0,0,0]},A=[{path:"",children:[{path:"google",component:f}]},{path:"",children:[{path:"vector",component:(()=>{class t{constructor(o){this.worldMap=b.world,this.countries=o.getCountries(),this.customizeTooltip=this.customizeTooltip.bind(this),this.customizeLayers=this.customizeLayers.bind(this),this.click=this.click.bind(this)}customizeTooltip(o){return{text:o.attribute("name"),color:"#FFFFFF",fontColor:"#000"}}customizeLayers(o){o.forEach(a=>{let n=this.countries[a.attribute("name")];a.applySettings(n?{color:n.color,hoveredColor:n.color,selectedColor:n.color}:{color:"#e4e4e4",hoveredColor:"#e4e4e4",selectedColor:"#e4e4e4"})})}click(o){let a=o.target;a&&this.countries[a.attribute("name")]&&a.selected(!a.selected())}ngOnInit(){}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(p))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-vector"]],features:[e._Bn([p])],decls:34,vars:9,consts:[[1,"header","bg-danger","pb-6"],[1,"container-fluid"],[1,"header-body"],[1,"row","align-items-center","py-4"],[1,"col-lg-6","col-7"],[1,"h2","text-white","d-inline-block","mb-0"],["aria-label","breadcrumb",1,"d-none","d-md-inline-block","ml-md-4"],[1,"breadcrumb","breadcrumb-links","breadcrumb-dark"],[1,"breadcrumb-item"],["href","javascript:void(0)"],[1,"fas","fa-home"],["aria-current","page",1,"breadcrumb-item","active"],[1,"col-lg-6","col-5","text-right"],["href","javascript:void(0)",1,"btn","btn-sm","btn-neutral"],[1,"container-fluid","mt--6"],[1,"row"],[1,"col"],[1,"card"],[1,"card-body","pt-0"],[1,"vector-map"],["id","vector-map",3,"bounds","onClick"],[3,"height","width"],[3,"enabled","customizeTooltip"],["color","#fff"],[3,"visible"],[3,"dataSource","customize"]],template:function(o,a){1&o&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h6",5),e._uU(6,"Vector maps"),e.qZA(),e.TgZ(7,"nav",6)(8,"ol",7)(9,"li",8)(10,"a",9),e._UZ(11,"i",10),e.qZA()(),e.TgZ(12,"li",8)(13,"a",9),e._uU(14," Maps "),e.qZA()(),e.TgZ(15,"li",11),e._uU(16," Vector maps "),e.qZA()()()(),e.TgZ(17,"div",12)(18,"a",13),e._uU(19," New "),e.qZA(),e.TgZ(20,"a",13),e._uU(21," Filters "),e.qZA()()()()()(),e.TgZ(22,"div",14)(23,"div",15)(24,"div",16)(25,"div",17)(26,"div",18)(27,"div",19)(28,"dx-vector-map",20),e.NdJ("onClick",function(c){return a.click(c)}),e._UZ(29,"dxo-size",21),e.TgZ(30,"dxo-tooltip",22),e._UZ(31,"dxo-font",23)(32,"dxo-border",24),e.qZA(),e._UZ(33,"dxi-layer",25),e.qZA()()()()()()()),2&o&&(e.xp6(28),e.Q6J("bounds",e.DdM(8,Z)),e.xp6(1),e.Q6J("height",600)("width",950),e.xp6(1),e.Q6J("enabled",!0)("customizeTooltip",a.customizeTooltip),e.xp6(2),e.Q6J("visible",!1),e.xp6(1),e.Q6J("dataSource",a.worldMap)("customize",a.customizeLayers))},dependencies:[m.w,s.vhZ,s.zVO,s.enW,s.kD0,s.v6i],styles:["#vector-map{min-height:220px;width:100%;display:block}  #vector-map>svg>rect{display:none}"]}),t})()}]}];var C=r(5533);let w=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[v.ez,h.Bz.forChild(A),g.K,m.R,C.w]}),t})()}}]);