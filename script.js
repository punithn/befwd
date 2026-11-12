function mg(s){return Math.round(s/24)*4}
(function(){
'use strict';
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))},css=function(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()};
var PI=Math.PI;

/* ---------- navigation ---------- */
var secs=$$('main>section'),menu=$('#menu'),idx=$('#idx');
secs.forEach(function(s){
 var li=document.createElement('li');li.dataset.id=s.id;
 var sub=s.id=='index'?'':'<ul>'+$$('h3[id]',s).map(function(h){return'<li><a href="#'+h.id+'" data-s="'+h.id+'">'+h.textContent+'</a></li>'}).join('')+'</ul>';
 li.innerHTML='<a href="#'+s.id+'">'+s.dataset.t+'</a>'+sub;menu.appendChild(li);
 
 new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)$$('#menu>li').forEach(function(l){l.classList.toggle('on',l.dataset.id==s.id)})})},{rootMargin:'-35% 0px -60% 0px'}).observe(s)});
var sa=$$('#menu ul a'),hio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)sa.forEach(function(a){a.classList.toggle('cur',a.dataset.s==e.target.id)})})},{rootMargin:'-20% 0px -72% 0px'});
$$('h3[id]').forEach(function(h){hio.observe(h)});

/* ---------- reveal, progress, drawer, theme, copy ---------- */
var rio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}})},{threshold:.1});
$$('.rv,[data-r]').forEach(function(e){rio.observe(e)});

function tog(f){document.body.classList.toggle('open',f);document.documentElement.classList.toggle('open',document.body.classList.contains('open'))}
$('#burger').onclick=function(){tog()};$('#scrim').onclick=function(){tog(false)};
$('#nav').addEventListener('click',function(e){if(e.target.closest('a')&&innerWidth<=1024)tog(false)});
var tt=$('#toast'),tm;document.addEventListener('click',function(e){var b=e.target.closest('.sw');if(!b)return;var h=b.dataset.h;
 (navigator.clipboard?navigator.clipboard.writeText(h):Promise.reject()).catch(function(){}).then(function(){tt.textContent='Copied '+h;tt.classList.add('show');clearTimeout(tm);tm=setTimeout(function(){tt.classList.remove('show')},1500)})});
})();

/* ---------- downloads ---------- */
(function(){
var D=document.querySelector('#K path').getAttribute('d'),LW=511,LH=236;
function svg(k,c,s){var P='<path d="'+D+'"/>',N='xmlns="http://www.w3.org/2000/svg"';
 if(k=='logo'){var m=mg(+s||1000)*LH/(+s||1000),sc=(+s||1000)/LH;return'<svg '+N+' viewBox="'+(-m)+' '+(-m)+' '+(LW+2*m)+' '+(LH+2*m)+'" width="'+((LW+2*m)*sc).toFixed(1)+'" height="'+((LH+2*m)*sc).toFixed(1)+'" fill="'+(c=='w'?'#FFF6E8':'#0d0d0b')+'">'+P+'</svg>'}
 var tile=c=='k'?'#0d0d0b':'#FFF6E8',mk=c=='k'?'#FFF6E8':'#0d0d0b',w=k=='avatar'?62:68,s2=w/LW,h=LH*s2,
 sh=k=='avatar'?'<circle cx="50" cy="50" r="50" fill="'+tile+'"/>':'<rect width="100" height="100" rx="23" fill="'+tile+'"/>';
 return'<svg '+N+' viewBox="0 0 100 100" width="1000" height="1000">'+sh+'<g fill="'+mk+'" transform="translate('+(100-w)/2+' '+(100-h)/2+') scale('+s2+')">'+P+'</g></svg>'}
function pdf(col){var k=4,m=mg(LH*4)/4,W=(LW+2*m)*k,Hh=(LH+2*m)*k,t=D.match(/[MLHVCZ]|-?\d*\.?\d+/g),i=0,o='',cx=0,cy=0,cmd;
 function n(){return parseFloat(t[i++])}function X(v){return((v+m)*k).toFixed(2)}function Y(v){return((LH-v+m)*k).toFixed(2)}
 while(i<t.length){if(/[MLHVCZ]/.test(t[i]))cmd=t[i++];
  if(cmd=='Z'){o+='h ';continue}
  if(cmd=='M'){cx=n();cy=n();o+=X(cx)+' '+Y(cy)+' m ';cmd='L'}
  else if(cmd=='L'){cx=n();cy=n();o+=X(cx)+' '+Y(cy)+' l '}
  else if(cmd=='H'){cx=n();o+=X(cx)+' '+Y(cy)+' l '}
  else if(cmd=='V'){cy=n();o+=X(cx)+' '+Y(cy)+' l '}
  else if(cmd=='C'){var a=n(),b=n(),c1=n(),d=n(),e=n(),f=n();cx=e;cy=f;o+=X(a)+' '+Y(b)+' '+X(c1)+' '+Y(d)+' '+X(e)+' '+Y(f)+' c '}
  else i++}
 var s=(col=='w'?'.05 .05 .04 rg 0 0 '+W+' '+Hh+' re f 1 .965 .91 rg ':''+'.05 .05 .04 rg ')+o+'f';
 var objs=['<</Type/Catalog/Pages 2 0 R>>','<</Type/Pages/Kids[3 0 R]/Count 1>>','<</Type/Page/Parent 2 0 R/MediaBox[0 0 '+W+' '+Hh+']/Contents 4 0 R>>','<</Length '+s.length+'>>\nstream\n'+s+'\nendstream'];
 var out='%PDF-1.4\n',off=[];objs.forEach(function(b,j){off.push(out.length);out+=(j+1)+' 0 obj\n'+b+'\nendobj\n'});
 var x=out.length;out+='xref\n0 5\n0000000000 65535 f \n'+off.map(function(v){return('0000000000'+v).slice(-10)+' 00000 n \n'}).join('')+'trailer\n<</Size 5/Root 1 0 R>>\nstartxref\n'+x+'\n%%EOF';
 return new Blob([out],{type:'application/pdf'})}
function save(b,name){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},800)}
function toast(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},1800)}
function rb(s,fmt,k,c,size){return new Promise(function(res){var url=URL.createObjectURL(new Blob([s],{type:'image/svg+xml'})),im=new Image();
 im.onload=function(){var pd=k=='logo'?mg(size):0,h=Math.round(size+2*pd),w=Math.round((k=='logo'?size*LW/LH:size)+2*pd),cv=document.createElement('canvas');cv.width=w;cv.height=h;var x=cv.getContext('2d');
  if(fmt=='jpg'){x.fillStyle=c=='w'?'#0d0d0b':'#FFF6E8';x.fillRect(0,0,w,h)}
  x.drawImage(im,0,0,w,h);URL.revokeObjectURL(url);cv.toBlob(res,fmt=='jpg'?'image/jpeg':'image/png',.95)};im.src=url})}
