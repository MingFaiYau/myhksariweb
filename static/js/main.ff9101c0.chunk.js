(this["webpackJsonphk-sari"]=this["webpackJsonphk-sari"]||[]).push([[0],{41:function(e,t,a){e.exports=a(52)},52:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"valueTo3Dig",(function(){return D}));var i=a(17),r=a(0),l=a.n(r),o=a(32),c=a.n(o),s=a(65),d=a(68),m=a(34),u="transparent",g="#000",f="#ABCABC",h="#E3E3E3",p="#FFD205",x="#E3E3E3",v="#E3E3E3",E="#FF734A",b="#0288B3",_="#3F7C06",C="#581845",w=50,N=50,D=function(e){return e>99?e.toString():e>10?"0"+e.toString():e>0?"00"+e.toString():"0"},S=function(e){var t=e.loading,a=y();return t?l.a.createElement("div",{className:a.container},l.a.createElement(d.a,{className:a.progress})):null},y=Object(m.a)({container:{top:0,left:0,position:"fixed",display:"flex",flexDirection:"column",flex:1,width:"100%",height:"100%",alignItems:"center",alignContent:"center",justifyContent:"center"},progress:{height:100,width:100,color:f}}),I=a(69),j=Object(m.a)((function(e){return{container:{display:"flex",flexDirection:"column",justifyContent:"center",justifyItems:"center",alignItems:"center"},circle:{display:"flex",background:v,justifyContent:"center",justifyItems:"center",alignItems:"center"},txtValue:{fontSize:"30px",fontWeight:"bold"},txtTitle:{marginTop:10,textAlign:"center",fontSize:16,fontWeight:"bold"}}})),k=Object(I.a)()(l.a.memo((function(e){var t=e.width,a=e.margin,i=void 0===a?"0":a,r=e.value,o=e.title,c=e.titleColor,d=j(),m="100px",u={height:m="xs"===t?"calc( ( 100vw - 60px ) / 3 )":"".concat(160,"px"),width:m,borderRadius:m};return l.a.createElement("div",{className:d.container,style:{margin:i}},l.a.createElement("div",{className:d.circle,style:u},l.a.createElement("div",{className:d.txtValue,style:{color:c,fontSize:0===r?"60px":"30px"}},n.valueTo3Dig(r))),l.a.createElement("div",{className:d.txtTitle,style:{color:c}},l.a.createElement(s.a,{id:o})))}))),z=function(e){var t=e.onChangeLanguage,a=T(),n=l.a.useCallback((function(){var e=localStorage.getItem("language");t("zh"===e?"en":"zh")}),[t]),i="zh"===localStorage.getItem("language")?"ENG":"\u4e2d\u6587",r=l.a.createElement("div",{className:a.languageView,onClick:n},i);return l.a.createElement("div",{className:a.container},l.a.createElement("div",{className:a.header}),l.a.createElement("div",{className:a.banner},l.a.createElement("div",{className:a.bannerTriangle}),l.a.createElement("div",{className:a.bannerbody},l.a.createElement("span",{className:a.txtBanner},l.a.createElement(s.a,{id:"app_name"})))),r)},T=Object(m.a)({container:{position:"relative",height:w/2+N},header:{height:w,backgroundColor:h,display:"flex",alignItems:"center"},languageView:{position:"absolute",right:10,top:0,height:"".concat(w/2,"px"),lineHeight:"".concat(w/2,"px")},banner:{position:"absolute",height:N,width:"80%",top:w/2,right:0,backgroundColor:u},bannerTriangle:{position:"absolute",width:0,height:0,borderTop:"".concat(N/2,"px solid ").concat(u),borderRight:"".concat(N/3,"px solid ").concat(p),borderBottom:"".concat(N/2,"px solid ").concat(u)},bannerbody:{display:"flex",height:N,marginLeft:N/3,alignItems:"center",backgroundColor:p},txtBanner:{marginLeft:10,fontSize:14,fontWeight:"bold",color:g}}),V=a(35),L=a.n(V),O=a(28),A=a.n(O),H=a(36),W=function(){var e=Object(H.a)(A.a.mark((function e(){var t,a;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"LatestReport_LIM_View",t="https://services8.arcgis.com/PXQv9PaDJHzt8rp0/arcgis/rest/services/".concat("LatestReport_LIM_View","/FeatureServer/0/query?f=json&where=1%3D1&outFields=*"),e.prev=2,e.next=5,fetch(t,{method:"Get",headers:{}});case 5:if(200!==(a=e.sent).status){e.next=10;break}return e.abrupt("return",a.json());case 10:return e.abrupt("return",null);case 11:e.next=17;break;case 13:return e.prev=13,e.t0=e.catch(2),console.log("response ex",e.t0),e.abrupt("return",null);case 17:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(){return e.apply(this,arguments)}}(),B=function(e){var t=e.onChangeLanguage,a=l.a.useState(!0),r=Object(i.a)(a,2),o=r[0],c=r[1],d=l.a.useState(null),m=Object(i.a)(d,2),u=m[0],g=m[1],f=F();l.a.useEffect((function(){W().then((function(e){if((null===e||void 0===e?void 0:e.features)&&e.features.length>0){var t=e.features[0].attributes;g(t)}else g(null);c(!1)}))}),[]);var h=u?l.a.createElement("div",null,l.a.createElement(z,{onChangeLanguage:t}),l.a.createElement("div",{className:f.dateView},l.a.createElement("span",{className:f.txtDate},l.a.createElement(s.a,{id:"date_statu_as",values:{date:L()(u.As_of_date).format("YYYY-MM-DD HH:mm")}}))),l.a.createElement("div",{className:f.firstDataView},l.a.createElement("div",{className:f.txtConfirmed},n.valueTo3Dig(u.Number_of_confirmed_cases)),l.a.createElement("div",{className:f.txtConfirmedTitle},l.a.createElement(s.a,{id:"title_confirmed_cases"}))),l.a.createElement("div",{className:f.secondDataView},l.a.createElement(k,{value:u.Number_of_confirmed_cases-u.Discharged-u.Death,title:"title_hospitalised",titleColor:b}),l.a.createElement(k,{margin:"0 20px",value:u.Discharged,title:"title_discharged",titleColor:_}),l.a.createElement(k,{value:u.Death,title:"title_death",titleColor:C})),l.a.createElement("div",{className:f.lastDataView},l.a.createElement("div",{className:f.txtInvesting},n.valueTo3Dig(u.Number_of_cases_still_hospitali)),l.a.createElement("div",{className:f.txtInvestingTitle},l.a.createElement(s.a,{id:"title_investigation"}))),l.a.createElement("div",{className:f.txtRef},l.a.createElement(s.a,{id:"ref"}))):null;return l.a.createElement("div",null,h,l.a.createElement(S,{loading:o}))},F=Object(m.a)({dateView:{display:"flex",margin:"5px 10px 5px 0px",justifyContent:"flex-end"},txtDate:{fontSize:14,fontWeight:"bold"},firstDataView:{margin:20,display:"flex",flexDirection:"column"},txtConfirmed:{fontSize:100,lineHeight:"90px",fontWeight:"bold",textAlign:"center",color:E},txtConfirmedTitle:{fontSize:18,fontWeight:"bold",textAlign:"center",color:E},secondDataView:{display:"flex",flexDirection:"row",justifyContent:"center",margin:"25px 10px 30px 10px"},lastDataView:{display:"flex",flexDirection:"column",backgroundColor:x,padding:"30px 10px 20px 10px"},txtInvesting:{fontSize:50,fontWeight:"bold",textAlign:"center",color:g},txtInvestingTitle:{fontSize:18,fontWeight:"bold",textAlign:"center",color:g},txtRef:{marginTop:5,marginLeft:10,fontSize:12,color:g}}),G=a(66),R=l.a.memo((function(e){var t=e.setLocale,a=l.a.useCallback((function(e){t(e),localStorage.setItem("language",e)}),[t]);return l.a.createElement("div",null,l.a.createElement(G.a,null),l.a.createElement(B,{onChangeLanguage:a}))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var M=a(67),P={app_name:"2019nCoV - HONG KONG CASES",date_statu_as:"Status as of {date}",title_confirmed_cases:"confirmed cases",title_hospitalised:"hospitalised",title_discharged:"discharged",title_death:"death",title_investigation:"Cases being hospitalised for investigation",ref:"Figures are extracted from The Centre for Health Protection (CHP) of the Department of Health (DH), HKSAR Government."},Y={app_name:"2019nCoV - HONG KONG CASES",date_statu_as:"\u6700\u5f8c\u66f4\u65b0\u6642\u9593 : {date}",title_confirmed_cases:"\u78ba\u8a3a\u500b\u6848",title_hospitalised:"\u4f4f\u9662\u4e2d",title_discharged:"\u6cbb\u6108",title_death:"\u6b7b\u4ea1",title_investigation:"\u61f7\u7591\u500b\u6848\uff08\u4f4f\u9662\u89c0\u5bdf\u4e2d\uff09",ref:"\u6578\u64da\u4f86\u81ea\u9999\u6e2f\u653f\u5e9c\u885e\u751f\u7f72\u885e\u751f\u9632\u8b77\u4e2d\u5fc3"};c.a.render(l.a.createElement((function(){var e=l.a.useState(function(){var e=localStorage.getItem("language");return e||(localStorage.setItem("language","zh"),"zh")}()),t=Object(i.a)(e,2),a=t[0],n=t[1],r=a.includes("zh")?Y:P;return l.a.createElement(M.a,{locale:a,key:a,defaultLocale:"zh",messages:r},l.a.createElement(R,{setLocale:n}))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[41,1,2]]]);