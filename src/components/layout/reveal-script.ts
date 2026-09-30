/**
 * Inline script for reveal-on-scroll. Runs before hydration so elements never
 * flash, and needs no client component.
 *
 * A section becomes "active" (`data-visible`) once its top crosses a line a
 * little above the bottom of the viewport (15 % of its height, capped at
 * 200 px). It is reset only when it drops back below the viewport, so the
 * entrance replays when you scroll down to it again, but content you have
 * scrolled past never fades out or leaves holes at the top of the screen.
 * CSS hides `[data-rv]` only while `html[data-rv-ready]` is set.
 *
 * Skipped entirely under prefers-reduced-motion or the low-data toggle, so
 * content simply renders visible.
 */
export const revealScript = `
(function(){
  var d=document,h=d.documentElement;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  try{if(localStorage.getItem('upsure:motion')==='off')return;}catch(e){}
  h.setAttribute('data-rv-ready','');
  var tol=Math.round(Math.min(innerWidth>=1000?200:125,innerHeight*0.15));
  var io=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){
      var e=es[i],t=e.target;
      if(e.isIntersecting)t.setAttribute('data-visible','');
      else if(e.boundingClientRect.top>0&&t.hasAttribute('data-visible'))t.removeAttribute('data-visible');
    }
  },{threshold:0,rootMargin:'0px 0px -'+tol+'px 0px'});
  function scan(root){
    var list=root.querySelectorAll?root.querySelectorAll('[data-rv-root],[data-rv]'):[];
    for(var i=0;i<list.length;i++){
      var el=list[i];
      if(el.hasAttribute('data-rv-seen'))continue;
      if(!el.hasAttribute('data-rv-root')&&el.closest('[data-rv-root]'))continue;
      el.setAttribute('data-rv-seen','');
      io.observe(el);
    }
  }
  function start(){scan(d);new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++){if(a[j].nodeType===1)scan(a[j]);}}}).observe(d.body,{childList:true,subtree:true});}
  if(d.body)start();else d.addEventListener('DOMContentLoaded',start);
})();
`;
