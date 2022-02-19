"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[996],{5318:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return d}});var r=t(7378);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=r.createContext({}),c=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=c(e.components);return r.createElement(p.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),f=c(t),d=i,y=f["".concat(p,".").concat(d)]||f[d]||s[d]||a;return t?r.createElement(y,l(l({ref:n},u),{},{components:t})):r.createElement(y,l({ref:n},u))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,l=new Array(a);l[0]=f;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var c=2;c<a;c++)l[c]=t[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},2058:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return u},default:function(){return f}});var r=t(5773),i=t(808),a=(t(7378),t(5318)),l=["components"],o={hide_title:!0,custom_edit_url:null,pagination_prev:null,pagination_next:null},p=void 0,c={unversionedId:"api/client.anyplugin",id:"api/client.anyplugin",isDocsHomePage:!1,title:"client.anyplugin",description:"Home &gt; @cordjs/client &gt; AnyPlugin",source:"@site/docs/api/client.anyplugin.md",sourceDirName:"api",slug:"/api/client.anyplugin",permalink:"/docs/api/client.anyplugin",editUrl:null,tags:[],version:"current",frontMatter:{hide_title:!0,custom_edit_url:null,pagination_prev:null,pagination_next:null},sidebar:"api"},u=[{value:"AnyPlugin type",id:"anyplugin-type",children:[],level:2}],s={toc:u};function f(e){var n=e.components,t=(0,i.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api/index"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client"},"@cordjs/client")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.anyplugin"},"AnyPlugin")),(0,a.kt)("h2",{id:"anyplugin-type"},"AnyPlugin type"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.clientplugin"},"ClientPlugin")," with default type parameters"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Signature:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type AnyPlugin = ClientPlugin<Record<string, Middleware<Context>>>;\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"References:")," ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.clientplugin"},"ClientPlugin"),", ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.middleware"},"Middleware"),", ",(0,a.kt)("a",{parentName:"p",href:"/docs/api/client.context"},"Context")))}f.isMDXComponent=!0}}]);