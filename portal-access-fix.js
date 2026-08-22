(function(){
  'use strict';
  function el(tag,attrs,html){var x=document.createElement(tag);attrs=attrs||{};Object.keys(attrs).forEach(function(k){x.setAttribute(k,attrs[k]);});if(html!=null)x.innerHTML=html;return x;}
  function hide(id){var x=document.getElementById(id);if(x)x.style.display='none';}
  function show(id){var x=document.getElementById(id);if(x)x.style.display='block';}
  function closeModal(){var m=document.getElementById('giAccessModal');if(m)m.remove();}
  function openAccess(){
    closeModal();
    var m=el('div',{id:'giAccessModal',style:'position:fixed;inset:0;background:rgba(9,20,32,.65);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;'});
    m.innerHTML='<div style="background:#fff;width:min(460px,100%);border-radius:18px;padding:26px;box-shadow:0 25px 80px rgba(0,0,0,.25);font-family:system-ui"><button id="giClose" style="float:right;border:0;background:#f1f5f9;border-radius:8px;padding:8px;cursor:pointer">✕</button><h2 style="margin:0 0 6px">Gig India Login</h2><p style="color:#64748b;margin-top:0">Choose your portal</p><div style="display:flex;gap:8px;margin:15px 0"><button id="giWorkerTab" style="flex:1;padding:11px;border:1px solid #ff5a1f;background:#ff5a1f;color:#fff;border-radius:9px;font-weight:800">Worker</button><button id="giAdminTab" style="flex:1;padding:11px;border:1px solid #dbe3eb;background:#fff;border-radius:9px;font-weight:800">Admin</button></div><label id="giUserLabel">Worker Mobile / User ID</label><input id="giUser" style="width:100%;box-sizing:border-box;padding:12px;margin:6px 0 12px;border:1px solid #dbe3eb;border-radius:9px;font-size:15px"><label>Password</label><input id="giPass" type="password" style="width:100%;box-sizing:border-box;padding:12px;margin:6px 0 14px;border:1px solid #dbe3eb;border-radius:9px;font-size:15px"><div id="giErr" style="display:none;background:#fff1f2;color:#b91c1c;padding:10px;border-radius:9px;margin-bottom:12px"></div><button id="giSubmit" style="width:100%;padding:13px;border:0;border-radius:10px;background:#ff5a1f;color:#fff;font-weight:850;cursor:pointer">Login</button><p id="giHint" style="font-size:12px;color:#64748b;margin-bottom:0">Worker account credentials are used here.</p></div>';
    document.body.appendChild(m);
    var mode='worker';
    function tab(newMode){mode=newMode;var wt=document.getElementById('giWorkerTab'),at=document.getElementById('giAdminTab');wt.style.background=mode==='worker'?'#ff5a1f':'#fff';wt.style.color=mode==='worker'?'#fff':'#12212f';at.style.background=mode==='admin'?'#ff5a1f':'#fff';at.style.color=mode==='admin'?'#fff':'#12212f';document.getElementById('giUserLabel').textContent=mode==='admin'?'Admin User ID':'Worker Mobile / User ID';document.getElementById('giHint').textContent=mode==='admin'?'Admin credentials: use your configured admin account.':'Worker account credentials are used here.';}
    document.getElementById('giClose').onclick=closeModal;document.getElementById('giWorkerTab').onclick=function(){tab('worker');};document.getElementById('giAdminTab').onclick=function(){tab('admin');};
    document.getElementById('giSubmit').onclick=function(){
      var u=document.getElementById('giUser').value.trim(),p=document.getElementById('giPass').value;
      if(!u||!p){var e=document.getElementById('giErr');e.textContent='Please enter User ID and Password.';e.style.display='block';return;}
      if(mode==='admin'){
        if((u==='9006977016'||u==='admin')&&p==='Lavk@23456'){closeModal();openAdminShell();return;}
        var e2=document.getElementById('giErr');e2.textContent='Invalid admin User ID or password.';e2.style.display='block';return;
      }
      try{localStorage.setItem('gigIndiaLoginUser',u);localStorage.setItem('gigIndiaRole','worker');}catch(_){ }
      closeModal();openWorkerShell(u);
    };
  }
  function openWorkerShell(user){
    hide('homeMain');hide('app');hide('adminPanel');
    var old=document.getElementById('giWorkerShell');if(old)old.remove();
    var w=el('section',{id:'giWorkerShell',style:'display:block;background:#f8fafc;min-height:calc(100vh - 72px);font-family:system-ui;color:#12212f;'});
    w.innerHTML='<div style="background:#fff;border-bottom:1px solid #e7edf3;padding:22px"><div style="max-width:1180px;margin:auto;display:flex;justify-content:space-between;align-items:center"><div><h2 style="margin:0">Worker Dashboard</h2><div style="color:#64748b;margin-top:4px">Logged in as '+String(user).replace(/[<>]/g,'')+'</div></div><button id="giWorkerLogout" style="padding:10px 16px;border:1px solid #dbe3eb;background:#fff;border-radius:9px;font-weight:700">Logout</button></div></div><div style="max-width:1180px;margin:auto;padding:24px"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px"><div class="dashCard" style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>All Gig Opportunities</b><p style="color:#64748b">View available gigs</p></div><div class="dashCard" style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>My Tasks</b><p style="color:#64748b">Assigned and submitted tasks</p></div><div class="dashCard" style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>My Task History</b><p style="color:#64748b">Completed and verified work</p></div><div class="dashCard" style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>Wallet</b><p style="color:#64748b">Balance and withdrawals</p></div><div class="dashCard" style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>ID Card</b><p style="color:#64748b">Worker ID and offer letter</p></div><div class="dashCard" style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>My Projects</b><p style="color:#64748b">Assigned client projects</p></div></div></div>';
    document.body.appendChild(w);document.getElementById('giWorkerLogout').onclick=function(){location.reload();};
  }
  function openAdminShell(){
    hide('homeMain');hide('app');hide('workerPanel');
    var old=document.getElementById('giAdminShell');if(old)old.remove();
    var a=el('section',{id:'giAdminShell',style:'display:block;background:#f8fafc;min-height:calc(100vh - 72px);font-family:system-ui;color:#12212f;'});
    a.innerHTML='<div style="background:#fff;border-bottom:1px solid #e7edf3;padding:22px"><div style="max-width:1180px;margin:auto;display:flex;justify-content:space-between;align-items:center"><div><h2 style="margin:0">Gig India Admin Panel</h2><div style="color:#64748b;margin-top:4px">Manage workers, gigs, tasks, projects, payments and files</div></div><button id="giAdminLogout" style="padding:10px 16px;border:1px solid #dbe3eb;background:#fff;border-radius:9px;font-weight:700">Logout</button></div></div><div style="max-width:1180px;margin:auto;padding:24px"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px"><div style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>Workers</b><p style="color:#64748b">Applications and worker accounts</p></div><div style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>Gigs</b><p style="color:#64748b">Add, edit and assign gigs</p></div><div style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>Tasks</b><p style="color:#64748b">Verify submissions and pay</p></div><div style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>Projects</b><p style="color:#64748b">Assign client projects</p></div><div style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>Withdrawals</b><p style="color:#64748b">Complete worker payments</p></div><div style="background:#fff;border:1px solid #e7edf3;border-radius:14px;padding:18px"><b>Task History</b><p style="color:#64748b">Completed worker tasks</p></div></div></div>';
    document.body.appendChild(a);document.getElementById('giAdminLogout').onclick=function(){location.reload();};
  }
  function addAdminButton(){
    var actions=document.querySelector('.actions');if(!actions||document.getElementById('giAdminAccessBtn'))return;
    var b=el('button',{id:'giAdminAccessBtn',class:'btn',type:'button'},'Admin Login');b.style.borderColor='#12212f';b.style.color='#12212f';b.onclick=openAccess;actions.insertBefore(b,actions.firstChild);
    var footer=document.querySelector('.footer');if(footer&&!document.getElementById('giAdminFooterBtn')){var x=el('button',{id:'giAdminFooterBtn',type:'button'},'Admin Login');x.style='margin-top:12px;padding:8px 12px;border-radius:8px;border:1px solid #475569;background:transparent;color:#cbd5e1;cursor:pointer';x.onclick=openAccess;footer.appendChild(x);}
  }
  window.GigIndiaAccess={open:openAccess,admin:openAdminShell,worker:openWorkerShell};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addAdminButton);else addAdminButton();
  setTimeout(addAdminButton,1000);setTimeout(addAdminButton,3000);
})();
