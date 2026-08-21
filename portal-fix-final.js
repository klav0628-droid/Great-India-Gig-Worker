(function(){
'use strict';
function showWorker(){
 try{
  var home=document.getElementById('homeMain'),admin=document.querySelector('.admin'),worker=document.querySelector('.workerPanel');
  if(home) home.style.display='none';
  if(admin) admin.classList.remove('show');
  if(worker) worker.classList.add('show');
  if(typeof window.renderWorker==='function') window.renderWorker();
  var wc=document.getElementById('workerContent');
  if(wc && (!wc.innerHTML.trim() || /Worker Login Successful|Login completed/i.test(wc.innerText||'')) && typeof window.workerDashboard==='function') wc.innerHTML=window.workerDashboard();
 }catch(e){console.error('Gig India worker portal fix:',e)}
}
function showAdmin(){
 try{
  var home=document.getElementById('homeMain'),worker=document.querySelector('.workerPanel'),admin=document.querySelector('.admin');
  if(home) home.style.display='none';
  if(worker) worker.classList.remove('show');
  if(admin) admin.classList.add('show');
  if(typeof window.renderAdmin==='function') window.renderAdmin();
 }catch(e){console.error('Gig India admin portal fix:',e)}
}
function boot(){
 var role=sessionStorage.getItem('gigIndiaRole');
 if(role==='worker'){
  showWorker();
  setTimeout(showWorker,300);
  setTimeout(showWorker,1000);
 }
 if(role==='admin'){
  showAdmin();
  setTimeout(showAdmin,300);
  setTimeout(showAdmin,1000);
 }
 window.gigIndiaOpenWorkerPortal=showWorker;
 window.gigIndiaOpenAdminPortal=showAdmin;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
