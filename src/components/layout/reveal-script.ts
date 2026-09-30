/**
 * Inline script for reveal-on-scroll. Runs before hydration so elements never
 * flash, and needs no client component.
 *
 * Behaviour mirrors the reference site: a section becomes "active"
 * (`data-visible`) once it is 200 px inside the viewport (125 px on screens
 * narrower than 1000 px) and is reset when it leaves, so its entrance plays
 * again on re-entry. CSS hides `[data-rv]` only while `html[data-rv-ready]`
 * is set.
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
  var tol=innerWidth>=1000?200:125;
  var io=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){
      var t=es[i].target;
      if(es[i].isIntersecting)t.setAttribute('data-visible','');
      else if(t.hasAttribute('data-visible'))t.removeAttribute('data-visible');
    }
  },{threshold:0,rootMargin:'-'+tol+'px 0px -'+tol+'px 0px'});
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
