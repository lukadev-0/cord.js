"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2189],{5318:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=r.createContext({}),s=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(d.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=s(n),u=a,h=m["".concat(d,".").concat(u)]||m[u]||c[u]||i;return n?r.createElement(h,o(o({ref:t},p),{},{components:n})):r.createElement(h,o({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7650:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return d},metadata:function(){return s},toc:function(){return p},default:function(){return m}});var r=n(5773),a=n(808),i=(n(7378),n(5318)),o=["components"],l={title:"Middleware"},d=void 0,s={unversionedId:"topics/middleware",id:"topics/middleware",isDocsHomePage:!1,title:"Middleware",description:"Middleware is a powerful feature that allows you to listen to events,",source:"@site/docs/topics/middleware.mdx",sourceDirName:"topics",slug:"/topics/middleware",permalink:"/docs/topics/middleware",editUrl:"https://github.com/lukadev-0/cord.js/edit/main/website/docs/topics/middleware.mdx",tags:[],version:"current",frontMatter:{title:"Middleware"},sidebar:"docs",previous:{title:"Getting Started",permalink:"/docs/getting-started"},next:{title:"Plugins",permalink:"/docs/topics/plugins"}},p=[{value:"Error Handling",id:"error-handling",children:[],level:2}],c={toc:p};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Middleware is a powerful feature that allows you to listen to events,\nand handle errors much more easily."),(0,i.kt)("p",null,"Middleware are added to the client, and plugins are responsible for\nrunning the middleware you define."),(0,i.kt)("p",null,"Every middleware has a ",(0,i.kt)("em",{parentName:"p"},"path"),", which is the path it will listen to.\nWhenever a plugin runs a middleware, it will do so at a specific path."),(0,i.kt)("p",null,"Paths will be seperated by dots (",(0,i.kt)("inlineCode",{parentName:"p"},"."),") in the documentation.\nBut they are represented by arrays internally."),(0,i.kt)("p",null,"In order to add a middleware you just need to access\nit on the client."),(0,i.kt)("p",null,"Lets say you want to define a middleware on path ",(0,i.kt)("inlineCode",{parentName:"p"},"gateway.messageCreate")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"const client = createClient(/* ... */)\n\nclient.gateway.messageCreate((context, next) => {\n  // do stuff\n})\n")),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The first segment of the path (e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"gateway"),") must be defined\nby a plugin."))),(0,i.kt)("p",null,"Middleware defined will also match ",(0,i.kt)("em",{parentName:"p"},"sub-middlewares"),",\nwhich means that if you add a middleware at ",(0,i.kt)("inlineCode",{parentName:"p"},"gateway")," and\na middleware at ",(0,i.kt)("inlineCode",{parentName:"p"},"gateway.messageCreate")," gets run, then\nthe ",(0,i.kt)("inlineCode",{parentName:"p"},"gateway")," middleware will be matched and will be run."),(0,i.kt)("p",null,"You might've noticed the 2 parameters passed into the function.\nThe first is the context, and the second is the next function."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"context"),"\nProvides extra information about the middleware run.\nThis is an object that is defined by the plugin that\nran the middleware."),(0,i.kt)("p",{parentName:"li"},"Every context object must have a ",(0,i.kt)("inlineCode",{parentName:"p"},"path")," property,\nthe same context object is passed to ",(0,i.kt)("em",{parentName:"p"},"each middleware that\nis being run"),". This means that you can add extra properties\nand access it on the rest of the middleware being run.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"next"),"\nMultiple middleware can be put onto the same path,\nbut only the first middleware will be run. But if ",(0,i.kt)("inlineCode",{parentName:"p"},"next()"),"\nis called, the next middleware will also be run."))),(0,i.kt)("h2",{id:"error-handling"},"Error Handling"),(0,i.kt)("p",null,"Middleware also supports error handling."),(0,i.kt)("p",null,"Error handling is very easy using middleware. Cord.js will\ncatch any errors that are thrown in the middleware, and will\nrun the next ",(0,i.kt)("strong",{parentName:"p"},"error handling middleware"),", the same can be\naccomplished by calling ",(0,i.kt)("inlineCode",{parentName:"p"},"next(error)"),". Returning a Promise\nor async/await is also supported."),(0,i.kt)("p",null,"You can create error handling middleware by simply adding\nanother parameter to the ",(0,i.kt)("em",{parentName:"p"},"middleware handler"),"."),(0,i.kt)("p",null,"This parameter (",(0,i.kt)("inlineCode",{parentName:"p"},"error"),") is the error."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"client.gateway.messageCreate((context, next) => {\n  throw new Error('This is an error!')\n})\n\nclient.gateway.messageCreate((context, next, error) => {\n  console.error(error)\n})\n")))}m.isMDXComponent=!0}}]);