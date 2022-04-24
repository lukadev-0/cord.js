(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[86],{2911:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/[...slug]",function(){return n(6657)}])},8417:function(e,r,n){"use strict";n.d(r,{Z:function(){return u}});var t=n(4637),a=n(1626),l=n(3556),i=n.n(l),s=n(8700);function o(e){var r=e.children,n=e.name;return(0,t.jsxs)("li",{children:[(0,t.jsx)("h5",{className:"mb-2 font-bold",children:n}),(0,t.jsx)("ul",{className:"space-y-px border-l border-gray-200 dark:border-gray-800",children:r})]})}function c(e){var r=e.href,n=e.name,l=e.root,o=(0,s.useRouter)();return(0,t.jsx)("li",{children:(0,t.jsx)(i(),{href:r,children:(0,t.jsx)("a",{className:(0,a.Z)("block text-gray-700 dark:text-gray-400",{"-ml-px border-l border-transparent pl-4 ":!l,"hover:border-gray-400 dark:hover:border-gray-600":o.asPath!==r,"border-blue-700 dark:border-blue-400":o.asPath===r}),children:n})})})}function d(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o,{name:"Guides",children:(0,t.jsx)(c,{href:"/docs/getting-started",name:"Getting Started"})}),(0,t.jsxs)(o,{name:"Concepts",children:[(0,t.jsx)(c,{href:"/docs/middleware",name:"Middleware"}),(0,t.jsx)(c,{href:"/docs/plugins",name:"Plugins"})]}),(0,t.jsxs)(o,{name:"Plugins",children:[(0,t.jsx)(c,{href:"/docs/plugin-gateway",name:"Gateway"}),(0,t.jsx)(c,{href:"/docs/plugin-interactions",name:"Interactions"})]})]})}function u(e){var r=e.children,n=e.sidebar,l=e.noPadding;return(0,t.jsxs)("div",{className:"relative min-h-screen dark:bg-gray-900",children:[(0,t.jsx)("div",{className:(0,a.Z)("fixed inset-0 mx-auto flex max-w-screen-2xl px-4",{"pt-16":!l}),children:(0,t.jsx)("aside",{className:(0,a.Z)("custom-scroll overflow-auto",{"pt-16":!l,"pt-32":l}),children:(0,t.jsx)("nav",{className:"w-56",children:(0,t.jsx)("ul",{className:"space-y-4",children:"docs"===n?(0,t.jsx)(d,{}):null})})})}),(0,t.jsx)("div",{className:(0,a.Z)("mx-auto max-w-screen-2xl px-4",{"pt-16":!l}),children:r})]})}},5399:function(e,r,n){"use strict";n.d(r,{Z:function(){return x}});var t=n(4637),a=n(9496),l=n(3556),i=n.n(l),s=n(1626),o=n(2985),c=n(5664);function d(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function u(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var t,a,l=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(t=n.next()).done)&&(l.push(t.value),!r||l.length!==r);i=!0);}catch(o){s=!0,a=o}finally{try{i||null==n.return||n.return()}finally{if(s)throw a}}return l}}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return d(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e){var r=e.className,n=e.fixed,l=u((0,o.F)(),2),d=l[0],h=l[1],x=(0,a.useState)(!1),f=x[0],m=x[1];return(0,c.Z)((function(){m(!0)}),[]),(0,t.jsx)("header",{className:(0,s.Z)("left-0 right-0 top-0 z-10 px-4",{absolute:!n,"fixed border-b border-gray-200 bg-white/20 px-4 backdrop-blur dark:border-gray-700 dark:bg-gray-900/20":n},r),children:(0,t.jsxs)("div",{className:(0,s.Z)("mx-auto flex items-center justify-between",{"h-20 max-w-screen-xl":!n,"h-16 max-w-screen-2xl":n}),children:[(0,t.jsx)(i(),{href:"/",children:(0,t.jsxs)("a",{className:"flex items-center",children:[(0,t.jsxs)("svg",{className:"mr-4 h-10 w-10 translate-y-[1px]",viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("path",{fillRule:"evenodd",d:"M15.532 73.8192C15.0053 72.257 14.431 71.6486 14.431 69.0279H85.6724C85.6724 72.023 85.0982 72.257 84.5715 73.8192C83.7353 76.3678 82.5291 78.7673 80.9531 81.0177C79.4092 83.241 77.5437 85.2744 75.3566 87.1181C73.1695 88.9618 70.7411 90.5479 68.0715 91.8765C65.4341 93.1779 62.5876 94.1946 59.532 94.9267C56.4765 95.6316 53.3083 95.9841 50.0276 95.9841C46.7469 95.9841 43.5788 95.6316 40.5232 94.9267C37.4998 94.1946 34.6533 93.1779 31.9837 91.8765C29.3463 90.5479 26.934 88.9618 24.7469 87.1181C22.5597 85.2744 20.6782 83.241 19.1021 81.0177C17.5583 78.7673 16.3682 76.3678 15.532 73.8192Z",className:"-translate-y-[2px] fill-blue-900 dark:fill-blue-200"}),(0,t.jsx)("path",{fillRule:"evenodd",d:"M0 16.7011C0 9.69526 5.78291 4.01587 12.7888 4.01587H87.3148C94.3207 4.01587 100 9.69526 100 16.7011V56.3426C100 63.3485 94.3207 69.0279 87.3148 69.0279H12.7888C5.78292 69.0279 0.103516 63.3485 0.103516 56.3426V16.7011ZM36.5737 37.3147C36.5737 43.4449 31.6042 48.4143 25.4741 48.4143C19.3439 48.4143 14.3745 43.4449 14.3745 37.3147C14.3745 31.1846 19.3439 26.2151 25.4741 26.2151C31.6042 26.2151 36.5737 31.1846 36.5737 37.3147ZM74.6295 48.4143C80.7597 48.4143 85.7291 43.4449 85.7291 37.3147C85.7291 31.1846 80.7597 26.2151 74.6295 26.2151C68.4994 26.2151 63.5299 31.1846 63.5299 37.3147C63.5299 43.4449 68.4994 48.4143 74.6295 48.4143Z",className:"fill-blue-800 dark:fill-blue-100"})]}),(0,t.jsx)("div",{className:"text:black text-lg font-semibold dark:text-white",children:"Cord.js"})]})}),(0,t.jsxs)("div",{className:"flex items-center divide-x divide-gray-200 dark:divide-gray-700",children:[(0,t.jsx)("nav",{className:"pr-4",children:(0,t.jsxs)("ul",{className:"flex items-center space-x-4 font-semibold",children:[(0,t.jsx)("li",{children:(0,t.jsx)(i(),{href:"/docs/getting-started",children:(0,t.jsx)("a",{className:"text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400",children:"Docs"})})}),(0,t.jsx)("li",{children:(0,t.jsx)(i(),{href:"/api",children:(0,t.jsx)("a",{className:"text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400",children:"API"})})})]})}),(0,t.jsx)("div",{className:"pl-4 text-gray-700 dark:text-gray-400",children:(0,t.jsxs)("ul",{className:"flex items-center space-x-4",children:[(0,t.jsx)("li",{className:"hover:text-blue-700 dark:hover:text-blue-400",children:(0,t.jsx)("button",{className:"block cursor-pointer","aria-label":"Switch Theme",onClick:function(){h("light"===d?"dark":"light")},children:f?"light"===d?(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"h-6 w-6",children:[(0,t.jsx)("path",{d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",fill:"currentColor"}),(0,t.jsx)("path",{d:"M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836",stroke:"currentColor"})]}):(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",className:"h-6 w-6",children:[(0,t.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z",fill:"currentColor"}),(0,t.jsx)("path",{d:"m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z",fill:"currentColor"}),(0,t.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z",fill:"currentColor"})]}):(0,t.jsx)("div",{className:"h-6 w-6"})})}),(0,t.jsx)("li",{className:"hover:text-blue-700 dark:hover:text-blue-400",children:(0,t.jsx)("a",{"aria-label":"github",href:"https://github.com/lukadev-0/cord.js",children:(0,t.jsx)("svg",{viewBox:"0 0 16 16",className:"h-5 w-5",fill:"currentColor","aria-hidden":"true",children:(0,t.jsx)("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})})})})]})})]})]})})}function x(e){var r=e.children,n=e.fixedHeader,a=e.headerClass;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(h,{fixed:n,className:a}),r,(0,t.jsx)("footer",{className:"relative bg-gray-900 py-16 px-4 dark:bg-black/50",children:(0,t.jsxs)("div",{className:"mx-auto max-w-screen-xl",children:[(0,t.jsx)("p",{className:"mb-2 text-gray-400",children:"Consider supporting me"}),(0,t.jsx)("a",{href:"https://buymeacoffee.com/lukadev",children:(0,t.jsx)("img",{src:"https://raw.githubusercontent.com/lukadev-0/lukadev-0/main/buy-coffee.png",className:"inline-block"})})]})})]})}},6657:function(e,r,n){"use strict";n.r(r),n.d(r,{__N_SSG:function(){return C},default:function(){return N}});var t=n(4637),a=n(3373),l=n(8700),i=(n(9496),n(8417)),s=n(5399),o=n(6405),c=n(8922),d=n(2827),u=n(3823),h=n(4218),x=n(1626),f=n(3556),m=n.n(f);function p(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function g(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function v(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){g(e,r,n[r])}))}return e}function b(e,r){if(null==e)return{};var n,t,a=function(e,r){if(null==e)return{};var n,t,a={},l=Object.keys(e);for(t=0;t<l.length;t++)n=l[t],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(t=0;t<l.length;t++)n=l[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function j(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var t,a,l=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(t=n.next()).done)&&(l.push(t.value),!r||l.length!==r);i=!0);}catch(o){s=!0,a=o}finally{try{i||null==n.return||n.return()}finally{if(s)throw a}}return l}}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return p(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return p(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var y=function(){return function(e){(0,u.Vn)(e,(function(e){if("containerDirective"===e.type)if("details"===e.name){var r=j(e.children,1)[0],n=e.data||(e.data={});e.children.shift(),n.hName="Details",n.hProperties={label:r.children[0].value}}else if("info"===e.name||"note"===e.name||"warning"===e.name||"danger"===e.name||"tip"===e.name){var t,a,l,i,s=(null===(t=e.children[0].data)||void 0===t?void 0:t.directiveLabel)?e.children[0]:null,o=e.data||(e.data={});s&&e.children.shift(),o.hName="Admonition",o.hProperties={label:null!==(i=null===(l=null===(a=s)||void 0===a?void 0:a.children[0])||void 0===l?void 0:l.value)&&void 0!==i?i:{info:"Info",note:"Note",warning:"Warning",danger:"Danger",tip:"Tip"}[e.name],type:e.name}}}))}},w={info:function(e){return(0,t.jsx)("svg",v({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2},e,{children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}))},note:function(e){return(0,t.jsx)("svg",v({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2},e,{children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}))},warning:function(e){return(0,t.jsx)("svg",v({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2},e,{children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}))},danger:function(e){return(0,t.jsx)("svg",v({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2},e,{children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"})}))},tip:function(e){return(0,t.jsx)("svg",v({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2},e,{children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"})}))}};function k(e){var r=e.children;return(0,t.jsx)(h.D,{children:r,remarkPlugins:[o.Z,c.Z,y],rehypePlugins:[d.Z],components:{Details:function(e){var r=e.label,n=e.children;return(0,t.jsxs)("details",{children:[(0,t.jsx)("summary",{className:"font-bold",children:r}),n]})},Admonition:function(e){var r=e.label,n=e.type,a=e.children,l=w[n];return(0,t.jsxs)("div",{className:(0,x.Z)("rounded-md p-6 pb-2 shadow-md shadow-black/5",{"bg-gray-100 dark:bg-gray-800":"info"===n,"bg-yellow-100 dark:bg-yellow-800":"warning"===n,"bg-red-100 dark:bg-red-800":"danger"===n,"bg-blue-100 dark:bg-blue-800":"note"===n,"bg-green-100 dark:bg-green-800":"tip"===n}),children:[(0,t.jsxs)("h5",{className:"flex items-center space-x-2 font-medium text-black dark:text-white",children:[(0,t.jsx)(l,{className:"h-6 w-6"})," ",(0,t.jsx)("span",{children:r})]}),a]})},a:function(e){var r=e.href,n=b(e,["href"]);return(0,t.jsx)(m(),{href:r,children:(0,t.jsx)("a",v({},n))})}}})}var C=!0;function N(e){var r=e.content,n=e.metadata,i=(0,l.useRouter)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.PB,{title:"".concat(n.title," - Cord.js"),description:n.description,canonical:"https://cord.js.org".concat(i.asPath),openGraph:{url:"https://cord.js.org".concat(i.asPath),title:n.title,description:n.description,site_name:"Cord.js"},twitter:{cardType:"summary_large_image"}}),(0,t.jsxs)("main",{className:"prose relative mx-auto block max-w-screen-md flex-grow py-16 prose-a:decoration-blue-500 prose-img:rounded dark:prose-invert",children:[(0,t.jsx)("h1",{children:n.title}),(0,t.jsx)("p",{className:"mb-14 text-xl text-gray-800 dark:text-gray-400",children:n.description}),(0,t.jsx)(k,{children:r})]})]})}N.getLayout=function(e){return(0,t.jsx)(s.Z,{fixedHeader:!0,children:(0,t.jsx)(i.Z,{sidebar:"docs",children:e})})}}},function(e){e.O(0,[880,692,774,888,179],(function(){return r=2911,e(e.s=r);var r}));var r=e.O();_N_E=r}]);