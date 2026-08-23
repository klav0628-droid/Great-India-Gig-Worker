(()=>{
'use strict';
function unlockTaskFields(){
 document.querySelectorAll('#workerTaskList textarea,#workerTaskList input[type="text"],#workerTaskList input[type="tel"],#workerTaskList input[type="file"]').forEach(el=>{el.disabled=false;el.readOnly=false;el.removeAttribute('disabled');el.removeAttribute('readonly');el.style.pointerEvents='auto';el.style.userSelect='text';el.style.cursor=el.type==='file'?'pointer':'text';el.style.position='relative';el.style.zIndex='2';});
 document.querySelectorAll('#workerTaskList input[type="file"]').forEach(el=>{if(el.dataset.giBound)return;el.dataset.giBound='1';el.addEventListener('change',()=>{el.title=el.files&&el.files[0]?el.files[0].name:'';});});
}
function restoreDrafts(){document.querySelectorAll('#workerTaskList textarea[id^="tasknote_"]').forEach(el=>{if(el.dataset.giDraft)return;el.dataset.giDraft='1';const k='gi_task_draft_'+el.id;try{const v=sessionStorage.getItem(k);if(v&&!el.value)el.value=v;}catch(e){}el.addEventListener('input',()=>{try{sessionStorage.setItem(k,el.value);}catch(e){}});});}
function watch(){unlockTaskFields();restoreDrafts();}
document.addEventListener('DOMContentLoaded',watch);window.addEventListener('load',watch);setInterval(watch,700);
})();