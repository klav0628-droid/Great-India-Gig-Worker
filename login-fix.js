(function(){
  const SUPABASE_URL='https://pkofzvbdeljsksecbqzg.supabase.co';
  const SUPABASE_KEY='sb_publishable_oAYg9uDeIYVHQ829qTMTaQ_pXvhG2Kb';
  function esc(s){return String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));}
  function modal(html){
    let m=document.getElementById('modal');
    if(!m){m=document.createElement('div');m.id='loginFixModal';m.style.cssText='position:fixed;inset:0;background:#0b172099;display:flex;align-items:center;justify-content:center;padding:20px;z-index:99999';m.innerHTML='<div id="loginFixBox" style="background:#fff;border-radius:20px;padding:28px;max-width:470px;width:100%;max-height:90vh;overflow:auto;box-shadow:0 20px 70px #0003"></div>';document.body.appendChild(m);}
    else {m=document.getElementById('loginFixModal');}
    document.getElementById('loginFixBox').innerHTML=html;
  }
  function closeFix(){const m=document.getElementById('loginFixModal');if(m)m.remove();if(typeof window.closeModal==='function')try{window.closeModal()}catch(e){}}
  window.openLogin=window.openLogin||function(role){
    modal('<button onclick="document.getElementById(\'loginFixModal\').remove()" style="float:right;border:0;background:#f1f5f9;border-radius:8px;padding:7px">✕</button><h2 style="margin-top:0">'+(role==='admin'?'Admin Login':'Worker Login')+'</h2><input id="loginFixId" placeholder="User ID / Mobile" style="width:100%;padding:13px;border:1px solid #dbe3eb;border-radius:10px;margin:7px 0 12px;font:inherit"><input id="loginFixPass" type="password" placeholder="Password" style="width:100%;padding:13px;border:1px solid #dbe3eb;border-radius:10px;margin:7px 0 12px;font:inherit"><button id="loginFixSubmit" class="btn primary" style="width:100%" type="button">Login</button>'+(role==='worker'?'<p style="font-size:13px;color:#64748b;margin-top:14px">New worker? Use <b>Join as Gig Worker</b> on the home page.</p>':'')+'<div id="loginFixMsg" style="margin-top:12px;color:#dc2626;font-size:13px"></div>');
    document.getElementById('loginFixSubmit').onclick=function(){window.gigIndiaDoLogin(role)};
  };
  window.gigIndiaDoLogin=async function(role){
    const id=(document.getElementById('loginFixId')?.value||'').trim();
    const pass=document.getElementById('loginFixPass')?.value||'';
    const msg=document.getElementById('loginFixMsg');
    if(!id||!pass){if(msg)msg.textContent='User ID and password are required.';return;}
    if(role==='admin'){
      if(id==='9006977016'&&pass==='Lavk@23456'){
        closeFix();
        try{if(typeof window.setScreen==='function')window.setScreen('admin');if(typeof window.renderAdmin==='function')window.renderAdmin();else showFallback('Admin Login Successful','The main dashboard script did not load. Refresh once to load the full Admin Panel.');}catch(e){showFallback('Admin Login Successful','Please refresh the page once to load the full Admin Panel.');}
      }else if(msg)msg.textContent='Invalid admin User ID or password.';
      return;
    }
    try{
      const r=await fetch(SUPABASE_URL+'/rest/v1/gig_india_state?id=eq.1',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,Accept:'application/json'}});
      if(!r.ok)throw new Error('Cloud database unavailable');
      const rows=await r.json(); const data=rows[0]?.data||{}; const w=(data.workers||[]).find(x=>String(x.mobile)===id&&String(x.password)===pass);
      if(!w){if(msg)msg.textContent='Invalid worker mobile or password.';return;}
      closeFix();
      try{if(typeof window.setScreen==='function')window.setScreen('worker');if(typeof window.renderWorker==='function')window.renderWorker();else showFallback('Worker Login Successful','Worker account found. Refresh once to load the full Worker Panel.');}catch(e){showFallback('Worker Login Successful','Worker account found. Refresh once to load the full Worker Panel.');}
    }catch(e){if(msg)msg.textContent='Login service is temporarily unavailable. Please try again.';}
  };
  function showFallback(title,text){modal('<h2>'+esc(title)+'</h2><p>'+esc(text)+'</p><button class="btn primary" style="width:100%" onclick="location.reload()">Refresh</button>');}
  function wire(){
    document.querySelectorAll('.actions .btn').forEach(function(b){
      if((b.textContent||'').trim()==='Login'){b.addEventListener('click',function(e){e.preventDefault();window.openLogin('worker');});}
      if((b.textContent||'').trim()==='Join as Gig Worker'){b.addEventListener('click',function(e){if(typeof window.openWorkerSignup!=='function'){e.preventDefault();modal('<h2>Create Worker Account</h2><p>The signup module is loading. Please refresh the page once.</p>');}});}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
})();
