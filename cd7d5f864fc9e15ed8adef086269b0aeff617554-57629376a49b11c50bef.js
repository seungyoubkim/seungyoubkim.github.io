"use strict";(self.webpackChunkseungyoubkim_github_io=self.webpackChunkseungyoubkim_github_io||[]).push([[84],{4811:function(e){var t=function(e,t){if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);var a;return e=Array.isArray(e)?e.map((function(e){return e.trim()})).filter((function(e){return e.length})).join("-"):e.trim(),0===e.length?"":1===e.length?t.pascalCase?e.toUpperCase():e.toLowerCase():(e!==e.toLowerCase()&&(e=function(e){for(var t=!1,a=!1,r=!1,i=0;i<e.length;i++){var n=e[i];t&&/[a-zA-Z]/.test(n)&&n.toUpperCase()===n?(e=e.slice(0,i)+"-"+e.slice(i),t=!1,r=a,a=!0,i++):a&&r&&/[a-zA-Z]/.test(n)&&n.toLowerCase()===n?(e=e.slice(0,i-1)+"-"+e.slice(i-1),r=a,a=!1,t=!0):(t=n.toLowerCase()===n&&n.toUpperCase()!==n,r=a,a=n.toUpperCase()===n&&n.toLowerCase()!==n)}return e}(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(function(e,t){return t.toUpperCase()})).replace(/\d+(\w|$)/g,(function(e){return e.toUpperCase()})),a=e,t.pascalCase?a.charAt(0).toUpperCase()+a.slice(1):a)};e.exports=t,e.exports.default=t},9230:function(e,t,a){a.d(t,{L:function(){return m},M:function(){return E},P:function(){return w},S:function(){return P},_:function(){return o},a:function(){return s},b:function(){return c},g:function(){return u},h:function(){return l}});var r=a(7294),i=(a(4811),a(5697)),n=a.n(i);function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},s.apply(this,arguments)}function o(e,t){if(null==e)return{};var a,r,i={},n=Object.keys(e);for(r=0;r<n.length;r++)t.indexOf(a=n[r])>=0||(i[a]=e[a]);return i}var l=function(){return"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype};function c(e,t,a,r,i){return void 0===i&&(i={}),s({},a,{loading:r,shouldLoad:e,"data-main-image":"",style:s({},i,{opacity:t?1:0})})}function u(e,t,a,r,i,n,o,l){var c={};n&&(c.backgroundColor=n,"fixed"===a?(c.width=r,c.height=i,c.backgroundColor=n,c.position="relative"):("constrained"===a||"fullWidth"===a)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),o&&(c.objectFit=o),l&&(c.objectPosition=l);var u=s({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:s({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return u}var d,p=["children"],g=function(e){var t=e.layout,a=e.width,i=e.height;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:i/a*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:a,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+i+"' width='"+a+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},m=function(e){var t=e.children,a=o(e,p);return r.createElement(r.Fragment,null,r.createElement(g,s({},a)),t,null)},f=["src","srcSet","loading","alt","shouldLoad"],h=["fallback","sources","shouldLoad"],y=function(e){var t=e.src,a=e.srcSet,i=e.loading,n=e.alt,l=void 0===n?"":n,c=e.shouldLoad,u=o(e,f);return r.createElement("img",s({},u,{decoding:"async",loading:i,src:c?t:void 0,"data-src":c?void 0:t,srcSet:c?a:void 0,"data-srcset":c?void 0:a,alt:l}))},v=function(e){var t=e.fallback,a=e.sources,i=void 0===a?[]:a,n=e.shouldLoad,l=void 0===n||n,c=o(e,h),u=c.sizes||(null==t?void 0:t.sizes),d=r.createElement(y,s({},c,t,{sizes:u,shouldLoad:l}));return i.length?r.createElement("picture",null,i.map((function(e){var t=e.media,a=e.srcSet,i=e.type;return r.createElement("source",{key:t+"-"+i+"-"+a,type:i,media:t,srcSet:l?a:void 0,"data-srcset":l?void 0:a,sizes:u})})),d):d};y.propTypes={src:i.string.isRequired,alt:i.string.isRequired,sizes:i.string,srcSet:i.string,shouldLoad:i.bool},v.displayName="Picture",v.propTypes={alt:i.string.isRequired,shouldLoad:i.bool,fallback:i.exact({src:i.string.isRequired,srcSet:i.string,sizes:i.string}),sources:i.arrayOf(i.oneOfType([i.exact({media:i.string.isRequired,type:i.string,sizes:i.string,srcSet:i.string.isRequired}),i.exact({media:i.string,type:i.string.isRequired,sizes:i.string,srcSet:i.string.isRequired})]))};var b=["fallback"],w=function(e){var t=e.fallback,a=o(e,b);return t?r.createElement(v,s({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",s({},a))};w.displayName="Placeholder",w.propTypes={fallback:i.string,sources:null==(d=v.propTypes)?void 0:d.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};var E=function(e){return r.createElement(r.Fragment,null,r.createElement(v,s({},e)),r.createElement("noscript",null,r.createElement(v,s({},e,{shouldLoad:!0}))))};E.displayName="MainImage",E.propTypes=v.propTypes;var C,L,S=function(e,t,a){for(var r=arguments.length,i=new Array(r>3?r-3:0),s=3;s<r;s++)i[s-3]=arguments[s];return e.alt||""===e.alt?n().string.apply(n(),[e,t,a].concat(i)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},k={image:n().object.isRequired,alt:S},x=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],T=["style","className"],_=new Set,O=function(e){var t=e.as,i=void 0===t?"div":t,n=e.image,c=e.style,u=e.backgroundColor,d=e.className,p=e.class,g=e.onStartLoad,m=e.onLoad,f=e.onError,h=o(e,x),y=n.width,v=n.height,b=n.layout,w=function(e,t,a){var r={},i="gatsby-image-wrapper";return"fixed"===a?(r.width=e,r.height=t):"constrained"===a&&(i="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:i,"data-gatsby-image-wrapper":"",style:r}}(y,v,b),E=w.style,S=w.className,k=o(w,T),O=(0,r.useRef)(),I=(0,r.useMemo)((function(){return JSON.stringify(n.images)}),[n.images]);p&&(d=p);var q=function(e,t,a){var r="";return"fullWidth"===e&&(r='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(r='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+a+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),r}(b,y,v);return(0,r.useEffect)((function(){C||(C=Promise.all([a.e(774),a.e(36)]).then(a.bind(a,9036)).then((function(e){var t=e.renderImageToString,a=e.swapPlaceholderImage;return L=t,{renderImageToString:t,swapPlaceholderImage:a}})));var e,t,r=O.current.querySelector("[data-gatsby-image-ssr]");return r&&l()?(r.complete?(null==g||g({wasCached:!0}),null==m||m({wasCached:!0}),setTimeout((function(){r.removeAttribute("data-gatsby-image-ssr")}),0)):document.addEventListener("load",(function e(){document.removeEventListener("load",e),null==g||g({wasCached:!0}),null==m||m({wasCached:!0}),setTimeout((function(){r.removeAttribute("data-gatsby-image-ssr")}),0)})),void _.add(I)):L&&_.has(I)?void 0:(C.then((function(a){var r=a.renderImageToString,i=a.swapPlaceholderImage;O.current.innerHTML=r(s({isLoading:!0,isLoaded:_.has(I),image:n},h)),_.has(I)||(e=requestAnimationFrame((function(){O.current&&(t=i(O.current,I,_,c,g,m,f))})))})),function(){e&&cancelAnimationFrame(e),t&&t()})}),[n]),(0,r.useLayoutEffect)((function(){_.has(I)&&L&&(O.current.innerHTML=L(s({isLoading:_.has(I),isLoaded:_.has(I),image:n},h)),null==g||g({wasCached:!0}),null==m||m({wasCached:!0}))}),[n]),(0,r.createElement)(i,s({},k,{style:s({},E,c,{backgroundColor:u}),className:S+(d?" "+d:""),ref:O,dangerouslySetInnerHTML:{__html:q},suppressHydrationWarning:!0}))},I=(0,r.memo)((function(e){return e.image?(0,r.createElement)(O,e):null}));I.propTypes=k,I.displayName="GatsbyImage";var q,N=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions"],z=function(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),i=2;i<a;i++)r[i-2]=arguments[i];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?n().number.apply(n(),[e,t].concat(r)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},A=new Set(["fixed","fullWidth","constrained"]),R={src:n().string.isRequired,alt:S,width:z,height:z,sizes:n().string,layout:function(e){if(void 0!==e.layout&&!A.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},P=(q=I,function(e){var t=e.src,a=e.__imageData,i=e.__error,n=o(e,N);return i&&console.warn(i),a?r.createElement(q,s({image:a},n)):(console.warn("Image not loaded",t),null)});P.displayName="StaticImage",P.propTypes=R},8771:function(e,t,a){var r=a(7294),i=a(1597),n=a(9230);t.Z=function(){var e,t=null===(e=(0,i.useStaticQuery)("3257411868").site.siteMetadata)||void 0===e?void 0:e.author;return r.createElement("div",{className:"bio"},r.createElement(n.S,{className:"bio-avatar",layout:"fixed",formats:["auto","webp","avif"],src:"../images/profile-pic.png",width:50,height:50,quality:95,alt:"Profile picture",__imageData:a(1550)}),(null==t?void 0:t.name)&&r.createElement("p",null,"Blog by ",r.createElement("strong",null,t.name)," ",(null==t?void 0:t.summary)||null,r.createElement("br",null),"즐겁고 폼나게 일하는 개발자가 되고 싶습니다."))}},1550:function(e){e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#080808","images":{"fallback":{"src":"/static/6011ca8e0c3bceb22459a3400711b66d/e5610/profile-pic.png","srcSet":"/static/6011ca8e0c3bceb22459a3400711b66d/e5610/profile-pic.png 50w,\\n/static/6011ca8e0c3bceb22459a3400711b66d/e9b55/profile-pic.png 100w","sizes":"50px"},"sources":[{"srcSet":"/static/6011ca8e0c3bceb22459a3400711b66d/d4bf4/profile-pic.avif 50w,\\n/static/6011ca8e0c3bceb22459a3400711b66d/ee81f/profile-pic.avif 100w","type":"image/avif","sizes":"50px"},{"srcSet":"/static/6011ca8e0c3bceb22459a3400711b66d/3faea/profile-pic.webp 50w,\\n/static/6011ca8e0c3bceb22459a3400711b66d/6a679/profile-pic.webp 100w","type":"image/webp","sizes":"50px"}]},"width":50,"height":50}')}}]);
//# sourceMappingURL=cd7d5f864fc9e15ed8adef086269b0aeff617554-57629376a49b11c50bef.js.map