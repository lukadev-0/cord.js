"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5406],{5318:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),f=p(n),d=a,m=f["".concat(c,".").concat(d)]||f[d]||s[d]||i;return n?r.createElement(m,l(l({ref:t},u),{},{components:n})):r.createElement(m,l({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=f;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5668:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return u},default:function(){return f}});var r=n(5773),a=n(808),i=(n(7378),n(5318)),l=["components"],o={hide_title:!0,custom_edit_url:null,pagination_prev:null,pagination_next:null},c=void 0,p={unversionedId:"api/client.plugininterface.start",id:"api/client.plugininterface.start",isDocsHomePage:!1,title:"client.plugininterface.start",description:"Home &gt; @cordjs/client &gt; PluginInterface &gt; start",source:"@site/docs/api/client.plugininterface.start.md",sourceDirName:"api",slug:"/api/client.plugininterface.start",permalink:"/docs/api/client.plugininterface.start",editUrl:null,tags:[],version:"current",frontMatter:{hide_title:!0,custom_edit_url:null,pagination_prev:null,pagination_next:null},sidebar:"api"},u=[{value:"PluginInterface.start() method",id:"plugininterfacestart-method",children:[],level:2},{value:"Remarks",id:"remarks",children:[],level:2}],s={toc:u};function f(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/api/index"},"Home")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/client"},"@cordjs/client")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/client.plugininterface"},"PluginInterface")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/client.plugininterface.start"},"start")),(0,i.kt)("h2",{id:"plugininterfacestart-method"},"PluginInterface.start() method"),(0,i.kt)("p",null,"Run whenever ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/client.client.start"},"Client.start()")," is called."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Signature:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"start?(): void | Promise<void>;\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns:")),(0,i.kt)("p",null,"void ","|"," Promise","<","void",">"),(0,i.kt)("h2",{id:"remarks"},"Remarks"),(0,i.kt)("p",null,"All plugin start functions are called at the same time whenever ",(0,i.kt)("a",{parentName:"p",href:"/docs/api/client.client.start"},"Client.start()")," is caled."),(0,i.kt)("p",null,"This is where you would do stuff such as connecting to the gateway."))}f.isMDXComponent=!0}}]);