const STORAGE_KEY="cleanCampusData";
let data=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{"users":[],"reports":[]}');
let currentUser=JSON.parse(sessionStorage.getItem("cleanCampusUser")||"null");
const $=id=>document.getElementById(id);
function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}
function toast(message){$("toast").textContent=message;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2000);}
function showApp(){
  $("auth").classList.add("hidden");$("app").classList.remove("hidden");$("logout").classList.remove("hidden");
  render();
}
function render(){
  $("report-count").textContent=data.reports.length;
  $("people-count").textContent=data.users.length;
  const reports=[...data.reports].reverse();
  $("reports-list").innerHTML=reports.length?reports.map(r=>`<article class="report-card"><div><strong>${escapeHTML(r.type)}</strong><p>${escapeHTML(r.location)} · Reported by ${escapeHTML(r.name)}</p><p>${escapeHTML(r.description)}</p></div><span class="tag">Submitted</span></article>`).join(""):"<p class='muted'>No reports yet. Be the first to contribute.</p>";
  const counts={};data.reports.forEach(r=>counts[r.email]=(counts[r.email]||0)+1);
  const ranked=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  $("leaderboard-list").innerHTML=ranked.length?ranked.map(([email,count],i)=>{const u=data.users.find(x=>x.email===email);return `<div class="leader-row"><span>${i+1}. ${escapeHTML(u?.name||"Campus member")}</span><strong>${count} report${count===1?"":"s"}</strong></div>`}).join(""):"<p class='muted'>Leaderboard will appear after the first report.</p>";
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("login-form").addEventListener("submit",e=>{
  e.preventDefault();const name=$("name").value.trim(),email=$("email").value.trim().toLowerCase();
  if(!name||!email)return;
  if(!data.users.some(u=>u.email===email))data.users.push({name,email});
  currentUser={name,email};sessionStorage.setItem("cleanCampusUser",JSON.stringify(currentUser));persist();showApp();
});
$("report-form").addEventListener("submit",e=>{
  e.preventDefault();if(!currentUser){toast("Please continue with your name and email first.");return;}
  const location=$("location").value.trim(),type=$("waste-type").value,description=$("description").value.trim();
  if(!location||!type||!description){toast("Please complete all fields.");return;}
  data.reports.push({name:currentUser.name,email:currentUser.email,location,type,description,createdAt:new Date().toISOString()});
  persist();$("report-form").reset();render();toast("Your report was submitted.");
});
$("logout").onclick=()=>{sessionStorage.removeItem("cleanCampusUser");currentUser=null;$("app").classList.add("hidden");$("auth").classList.remove("hidden");$("logout").classList.add("hidden");};
if(currentUser)showApp();else $("auth").classList.remove("hidden");