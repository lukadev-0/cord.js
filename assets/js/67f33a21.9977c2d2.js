"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5201],{5318:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return g}});var r=n(7378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),f=p(n),g=i,d=f["".concat(l,".").concat(g)]||f[g]||s[g]||a;return n?r.createElement(d,c(c({ref:t},u),{},{components:n})):r.createElement(d,c({ref:t},u))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,c=new Array(a);c[0]=f;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,c[1]=o;for(var p=2;p<a;p++)c[p]=n[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8334:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return u},default:function(){return f}});var r=n(5773),i=n(808),a=(n(7378),n(5318)),c=["components"],o={hide_title:!0,custom_edit_url:null,pagination_prev:null,pagination_next:null},l=void 0,p={unversionedId:"api/client.pluginfactory",id:"api/client.pluginfactory",isDocsHomePage:!1,title:"client.pluginfactory",description:"Home &gt; @cordjs/client &gt; PluginFactory",source:"@site/docs/api/client.pluginfactory.md",sourceDirName:"api",slug:"/api/client.pluginfactory",permalink:"/docs/api/client.pluginfactory",editUrl:null,tags:[],version:"current",frontMatter:{hide_title:!0,custom_edit_url:null,pagination_prev:null,pagination_next:null},sidebar:"api"},u=[{value:"PluginFactory type",id:"pluginfactory-type",children:[],level:2},{value:"Remarks",id:"remarks",children:[],level:2}],s={toc:u};function f(e){var t=e.components,n=(0,i.Z)(e,c);return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api/index"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client"},"@cordjs/client")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.pluginfactory"},"PluginFactory")),(0,a.kt)("h2",{id:"pluginfactory-type"},"PluginFactory type"),(0,a.kt)("p",null,"A function that returns a ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.plugininterface"},"PluginInterface")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Signature:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type PluginFactory = (client: Client, actions: PluginActions) => PluginInterface & {\n    instance?: PluginInstance | ((options: PluginInterface) => PluginInstance);\n};\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"References:")," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.client"},"Client"),", ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.pluginactions"},"PluginActions"),", ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.plugininterface"},"PluginInterface"),", ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.plugininstance"},"PluginInstance")),(0,a.kt)("h2",{id:"remarks"},"Remarks"),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.client"},"client")," and options are passed into the function."))}f.isMDXComponent=!0}}]);