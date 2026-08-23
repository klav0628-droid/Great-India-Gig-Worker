(()=>{
  function addIdCardButtons(){
    const card=document.getElementById('workerIdCard')||document.getElementById('worker-idcard');
    if(!card) return;
    if(!card.querySelector('[data-offer-visible]')){
      const box=document.createElement('div');
      box.setAttribute('data-offer-visible','1');
      box.style.cssText='margin-top:18px;padding-top:15px;border-top:1px solid #dbe4ec;display:flex;gap:10px;flex-wrap:wrap';
      box.innerHTML='<button type="button" class="btn primary" id="offerViewBtn">📄 View Offer Letter</button><button type="button" class="btn" id="offerDownloadBtn">⬇ Download Offer Letter</button><button type="button" class="btn" id="profileEditBtn">✏ Edit Profile / Photo</button>';
      card.appendChild(box);
      const v=box.querySelector('#offerViewBtn'),d=box.querySelector('#offerDownloadBtn'),p=box.querySelector('#profileEditBtn');
      v.onclick=()=>{if(typeof window.viewOfferLetter==='function')window.viewOfferLetter();else alert('Please refresh and try again.');};
      d.onclick=()=>{if(typeof window.downloadOfferLetter==='function')window.downloadOfferLetter();else if(typeof window.viewOfferLetter==='function')window.viewOfferLetter();else alert('Please refresh and try again.');};
      p.onclick=()=>{if(typeof window.openWorkerProfileEdit==='function')window.openWorkerProfileEdit();else alert('Profile editor is loading. Please refresh and try again.');};
    }
  }
  window.addEventListener('load',addIdCardButtons);
  document.addEventListener('DOMContentLoaded',addIdCardButtons);
  const mo=new MutationObserver(addIdCardButtons);mo.observe(document.body,{childList:true,subtree:true});
  setInterval(addIdCardButtons,1000);
})();