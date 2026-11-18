(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu');document.body.style.overflow=''}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');document.body.style.overflow=o?'hidden':''});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  var tk=false;function sc(){if(tk)return;tk=true;requestAnimationFrame(function(){top.classList.toggle('sc',window.pageYOffset>20);tk=false})}
  addEventListener('scroll',sc,{passive:true});sc();

  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var t=document.querySelector(l.getAttribute('href'));if(t)io.observe(t)});
    io.observe(document.getElementById('start'));
    var mob=document.getElementById('mob');
    new IntersectionObserver(function(es){mob.classList.toggle('widac',!es[0].isIntersecting&&es[0].boundingClientRect.top<0)},{threshold:0}).observe(document.querySelector('.hero .btn'));
  }

  function przeciagaj(el,krok){
    var down=false,sx=0,sl=0,moved=false;
    el.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||el.scrollWidth<=el.clientWidth+2)return;down=true;moved=false;sx=e.clientX;sl=el.scrollLeft;e.stopPropagation()});
    addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;el.classList.add('drag');el.style.scrollSnapType='none'}el.scrollLeft=sl-dx});
    addEventListener('pointerup',function(){if(!down)return;down=false;el.classList.remove('drag');if(moved){var w=krok();var t=Math.round(el.scrollLeft/w)*w;el.style.scrollSnapType='';el.scrollTo({left:t,behavior:'smooth'})}setTimeout(function(){moved=false},0)});
    el.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
    el.addEventListener('dragstart',function(e){e.preventDefault()});
  }

  var pas=document.getElementById('pas');
  if(pas){
    var pk=function(){var k=pas.children[0];return k.getBoundingClientRect().width+parseFloat(getComputedStyle(pas).columnGap||0)};
    przeciagaj(pas,pk);
    var nav=document.querySelector('[data-nav="pas"]'),bs=nav.querySelectorAll('button');
    bs.forEach(function(b){b.addEventListener('click',function(){pas.scrollBy({left:pk()*(+b.dataset.k),behavior:'smooth'})})});
    var upd=function(){bs[0].disabled=pas.scrollLeft<4;bs[1].disabled=pas.scrollLeft+pas.clientWidth>=pas.scrollWidth-4};
    pas.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
  }

  document.querySelectorAll('[data-tor]').forEach(function(tor){
    var fot=tor.parentNode,l=fot.querySelector('.st.l'),r=fot.querySelector('.st.r'),lc=fot.querySelector('.licz'),n=tor.children.length;
    var kw=function(){return tor.clientWidth};
    przeciagaj(tor,kw);
    function upd(){var i=Math.round(tor.scrollLeft/kw());lc.textContent=(i+1)+'/'+n;l.disabled=i<=0;r.disabled=i>=n-1}
    l.addEventListener('click',function(){tor.scrollBy({left:-kw(),behavior:'smooth'})});
    r.addEventListener('click',function(){tor.scrollBy({left:kw(),behavior:'smooth'})});
    tor.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});upd();
  });

  var lb=document.getElementById('lb'),li=lb.querySelector('img'),lp=lb.querySelector('p'),cur=0,last=null,grp=[];
  function pokaz(i){
    cur=(i+grp.length)%grp.length;var b=grp[cur],im=b.querySelector('img');
    li.src=im.currentSrc||im.src;li.alt=im.alt;
    var big=b.dataset.lb;if(big&&big!==li.src){var pre=new Image();pre.onload=function(){if(grp[cur]===b)li.src=big};setTimeout(function(){pre.src=big},150)}
    lp.textContent=im.alt+'  ('+(cur+1)+'/'+grp.length+')';
    var multi=grp.length>1;lb.querySelector('.p').hidden=!multi;lb.querySelector('.n').hidden=!multi;
  }
  document.querySelectorAll('[data-lb]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();last=b;var g=b.closest('[data-grupa]');grp=[].slice.call((g||document).querySelectorAll('[data-lb]'));pokaz(grp.indexOf(b));lb.classList.add('otw');document.body.style.overflow='hidden';lb.querySelector('.x').focus()})});
  function zam(){lb.classList.remove('otw');document.body.style.overflow='';li.removeAttribute('src');if(last)last.focus()}
  lb.querySelector('.x').addEventListener('click',zam);
  lb.querySelector('.p').addEventListener('click',function(){pokaz(cur-1)});
  lb.querySelector('.n').addEventListener('click',function(){pokaz(cur+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)zam()});
  var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50&&grp.length>1)pokaz(cur+(d<0?1:-1))});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){if(lb.classList.contains('otw'))zam();else zamknij()}
    if(!lb.classList.contains('otw'))return;
    if(e.key==='ArrowRight')pokaz(cur+1);if(e.key==='ArrowLeft')pokaz(cur-1);
  });

  var f=document.getElementById('form'),msg=document.getElementById('msg');
  f.addEventListener('submit',function(e){
    e.preventDefault();var ok=true;
    [].forEach.call(f.querySelectorAll('[required]'),function(i){var v=i.type==='checkbox'?(i.checked?'1':''):i.value.trim();var bad=!v;i.setAttribute('aria-invalid',bad);if(bad&&ok){ok=false;i.focus()}});
    var em=f.querySelector('[type=email]');if(em.value&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value)){em.setAttribute('aria-invalid','true');if(ok)em.focus();ok=false}
    if(!ok)return;msg.hidden=false;f.reset();
  });
})();
