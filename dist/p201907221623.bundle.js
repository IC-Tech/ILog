/*!
 * 201907221623 v1.0.0
 * Copyright © Imesh Chamara 2019
 * @license ISC
 * http://ic-tech.dx.am
 */!function(e){function t(t){for(var r,c,i=t[0],l=t[1],u=t[2],d=0,m=[];d<i.length;d++)c=i[d],a[c]&&m.push(a[c][0]),a[c]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(s&&s(t);m.length;)m.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var l=n[i];0!==a[l]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={0:0},o=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window.webpackJsonp=window.webpackJsonp||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var s=l;o.push([4,1]),n()}([,,,function(e,t){function n(e,t){return r.emptyValue(t)?t:alert}var r={rootURL:function(){for(var e=document.URL,t=0,n=e.indexOf("/",t);n<e.length&&n>=0;)t=n+1,":"!=e.substr(n-1,1)&&"/"!=e.substr(n-1,1)?(e=e.substr(0,n)+"/",n=-1):n=e.indexOf("/",t);return e}(),emptyValue:function(e){return null==e?null:e},XHR:function(e,t,r){var a=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");a.open("GET",e+(e.indexOf("?")>=0?"&":"?")+"t="+(new Date).getTime()),a.onreadystatechange=function(){if(4==a.readyState&&0!=a.status)if(a.response)try{t(JSON.parse(a.response))}catch(e){n(0,r)}else n(0,r)},a.onerror=function(e){0==e.target.status?n(0,r):console.log(e)},a.send(null)},arrayReciver:function(e,t){if("number"==typeof e)return e;for(var n=0;n<t.length;n++)if(t[n]==e)return n;return-1}};t.IC_Common=r},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(2),c=n.n(o),i=(n(10),n(11),n(3));function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f=n.n(i).a.IC_Common,p=["red","pink","purple","indeigo","blue","teal","yellow","orange","green","black"],y=localStorage.getItem("IC-Tech.ILog-Data");y=null!=y&&null!=y?JSON.parse(y):[];var g=function(e,t,n,r,a){if(isNaN(e))for(e=0;null!=document.getElementById("IC-Dialog-".concat(e))&&e<1e3;e++);var o=document.createElement("div"),c=document.createElement("span");return c.classList.add("c1"),c.innerText=t,o.appendChild(c),(c=document.createElement("span")).innerText=n,o.appendChild(c),c=document.createElement("div"),Array.from(r).forEach(function(t,n){var r=document.createElement("button");r.innerText=t,r.classList.add("ic-btn0"),0==n&&r.classList.add("c1"),r.addEventListener("click",function(){return a(e,n)}),c.appendChild(r)}),o.appendChild(c),(c=document.createElement("div")).id="IC-Dialog-".concat(e),c.classList.add("dialog"),c.addEventListener("click",function(t){t.target.id=="IC-Dialog-".concat(e)&&a(e,"cancel")}),c.appendChild(o),document.querySelector(".ICApp").appendChild(c),e},v=function(e,t){1==t?document.querySelector("#IC-Dialog-"+e).classList.add("show"):document.querySelector("#IC-Dialog-"+e).classList.remove("show")},h=function(e){return document.querySelector("#IC-Dialog-"+e).remove()},b=function(){var e=Date.now(),t=new Date(e);t.setMonth(t.getMonth()+1);var n=t.getFullYear().toString()+(t.getMonth()<10?"0":"")+t.getMonth().toString()+(t.getDate()<10?"0":"")+t.getDate().toString(),r=n+(t.getHours()<10?"0":"")+t.getHours().toString()+(t.getMinutes()<10?"0":"")+t.getMinutes().toString();return{v0:n,v1:r,v2:r+(t.getSeconds()<10?"0":"")+t.getSeconds().toString()+(t.getMilliseconds()>=100?"":t.getMilliseconds()>=10?"0":"00")+t.getMilliseconds().toString(),v3:new Date(e).toString()}},E={set ColorTheme(e){var t,n=document.querySelector("#root");(t=n.classList).remove.apply(t,p);var r=f.arrayReciver(e,p);-1==r&&(r=0),n.classList.add(p[r]);var a=getComputedStyle(document.querySelector("#root")).getPropertyValue("--ic-c-i4").replace(" ","").replace(" ","").replace(" ",""),o=0,c="",i="#";(c=parseInt(a.substring(0,o=a.indexOf(","))).toString(16)).length<1&&(c="0"+c),i="#"+c,a=a.substring(o+1,a.length),(c=parseInt(a.substring(0,o=a.indexOf(","))).toString(16)).length<1&&(c="0"+c),i+=c,a=a.substring(o+1,a.length),(c=parseInt(a).toString(16)).length<1&&(c="0"+c),i+=c,document.querySelector("[name=theme-color]").setAttribute("content",i),document.querySelector("[name=msapplication-navbutton-color]").setAttribute("content",i),document.querySelector("[name=apple-mobile-web-app-status-bar-style]").setAttribute("content",i)}},S=function(e){function t(e){var n,r,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,(n=!(a=s(t).call(this,e))||"object"!==l(a)&&"function"!=typeof a?d(r):a).state={UI:0,latestUpdate:0},n.SetMent=n.SetMent.bind(d(n)),n.EditCall=n.EditCall.bind(d(n)),n.EditActon=n.EditActon.bind(d(n)),n.Export=n.Export.bind(d(n)),n.Import=n.Import.bind(d(n)),n.backAction=null,n.i=-1,n}var n,o,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,r["Component"]),n=t,(o=[{key:"componentDidMount",value:function(){var e=this,t=function(){if(null!=e.backAction)return e.backAction(),!1};document.addEventListener("backbutton",t),document.addEventListener("keydown",function(e){"Escape"==e.key&&t()}),document.querySelector(".menu").addEventListener("click",function(t){t.target.classList.contains("menu")&&e.SetMent()})}},{key:"SetMent",value:function(e){var t=this;document.querySelector("html").style.overflow=e?"hidden":"unset",document.querySelector("body").style.overflow=e?"hidden":"unset",document.querySelector("body").style.height=e?"100%":"auto",document.querySelector("html").style.height=e?"100%":"auto",document.querySelector(".menu").style.display=e?"block":"none",this.backAction=e?function(){return t.SetMent()}:null}},{key:"EditCall",value:function(e,t){e=-1==e?-1:y.length-1-e;var n=function(e){return 1==e.toString().length?"0"+e:e.toString()},r=function(e){return"".concat(e.getFullYear(),"-").concat(n(e.getMonth()+1),"-").concat(n(e.getDate()))},a=function(e){return"".concat(n(e.getHours()),":").concat(n(e.getMinutes()))};document.querySelector("#i1").value=-1==e?b().v1:y[e].name,document.querySelector("#i2").value=r(new Date(-1==e?Date.now():y[e].timeC)),document.querySelector("#i3").value=a(new Date(-1==e?Date.now():y[e].timeC)),document.querySelector("#i4").value=r(new Date(-1==e?Date.now():y[e].timeM)),document.querySelector("#i5").value=a(new Date(-1==e?Date.now():y[e].timeM)),document.querySelector("#i6").value=-1==e?"":y[e].content,document.querySelector("#i7").style.display=-1==e?"none":"inline-block",this.setState({UI:1}),this.SetMent(),this.i=e}},{key:"EditActon",value:function(e){var t=this;if(1==e){if(""==(e={name:document.querySelector("#i1").value,timeC:Date.parse(document.querySelector("#i2").value+" "+document.querySelector("#i3").value),timeM:Date.now(),content:document.querySelector("#i6").value}).name)return void v(g(NaN,"Save Entry","Please add a name for this entry.",["OK"],function(e,t){return h(e)}),!0);y[-1==this.i?y.length:this.i]=e,localStorage.setItem("IC-Tech.ILog-Data",JSON.stringify(y))}else if(2==e)return void v(g(NaN,"Delete Entry","Are you sure you want to delete this entry. Remember by any chance this action can not be undone.",["CANCEL","OK"],function(e,n){1==n&&(y.splice(t.i,1),localStorage.setItem("IC-Tech.ILog-Data",JSON.stringify(y))),t.setState({UI:0}),h(e)}),!0);this.setState({UI:0})}},{key:"Export",value:function(){var e=document.createElement("a");e.href=URL.createObjectURL(new Blob([JSON.stringify({ILog:{Data:y}})],{type:"application/json"})),e.download="IC-Tech.ILog."+b().v1+".json",e.style.display="none",document.body.appendChild(e),e.click()}},{key:"Import",value:function(e){var t=this,n=e.target.files[0];if(n){var r=new FileReader;r.onload=function(e){try{var n=JSON.parse(e.target.result);if(!n||!n.ILog||!n.ILog.Data)return;y=n.ILog.Data,localStorage.setItem("IC-Tech.ILog-Data",JSON.stringify(y))}catch(e){v(g(NaN,"Error","The file could not be read.",["OK"],function(e,t){return h(e)}),!0),console.error(e)}t.setState({latestUpdate:Date.now()}),t.SetMent()},r.onerror=function(e){"NotReadableError"==evt.target.error.name?v(g(NaN,"Error","The file could not be read.",["OK"],function(e,t){return h(e)}),!0):console.error(e)},r.readAsText(n)}}},{key:"SettingsAction",value:function(e,t){if(1==e||0==e)this.setState({UI:0==e?0:2}),this.SetMent();else if(2==e){var n=p[parseInt(t.target.dataset.a)];localStorage.setItem("IC-Tech.ILog-Theme",n),E.ColorTheme=n}}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{id:"ILog",className:"ICApp"},a.a.createElement("div",{className:"top-c1"}),a.a.createElement("div",{className:"top"},a.a.createElement("div",{className:"c2",onClick:function(){return e.SetMent(!0)}},a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null)),a.a.createElement("div",{className:"c1"},a.a.createElement("span",null,"ILog"))),a.a.createElement("div",{className:"Entry",style:{display:0==this.state.UI?"flex":"none"}},y.slice().reverse().map(function(t,n){return a.a.createElement("div",{key:"k0"+n+t.timeC,onClick:function(t){return e.EditCall(n,t)}},a.a.createElement("span",{className:"c1"},t.name),a.a.createElement("span",{className:"c2"},t.content),a.a.createElement("span",{className:"c3"},new Date(t.timeM).toString()))})),a.a.createElement("div",{className:"Editor",style:{display:1==this.state.UI?"flex":"none"}},a.a.createElement("div",{className:"c2"},a.a.createElement("label",null,"Name:",a.a.createElement("input",{id:"i1",type:"text"}))),a.a.createElement("div",{className:"c1"},a.a.createElement("label",null,"Create Date:",a.a.createElement("input",{id:"i2",type:"date"}))),a.a.createElement("div",{className:"c1"},a.a.createElement("label",null,"Create Time:",a.a.createElement("input",{id:"i3",type:"time"}))),a.a.createElement("div",{className:"c1"},a.a.createElement("label",null,"Last Update Date:",a.a.createElement("input",{id:"i4",type:"date"}))),a.a.createElement("div",{className:"c1"},a.a.createElement("label",null,"Last Update Time:",a.a.createElement("input",{id:"i5",type:"time"}))),a.a.createElement("textarea",{id:"i6"}),a.a.createElement("div",null,a.a.createElement("button",{className:"ic-btn0",onClick:function(){return e.EditActon(0)}},"CANCEL"),a.a.createElement("button",{className:"ic-btn0",onClick:function(){return e.EditActon(2)},id:"i7"},"DELETE"),a.a.createElement("button",{className:"ic-btn0 c1",onClick:function(){return e.EditActon(1)}},"SAVE"))),a.a.createElement("div",{className:"Settings",style:{display:2==this.state.UI?"flex":"none"}},a.a.createElement("span",null,"Theme"),a.a.createElement("div",{className:"c1"},function(){for(var t=[],n=0;n<10;n++)t[n]=a.a.createElement("div",{key:"k1"+n,"data-a":n,className:"c"+n,onClick:function(t){return e.SettingsAction(2,t)}});return t}()),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){return e.SettingsAction(0)},className:"ic-btn0 c1"},"CLOSE"))),a.a.createElement("div",{className:"menu"},a.a.createElement("div",{className:"c1"},a.a.createElement("div",null,a.a.createElement("button",{onClick:function(t){return e.EditCall(-1,t)}},"Create New"),a.a.createElement("input",{type:"file",id:"i8",onChange:this.Import}),a.a.createElement("label",{htmlFor:"i8"},"Import"),a.a.createElement("button",{onClick:function(t){return e.Export()}},"Export"),a.a.createElement("a",{href:"http://ic-tech.dx.am/html/About.html"},"Contact"),a.a.createElement("button",{onClick:function(t){return e.SettingsAction(1)}},"Settings"),a.a.createElement("button",{onClick:window.close},"Exit")))))}}])&&u(n.prototype,o),c&&u(n,c),t}(),C=localStorage.getItem("IC-Tech.ILog-Theme");E.ColorTheme=null==C?"red":C,console.info("\n██╗ ██████╗      ████████╗███████╗ ██████╗██╗  ██╗\n██║██╔════╝      ╚══██╔══╝██╔════╝██╔════╝██║  ██║\n██║██║     █████╗   ██║   █████╗  ██║     ███████║\n██║██║     ╚════╝   ██║   ██╔══╝  ██║     ██╔══██║\n██║╚██████╗         ██║   ███████╗╚██████╗██║  ██║\n╚═╝ ╚═════╝         ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\n        IC-Tech; Imesh Chamara (C) 2019;          \n"),setTimeout(function(){return c.a.render(a.a.createElement(S,null),document.getElementById("root"))},1e3)},,,,,,function(e,t,n){},function(e,t,n){}]);