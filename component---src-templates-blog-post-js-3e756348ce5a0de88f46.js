"use strict";(self.webpackChunkseungyoubkim_github_io=self.webpackChunkseungyoubkim_github_io||[]).push([[989],{838:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var r=n(7294),i=n(1597),a=n(8771),l=n(8678),s=n(262),o=n(1721),c=function(e){function t(t){var n;return(n=e.call(this,t)||this).commentsEl=r.createRef(),n.state={status:"pending"},n}(0,o.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this,t=document.createElement("script");t.onload=function(){return e.setState({status:"success"})},t.onerror=function(){return e.setState({status:"failed"})},t.async=!0,t.src="https://giscus.app/client.js",t.crossOrigin="anonymous",t.setAttribute("repo","seungyoubkim/seungyoubkim.github.io"),t.setAttribute("repo-id","R_kgDOHdL6mw"),t.setAttribute("category","Announcements"),t.setAttribute("category-id","DIC_kwDOHdL6m84CZ0Tt"),t.setAttribute("strict","0"),t.setAttribute("mapping","pathname"),t.setAttribute("reactions-enabled","1"),t.setAttribute("emit-metadata","0"),t.setAttribute("input-position","bottom"),t.setAttribute("theme","preferred_color_scheme"),t.setAttribute("lang","ko"),this.commentsEl.current.appendChild(t)},n.render=function(){var e=this.state.status;return r.createElement("div",{className:"giscus"},"failed"===e&&r.createElement("div",null,"Error. Please try again."),"pending"===e&&r.createElement("div",null,"Loading script..."),r.createElement("div",{ref:this.commentsEl}))},t}(r.Component),u=function(e){var t,n=e.data,o=e.location,u=n.markdownRemark,m=(null===(t=n.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",p=n.previous,d=n.next;return r.createElement(l.Z,{location:o,title:m},r.createElement(s.Z,{title:u.frontmatter.title,description:u.frontmatter.description||u.excerpt}),r.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},r.createElement("header",null,r.createElement("h1",{itemProp:"headline"},u.frontmatter.title),r.createElement("p",null,u.frontmatter.date)),r.createElement("section",{dangerouslySetInnerHTML:{__html:u.html},itemProp:"articleBody"}),r.createElement("hr",null),r.createElement("footer",null,r.createElement(a.Z,null))),r.createElement("nav",{className:"blog-post-nav"},r.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},r.createElement("li",null,p&&r.createElement(i.Link,{to:p.fields.slug,rel:"prev"},"← ",p.frontmatter.title)),r.createElement("li",null,d&&r.createElement(i.Link,{to:d.fields.slug,rel:"next"},d.frontmatter.title," →")))),r.createElement(c,null))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-3e756348ce5a0de88f46.js.map