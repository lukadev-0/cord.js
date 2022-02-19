"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1283],{5318:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=r.createContext({}),p=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,o=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),s=p(n),m=i,f=s["".concat(o,".").concat(m)]||s[m]||d[m]||l;return n?r.createElement(f,a(a({ref:t},u),{},{components:n})):r.createElement(f,a({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,a=new Array(l);a[0]=s;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var p=2;p<l;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},9201:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return o},metadata:function(){return p},toc:function(){return u},default:function(){return s}});var r=n(5773),i=n(808),l=(n(7378),n(5318)),a=["components"],c={hide_title:!0,custom_edit_url:null,pagination_prev:null,pagination_next:null},o=void 0,p={unversionedId:"api/client.clientplugin.extendclient",id:"api/client.clientplugin.extendclient",isDocsHomePage:!1,title:"client.clientplugin.extendclient",description:"Home &gt; @cordjs/client &gt; ClientPlugin &gt; extendClient",source:"@site/docs/api/client.clientplugin.extendclient.md",sourceDirName:"api",slug:"/api/client.clientplugin.extendclient",permalink:"/docs/api/client.clientplugin.extendclient",editUrl:null,tags:[],version:"current",frontMatter:{hide_title:!0,custom_edit_url:null,pagination_prev:null,pagination_next:null},sidebar:"api"},u=[{value:"ClientPlugin.extendClient() method",id:"clientpluginextendclient-method",children:[],level:2},{value:"Parameters",id:"parameters",children:[],level:2}],d={toc:u};function s(e){var t=e.components,n=(0,i.Z)(e,a);return(0,l.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/docs/api/index"},"Home")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/docs/api/client"},"@cordjs/client")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/docs/api/client.clientplugin"},"ClientPlugin")," ",">"," ",(0,l.kt)("a",{parentName:"p",href:"/docs/api/client.clientplugin.extendclient"},"extendClient")),(0,l.kt)("h2",{id:"clientpluginextendclient-method"},"ClientPlugin.extendClient() method"),(0,l.kt)("p",null,"Extends the client class, based on ",(0,l.kt)("a",{parentName:"p",href:"https://www.typescriptlang.org/docs/handbook/mixins.html"},"https://www.typescriptlang.org/docs/handbook/mixins.html"),"."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Signature:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"extendClient(base: typeof BaseClient): ExtendedClient<TMiddleware>;\n")),(0,l.kt)("h2",{id:"parameters"},"Parameters"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"base"),(0,l.kt)("td",{parentName:"tr",align:null},"typeof ",(0,l.kt)("a",{parentName:"td",href:"/docs/api/client.baseclient"},"BaseClient")),(0,l.kt)("td",{parentName:"tr",align:null},"base class")))),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Returns:")),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"/docs/api/client.extendedclient"},"ExtendedClient"),"<","TMiddleware",">"),(0,l.kt)("p",null,"Modified client which extends ",(0,l.kt)("inlineCode",{parentName:"p"},"base"),"."))}s.isMDXComponent=!0}}]);