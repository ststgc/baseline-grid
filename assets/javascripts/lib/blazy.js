!function(a){"function"==typeof define&&define.amd?define(a):window.Blazy=a()}(function(){function a(a){if(!document.querySelectorAll){var d=document.createStyleSheet();document.querySelectorAll=function(a,b,c,e,f){for(f=document.all,b=[],a=a.replace(/\[for\b/gi,"[htmlFor").split(","),c=a.length;c--;){for(d.addRule(a[c],"k:v"),e=f.length;e--;)f[e].currentStyle.k&&b.push(f[e]);d.removeRule(0)}return b}}r=!0,o=[],l=a||{},l.error=l.error||!1,l.offset=l.offset||100,l.success=l.success||!1,l.selector=l.selector||".b-lazy",l.separator=l.separator||"|",l.container=l.container?document.querySelectorAll(l.container):!1,l.errorClass=l.errorClass||"b-error",l.breakpoints=l.breakpoints||!1,l.successClass=l.successClass||"b-loaded",l.src=k=l.src||"data-src",q=1<window.devicePixelRatio,s=j(c,25),t=j(f,50),f(),i(l.breakpoints,function(a){return a.width>=window.screen.width?(k=a.src,!1):void 0}),b()}function b(){e(l.selector),r&&(r=!1,l.container&&i(l.container,function(a){g(a,"scroll",s)}),g(window,"resize",t),g(window,"resize",s),g(window,"scroll",s)),c()}function c(){for(var b=0;p>b;b++){var c=o[b],d=c.getBoundingClientRect(),e=n+l.offset;(0<=d.left&&d.right<=m+l.offset&&(0<=d.top&&d.top<=e||d.bottom<=e&&d.bottom>=0-l.offset)||-1!==(" "+c.className+" ").indexOf(" "+l.successClass+" "))&&(a.prototype.load(c),o.splice(b,1),p--,b--)}0===p&&a.prototype.destroy()}function d(a){if(0<a.offsetWidth&&0<a.offsetHeight){var b=a.getAttribute(k)||a.getAttribute(l.src);if(b){var b=b.split(l.separator),c=b[q&&1<b.length?1:0],b=new Image;i(l.breakpoints,function(b){a.removeAttribute(b.src)}),a.removeAttribute(l.src),b.onerror=function(){l.error&&l.error(a,"invalid"),a.className=a.className+" "+l.errorClass},b.onload=function(){"img"===a.nodeName.toLowerCase()?a.src=c:a.style.backgroundImage='url("'+c+'")',a.className=a.className+" "+l.successClass,l.success&&l.success(a)},b.src=c}else l.error&&l.error(a,"missing"),a.className=a.className+" "+l.errorClass}}function e(a){a=document.querySelectorAll(a);for(var b=p=a.length;b--;o.unshift(a[b]));}function f(){n=window.innerHeight||document.documentElement.clientHeight,m=window.innerWidth||document.documentElement.clientWidth}function g(a,b,c){a.attachEvent?a.attachEvent&&a.attachEvent("on"+b,c):a.addEventListener(b,c,!1)}function h(a,b,c){a.detachEvent?a.detachEvent&&a.detachEvent("on"+b,c):a.removeEventListener(b,c,!1)}function i(a,b){if(a&&b)for(var c=a.length,d=0;c>d&&!1!==b(a[d],d);d++);}function j(a,b){var c=0;return function(){var d=+new Date;b>d-c||(c=d,a.apply(o,arguments))}}var k,l,m,n,o,p,q,r,s,t;return a.prototype.revalidate=function(){b()},a.prototype.load=function(a){-1===(" "+a.className+" ").indexOf(" "+l.successClass+" ")&&d(a)},a.prototype.destroy=function(){l.container&&i(l.container,function(a){h(a,"scroll",s)}),h(window,"scroll",s),h(window,"resize",s),h(window,"resize",t),p=0,o.length=0,r=!0},a});