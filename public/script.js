document.addEventListener('DOMContentLoaded',()=>{
const cv=document.getElementById('bgCanvas'),ctx=cv?.getContext('2d');
if(cv&&ctx){let mx=0,my=0,dots=[];function rC(){cv.width=innerWidth;cv.height=innerHeight;dots=[];for(let i=0;i<50;i++)dots.push({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*2+1})}
function dB(){ctx.clearRect(0,0,cv.width,cv.height);ctx.strokeStyle='rgba(0,48,135,0.035)';ctx.lineWidth=1;for(let x=0;x<cv.width;x+=26){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,cv.height);ctx.stroke()}for(let y=0;y<cv.height;y+=26){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(cv.width,y);ctx.stroke()}
dots.forEach(d=>{d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>cv.width)d.vx*=-1;if(d.y<0||d.y>cv.height)d.vy*=-1;const dx=d.x-mx,dy=d.y-my,dist=Math.sqrt(dx*dx+dy*dy);if(dist<150){d.x+=dx/dist*1.5;d.y+=dy/dist*1.5}ctx.fillStyle='rgba(0,48,135,0.06)';ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(dB)}
addEventListener('resize',rC);addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});rC();dB()}
const tog=document.querySelector('.nav-toggle'),mm=document.getElementById('mm');
if(tog){tog.addEventListener('click',()=>{tog.classList.toggle('active');mm.classList.toggle('open')});mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{tog.classList.remove('active');mm.classList.remove('open')}))}
let ly=0,navOn=false;const nav=document.getElementById('nav');
addEventListener('scroll',()=>{const y=scrollY,hH=document.getElementById('hero')?.offsetHeight||600;
if(y>hH&&!navOn){navOn=true;nav.classList.remove('nav-hidden');nav.classList.add('nav-visible')}
else if(y<=hH){nav.classList.add('nav-hidden');nav.classList.remove('nav-visible');navOn=false;ly=y;return}
if(navOn)nav.style.transform=y>ly&&y>hH+100?'translateY(-100%)':'translateY(0)';ly=y},{passive:true});
function splitW(el){const t=el.textContent.trim();el.innerHTML=t.split(/\s+/).map(w=>`<span class="word">${w}</span> `).join('')}
document.querySelectorAll('.spl').forEach(splitW);
document.querySelectorAll('.qt[data-split]').forEach(el=>{const t=el.textContent.trim();el.innerHTML=t.split(/\s+/).map(w=>`<span class="word">${w}</span> `).join('')});
const dotsEl=document.getElementById('eyeDots');
if(dotsEl){for(let i=0;i<23;i++){const d=document.createElement('div');d.className='eye-dot';dotsEl.appendChild(d)}}
const wr=document.getElementById('wheelRing');
if(wr){for(let i=0;i<100;i++){const d=document.createElement('div');d.className='wheel-dot';const a=(i/100)*Math.PI*2-Math.PI/2,r=130;d.style.left=(150+Math.cos(a)*r-5)+'px';d.style.top=(150+Math.sin(a)*r-5)+'px';wr.appendChild(d)}}
document.querySelectorAll('.svc-card').forEach(c=>{const block=c.querySelector('.svc-pillar-block'),desc=c.querySelector('.svc-desc');
if(block){const pN=c.dataset.pillar||'',pNm=c.dataset.pname||'',pW=c.dataset.pwhy||'';block.innerHTML=`<div class="svc-pillar-icon">${pN}</div><div class="svc-pillar-info"><div class="svc-pname">${pNm}</div><div class="svc-pwhy">${pW}</div></div>`}
if(desc)desc.textContent=c.dataset.desc||''});
if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined'){
document.querySelectorAll('.fade-in,.tag,.pillar-full,.data-block,.tl-i,.svc-card').forEach(e=>{e.style.opacity='1';e.style.transform='none'});
document.querySelectorAll('.word').forEach(w=>{w.style.opacity='1';w.style.transform='none'});
document.querySelectorAll('.eye-dot').forEach(d=>d.classList.add('vis'));
document.querySelectorAll('.wipe-section').forEach(s=>s.classList.add('revealed'));
nav.classList.remove('nav-hidden');nav.classList.add('nav-visible');initVid();initSearch();return}
gsap.registerPlugin(ScrollTrigger);
const ht=gsap.timeline({defaults:{ease:'power3.out'}});
ht.to('.hl',{opacity:1,y:0,duration:.6,stagger:.1},.3).to('.hero-sub',{opacity:1,y:0,duration:.7},.7).to('.hero-tag',{opacity:1,y:0,duration:.5},.9).to('.scroll-cue',{opacity:1,y:0,duration:.4},1.1);
document.querySelectorAll('.hl').forEach((l,i)=>{gsap.to(l,{y:-50*(i+1),opacity:0,scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1}})});
const wD=document.querySelectorAll('.wheel-dot'),wN=document.getElementById('wheelNum'),wL=document.getElementById('wheelLbl'),wC=document.getElementById('wheelCap');
if(wD.length&&wN){ScrollTrigger.create({trigger:'#wheel-section',start:'top top',end:'bottom bottom',pin:'.wheel-pin-area',scrub:true,
onUpdate:s=>{const p=s.progress,rem=Math.max(Math.round(100-84*Math.min(p*1.4,1)),16);wN.textContent=rem;const gone=100-rem;
wD.forEach((d,i)=>{if(i<gone)d.classList.add('gone');else d.classList.remove('gone')});
if(p<.2){wL.textContent='students in 8th grade';wC.style.opacity='0'}
else if(p<.5){wL.textContent='still enrolled';wC.textContent='Two years pass.';wC.style.opacity='1'}
else{wL.textContent='made it to a 10th grade seat';wC.textContent='84% dropped out before 10th grade.';wC.style.opacity='1'}}})}
document.querySelectorAll('.tag').forEach(t=>{gsap.to(t,{opacity:1,x:0,duration:.5,ease:'power2.out',scrollTrigger:{trigger:t,start:'top 88%',once:true}})});
document.querySelectorAll('.spl').forEach(el=>{const ws=el.querySelectorAll('.word');if(ws.length)gsap.to(ws,{opacity:1,y:0,duration:.35,stagger:.025,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 82%',once:true}})});
document.querySelectorAll('.fade-in').forEach(el=>{gsap.to(el,{opacity:1,y:0,duration:.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}})});
document.querySelectorAll('.eg-fill').forEach(b=>{const h=+b.dataset.h;ScrollTrigger.create({trigger:'#crisis',start:'top 70%',once:true,onEnter:()=>{b.style.height=(h/100*200)+'px'}})});
const hw=document.getElementById('unconst');if(hw)ScrollTrigger.create({trigger:hw,start:'top 75%',once:true,onEnter:()=>hw.classList.add('active')});
document.querySelectorAll('.wipe-section').forEach(s=>{ScrollTrigger.create({trigger:s,start:'top 60%',once:true,onEnter:()=>s.classList.add('revealed')})});
const twEl=document.getElementById('twText');
if(twEl){let done=false;ScrollTrigger.create({trigger:'#typewriter',start:'top 70%',once:true,onEnter:()=>{if(done)return;done=true;const s='What do you need your school to be?';let i=0;twEl.textContent='';const iv=setInterval(()=>{if(i>=s.length){clearInterval(iv);return}twEl.textContent+=s[i];i++},50)}})}
// QUOTES — staggered word reveal (no pin)
document.querySelectorAll('.qsec').forEach(sec=>{const ws=sec.querySelectorAll('.qt .word');if(!ws.length)return;
gsap.to(ws,{opacity:1,duration:.3,stagger:.04,ease:'power2.out',scrollTrigger:{trigger:sec,start:'top 60%',once:true}})});
// SERVICES — horizontal scroll
const svcTrack=document.querySelector('.svc-track');
if(svcTrack){const getW=()=>svcTrack.scrollWidth-innerWidth+100;
gsap.to(svcTrack,{x:()=>-getW(),ease:'none',scrollTrigger:{trigger:'#services',start:'top top',end:()=>`+=${getW()}`,pin:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1}})}
// TIMELINE — horizontal scroll
const tlTrack=document.querySelector('.tl-track'),tlItems=document.querySelectorAll('.tl-i');
if(tlTrack&&tlItems.length){const getW=()=>tlTrack.scrollWidth-innerWidth;
const tlA=gsap.to(tlTrack,{x:()=>-getW(),ease:'none',
scrollTrigger:{trigger:'#oyler-timeline',start:'top top',end:()=>`+=${getW()+innerWidth*.4}`,pin:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1}});
tlItems.forEach(it=>{gsap.to(it,{opacity:1,y:0,duration:.5,ease:'power2.out',
scrollTrigger:{trigger:it,containerAnimation:tlA,start:'left 85%',once:true,
onEnter:()=>{const c=it.querySelector('.ctr');if(c&&!c.dataset.a){c.dataset.a='1';animC(c,+c.dataset.t)}}}})});
const fill=document.querySelector('.tl-line-fill');
if(fill)gsap.to(fill,{width:'100%',ease:'none',scrollTrigger:{trigger:'#oyler-timeline',start:'top top',end:()=>`+=${getW()+innerWidth*.4}`,scrub:1}})}
const eyeD=document.querySelectorAll('.eye-dot');
if(eyeD.length){ScrollTrigger.create({trigger:'#eye-test',start:'top 65%',once:true,onEnter:()=>{eyeD.forEach(d=>d.classList.add('vis'));setTimeout(()=>{for(let i=0;i<18;i++)eyeD[i].classList.add('glasses')},400)}})}
document.querySelectorAll('.pillar-full').forEach(p=>{gsap.to(p,{opacity:1,duration:.7,ease:'power2.out',scrollTrigger:{trigger:p,start:'top 70%',once:true}})});
document.querySelectorAll('.data-block').forEach(d=>{gsap.to(d,{opacity:1,y:0,duration:.7,ease:'power3.out',scrollTrigger:{trigger:d,start:'top 80%',once:true}})});
document.querySelectorAll('.cb').forEach(b=>{const h=b.dataset.h;ScrollTrigger.create({trigger:b.closest('.data-block')||b.parentElement,start:'top 78%',once:true,onEnter:()=>{b.style.height=(h/100*160)+'px'}})});
document.querySelectorAll('.hbar-f').forEach(b=>{const w=b.dataset.w;ScrollTrigger.create({trigger:b.closest('.data-block')||b.parentElement,start:'top 78%',once:true,onEnter:()=>{b.style.width=w+'%'}})});
document.querySelectorAll('.nr .ctr').forEach(c=>{ScrollTrigger.create({trigger:c,start:'top 82%',once:true,onEnter:()=>animC(c,+c.dataset.t)})});
const tsC=document.querySelector('.ts-num .ctr');if(tsC)ScrollTrigger.create({trigger:'.tension-stat',start:'top 75%',once:true,onEnter:()=>animC(tsC,+tsC.dataset.t)});
document.querySelectorAll('#ending .ctr').forEach(c=>{ScrollTrigger.create({trigger:c,start:'top 75%',once:true,onEnter:()=>animC(c,+c.dataset.t)})});
function animC(el,target){const s=+el.textContent||0,dur=target>100?2200:1400,t0=performance.now();
!function tick(now){const p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(s+(target-s)*e);if(p<1)requestAnimationFrame(tick)}(performance.now())}
initVid();initSearch()});
function initVid(){const v=document.getElementById('vid'),o=document.getElementById('vidOv'),b=document.getElementById('playBtn');
if(!v||!o)return;const play=()=>{v.play();o.classList.add('hidden')};b.addEventListener('click',play);o.addEventListener('click',play);
v.addEventListener('pause',()=>{if(!v.ended)o.classList.remove('hidden')});v.addEventListener('play',()=>o.classList.add('hidden'));v.addEventListener('ended',()=>o.classList.remove('hidden'))}
function initSearch(){const inp=document.getElementById('sI'),btn=document.getElementById('sB'),res=document.getElementById('sR'),err=document.getElementById('sE');
if(!inp||!btn)return;const bt=btn.querySelector('.sbt'),bl=btn.querySelector('.sbl');
function setL(on){btn.disabled=on;bt.style.display=on?'none':'inline';bl.style.display=on?'flex':'none'}
async function go(){const q=inp.value.trim();if(!q)return;setL(true);res.innerHTML='';err.style.display='none';
try{const r=await fetch('/api/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:q})});const d=await r.json();
if(d.error){err.textContent=d.error;err.style.display='block';setL(false);return}
if(d.raw){res.innerHTML=`<div class="org-card"><p>${esc(d.raw)}</p></div>`;setL(false);return}
renderR(d,res)}catch(e){err.textContent='Check server and API key.';err.style.display='block'}setL(false)}
btn.addEventListener('click',go);inp.addEventListener('keydown',e=>{if(e.key==='Enter')go()});
document.querySelectorAll('.sg').forEach(s=>s.addEventListener('click',()=>{inp.value=s.dataset.q;go()}))}
const PN={1:'Integrated Student Supports',2:'Expanded Learning Time & Opportunities',3:'Family & Community Engagement',4:'Collaborative Leadership & Practice'};
function renderR(d,c){
  let h='';if(d.school_name)h+=`<div class="results-school-name">Results for: ${esc(d.school_name)}</div>`;
  const g={1:[],2:[],3:[],4:[]};(d.organizations||[]).forEach(o=>{(g[o.pillar]||g[1]).push(o)});
  for(const[p,os]of Object.entries(g)){if(!os.length)continue;
    h+=`<div style="margin-bottom:2rem"><h3 style="font-family:var(--display);font-size:1rem;color:var(--blue);margin-bottom:.8rem">Pillar ${p}: ${PN[p]}</h3>`;
    os.forEach(o=>{h+=`<div style="margin-bottom:.8rem;padding-left:1rem;border-left:2px solid var(--gold)"><strong style="font-size:.9rem;color:var(--text)">${esc(o.name)}</strong><p style="font-size:.82rem;color:var(--text2);margin-top:.15rem;line-height:1.5">${esc(o.relevance||o.description)}</p></div>`});
    h+=`</div>`}
  if(!h)h='<p style="color:var(--text3)">No organizations found.</p>';c.innerHTML=h;
  c.querySelectorAll('div[style*="border-left"]').forEach((cd,i)=>{cd.style.opacity='0';cd.style.transform='translateX(-10px)';setTimeout(()=>{cd.style.transition='opacity .4s,transform .4s';cd.style.opacity='1';cd.style.transform='translateX(0)'},i*60)})}
function esc(s){if(!s)return'';const d=document.createElement('div');d.textContent=s;return d.innerHTML}
