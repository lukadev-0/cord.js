"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[323],{7323:function(e,t,o){o.d(t,{PB:function(){return s}});var a=o(4359),r=o.n(a),n=o(9496);function p(){return p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a])}return e},p.apply(this,arguments)}function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var l={templateTitle:"",noindex:!1,nofollow:!1,defaultOpenGraphImageWidth:0,defaultOpenGraphImageHeight:0,defaultOpenGraphVideoWidth:0,defaultOpenGraphVideoHeight:0},h=function(e,t,o){void 0===t&&(t=[]);var a=void 0===o?{}:o,r=a.defaultWidth,p=a.defaultHeight;return t.reduce((function(t,o,a){return t.push(n.createElement("meta",{key:"og:"+e+":0"+a,property:"og:"+e,content:o.url})),o.alt&&t.push(n.createElement("meta",{key:"og:"+e+":alt0"+a,property:"og:"+e+":alt",content:o.alt})),o.secureUrl&&t.push(n.createElement("meta",{key:"og:"+e+":secure_url0"+a,property:"og:"+e+":secure_url",content:o.secureUrl.toString()})),o.type&&t.push(n.createElement("meta",{key:"og:"+e+":type0"+a,property:"og:"+e+":type",content:o.type.toString()})),o.width?t.push(n.createElement("meta",{key:"og:"+e+":width0"+a,property:"og:"+e+":width",content:o.width.toString()})):r&&t.push(n.createElement("meta",{key:"og:"+e+":width0"+a,property:"og:"+e+":width",content:r.toString()})),o.height?t.push(n.createElement("meta",{key:"og:"+e+":height"+a,property:"og:"+e+":height",content:o.height.toString()})):p&&t.push(n.createElement("meta",{key:"og:"+e+":height"+a,property:"og:"+e+":height",content:p.toString()})),t}),[])},c=function(e){var t,o,a,r=[];e.titleTemplate&&(l.templateTitle=e.titleTemplate);var i="";e.title?(i=e.title,l.templateTitle&&(i=l.templateTitle.replace(/%s/g,(function(){return i})))):e.defaultTitle&&(i=e.defaultTitle),i&&r.push(n.createElement("title",{key:"title"},i));var c,s,d=e.noindex||l.noindex||e.dangerouslySetAllPagesToNoIndex,m=e.nofollow||l.nofollow||e.dangerouslySetAllPagesToNoFollow,u="";if(e.robotsProps){var g=e.robotsProps,f=g.nosnippet,y=g.maxSnippet,G=g.maxImagePreview,k=g.maxVideoPreview,v=g.noarchive,E=g.noimageindex,b=g.notranslate,w=g.unavailableAfter;u=(f?",nosnippet":"")+(y?",max-snippet:"+y:"")+(G?",max-image-preview:"+G:"")+(v?",noarchive":"")+(w?",unavailable_after:"+w:"")+(E?",noimageindex":"")+(k?",max-video-preview:"+k:"")+(b?",notranslate":"")}(d||m?(e.dangerouslySetAllPagesToNoIndex&&(l.noindex=!0),e.dangerouslySetAllPagesToNoFollow&&(l.nofollow=!0),r.push(n.createElement("meta",{key:"robots",name:"robots",content:(d?"noindex":"index")+","+(m?"nofollow":"follow")+u}))):r.push(n.createElement("meta",{key:"robots",name:"robots",content:"index,follow"+u})),e.description&&r.push(n.createElement("meta",{key:"description",name:"description",content:e.description})),e.mobileAlternate&&r.push(n.createElement("link",{rel:"alternate",key:"mobileAlternate",media:e.mobileAlternate.media,href:e.mobileAlternate.href})),e.languageAlternates&&e.languageAlternates.length>0&&e.languageAlternates.forEach((function(e){r.push(n.createElement("link",{rel:"alternate",key:"languageAlternate-"+e.hrefLang,hrefLang:e.hrefLang,href:e.href}))})),e.twitter&&(e.twitter.cardType&&r.push(n.createElement("meta",{key:"twitter:card",name:"twitter:card",content:e.twitter.cardType})),e.twitter.site&&r.push(n.createElement("meta",{key:"twitter:site",name:"twitter:site",content:e.twitter.site})),e.twitter.handle&&r.push(n.createElement("meta",{key:"twitter:creator",name:"twitter:creator",content:e.twitter.handle}))),e.facebook&&e.facebook.appId&&r.push(n.createElement("meta",{key:"fb:app_id",property:"fb:app_id",content:e.facebook.appId})),null!=(t=e.openGraph)&&t.title||i)&&r.push(n.createElement("meta",{key:"og:title",property:"og:title",content:(null==(c=e.openGraph)?void 0:c.title)||i}));(null!=(o=e.openGraph)&&o.description||e.description)&&r.push(n.createElement("meta",{key:"og:description",property:"og:description",content:(null==(s=e.openGraph)?void 0:s.description)||e.description}));if(e.openGraph){if((e.openGraph.url||e.canonical)&&r.push(n.createElement("meta",{key:"og:url",property:"og:url",content:e.openGraph.url||e.canonical})),e.openGraph.type){var _=e.openGraph.type.toLowerCase();r.push(n.createElement("meta",{key:"og:type",property:"og:type",content:_})),"profile"===_&&e.openGraph.profile?(e.openGraph.profile.firstName&&r.push(n.createElement("meta",{key:"profile:first_name",property:"profile:first_name",content:e.openGraph.profile.firstName})),e.openGraph.profile.lastName&&r.push(n.createElement("meta",{key:"profile:last_name",property:"profile:last_name",content:e.openGraph.profile.lastName})),e.openGraph.profile.username&&r.push(n.createElement("meta",{key:"profile:username",property:"profile:username",content:e.openGraph.profile.username})),e.openGraph.profile.gender&&r.push(n.createElement("meta",{key:"profile:gender",property:"profile:gender",content:e.openGraph.profile.gender}))):"book"===_&&e.openGraph.book?(e.openGraph.book.authors&&e.openGraph.book.authors.length&&e.openGraph.book.authors.forEach((function(e,t){r.push(n.createElement("meta",{key:"book:author:0"+t,property:"book:author",content:e}))})),e.openGraph.book.isbn&&r.push(n.createElement("meta",{key:"book:isbn",property:"book:isbn",content:e.openGraph.book.isbn})),e.openGraph.book.releaseDate&&r.push(n.createElement("meta",{key:"book:release_date",property:"book:release_date",content:e.openGraph.book.releaseDate})),e.openGraph.book.tags&&e.openGraph.book.tags.length&&e.openGraph.book.tags.forEach((function(e,t){r.push(n.createElement("meta",{key:"book:tag:0"+t,property:"book:tag",content:e}))}))):"article"===_&&e.openGraph.article?(e.openGraph.article.publishedTime&&r.push(n.createElement("meta",{key:"article:published_time",property:"article:published_time",content:e.openGraph.article.publishedTime})),e.openGraph.article.modifiedTime&&r.push(n.createElement("meta",{key:"article:modified_time",property:"article:modified_time",content:e.openGraph.article.modifiedTime})),e.openGraph.article.expirationTime&&r.push(n.createElement("meta",{key:"article:expiration_time",property:"article:expiration_time",content:e.openGraph.article.expirationTime})),e.openGraph.article.authors&&e.openGraph.article.authors.length&&e.openGraph.article.authors.forEach((function(e,t){r.push(n.createElement("meta",{key:"article:author:0"+t,property:"article:author",content:e}))})),e.openGraph.article.section&&r.push(n.createElement("meta",{key:"article:section",property:"article:section",content:e.openGraph.article.section})),e.openGraph.article.tags&&e.openGraph.article.tags.length&&e.openGraph.article.tags.forEach((function(e,t){r.push(n.createElement("meta",{key:"article:tag:0"+t,property:"article:tag",content:e}))}))):"video.movie"!==_&&"video.episode"!==_&&"video.tv_show"!==_&&"video.other"!==_||!e.openGraph.video||(e.openGraph.video.actors&&e.openGraph.video.actors.length&&e.openGraph.video.actors.forEach((function(e,t){e.profile&&r.push(n.createElement("meta",{key:"video:actor:0"+t,property:"video:actor",content:e.profile})),e.role&&r.push(n.createElement("meta",{key:"video:actor:role:0"+t,property:"video:actor:role",content:e.role}))})),e.openGraph.video.directors&&e.openGraph.video.directors.length&&e.openGraph.video.directors.forEach((function(e,t){r.push(n.createElement("meta",{key:"video:director:0"+t,property:"video:director",content:e}))})),e.openGraph.video.writers&&e.openGraph.video.writers.length&&e.openGraph.video.writers.forEach((function(e,t){r.push(n.createElement("meta",{key:"video:writer:0"+t,property:"video:writer",content:e}))})),e.openGraph.video.duration&&r.push(n.createElement("meta",{key:"video:duration",property:"video:duration",content:e.openGraph.video.duration.toString()})),e.openGraph.video.releaseDate&&r.push(n.createElement("meta",{key:"video:release_date",property:"video:release_date",content:e.openGraph.video.releaseDate})),e.openGraph.video.tags&&e.openGraph.video.tags.length&&e.openGraph.video.tags.forEach((function(e,t){r.push(n.createElement("meta",{key:"video:tag:0"+t,property:"video:tag",content:e}))})),e.openGraph.video.series&&r.push(n.createElement("meta",{key:"video:series",property:"video:series",content:e.openGraph.video.series})))}e.defaultOpenGraphImageWidth&&(l.defaultOpenGraphImageWidth=e.defaultOpenGraphImageWidth),e.defaultOpenGraphImageHeight&&(l.defaultOpenGraphImageHeight=e.defaultOpenGraphImageHeight),e.openGraph.images&&e.openGraph.images.length&&r.push.apply(r,h("image",e.openGraph.images,{defaultWidth:l.defaultOpenGraphImageWidth,defaultHeight:l.defaultOpenGraphImageHeight})),e.defaultOpenGraphVideoWidth&&(l.defaultOpenGraphVideoWidth=e.defaultOpenGraphVideoWidth),e.defaultOpenGraphVideoHeight&&(l.defaultOpenGraphVideoHeight=e.defaultOpenGraphVideoHeight),e.openGraph.videos&&e.openGraph.videos.length&&r.push.apply(r,h("video",e.openGraph.videos,{defaultWidth:l.defaultOpenGraphVideoWidth,defaultHeight:l.defaultOpenGraphVideoHeight})),e.openGraph.locale&&r.push(n.createElement("meta",{key:"og:locale",property:"og:locale",content:e.openGraph.locale})),e.openGraph.site_name&&r.push(n.createElement("meta",{key:"og:site_name",property:"og:site_name",content:e.openGraph.site_name}))}return e.canonical&&r.push(n.createElement("link",{rel:"canonical",href:e.canonical,key:"canonical"})),e.additionalMetaTags&&e.additionalMetaTags.length>0&&e.additionalMetaTags.forEach((function(e){var t,o,a;r.push(n.createElement("meta",p({key:"meta:"+(null!=(t=null!=(o=null!=(a=e.keyOverride)?a:e.name)?o:e.property)?t:e.httpEquiv)},e)))})),null!=(a=e.additionalLinkTags)&&a.length&&e.additionalLinkTags.forEach((function(e){var t;r.push(n.createElement("link",p({key:"link"+(null!=(t=e.keyOverride)?t:e.href)+e.rel},e)))})),r},s=(n.Component,function(e){function t(){return e.apply(this,arguments)||this}return i(t,e),t.prototype.render=function(){var e=this.props,t=e.title,o=e.noindex,a=void 0!==o&&o,p=e.nofollow,i=e.robotsProps,l=e.description,h=e.canonical,s=e.openGraph,d=e.facebook,m=e.twitter,u=e.additionalMetaTags,g=e.titleTemplate,f=e.mobileAlternate,y=e.languageAlternates,G=e.additionalLinkTags;return n.createElement(r(),null,c({title:t,noindex:a,nofollow:p,robotsProps:i,description:l,canonical:h,facebook:d,openGraph:s,additionalMetaTags:u,twitter:m,titleTemplate:g,mobileAlternate:f,languageAlternates:y,additionalLinkTags:G}))},t}(n.Component)),d=Object.freeze({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"});new RegExp("["+Object.keys(d).join("")+"]","g")}}]);