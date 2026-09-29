/**
 * Inline script for reveal-on-scroll. Runs in <head> before first paint so
 * elements never flash, works before React hydrates, and needs no client
 * component. Marks `html[data-rv-ready]` (CSS hides `[data-rv]` only then),
 * observes every `[data-rv-root]` / standalone `[data-rv]`, and keeps
 * watching for nodes added by client-side navigation.
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
  var io=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){if(es[i].isIntersecting){es[i].target.setAttribute('data-visible','');io.unobserve(es[i].target);}}
  },{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
  function scan(root){
    var list=root.querySelectorAll?root.querySelectorAll('[data-rv-root],[data-rv]'):[];
    for(var i=0;i<list.length;i++){
      var el=list[i];
      if(el.hasAttribute('data-visible')||el.hasAttribute('data-rv-seen'))continue;
      if(!el.hasAttribute('data-rv-root')&&el.closest('[data-rv-root]'))continue;
      el.setAttribute('data-rv-seen','');
      io.observe(el);
    }
  }
  function start(){scan(d);new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var a=ms[i].addedNodes;for(var j=0;j<a.length;j++){if(a[j].nodeType===1)scan(a[j]);}}}).observe(d.body,{childList:true,subtree:true});}
  if(d.body)start();else d.addEventListener('DOMContentLoaded',start);
})();
`;
