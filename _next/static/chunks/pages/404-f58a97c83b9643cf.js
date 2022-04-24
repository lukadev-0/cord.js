(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[197],{1626:function(e,r,t){"use strict";function n(e){var r,t,a="";if("string"===typeof e||"number"===typeof e)a+=e;else if("object"===typeof e)if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(t=n(e[r]))&&(a&&(a+=" "),a+=t);else for(r in e)e[r]&&(a&&(a+=" "),a+=r);return a}function a(){for(var e,r,t=0,a="";t<arguments.length;)(e=arguments[t++])&&(r=n(e))&&(a&&(a+=" "),a+=r);return a}t.d(r,{Z:function(){return a}})},1017:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return t(9830)}])},8417:function(e,r,t){"use strict";t.d(r,{Z:function(){return d}});var n=t(4637),a=t(1626),l=t(3556),o=t.n(l),s=t(8700);function i(e){var r=e.children,t=e.name;return(0,n.jsxs)("li",{children:[(0,n.jsx)("h5",{className:"mb-2 font-bold",children:t}),(0,n.jsx)("ul",{className:"space-y-px border-l border-gray-200 dark:border-gray-800",children:r})]})}function c(e){var r=e.href,t=e.name,l=e.root,i=(0,s.useRouter)();return(0,n.jsx)("li",{children:(0,n.jsx)(o(),{href:r,children:(0,n.jsx)("a",{className:(0,a.Z)("block text-gray-700 dark:text-gray-400",{"-ml-px border-l border-transparent pl-4 ":!l,"hover:border-gray-400 dark:hover:border-gray-600":i.asPath!==r,"border-blue-700 dark:border-blue-400":i.asPath===r}),children:t})})})}function u(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i,{name:"Guides",children:(0,n.jsx)(c,{href:"/docs/getting-started",name:"Getting Started"})}),(0,n.jsxs)(i,{name:"Concepts",children:[(0,n.jsx)(c,{href:"/docs/middleware",name:"Middleware"}),(0,n.jsx)(c,{href:"/docs/plugins",name:"Plugins"})]}),(0,n.jsxs)(i,{name:"Plugins",children:[(0,n.jsx)(c,{href:"/docs/plugin-gateway",name:"Gateway"}),(0,n.jsx)(c,{href:"/docs/plugin-interactions",name:"Interactions"})]})]})}function d(e){var r=e.children,t=e.sidebar,l=e.noPadding;return(0,n.jsxs)("div",{className:"relative min-h-screen dark:bg-gray-900",children:[(0,n.jsx)("div",{className:(0,a.Z)("fixed inset-0 mx-auto flex max-w-screen-2xl px-4",{"pt-16":!l}),children:(0,n.jsx)("aside",{className:(0,a.Z)("custom-scroll overflow-auto",{"pt-16":!l,"pt-32":l}),children:(0,n.jsx)("nav",{className:"w-56",children:(0,n.jsx)("ul",{className:"space-y-4",children:"docs"===t?(0,n.jsx)(u,{}):null})})})}),(0,n.jsx)("div",{className:(0,a.Z)("mx-auto max-w-screen-2xl px-4",{"pt-16":!l}),children:r})]})}},5399:function(e,r,t){"use strict";t.d(r,{Z:function(){return h}});var n=t(4637),a=t(9496),l=t(3556),o=t.n(l),s=t(1626),i=t(2985),c=t(5664);function u(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function d(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,l=[],o=!0,s=!1;try{for(t=t.call(e);!(o=(n=t.next()).done)&&(l.push(n.value),!r||l.length!==r);o=!0);}catch(i){s=!0,a=i}finally{try{o||null==t.return||t.return()}finally{if(s)throw a}}return l}}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return u(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e){var r=e.className,t=e.fixed,l=d((0,i.F)(),2),u=l[0],f=l[1],h=(0,a.useState)(!1),x=h[0],m=h[1];return(0,c.Z)((function(){m(!0)}),[]),(0,n.jsx)("header",{className:(0,s.Z)("left-0 right-0 top-0 z-10 px-4",{absolute:!t,"fixed border-b border-gray-200 bg-white/20 px-4 backdrop-blur dark:border-gray-700 dark:bg-gray-900/20":t},r),children:(0,n.jsxs)("div",{className:(0,s.Z)("mx-auto flex items-center justify-between",{"h-20 max-w-screen-xl":!t,"h-16 max-w-screen-2xl":t}),children:[(0,n.jsx)(o(),{href:"/",children:(0,n.jsxs)("a",{className:"flex items-center",children:[(0,n.jsxs)("svg",{className:"mr-4 h-10 w-10 translate-y-[1px]",viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,n.jsx)("path",{fillRule:"evenodd",d:"M15.532 73.8192C15.0053 72.257 14.431 71.6486 14.431 69.0279H85.6724C85.6724 72.023 85.0982 72.257 84.5715 73.8192C83.7353 76.3678 82.5291 78.7673 80.9531 81.0177C79.4092 83.241 77.5437 85.2744 75.3566 87.1181C73.1695 88.9618 70.7411 90.5479 68.0715 91.8765C65.4341 93.1779 62.5876 94.1946 59.532 94.9267C56.4765 95.6316 53.3083 95.9841 50.0276 95.9841C46.7469 95.9841 43.5788 95.6316 40.5232 94.9267C37.4998 94.1946 34.6533 93.1779 31.9837 91.8765C29.3463 90.5479 26.934 88.9618 24.7469 87.1181C22.5597 85.2744 20.6782 83.241 19.1021 81.0177C17.5583 78.7673 16.3682 76.3678 15.532 73.8192Z",className:"-translate-y-[2px] fill-blue-900 dark:fill-blue-200"}),(0,n.jsx)("path",{fillRule:"evenodd",d:"M0 16.7011C0 9.69526 5.78291 4.01587 12.7888 4.01587H87.3148C94.3207 4.01587 100 9.69526 100 16.7011V56.3426C100 63.3485 94.3207 69.0279 87.3148 69.0279H12.7888C5.78292 69.0279 0.103516 63.3485 0.103516 56.3426V16.7011ZM36.5737 37.3147C36.5737 43.4449 31.6042 48.4143 25.4741 48.4143C19.3439 48.4143 14.3745 43.4449 14.3745 37.3147C14.3745 31.1846 19.3439 26.2151 25.4741 26.2151C31.6042 26.2151 36.5737 31.1846 36.5737 37.3147ZM74.6295 48.4143C80.7597 48.4143 85.7291 43.4449 85.7291 37.3147C85.7291 31.1846 80.7597 26.2151 74.6295 26.2151C68.4994 26.2151 63.5299 31.1846 63.5299 37.3147C63.5299 43.4449 68.4994 48.4143 74.6295 48.4143Z",className:"fill-blue-800 dark:fill-blue-100"})]}),(0,n.jsx)("div",{className:"text:black text-lg font-semibold dark:text-white",children:"Cord.js"})]})}),(0,n.jsxs)("div",{className:"flex items-center divide-x divide-gray-200 dark:divide-gray-700",children:[(0,n.jsx)("nav",{className:"pr-4",children:(0,n.jsxs)("ul",{className:"flex items-center space-x-4 font-semibold",children:[(0,n.jsx)("li",{children:(0,n.jsx)(o(),{href:"/docs/getting-started",children:(0,n.jsx)("a",{className:"text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400",children:"Docs"})})}),(0,n.jsx)("li",{children:(0,n.jsx)(o(),{href:"/api",children:(0,n.jsx)("a",{className:"text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400",children:"API"})})})]})}),(0,n.jsx)("div",{className:"pl-4 text-gray-700 dark:text-gray-400",children:(0,n.jsxs)("ul",{className:"flex items-center space-x-4",children:[(0,n.jsx)("li",{className:"hover:text-blue-700 dark:hover:text-blue-400",children:(0,n.jsx)("button",{className:"block cursor-pointer","aria-label":"Switch Theme",onClick:function(){f("light"===u?"dark":"light")},children:x?"light"===u?(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"h-6 w-6",children:[(0,n.jsx)("path",{d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",fill:"currentColor"}),(0,n.jsx)("path",{d:"M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836",stroke:"currentColor"})]}):(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",className:"h-6 w-6",children:[(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z",fill:"currentColor"}),(0,n.jsx)("path",{d:"m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z",fill:"currentColor"}),(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z",fill:"currentColor"})]}):(0,n.jsx)("div",{className:"h-6 w-6"})})}),(0,n.jsx)("li",{className:"hover:text-blue-700 dark:hover:text-blue-400",children:(0,n.jsx)("a",{"aria-label":"github",href:"https://github.com/lukadev-0/cord.js",children:(0,n.jsx)("svg",{viewBox:"0 0 16 16",className:"h-5 w-5",fill:"currentColor","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})})})})]})})]})]})})}function h(e){var r=e.children,t=e.fixedHeader,a=e.headerClass;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(f,{fixed:t,className:a}),r,(0,n.jsx)("footer",{className:"relative bg-gray-900 py-16 px-4 dark:bg-black/50",children:(0,n.jsxs)("div",{className:"mx-auto max-w-screen-xl",children:[(0,n.jsx)("p",{className:"mb-2 text-gray-400",children:"Consider supporting me"}),(0,n.jsx)("a",{href:"https://buymeacoffee.com/lukadev",children:(0,n.jsx)("img",{src:"https://raw.githubusercontent.com/lukadev-0/lukadev-0/main/buy-coffee.png",className:"inline-block"})})]})})]})}},8942:function(e,r,t){"use strict";function n(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function a(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,l=[],o=!0,s=!1;try{for(t=t.call(e);!(o=(n=t.next()).done)&&(l.push(n.value),!r||l.length!==r);o=!0);}catch(i){s=!0,a=i}finally{try{o||null==t.return||t.return()}finally{if(s)throw a}}return l}}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return n(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return n(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var l,o=(l=t(9496))&&l.__esModule?l:{default:l},s=t(1195),i=t(916),c=t(1815);var u={};function d(e,r,t,n){if(e&&s.isLocalURL(r)){e.prefetch(r,t,n).catch((function(e){0}));var a=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;u[r+"%"+t+(a?"%"+a:"")]=!0}}var f=function(e){var r,t=!1!==e.prefetch,n=i.useRouter(),l=o.default.useMemo((function(){var r=a(s.resolveHref(n,e.href,!0),2),t=r[0],l=r[1];return{href:t,as:e.as?s.resolveHref(n,e.as):l||t}}),[n,e.href,e.as]),f=l.href,h=l.as,x=o.default.useRef(f),m=o.default.useRef(h),p=e.children,v=e.replace,y=e.shallow,b=e.scroll,g=e.locale;"string"===typeof p&&(p=o.default.createElement("a",null,p));var j=(r=o.default.Children.only(p))&&"object"===typeof r&&r.ref,w=a(c.useIntersection({rootMargin:"200px"}),3),C=w[0],k=w[1],N=w[2],M=o.default.useCallback((function(e){m.current===h&&x.current===f||(N(),m.current=h,x.current=f),C(e),j&&("function"===typeof j?j(e):"object"===typeof j&&(j.current=e))}),[h,j,f,N,C]);o.default.useEffect((function(){var e=k&&t&&s.isLocalURL(f),r="undefined"!==typeof g?g:n&&n.locale,a=u[f+"%"+h+(r?"%"+r:"")];e&&!a&&d(n,f,h,{locale:r})}),[h,f,k,g,t,n]);var Z={ref:M,onClick:function(e){r.props&&"function"===typeof r.props.onClick&&r.props.onClick(e),e.defaultPrevented||function(e,r,t,n,a,l,o,i){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var r=e.currentTarget.target;return r&&"_self"!==r||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&s.isLocalURL(t))&&(e.preventDefault(),r[a?"replace":"push"](t,n,{shallow:l,locale:i,scroll:o}))}(e,n,f,h,v,y,b,g)},onMouseEnter:function(e){r.props&&"function"===typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),s.isLocalURL(f)&&d(n,f,h,{priority:!0})}};if(e.passHref||"a"===r.type&&!("href"in r.props)){var A="undefined"!==typeof g?g:n&&n.locale,E=n&&n.isLocaleDomain&&s.getDomainLocale(h,A,n&&n.locales,n&&n.domainLocales);Z.href=E||s.addBasePath(s.addLocale(h,A,n&&n.defaultLocale))}return o.default.cloneElement(r,Z)};r.default=f,("function"===typeof r.default||"object"===typeof r.default&&null!==r.default)&&(Object.assign(r.default,r),e.exports=r.default)},1815:function(e,r,t){"use strict";function n(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function a(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,l=[],o=!0,s=!1;try{for(t=t.call(e);!(o=(n=t.next()).done)&&(l.push(n.value),!r||l.length!==r);o=!0);}catch(i){s=!0,a=i}finally{try{o||null==t.return||t.return()}finally{if(s)throw a}}return l}}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return n(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return n(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(r,"__esModule",{value:!0}),r.useIntersection=function(e){var r=e.rootRef,t=e.rootMargin,n=e.disabled||!s,u=l.useRef(),d=a(l.useState(!1),2),f=d[0],h=d[1],x=a(l.useState(r?r.current:null),2),m=x[0],p=x[1],v=l.useCallback((function(e){u.current&&(u.current(),u.current=void 0),n||f||e&&e.tagName&&(u.current=function(e,r,t){var n=function(e){var r,t={root:e.root||null,margin:e.rootMargin||""},n=c.find((function(e){return e.root===t.root&&e.margin===t.margin}));n?r=i.get(n):(r=i.get(t),c.push(t));if(r)return r;var a=new Map,l=new IntersectionObserver((function(e){e.forEach((function(e){var r=a.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;r&&t&&r(t)}))}),e);return i.set(t,r={id:t,observer:l,elements:a}),r}(t),a=n.id,l=n.observer,o=n.elements;return o.set(e,r),l.observe(e),function(){if(o.delete(e),l.unobserve(e),0===o.size){l.disconnect(),i.delete(a);var r=c.findIndex((function(e){return e.root===a.root&&e.margin===a.margin}));r>-1&&c.splice(r,1)}}}(e,(function(e){return e&&h(e)}),{root:m,rootMargin:t}))}),[n,m,t,f]),y=l.useCallback((function(){h(!1)}),[]);return l.useEffect((function(){if(!s&&!f){var e=o.requestIdleCallback((function(){return h(!0)}));return function(){return o.cancelIdleCallback(e)}}}),[f]),l.useEffect((function(){r&&p(r.current)}),[r]),[v,f,y]};var l=t(9496),o=t(2216),s="undefined"!==typeof IntersectionObserver;var i=new Map,c=[];("function"===typeof r.default||"object"===typeof r.default&&null!==r.default)&&(Object.assign(r.default,r),e.exports=r.default)},9830:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return i}});var n=t(4637),a=t(8700),l=t(9496),o=t(8417),s=t(5399);function i(){var e=(0,a.useRouter)(),r=(0,l.useState)(!1),t=r[0],i=r[1],c=e.asPath.split("/")[1];return(0,l.useEffect)((function(){i(!0)}),[]),t?"docs"===c||"api"===c?(0,n.jsx)(s.Z,{fixedHeader:!0,children:(0,n.jsx)(o.Z,{sidebar:c,children:(0,n.jsxs)("main",{className:"prose relative mx-auto max-w-screen-md justify-center py-16 dark:prose-invert",children:[(0,n.jsx)("h1",{children:"api"===c?"Class: NotFoundError":"We couldn't find this doc."}),(0,n.jsx)("p",{children:"api"===c?"This error occurs whenever a page is not found.":"The doc you're looking for doesn't exist."})]})})}):(0,n.jsx)(s.Z,{children:(0,n.jsx)("main",{className:"relative mx-auto flex h-screen max-w-screen-md flex-col justify-center pt-16 text-center dark:prose-invert",children:(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"mb-8 text-4xl font-bold",children:"We couldn't find this page."}),(0,n.jsx)("p",{className:"text-lg text-gray-700 dark:text-gray-400 lg:text-xl",children:"The page you're looking for doesn't exist."})]})})}):(0,n.jsx)("main",{className:"flex h-screen items-center justify-center text-center",children:(0,n.jsx)("div",{children:(0,n.jsx)("h1",{className:"mb-4 text-5xl text-black/10",children:"404"})})})}},3556:function(e,r,t){e.exports=t(8942)},8700:function(e,r,t){e.exports=t(916)}},function(e){e.O(0,[774,888,179],(function(){return r=1017,e(e.s=r);var r}));var r=e.O();_N_E=r}]);