var CT=[];for(var n=0;n<256;n++){var cc=n;for(var q=0;q<8;q++)cc=cc&1?0xEDB88320^(cc>>>1):cc>>>1;CT[n]=cc>>>0}
function crc(u){var c=0xFFFFFFFF;for(var i=0;i<u.length;i++)c=CT[(c^u[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0}
function zip(files){var parts=[],cd=[],off=0,enc=new TextEncoder();
 files.forEach(function(f){var nm=enc.encode(f.name),d=f.data,cr=crc(d),h=new DataView(new ArrayBuffer(30));
  h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(12,0x21,true);h.setUint32(14,cr,true);h.setUint32(18,d.length,true);h.setUint32(22,d.length,true);h.setUint16(26,nm.length,true);
  parts.push(h.buffer,nm,d);
  var e=new DataView(new ArrayBuffer(46));e.setUint32(0,0x02014b50,true);e.setUint16(4,20,true);e.setUint16(6,20,true);e.setUint16(14,0x21,true);e.setUint32(16,cr,true);e.setUint32(20,d.length,true);e.setUint32(24,d.length,true);e.setUint16(28,nm.length,true);e.setUint32(42,off,true);
  cd.push(e.buffer,nm);off+=30+nm.length+d.length});
 var cs=0;cd.forEach(function(p){cs+=p.byteLength});
 var en=new DataView(new ArrayBuffer(22));en.setUint32(0,0x06054b50,true);en.setUint16(8,files.length,true);en.setUint16(10,files.length,true);en.setUint32(12,cs,true);en.setUint32(16,off,true);
 return new Blob(parts.concat(cd,[en.buffer]),{type:'application/zip'})}
var SZ={logo:[30,59,89,118],avatar:[1080,512,256,128],app:[1024,512,192,180,120]};
document.addEventListener('click',function(e){var b=e.target.closest('[data-dl]');if(!b)return;
 var f=b.dataset.dl,k=b.dataset.k,c=b.dataset.c,base='befwd-'+(k=='logo'?'logo':k=='avatar'?'social-avatar':'app-icon')+'-'+((k=='logo'?(c=='k'?'ink':'bone'):(c=='k'?'bone-on-ink':'ink-on-bone')));
 if(f=='svg'){save(new Blob([svg(k,c,1000)],{type:'image/svg+xml'}),base+'.svg');toast('Downloading '+base+'.svg')}
 else if(f=='pdf'){save(pdf(c),base+'.pdf');toast('Downloading '+base+'.pdf')}
 else if(f=='png'||f=='jpg'){toast('Preparing '+base+'-'+f+'.zip');
  Promise.all(SZ[k].map(function(s){return rb(svg(k,c,s),f,k,c,s).then(function(bl){return bl.arrayBuffer()}).then(function(ab){return{name:base+'-'+s+(k=='logo'?'px-high':'')+'.'+f,data:new Uint8Array(ab)}})})).then(function(fl){save(zip(fl),base+'-'+f+'.zip')})}});
})();

/* ---------- real margins + resize stability ---------- */
(function(){
var q=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var MARGIN=36;
function setM(card){var m=+card.dataset.m||MARGIN;card.style.setProperty('--M',m+'px');q('.mx',card).forEach(function(s){s.textContent=m+'px'})}
function setCS(card){var el=card.querySelector('.cs2'),ch=card.clientHeight,H=48,L=[120,96,72,48];for(var i=0;i<L.length;i++){if(L[i]+2*mg(L[i])+48<=ch){H=L[i];break}}
 var m=mg(H);el.style.setProperty('--H',H+'px');el.style.setProperty('--m',m+'px');q('b',el).forEach(function(b){b.textContent=m+'px'})}
var ro=new ResizeObserver(function(es){es.forEach(function(e){e.target.dataset.cs?setCS(e.target):setM(e.target)})});
q('.mg').forEach(function(c){ro.observe(c);setM(c)});q('[data-cs]').forEach(function(c){ro.observe(c);setCS(c)});
var doc=document.documentElement,tm=0,anc=null,off=0;
function cap(){var l=q('main>section,main .sh2,main .gp'),i=0;for(;i<l.length;i++){var r=l[i].getBoundingClientRect();if(r.bottom>60){anc=l[i];off=r.top;return}}anc=null}
addEventListener('resize',function(){if(!tm){cap();doc.classList.add('rs')}clearTimeout(tm);tm=setTimeout(function(){if(anc){var r=anc.getBoundingClientRect();scrollBy({top:r.top-off,behavior:'instant'})}doc.classList.remove('rs');tm=0},180)});
})();

/* ---------- in-page links jump straight to the section (no smooth scrolling) ---------- */
(function(){
var doc=document.documentElement;
function go(el){var pad=parseFloat(getComputedStyle(doc).scrollPaddingTop)||0;scrollTo({top:el.getBoundingClientRect().top+scrollY-pad,behavior:'instant'})}
document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a||e.defaultPrevented)return;
 var id=a.getAttribute('href').slice(1),el=id?document.getElementById(id):document.body;if(!el)return;e.preventDefault();
 setTimeout(function(){go(el);history.replaceState(null,'','#'+id)},innerWidth<=1024?60:0)});
})();


