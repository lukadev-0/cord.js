"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3237],{114:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var a=n(7378),r=n(8944),l=n(1438),o=n(492),c=n(1884),i=n(353),s="heroBanner_etFc",m="split_-uI5",u=n(5773),d="features_n4mZ",E=[{title:"Easy to Use",description:a.createElement(a.Fragment,null,"Easily get a Discord bot up and running, using the Discord gateway and/or interactions.")},{title:"Unopinionated",description:a.createElement(a.Fragment,null,"Cord.js is unopinionated, meaning you can structure your bot in any way you want.")},{title:"Powered using Middleware",description:a.createElement(a.Fragment,null,"Middleware is a powerful way to listen to events, and handle errors.")}];function p(e){var t=e.title,n=e.description;return a.createElement("div",{className:(0,r.Z)("col col--4")},a.createElement("div",{className:"text--center padding-horiz--md"},a.createElement("h3",null,t),a.createElement("p",null,n)))}function g(){return a.createElement("section",{className:d},a.createElement("div",{className:"container"},a.createElement("div",{className:"row"},E.map((function(e,t){return a.createElement(p,(0,u.Z)({key:t},e))})))))}function w(){return a.createElement("header",{className:(0,r.Z)("hero",s)},a.createElement("div",{className:(0,r.Z)("container",m)},a.createElement("div",null,a.createElement("h1",{className:"hero__title"},"Launch your bots to the moon!"),a.createElement("p",{className:"hero__subtitle"},"Cord.js is a simple and unopinionated Discord bot framework."),a.createElement("div",null,a.createElement(c.Z,{className:"button button--secondary button--lg",to:"/docs/getting-started"},"Get Started"))),a.createElement("div",null,a.createElement(o.Z,{className:"language-js"},"import createClient from '@cordjs/client'\nimport Gateway from '@cordjs/gateway'\n\nconst client = createClient([\n  [Gateway, {\n      token: process.env.TOKEN,\n      client: {\n        intents: ['GUILDS', 'GUILD_MESSAGES'],\n      },\n  }],\n])\n\nclient.gateway.messageCreate(context => {\n  const [message] = context.data\n\n  if (message.content === '!hello-world') {\n    return message.reply('Hello world!')\n  }\n})\n\nclient.start()"))))}function f(){(0,i.Z)().siteConfig;return a.createElement(l.Z,{description:"Simple, unopinionated, Discord bot framework."},a.createElement(w,null),a.createElement("main",null,a.createElement(g,null)))}}}]);