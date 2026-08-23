(()=>{
  const $id=s=>document.getElementById(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function worker(){try{return typeof currentWorker==='function'?currentWorker():null}catch(e){return null}}
  function makePdf(w){
    const lines=['GIG INDIA','OFFER LETTER','',`Name: ${w.name||''}`,`Worker ID: ${w.id||''}`,`Designation: ${w.post||w.promotion?.post||'Gig Worker'}`,`Date: ${w.offerDate||w.joined||new Date().toLocaleDateString('en-IN')}`,'','Dear '+(w.name||'Worker')+',','','We are pleased to confirm your association with Gig India as a gig worker.','This offer is subject to the terms and conditions of assigned work.','','For Gig India','Great India Technology'];
    const ep=s=>String(s).replace(/\\/g,'\\\\').replace(/[()]/g,m=>'\\'+m);
    let c='BT /F1 13 Tf 60 760 Td 18 TL\\n'; lines.forEach((x,i)=>{if(i)c+='T* ';c+='('+ep(x)+') Tj\\n'}); c+='ET';
    const o=['','<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>','<< /Length '+c.length+' >>\\nstream\\n'+c+'\\nendstream','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
    let p='%PDF-1.4\\n',offs=[]; for(let i=1;i<=5;i++){offs[i]=p.length;p+=i+' 0 obj\\n'+o[i]+'\\nendobj\\n'} const x=p.length; p+='xref\\n0 6\\n0000000000 65535 f \\n'; for(let i=1;i<=5;i++)p+=String(offs[i]).padStart(10,'0')+' 00000 n \\n'; p+='trailer\\n<< /Size 6 /Root 1 0 R >>\\nstartxref\\n'+x+'\\n%%EOF';
    return new Blob([p],{type:'application/pdf'});
  }
  function offerUrl(w){return URL.createObjectURL(makePdf(w))}
  window.viewOfferLetter=async function(){const w=worker();if(!w){alert('Worker session not found.');return}try{let url=null;if(w.offerLetterFileKey&&typeof getTaskFile==='function'){const r=await getTaskFile(w.offerLetterFileKey);if(r)url=URL.createObjectURL(r.blob instanceof Blob?r.blob:new Blob([r.blob],{type:'application/pdf'}))}if(!url)url=offerUrl(w);openModal(`<h2>Offer Letter</h2><iframe src="${url}" style="width:100%;height:65vh;border:1px solid #dbe4ec;border-radius:12px"></iframe><div class="row" style="margin-top:12px"><a class="btn primary" href="${url}" target="_blank" rel="noopener">Open PDF</a><a class="btn" href="${url}" download="Gig-India-Offer-Letter-${esc(w.id)}.pdf">⬇ Download PDF</a><button type="button" class="btn" onclick="closeModal()">Close</button></div>`)}catch(e){alert('Offer Letter could not be opened.')}};
  window.downloadOfferLetter=async function(){const w=worker();if(!w){alert('Worker session not found.');return}try{let url=null,name=`Gig-India-Offer-Letter-${w.id}.pdf`;if(w.offerLetterFileKey&&typeof getTaskFile==='function'){const r=await getTaskFile(w.offerLetterFileKey);if(r){url=URL.createObjectURL(r.blob instanceof Blob?r.blob:new Blob([r.blob],{type:'application/pdf'}));name=r.name||name}}if(!url)url=offerUrl(w);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000)}catch(e){alert('Offer Letter could not be downloaded.')}};
  function addPhotoToProfileModal(){
    const modal=$id('modal'); if(!modal)return;
    const save=[...modal.querySelectorAll('button')].find(b=>/Save Profile/i.test(b.textContent||''));
    if(save && !modal.querySelector('#ephoto')){
      const label=document.createElement('label');label.textContent='Profile Photo';label.style.cssText='display:block;margin:8px 0 5px;font-weight:700';
      const input=document.createElement('input');input.type='file';input.id='ephoto';input.accept='image/*';input.style.width='100%';input.style.padding='10px';
      const note=document.createElement('small');note.textContent='Upload/update photo (max 10 MB).';note.style.cssText='display:block;color:#64748b;margin:3px 0 12px';
      save.parentNode.insertBefore(label,save);save.parentNode.insertBefore(input,save);save.parentNode.insertBefore(note,save);
    }
  }
  function openProfile(){
    const w=worker();if(!w)return;
    if(typeof openModal!=='function')return;
    openModal(`<h2>Edit Worker Profile</h2><input id="epn" placeholder="Full name" value="${esc(w.name)}"><input id="epm" placeholder="Mobile number" value="${esc(w.mobile)}"><input id="epe" type="email" placeholder="Email address" value="${esc(w.email||'')}"><input id="eps" placeholder="Skills" value="${esc(w.skills||'')}"><input id="epl" placeholder="Preferred location" value="${esc(w.location||'')}"><label style="display:block;margin:8px 0 5px;font-weight:700">Profile Photo</label><input id="ephoto" type="file" accept="image/*" style="width:100%;padding:10px"><small style="display:block;color:#64748b;margin:3px 0 12px">Upload/update photo (max 10 MB).</small><button type="button" class="btn primary" style="width:100%" id="giSaveProfile">Save Profile</button>`);
    $id('giSaveProfile').onclick=saveProfile;
  }
  async function saveProfile(){
    const w=worker();if(!w)return;const n=$id('epn')?.value.trim(),m=$id('epm')?.value.trim(),f=$id('ephoto')?.files?.[0]||null;
    if(!n||!m){alert('Name and mobile are required.');return}
    if(typeof workers!=='undefined'&&workers.some(x=>x.mobile===m&&x.id!==w.id)){alert('That mobile number is already registered.');return}
    if(f&&(!f.type.startsWith('image/')||f.size>10*1024*1024)){alert('Please select an image up to 10 MB.');return}
    try{
      if(f&&typeof saveTaskFile==='function'){if(w.photoFileKey&&typeof deleteTaskFile==='function')try{await deleteTaskFile(w.photoFileKey)}catch(e){}w.photoFileKey='WORKER_PHOTO_'+w.id+'_'+Date.now();w.photoFileName=f.name;await saveTaskFile(w.photoFileKey,f)}
      w.name=n;w.mobile=m;w.email=$id('epe')?.value.trim()||'';w.skills=$id('eps')?.value.trim()||'';w.location=$id('epl')?.value.trim()||'India';
      if(typeof setData==='function')setData('workers',workers);closeModal();if(typeof renderWorker==='function')renderWorker();alert('Profile updated successfully.');
    }catch(e){console.error(e);alert('Profile/photo could not be saved.')}
  }
  function enhanceCard(){
    const card=$id('workerIdCard'),w=worker();if(!card||!w)return;
    if(!card.querySelector('[data-gi-final-actions]')){
      const box=document.createElement('div');box.setAttribute('data-gi-final-actions','1');box.style.cssText='margin-top:18px;padding-top:15px;border-top:1px solid #dbe4ec;display:flex;gap:10px;flex-wrap:wrap';
      box.innerHTML='<button type="button" class="btn primary" id="giOfferView">📄 View Offer Letter</button><button type="button" class="btn" id="giOfferDownload">⬇ Download Offer Letter</button><button type="button" class="btn" id="giProfilePhoto">✏ Edit Profile / Photo</button>';
      card.appendChild(box);$id('giOfferView').onclick=window.viewOfferLetter;$id('giOfferDownload').onclick=window.downloadOfferLetter;$id('giProfilePhoto').onclick=openProfile;
    }
    if(w.photoFileKey&&!card.querySelector('[data-gi-photo]')&&typeof getTaskFile==='function')getTaskFile(w.photoFileKey).then(r=>{if(!r)return;const u=URL.createObjectURL(r.blob instanceof Blob?r.blob:new Blob([r.blob],{type:r.type||'image/*'}));const b=card.querySelector('.profileBadge');if(b){b.setAttribute('data-gi-photo','1');b.innerHTML=`<img src="${u}" alt="Worker photo" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`}}).catch(()=>{});
  }
  window.openWorkerProfileEdit=openProfile;window.saveWorkerProfile=saveProfile;
  const mo=new MutationObserver(()=>{addPhotoToProfileModal();enhanceCard()});mo.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('load',()=>{addPhotoToProfileModal();enhanceCard()});
  setInterval(()=>{addPhotoToProfileModal();enhanceCard()},800);
})();