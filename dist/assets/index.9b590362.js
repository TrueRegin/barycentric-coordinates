var t=Object.defineProperty,e=Object.prototype.hasOwnProperty,n=Object.getOwnPropertySymbols,i=Object.prototype.propertyIsEnumerable,o=(e,n,i)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i,s=(t,s)=>{for(var c in s||(s={}))e.call(s,c)&&o(t,c,s[c]);if(n)for(var c of n(s))i.call(s,c)&&o(t,c,s[c]);return t};import"./vendor.dbef7115.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(n){const i=new URL(t,location),o=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((n,s)=>{const c=new URL(t,i);if(self[e].moduleMap[c])return n(self[e].moduleMap[c]);const r=new Blob([`import * as m from '${c}';`,`${e}.moduleMap['${c}']=m;`],{type:"text/javascript"}),a=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){s(new Error(`Failed to import: ${t}`)),o(a)},onload(){n(self[e].moduleMap[c]),o(a)}});document.head.appendChild(a)})),self[e].moduleMap={}}}("/assets/");const c={x:0,y:0,s:1};function r(){return s({},c)}function a(t){const e=s({},t),n=r();return e.y=window.innerHeight-e.y,e.x-=n.x,e.y-=n.y,e.x/=n.s,e.y/=n.s,e}const l={x:-1e3,y:-1e3};let x,h,d=!1,y=!1,w={pan:{}};function f(){return a(l)}class u{static init(t){this.ctx=t}static drawCircle({x:t,y:e},n,i){this.ctx.fillStyle=i,this.ctx.beginPath(),this.ctx.arc(t,-e,n,0,2*Math.PI),this.ctx.closePath(),this.ctx.fill()}static drawText(t,{x:e,y:n},i,o,s){this.ctx.fillStyle=o,this.ctx.font=`${i}px ${s}`,this.ctx.fillText(t,e,-n)}static drawLine(t,e,n,i){this.ctx.strokeStyle=i,this.ctx.lineWidth=n,this.ctx.beginPath(),this.ctx.moveTo(t.x,-t.y),this.ctx.lineTo(e.x,-e.y),this.ctx.stroke()}static drawLineTo(t,e,n,i){this.ctx.strokeStyle=i,this.ctx.lineWidth=n,this.ctx.beginPath(),this.ctx.moveTo(t.x,-t.y),this.ctx.lineTo(t.x+e.x,-t.y-e.y),this.ctx.stroke()}static drawLinesWithCallback(t,e,n,i,o){if(t.length>1){const s=t[0];this.ctx.strokeStyle=n,this.ctx.lineWidth=e,this.ctx.beginPath(),this.ctx.moveTo(s.x,-s.y);for(let e=1;e<t.length;e++){const n=t[e];this.ctx.lineTo(n.x,-n.y)}if(i&&this.ctx.closePath(),this.ctx.stroke(),o)for(let e=0;e<t.length;e++)o(t[e],e)}else console.error("Attempting to run `drawLinesWithCallback` helper function with less than 2 points!")}static drawLines(t,e,n,i){this.drawLinesWithCallback(t,e,n,!1,i)}static drawLinesAndClose(t,e,n,i){this.drawLinesWithCallback(t,e,n,!0,i)}static drawLinesWithControls(t,e,n,i,o,s,c,r,a){this.drawLinesWithCallback(t,e,n,i,((t,e)=>{const n=e===r;this.drawCircle({x:t.x,y:t.y},o,n?c:s),a(t,e,n)}))}static fillShape(t,e){const n=t[0];if(n){this.ctx.beginPath(),this.ctx.moveTo(n.x,-n.y);for(let e=1;e<t.length;e++){const n=t[e];this.ctx.lineTo(n.x,-n.y)}this.ctx.closePath(),this.ctx.fillStyle=e,this.ctx.fill()}}}function m(t){const e=t[0],n=f(),i=n.x-e.x,o=n.y-e.y,s={x:t[1].x-e.x,y:t[1].y-e.y},c={x:t[2].x-e.x,y:t[2].y-e.y},r=i*s.x+o*s.y,a=i*c.x+o*c.y,l=s.x*s.x+s.y*s.y,x=c.x*c.x+c.y*c.y,h=s.x*c.x+s.y*c.y,d=1/(l*x-h*h),y=(x*r+-h*a)*d,w=(-h*r+l*a)*d,m=y>=0&&w>=0&&y+w<=1;return m&&function(t){u.fillShape(t,"#00EE4333")}(t),function(t,e,n,i,o){const s={x:e.x*i,y:e.y*i},c={x:n.x*o,y:n.y*o},r={x:t.x+s.x,y:t.y+s.y};u.drawLineTo(t,s,2,"#0aDD43"),u.drawLineTo(r,c,2,"#FA4D33")}(e,s,c,y,w),m}let p=-1,b=[{x:300,y:400},{x:350,y:600},{x:400,y:400}];function v(){const t=window.innerWidth,e=window.innerHeight;x.width=t,x.height=e}window.addEventListener("resize",v),window.addEventListener("load",(function(){y||(window.addEventListener("mousedown",(t=>{d=!0})),window.addEventListener("mouseup",(t=>{d=!1})),window.addEventListener("mousemove",(t=>{if(l.x=t.clientX,l.y=t.clientY,!0===d)for(let e in w.pan)(0,w.pan[e])({x:t.movementX,y:t.movementY})})),y=!0),x=document.createElement("canvas"),h=x.getContext("2d"),u.init(h),document.body.appendChild(x),v(),function(t){const e=Object.keys(w.pan).length.toString();w.pan[e]=t}((({x:t,y:e})=>{-1==p||(b[p].x+=t,b[p].y-=e)})),window.addEventListener("mousedown",(t=>{const e=a({x:t.clientX,y:t.clientY});for(let o=0;o<b.length;o++){let t=b[o];n=e,i=t,Math.pow(n.x-i.x,2)+Math.pow(n.y-i.y,2)<16.099999999999998&&(p=o)}var n,i})),window.addEventListener("mouseup",(()=>{p=-1})),setInterval((()=>{h.clearRect(0,0,window.innerWidth,window.innerHeight),function(t){h.clearRect(0,0,window.innerWidth,window.innerHeight);const e=r();h.translate(0,window.innerHeight),h.translate(e.x,e.y),h.scale(e.s,e.s),function(t){u.drawLinesWithControls(t,1,"#D3D3EF",!0,7,"#FFFFFF","#f53f00",p,((t,e,n)=>{const i={x:t.x+10,y:t.y+10};u.drawText(String.fromCharCode(L+e),i,20,n?"#f53f00":"#FFFFFF","monospace")}))}(t),function(t){const e=f(),n=m(t)?"#00E33A":"#E33A00";u.drawCircle(e,5,n)}(t),h.resetTransform()}(b)}),1e3/60)}));const L="A".charCodeAt(0);window.oncontextmenu=t=>{t.preventDefault()};