/* ---------- Typography examples: measure the real space between text blocks ---------- */
(function(){
  var cards=[].slice.call(document.querySelectorAll('.ts-card'));
  function build(card){
    [].forEach.call(card.querySelectorAll('.ts-gap'),function(n){n.remove()});
    var cr=card.getBoundingClientRect();
    function add(l,t,w,h,txt){var s=document.createElement('span');s.className='ts-gap';
      s.style.cssText='left:'+l+'px;top:'+t+'px;width:'+w+'px;height:'+h+'px';s.innerHTML='<b>'+txt+'</b>';card.appendChild(s)}
    [].forEach.call(card.querySelectorAll('[data-flow]'),function(f){
      var k=[].slice.call(f.children).filter(function(e){return e.offsetParent!==null});
      for(var i=0;i<k.length-1;i++){
        var a=k[i].getBoundingClientRect(),b=k[i+1].getBoundingClientRect(),g=b.top-a.bottom,
            w=Math.min(a.right,b.right)-Math.max(a.left,b.left);
        if(g>=4&&w>8)add(Math.max(a.left,b.left)-cr.left,a.bottom-cr.top,w,g,Math.round(g)+'px');
      }
    });
    var cg=card.querySelector('.colg'),c=card.querySelectorAll('.colg i');
    if(cg&&c.length>1&&c[0].offsetWidth){var g=cg.getBoundingClientRect(),x=c[0].offsetLeft+c[0].offsetWidth,w=c[1].offsetLeft-x;
      add(g.left-cr.left+x,g.top-cr.top,w,Math.min(56,g.height),Math.round(w)+'px')}
  }
  var ro=window.ResizeObserver?new ResizeObserver(function(es){es.forEach(function(e){build(e.target)})}):null;
  function all(){cards.forEach(build)}
  cards.forEach(function(c){if(ro)ro.observe(c);[].forEach.call(c.querySelectorAll('img'),function(i){i.addEventListener('load',function(){build(c)})})});
  all();addEventListener('load',all);addEventListener('resize',all);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(all);
})();

/* ---------- playground ----------
   The preview canvas is flexible (it fills its box). Everything is drawn in a 1500 x 1500 design space,
   so the download is the same picture at exactly 1500 x 1500px. Pitch is a smooth slider, 30 to 300px tiles. */
