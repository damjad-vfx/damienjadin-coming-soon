(function(){
  function preview(){try{const s=localStorage.getItem('djAdminPreviewContent');return s?JSON.parse(s):null}catch(e){return null}}
  const C=preview()||window.SITE_CONTENT||{};
  window.DJ_CONTENT=C;
  const lang=()=>{try{return localStorage.getItem('dj-lang')||document.documentElement.lang||'fr'}catch(e){return document.documentElement.lang||'fr'}};
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const desc=p=>p&&p.description?(p.description[lang()]||p.description.fr||''):'';
  const visible=a=>(a||[]).filter(p=>p.visible!==false);
  const idx=(prefix,i)=>`${prefix} · ${String(i+1).padStart(2,'0')}`;
  const vimeoId=p=>String(p.vimeo||'').match(/\d+/)?.[0]||'';

  function applyAppearance(){
    const a=C.appearance||{};
    const dark=a.darkBackground||'#050505', light=a.lightBackground||'#ebe9e2', text=a.textOnDark||'#f3f3ef', accent=a.accent||'#f3f3ef';
    document.getElementById('dj-admin-theme')?.remove();
    const style=document.createElement('style');
    style.id='dj-admin-theme';
    style.textContent=`
      :root{--dj-dark:${dark};--dj-light:${light};--dj-text:${text};--dj-accent:${accent};--black:${dark};--paper:${light}}
      body{background-color:var(--dj-dark)}
      .black-section,.films-hub,.contact-section,.project-page,.project-page-main{background-color:var(--dj-dark)!important;color:var(--dj-text)!important}
      .black-section h1,.black-section h2,.black-section h3,.films-hub h1,.films-hub h2,.films-hub h3,.contact-section h1,.contact-section h2,.contact-section h3,.project-page h1,.project-page h2,.project-page h3{color:var(--dj-text)!important}
      .head,.showcase,.about-section,.light-section{background-color:var(--dj-light)!important}
      a:hover,.hero-vfx-cta:hover,.promo-open:hover{color:var(--dj-accent)!important}
    `;
    document.head.appendChild(style);
  }
  applyAppearance();

  function hydrateEditorialPosters(host){
    host.querySelectorAll('.poster[data-vimeo]').forEach(card=>{
      const id=card.dataset.vimeo, img=card.querySelector('.poster-image');
      if(img&&id){
        fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent('https://vimeo.com/'+id)}&width=1280`)
          .then(r=>r.ok?r.json():Promise.reject())
          .then(d=>{if(d.thumbnail_url)img.style.backgroundImage=`url("${d.thumbnail_url}")`})
          .catch(()=>{});
      }
      const play=()=>{
        if(card.classList.contains('playing')||card.classList.contains('is-playing')||!id)return;
        const f=document.createElement('iframe');
        f.src=`https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&badge=0&dnt=1`;
        f.title=card.getAttribute('aria-label')||'Vimeo video';
        f.allow='autoplay; fullscreen; picture-in-picture'; f.allowFullscreen=true;
        card.classList.add('playing','is-playing'); card.appendChild(f);
      };
      card.addEventListener('click',play);
      card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();play()}});
    });
  }
  function renderEditorial(key,prefix){
    const host=document.querySelector('.showcase'); if(!host||!C.projects?.[key]) return;
    host.innerHTML=visible(C.projects[key]).map((p,i)=>`<article class="project" data-project-id="${esc(p.id)}">
      <div class="poster" data-vimeo="${esc(vimeoId(p))}" tabindex="0" role="button" aria-label="Lire ${esc(p.title)}"><div class="poster-image"></div><span class="play"></span></div>
      <div class="copy"><span class="idx">${idx(prefix,i)}</span><h2>${esc(p.title)}</h2><p data-project-desc="${esc(p.id)}">${esc(desc(p))}</p><a href="${esc(p.url||('https://vimeo.com/'+vimeoId(p)))}" target="_blank" rel="noopener" data-i18n="watch" data-dynamic-watch>Voir sur Vimeo</a></div>
    </article>`).join('');
    hydrateEditorialPosters(host);
  }
  function renderPromo(key){
    const host=document.querySelector('.promo-list'); if(!host||!C.projects?.[key]) return;
    host.innerHTML=visible(C.projects[key]).map(p=>{const id=vimeoId(p);return `<article class="promo-project" data-project-id="${esc(p.id)}">
      <div class="promo-video"><iframe src="https://player.vimeo.com/video/${esc(id)}?dnt=1&title=0&byline=0&portrait=0" title="${esc(p.title+(p.year?' - '+p.year:''))}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
      <div class="promo-meta"><h2>${esc(p.title)}</h2>${p.year?`<span class="year">${esc(p.year)}</span>`:''}<a class="promo-open" href="${esc(p.url||('https://vimeo.com/'+id))}" target="_blank" rel="noopener noreferrer" data-i18n="${key==='ai'?'ai.watchVimeo':'promo.watch'}" data-dynamic-watch>Voir sur Vimeo</a></div>
    </article>`}).join('');
  }
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(file==='vfx-work.html') renderEditorial('vfx','VFX');
  if(file==='motion-design.html') renderEditorial('motion','MOTION');
  if(file==='ai-video.html') renderPromo('ai');
  if(file==='clips-promo.html') renderPromo('promo');
  if(file==='cinema.html'&&C.projects?.cinema?.[0]){
    const p=C.projects.cinema[0], id=vimeoId(p), art=document.querySelector('.promo-project');
    if(art){const h=art.querySelector('h2'); if(h)h.textContent=p.title; const y=art.querySelector('.year'); if(y)y.textContent=p.year||''; const f=art.querySelector('iframe'); if(f){f.src=`https://player.vimeo.com/video/${id}?dnt=1&title=0&byline=0&portrait=0`;f.title=p.title+(p.year?' - '+p.year:'')}; const a=art.querySelector('.promo-open'); if(a)a.href=p.url||('https://vimeo.com/'+id);}
  }
  function updateDescriptions(){
    const l=lang();
    document.querySelectorAll('[data-project-desc]').forEach(el=>{
      const id=el.getAttribute('data-project-desc');
      const all=Object.values(C.projects||{}).flat();
      const p=all.find(x=>x.id===id);
      if(p&&p.description) el.textContent=p.description[l]||p.description.fr||'';
    });
  }
  updateDescriptions();
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(updateDescriptions,0)));
  if(file==='index.html'||file===''){
    const first=visible(C.projects?.vfx||[])[0]; const cta=document.querySelector('.hero-vfx-cta'); if(first&&cta)cta.href=first.url||('https://vimeo.com/'+vimeoId(first));
    if(C.site){document.querySelectorAll('a[href^="mailto:"]').forEach(a=>a.href='mailto:'+C.site.email);}
  }
})();
