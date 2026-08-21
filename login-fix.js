(function(){
  'use strict';
  const SUPABASE_URL='https://pkofzvbdeljsksecbqzg.supabase.co';
  const SUPABASE_KEY='sb_publishable_oAYg9uDeIYVHQ829qTMTaQ_pXvhG2Kb';
  function show(html){let m=document.getElementById('loginFixModal');if(!m){m=document.createElement('div');m.id='loginFixModal';m.style.cssText='position:fixed;inset:0;background:#0b172099;display:flex;align-items:center;justify-content:center;padding:20px;z-index:99999';m.innerHTML='<div id="loginFixBox" style="background:#fff;border-radius:20px;padding:28px;max-width:470px;width:100%;max-height:90vh;overflow:auto;box-shadow:0 20px 70px #0003"></div>';document.body.appendChild(m)}document.getElementById('loginFixBox').innerHTML=html}
  function close(){document.getElementById('loginFixModal')?.remove();try{window.closeModal?.()}catch(e){}}
  function loginBox(role){
    show('<button id="giClose" style="float:right;border:0;background:#f1f5f9;border-radius:8px;padding:7px">✕</button><h2 style="margin-top:0">'+(role==='admin'?'Admin Login':'Worker Login')+'</h2><input id="giId" placeholder="'+(role==='admin'?'User ID':'Mobile number')+'" style="width:100%;box-sizing:border-box;padding:13px;border:1px solid #dbe3eb;border-radius:10px;margin:7px 0 12px;font:inherit"><input id="giPass" type="password" placeholder="Password" style="width:100%;box-sizing:border-box;padding:13px;border:1px solid #dbe3eb;border-radius:10px;margin:7px 0 12px;font:inherit"><button id="giSubmit" class="btn primary" style="width:100%" type="button">Login</button><div id="giMsg" style="margin-top:12px;color:#dc2626;font-size:13px"></div>');
    document.getElementById('giClose').onclick=close;document.getElementById('giSubmit').onclick=()=>doLogin(role);
  }
  async function doLogin(role){
    const id=(document.getElementById('giId')?.value||'').trim(), pass=document.getElementById('giPass')?.value||'', msg=document.getElementById('giMsg'), btn=document.getElementById('giSubmit');
    if(!id||!pass){msg.textContent='User ID/Mobile and password are required.';return}
    btn.disabled=true;btn.textContent='Logging in...';
    if(role==='admin'){
      if(id==='9006977016'&&pass==='Lavk@23456'){
        close();
        try{if(typeof window.doLogin==='function'){const old=window.openLogin;window.doLogin('admin');return}}catch(e){}
        document.getElementById('homeMain').style.display='none';document.getElementById('adminApp').classList.add('show');try{window.renderAdmin?.()}catch(e){}
      }else{msg.textContent='Invalid admin User ID or password.';btn.disabled=false;btn.textContent='Login'}
      return;
    }
    try{
      const r=await fetch(SUPABASE_URL+'/rest/v1/gig_india_state?id=eq.1',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,Accept:'application/json'}});
      if(!r.ok)throw new Error('Cloud '+r.status);
      const rows=await r.json(),data=rows[0]?.data||{},w=(data.workers||[]).find(x=>String(x.mobile)===id&&String(x.password)===pass);
      if(!w){msg.textContent='Invalid worker mobile or password.';btn.disabled=false;btn.textContent='Login';return}
      localStorage.setItem('gig_india_state',JSON.stringify(data));sessionStorage.setItem('gig_india_autologin',JSON.stringify({mobile:w.mobile,password:w.password}));close();location.reload();
    }catch(e){msg.textContent='Worker login service unavailable. Please try again.';btn.disabled=false;btn.textContent='Login'}
  }
  function wire(){
    window.openLogin=function(role){loginBox(role||'worker')};
    document.querySelectorAll('.actions .btn').forEach(function(b){const t=(b.textContent||'').trim();if(t==='Login'){b.onclick=function(e){e.preventDefault();loginBox('worker')}}});
    const pending=sessionStorage.getItem('gig_india_autologin');
    if(pending){setTimeout(function(){try{const x=JSON.parse(pending);if(typeof window.openLogin==='function'){window.openLogin('worker');setTimeout(function(){document.getElementById('giId').value=x.mobile;document.getElementById('giPass').value=x.password;document.getElementById('giSubmit').click();sessionStorage.removeItem('gig_india_autologin')},250)}}catch(e){sessionStorage.removeItem('gig_india_autologin')}},1500)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
})();