(function(){
var cv=document.getElementById('pcv');if(!cv)return;
var ctx=cv.getContext('2d'),S=1500,TMIN=30,TMAX=300;
var st={pp:'tp1',v:360,bg:'#FFF6E8',ln:'#0D0D0B'};
var NAMES={tp1:'primary',tp2:'forward'};
function tileW(v){return TMIN*Math.pow(TMAX/TMIN,v/1000)}
/* Lattice: vertices at (95i, 55j) with i+j even, in tile units of a 190 x 110 tile. Same geometry as the gallery tiles. */
function build(kind,tw){
 var u=tw/190,dx=95*u,dy=55*u,I0=-2,I1=Math.ceil(S/dx)+2,J0=-3,J1=Math.ceil(S/dy)+3,d=[],i,j,x,y,f=function(n){return Math.round(n*100)/100};
 for(i=I0;i<=I1;i++)for(j=J0;j<=J1;j++){if((i+j)%2)continue;x=i*dx;y=j*dy;
  if(kind=='tp1'){d.push('M'+f(x)+' '+f(y)+'L'+f(x)+' '+f(y+2*dy)+'M'+f(x)+' '+f(y)+'L'+f(x+dx)+' '+f(y+dy)+'M'+f(x)+' '+f(y)+'L'+f(x+dx)+' '+f(y-dy))}
  else if(kind=='tp2'){d.push('M'+f(x)+' '+f(y)+'L'+f(x)+' '+f(y+2*dy)+'L'+f(x+dx)+' '+f(y+dy)+'Z')}
 }
 return{d:d.join(''),stroke:kind=='tp1',w:6*u}}
function paint(c,px){var tw=tileW(st.v),g=build(st.pp,tw);
 c.setTransform(1,0,0,1,0,0);c.fillStyle=st.bg;c.fillRect(0,0,c.canvas.width,c.canvas.height);
 c.setTransform(px/S,0,0,px/S,0,0);var p=new Path2D(g.d);
 if(g.stroke){c.strokeStyle=st.ln;c.lineWidth=g.w;c.lineJoin='miter';c.stroke(p)}else{c.fillStyle=st.ln;c.fill(p)}}
function svgText(){var g=build(st.pp,tileW(st.v));
 return'<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1500" viewBox="0 0 1500 1500"><rect width="1500" height="1500" fill="'+st.bg+'"/><path d="'+g.d+'" '+(g.stroke?'fill="none" stroke="'+st.ln+'" stroke-width="'+g.w.toFixed(2)+'"':'fill="'+st.ln+'"')+'/></svg>'}
var raf=0;
function size(){var r=cv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),w=Math.max(1,Math.round(r.width*dpr));if(cv.width!==w||cv.height!==w){cv.width=cv.height=w}}
function draw(){raf=0;size();paint(ctx,cv.width);document.getElementById('pout').textContent=Math.round(tileW(st.v))+'px tile'}
function queue(){if(!raf)raf=requestAnimationFrame(draw)}
function mark(sel,key,v){[].forEach.call(document.querySelectorAll(sel),function(b){b.classList.toggle('act',b.dataset[key]===v)})}
function toast(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},1800)}
function save(b,n){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},800)}
document.getElementById('ctl').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
 if(b.dataset.pp){st.pp=b.dataset.pp;mark('[data-pp]','pp',st.pp)}
 else if(b.dataset.bg){if(b.dataset.bg===st.ln.toUpperCase())return;st.bg=b.dataset.bg;mark('[data-bg]','bg',st.bg)}
 else if(b.dataset.ln){if(b.dataset.ln===st.bg.toUpperCase())return;st.ln=b.dataset.ln;mark('[data-ln]','ln',st.ln)}
 else if(b.dataset.px){var f=b.dataset.px,name='befwd-pattern-'+NAMES[st.pp]+'-1500.'+f;
  if(f=='svg'){save(new Blob([svgText()],{type:'image/svg+xml'}),name)}
  else{var o=document.createElement('canvas');o.width=o.height=S;paint(o.getContext('2d'),S);o.toBlob(function(bl){save(bl,name)},f=='jpg'?'image/jpeg':'image/png',.95)}
  toast('Downloading '+name);return}
 queue()});
document.getElementById('pitch').addEventListener('input',function(e){st.v=+e.target.value;queue()});
if(window.ResizeObserver)new ResizeObserver(queue).observe(cv);
addEventListener('resize',queue);addEventListener('load',queue);draw()})();

/* ---------- small screens: tap a card to show or hide its guides ---------- */
(function(){var mq=matchMedia('(max-width:1024px),(hover:none)');
document.addEventListener('click',function(e){if(!mq.matches||e.target.closest('a,button,input,select,label'))return;
 var c=e.target.closest('.hv,.mg,.ts-card');if(c)c.classList.toggle('show')});
})();
