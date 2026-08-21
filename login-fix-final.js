(function(){
'use strict';
const SUPABASE_URL='https://pkofzvbdeljsksecbqzg.supabase.co';
const SUPABASE_KEY='sb_publishable_oAYg9uDeIYVHQ829qTMTaQ_pXvhG2Kb';
function box(html){
 let old=document.getElementById('gi-login-overlay'); if(old) old.remove();
 const o=document.createElement('div'); o.id='gi-login-overlay'; o.style='position:fixed;inset:0;background:rgba(15,23,42,.58);z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:18px';
 o.innerHTML='<div style="background:white;width:min(430px,100%);border-radius:18px;padding:24px;box-shadow:0 25px 80px rgba(0,0,0,.25);font-family:Arial,sans-serif"><button id="gi-close" style="float:right;border:0;background:#f1f5f9;border-radius:8px;padding:8px 11px;cursor:pointer">✕</button><h2 id="gi-title" style="margin:0 0 18px">Login</h2><label style="display:block;font-size:13px;font-weight:700;margin:10px 0 5px">User ID / Mobile</label><input id="gi-id" autocomplete="username" style="width:100%;box-sizing:border-box;padding:13px;border:1px solid #dbe3eb;border-radius:10px;font-size:15px"><label style="display:block;font-size:13px;font-weight:700;margin:12px 0 5px">Password</label><input id="gi-pass" type="password" autocomplete="current-password" style="width:100%;box-sizing:border-box;padding:13px;border:1px solid #dbe3eb;border-radius:10px;font-size:15px"><button id="gi-submit" style="width:100%;margin-top:16px;padding:13px;border:0;border-radius:10px;background:#ff5a1f;color:#fff;font-weight:800;font-size:15px;cursor:pointer">Login</button><div id="gi-msg" style="min-height:20px;margin-top:12px;color:#dc2626;font-size:13px"></div></div>';
 document.body.appendChild(o); document.getElementById('gi-close').onclick=()=>o.remove();
}
function open(role){
 box(''); document.getElementById('gi-title').textContent=role==='admin'?'Admin Login':'Worker Login';
 document.getElementById('gi-submit').onclick=()=>login(role);
 document.getElementById('gi-pass').addEventListener('keydown',e=>{if(e.key==='Enter')login(role)});
 setTimeout(()=>document.getElementById('gi-id').focus(),50);
}
async function login(role){
 const id=document.getElementById('gi-id').value.trim(), pass=document.getElementById('gi-pass').value, msg=document.getElementById('gi-msg'), btn=document.getElementById('gi-submit');
 if(!id||!pass){msg.textContent='User ID and password required.';return;}
 btn.disabled=true; btn.textContent='Logging in...'; msg.textContent='';
 try{
  if(role==='admin'){
   if(id!=='9006977016'||pass!=='Lavk@23456') throw new Error('Invalid admin User ID or password.');
   sessionStorage.setItem('gigIndiaRole','admin');
   document.getElementById('gi-login-overlay').remove();
   if(typeof window.setScreen==='function') window.setScreen('admin'); else location.hash='admin';
   if(typeof window.renderAdmin==='function') window.renderAdmin();
   return;
  }
  const r=await fetch(SUPABASE_URL+'/rest/v1/gig_india_state?id=eq.1',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,Accept:'application/json'},cache:'no-store'});
  if(!r.ok) throw new Error('Cloud database error '+r.status);
  const rows=await r.json(), data=rows[0]?.data||{}, workers=Array.isArray(data.workers)?data.workers:[];
  const w=workers.find(x=>String(x.mobile||'').trim()===id && String(x.password||'')===pass);
  if(!w) throw new Error('Invalid worker mobile or password.');
  sessionStorage.setItem('gigIndiaRole','worker'); sessionStorage.setItem('gigIndiaWorkerId',String(w.id||w.workerId||w.mobile||id));
  document.getElementById('gi-login-overlay').remove();
  if(typeof window.setScreen==='function') window.setScreen('worker'); else location.hash='worker';
  if(typeof window.renderWorker==='function') window.renderWorker();
 }catch(e){msg.textContent=e.message||'Login failed.';btn.disabled=false;btn.textContent='Login';}
}
window.openLogin=function(role){open(role||'worker')};
window.gigIndiaDoLogin=login;
function install(){
 document.querySelectorAll('button').forEach(b=>{
  const t=(b.textContent||'').trim();
  if(t==='Login'&&!b.dataset.giLogin){b.dataset.giLogin='1';b.onclick=function(e){e.preventDefault();open('worker');return false};}
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
