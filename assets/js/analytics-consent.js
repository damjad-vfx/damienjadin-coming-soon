/* V38: privacy-first Google Analytics, opt-in only. */
(function(){
'use strict';
var ID='G-BVECSK0LXR', KEY='dj_analytics_consent_v1';
var lang=(document.documentElement.lang||'fr').toLowerCase().slice(0,2);
var strings={
fr:{title:'Statistiques du site',body:'Acceptez-vous les statistiques anonymisées pour nous aider à comprendre les visites du portfolio ? Google Analytics ne sera chargé que si vous acceptez.',accept:'Accepter',decline:'Refuser',settings:'Confidentialité',saved:'Votre choix a été enregistré.'},
en:{title:'Website analytics',body:'Allow analytics to help us understand visits to this portfolio? Google Analytics will only load if you agree.',accept:'Accept',decline:'Decline',settings:'Privacy settings',saved:'Your choice has been saved.'},
es:{title:'Estadísticas del sitio',body:'¿Permites las estadísticas para comprender las visitas al portafolio? Google Analytics solo se cargará si aceptas.',accept:'Aceptar',decline:'Rechazar',settings:'Privacidad',saved:'Tu elección se ha guardado.'}
};var t=strings[lang]||strings.fr;
function read(){try{return localStorage.getItem(KEY)}catch(e){return null}}
function save(v){try{localStorage.setItem(KEY,v)}catch(e){}}
var loaded=false;
function start(){if(loaded)return;loaded=true;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config',ID,{anonymize_ip:true});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ID);document.head.appendChild(s)}
function make(tag,txt){var e=document.createElement(tag);if(txt)e.textContent=txt;return e}
function render(){
var style=make('style');style.textContent='#dj-consent{position:fixed;z-index:2147483645;bottom:18px;left:18px;right:18px;max-width:510px;background:#111;color:#f5f3ee;padding:22px 24px;border:1px solid #555;box-shadow:0 12px 42px #0008;font:14px/1.55 Arial,sans-serif}#dj-consent strong{display:block;font-size:17px;margin-bottom:8px}#dj-consent p{margin:0 0 15px}#dj-consent .dj-actions{display:flex;gap:9px;flex-wrap:wrap}#dj-consent button{font:inherit;cursor:pointer;padding:9px 15px;border:1px solid #aaa;background:#f5f3ee;color:#111}#dj-consent button.dj-no{background:transparent;color:#f5f3ee}#dj-privacy{position:fixed;z-index:2147483644;bottom:10px;right:12px;font:11px Arial,sans-serif;background:#111d;color:#fff;border:1px solid #aaa7;padding:6px 9px;cursor:pointer}';document.head.appendChild(style);
var panel=make('div');panel.id='dj-consent';panel.setAttribute('role','dialog');panel.setAttribute('aria-label',t.title);panel.appendChild(make('strong',t.title));panel.appendChild(make('p',t.body));var actions=make('div');actions.className='dj-actions';var yes=make('button',t.accept),no=make('button',t.decline);no.className='dj-no';actions.appendChild(yes);actions.appendChild(no);panel.appendChild(actions);
function choose(v){save(v);panel.remove();if(v==='accepted')start()}
yes.addEventListener('click',function(){choose('accepted')});no.addEventListener('click',function(){choose('declined')});
var privacy=make('button',t.settings);privacy.id='dj-privacy';privacy.setAttribute('type','button');privacy.addEventListener('click',function(){document.body.appendChild(panel)});document.body.appendChild(privacy);
if(read()===null)document.body.appendChild(panel);
}
if(read()==='accepted')start();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
