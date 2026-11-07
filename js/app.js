/* Appointly – front-end prototype
   All app logic: data, availability engine, views, router, actions and Capi assistant.
   Data is stored in the browser (localStorage), so no server is needed. */
/* ================= helpers ================= */
const $=s=>document.querySelector(s);
const ICON={
calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
home:'<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c2.4.6 4 2.3 4 5.2"/>',
chart:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
pin:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
star:'<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3"/>',
check:'<path d="M20 6L9 17l-5-5"/>',
x:'<path d="M18 6L6 18M6 6l12 12"/>',
send:'<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
arrow:'<path d="M5 12h14M13 5l7 7-7 7"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
download:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
headset:'<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14v3a2 2 0 0 1-2 2h-1v-6h3zM3 14v3a2 2 0 0 0 2 2h1v-6H3z"/>',
building:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
queue:'<path d="M3 5h18M3 12h12M3 19h6"/><circle cx="18" cy="17" r="3"/>',
card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
flow:'<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M6 9v4a2 2 0 0 0 2 2h7"/>',
whatsapp:'<path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-1.9-1.4-2.4-2.4l1-1-1-2z"/>',
lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
refresh:'<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8"/><path d="M21 3v5h-5"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
heart:'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 12 5.6 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
car:'<path d="M5 17h14v-5l-2-5H7l-2 5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>',
wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r=".8"/>',
access:'<circle cx="12" cy="4" r="2"/><path d="M12 6v7h5l2 6M12 9H7"/><path d="M10 13a5 5 0 1 0 5 6"/>',
logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
google:'<path d="M21 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7z"/><path d="M12 21c2.6 0 4.7-.9 6.3-2.3l-3.1-2.4c-.9.6-2 .9-3.2.9-2.5 0-4.6-1.7-5.3-3.9H3.5v2.5A9.5 9.5 0 0 0 12 21z"/><path d="M6.7 13.3a5.6 5.6 0 0 1 0-3.6V7.2H3.5a9.5 9.5 0 0 0 0 8.6z"/><path d="M12 5.8c1.4 0 2.6.5 3.6 1.4l2.7-2.7A9.5 9.5 0 0 0 3.5 7.2l3.2 2.5C7.4 7.5 9.5 5.8 12 5.8z"/>',
party:'<path d="M4 20l5-14 9 9z"/><path d="M14 4l1 2M19 9l2-1M17 3l-1 3M8 12l4 4"/>',
wrench:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
landmark:'<path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2 10l10-6 10 6z"/>',
tooth:'<path d="M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.6.8 8 3 8 1.8 0 1.6-5 4.5-5s2.7 5 4.5 5c2.2 0 2.4-5.4 3-8 .5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/>',
scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/>',
lotus:'<path d="M12 20c-4 0-8-2.5-9-6 3 0 5.5 1 7 3"/><path d="M12 20c4 0 8-2.5 9-6-3 0-5.5 1-7 3"/><path d="M12 20c-2.5-2-3.5-5-3.5-8S10 5.5 12 4c2 1.5 3.5 5 3.5 8s-1 6-3.5 8z"/>',
dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>',
pulse:'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 12 5.6 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/><path d="M3.2 12H8l1.5-3 3 6 1.5-3h6.8"/>',
briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>'
};
const ic=(n,cls='i')=>`<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]||''}</svg>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function hash(s){let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)}
const DAY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DAYFULL=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const DAYNAME=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const startOfDay=d=>{const x=new Date(d);x.setHours(0,0,0,0);return x};
const TODAY=startOfDay(new Date());
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const dkey=d=>`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const fmtT=m=>{let h=Math.floor(m/60),mm=m%60;const ap=h>=12?'PM':'AM';h=h%12||12;return `${h}:${String(mm).padStart(2,'0')} ${ap}`};
const fmtD=d=>`${DAY[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]}`;
const relD=d=>{const n=Math.round((startOfDay(d)-TODAY)/864e5);return n===0?'Today':n===1?'Tomorrow':n===-1?'Yesterday':fmtD(d)};
const inr=n=>n===0?'Free':'₹'+n.toLocaleString('en-IN');
const nowMin=()=>{const n=new Date();return n.getHours()*60+n.getMinutes()};
const AV=['#DB586D','#DF6C81','#CB797B','#AB3B4E','#B07A4A','#89515F','#CB797B','#BB4C71'];
const avatar=(name,size)=>{const ini=name.replace(/^(Dr\.|Coach)\s*/,'').split(' ').map(w=>w[0]).slice(0,2).join('');return `<span class="avatar" style="background:${AV[hash(name)%AV.length]}${size?`;width:${size}px;height:${size}px;font-size:${Math.round(size/2.9)}px`:''}">${esc(ini)}</span>`};
const starRow=(r,n=5)=>`<span class="starrow" aria-label="${r} out of 5">${Array.from({length:n},(_,i)=>`<svg viewBox="0 0 24 24" class="${i<Math.round(r)?'':'off'}"><polygon points="${'12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3'}"/></svg>`).join('')}</span>`;

/* ================= data: categories (database-driven) ================= */
const CAT_SEED=[
 ['health','Healthcare & Wellness','pulse',[['hospitals','Hospitals & clinics'],['dental','Dental clinics'],['derma','Dermatology'],['physio','Physiotherapy'],['nutrition','Nutritionists & dietitians']]],
 ['beauty','Beauty & Personal Care','scissors',[['salons','Salons'],['nails','Nail studios'],['makeup','Makeup artists'],['tattoo','Tattoo studios']]],
 ['pro','Professional Services','briefcase',[['realestate','Real estate agents'],['insurance','Insurance advisors'],['consult','Business consultants']]],
 ['fitness','Fitness & Sports','lotus',[['yoga','Yoga studios'],['pilates','Pilates centres']]],
 ['hosp','Hospitality & Events','party',[['hotels','Hotels & resorts'],['banquet','Banquet & party halls'],['photo','Photography studios']]],
 ['home','Home & Repair Services','wrench',[['maint','Home maintenance'],['cleaning','Cleaning services'],['electric','Electricians'],['plumb','Plumbers'],['ac','AC technicians']]],
 ['gov','Government & Public Services','landmark',[['docs','Document appointments'],['passport','Passport services'],['publicc','Public consultations']]]];
const IND={'Dental clinic':{g:'--g-dental',i:'tooth'},'Hospital':{g:'--g-hospital',i:'pulse'},'Salon':{g:'--g-salon',i:'scissors'},'Spa':{g:'--g-spa',i:'lotus'},'Gym':{g:'--g-gym',i:'lotus'},'Consultant':{g:'--g-consult',i:'briefcase'},'Banquet':{g:'--g-events',i:'party'},'Home':{g:'--g-home',i:'wrench'},'Government':{g:'--g-gov',i:'landmark'},'Photo':{g:'--g-salon',i:'image'}};
const LOOK_BY_CAT={health:'Hospital',beauty:'Salon',pro:'Consultant',fitness:'Gym',hosp:'Banquet',home:'Home',gov:'Government'};
const AMEN={health:[['car','Parking'],['access','Wheelchair access'],['card','UPI & cards'],['shield','Hygiene certified'],['wifi','Free Wi-Fi'],['users','Family friendly']],
 beauty:[['car','Parking'],['shield','Single-use tools'],['card','UPI & cards'],['heart','Premium products'],['wifi','Free Wi-Fi'],['users','Women staff available']],
 pro:[['globe','Online meetings'],['car','Parking'],['card','UPI & cards'],['shield','Confidential'],['clock','Evening slots'],['wifi','Free Wi-Fi']],
 fitness:[['shield','Lockers'],['heart','Showers'],['card','UPI & cards'],['users','Small batches'],['car','Parking'],['wifi','Free Wi-Fi']],
 hosp:[['car','Valet parking'],['users','Large groups'],['access','Wheelchair access'],['card','UPI & cards'],['heart','In-house catering'],['wifi','Free Wi-Fi']],
 home:[['shield','Verified technicians'],['card','Pay after the job'],['clock','On-time guarantee'],['check','30-day warranty'],['users','Background-checked'],['phone','Live tracking']],
 gov:[['clock','No queue with a booking'],['access','Wheelchair access'],['users','Senior citizen counter'],['card','UPI & cards'],['shield','Secure documents'],['car','Parking']]};
const kwOf=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>2);
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'');
let DEMO_N=0;
function mkDemo(sub,name,look,area,owner,staff,services,o={}){
  const n=++DEMO_N;const c=CAT_SEED.find(c=>c[3].some(s=>s[0]===sub));const cat=c[0];const subL=c[3].find(s=>s[0]===sub)[1];const id=slug(name);const h=o.hours||[540,1140,[600,840]];
  return {id,bid:'APX-B-'+String(n).padStart(3,'0'),name,cat,sub,ind:look,area,city:'Hyderabad',address:o.address||`${o.street||'Main Road'}, ${area}, Hyderabad`,
   phone:`+91 40 4${String(100+n*37).slice(-3)} ${String(1000+n*271).slice(-4)}`,email:`demo.${sub}@appointly.demo`,password:'Appointly@123',website:'www.'+id+'.in',
   rating:o.rating||+(4.4+(n*7%6)/10).toFixed(1),reviews:o.reviews||(120+n*97%1900),open:h[0],close:h[1],sun:h[2]||null,cancelHrs:o.cancel||6,since:o.since||(2008+n%14),bot:'Capi',branches:o.branches||[area],
   about:o.about,amen:o.amen||AMEN[cat],insurance:o.insurance||[],faqs:o.faqs||[['How do I reschedule?','Use the link in your WhatsApp confirmation, or ask Capi in the chat.']],owner,
   staff:staff.map(([nm,role,qual,exp,langs],i)=>({id:id+'s'+i,name:nm,role,qual:qual||'',exp:exp||(5+i*3),langs:langs||'English, Hindi, Telugu',days:[1,2,3,4,5,6,0],svcs:null})),
   services:services.map(([nm,dur,price,desc,grp],i)=>({id:id+'v'+i,g:grp||subL,name:nm,dur,price,desc:desc||'',kw:kwOf(nm+' '+subL+' '+(o.kw||'')),staff:null})),
   offers:(o.offers||[]).map((x,i)=>({id:id+'o'+i,title:x[0],desc:x[1],pct:x[2]||0,svc:x[3]!=null?id+'v'+x[3]:null,ends:x[4]||21,active:true})),
   breaks:o.breaks||[[780,840]],holidays:[],slotInt:30,buffer:o.buffer||0,dailyLimit:o.limit||40,autoConfirm:o.autoConfirm!==false,status:'active',verified:true,demo:true,plan:['Starter','Growth','Scale'][n%3],q:{}};
}
const SEED_BIZ=[
 mkDemo('hospitals','CityCare Clinic','Hospital','Banjara Hills','Dr. Vikram Shah',[['Dr. Vikram Shah','General physician','MBBS, MD',18],['Dr. Lata Pillai','Pediatrician','MBBS, DCH',15],['Dr. Omar Siddiqui','Cardiologist','MD, DM (Cardio)',12]],
  [['General consultation',15,700,'For fever, cold and everyday concerns.','Consultations'],['Child consultation',20,800,'For children up to 16.','Consultations'],['Cardiology consultation',20,1200,'Includes ECG review.','Consultations'],['Basic health check',120,2999,'Blood tests, ECG, X-ray and doctor review.','Health checks']],
  {hours:[480,1260,[480,1260]],cancel:4,street:'Road No. 12',about:'A multispeciality clinic with an in-house lab and pharmacy. For emergencies, call 108 or go to the nearest emergency department.',insurance:['Star Health','Care Health','Niva Bupa'],kw:'doctor fever general hospital clinic',breaks:[]}),
 mkDemo('dental','SmileCare Dental','Dental clinic','Kondapur','Dr. Meera Iyer',[['Dr. Meera Iyer','General dentist','BDS, MDS',14],['Dr. Arjun Menon','Endodontist','BDS, MDS (Endo)',11],['Dr. Farah Khan','Orthodontist','BDS, MDS (Ortho)',9],['Ravi Kumar','Dental hygienist','Dip. Dental Hygiene',7]],
  [['Consultation',20,500,'Exam, photos and a written plan.','General'],['Cleaning & polish',45,1200,'Scaling, polishing and fluoride.','General'],['Tooth filling',45,1800,'Tooth-coloured filling.','Restorative'],['Root canal',90,6500,'Single-sitting where possible.','Restorative'],['Teeth whitening',60,8000,'In-clinic whitening.','Cosmetic'],['Braces consultation',30,800,'Braces or aligner options.','Orthodontics']],
  {street:'Botanical Garden Road',about:'A six-chair dental clinic with digital X-ray and a kids’ room. Every patient gets a written plan with costs before treatment starts.',insurance:['Star Health','HDFC Ergo','ICICI Lombard'],kw:'dentist teeth tooth',offers:[['20% off teeth whitening','Book any whitening slot this month.',20,4,20]]}),
 mkDemo('derma','SkinGlow Clinic','Hospital','Jubilee Hills','Dr. Nandini Rao',[['Dr. Nandini Rao','Dermatologist','MD (Dermatology)',13],['Dr. Aamir Qureshi','Trichologist','MD, Fellowship in Hair',9]],
  [['Skin consultation',20,800,'Diagnosis and a treatment plan.','Consultations'],['Hair-loss consultation',30,1000,'Scalp analysis and a plan.','Consultations'],['Chemical peel',45,3500,'For pigmentation and dull skin.','Treatments'],['Laser hair reduction',45,4500,'Per area, per session.','Treatments']],
  {hours:[600,1200,[600,840]],street:'Road No. 36',about:'Dermatologists for acne, pigmentation, hair loss and skin allergies, with peel and laser treatments.',kw:'skin acne hair derma dermatologist',offers:[['Free consultation with any peel','Consultation fee waived when you book a chemical peel.',0,2,14]]}),
 mkDemo('physio','PhysioPlus Centre','Spa','Gachibowli','Anjali Das',[['Anjali Das','Physiotherapist','MPT (Ortho)',9],['Sunil Varma','Sports physio','BPT',6]],
  [['Physiotherapy session',45,900,'Assessment, treatment and home exercises.','Sessions'],['Back & neck pain program',60,1500,'Posture and strengthening.','Programs'],['Sports injury rehab',45,1100,'Return-to-sport plan.','Programs'],['Home physio visit',60,1400,'A physio visits you at home.','Sessions']],
  {hours:[420,1200,[480,780]],street:'Financial District Road',about:'Physiotherapy for back, neck and sports injuries. Every plan starts with a 1-to-1 assessment.',kw:'pain back neck knee injury physio'}),
 mkDemo('nutrition','NutriLife Studio','Consultant','Kondapur','Meghana Reddy',[['Meghana Reddy','Clinical dietitian','M.Sc Nutrition, RD',10],['Arjun Pillai','Sports nutritionist','ISSN certified',6]],
  [['Diet consultation',45,1200,'Assessment and a 2-week plan.','Consultations'],['Diabetes & PCOS plan',45,1500,'Built around your reports.','Consultations'],['Sports nutrition',45,1500,'For runners, lifters and athletes.','Consultations'],['Follow-up check-in',20,500,'Review progress and adjust.','Follow-ups']],
  {hours:[600,1140,null],about:'Registered dietitians for diabetes, PCOS, heart health and sports nutrition, with plans built around Indian home food.',kw:'diet dietitian nutritionist food',offers:[['Free follow-up with first consult','Your first follow-up is on us.',0,0,30]]}),
 mkDemo('salons','StyleStudio Salon','Salon','Jubilee Hills','Neha Kapoor',[['Neha Kapoor','Senior stylist','Toni & Guy Academy',10],['Imran Sheikh','Colorist','L’Oréal certified',8]],
  [['Haircut & blow-dry',45,900,'Consult, wash, cut and finish.','Hair'],['Global hair color',120,3500,'Ammonia-free colour.','Hair'],['Keratin treatment',150,5500,'Smooth for 3–4 months.','Hair'],['Hair spa',60,1500,'Deep conditioning treatment.','Care']],
  {hours:[600,1260,[600,1260]],cancel:3,about:'A full-service hair salon. Colour work includes bond care as standard.',kw:'hair haircut cut salon stylist',offers:[['15% off weekday haircuts','Monday to Thursday, before 4 PM.',15,0,10]]}),
 mkDemo('nails','NailArt Studio','Salon','Banjara Hills','Divya Rao',[['Divya Rao','Nail artist','CND certified',5],['Sana Ali','Nail technician','Certified',4]],
  [['Gel manicure',40,700,'Shape, cuticle care and gel colour.','Hands'],['Gel pedicure',50,900,'Soak, scrub and gel colour.','Feet'],['Nail extensions',90,2200,'Gel or acrylic extensions.','Extensions'],['Nail art (per set)',30,600,'Hand-painted designs.','Art']],
  {hours:[660,1260,[660,1200]],cancel:3,about:'A nail studio for gel manicures, pedicures, extensions and hand-painted art.',kw:'nail nails manicure pedicure',offers:[['Mani + pedi combo, save ₹300','Book both in one visit.',0,1,7]]}),
 mkDemo('makeup','GlamUp Makeup','Salon','Madhapur','Riya Sharma',[['Riya Sharma','Makeup artist','MAC Pro trained',8],['Pooja Iyer','Hair & makeup artist','Certified',6]],
  [['Party makeup',60,3000,'Full look with lashes.','Makeup'],['Bridal trial',90,4000,'Hair and makeup trial.','Bridal'],['Bridal makeup (on the day)',180,15000,'At the venue or studio.','Bridal'],['Saree draping',20,800,'Any style.','Styling']],
  {hours:[480,1260,[480,1260]],cancel:24,about:'Makeup artists for parties, engagements and weddings, at the studio or at your venue.',kw:'makeup bridal wedding party'}),
 mkDemo('tattoo','InkCraft Studio','Salon','Banjara Hills','Vikram Das',[['Vikram Das','Tattoo artist','Fine line & realism',11],['Zoya Mirza','Tattoo artist','Neo-traditional',7]],
  [['Design consultation',30,0,'Ideas, size and placement.','Consults'],['Small tattoo (up to 2 in)',60,2500,'Fine line or simple designs.','Tattoos'],['Medium tattoo (half day)',180,9000,'Detailed pieces up to palm size.','Tattoos'],['Ear or nose piercing',20,1200,'Titanium jewellery included.','Piercing']],
  {hours:[720,1320,[720,1200]],cancel:24,breaks:[],about:'Custom tattoos and piercings by resident artists. Single-use needles and a free design consult.',kw:'tattoo ink piercing',faqs:[['Is there an age limit?','You must be 18 or older, with a photo ID.']]}),
 mkDemo('realestate','Prime Properties','Consultant','Gachibowli','Sanjay Varma',[['Sanjay Varma','Senior agent','RERA registered',12],['Pooja Nair','Rentals agent','RERA registered',5]],
  [['Site visit',60,0,'See up to 3 homes with an agent.','Visits'],['Buyer consultation',30,0,'Budget, areas and loan options.','Consultations'],['Rental viewing',45,0,'Shortlisted rentals in one trip.','Visits'],['Home valuation call',30,0,'Valuation and listing plan.','Consultations']],
  {hours:[600,1140,[600,1020]],cancel:12,about:'Buy, rent or sell homes in west Hyderabad. Book a site visit or a call with an agent.',kw:'property flat house home rent buy sell real estate'}),
 mkDemo('insurance','SecureLife Advisors','Consultant','Begumpet','Ritu Agarwal',[['Ritu Agarwal','Health & life advisor','IRDAI licensed',14],['Naveen Kumar','Motor & business advisor','IRDAI licensed',8]],
  [['Health insurance review',30,0,'Compare family floater plans.','Reviews'],['Term life planning',30,0,'Cover and riders explained.','Reviews'],['Car insurance renewal',20,0,'Compare quotes and add-ons.','Renewals'],['Claim help call',30,0,'Help filing or following up a claim.','Support']],
  {hours:[600,1140,null],cancel:12,about:'Independent advisors for health, term life, car and business insurance, with claim support.',kw:'insurance policy claim health life car'}),
 mkDemo('consult','GrowthBridge Consulting','Consultant','Somajiguda','Priya Menon',[['Priya Menon, CA','Tax & compliance','FCA',13],['Karan Bhatia','Business setup','CS, LLB',9]],
  [['Tax filing consult',45,1500,'ITR review and filing plan.','Tax'],['Company registration call',30,1000,'Pvt Ltd, LLP or OPC options.','Business'],['GST review',60,2500,'Returns, notices and input credit.','Tax'],['Growth strategy session',60,4000,'Pricing, sales and hiring plan.','Strategy']],
  {hours:[600,1140,null],cancel:24,about:'Consultants for small businesses: tax, GST, company registration and growth planning.',kw:'tax gst company business consultant ca'}),
 mkDemo('yoga','ZenYoga Studio','Gym','HITEC City','Sara Thomas',[['Sara Thomas','Yoga teacher','RYT 500',6],['Arun Joshi','Yoga teacher','RYT 200',4]],
  [['Group yoga class',60,350,'Up to 12 people, all levels.','Classes'],['Beginner yoga',60,300,'Foundations and breathing.','Classes'],['Private yoga session',60,1500,'One-to-one.','Private'],['Free trial class',60,0,'Try any group class once.','Classes']],
  {hours:[360,1260,[420,720]],cancel:2,breaks:[[720,960]],about:'Small yoga classes for all levels, morning and evening. Mats and props provided.',kw:'yoga meditation stretch',offers:[['First class free','New members only.',100,3,30]]}),
 mkDemo('pilates','CoreFit Pilates','Gym','Kukatpally','Riya Kapoor',[['Riya Kapoor','Pilates instructor','STOTT Pilates',8],['Mark D’Souza','Pilates instructor','BASI Pilates',5]],
  [['Reformer Pilates',50,1200,'Small group on reformers.','Classes'],['Mat Pilates',50,600,'Core-focused mat class.','Classes'],['Private Pilates',55,2000,'One-to-one on the reformer.','Private'],['Intro session',45,0,'Learn the basics first.','Intro']],
  {hours:[390,1230,[420,720]],cancel:6,about:'Reformer and mat Pilates in small groups, plus private sessions.',kw:'pilates reformer core',offers:[['10% off 10-class pack','Save on your first pack.',10,0,14]]}),
 mkDemo('hotels','GrandStay Resort','Banquet','Shamirpet','Anil Mehra',[['Front office','Reservations','Resort desk',10],['Spa desk','Spa therapists','Certified',8]],
  [['Day-out package',360,2499,'Pool, lunch and games.','Packages'],['Room check-in slot',30,0,'Pick your arrival time for a booked stay.','Stays'],['Spa massage',60,3200,'Signature full-body massage.','Spa'],['Lakeside dinner table',90,0,'A table for up to 6.','Dining']],
  {hours:[480,1320,[480,1320]],cancel:48,breaks:[],about:'A lakeside resort about 40 minutes from the city, with day-outs, spa and dining.',kw:'hotel resort stay room spa',offers:[['Weekday day-out at ₹1,999','Monday to Thursday only.',20,0,7]]}),
 mkDemo('banquet','Celebration Halls','Banquet','Gachibowli','Ananya Sethi',[['Ananya Sethi','Event manager','MBA, Events',9],['Farid Khan','Venue coordinator','Hospitality diploma',6]],
  [['Venue visit',45,0,'Tour the halls with a coordinator.','Visits'],['Menu tasting',60,1500,'Taste up to 8 dishes.','Visits'],['Party hall (4 hours)',240,45000,'Up to 150 guests, décor included.','Bookings'],['Wedding planning meeting',60,0,'Dates, packages and décor.','Bookings']],
  {hours:[600,1260,[600,1260]],cancel:48,breaks:[],autoConfirm:false,about:'Two banquet halls and a rooftop lawn for weddings, birthdays and corporate events, with in-house catering.',kw:'wedding party birthday hall banquet function event'}),
 mkDemo('photo','CaptureMoments Studio','Photo','Madhapur','Aditya Sen',[['Aditya Sen','Photographer','Portraits & events',10],['Lakshmi Iyer','Photographer','Products & newborns',7]],
  [['Passport & visa photos',15,200,'Ready in 10 minutes.','Quick'],['Portrait session',60,3500,'10 edited photos.','Shoots'],['Family or baby shoot',90,6000,'25 edited photos, props included.','Shoots'],['Event photography (4 hours)',240,18000,'Weddings, birthdays and corporate events.','Events']],
  {hours:[600,1200,[600,1200]],cancel:24,about:'Portraits, family and baby shoots, event coverage and passport photos. Edited images in 3 days.',kw:'photo photographer photography shoot',offers:[['5 extra edits on family shoots','Free with any family or baby shoot.',0,2,21]]}),
 mkDemo('maint','HomeFix Services','Home','Madhapur','Ramesh Goud',[['Ramesh Goud','Handyman','15 yrs experience',15],['Joseph Mathew','Carpenter','ITI Carpentry',9]],
  [['Handyman visit',60,299,'Small fixes around the house.','Repairs'],['Furniture assembly',90,799,'Beds, wardrobes and tables.','Repairs'],['Door & lock repair',60,399,'Hinges, locks and handles.','Repairs'],['Wall mounting',45,499,'TVs, shelves and frames.','Installation']],
  {hours:[480,1200,[540,1080]],cancel:2,branches:['At your home'],about:'Handymen and carpenters for everyday repairs. Pick a time and they come to your door.',kw:'repair handyman carpenter fix home maintenance'}),
 mkDemo('cleaning','SparkleClean','Home','Kondapur','Lakshmi B.',[['Shine Crew','Cleaning team of 3','Trained crew',5],['Lakshmi B.','Cleaning supervisor','8 yrs experience',8]],
  [['Deep home cleaning (2BHK)',240,3499,'Kitchen, bathrooms and all rooms.','Home'],['Bathroom cleaning',60,699,'Tiles, fittings and floors.','Home'],['Kitchen cleaning',120,1499,'Chimney, cabinets and floors.','Home'],['Sofa shampoo',90,999,'Up to 5 seats.','Furniture']],
  {hours:[480,1140,[540,1020]],cancel:4,branches:['At your home'],about:'Trained cleaning crews with their own equipment and safe products.',kw:'clean cleaning maid house deep',offers:[['₹500 off your first deep clean','For new customers.',0,0,30]]}),
 mkDemo('electric','PowerCare Electricals','Home','Kukatpally','Venkat Rao',[['Venkat Rao','Electrician','ITI Electrical',12],['Imtiaz Ali','Electrician','ITI Electrical',7]],
  [['Electrician visit',60,299,'Switches, lights and sockets.','Repairs'],['Fan installation',45,349,'Ceiling or wall fans.','Installation'],['Wiring check',60,499,'Safety check for a 2BHK.','Inspection'],['Inverter installation',90,799,'Inverter and battery setup.','Installation']],
  {hours:[480,1200,[540,1080]],cancel:2,branches:['At your home'],about:'Licensed electricians for repairs, installations and safety checks.',kw:'electric electrician wiring switch fan light power'}),
 mkDemo('plumb','AquaFix Plumbing','Home','Ameerpet','Salim Ahmed',[['Salim Ahmed','Plumber','ITI Plumbing',10],['Suresh Naik','Plumber','ITI Plumbing',6]],
  [['Plumber visit',60,299,'Leaks, taps and fittings.','Repairs'],['Leak repair',60,399,'Pipes, tanks and joints.','Repairs'],['Tap & fitting replacement',45,349,'Taps, showers and mixers.','Installation'],['Drain unblocking',60,499,'Kitchen and bathroom drains.','Repairs']],
  {hours:[480,1200,[540,1080]],cancel:2,branches:['At your home'],about:'Plumbers for leaks, blockages and new fittings, usually the same day.',kw:'plumber plumbing leak tap pipe drain water'}),
 mkDemo('ac','CoolCare AC Services','Home','Miyapur','Kiran Rao',[['Kiran Rao','AC technician','HVAC certified',8],['Abdul Khader','AC technician','HVAC certified',6]],
  [['AC service',60,599,'Filter and coil cleaning, gas check.','Service'],['AC gas refill',90,2499,'Includes leak check.','Repairs'],['AC installation',120,1499,'Split or window AC.','Installation'],['AC repair visit',60,399,'Diagnosis and quote.','Repairs']],
  {hours:[480,1200,[540,1080]],cancel:2,branches:['At your home'],about:'AC servicing, repairs and installation for all major brands.',kw:'ac air conditioner cooling aircon',offers:[['AC service at ₹499','Limited-time summer price.',17,0,5]]}),
 mkDemo('docs','DocumentHelp Centre','Government','Kondapur','Centre manager',[['Counter 1','Certificates','Revenue services',10],['Counter 2','Document verification','Records office',10]],
  [['Document verification',15,0,'Attestation and verification of originals.','Documents'],['Certificate application',15,45,'Income, caste or residence certificates.','Certificates'],['Affidavit & notary help',20,150,'Drafting and notarisation.','Documents'],['Address proof update',15,50,'Update address records.','Documents']],
  {hours:[600,1020,null],cancel:2,about:'Book a counter slot instead of waiting in line for certificates and document services.',kw:'document certificate verification government'}),
 mkDemo('passport','Passport Assistance Centre','Government','Ameerpet','Centre manager',[['Counter 1','Form filling help','Facilitation desk',8],['Counter 2','Document check','Facilitation desk',8]],
  [['Passport form help',30,100,'Fill the online form with an assistant.','Passport'],['Document check',20,50,'Check documents before your appointment.','Passport'],['Photo & print',15,100,'Photos and printouts.','Passport'],['Tatkal guidance',30,150,'What you need for a Tatkal application.','Passport']],
  {hours:[600,1020,null],cancel:2,about:'Help with passport forms and documents before your official appointment.',kw:'passport visa tatkal',faqs:[['Is this the official passport appointment?','No. Official passport appointments are booked on the Passport Seva portal. We help you prepare for it.']]}),
 mkDemo('publicc','Public Consultation Centre','Government','Lakdikapul','Centre manager',[['Officer desk 1','Public consultations','Municipal services',12],['Officer desk 2','Grievances','Municipal services',9]],
  [['Public consultation',20,0,'Meet an officer about a civic issue.','Consultations'],['Grievance filing help',20,0,'Help filing a complaint.','Grievances'],['Scheme information',15,0,'Eligibility and how to apply.','Information'],['Senior citizen desk',20,0,'Priority help for seniors.','Consultations']],
  {hours:[600,1020,null],cancel:2,about:'Book a time to meet an officer for civic issues, grievances and scheme information.',kw:'public consultation grievance complaint officer government scheme'})
];

/* ================= simulated database (persists in this browser) ================= */
const DBK='appointly.db.v3',LSA='appointly.auth.v3';
function load(k,def){try{const r=localStorage.getItem(k);if(r)return JSON.parse(r)}catch(e){}return def}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
const CNAMES=['Aarav Sharma','Diya Patel','Rohan Gupta','Isha Verma','Kabir Singh','Meher Ali','Vihaan Joshi','Saanvi Rao','Arjun Das','Tara Menon','Neil Kapoor','Zara Hussain','Advait Kulkarni','Riya Bose','Yash Malhotra','Anika Sen','Dev Chawla','Mira Pillai','Kunal Shah','Sneha Iyer'];
const fakePhone=s=>{const h=hash(s);return `+91 9${String(h%10000).padStart(4,'0')} ${String((h>>4)%100000).padStart(5,'0')}`};
const bookingId=()=>'APX-'+Math.random().toString(36).slice(2,8).toUpperCase();
function seedDB(){
  const now=new Date();let t=new Date(now.getTime()+2*3600e3);t.setMinutes(t.getMinutes()<30?30:60,0,0);
  const at=(d,m)=>addDays(TODAY,d).getTime()+m*6e4;
  const me={name:'Ananya Rao',phone:'98765 43210'};
  const bk=(id,biz,svc,staff,start,status,via,extra={})=>Object.assign({id,biz,svc:biz+'v'+svc,staff:biz+'s'+staff,branch:null,start,status,via,pay:'Pay at venue',client:me,mine:true,created:start-5*864e5},extra);
  return {ver:4,cats:CAT_SEED.map(([id,label,icon,subs])=>({id,label,icon,subs:subs.map(([sid,sl])=>({id:sid,label:sl}))})),biz:{},appt:{},catReq:[],
   bookings:[bk('APX-7K2Q9M','smilecaredental',1,0,t.getTime(),'confirmed','AI chat'),bk('APX-3HF8LD','stylestudiosalon',0,0,at(3,690),'confirmed','Booking link',{pay:'UPI deposit ₹200'}),
    bk('APX-9QW2ER','coolcareacservices',0,0,at(5,600),'confirmed','Appointly',{rescheduled:true}),bk('APX-5TY7UI','physiopluscentre',0,1,at(-6,1080),'confirmed','AI chat',{pay:'Paid · Card'}),
    bk('APX-2PL4MN','citycareclinic',0,0,at(-20,600),'confirmed','Appointly',{pay:'Paid · UPI',rated:5}),bk('APX-8ZX6CV','zenyogastudio',0,0,at(-10,420),'cancelled','Website widget'),
    bk('APX-6BN3KJ','smilecaredental',0,0,at(-45,660),'confirmed','Appointly',{pay:'Paid · UPI',rated:4}),
    bk('APX-4RQ8TB','smilecaredental',2,1,at(2,600),'confirmed','Website widget',{proposal:{by:'client',start:at(3,660),staff:'smilecaredentals1',reason:'',at:Date.now()-2*36e5}}),
    bk('APX-C4NC3L','citycareclinic',1,0,at(1,630),'cancelled','Appointly',{cancelBy:'business',cancelReason:'Doctor on emergency leave'}),
    bk('APX-PR0P5D','physiopluscentre',1,0,at(2,1020),'confirmed','AI chat',{proposal:{by:'business',start:at(4,1080),staff:'physiopluscentres0',reason:'Staff unavailable',at:Date.now()-36e5}}),
    bk('APX-N8LA2T','nailartstudio',0,0,at(4,960),'confirmed','Appointly'),bk('APX-GL4M7U','glamupmakeup',0,0,at(9,600),'confirmed','Booking link',{pay:'UPI deposit ₹500'}),
    bk('APX-SL7FE2','securelifeadvisors',0,0,at(6,690),'confirmed','Appointly'),bk('APX-CF3PL8','corefitpilates',0,0,at(1,420),'confirmed','Website widget'),
    bk('APX-CH9BQ1','celebrationhalls',0,0,at(14,660),'pending','Appointly'),bk('APX-SP2CL6','sparkleclean',0,0,at(7,540),'confirmed','Appointly'),
    bk('APX-DH5DC3','documenthelpcentre',0,0,at(3,630),'confirmed','Appointly'),bk('APX-PP8NT4','primeproperties',0,0,at(-8,660),'confirmed','Booking link',{pay:'Paid · UPI'}),
    bk('APX-HF6MX9','homefixservices',0,0,at(-15,600),'confirmed','Appointly',{pay:'Paid · Cash'}),bk('APX-GS1RT5','grandstayresort',0,0,at(-30,840),'confirmed','Website widget',{pay:'Paid · Card',rated:5})],
   notifs:[{id:'n1',to:'client',type:'reminder',title:'Reminder: Cleaning & polish today',body:'SmileCare Dental · with Dr. Meera Iyer',at:Date.now()-36e5,read:false},
    {id:'n0',to:'client',type:'rescheduled',title:'PhysioPlus Centre proposed a new time',body:'Back & neck pain program · Staff unavailable. Accept or decline in My bookings.',at:Date.now()-36e5,read:false},
    {id:'n0b',to:'client',type:'cancelled',title:'CityCare Clinic cancelled your booking',body:'Doctor on emergency leave. Pick another time or a similar clinic.',at:Date.now()-3*36e5,read:false},
    {id:'n0c',to:'smilecaredental',type:'request',title:'Reschedule request',body:'Ananya Rao wants to move her appointment',at:Date.now()-2*36e5,read:false},
    {id:'n2',to:'client',type:'rescheduled',title:'Appointment rescheduled',body:'CoolCare AC Services moved your AC service to '+fmtD(addDays(TODAY,5))+', 10:00 AM',at:Date.now()-2*36e5,read:false},
    {id:'n3',to:'client',type:'offer',title:'20% off teeth whitening',body:'SmileCare Dental · ends in 20 days',at:Date.now()-5*36e5,read:false},
    {id:'n4',to:'client',type:'followup',title:'Time for a follow-up?',body:'PhysioPlus Centre suggests a session this week',at:Date.now()-864e5,read:true},
    {id:'n5',to:'client',type:'cancelled',title:'Booking cancelled',body:'ZenYoga Studio · Group yoga class',at:Date.now()-10*864e5,read:true},
    {id:'n6',to:'client',type:'payment',title:'Payment received · ₹900',body:'PhysioPlus Centre · Physiotherapy session',at:Date.now()-6*864e5,read:true}],
   favs:['smilecaredental','stylestudiosalon','zenyogastudio'],myReviews:[{biz:'citycareclinic',r:5,text:'Quick and thorough. Dr. Vikram explained everything clearly.',at:Date.now()-19*864e5}],
   profile:{email:'ananya.rao@example.com',city:'Hyderabad',area:'Kondapur',lang:'English',wa:true,sms:true,em:false,r24:true,r2:true}};
}
let DB=load(DBK,null);if(!DB||DB.ver!==4)DB=seedDB();
const saveDB=()=>save(DBK,DB);
let AUTH=load(LSA,{client:null,business:null,admin:null});
const saveAuth=()=>save(LSA,AUTH);
const BIZ={};SEED_BIZ.forEach(b=>BIZ[b.id]=b);Object.assign(BIZ,DB.biz);
let BOOKINGS=DB.bookings;const saveBookings=saveDB;
function saveBiz(b){BIZ[b.id]=b;DB.biz[b.id]=b;saveDB()}
function prepBiz(b){b.staff.forEach(s=>s.first=/^(Counter|Officer|Front|Spa|Shine)/.test(s.name)?s.name:s.name.replace(/^(Dr\.|Coach)\s*/,'').split(/[ ,]/)[0]);if(!b.branches||!b.branches.length)b.branches=[b.area]}
Object.values(BIZ).forEach(prepBiz);
const catOf=id=>DB.cats.find(c=>c.id===id);
const subOf=(cid,sid)=>{const c=catOf(cid);return c&&c.subs.find(s=>s.id===sid)};
const subLabel=b=>{const s=subOf(b.cat,b.sub);return s?s.label:(b.subName||b.sub)};
const catLabel=id=>{const c=catOf(id);return c?c.label:id};
const live=b=>b.status==='active';
const CUR=()=>AUTH.business&&BIZ[AUTH.business.id]?BIZ[AUTH.business.id]:null;
function logo(b,size=44){
  if(b.logo)return `<span class="blogo" style="width:${size}px;height:${size}px"><img src="${b.logo}" alt=""></span>`;
  const ini=b.name.split(/\s+/).filter(w=>/[A-Za-z]/.test(w[0]||'')).slice(0,2).map(w=>w[0]).join('').toUpperCase();const I=IND[b.ind]||IND.Consultant;
  return `<span class="blogo" style="width:${size}px;height:${size}px;background:var(${I.g});font-size:${Math.round(size*.36)}px" aria-hidden="true">${esc(ini)}<svg viewBox="0 0 24 24">${ICON[I.i]}</svg></span>`;
}
const priceRange=b=>{const p=b.services.map(s=>s.price).filter(x=>x>0);if(!p.length)return 'Free';const lo=Math.min(...p),hi=Math.max(...p);return lo===hi?inr(lo):`${inr(lo)}–${inr(hi)}`};
function notify(to,type,title,body){DB.notifs.unshift({id:'n'+Date.now()+Math.random().toString(36).slice(2,5),to,type,title,body,at:Date.now(),read:false});saveDB()}
function reviewsFor(b){
  const T={health:['{s} explained everything clearly.','Booked through {bot} late at night and got a morning slot.','Very clean and well organised. The reminder helped.','Costs were explained before anything started.'],
   beauty:['{s} understood exactly what I wanted.','Chatted with {bot} and booked in a minute.','Lovely space and on time.','Lasted for weeks. Will be back.'],
   pro:['{s} explained every option clearly.','Booked a call through {bot} the same day.','Straight answers and no pushy selling.','Very patient with all my questions.'],
   fitness:['{s} adjusted everything for my knee.','Booked a trial through {bot}, no sales pressure.','Small batches, so you actually get corrected.','My posture is so much better.'],
   hosp:['{s} walked us through every option.','Booked a visit through {bot} on a Sunday night.','Everything was ready on time.','Beautiful place and very helpful staff.'],
   home:['{s} arrived on time and fixed it quickly.','Booked through {bot} at midnight for the next morning.','Paid after the job. Clear pricing.','Very thorough. Will book again.'],
   gov:['Done in one visit. {s} was helpful.','Booked a slot through {bot}, skipped the queue.','Clear checklist of documents before I came.','The senior citizen desk made it easy.']}[b.cat]||['{s} was great.','Easy to book through {bot}.','On time and professional.','Would recommend.'];
  return ['Kiran M.','Pooja S.','Abhinav T.','Sowmya R.'].map((n,i)=>{const s=b.staff[i%b.staff.length];const h=hash(b.id+n);return{n,r:i===2?4:5,svc:b.services[h%b.services.length].name,ago:[3,9,16,28][i]+' days ago',text:T[i].replace('{s}',s.first).replace('{bot}',b.bot),reply:i===2?`Thanks for the feedback, ${n.split(' ')[0]}. We’ve shared it with the team.`:''}});
}

/* ================= availability: one engine for every channel ================= */
const svcOf=k=>{const b=BIZ[k.biz];return b&&(b.services.find(s=>s.id===k.svc)||b.services[0])};
const staffOf=k=>{const b=BIZ[k.biz];return b&&(b.staff.find(s=>s.id===k.staff)||b.staff[0])};
function hoursOn(b,date){if(b.holidays&&b.holidays.includes(dkey(date)))return null;return date.getDay()===0?b.sun:[b.open,b.close]}
const GEN=new Map();
function genDay(b,date){
  const key=b.id+dkey(date);if(GEN.has(key))return GEN.get(key);
  const h=hoursOn(b,date);const out=[];const dOff=Math.round((startOfDay(date)-TODAY)/864e5);
  if(h&&b.demo&&Math.abs(dOff)<=70){
    b.staff.forEach((s,si)=>{if(s.days&&!s.days.includes(date.getDay()))return;let m=h[0]+si*30;
      while(m<h[1]-30){const x=hash(s.id+dkey(date)+m);
        if(x%5<2){const sv=b.services[x%b.services.length];if(m+sv.dur>h[1])break;if(!(b.breaks||[]).some(([a,z])=>m<z&&a<m+sv.dur)){
          const nm=CNAMES[(x>>3)%CNAMES.length];let st='confirmed';if(dOff<0&&x%13===0)st='cancelled';else if(dOff>=0&&x%9===0)st='pending';else if(dOff>=0&&x%17===0)st='cancelled';
          out.push({id:`g-${b.id}-${dkey(date)}-${s.id}-${m}`,src:'gen',biz:b.id,date:startOfDay(date).getTime(),staff:s.id,start:m,dur:sv.dur,svcId:sv.id,svc:sv.name,price:sv.price,customer:nm,phone:fakePhone(nm),source:['Appointly','Website widget','Booking link','AI chat','Walk-in'][(x>>5)%5],status:st,bid:'APX-'+(x%2176782336).toString(36).toUpperCase().padStart(6,'0').slice(-6)});m+=sv.dur+(b.buffer||0)}}
        m+=30;m=Math.ceil(m/30)*30}});
  }
  GEN.set(key,out);return out;
}
function dbAsAppt(k){const d=new Date(k.start);const s=svcOf(k);return {id:k.id,src:'db',biz:k.biz,date:startOfDay(d).getTime(),staff:k.staff,start:d.getHours()*60+d.getMinutes(),dur:s.dur,svcId:s.id,svc:s.name,price:s.price,customer:k.client?k.client.name:'Guest',phone:k.client?'+91 '+k.client.phone:'',source:k.via,status:k.status,bid:k.id,rescheduled:k.rescheduled,mine:k.mine,proposal:k.proposal,cancelBy:k.cancelBy}}
function apptsOn(b,date){
  const ds=startOfDay(date).getTime();
  const gen=genDay(b,date).map(a=>{const o=DB.appt[a.id];return o?Object.assign({},a,o):a}).filter(a=>a.status!=='moved');
  return gen.concat(BOOKINGS.filter(k=>k.biz===b.id&&startOfDay(k.start).getTime()===ds).map(dbAsAppt)).sort((a,c)=>a.start-c.start);
}
const blocking=a=>a.status==='confirmed'||a.status==='pending';
function isFree(b,staffId,date,m,dur,ignore){
  const h=hoursOn(b,date);if(!h)return false;if(m<h[0]||m+dur>h[1])return false;
  if(startOfDay(date).getTime()===TODAY.getTime()&&m<=nowMin()+20)return false;
  if((b.breaks||[]).some(([a,z])=>m<z&&a<m+dur))return false;
  const st=b.staff.find(s=>s.id===staffId);if(st&&st.days&&!st.days.includes(date.getDay()))return false;
  const all=apptsOn(b,date);if(all.filter(blocking).length>=(b.dailyLimit||99))return false;
  const buf=b.buffer||0;
  return !all.some(a=>a.id!==ignore&&a.staff===staffId&&blocking(a)&&m<a.start+a.dur+buf&&a.start<m+dur+buf);
}
function freeStaff(b,staffId,date,m,dur,ignore){
  if(staffId&&staffId!=='any')return isFree(b,staffId,date,m,dur,ignore)?staffId:null;
  const s=b.staff.find(s=>isFree(b,s.id,date,m,dur,ignore));return s?s.id:null;
}
function firstSlots(b,n=3,staffId='any',fromDay=0,svcIdx=0){const out=[];const sv=b.services[svcIdx]||b.services[0];if(!sv)return out;
  for(let d=fromDay;d<fromDay+7&&out.length<n;d++){const date=addDays(TODAY,d);const h=hoursOn(b,date);if(!h)continue;for(let m=h[0];m+sv.dur<=h[1]&&out.length<n;m+=(b.slotInt||30)){const st=freeStaff(b,staffId,date,m,sv.dur);if(st){out.push({d,m,st});m+=60}}}
  return out}
function isOpenNow(b){const h=hoursOn(b,TODAY);const n=nowMin();return !!h&&n>=h[0]&&n<h[1]}
const kDur=k=>{const s=svcOf(k);return s?s.dur:30};
const isUpcoming=k=>(k.status==='confirmed'||k.status==='pending')&&k.start+kDur(k)*6e4>Date.now();
function kStatus(k){if(k.status==='cancelled')return 'Cancelled';if(k.status==='pending')return k.start<Date.now()?'Expired':'Pending';if(k.start+kDur(k)*6e4<Date.now())return 'Completed';return k.rescheduled?'Rescheduled':'Confirmed'}
function createBooking({b,svcId,staff,date,m,via,pay,branch,recurring}){
  const sv=b.services.find(s=>s.id===svcId);const made=[];const reps=recurring?recurring.count:1;const grp=reps>1?'R'+Date.now():null;
  for(let i=0;i<reps;i++){const d=new Date(recurring?addDays(date,recurring.every==='week'?7*i:0):date);if(recurring&&recurring.every==='month')d.setMonth(d.getMonth()+i);d.setHours(0,m,0,0);
    const st=i===0?staff:freeStaff(b,staff,startOfDay(d),m,sv.dur);if(i>0&&!st)continue;
    const k={id:bookingId(),biz:b.id,svc:svcId,staff:st,branch:branch||b.branches[0],start:d.getTime(),status:b.autoConfirm?'confirmed':'pending',via,pay,client:AUTH.client?{name:AUTH.client.name,phone:AUTH.client.phone}:{name:'Guest',phone:''},mine:true,created:Date.now(),group:grp,consent:true};
    BOOKINGS.push(k);made.push(k)}
  saveDB();const k=made[0];const when=`${fmtD(new Date(k.start))}, ${fmtT(m)}`;
  notify('client',b.autoConfirm?'confirm':'pending',b.autoConfirm?`Booking confirmed · ${k.id}`:`Request sent · ${k.id}`,`${sv.name} at ${b.name} · ${when}`);
  notify(b.id,b.autoConfirm?'new':'request',b.autoConfirm?'New booking':'New appointment request',`${k.client.name} · ${sv.name} · ${when} · via ${via}`);
  return made;
}

/* ================= state ================= */
const S={view:'home',arg:null,F:{},dash:'overview',adm:'overview',lang:'en',calDay:0,cview:'day',mb:null,chat:{},chatBiz:null,drawer:false,handover:true,after:null,afterLogin:null,login:{step:'phone',phone:'',name:'',err:''},blogin:{},clientMode:!!AUTH.client};

/* ================= toast + modal ================= */
function toast(html,icon='bell'){const t=document.createElement('div');t.className='toast';t.innerHTML=ic(icon)+`<div>${html}</div>`;$('#toasts').appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300)},4200)}
function modal(html,wide){$('#modal').innerHTML=`<div class="scrim" data-a="closeModal" data-self="1">${wide?html:`<div class="modal" role="dialog" aria-modal="true">${html}</div>`}</div>`}
function closeModal(){$('#modal').innerHTML=''}

/* ================= art: covers, scenes, bot ================= */
function art(b,cls='',inner='',style=''){
  const I=IND[b.look||b.ind];const h=hash(b.id);const pid='d'+b.id+(cls.length%7);
  return `<div class="art ${cls}" style="background:var(${I.g});${style}">
   <svg class="deco" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><pattern id="${pid}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,.22)"/></pattern></defs>
    <circle cx="${60+h%200}" cy="${40+h%60}" r="${90+h%40}" fill="rgba(255,255,255,.12)"/>
    <circle cx="${300-h%90}" cy="${230-h%50}" r="${70+h%30}" fill="rgba(0,0,0,.10)"/>
    <rect width="400" height="300" fill="url(#${pid})" opacity=".7"/>
   </svg><svg class="big" viewBox="0 0 24 24" aria-hidden="true">${ICON[I.i]}</svg>${inner}</div>`;
}
const PAL={'Photo':{wall:'#FBEFF3',wall2:'#F5DFE7',floor:'#E4C6D0',A:'#E9479A',wood:'#B98A6A'},'Banquet':{wall:'#FCEADF',wall2:'#F6DCCB',floor:'#E7C3B0',A:'#E9479A',wood:'#C9A27E'},'Home':{wall:'#FFF0E0',wall2:'#F8E0C8',floor:'#E3C2A6',A:'#F25A12',wood:'#B98A6A'},'Government':{wall:'#F4ECE4',wall2:'#EADDD0',floor:'#D6C2B2',A:'#B83A78',wood:'#A57D58'},'Dental clinic':{wall:'#FBE3E8',wall2:'#F5D2D9',floor:'#E3B8C0',A:'#F25A12',wood:'#D8B999'},'Hospital':{wall:'#F8E6EA',wall2:'#F3D3DA',floor:'#E1BBC3',A:'#FF7A33',wood:'#C9A27E'},'Salon':{wall:'#F7EDEC',wall2:'#F3DEDC',floor:'#DEC1C8',A:'#E9479A',wood:'#B98A6A'},'Spa':{wall:'#F6E9E9',wall2:'#F1DAD8',floor:'#DEC1C8',A:'#FF7FB6',wood:'#B8977A'},'Gym':{wall:'#FDEDE4',wall2:'#F7DCCF',floor:'#E6C2B4',A:'#F25A12',wood:'#5A4A3A'},'Consultant':{wall:'#F4E7E7',wall2:'#EDD6D5',floor:'#D7BCC3',A:'#C2447F',wood:'#B08C68'}};
function scene(b,kind){
  const p=PAL[b.look||b.ind],A=p.A;let s='';
  const plant=(x,y)=>`<rect x="${x-14}" y="${y}" width="28" height="30" rx="4" fill="#E9E3D8"/><ellipse cx="${x-10}" cy="${y-14}" rx="9" ry="20" fill="#CCA0AB" transform="rotate(-22 ${x-10} ${y-14})"/><ellipse cx="${x+10}" cy="${y-16}" rx="9" ry="22" fill="#DFB3BE" transform="rotate(20 ${x+10} ${y-16})"/><ellipse cx="${x}" cy="${y-24}" rx="8" ry="24" fill="#EBC7D0"/>`;
  const win=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#BFE0F7"/><path d="M${x} ${y+h*.7} q${w*.3} -${h*.25} ${w*.55} -${h*.1} t${w*.45} -${h*.12} V${y+h} H${x}z" fill="#9BCDEB"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="#fff" stroke-width="7"/><line x1="${x+w/2}" y1="${y}" x2="${x+w/2}" y2="${y+h}" stroke="#fff" stroke-width="5"/>`;
  const lamp=x=>`<line x1="${x}" y1="0" x2="${x}" y2="48" stroke="#555" stroke-width="2"/><path d="M${x-18} 66 a18 18 0 0 1 36 0z" fill="${A}"/><ellipse cx="${x}" cy="70" rx="40" ry="8" fill="#FFF6C8" opacity=".35"/>`;
  const person=(x,y,coat,skin,hair)=>`<path d="M${x-30} ${y+70} q0 -46 30 -46 q30 0 30 46z" fill="${coat}"/><circle cx="${x}" cy="${y}" r="20" fill="${skin}"/><path d="M${x-21} ${y-2} a21 21 0 0 1 42 0 q-8 -12 -21 -12 q-13 0 -21 12z" fill="${hair}"/>`;
  const room=()=>`<rect width="400" height="300" fill="${p.wall}"/><rect x="0" y="0" width="400" height="18" fill="${p.wall2}"/><rect y="215" width="400" height="85" fill="${p.floor}"/><rect y="212" width="400" height="5" fill="${p.wall2}"/>`;
  if(kind==='exterior'){
    s=`<rect width="400" height="300" fill="#BFDDF5"/><circle cx="335" cy="55" r="24" fill="#FFE29A"/><ellipse cx="90" cy="60" rx="40" ry="12" fill="#fff" opacity=".8"/><rect y="252" width="400" height="48" fill="#B09BA0"/><rect y="248" width="400" height="6" fill="#D5C8CB"/>
      <rect x="55" y="62" width="290" height="190" fill="${p.wall}"/><rect x="55" y="62" width="290" height="40" fill="${A}"/><text x="200" y="88" text-anchor="middle" font-size="17" font-weight="700" fill="#fff" font-family="DM Sans,sans-serif">${esc(b.name)}</text>
      ${[0,1,2,3].map(i=>`<rect x="${78+i*66}" y="118" width="46" height="52" rx="4" fill="#9FC9EA" stroke="#fff" stroke-width="3"/>`).join('')}
      <rect x="170" y="182" width="60" height="70" rx="4" fill="#796066"/><rect x="176" y="188" width="22" height="58" fill="#9FC9EA"/><rect x="202" y="188" width="22" height="58" fill="#9FC9EA"/>${plant(120,222)}${plant(285,222)}`;
  }else if(kind==='reception'){
    const short=b.name.split(' ').slice(0,2).join(' ');
    s=room()+lamp(130)+lamp(270)+`<rect x="120" y="86" width="160" height="44" rx="10" fill="${A}"/><text x="200" y="114" text-anchor="middle" font-size="16" font-weight="700" fill="#fff" font-family="DM Sans,sans-serif">${esc(short)}</text>`
     +person(200,150,'#fff','#C68B62','#2B1E16')+`<rect x="85" y="175" width="230" height="58" rx="10" fill="${p.wood}"/><rect x="85" y="175" width="230" height="10" rx="4" fill="${A}"/><rect x="230" y="160" width="40" height="18" rx="3" fill="#4D3037"/>`+plant(345,212)+plant(50,212);
  }else if(kind==='team'){
    s=room()+win(270,40,100,90)+person(120,120,b.cat==='health'?'#fff':A,'#E0B08A','#3A2A20')+person(200,110,b.cat==='health'?'#fff':'#4D3037','#B97E58','#151515')+person(280,122,b.cat==='health'?'#fff':A,'#F0C7A3','#6B3E26')
     +(b.cat==='health'?`<path d="M112 160 q0 22 16 22" stroke="#5E3C44" stroke-width="3" fill="none"/><circle cx="128" cy="184" r="4" fill="#5E3C44"/>`:'')+`<rect y="230" width="400" height="70" fill="${p.floor}"/>`;
  }else if(kind==='detail'){
    s=`<rect width="400" height="300" fill="${p.wall2}"/><circle cx="90" cy="70" r="70" fill="#fff" opacity=".35"/><circle cx="330" cy="230" r="90" fill="#fff" opacity=".25"/><circle cx="300" cy="60" r="16" fill="${A}" opacity=".25"/>
      <rect x="110" y="170" width="180" height="70" rx="14" fill="#fff"/><g transform="translate(150 50) scale(4.2)" fill="none" stroke="${A}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${ICON[IND[b.look||b.ind].i]}</g>`;
  }else{
    s=room()+win(40,40,120,110)+lamp(250);
    const o={'Dental clinic':`<rect x="232" y="196" width="18" height="34" fill="#A68C92"/><path d="M180 170 h110 a14 14 0 0 1 0 28 h-110z" fill="${A}"/><path d="M180 172 q-28 -44 -6 -86 l22 4 q-14 38 6 82z" fill="${A}"/><path d="M330 40 q-60 0 -76 52" stroke="#A68C92" stroke-width="6" fill="none"/><ellipse cx="252" cy="96" rx="24" ry="13" fill="#F9F3F5" stroke="#A68C92" stroke-width="3"/><rect x="300" y="150" width="50" height="8" rx="3" fill="#DECACF"/><rect x="322" y="158" width="6" height="70" fill="#A68C92"/>`,
     'Hospital':`<rect x="170" y="160" width="200" height="30" rx="8" fill="#fff"/><rect x="170" y="148" width="64" height="22" rx="9" fill="#F7E8EC"/><rect x="170" y="186" width="200" height="10" fill="${A}"/><rect x="182" y="196" width="8" height="30" fill="#A68C92"/><rect x="352" y="196" width="8" height="30" fill="#A68C92"/><rect x="250" y="40" width="74" height="54" rx="6" fill="#451C27"/><path d="M258 72 h14 l7 -14 l9 26 l7 -12 h21" stroke="#F899A8" stroke-width="3" fill="none"/>`,
     'Salon':`<ellipse cx="270" cy="100" rx="56" ry="70" fill="#fff" stroke="${p.wood}" stroke-width="8"/><ellipse cx="270" cy="100" rx="44" ry="58" fill="#F8E9EE"/><rect x="230" y="168" width="80" height="20" rx="6" fill="${p.wood}"/><path d="M230 186 h80 v26 h-80z" fill="${A}"/><rect x="236" y="150" width="68" height="40" rx="12" fill="${A}"/><rect x="266" y="210" width="8" height="20" fill="#777"/><ellipse cx="270" cy="232" rx="30" ry="5" fill="#777"/>`,
     'Spa':`<rect x="180" y="170" width="190" height="20" rx="10" fill="#fff"/><rect x="180" y="186" width="190" height="10" fill="${p.wood}"/><rect x="190" y="196" width="10" height="30" fill="${p.wood}"/><rect x="350" y="196" width="10" height="30" fill="${p.wood}"/><rect x="200" y="158" width="60" height="16" rx="8" fill="${A}" opacity=".7"/>${[0,1,2].map(i=>`<rect x="${250+i*26}" y="${118-i*6}" width="14" height="${30+i*6}" rx="3" fill="#FFF6E0"/><ellipse cx="${257+i*26}" cy="${110-i*6}" rx="4" ry="7" fill="#FFB547"/>`).join('')}`,
     'Gym':`<rect x="300" y="60" width="8" height="150" fill="${p.wood}"/><rect x="352" y="60" width="8" height="150" fill="${p.wood}"/>${[0,1,2,3,4,5].map(i=>`<rect x="300" y="${76+i*24}" width="60" height="5" rx="2" fill="${p.wood}"/>`).join('')}<rect x="150" y="204" width="150" height="12" rx="6" fill="${A}"/><rect x="170" y="190" width="120" height="9" rx="4.5" fill="#FFAA1F"/><circle cx="96" cy="186" r="28" fill="${A}" opacity=".8"/><ellipse cx="88" cy="176" rx="9" ry="5" fill="#fff" opacity=".35"/>`,
     'Photo':`<rect x="60" y="40" width="70" height="175" fill="${A}" opacity=".22"/><rect x="250" y="70" width="70" height="60" rx="6" fill="#fff" stroke="${p.wood}" stroke-width="4"/><path d="M285 130 L270 215 M285 130 L300 215 M285 130 L285 215" stroke="#6B5A60" stroke-width="4"/><rect x="150" y="120" width="56" height="36" rx="6" fill="#2E2A30"/><circle cx="178" cy="138" r="11" fill="#4A4550" stroke="${A}" stroke-width="3"/><rect x="160" y="112" width="14" height="8" rx="2" fill="#2E2A30"/><path d="M178 156 L165 215 M178 156 L191 215 M178 156 L178 215" stroke="#6B5A60" stroke-width="3"/>`,
     'Banquet':`<line x1="250" y1="0" x2="250" y2="30" stroke="#A57D58" stroke-width="2"/>${[-30,-15,0,15,30].map(d=>`<line x1="250" y1="30" x2="${250+d*1.6}" y2="58" stroke="#E2B76A" stroke-width="2"/><circle cx="${250+d*1.6}" cy="62" r="5" fill="#FFE29A"/>`).join('')}<ellipse cx="250" cy="72" rx="70" ry="10" fill="#FFF6C8" opacity=".4"/><ellipse cx="250" cy="190" rx="78" ry="16" fill="#fff"/><path d="M172 190 q78 50 156 0 v30 h-156z" fill="#fff"/><rect x="236" y="168" width="28" height="22" rx="3" fill="${A}" opacity=".85"/>${[150,350].map(x=>`<rect x="${x-12}" y="176" width="24" height="44" rx="6" fill="${A}"/>`).join('')}`,
     'Home':`<rect x="200" y="60" width="140" height="44" rx="8" fill="#fff"/><rect x="210" y="92" width="120" height="4" rx="2" fill="#E3C2A6"/><circle cx="318" cy="72" r="3" fill="#7BC4FF"/><path d="M226 112 q6 10 0 20M262 112 q6 10 0 20M298 112 q6 10 0 20" stroke="#9FC9EA" stroke-width="3" fill="none"/><rect x="180" y="176" width="110" height="46" rx="8" fill="${A}"/><rect x="214" y="166" width="42" height="14" rx="4" fill="none" stroke="#7A3A1F" stroke-width="5"/><rect x="180" y="194" width="110" height="5" fill="#7A3A1F" opacity=".35"/><path d="M90 220 L120 90 M130 220 L150 90 M112 130h30 M104 165h32 M98 200h34" stroke="${p.wood}" stroke-width="6" stroke-linecap="round"/>`,
     'Government':`<rect x="150" y="50" width="200" height="40" rx="6" fill="#3A1C2B"/><text x="250" y="77" text-anchor="middle" font-size="20" font-weight="700" fill="#FFAA1F" font-family="JetBrains Mono,monospace">A-024 → 2</text><rect x="120" y="150" width="260" height="70" rx="6" fill="${p.wood}"/><rect x="120" y="150" width="260" height="8" fill="${A}"/>${[0,1,2].map(i=>`<rect x="${140+i*80}" y="104" width="60" height="46" rx="4" fill="#BFE0F7" opacity=".8"/><text x="${170+i*80}" y="182" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" font-family="DM Sans,sans-serif">${i+1}</text>`).join('')}`,

     'Consultant':`<rect x="170" y="160" width="200" height="12" rx="4" fill="${p.wood}"/><rect x="180" y="172" width="10" height="56" fill="${p.wood}"/><rect x="350" y="172" width="10" height="56" fill="${p.wood}"/><rect x="230" y="120" width="70" height="44" rx="4" fill="#4D3037"/><rect x="236" y="126" width="58" height="32" fill="#EA9DB1"/><rect x="220" y="162" width="90" height="5" rx="2" fill="#555"/><rect x="320" y="140" width="22" height="22" rx="4" fill="#fff"/><path d="M342 146 h6 a5 5 0 0 1 0 10 h-6" stroke="#fff" stroke-width="3" fill="none"/>`}[b.look||b.ind];
    s+=o+plant(120,198);
  }
  return `<svg class="scene" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(b.name)} ${kind}">${s}</svg>`;
}
const PHOTOS=[['room','Treatment room'],['reception','Reception'],['team','Our team'],['detail','Care & detail'],['exterior','Outside']];
const photoCap=(b,k,c)=>k==='room'?({'Photo':'Studio floor','Banquet':'Main hall','Home':'On the job','Government':'Service counters','Dental clinic':'Treatment room','Hospital':'Patient room','Salon':'Styling station','Spa':'Therapy room','Gym':'Studio floor','Consultant':'Meeting room'}[b.look||b.ind]):c;

/* ================= APPY — the capybara mascot ================= */
const PLAT={id:'appointly',name:'Appointly',bot:'Capi',ind:'Consultant'};
function appySVG(kind='full'){
  const vb=kind==='head'?'30 6 140 140':'0 -6 200 228';
  const cf=[['#F25A12',-46,-58],['#E9479A',44,-62],['#FFAA1F',-62,-14],['#FF9CCB',60,-20],['#F25A12',-30,-80],['#E9479A',24,-86],['#FFAA1F',70,-50],['#FF9CCB',-70,-46]];
  return `<svg class="appy ${kind}" data-mood="idle" viewBox="${vb}" role="img" aria-label="Capi the capybara">
   <ellipse class="a-shadow" cx="100" cy="212" rx="50" ry="7"/>
   <g class="a-body">
    <ellipse cx="78" cy="205" rx="15" ry="7" fill="url(#ap-dark)"/><ellipse cx="122" cy="205" rx="15" ry="7" fill="url(#ap-dark)"/>
    <path d="M42 168C42 128 68 116 100 116S158 128 158 168C158 196 134 208 100 208S42 196 42 168Z" fill="url(#ap-fur)"/>
    <ellipse cx="100" cy="174" rx="34" ry="26" fill="url(#ap-belly)"/>
    <ellipse cx="88" cy="164" rx="12" ry="5" fill="#fff" opacity=".18"/>
    <g class="a-arm-l"><ellipse cx="54" cy="162" rx="10.5" ry="19" fill="url(#ap-dark)" transform="rotate(18 54 162)"/></g>
    <g class="a-arm-r"><ellipse cx="146" cy="162" rx="10.5" ry="19" fill="url(#ap-dark)" transform="rotate(-18 146 162)"/></g>
    <g class="a-head">
     <ellipse cx="58" cy="48" rx="10" ry="9" fill="url(#ap-dark)"/><ellipse cx="58" cy="49" rx="4.5" ry="4" fill="#E89AA3"/>
     <ellipse cx="142" cy="48" rx="10" ry="9" fill="url(#ap-dark)"/><ellipse cx="142" cy="49" rx="4.5" ry="4" fill="#E89AA3"/>
     <rect x="40" y="40" width="120" height="90" rx="40" fill="url(#ap-fur)"/>
     <rect x="58" y="80" width="84" height="50" rx="25" fill="url(#ap-snout)"/>
     <ellipse cx="80" cy="52" rx="26" ry="8" fill="#fff" opacity=".24"/>
     <g class="a-orange"><path d="M100 20q1-7 6-9" stroke="#6B3E1F" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M104 13q9-7 16-1q-8 7-16 1z" fill="#FF8CB4"/><circle cx="100" cy="31" r="14" fill="url(#ap-orange)"/><ellipse cx="95" cy="26" rx="4.6" ry="3" fill="#fff" opacity=".6"/><circle cx="106" cy="36" r="1" fill="#C9500F" opacity=".5"/><circle cx="96" cy="38" r=".9" fill="#C9500F" opacity=".5"/></g>
     <g class="a-eyes"><g class="a-eye"><ellipse cx="72" cy="68" rx="6.6" ry="8" fill="#24120C"/><circle cx="74.4" cy="64.6" r="2.5" fill="#fff"/><circle cx="69.8" cy="71" r="1.1" fill="#fff"/></g><g class="a-eye"><ellipse cx="128" cy="68" rx="6.6" ry="8" fill="#24120C"/><circle cx="130.4" cy="64.6" r="2.5" fill="#fff"/><circle cx="125.8" cy="71" r="1.1" fill="#fff"/></g></g>
     <g class="a-happy" fill="none" stroke="#24120C" stroke-width="3.4" stroke-linecap="round"><path d="M64 70q8-10 16 0"/><path d="M120 70q8-10 16 0"/></g>
     <ellipse class="a-cheek" cx="52" cy="90" rx="8" ry="5" fill="#FF7FB0"/><ellipse class="a-cheek" cx="148" cy="90" rx="8" ry="5" fill="#FF7FB0"/>
     <rect x="78" y="86" width="44" height="14" rx="7" fill="url(#ap-nose)"/><ellipse cx="90" cy="93.5" rx="3.2" ry="2.2" fill="#140804"/><ellipse cx="110" cy="93.5" rx="3.2" ry="2.2" fill="#140804"/><ellipse cx="94" cy="89" rx="8" ry="1.6" fill="#fff" opacity=".3"/><path d="M100 100v6" stroke="#7A4A25" stroke-width="2" stroke-linecap="round"/>
     <path class="a-smile" d="M88 108q6 7 12 0q6 7 12 0" stroke="#4A2617" stroke-width="2.8" fill="none" stroke-linecap="round"/>
     <g class="a-open"><path d="M90 107q10 18 20 0z" fill="#6E2234"/><ellipse cx="100" cy="115" rx="5" ry="2.6" fill="#FF8CB4"/></g>
    </g>
    <g class="a-thought"><circle cx="156" cy="44" r="4" fill="#fff" stroke="#F5D3B8"/><circle cx="166" cy="30" r="6" fill="#fff" stroke="#F5D3B8"/><rect x="152" y="-2" width="44" height="22" rx="11" fill="#fff" stroke="#F5D3B8"/><g class="a-dots" fill="#E9479A"><circle cx="164" cy="9" r="2.6"/><circle cx="174" cy="9" r="2.6"/><circle cx="184" cy="9" r="2.6"/></g></g>
    ${cf.map(([c,dx,dy],i)=>`<rect class="a-cf" x="97" y="70" width="7" height="${i%2?7:11}" rx="2" fill="${c}" style="--dx:${dx}px;--dy:${dy}px;animation-delay:${(i%4)*.05}s"/>`).join('')}
   </g></svg>`;
}
const APPY_DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
 <radialGradient id="ap-fur" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#E8AE6C"/><stop offset=".55" stop-color="#C98B4E"/><stop offset="1" stop-color="#9A5F31"/></radialGradient>
 <radialGradient id="ap-snout" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="#E2AC72"/><stop offset="1" stop-color="#B07440"/></radialGradient>
 <radialGradient id="ap-belly" cx=".5" cy=".35" r=".75"><stop offset="0" stop-color="#F8DDB0"/><stop offset="1" stop-color="#E2B57A"/></radialGradient>
 <radialGradient id="ap-dark" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#B07240"/><stop offset="1" stop-color="#7A4A25"/></radialGradient>
 <radialGradient id="ap-orange" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFC56E"/><stop offset=".55" stop-color="#FF8A2B"/><stop offset="1" stop-color="#E5500F"/></radialGradient>
 <linearGradient id="ap-nose" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E3624"/><stop offset="1" stop-color="#2E160C"/></linearGradient>
</defs></svg>`;
function botAv(b,size=40){return `<span class="bot-av" style="width:${size}px;height:${size}px" aria-hidden="true">${appySVG('head')}${size>=34?'<i class="ai">AI</i>':''}</span>`}
function appyMood(sel,mood,ms){document.querySelectorAll(sel).forEach(e=>{clearTimeout(e._t);e.dataset.mood=mood;if(ms)e._t=setTimeout(()=>{e.dataset.mood='idle'},ms)})}
function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=['#F25A12','#E9479A','#FFAA1F','#FF9CCB','#FFD27A'];
  for(let i=0;i<70;i++){const d=document.createElement('i');d.className='cf';d.style.background=c[i%5];d.style.left=(50+(Math.random()-.5)*24)+'vw';d.style.top='55vh';document.body.appendChild(d);
   const dx=(Math.random()-.5)*Math.min(1000,innerWidth*1.2),dy=-160-Math.random()*380;
   d.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${dx*.6}px,${dy}px) rotate(${360*Math.random()}deg)`,opacity:1,offset:.45},{transform:`translate(${dx}px,${dy+760}px) rotate(${720*Math.random()}deg)`,opacity:0}],{duration:1700+Math.random()*900,easing:'cubic-bezier(.2,.6,.4,1)'}).onfinish=()=>d.remove()}}
function appyCelebrate(){appyMood('.appy-launch .appy, .chat-head .appy, .modal .appy, .chat-intro .appy','celebrate',2600);confetti()}
const BUBBLE={'c-home':'Hey! I’m Capi. Tell me what you need and I’ll find a slot!',explore:'Psst! Describe it to me and I’ll sniff out the right place.','c-calendar':'Need to move a booking? I’ve got you!',register:'Ooh, a new business! I’ll help you set up.','client-login':'Hi friend! Log in or just look around.',home:'Hey! I’m Capi. Let me find the perfect slot for you!',discover:'Psst! Tell me what you need and I’ll sniff out a slot.',biz:'Hey! I’m Capi. Let me find the perfect slot for you!',site:'Hi there! Want me to grab you a slot?',manage:'Need to move a booking? I’ve got you!',dashboard:'Hi boss! Ask me “how many clients today?”','business-login':'New here? I’ll show you around!'};
function renderLauncher(){const el=$('#launch');if(S.drawer||['chat','admin','admin-login'].includes(S.view)){el.innerHTML='';return}
  const msg=BUBBLE[S.view]||'Hey! I’m Capi, your little appointment buddy!';const show=!S.bubbleSeen||!S.bubbleSeen[S.view];
  el.innerHTML=`<div class="appy-launch">${show?`<div class="appy-bubble" id="appybubble" data-a="appyOpen"><button class="x" data-a="hideBubble" aria-label="Dismiss">${ic('x')}</button><b>Capi</b>${esc(msg)}</div>`:''}<button class="appy-btn" data-a="appyOpen" aria-label="Chat with Capi, the AI assistant"><span class="appy-wrap">${appySVG('full')}</span><span class="appy-name">Ask Capi</span></button></div>`;
  setTimeout(()=>appyMood('.appy-launch .appy','wave',2700),600);
  clearTimeout(S.bubT);S.bubT=setTimeout(()=>{const b=$('#appybubble');if(b){b.classList.add('out');setTimeout(()=>b.remove(),300)}},9000)}
setInterval(()=>{const a=$('.appy-launch .appy');if(a&&a.dataset.mood==='idle'&&!document.hidden)appyMood('.appy-launch .appy',Math.random()<.6?'wave':'happy',2600)},17000);
function helpGreeting(){
  if(S.view==='dashboard'&&AUTH.business){const n=AUTH.business.name.split(' ').slice(0,2).join(' ');return `Hi ${esc(n)}! Capi here, ready to help. Shall we peek at today?<div class="opts"><button data-a="dashGo" data-v="calendar">Show today’s schedule</button><button data-a="say" data-v="Add a walk-in">Add a walk-in</button><button data-a="dashGo" data-v="channels">Share my booking link</button></div>`}
  if(S.view==='manage')return `Hi! I’m Capi. Verify your number on this page and I’ll fetch all your bookings!<div class="opts"><button data-a="say" data-v="How do I cancel?">How do I cancel?</button></div>`;
  return `Hey! I’m Capi, your little appointment buddy. What can I do for you today?<div class="opts"><button data-a="say" data-v="How does it work?">How does it work?</button><button data-a="say" data-v="Pricing">Pricing</button><button data-a="say" data-v="Add to my website">Add to my website</button><button data-a="say" data-v="I want to book an appointment">Book an appointment</button></div>`;
}
function helpQuick(){return S.view==='dashboard'?['Show today’s schedule','Add a walk-in','Booking link','Talk to the team']:['How does it work?','Pricing','Add to my website','Talk to the team']}
function handleHelp(text){
  const id='appointly',cs=chatState(id);cs.msgs.push({who:'me',html:esc(text)});renderChatLog();
  const s=text.toLowerCase();const go=(l,a,v='')=>`<button data-a="${a}" data-v="${v}">${l}</button>`;let r;
  if(cs.human)return botSay(id,'Thanks! I’ve noted that. Someone from our team will reply here or by email within a few minutes.',1000);
  if(S.view==='dashboard'&&CUR()&&!/human|person|the team|call me/.test(s)){const br=bizAsk(s);if(br){appyMood('.chat-head .appy','think',900);return botSay(id,br,800)}}
  if(/human|person|sales|demo|call me|someone|the team/.test(s))return doHandover(id);
  if(/schedule|today|calendar/.test(s)&&AUTH.business)r=`Here you go. Bookings from your website, link, WhatsApp and chat all land in one calendar.<div class="opts">${go('Open calendar','dashGo','calendar')}</div>`;
  else if(/walk.?in|queue|token|new appointment/.test(s)){if(S.view==='dashboard'&&CUR()){r='Sure! Opening a new appointment for your walk-in.';setTimeout(()=>{closeDrawer();ACT.newAppt()},900)}else r='Businesses can add walk-ins and phone bookings in one tap from the dashboard.'}
  else if(/pric|cost|plan|how much|fee/.test(s))r=`Three plans, each with a 14-day free trial:<div class="ccard"><div class="row" style="justify-content:space-between"><span>Starter · 1 branch</span><b>₹999/mo</b></div><div class="row" style="justify-content:space-between"><span>Growth · AI assistant</span><b>₹2,499/mo</b></div><div class="row" style="justify-content:space-between"><span>Scale · chains & hospitals</span><b>₹5,999/mo</b></div></div><div class="opts">${go('Start free trial','nav','business-login')}</div>`;
  else if(/widget|website|embed|code|wordpress|wix/.test(s))r=`Paste one line on your website and I’ll show up there as your booking assistant, with a Book button.<div class="ccard"><code style="font-size:12px;word-break:break-all">${esc(SNIP)}</code></div><div class="opts">${go('Copy code','copy',esc(SNIP))}${go('See it live','nav','site-smilecaredental')}</div>`;
  else if(/link|booking page|instagram|google|channel/.test(s))r=`Every business gets a page like <b>book.appointly.app/your-name</b> to share on Instagram, Google Maps, WhatsApp or SMS.<div class="opts">${AUTH.business&&S.view==='dashboard'?go('Open booking channels','dashGo','channels'):go('See a sample page','nav','book-stylestudiosalon')}</div>`;
  else if(/cancel|reschedul|my booking|change/.test(s))r=`Use the link in your WhatsApp confirmation, or manage it here. Free changes are allowed until the business’s cancellation window.<div class="opts">${go('Manage my booking','nav','manage')}</div>`;
  else if(/staff|employee|team member/.test(s))r=AUTH.business?`Each person gets their own hours, services and calendar column.<div class="opts">${go('Open Staff','dashGo','staff')}</div>`:'Each staff member gets their own hours, services and calendar column. Staff see only their branch and role.';
  else if(/remind|whatsapp|no.?show/.test(s))r='I send WhatsApp reminders 24 hours and 2 hours before each visit. Businesses on Appointly see far fewer no-shows.';
  else if(/how|work|what is|what does/.test(s))r=`Customers book on your website, your booking link or WhatsApp, by picking a time or chatting with me. I check live availability, confirm on WhatsApp and drop it into your calendar. They never need an app or an account.<div class="opts">${go('See how it works','helpScroll','channels')}${go('Pricing','say','Pricing')}</div>`;
  else if(/book|appointment|dentist|doctor|haircut|massage|salon|spa|gym/.test(s))r=`Happy to help! What kind of place?<div class="opts">${DB.cats.map(c=>go(c.label,'goCat',c.id)).join('')}</div>`;
  else if(/capybara|who are you|your name|appy|tangerine|orange|cute/.test(s)){r='I’m Capi, your little appointment buddy! Capybaras are the calmest animals around, so I never panic when the phone keeps ringing. The tangerine? It’s my lucky hat.';setTimeout(()=>appyMood('.chat-head .appy, .appy-launch .appy','happy',1600),800)}
  else if(/thank|great|awesome|love/.test(s)){r='Aww, anytime! I’ll be right here in the corner if you need me.';setTimeout(()=>appyMood('.chat-head .appy','celebrate',1800),800)}
  else if(/^(hi|hello|hey|namaste)\b/.test(s))r=helpGreeting();
  else r=`Hmm, that one’s new to me! I can help with pricing, adding Appointly to your website or booking an appointment, or connect you to our team.<div class="opts">${go('Pricing','say','Pricing')}${go('Website widget','say','Website widget')}${go('Talk to the team','handover')}</div>`;
  botSay(id,r);
}
function meetCapi(){
  return `<section class="band meet-band"><div class="wrap meet">
   <div class="meet-stage"><div class="wavyblob"></div><button class="meet-appy" data-a="appyPoke" aria-label="Poke Capi">${appySVG('full')}</button></div>
   <div><span class="eyebrow">Meet your assistant</span><h2 class="meet-h">Say hi to Capi</h2><p style="font-family:var(--f-display);font-size:20px;color:var(--amber);margin-top:4px">Your little appointment buddy!</p>
    <p class="muted" style="font-size:17px;max-width:52ch;margin-top:10px">Capi is a calm, kind capybara who never rushes and never double-books. Capi books, reschedules and answers questions for your customers around the clock.</p>
    <ul class="traits">${[['clock','Never rushes, never double-books'],['globe','Speaks English, हिन्दी and తెలుగు'],['headset','Hands over to your team when it should'],['sparkle','Wears a lucky tangerine hat']].map(([i,t])=>`<li><span class="ic">${ic(i)}</span>${t}</li>`).join('')}</ul>
    <div class="row" style="flex-wrap:wrap;gap:8px;margin-top:20px">${[['wave','Wave'],['think','Think'],['celebrate','Celebrate'],['happy','Cuddle'],['talk','Chat']].map(([m,l])=>`<button class="chip" data-a="appyDo" data-v="${m}">${l}</button>`).join('')}</div>
    <button class="btn primary lg" style="margin-top:18px" data-a="appyOpen">${ic('chat')} Chat with Capi</button></div>
  </div></section>`;
}

/* ================= header / nav ================= */
const CLIENTV=['c-home','explore','c-calendar','c-notifs','c-profile'];
const CNAV=[['c-home','home','Home'],['explore','search','Explore'],['c-calendar','calendar','My bookings'],['c-notifs','bell','Notifications'],['c-profile','user','Profile']];
function portalOf(v){if(v==='dashboard')return 'business';if(v==='admin')return 'admin';if(['business-login','admin-login','client-login','register'].includes(v))return 'auth';if(v==='site')return 'site';if(CLIENTV.includes(v))return 'client';if(['biz','chat'].includes(v))return (S.clientMode||AUTH.client)?'client':'booking';return 'marketing'}
function renderTop(){
  const p=portalOf(S.view);$('.top').hidden=p==='site';
  let left=`<a class="logo" href="#home" aria-label="Appointly home"><span class="logo-mark">${ic('calendar')}</span>Appointly</a>`,nav='',right='';
  const bn=$('#bnav');bn.className='bnav';bn.innerHTML='';
  if(p==='business'){const b=CUR();const un=DB.notifs.filter(n=>n.to===b.id&&!n.read).length;nav=`<span class="pill brand hide-sm">Business</span>`;
    right=`<button class="iconbtn" data-a="bizNotifs" aria-label="Notifications${un?`, ${un} unread`:''}">${ic('bell')}${un?'<span class="dot"></span>':''}</button><a class="btn sm primary" href="#book-${b.id}">${ic('user')}<span class="hide-sm">Customer view</span></a><a class="btn sm hide-sm" href="#site-${b.id}">${ic('globe')}Website</a><button class="btn sm" data-a="logout" data-v="business">${ic('logout')}<span class="hide-sm">Log out</span></button>`}
  else if(p==='admin'){nav=`<span class="pill amber">Super admin</span>`;right=`<button class="btn sm" data-a="logout" data-v="admin">${ic('logout')}<span class="hide-sm">Log out</span></button>`}
  else if(p==='auth'){right=`<a class="btn ghost sm" href="#home">← Back to Appointly</a>`}
  else if(p==='client'){left=`<a class="logo" href="#c-home" aria-label="Appointly home"><span class="logo-mark">${ic('calendar')}</span>Appointly</a>`;const un=DB.notifs.filter(n=>n.to==='client'&&!n.read).length;
    const on=h=>S.view===h||(h==='explore'&&S.view==='biz');
    nav=`<nav class="nav">${CNAV.slice(0,3).map(([h,i,l])=>`<a href="#${h}" class="${on(h)?'on':''}">${l}</a>`).join('')}</nav>`;
    right=`<a class="iconbtn hide-sm" href="#c-notifs" aria-label="Notifications${un&&AUTH.client?`, ${un} unread`:''}">${ic('bell')}${un&&AUTH.client?'<span class="dot"></span>':''}</a>${AUTH.client?`<a class="me-btn" href="#c-profile">${avatar(AUTH.client.name,30)}<span class="hide-sm">${esc(AUTH.client.name.split(' ')[0])}</span></a><button class="btn sm" data-a="logout" data-v="client" aria-label="Log out">${ic('logout')}<span class="hide-sm">Log out</span></button>`:`<a class="btn sm primary" href="#client-login">Log in</a>`}`;
    bn.className='bnav client';bn.innerHTML=CNAV.map(([h,i,l])=>`<a href="#${h}" class="${on(h)?'on':''}">${ic(i)}${l==='My bookings'?'Bookings':l==='Notifications'?'Alerts':l}${h==='c-notifs'&&un&&AUTH.client?'<i class="bdot"></i>':''}</a>`).join('')}
  else if(p==='booking'){const b=S.arg?BIZ[S.arg]:null;
    if(b)left=`<a class="logo" href="#book-${b.id}" style="font-size:18px">${logo(b,36)}<span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(b.name)}</span></a>`;
    right=`${CUR()?`<a class="btn sm" href="#dashboard">${ic('chart')}<span class="hide-sm">Back to dashboard</span></a>`:''}<a class="btn ghost sm" href="#c-calendar">${ic('calendar')}<span class="hide-sm">My bookings</span></a><span class="pill hide-sm">Powered by Appointly</span>`}
  else{nav=`<nav class="nav"><a href="#home" data-a="scrollTo" data-v="channels">How it works</a><a href="#home" data-a="scrollTo" data-v="biz-features">Features</a><a href="#home" data-a="scrollTo" data-v="pricing">Pricing</a><a href="#explore" data-a="clientEntry">Explore</a></nav>`;
    right=CUR()?`<a class="btn sm primary" href="#dashboard">${ic('chart')}My dashboard</a>`:`<a class="btn ghost sm" href="#client-login" data-a="clientEntry">Client</a><a class="btn sm primary" href="#business-login">Business</a>`}
  $('#topbar').innerHTML=`${left}${nav}<span class="spacer"></span>${right}`;
}

/* ================= LANDING ================= */
const SNIP=snip({id:'smilecaredental'});
function vHome(){
  const reps={health:'smilecaredental',beauty:'stylestudiosalon',pro:'growthbridgeconsulting',fitness:'zenyogastudio',hosp:'celebrationhalls',home:'coolcareacservices',gov:'passportassistancecentre'};
  const ins=[['globe','Your website','Booking widget + AI chat'],['share','Booking link','Instagram bio, SMS, email'],['whatsapp','WhatsApp & Instagram','AI replies and books'],['pin','Google Maps','“Book” button on your profile'],['users','Walk-ins & phone','Front desk adds in one tap']];
  const outs=[['calendar','Live calendar','Every staff member and device'],['user','Customer record','History, notes, tags'],['bell','Reminders','WhatsApp 24 h and 2 h before'],['card','Payments','Deposits, UPI, cards'],['chart','Reports','Revenue, no-shows, channels']];
  return `
 <section class="hero"><div class="wrap hero-grid">
  <div>
   <span class="pill brand">${ic('sparkle')} One platform for every appointment</span>
   <h1 style="margin-top:18px">Book anything. <em>Run everything.</em></h1>
   <p class="lead">Customers find and book services in seconds. Businesses manage every appointment, from every channel, in one place.</p>
   <div class="entry">
    <a class="entry-card" href="#client-login" data-a="clientEntry"><span class="ic">${ic('user')}</span><b>Continue as Client</b><span>Discover businesses, book and manage appointments, get reminders.</span><em>Find a service ${ic('arrow')}</em></a>
    <a class="entry-card biz" href="#business-login"><span class="ic">${ic('building')}</span><b>Continue as Business</b><span>Register or log in. Manage appointments, staff, customers and revenue.</span><em>Business login ${ic('arrow')}</em></a>
   </div>
   <div class="trust"><div><b class="tnum">1,284</b>businesses live</div><div><b class="tnum">41%</b>booked by AI chat</div><div><b class="tnum">0</b>apps your customers install</div></div>
  </div>
  <div class="stage" aria-label="Demo of a customer booking by chat on a clinic website">
   <div class="wavyblob"></div><span class="spark" style="left:8%;top:12%"><svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg></span><span class="spark o" style="right:10%;top:4%;width:18px;height:18px;animation-delay:-1s"><svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg></span><span class="spark" style="right:4%;bottom:30%;width:34px;height:34px;animation-delay:-2s"><svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg></span><span class="spark o" style="left:14%;bottom:10%;animation-delay:-.5s"><svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg></span>
   <div class="float f1"><div class="row" style="gap:8px;margin-bottom:6px">${ic('globe')}<b>smilestudiodental.in</b></div><span class="muted">A patient is booking through your website widget. No Appointly account needed.</span></div>
   <div class="phone"><div class="screen">
     <div class="sh">${botAv(BIZ.smilecaredental,36)}<div><b style="font-size:14px">Capi · Smile Studio</b><div style="font-size:11px" class="muted">AI assistant on your website</div></div></div>
     <div class="sb" id="demo">
      <div class="b me demo-step">Need a cleaning this Saturday evening. Dr. Meera if possible</div>
      <div class="b bot demo-step">Dr. Meera is free Saturday at these times. Cleaning takes 45 min, ₹1,200.<div class="mini-slots" style="margin-top:8px"><span class="pick">4:30 PM</span><span>5:30 PM</span><span>6:15 PM</span></div></div>
      <div class="b me demo-step">4:30 works</div>
      <div class="b bot demo-step">What name and mobile number should I book under?<div class="mini-slots" style="margin-top:8px"><span class="pick">Ananya · verified ✓</span></div></div>
      <div class="b bot demo-step">✅ Booked. Reminder coming on WhatsApp.</div>
     </div>
   </div></div>
   <div class="float f2"><div class="row" style="justify-content:space-between;margin-bottom:8px"><b>Your calendar</b><span class="pill ok live">Synced</span></div>
     <div class="appt t-ai" style="position:relative;left:0;right:0"><b>4:30 PM · Ananya R.</b>Cleaning · via AI chat on website</div></div>
  </div>
 </div></section>

 <div class="marquee" aria-hidden="true"><span class="track">Book in seconds ✦ No app or account for your customers ✦ An AI assistant that speaks their language ✦ One calendar for every channel ✦ Reminders on WhatsApp ✦ Book in seconds ✦ No app or account for your customers ✦ An AI assistant that speaks their language ✦ One calendar for every channel ✦ Reminders on WhatsApp ✦ Book in seconds ✦ No app or account for your customers ✦ An AI assistant that speaks their language ✦ One calendar for every channel ✦ Reminders on WhatsApp ✦ Book in seconds ✦ No app or account for your customers ✦ An AI assistant that speaks their language ✦ One calendar for every channel ✦ Reminders on WhatsApp ✦ </span></div>
 <section class="band" id="channels" style="background:var(--surface);border-block:1px solid var(--line)"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">How it works</span><h2>Customers book where they already find you</h2><p>They never need to visit Appointly. Every channel checks the same live availability and lands in the same calendar.</p></div>
  <div class="flow">
   <div class="flow-col">${ins.map(([i,t,d])=>`<div class="flow-item in"><span class="ic">${ic(i)}</span><div><b>${t}</b><div class="muted" style="font-size:13px">${d}</div></div></div>`).join('')}</div>
   <div class="flow-hub"><span class="logo-mark" style="width:52px;height:52px;border-radius:16px">${ic('calendar')}</span><b style="font-family:var(--f-display);font-size:22px">Appointly</b><span style="font-size:13.5px;opacity:.8">Checks live availability, applies your rules, confirms on WhatsApp</span><span class="pill live" style="background:rgba(255,255,255,.14);color:#FFD7DD">Syncing</span></div>
   <div class="flow-col">${outs.map(([i,t,d])=>`<div class="flow-item out"><span class="ic">${ic(i)}</span><div><b>${t}</b><div class="muted" style="font-size:13px">${d}</div></div></div>`).join('')}</div>
  </div>
 </div></section>

 <section class="band"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">What your customers see</span><h2>Two ways to book, on your own page</h2><p>No download and no sign-up. They confirm their mobile number once with a code, and that’s it.</p></div>
  <div class="two">
   <div class="way" style="background:var(--surface);border:1px solid var(--line)"><span class="pill">${ic('calendar')} Pick a time</span><h3>Manual booking</h3><p class="muted">Service, branch, specialist, date and an open time. Prices and your cancellation window are shown before they confirm.</p>
    <ul><li>${ic('check')}Live availability per doctor, stylist or trainer</li><li>${ic('check')}UPI deposit or pay at the venue</li><li>${ic('check')}Manage or cancel from the WhatsApp link</li></ul>
    <a class="btn" style="margin-top:22px" href="#book-stylestudiosalon">Open a sample booking page ${ic('arrow')}</a></div>
   <div class="way" style="background:var(--brand-soft)"><div class="row">${botAv(BIZ.smilecaredental,44)}<span class="pill amber">Your AI assistant</span></div><h3>Booking by chat</h3><p class="muted">“Root canal next week, mornings only.” Your assistant knows your services, prices, staff and policies, finds slots and books after the customer confirms.</p>
    <ul><li>${ic('check')}English, हिन्दी, తెలుగు and more</li><li>${ic('check')}Books, reschedules and cancels within your rules</li><li>${ic('check')}Hands over to your team when asked</li></ul>
    <a class="btn primary" style="margin-top:22px" href="#site-smilecaredental">Try it on a clinic website ${ic('arrow')}</a></div>
  </div>
  <div class="panel" style="margin-top:20px;padding:22px;display:grid;grid-template-columns:1fr 1.3fr;gap:22px;align-items:center" id="embed">
   <div><span class="eyebrow">For your website</span><h3 style="font-size:24px;margin:8px 0 6px">One line of code</h3><p class="muted">Works with WordPress, Wix, Shopify, Squarespace or a hand-built site. Adds a Book button and your AI assistant.</p></div>
   <div class="stack" style="gap:10px;min-width:0"><pre class="code"><code>${esc(SNIP)}</code></pre><div class="row"><button class="btn sm" data-a="copy" data-v="${esc(SNIP)}">${ic('copy')} Copy code</button><a class="btn sm ghost" href="#site-smilecaredental">See it live ${ic('arrow')}</a></div></div>
  </div>
 </div></section>

`+meetCapi()+`
 <section class="band" id="biz-features" style="background:var(--surface);border-block:1px solid var(--line)"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Business portal</span><h2>Run the whole front desk from one screen</h2><p>Each business’s data is kept strictly separate. Staff see only what their role allows.</p></div>
  <div class="feat-grid">
   ${[['calendar','Live calendar','Every staff member, branch and device stays in sync the moment a booking lands.'],['queue','Walk-ins & queue','Issue tokens, show live wait times and call the next customer.'],['refresh','Waitlist recovery','Cancelled slots go straight to the waitlist on WhatsApp.'],['sparkle','AI assistant','Trained on your services, prices, staff, FAQs and policies.'],['users','Customer CRM','Visit history, spend, tags and recall reminders.'],['card','Payments','Deposits, UPI, cards and pay-at-venue in one ledger.'],['flow','Workflows','Choose when to confirm, remind, collect reviews and recall.'],['chart','Insights','See quiet hours, no-show risk and revenue by channel.']].map(([i,t,d])=>`<div class="feat"><div class="ic">${ic(i)}</div><h4>${t}</h4><p>${d}</p></div>`).join('')}
  </div>
 </div></section>

 <section class="band"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Built for your industry</span><h2>See a sample booking page</h2></div>
  <div class="ind-grid">${DB.cats.filter(c=>reps[c.id]&&BIZ[reps[c.id]]).map(c=>`<a href="#explore-${c.id}" class="ind" data-a="clientEntry"><div class="pic">${scene(BIZ[reps[c.id]],'room')}</div><div class="cap"><h4>${esc(c.label)}</h4><small>${c.subs.slice(0,3).map(x=>esc(x.label)).join(', ')}${c.subs.length>3?'…':''}</small></div></a>`).join('')}</div>
 </div></section>

 <section class="band" style="padding-top:0"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Getting started</span><h2>From sign-up to bookings in an afternoon</h2></div>
  <ol class="steps">
   <li><h4>Register your business</h4><p class="muted">Add services, staff, hours, branches and your cancellation window.</p></li>
   <li><h4>Review your assistant</h4><p class="muted">It learns your menu and FAQs. Set its name, tone, languages and when to hand over.</p></li>
   <li><h4>Share your link or add the widget</h4><p class="muted">Bookings from your website, Instagram, Google and WhatsApp land in your calendar.</p></li>
  </ol>
 </div></section>

 <section class="band" id="pricing" style="background:var(--surface);border-block:1px solid var(--line)"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Pricing</span><h2>Simple plans. 14 days free.</h2><p>Your customers never pay to book.</p></div>
  <div class="price-grid">
   ${[['Starter','999','For solo practitioners',['1 branch, 3 staff','Booking link + website widget','WhatsApp reminders','Basic reports'],false],['Growth','2,499','For busy clinics and salons',['3 branches, 15 staff','AI booking assistant','Queue, waitlist & CRM','Payments & deposits'],true],['Scale','5,999','For chains and hospitals',['Unlimited branches','Multilingual AI + handover','Custom workflows & API','Priority support'],false]].map(([n,a,d,f,h])=>`<div class="plan ${h?'hot':''}">${h?'<span class="pill brand" style="align-self:flex-start">Most popular</span>':''}<h3 style="font-size:22px">${n}</h3><p class="muted">${d}</p><div class="amt tnum">₹${a}<span class="muted" style="font-size:15px;font-weight:500">/month</span></div><ul>${f.map(x=>`<li>${ic('check')}${x}</li>`).join('')}</ul><a class="btn ${h?'primary':''}" href="#register" data-a="regTab">Start free trial</a></div>`).join('')}
  </div>
 </div></section>

 <section class="band"><div class="wrap stack" style="gap:16px">
  <div class="reco" style="grid-template-columns:auto 1fr auto"><div class="ic">${ic('search')}</div><div><b>Coming next: the Appointly marketplace</b><div class="muted" style="font-size:14px">Customers will be able to discover businesses on Appointly and book directly. Your existing page and calendar carry over automatically.</div></div><a class="btn" href="#marketplace">Preview</a></div>
  <div class="install"><div style="width:64px;height:64px;border-radius:18px;background:var(--amber);color:#fff;display:grid;place-items:center">${ic('download')}</div>
   <div style="flex:1;min-width:220px"><h3>Install the business app</h3><p>Your calendar, queue and notifications on any phone, tablet or laptop. Works offline at the front desk.</p></div>
   <button class="btn lg" data-a="install">Install app</button></div>
 </div></section>
 <footer><div class="wrap row" style="justify-content:space-between;flex-wrap:wrap"><span><b style="color:var(--fg)">Appointly</b> · Appointment software for service businesses</span><span class="row" style="gap:16px;flex-wrap:wrap"><a href="#business-login">Business login</a><a href="#manage">Manage a booking</a><a href="#admin-login">Admin</a></span></div></footer>`;
}
let demoTimer=null;
function runDemo(){
  clearTimeout(demoTimer);const steps=[...document.querySelectorAll('#demo .demo-step')];if(!steps.length)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){steps.forEach(s=>s.classList.add('show'));return}
  let i=0;steps.forEach(s=>s.classList.remove('show'));
  const tick=()=>{if(!document.contains(steps[0]))return;if(i<steps.length){steps[i++].classList.add('show');demoTimer=setTimeout(tick,1300)}else{demoTimer=setTimeout(()=>{steps.forEach(s=>s.classList.remove('show'));i=0;demoTimer=setTimeout(tick,600)},3500)}};
  tick();
}

/* ================= AUTH ================= */
const FCARDS=[['Ananya R.','Cleaning · 4:30 PM','AI chat'],['Rohit K.','Haircut · 11:00 AM','Website'],['Meher A.','Deep tissue · 6:00 PM','WhatsApp'],['Dev C.','OPD consult · 9:15 AM','Booking link'],['Isha V.','Gel manicure · 3:30 PM','AI chat'],['Kabir S.','PT session · 7:00 AM','Website'],['Tara M.','Root canal · 10:30 AM','Google'],['Neil K.','GST review · 2:00 PM','AI chat']];
function wallpaper(){
  const rows=[['9:30','Ananya R. · Cleaning',''],['11:00','Rohit K. · Consultation','p'],['4:30','Meher A. · Whitening','']];
  return `<div class="calm" aria-hidden="true"><i></i><i></i><i></i></div><div class="wavyblob" aria-hidden="true" style="inset:auto;width:440px;height:440px;right:-120px;top:30px;opacity:.28;z-index:-1"></div><span class="spark" style="right:14%;top:8%" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg></span><span class="spark o" style="left:62%;top:52%;width:18px;height:18px;animation-delay:-1.2s" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg></span>
   <div class="wscene" aria-hidden="true">
    <div class="wcard w1"><div class="row" style="justify-content:space-between"><b>Today</b><span style="background:#FCECEE;color:#DB586D;padding:2px 9px;border-radius:999px;font-weight:700">8 visits</span></div>${rows.map(([t,n,c])=>`<div class="slotline ${c}"><b>${t}</b>${n}</div>`).join('')}</div>
    <div class="wcard w2">${botAv(BIZ.smilecaredental,32)}<div><b>Capi booked a visit</b><span>Sat · 4:30 PM · from your website</span></div></div>
    <div class="wcard w3"><span class="okdot">✓</span><div><b>Reminder sent</b><span>WhatsApp · 24 h before</span></div></div>
   </div>`;
}
function vLogin(kind){
  const cfg={client:{tag:'For customers',h:'Book anything, in one place',pts:['Clinics, salons, studios, home services and more','Reminders on WhatsApp','Your bookings, calendar and favourites']},
   business:{tag:'For businesses',h:'Every booking, from every channel, in one calendar',pts:['Website widget, booking link and Capi','Appointments, reminders and staff','Offers, analytics and billing']},
   admin:{tag:'Appointly staff',h:'Platform administration',pts:['Businesses, clients and categories','Verification and booking monitoring','Restricted to Appointly staff']}}[kind];
  return `<div class="auth">
   <div class="auth-art wall">${wallpaper()}
    <div class="auth-copy"><span class="pill" style="background:#fff;color:var(--brand);margin-bottom:14px">${cfg.tag}</span><h2>${cfg.h}</h2><ul>${cfg.pts.map(p=>`<li>${ic('check')}${p}</li>`).join('')}</ul></div></div>
   <div class="auth-form"><div class="auth-card">${kind==='client'?`<div id="mlogin" class="stack" style="gap:16px">${clientForm('login')}</div>
     <div class="or">or</div><a class="btn lg block" href="#c-home" data-a="guestMode">${ic('search')} Continue as guest</a>
     <p class="muted" style="font-size:13px">Own a business? <a class="link" href="#business-login">Business login</a></p>`:kind==='business'?bizForm():adminForm()}</div></div></div>
   ${kind==='business'?demoAccounts():''}`;
}
function clientForm(mode){
  const L=S.login;
  if(L.step==='code')return `<div><h3 style="font-size:24px">Enter the code</h3><p class="muted" style="margin-top:6px">Sent to +91 ${esc(L.phone)} on WhatsApp and SMS.</p></div>
   <form id="otpform" class="stack" style="gap:12px"><input class="field otp" id="otp" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="••••••" aria-label="6-digit code">
   <div class="hint">${ic('sparkle')}Demo code: 123456</div>${L.err?`<p class="err">${L.err}</p>`:''}
   <button class="btn primary lg block" type="submit">Verify</button></form>
   <p class="muted" style="font-size:14px">Wrong number? <button class="link" data-a="loginBack">Change it</button></p>`;
  const t={login:['Log in or sign up','Use your mobile number. New here? We’ll create your account.'],manage:['Find your bookings','Enter the mobile number you booked with.'],book:['Your details','No account needed. We’ll text you a code.']}[mode||'book'];
  return `<div><h3 style="font-size:24px">${t[0]}</h3><p class="muted" style="margin-top:6px">${t[1]}</p></div>
   <form id="phoneform" class="stack" style="gap:12px">
    ${mode==='manage'?'':`<div><label class="lbl" for="gname">Full name${mode==='login'?' (new users)':''}</label><input class="field" id="gname" autocomplete="name" value="${esc(L.name||'')}" placeholder="Ananya Rao"></div>`}
    <div><label class="lbl" for="ph">Mobile number</label><div class="prefix"><span>+91</span><input id="ph" inputmode="tel" autocomplete="tel" placeholder="98765 43210" value="${esc(L.phone)}"></div></div>
    ${mode==='book'?`<label class="consent"><input type="checkbox" id="gconsent" ${L.consent?'checked':''}> <span>Send me the booking confirmation and reminders on WhatsApp or SMS.</span></label>`:''}
    ${L.err?`<p class="err">${L.err}</p>`:''}
    <button class="btn primary lg block" type="submit">Send code</button></form>
   <p class="muted" style="font-size:12.5px;display:flex;gap:8px">${ic('shield')}Shared only with the business you book with.</p>`;
}
function bizForm(){
  const L=S.blogin;
  return `<div><h1>Business login</h1><p class="muted" style="margin-top:6px">For owners, managers and staff.</p></div>
   <div class="seg" role="tablist"><button class="on">Log in</button><a href="#register" class="segl">Create new business</a></div>
   <form id="bizform" class="stack" style="gap:12px">
    <div><label class="lbl" for="be">Business email</label><input class="field" id="be" type="email" autocomplete="username" value="${esc(L.email||'demo.dental@appointly.demo')}"></div>
    <div><div class="row" style="justify-content:space-between"><label class="lbl" for="bp">Password</label><button class="link" type="button" style="font-size:13px" data-a="toast" data-v="Reset link sent to your email">Forgot?</button></div><input class="field" id="bp" type="password" autocomplete="current-password" placeholder="••••••••" value="${esc(L.pw||'')}"></div>
    <div class="hint">${ic('sparkle')}Demo password for every demo account: Appointly@123</div>${L.err?`<p class="err">${L.err}</p>`:''}
    <button class="btn primary lg block" type="submit">Log in to dashboard</button></form>
   <a class="btn lg block" href="#register">${ic('plus')} Create new business</a>
   <p class="muted" style="font-size:13px;display:flex;gap:8px;align-items:center">${ic('shield')}Each business sees only its own customers, bookings and staff.</p>`;
}
function demoAccounts(){
  const list=Object.values(BIZ).filter(b=>b.demo);
  return `<section class="wrap demo-acc" id="demo-accounts"><div class="mhead"><div><span class="eyebrow">Demo environment</span><h2 style="font-size:24px;margin-top:6px">Demo accounts</h2><p class="muted" style="font-size:14px;margin-top:4px">One preconfigured business for every subcategory. Fictional data only, separate from real accounts.</p></div><span class="pill amber">Password for all: Appointly@123</span></div>
   ${DB.cats.map(c=>{const bs=list.filter(b=>b.cat===c.id);if(!bs.length)return '';return `<details class="panel dgroup" ${c.id==='health'?'open':''}><summary>${ic(c.icon)}<b>${esc(c.label)}</b><span class="muted">${bs.length} account${bs.length>1?'s':''}</span></summary>
    <div class="table-wrap"><table><thead><tr><th>Business</th><th>Subcategory</th><th>Email</th><th>Business ID</th><th></th></tr></thead><tbody>${bs.map(b=>`<tr><td><span class="row" style="gap:10px">${logo(b,30)}<b>${esc(b.name)}</b></span></td><td>${esc(subLabel(b))}</td><td class="mono" style="font-size:12.5px">${esc(b.email)}</td><td class="mono" style="font-size:12.5px">${b.bid}</td><td><button class="btn sm primary" data-a="useDemo" data-v="${b.id}">Log in</button></td></tr>`).join('')}</tbody></table></div></details>`}).join('')}
  </section>`;
}
function adminForm(){
  return `<div><h1>Admin login</h1><p class="muted" style="margin-top:6px">Appointly staff only. Two-factor required.</p></div>
   <form id="adminform" class="stack" style="gap:12px">
    <div><label class="lbl" for="ae">Email</label><input class="field" id="ae" type="email" value="admin@appointly.demo"></div>
    <div><label class="lbl" for="ap">Password</label><input class="field" id="ap" type="password" placeholder="••••••••"></div>
    <div><label class="lbl" for="a2">Authenticator code</label><input class="field otp" id="a2" inputmode="numeric" maxlength="6" placeholder="••••••"></div>
    <div class="hint">${ic('sparkle')}Demo: password Appointly@Admin, code 123456</div>${S.aerr?`<p class="err">${S.aerr}</p>`:''}
    <button class="btn dark lg block" type="submit">Log in</button></form>`;
}
function loginClient(name,phone){AUTH.client={name:name||(AUTH.client&&AUTH.client.name)||'Ananya Rao',phone};saveAuth();S.clientMode=true;S.login={step:'phone',phone:'',name:'',err:''};
  toast(`Hi ${esc(AUTH.client.name.split(' ')[0])}! You’re verified.`,'check');
  if(S.afterLogin){const f=S.afterLogin;S.afterLogin=null;closeModal();renderTop();f();return}
  if(S.view==='client-login'){location.hash=S.after||'c-home';S.after=null;return}
  render()}
function needClient(fn){if(AUTH.client)return fn();S.afterLogin=fn;S.login={step:'phone',phone:'',name:'',err:'',consent:true};modal(`<div class="row" style="justify-content:space-between"><span class="eyebrow">Almost done</span><button class="btn ghost sm" data-a="closeModal" aria-label="Close">${ic('x')}</button></div><div id="mlogin" class="stack" style="gap:14px">${clientForm('book')}</div>`);setTimeout(()=>{const i=$('#gname');if(i)i.focus()},50)}
function refreshLogin(){const m=$('#mlogin');if(m)m.innerHTML=clientForm($('.modal')?'book':S.view==='client-login'?'login':'manage');const o=$('#otp')||$('#ph');if(o)o.focus()}

/* ================= REGISTER NEW BUSINESS (7-step wizard) ================= */
const QSET={
 dental:[['treatments','Types of dental treatments','chips',['Cleaning','Fillings','Root canal','Braces & aligners','Implants','Whitening','Kids dentistry']],['dentists','Dentist names & qualifications','textarea','Dr. Meera Iyer – BDS, MDS'],['consultDur','Consultation duration (minutes)','number','20'],['consultFee','Consultation fee (₹)','number','500'],['equipment','Equipment & facilities','chips',['Digital X-ray','Intraoral camera','In-house lab','Sterilisation room','Kids room']]],
 salons:[['svcTypes','Services offered','chips',['Haircut','Styling','Hair colour','Hair spa','Facials','Bridal']],['staffSpec','Staff & specialisations','textarea','Neha – senior stylist, colour'],['svcDur','Typical service duration (minutes)','number','45'],['pricing','Pricing notes','text','Haircut from ₹500']],
 photo:[['shootTypes','Photography types','chips',['Wedding','Event','Portrait','Product','Newborn','Passport photos']],['packages','Package pricing','textarea','Portrait – ₹3,500 for 10 edited photos'],['shootDur','Typical shoot duration (minutes)','number','60']],
 yoga:[['yogaTypes','Yoga or class types','chips',['Hatha','Vinyasa','Ashtanga','Yin','Prenatal','Reformer Pilates','Mat Pilates']],['instructors','Instructor details','textarea','Sara – RYT 500, 6 years'],['timings','Class timings','text','6 AM, 7 AM, 6 PM'],['capacity','Class capacity','number','12'],['plans','Membership plans','textarea','Monthly ₹2,500 · 10-class pack ₹3,000']],
 home:[['repairs','Types of repairs','chips',['Electrical','Plumbing','AC','Carpentry','Painting','Appliances','Cleaning']],['coverage','Service coverage areas','text','Madhapur, Gachibowli, Kondapur'],['techs','Technician details','textarea','Ramesh – electrician, 12 years'],['visitFee','Visit charge (₹)','number','299'],['estDur','Estimated service duration (minutes)','number','60']],
 health:[['specialties','Specialties','chips',['General medicine','Pediatrics','Cardiology','Dermatology','Orthopaedics','Gynaecology','Physiotherapy','Nutrition']],['doctors','Doctors & qualifications','textarea','Dr. Vikram Shah – MBBS, MD'],['consultFee','Consultation fee (₹)','number','700'],['insurance','Insurance accepted','text','Star Health, Niva Bupa']],
 beauty:[['svcTypes','Services offered','chips',['Hair','Nails','Makeup','Skin','Tattoo','Piercing','Bridal']],['artists','Artists & specialisations','textarea','Divya – nail art, 5 years'],['hygiene','Hygiene practices','text','Single-use tools, sterilised kits']],
 pro:[['expertise','Areas of expertise','chips',['Tax','GST','Company setup','Insurance','Property','Legal','Strategy']],['mode','Consultation mode','chips',['In person','Video call','Phone']],['fee','Consultation fee (₹)','number','1000'],['licence','Licence or registration number','text','RERA / IRDAI / ICAI number']],
 fitness:[['classTypes','Class types','chips',['Group classes','Private sessions','Online classes','Workshops']],['instructors','Instructor details','textarea',''],['capacity','Class capacity','number','12'],['plans','Membership plans','textarea','']],
 hosp:[['capacity','Guest capacity','number','150'],['spaces','Spaces & rooms','textarea','Main hall, rooftop lawn'],['packages','Packages','textarea','Party hall, 4 hours – ₹45,000'],['catering','Catering','chips',['In-house','Outside allowed','Veg only','Veg & non-veg']]],
 gov:[['svcOffered','Services offered','chips',['Certificates','Document verification','Passport help','Grievances','Scheme information']],['docs','Documents customers must bring','textarea','Aadhaar, originals and one photocopy'],['counters','Number of counters','number','3']],
 _new:[['offer','What do you offer?','textarea','Describe your main services'],['dur','Typical appointment length (minutes)','number','30'],['range','Price range','text','₹500 – ₹2,000']]
};
const QMAP={maint:'home',cleaning:'home',electric:'home',plumb:'home',ac:'home',pilates:'yoga',dental:'dental',salons:'salons',photo:'photo',yoga:'yoga'};
function qsetFor(d){if(d.newCat||d.newSub)return QSET._new;return QSET[QMAP[d.sub]]||QSET[d.cat]||QSET._new}
const STEPS=['Business info','Category','Details','Services','Hours','Account','Review'];
function regInit(){S.reg={step:1,err:'',d:{name:'',desc:'',email:'',phone:'',website:'',address:'',area:'',city:'Hyderabad',cat:'',sub:'',newCat:'',newSub:'',q:{},svcs:[],staff:[],open:'09:00',close:'19:00',days:[1,2,3,4,5,6],brS:'13:00',brE:'14:00',holidays:[],slotInt:30,owner:'',lemail:'',pw:'',pw2:'',otpSent:false,otpOk:false,terms:false,publish:'now'}}}
const toMin=t=>{const[h,m]=(t||'0:0').split(':').map(Number);return h*60+(m||0)};
function vRegister(){
  if(!S.reg)regInit();const R=S.reg,d=R.d;
  const body=[null,regStep1,regStep2,regStep3,regStep4,regStep5,regStep6,regStep7][R.step](d);
  return `<div class="wrap page" style="max-width:900px">
   <div class="mhead"><div><span class="eyebrow">Create new business</span><h2 style="margin-top:6px">${STEPS[R.step-1]}</h2></div><a class="btn ghost sm" href="#business-login">Cancel</a></div>
   <ol class="wsteps">${STEPS.map((s,i)=>`<li class="${i+1<R.step?'done':i+1===R.step?'on':''}"><span>${i+1<R.step?'✓':i+1}</span><em>${s}</em></li>`).join('')}</ol>
   <div class="panel wbox" id="wizard">${body}
    ${R.err?`<p class="err" role="alert">${R.err}</p>`:''}
    <div class="row wnav">${R.step>1?`<button class="btn" data-a="regBack">← Back</button>`:''}<span class="spacer"></span>${R.step<7?`<button class="btn primary" data-a="regNext">Continue →</button>`:`<button class="btn primary lg" data-a="regPublish">${d.publish==='now'?'Publish business':'Submit for verification'}</button>`}</div>
   </div></div>`;
}
const fld=(k,l,v,t='text',ph='',req)=>`<div><label class="lbl" for="r-${k}">${l}${req?' *':''}</label>${t==='textarea'?`<textarea class="field" id="r-${k}" data-k="${k}" rows="3" placeholder="${esc(ph)}">${esc(v||'')}</textarea>`:`<input class="field" id="r-${k}" data-k="${k}" type="${t}" value="${esc(v||'')}" placeholder="${esc(ph)}">`}</div>`;
function regStep1(d){return `<div class="g2f">${fld('name','Business name',d.name,'text','e.g. Sunrise Dental Care',1)}${fld('email','Business email',d.email,'email','hello@yourbusiness.in',1)}</div>
  <div class="row" style="gap:16px;align-items:center;flex-wrap:wrap"><span id="logoPrev">${d.logo?`<span class="blogo" style="width:64px;height:64px"><img src="${d.logo}" alt="Logo preview"></span>`:`<span class="blogo" style="width:64px;height:64px;background:var(--surface-2);color:var(--muted)">${ic('image')}</span>`}</span><div><label class="btn sm" for="r-logo">${ic('download')} Upload logo</label><input type="file" id="r-logo" accept="image/*" hidden><p class="muted" style="font-size:12.5px;margin-top:6px">PNG or JPG, square works best.</p></div></div>
  ${fld('desc','Business description',d.desc,'textarea','What you do and who you serve')}
  <div class="g2f">${fld('phone','Contact number',d.phone,'tel','+91 98765 43210',1)}${fld('website','Website URL (optional)',d.website,'text','www.yourbusiness.in')}</div>
  ${fld('address','Business address',d.address,'text','Street, building',1)}
  <div class="g2f">${fld('area','Area / locality',d.area,'text','Kondapur',1)}${fld('city','City',d.city,'text','Hyderabad',1)}</div>`}
function regStep2(d){const c=catOf(d.cat);
  return `<p class="muted">Pick where customers will find you in Explore.</p>
  <div class="catpick">${DB.cats.map(x=>`<button class="catbtn ${d.cat===x.id&&!d.newCat?'on':''}" data-a="regCat" data-v="${x.id}">${ic(x.icon)}<span>${esc(x.label)}</span></button>`).join('')}<button class="catbtn ${d.newCat?'on':''}" data-a="regCat" data-v="__new">${ic('plus')}<span>Create a new category</span></button></div>
  ${d.newCat!==''?`<div class="g2f">${fld('newCat','New main category name',d.newCat==='__pending'?'':d.newCat,'text','e.g. Pet Care',1)}${fld('newSub','First subcategory',d.newSub,'text','e.g. Pet grooming',1)}</div><p class="muted" style="font-size:13px">New categories appear in Explore right away and are reviewed by the Appointly team.</p>`:
   c?`<label class="lbl" style="margin-top:6px">Subcategory</label><div class="chips" style="flex-wrap:wrap">${c.subs.map(s=>`<button class="chip ${d.sub===s.id&&!d.newSub?'on':''}" data-a="regSub" data-v="${s.id}">${esc(s.label)}</button>`).join('')}<button class="chip ${d.newSub?'on':''}" data-a="regSub" data-v="__new">${ic('plus')} New subcategory</button></div>
    ${d.newSub!==''&&d.newSub!==undefined&&d.sub==='__new'?fld('newSub','New subcategory name',d.newSub==='__pending'?'':d.newSub,'text','e.g. Ayurveda clinics',1):''}`:''}`}
function regStep3(d){const qs=qsetFor(d);const nm=d.newSub&&d.newSub!=='__pending'?d.newSub:(subOf(d.cat,d.sub)||{}).label||'your business';
  return `<p class="muted">Questions tailored to <b>${esc(nm)}</b>. These help Capi answer customers.</p>
  ${qs.map(([k,l,t,o])=>t==='chips'?`<div><label class="lbl">${l}</label><div class="chips" style="flex-wrap:wrap">${o.map(x=>`<button class="chip ${(d.q[k]||[]).includes(x)?'on':''}" data-a="regChip" data-v="${k}|${esc(x)}">${esc(x)}</button>`).join('')}</div></div>`:fld('q.'+k,l,d.q[k],t==='textarea'?'textarea':t,o||'')).join('')}`}
function regStep4(d){if(!d.svcs.length){const tpl=Object.values(BIZ).find(b=>b.demo&&b.sub===d.sub);d.svcs=tpl?tpl.services.map(s=>({name:s.name,desc:s.desc,price:s.price,dur:s.dur,staff:'Any',avail:'All days'})):[{name:'',desc:'',price:'',dur:30,staff:'Any',avail:'All days'}]}
  return `<p class="muted">${Object.values(BIZ).some(b=>b.demo&&b.sub===d.sub)?'We filled in typical services for your category. Edit, remove or add your own.':'Add the services customers can book.'}</p>
  <div class="stack" style="gap:10px">${d.svcs.map((s,i)=>`<div class="svcrow"><input class="field" data-row="svcs" data-i="${i}" data-f="name" value="${esc(s.name)}" placeholder="Service name" aria-label="Service name"><input class="field" data-row="svcs" data-i="${i}" data-f="desc" value="${esc(s.desc)}" placeholder="Description" aria-label="Description"><input class="field" data-row="svcs" data-i="${i}" data-f="price" type="number" value="${esc(s.price)}" placeholder="Price ₹" aria-label="Price"><input class="field" data-row="svcs" data-i="${i}" data-f="dur" type="number" value="${esc(s.dur)}" placeholder="Minutes" aria-label="Duration in minutes"><select class="field" data-row="svcs" data-i="${i}" data-f="avail" aria-label="Availability">${['All days','Weekdays','Weekends'].map(o=>`<option ${s.avail===o?'selected':''}>${o}</option>`).join('')}</select><button class="btn ghost sm" data-a="regDelRow" data-v="svcs:${i}" aria-label="Remove service">${ic('x')}</button></div>`).join('')}</div>
  <button class="btn sm" data-a="regAddRow" data-v="svcs">${ic('plus')} Add service</button>`}
function regStep5(d){return `<div class="g2f">${fld('open','Opening time',d.open,'time')}${fld('close','Closing time',d.close,'time')}</div>
  <div><label class="lbl">Working days</label><div class="chips">${[1,2,3,4,5,6,0].map(x=>`<button class="chip ${d.days.includes(x)?'on':''}" data-a="regDay" data-v="${x}">${DAY[x]}</button>`).join('')}</div></div>
  <div class="g2f">${fld('brS','Break starts',d.brS,'time')}${fld('brE','Break ends',d.brE,'time')}</div>
  <div class="g2f"><div><label class="lbl" for="r-slotInt">Appointment slot interval</label><select class="field" id="r-slotInt" data-k="slotInt">${[15,30,45,60].map(x=>`<option value="${x}" ${+d.slotInt===x?'selected':''}>${x} minutes</option>`).join('')}</select></div>
   <div><label class="lbl" for="r-hol">Holidays</label><div class="row" style="gap:8px"><input class="field" type="date" id="r-hol"><button class="btn sm" data-a="regHol">Add</button></div><div class="chips" style="flex-wrap:wrap;margin-top:6px">${d.holidays.map((h,i)=>`<button class="chip sm" data-a="regDelHol" data-v="${i}">${esc(h)} ✕</button>`).join('')}</div></div></div>
  <div><label class="lbl">Staff & availability</label><div class="stack" style="gap:8px">${(d.staff.length?d.staff:(d.staff=[{name:'',role:'',days:'All working days'}])).map((s,i)=>`<div class="svcrow st"><input class="field" data-row="staff" data-i="${i}" data-f="name" value="${esc(s.name)}" placeholder="Staff name" aria-label="Staff name"><input class="field" data-row="staff" data-i="${i}" data-f="role" value="${esc(s.role)}" placeholder="Role" aria-label="Role"><select class="field" data-row="staff" data-i="${i}" data-f="days" aria-label="Availability">${['All working days','Weekdays only','Weekends only'].map(o=>`<option ${s.days===o?'selected':''}>${o}</option>`).join('')}</select><button class="btn ghost sm" data-a="regDelRow" data-v="staff:${i}" aria-label="Remove staff">${ic('x')}</button></div>`).join('')}</div><button class="btn sm" style="margin-top:8px" data-a="regAddRow" data-v="staff">${ic('plus')} Add staff</button></div>`}
function regStep6(d){return `<div class="g2f">${fld('owner','Owner name',d.owner,'text','Your full name',1)}${fld('lemail','Login email',d.lemail||d.email,'email','',1)}</div>
  <div class="g2f">${fld('pw','Password',d.pw,'password','At least 8 characters',1)}${fld('pw2','Confirm password',d.pw2,'password','',1)}</div>
  <div class="panel" style="padding:14px;display:grid;gap:10px"><b>Verify your email</b>${d.otpOk?`<span class="pill ok">${ic('check')} Email verified</span>`:d.otpSent?`<div class="row" style="gap:8px"><input class="field otp" id="r-otp" maxlength="6" placeholder="••••••" style="max-width:180px" aria-label="Verification code"><button class="btn sm primary" data-a="regOtp">Verify</button></div><div class="hint">${ic('sparkle')}Demo code: 123456</div>`:`<button class="btn sm" data-a="regSendOtp" style="justify-self:start">Send verification code</button>`}</div>
  <label class="consent"><input type="checkbox" id="r-terms" data-k="terms" ${d.terms?'checked':''}> <span>I accept the Terms of Service and Privacy Policy.</span></label>`}
function regStep7(d){const c=d.newCat?d.newCat:catLabel(d.cat);const sub=d.newSub&&d.newSub!=='__pending'?d.newSub:(subOf(d.cat,d.sub)||{}).label;const qs=qsetFor(d);
  const sec=(n,t,html)=>`<div class="rev"><div class="row" style="justify-content:space-between"><b>${t}</b><button class="link" data-a="regGo" data-v="${n}">Edit</button></div>${html}</div>`;
  return sec(1,'Business info',`<div class="row">${d.logo?`<span class="blogo" style="width:44px;height:44px"><img src="${d.logo}" alt=""></span>`:''}<div><b>${esc(d.name)}</b><div class="muted">${esc(d.address)}, ${esc(d.area)}, ${esc(d.city)} · ${esc(d.phone)} · ${esc(d.email)}</div></div></div>${d.desc?`<p class="muted" style="margin-top:6px">${esc(d.desc)}</p>`:''}`)+
   sec(2,'Category',`<span class="pill brand">${esc(c)}</span> <span class="pill">${esc(sub||'')}</span>${d.newCat||d.newSub?' <span class="pill amber">New</span>':''}`)+
   sec(3,'Details',qs.map(([k,l])=>`<div class="sumrow"><span>${l}</span><b>${esc(Array.isArray(d.q[k])?d.q[k].join(', '):d.q[k]||'—')}</b></div>`).join(''))+
   sec(4,'Services',d.svcs.map(s=>`<div class="sumrow"><span>${esc(s.name)} · ${s.dur} min</span><b>${inr(+s.price||0)}</b></div>`).join(''))+
   sec(5,'Hours',`<div class="muted">${d.days.map(x=>DAY[x]).join(', ')} · ${d.open}–${d.close} · break ${d.brS}–${d.brE} · ${d.slotInt}-min slots${d.holidays.length?` · ${d.holidays.length} holidays`:''}</div><div class="muted">Staff: ${d.staff.filter(s=>s.name).map(s=>esc(s.name)).join(', ')||esc(d.owner||'Owner')}</div>`)+
   sec(6,'Account',`<div class="muted">${esc(d.owner)} · ${esc(d.lemail||d.email)} · email verified</div>`)+
   `<div><label class="lbl">Publishing</label><div class="stack" style="gap:8px"><label class="consent"><input type="radio" name="pub" data-k="publish" value="now" ${d.publish==='now'?'checked':''}> <span><b>Publish now.</b> Your page goes live and appears in Explore.</span></label><label class="consent"><input type="radio" name="pub" data-k="publish" value="verify" ${d.publish==='verify'?'checked':''}> <span><b>Submit for verification first.</b> Goes live once the Appointly team approves it.</span></label></div></div>`}
function regCollect(){const d=S.reg.d;
  document.querySelectorAll('#wizard [data-k]').forEach(el=>{const k=el.dataset.k;let v=el.type==='checkbox'?el.checked:el.value;if(el.type==='radio'){if(!el.checked)return}if(k.startsWith('q.'))d.q[k.slice(2)]=v;else d[k]=v});
  document.querySelectorAll('#wizard [data-row]').forEach(el=>{const arr=d[el.dataset.row];const i=+el.dataset.i;if(arr[i])arr[i][el.dataset.f]=el.value});}
function regValidate(){const d=S.reg.d,st=S.reg.step;
  if(st===1){if(!d.name.trim())return 'Enter your business name.';if(!/\S+@\S+\.\S+/.test(d.email))return 'Enter a valid business email.';if(d.phone.replace(/\D/g,'').length<10)return 'Enter a contact number with at least 10 digits.';if(!d.address.trim()||!d.area.trim())return 'Enter your address and area.'}
  if(st===2){if(d.newCat!==''&&(!d.newCat.trim()||d.newCat==='__pending'||!d.newSub.trim()||d.newSub==='__pending'))return 'Name your new category and its first subcategory.';if(d.newCat===''&&!d.cat)return 'Pick a main category.';if(d.newCat===''&&(!d.sub||(d.sub==='__new'&&(!d.newSub||d.newSub==='__pending'))))return 'Pick or create a subcategory.'}
  if(st===4){const ok=d.svcs.filter(s=>s.name.trim()&&+s.dur>0);if(!ok.length)return 'Add at least one service with a name and duration.'}
  if(st===5){if(toMin(d.close)<=toMin(d.open))return 'Closing time must be after opening time.';if(!d.days.length)return 'Pick at least one working day.'}
  if(st===6){if(!d.owner.trim())return 'Enter the owner’s name.';if(!/\S+@\S+\.\S+/.test(d.lemail||d.email))return 'Enter a valid login email.';if(d.pw.length<8)return 'Password needs at least 8 characters.';if(d.pw!==d.pw2)return 'Passwords don’t match.';if(!d.otpOk)return 'Verify your email with the code.';if(!d.terms)return 'Accept the terms to continue.';if(Object.values(BIZ).some(b=>b.email===(d.lemail||d.email)))return 'That email already has a business account.'}
  return ''}
function regPublish(){const d=S.reg.d;
  let cat=d.cat,sub=d.sub;
  if(d.newCat&&d.newCat!=='__pending'){cat=slug(d.newCat)||'cat'+Date.now();if(!catOf(cat))DB.cats.push({id:cat,label:d.newCat.trim(),icon:'sparkle',subs:[],isNew:true})}
  if(d.newSub&&d.newSub!=='__pending'){sub=slug(d.newSub)||'sub'+Date.now();const c=catOf(cat);if(!c.subs.find(s=>s.id===sub))c.subs.push({id:sub,label:d.newSub.trim(),isNew:true});DB.catReq.unshift({cat,sub,by:d.name,at:Date.now(),status:'pending'})}
  let id=slug(d.name)||'biz';while(BIZ[id])id+='x';
  const staff=(d.staff.filter(s=>s.name.trim()).length?d.staff.filter(s=>s.name.trim()):[{name:d.owner,role:'Owner',days:'All working days'}]).map((s,i)=>({id:id+'s'+i,name:s.name.trim(),role:s.role||'Staff',qual:'',exp:3,langs:'English, Hindi, Telugu',days:s.days==='Weekdays only'?[1,2,3,4,5]:s.days==='Weekends only'?[6,0]:d.days.slice()}));
  const b={id,bid:'APX-B-'+String(Object.keys(BIZ).length+1).padStart(3,'0'),name:d.name.trim(),cat,sub,ind:LOOK_BY_CAT[cat]||'Consultant',area:d.area.trim(),city:d.city.trim()||'Hyderabad',address:`${d.address.trim()}, ${d.area.trim()}, ${d.city.trim()}`,phone:d.phone,email:d.lemail||d.email,password:d.pw,website:d.website,logo:d.logo||'',
   rating:0,reviews:0,open:toMin(d.open),close:toMin(d.close),sun:d.days.includes(0)?[toMin(d.open),toMin(d.close)]:null,cancelHrs:6,since:new Date().getFullYear(),bot:'Capi',branches:[d.area.trim()],about:d.desc||`${d.name} on Appointly.`,amen:AMEN[cat]||AMEN.pro,insurance:[],faqs:[],owner:d.owner,staff,
   services:d.svcs.filter(s=>s.name.trim()).map((s,i)=>({id:id+'v'+i,g:'Services',name:s.name.trim(),desc:s.desc||'',price:+s.price||0,dur:+s.dur||30,kw:kwOf(s.name),avail:s.avail})),offers:[],breaks:[[toMin(d.brS),toMin(d.brE)]].filter(([a,z])=>z>a),holidays:d.holidays.map(x=>{const t=new Date(x);return dkey(t)}),slotInt:+d.slotInt||30,buffer:0,dailyLimit:40,autoConfirm:true,
   status:d.publish==='now'?'active':'pending',verified:false,demo:false,plan:'Growth',q:d.q,workDays:d.days};
  b.subName=d.newSub;prepBiz(b);saveBiz(b);
  notify('admin','newbiz',d.publish==='now'?'New business published':'Business awaiting verification',`${b.name} · ${catLabel(cat)} › ${subLabel(b)}`);
  AUTH.business={id:b.id,name:d.owner,role:'Owner'};saveAuth();S.reg=null;S.dash='overview';location.hash='dashboard';
  setTimeout(()=>{toast(d.publish==='now'?`${esc(b.name)} is live! Customers can find it in Explore.`:'Submitted. We’ll email you once it’s verified.','check');appyCelebrate()},300);
}

/* ================= CLIENT PORTAL ================= */
const SYN={hospitals:'doctor fever hospital clinic general physician health checkup child pediatric cardio heart',dental:'dentist dental teeth tooth braces root canal whitening',derma:'skin acne derma dermatologist hair fall pigmentation laser peel',physio:'physio physiotherapy back pain neck knee injury',nutrition:'diet dietitian nutrition nutritionist weight pcos diabetes',
 salons:'haircut hair salon stylist colour color keratin',nails:'nail nails manicure pedicure',makeup:'makeup bridal party saree',tattoo:'tattoo piercing ink',realestate:'flat house home property rent buy sell real estate apartment',insurance:'insurance policy claim mediclaim term',consult:'tax gst ca company registration consultant business strategy',
 yoga:'yoga meditation',pilates:'pilates reformer core',hotels:'hotel resort stay room day out',banquet:'wedding party birthday banquet hall function event venue',photo:'photo photographer photography shoot passport photo',
 maint:'handyman carpenter repair furniture door lock mounting',cleaning:'clean cleaning maid deep sofa',electric:'electrician electric wiring fan switch inverter light',plumb:'plumber plumbing leak tap pipe drain',ac:'ac aircon air conditioner cooling gas',docs:'document certificate verification affidavit notary',passport:'passport tatkal visa',publicc:'grievance complaint officer public consultation scheme civic'};
function areas(){return [...new Set(Object.values(BIZ).filter(live).map(b=>b.area))].filter(a=>!/^At your/.test(a)).sort()}
function smartParse(q){const s=' '+q.toLowerCase()+' ';const r={terms:q.trim()};let best=null,bs=0;
  DB.cats.forEach(c=>c.subs.forEach(x=>{const words=(SYN[x.id]||'')+' '+x.label.toLowerCase();let sc=0;words.split(/\s+/).forEach(w=>{if(w.length>2&&s.includes(' '+w)&&!/^(and|the)$/.test(w))sc+=w.length});if(sc>bs){bs=sc;best=[c.id,x.id]}}));
  if(best){r.cat=best[0];r.sub=best[1]}
  const ar=areas().find(a=>s.includes(a.toLowerCase()));if(ar)r.area=ar;
  if(/tomorrow/.test(s))r.avail='1';else if(/today|tonight|now|asap/.test(s))r.avail='0';else if(/weekend|saturday|sunday/.test(s))r.avail='wk';else if(/this week/.test(s))r.avail='week';
  const p=s.match(/(?:under|below|less than|within)\s*(?:rs\.?|₹)?\s*(\d{2,6})/);if(p)r.price=p[1];if(/cheap|budget|affordable/.test(s))r.price=r.price||'1000';if(/free/.test(s))r.price='0';
  if(/top|best|highly rated|good rated|rated/.test(s))r.rating='4.7';
  if(/morning/.test(s))r.part='m';else if(/evening|after work/.test(s))r.part='e';else if(/afternoon/.test(s))r.part='a';
  return r}
function availOk(b,code,part){if(!code||code==='any')return true;const from=code==='1'?1:code==='wk'?(6-TODAY.getDay()+7)%7:0;const span=code==='week'?7:code==='wk'?2:1;
  for(let d=from;d<from+span;d++){const sl=firstSlots(b,6,'any',d);if(sl.some(o=>o.d<from+span&&(!part||(part==='m'?o.m<720:part==='a'?o.m>=720&&o.m<1020:o.m>=1020))))return true}return false}
function bizFilter(F){return Object.values(BIZ).filter(b=>live(b)&&(!F.cat||b.cat===F.cat)&&(!F.sub||b.sub===F.sub)&&(!F.area||b.area===F.area||/^At your/.test(b.branches[0]))&&(!F.rating||b.rating>=+F.rating)&&(!F.price||F.price==='any'||Math.min(...b.services.map(s=>s.price))<=+F.price)&&availOk(b,F.avail,F.part))
  .sort((a,c)=>F.sort==='price'?Math.min(...a.services.map(s=>s.price))-Math.min(...c.services.map(s=>s.price)):F.sort==='name'?a.name.localeCompare(c.name):c.rating-a.rating)}
function textMatch(b,q){if(!q)return true;const t=(b.name+' '+subLabel(b)+' '+catLabel(b.cat)+' '+b.area+' '+b.services.map(s=>s.name).join(' ')).toLowerCase();return q.toLowerCase().split(/\s+/).filter(w=>w.length>2).some(w=>t.includes(w))}
const favd=id=>DB.favs.includes(id);
function bizCard(b){
  const sl=firstSlots(b,3);const off=(b.offers||[]).find(o=>o.active);
  return `<article class="card biz">
   <a class="pic" href="#book-${b.id}" aria-label="${esc(b.name)}">${scene(b,'room')}<div class="tags"><span class="pill" style="background:rgba(255,255,255,.94);color:#371F25">${esc(subLabel(b))}</span>${off?`<span class="pill amber" style="background:rgba(255,255,255,.94)">${ic('sparkle')}Offer</span>`:''}</div></a>
   <button class="favbtn ${favd(b.id)?'on':''}" data-a="fav" data-v="${b.id}" aria-label="${favd(b.id)?'Remove from':'Add to'} favourites">${ic('heart')}</button>
   <div class="body">
    <div class="row" style="align-items:flex-start;gap:10px">${logo(b,40)}<div style="flex:1;min-width:0"><h3><a href="#book-${b.id}" style="text-decoration:none">${esc(b.name)}</a></h3><div class="muted" style="font-size:13px">${ic('pin')} ${esc(b.area)} · ${priceRange(b)}</div></div><span class="stars">${ic('star')}${b.rating||'New'}</span></div>
    ${off?`<div class="offer-line">${ic('sparkle')}${esc(off.title)}</div>`:''}
    <div class="slotchips">${sl.map(o=>`<button data-a="quickSlot" data-v="${b.id}:${o.d}:${o.m}">${relD(addDays(TODAY,o.d)).replace('Tomorrow','Tmrw')} ${fmtT(o.m)}</button>`).join('')||'<span class="muted" style="font-size:13px">No slots this week</span>'}</div>
    <div class="row" style="margin-top:auto;padding-top:6px"><a class="btn sm" style="flex:1" href="#book-${b.id}">View & book</a><button class="btn sm" style="flex:1;gap:6px" data-a="openChat" data-v="${b.id}">${botAv(b,22)} Ask Capi</button></div>
   </div></article>`;
}
function searchBar(id,val){return `<form class="search smart" id="${id}" role="search">${ic('sparkle')}<input id="${id}-q" type="search" value="${esc(val||'')}" placeholder="Try “dentist in Kondapur tomorrow evening” or “AC repair under 500”" aria-label="Search businesses, services or describe what you need"><button class="btn primary sm" type="submit">${ic('search')}<span class="hide-sm">Search</span></button></form>`}

/* ---- Home dashboard ---- */
function vCHome(){
  const me=AUTH.client;const mine=BOOKINGS.filter(k=>k.mine);const up=mine.filter(isUpcoming).sort((a,c)=>a.start-c.start);
  const recent=[...new Map(mine.filter(k=>k.start<Date.now()&&k.status!=='cancelled').sort((a,c)=>c.start-a.start).map(k=>[k.biz,k])).values()].slice(0,6);
  const likedSubs=[...new Set(mine.map(k=>BIZ[k.biz]&&BIZ[k.biz].sub).concat(DB.favs.map(f=>BIZ[f]&&BIZ[f].sub)).filter(Boolean))];
  const recs=Object.values(BIZ).filter(b=>live(b)&&likedSubs.includes(b.sub)&&!mine.some(k=>k.biz===b.id)).concat(Object.values(BIZ).filter(b=>live(b)&&b.rating>=4.7)).filter((b,i,a)=>a.indexOf(b)===i).slice(0,6);
  const offers=Object.values(BIZ).filter(live).flatMap(b=>(b.offers||[]).filter(o=>o.active).map(o=>({b,o}))).sort((x,y)=>(likedSubs.includes(y.b.sub)?1:0)-(likedSubs.includes(x.b.sub)?1:0)||x.o.ends-y.o.ends).slice(0,8);
  return `<div class="wrap page">
   <div class="stack" style="gap:6px;margin-bottom:14px"><span class="muted">${me?`Good ${greet()}, ${esc(me.name.split(' ')[0])}`:'Welcome to Appointly'}</span><h1 style="font-size:clamp(24px,3vw,32px)">What would you like to book?</h1></div>
   ${searchBar('homesearch')}
   <div class="chips" style="margin:14px 0 26px">${DB.cats.map(c=>`<a class="chip" href="#explore-${c.id}">${ic(c.icon)}${esc(c.label)}</a>`).join('')}</div>
   ${me?actionCards():''}
   ${up.length?`<section class="hsec"><div class="hhead"><h2>${ic('bell')} Appointment reminders</h2><a class="link" href="#c-calendar">View calendar</a></div><div class="hscroll">${up.slice(0,4).map(k=>{const b=BIZ[k.biz];const d=new Date(k.start);const hrs=(k.start-Date.now())/36e5;return `<button class="remind" data-a="bkInfo" data-v="${k.id}">${logo(b,40)}<div style="min-width:0"><b>${esc(svcOf(k).name)}</b><div class="muted">${esc(b.name)}</div><div class="when">${relD(d)}, ${fmtT(d.getHours()*60+d.getMinutes())}</div></div><span class="pill ${hrs<24?'amber':'brand'}">${hrs<1?'Soon':hrs<24?`In ${Math.round(hrs)} h`:`In ${Math.round(hrs/24)} d`}</span></button>`}).join('')}</div></section>`:''}
   <section class="hsec"><div class="hhead"><h2>${ic('sparkle')} Recommended for you</h2><a class="link" href="#explore">Explore all</a></div><p class="muted" style="margin:-6px 0 12px;font-size:14px">${likedSubs.length?'Based on what you’ve booked and saved.':'Top-rated places on Appointly.'}</p><div class="biz-grid">${recs.slice(0,3).map(bizCard).join('')}</div></section>
   <section class="hsec"><div class="hhead"><h2>${ic('refresh')} Recently booked</h2></div>${recent.length?`<div class="hscroll">${recent.map(k=>{const b=BIZ[k.biz];return `<div class="recent">${logo(b,44)}<div style="min-width:0;flex:1"><a href="#book-${b.id}" style="text-decoration:none"><b>${esc(b.name)}</b></a><div class="muted" style="font-size:13px">${esc(svcOf(k).name)} · last on ${fmtD(new Date(k.start))}</div></div><button class="btn sm primary" data-a="bookAgain" data-v="${k.id}">Book again</button></div>`}).join('')}</div>`:`<div class="panel empty">${me?'Your past visits will show up here.':`<a class="link" href="#client-login">Log in</a> to see places you’ve booked.`}</div>`}</section>
   <section class="hsec"><div class="hhead"><h2>${ic('card')} Offers & discounts</h2></div><div class="hscroll">${offers.map(({b,o})=>`<a class="offer" href="#book-${b.id}">${o.ends<=7?'<span class="pill amber">Limited time</span>':''}<b>${esc(o.title)}</b><span class="muted">${esc(o.desc)}</span><span class="row" style="gap:8px;margin-top:auto">${logo(b,28)}<span style="font-size:13px;font-weight:600">${esc(b.name)}</span></span><small class="muted">Ends in ${o.ends} days</small></a>`).join('')}</div></section>
  </div>`;
}

/* ---- Explore: category → subcategory → businesses ---- */
function vExplore(){
  const F=S.F||(S.F={});const c=F.cat?catOf(F.cat):null;
  if(!c&&!F.q){return `<div class="wrap page"><div class="mhead"><div><span class="eyebrow">Explore</span><h2 style="margin-top:6px">Browse by category</h2></div></div>${searchBar('exsearch')}
   <div class="catgrid" style="margin-top:20px">${DB.cats.map(x=>{const n=Object.values(BIZ).filter(b=>live(b)&&b.cat===x.id).length;return `<a class="catcard" href="#explore-${x.id}"><span class="ic">${ic(x.icon)}</span><b>${esc(x.label)}${x.isNew?' <span class="pill amber">New</span>':''}</b><span class="muted">${x.subs.map(s=>esc(s.label)).join(' · ')}</span><small>${n} business${n===1?'':'es'}</small></a>`}).join('')}</div></div>`}
  let list=bizFilter(F);if(F.q)list=list.filter(b=>textMatch(b,F.q)||(F.sub&&b.sub===F.sub));
  const subsHtml=c?`<div class="subgrid">${c.subs.map(s=>{const n=Object.values(BIZ).filter(b=>live(b)&&b.cat===c.id&&b.sub===s.id).length;return `<a class="subcard ${F.sub===s.id?'on':''}" href="#explore-${c.id}-${s.id}"><b>${esc(s.label)}</b><small>${n} business${n===1?'':'es'}${s.isNew?' · New':''}</small></a>`}).join('')}</div>`:'';
  const sel=(k,l,opts)=>`<label class="fsel"><span>${l}</span><select data-f="${k}" aria-label="${l}">${opts.map(([v,t])=>`<option value="${v}" ${(F[k]||'')===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
  return `<div class="wrap page">
   <div class="crumbs"><a href="#explore">Explore</a>${c?`<span>›</span><a href="#explore-${c.id}">${esc(c.label)}</a>`:''}${F.sub&&c?`<span>›</span><span style="color:var(--fg)">${esc((subOf(c.id,F.sub)||{}).label||'')}</span>`:''}</div>
   <div class="mhead" style="margin-bottom:12px"><h2>${F.q?`Results for “${esc(F.q)}”`:c?esc(c.label):'All businesses'}</h2>${F.q?`<button class="btn sm" data-a="clearSearch">Clear search</button>`:''}</div>
   ${searchBar('exsearch',F.q)}
   ${F.q&&(F.sub||F.area||F.avail||F.price||F.rating)?`<div class="understood">${ic('sparkle')}<span>Capi understood:</span>${F.sub&&c?`<span class="pill brand">${esc(subOf(c.id,F.sub).label)}</span>`:''}${F.area?`<span class="pill">${esc(F.area)}</span>`:''}${F.avail?`<span class="pill">${{0:'Today',1:'Tomorrow',wk:'This weekend',week:'This week'}[F.avail]}${F.part?' · '+{m:'morning',a:'afternoon',e:'evening'}[F.part]:''}</span>`:''}${F.price?`<span class="pill">Under ${inr(+F.price)}</span>`:''}${F.rating?`<span class="pill">${F.rating}★ and up</span>`:''}</div>`:''}
   ${subsHtml}
   <div class="filters">${sel('area','Location',[['','All areas'],...areas().map(a=>[a,a])])}${sel('rating','Rating',[['','Any'],['4.5','4.5★ +'],['4.7','4.7★ +']])}${sel('price','Price',[['','Any'],['0','Free'],['500','Under ₹500'],['1000','Under ₹1,000'],['3000','Under ₹3,000']])}${sel('avail','Availability',[['','Any time'],['0','Today'],['1','Tomorrow'],['wk','This weekend'],['week','This week']])}${sel('sort','Sort',[['','Top rated'],['price','Lowest price'],['name','Name']])}</div>
   <div class="row" style="justify-content:space-between;margin:6px 0 14px"><span class="muted" style="font-size:14px">${list.length} business${list.length===1?'':'es'}</span></div>
   <div class="biz-grid">${list.length?list.map(bizCard).join(''):`<div class="panel empty" style="grid-column:1/-1"><b>No businesses match yet.</b><p class="muted" style="margin-top:6px">Try fewer filters or another subcategory. New businesses join every week.</p></div>`}</div>
  </div>`;
}

/* ---- Business page ---- */
function vBiz(id){
  const b=BIZ[id];if(!b)return vExplore();
  if(!S.mb||S.mb.biz!==id)S.mb={biz:id,svc:null,branch:b.branches[0],staff:'any',day:0,m:null,pay:'venue',rep:'none'};
  const rv=b.reviews?reviewsFor(b):[];const five=Math.round((b.rating-3.9)*80),four=Math.max(4,100-five-9);const dist=[five,four,5,2,Math.max(0,100-five-four-7)];
  const groups=[...new Set(b.services.map(s=>s.g))];const todayH=hoursOn(b,TODAY);const open=isOpenNow(b);const offers=(b.offers||[]).filter(o=>o.active);const cm=S.clientMode||AUTH.client;
  return `<div class="wrap page" style="padding-top:18px">
   ${cm?`<div class="crumbs"><a href="#explore">Explore</a><span>›</span><a href="#explore-${b.cat}">${esc(catLabel(b.cat))}</a><span>›</span><a href="#explore-${b.cat}-${b.sub}">${esc(subLabel(b))}</a></div>`:''}
   <div class="ptitle"><div class="row" style="gap:14px;align-items:center">${logo(b,64)}<div><h1>${esc(b.name)}</h1>
     <div class="pmeta"><span class="stars" style="font-size:14px">${ic('star')}${b.rating||'New'}</span>${b.reviews?`<a href="#book-${b.id}" data-a="scrollTo" data-v="reviews" class="muted">${b.reviews.toLocaleString('en-IN')} reviews</a>`:''}<span class="pill brand">${esc(subLabel(b))}</span><span class="muted">${ic('pin')}${esc(b.area)}</span><span class="pill ${open?'ok':'bad'}">${open?`Open · closes ${fmtT(todayH[1])}`:'Closed now'}</span></div></div></div>
    <div class="row"><button class="btn sm" data-a="copy" data-v="https://book.appointly.app/${b.id}">${ic('share')}Share</button><button class="btn sm ${favd(b.id)?'primary':''}" data-a="fav" data-v="${b.id}">${ic('heart')}${favd(b.id)?'Saved':'Save'}</button></div></div>
   <div class="gallery">${PHOTOS.map(([k,c],i)=>`<button data-a="photos" data-v="${i}" aria-label="Open photo: ${esc(photoCap(b,k,c))}">${scene(b,k)}<span class="cap">${esc(photoCap(b,k,c))}</span></button>`).join('')}<button class="btn sm all" style="position:absolute" data-a="photos" data-v="0">${ic('image')} See all photos</button></div>
   <div class="profile">
    <div>
     <nav class="secnav" aria-label="Sections">${[['book','Book'],offers.length?['offers','Offers']:null,['services','Services'],['team','Team'],['reviews','Reviews'],['about','About'],['location','Location & hours']].filter(Boolean).map(([k,l])=>`<a href="#book-${b.id}" data-a="scrollTo" data-v="${k}">${l}</a>`).join('')}</nav>
     <section class="psec" id="book"><h2>Book an appointment</h2>${bookFlow(b)}</section>
     ${offers.length?`<section class="psec" id="offers"><h2>Offers & discounts</h2><div class="hscroll">${offers.map(o=>`<div class="offer">${o.ends<=7?'<span class="pill amber">Limited time</span>':''}<b>${esc(o.title)}</b><span class="muted">${esc(o.desc)}</span><small class="muted" style="margin-top:auto">Ends in ${o.ends} days</small>${o.svc?`<button class="btn sm primary" data-a="pickSvc" data-v="${o.svc}">Use offer</button>`:''}</div>`).join('')}</div></section>`:''}
     <section class="psec" id="services"><h2>Services & pricing</h2>${groups.map(g=>`<div class="svc-group"><h4>${esc(g)}</h4>${b.services.filter(s=>s.g===g).map(s=>`<div class="svc-row"><div><b>${esc(s.name)}</b><p>${esc(s.desc)} · ${s.dur} min</p></div><b class="tnum price">${inr(s.price)}</b><button class="btn sm" data-a="pickSvc" data-v="${s.id}">Book</button></div>`).join('')}</div>`).join('')}</section>
     <section class="psec" id="team"><h2>Team</h2><div class="team">${b.staff.map(s=>{const sl=firstSlots(b,2,s.id);return `<div class="panel member"><div class="row">${avatar(s.name,52)}<div style="min-width:0"><b style="font-size:16px">${esc(s.name)}</b><div class="muted" style="font-size:13px">${esc(s.role)}${s.qual?' · '+esc(s.qual):''}</div><div class="muted" style="font-size:12.5px">${s.exp} yrs exp. · ${esc(s.langs)}</div></div></div><div class="slotchips">${sl.map(o=>`<button data-a="quickSlot" data-v="${b.id}:${o.d}:${o.m}::${s.id}">${relD(addDays(TODAY,o.d)).replace('Tomorrow','Tmrw')} ${fmtT(o.m)}</button>`).join('')}</div></div>`}).join('')}</div></section>
     <section class="psec" id="reviews"><h2>Ratings & reviews</h2>${rv.length?`
      <div class="rv-top"><div class="rv-score"><b>${b.rating}</b>${starRow(b.rating)}<div class="muted" style="font-size:13px">${b.reviews.toLocaleString('en-IN')} verified reviews</div></div>
       <div class="bars">${[5,4,3,2,1].map((n,i)=>`<div><span>${n}★</span><i><span style="width:${dist[i]}%"></span></i><span class="muted tnum">${dist[i]}%</span></div>`).join('')}</div></div>
      ${rv.map(r=>`<div class="review"><div class="row">${avatar(r.n,36)}<div style="flex:1;min-width:0"><b>${r.n}</b> <span class="pill ok" style="margin-left:4px">${ic('check')}Verified visit</span><div class="muted" style="font-size:13px">${esc(r.svc)} · ${r.ago}</div></div>${starRow(r.r)}</div><p>${esc(r.text)}</p>${r.reply?`<div class="reply"><b>Reply from ${esc(b.name)}</b><br>${esc(r.reply)}</div>`:''}</div>`).join('')}`:`<p class="muted">No reviews yet. Be the first after your visit.</p>`}
     </section>
     <section class="psec" id="about"><h2>About</h2><p style="max-width:65ch">${esc(b.about)}</p><p class="muted" style="margin:8px 0 16px;font-size:14px">On Appointly since ${b.since} · ${esc(catLabel(b.cat))} › ${esc(subLabel(b))}</p>
      <div class="amen">${b.amen.map(([i,t])=>`<span>${ic(i)}${t}</span>`).join('')}</div>
      ${b.insurance.length?`<h4 style="font-size:16px;margin:20px 0 10px">Insurance accepted</h4><div class="row" style="flex-wrap:wrap;gap:8px">${b.insurance.map(x=>`<span class="pill brand">${ic('shield')}${x}</span>`).join('')}</div>`:''}
      ${b.faqs.length?`<h4 style="font-size:16px;margin:22px 0 10px">Questions people ask</h4>${b.faqs.map(([q,a])=>`<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}`:''}
     </section>
     <section class="psec" id="location" style="border-bottom:0"><h2>Location, contact & hours</h2>
      <div class="map">${mapSvg(b)}</div>
      <div class="g2" style="margin-top:16px;grid-template-columns:1fr 1fr">
       <div class="stack" style="gap:10px"><b>${esc(b.address)}</b><a class="btn sm" style="align-self:flex-start" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.name+', '+b.address)}" target="_blank" rel="noopener">${ic('pin')} Get directions</a>
        <div class="row" style="gap:8px;font-size:14px">${ic('phone')}<span class="mono">${b.phone}</span><button class="btn ghost sm" data-a="copy" data-v="${b.phone}" aria-label="Copy phone">${ic('copy')}</button></div>
        ${b.website?`<div class="row" style="gap:8px;font-size:14px">${ic('globe')}<a class="link" href="#site-${b.id}">${esc(b.website)}</a><span class="muted" style="font-size:12px">(official website)</span></div>`:''}</div>
       <div class="hours">${[1,2,3,4,5,6,0].map(d=>{const h=d===0?b.sun:(b.workDays&&!b.workDays.includes(d)?null:[b.open,b.close]);return `<div class="${d===TODAY.getDay()?'today':''}"><span>${DAYNAME[d]}</span><span class="tnum">${h?`${fmtT(h[0])} – ${fmtT(h[1])}`:'Closed'}</span></div>`}).join('')}</div>
      </div></section>
    </div>
    <aside class="panel bookcard">
     <b style="font-family:var(--f-display);font-size:18px">Booking options</b>
     <a class="btn primary lg block" href="#book-${b.id}" data-a="scrollTo" data-v="book">${ic('calendar')} Book on Appointly</a>
     <button class="btn amber lg block" data-a="openChat" data-v="${b.id}">${ic('chat')} Book by chatting with Capi</button>
     ${b.website?`<a class="btn block" href="#site-${b.id}">${ic('globe')} Visit business website</a><button class="btn block" data-a="siteWidget" data-v="${b.id}">${ic('layers')} Book on their website</button>`:''}
     <div class="openline"><span class="pill ${open?'ok':'bad'}">${open?'Open now':'Closed'}</span><span class="muted">${todayH?`Today ${fmtT(todayH[0])} – ${fmtT(todayH[1])}`:'Closed today'}</span></div>
     <div class="row" style="gap:8px;font-size:14px;align-items:flex-start">${ic('pin')}<span>${esc(b.address)}</span></div>
     <div class="policy">${ic('lock')}<span>Free cancellation up to <b>${b.cancelHrs} h</b> before.</span></div>
    </aside>
   </div></div>`;
}
function mapSvg(b){
  const h=hash(b.id);const px=180+h%160,py=90+h%60;const nm=b.name.length>26?b.name.slice(0,25)+'…':b.name;
  return `<svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map showing ${esc(b.name)} in ${esc(b.area)}">
   <rect width="600" height="300" fill="#F6EEF0"/>
   <path d="M0 ${220-h%40} C 150 ${180+h%30}, 300 ${280-h%20}, 600 ${200+h%40} L600 300 L0 300Z" fill="#F7D2DB"/>
   <rect x="${40+h%80}" y="30" width="120" height="80" rx="14" fill="#F7DCE2"/><rect x="${420-h%60}" y="140" width="110" height="70" rx="14" fill="#F7DCE2"/>
   ${[60,140,230,320,410,500].map((x,i)=>`<rect x="${x+(h>>i)%20}" y="0" width="${i%2?8:14}" height="300" fill="#fff"/>`).join('')}
   ${[50,120,190,250].map((y,i)=>`<rect x="0" y="${y+(h>>(i+3))%16}" width="600" height="${i%2?8:14}" fill="#fff"/>`).join('')}
   <path d="M0 ${80+h%30} L600 ${170+h%40}" stroke="#F6D58A" stroke-width="12"/>
   <circle cx="${px}" cy="${py+30}" r="34" fill="#DB586D" opacity=".15"/>
   <path d="M${px} ${py+30} c-14 -18 -22 -28 -22 -40 a22 22 0 0 1 44 0 c0 12 -8 22 -22 40z" fill="#F25A12" stroke="#fff" stroke-width="3"/><circle cx="${px}" cy="${py-10}" r="7" fill="#fff"/>
   <rect x="${px+28}" y="${py-30}" width="${nm.length*7.2+20}" height="28" rx="8" fill="#341119"/><text x="${px+38}" y="${py-11}" font-size="13" font-weight="700" fill="#fff" font-family="DM Sans,sans-serif">${esc(nm)}</text>
  </svg>`;
}
function bookFlow(b){
  const mb=S.mb;const svc=b.services.find(s=>s.id===mb.svc);const date=addDays(TODAY,mb.day);const hrs=hoursOn(b,date);const step=b.slotInt||30;
  const times=[];if(svc&&hrs){for(let m=hrs[0];m+svc.dur<=hrs[1];m+=step){if((b.breaks||[]).some(([a,z])=>m<z&&a<m+svc.dur))continue;times.push({m,free:!!freeStaff(b,mb.staff,date,m,svc.dur)})}}
  const grp=[['Morning',t=>t.m<720],['Afternoon',t=>t.m>=720&&t.m<1020],['Evening',t=>t.m>=1020]];
  const stf=mb.m!=null&&svc?freeStaff(b,mb.staff,date,mb.m,svc.dur):null;
  const staffName=stf?b.staff.find(s=>s.id===stf).name:mb.staff==='any'?'First available':(b.staff.find(s=>s.id===mb.staff)||{}).name;
  const off=svc&&(b.offers||[]).find(o=>o.active&&o.svc===svc.id&&o.pct);const price=svc?Math.round(svc.price*(1-(off?off.pct/100:0))):0;
  return `<div id="bookflow">
     <div class="panel bstep ${svc?'done':''}"><h3><span class="n">${svc?'✓':'1'}</span>Service</h3>
      <div class="svc-list">${b.services.map(s=>`<button class="svc ${mb.svc===s.id?'on':''}" data-a="mb" data-k="svc" data-v="${s.id}"><b>${esc(s.name)}</b><span class="muted tnum" style="font-size:13px">${s.dur} min · ${inr(s.price)}</span></button>`).join('')}</div></div>
     <div class="panel bstep done"><h3><span class="n">✓</span>${b.staff.length>1?'Staff member':'Branch'}</h3>${b.branches.length>1?`<div class="chips" style="margin-bottom:12px">${b.branches.map(x=>`<button class="chip ${mb.branch===x?'on':''}" data-a="mb" data-k="branch" data-v="${esc(x)}">${ic('pin')}${esc(x)}</button>`).join('')}</div>`:''}
      <div class="staff-row"><button class="staff ${mb.staff==='any'?'on':''}" data-a="mb" data-k="staff" data-v="any"><span class="avatar" style="background:var(--surface-2);color:var(--brand);width:48px;height:48px">${ic('users')}</span><b>Any</b><span class="muted" style="font-size:12px">Fastest slot</span></button>
      ${b.staff.map(s=>`<button class="staff ${mb.staff===s.id?'on':''}" data-a="mb" data-k="staff" data-v="${s.id}">${avatar(s.name)}<b>${esc(s.first)}</b><span class="muted" style="font-size:12px">${esc(s.role)}</span></button>`).join('')}</div></div>
     <div class="panel bstep ${mb.m!=null?'done':''}"><h3><span class="n">${mb.m!=null?'✓':'2'}</span>Date & time</h3>
      <div class="date-strip">${Array.from({length:21},(_,i)=>{const d=addDays(TODAY,i);return `<button class="date ${mb.day===i?'on':''}" data-a="mb" data-k="day" data-v="${i}"><small>${i===0?'Today':DAY[d.getDay()]}</small><b class="tnum">${d.getDate()}</b><small>${MON[d.getMonth()]}</small></button>`}).join('')}</div>
      <div style="margin-top:16px" class="times">${!svc?`<p class="muted">Pick a service to see available times.</p>`:!hrs?`<p class="muted">Closed on this day.</p>`:grp.map(([g,f])=>{const ts=times.filter(f);return ts.length?`<div><h5>${g}</h5><div class="tgrid">${ts.map(t=>`<button class="slot ${mb.m===t.m?'on':''}" ${t.free?'':'disabled aria-disabled="true" title="Booked"'} data-a="mb" data-k="m" data-v="${t.m}">${fmtT(t.m)}</button>`).join('')}</div></div>`:''}).join('')+(times.length&&times.every(t=>!t.free)?`<p class="muted">Fully booked on this day.</p><button class="btn sm" data-a="waitlist">${ic('refresh')} Join waitlist for ${relD(date)}</button>`:'')}</div></div>
     <div class="panel bstep" style="display:grid;gap:12px"><h3 style="margin:0"><span class="n">3</span>Confirm</h3>
      <div class="sumrow"><span>Service</span><b>${svc?esc(svc.name):'—'}</b></div>
      <div class="sumrow"><span>With</span><b>${esc(staffName||'—')}</b></div>
      <div class="sumrow"><span>When</span><b>${mb.m!=null?`${relD(date)}, ${fmtT(mb.m)}`:'—'}</b></div>
      <div class="sumrow"><span>Your details</span><b>${AUTH.client?`${esc(AUTH.client.name)} · +91 ${esc(AUTH.client.phone)}`:'Added in the next step'}</b></div>
      <div class="g2f"><div><label class="lbl" for="rep">Repeat</label><select class="field" id="rep" data-change="rep"><option value="none" ${mb.rep==='none'?'selected':''}>Just once</option><option value="week4" ${mb.rep==='week4'?'selected':''}>Weekly, 4 times</option><option value="week8" ${mb.rep==='week8'?'selected':''}>Weekly, 8 times</option><option value="month3" ${mb.rep==='month3'?'selected':''}>Monthly, 3 times</option></select></div>
       <div><label class="lbl" for="pay">Payment</label><select class="field" id="pay" data-change="pay"><option value="venue" ${mb.pay==='venue'?'selected':''}>Pay at venue</option><option value="upi" ${mb.pay==='upi'?'selected':''}>UPI deposit ₹200</option><option value="full" ${mb.pay==='full'?'selected':''}>Pay now</option></select></div></div>
      ${off?`<div class="offer-line">${ic('sparkle')}${esc(off.title)} applied</div>`:''}
      <div class="sumrow" style="font-size:17px;border-top:1px solid var(--line);padding-top:12px"><span>Total</span><b class="tnum">${svc?(off?`<s class="muted" style="font-weight:400">${inr(svc.price)}</s> `:'')+inr(price):'—'}</b></div>
      ${!b.autoConfirm?`<p class="muted" style="font-size:13px">${esc(b.name)} confirms requests within a few hours.</p>`:''}
      <button class="btn primary lg block" data-a="confirmManual" ${svc&&mb.m!=null&&stf?'':'disabled'}>${b.autoConfirm?'Confirm booking':'Send booking request'}</button></div></div>`;
}
function rerenderBook(){const el=$('#bookflow');if(el)el.outerHTML=bookFlow(BIZ[S.mb.biz])}

/* ---- Client calendar ---- */
const ST_CLASS={Confirmed:'up',Pending:'pend',Completed:'done',Cancelled:'cancel',Rescheduled:'resch',Expired:'cancel'};
function gate(title){return `<div class="wrap page" style="max-width:520px"><div class="panel" style="padding:26px"><div id="mlogin" class="stack" style="gap:14px">${clientForm('manage')}</div></div><p class="muted" style="font-size:13px;margin-top:14px;text-align:center">${title}</p></div>`}
function vCalendar(){
  if(!AUTH.client)return gate('Log in with your mobile number to see your calendar. You can also use the link in your WhatsApp confirmation.');
  const mine=BOOKINGS.filter(k=>k.mine);const base=S.cmon||(S.cmon=new Date(TODAY.getFullYear(),TODAY.getMonth(),1).getTime());const m0=new Date(base);
  const first=new Date(m0);first.setDate(1-((m0.getDay()+6)%7));const days=Array.from({length:42},(_,i)=>addDays(first,i));
  const sel=S.cday||TODAY.getTime();const tab=S.ctab||'upcoming';
  const groups={upcoming:mine.filter(k=>isUpcoming(k)&&!k.rescheduled),rescheduled:mine.filter(k=>isUpcoming(k)&&k.rescheduled),completed:mine.filter(k=>kStatus(k)==='Completed'),cancelled:mine.filter(k=>k.status==='cancelled')};
  const list=(S.cdayOnly?mine.filter(k=>startOfDay(k.start).getTime()===sel):groups[tab]).sort((a,c)=>tab==='upcoming'||tab==='rescheduled'?a.start-c.start:c.start-a.start);
  return `<div class="wrap page"><div class="mhead"><div><span class="eyebrow">My bookings</span><h2 style="margin-top:6px">Calendar</h2></div><a class="btn primary" href="#explore">${ic('plus')} New booking</a></div>
   <div class="split cal-split">
    <div class="panel mcal"><div class="row" style="justify-content:space-between;padding:14px 16px"><button class="btn sm" data-a="cmon" data-v="-1" aria-label="Previous month">←</button><b>${MON[m0.getMonth()]} ${m0.getFullYear()}</b><button class="btn sm" data-a="cmon" data-v="1" aria-label="Next month">→</button></div>
     <div class="mgrid">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="mhd">${d}</div>`).join('')}${days.map(d=>{const ks=mine.filter(k=>startOfDay(k.start).getTime()===d.getTime());return `<button class="mday ${dayTone(ks,d)} ${d.getMonth()!==m0.getMonth()?'out':''} ${d.getTime()===TODAY.getTime()?'today':''} ${S.cdayOnly&&d.getTime()===sel?'on':''}" data-a="cday" data-v="${d.getTime()}"><span>${d.getDate()}</span><i>${ks.slice(0,3).map(k=>`<em class="dot ${ST_CLASS[kStatus(k)]}"></em>`).join('')}</i></button>`}).join('')}</div>
     <div class="legend" style="padding:12px 16px">${[['today','Today'],['up','Upcoming'],['resch','Rescheduled'],['pend','Needs reply / pending'],['cancel','Cancelled'],['done','Completed']].map(([c,l])=>`<span><i class="dot ${c}"></i>${l}</span>`).join('')}</div></div>
    <div><div class="secnav" style="position:static;margin:0 0 14px">${S.cdayOnly?`<a href="#c-calendar" class="on">${fmtD(new Date(sel))}</a><a href="#c-calendar" data-a="ctab" data-v="upcoming">Show all</a>`:[['upcoming','Upcoming'],['rescheduled','Rescheduled'],['completed','Completed'],['cancelled','Cancelled']].map(([k,l])=>`<a href="#c-calendar" class="${tab===k?'on':''}" data-a="ctab" data-v="${k}">${l} <span class="pill">${groups[k].length}</span></a>`).join('')}</div>
     <div class="stack" style="gap:10px">${list.length?list.map(bkCard).join(''):`<div class="panel empty">Nothing here.</div>`}</div></div>
   </div></div>`;
}
function bkCard(k){const b=BIZ[k.biz];if(!b)return '';const s=svcOf(k),d=new Date(k.start);const st=kStatus(k);
  return `<button class="panel bk2" data-a="bkInfo" data-v="${k.id}">${logo(b,44)}<div style="min-width:0;flex:1;text-align:left"><b>${esc(s.name)}</b><div class="muted" style="font-size:13px">${esc(b.name)} · ${esc((staffOf(k)||{}).name||'')}</div><div style="font-size:13.5px;font-weight:600">${relD(d)}, ${fmtT(d.getHours()*60+d.getMinutes())}</div></div><span class="pill st-${ST_CLASS[st]}">${st}</span></button>`}
function bookingModal(id){const k=BOOKINGS.find(x=>x.id===id);if(!k)return;const b=BIZ[k.biz],s=svcOf(k),st=staffOf(k),d=new Date(k.start);const status=kStatus(k);const hrs=(k.start-Date.now())/36e5;const up=isUpcoming(k);const locked=up&&hrs<b.cancelHrs;
  modal(`<div class="row" style="justify-content:space-between"><span class="pill st-${ST_CLASS[status]}">${status}</span><button class="btn ghost sm" data-a="closeModal" aria-label="Close">${ic('x')}</button></div>
   <div class="row">${logo(b,52)}<div><h3 style="font-size:20px">${esc(b.name)}</h3><span class="muted">${esc(subLabel(b))} · ${esc(b.area)}</span></div></div>
   <div class="sumrow"><span>Booking ID</span><b class="mono">${k.id}</b></div><div class="sumrow"><span>Service</span><b>${esc(s.name)}</b></div><div class="sumrow"><span>Staff</span><b>${esc(st.name)}</b></div>
   <div class="sumrow"><span>Date</span><b>${fmtD(d)}</b></div><div class="sumrow"><span>Time</span><b>${fmtT(d.getHours()*60+d.getMinutes())} · ${s.dur} min</b></div><div class="sumrow"><span>Price</span><b>${inr(s.price)} · ${esc(k.pay||'Pay at venue')}</b></div><div class="sumrow"><span>Booked via</span><b>${esc(k.via)}</b></div>
   ${locked?`<div class="lock">${ic('lock')}<span>Too close to change online. Call <span class="mono">${b.phone}</span>.</span></div>`:''}
   <div class="row" style="flex-wrap:wrap">${up&&!locked?`<button class="btn" data-a="resched" data-v="${k.id}">${ic('refresh')} Reschedule</button><button class="btn danger" data-a="doCancel" data-v="${k.id}">${ic('x')} Cancel</button>`:''}
    ${status==='Completed'&&!k.rated?`<span class="row" style="gap:2px">${[1,2,3,4,5].map(n=>`<button class="btn ghost sm" style="padding:4px" data-a="rate" data-v="${k.id}:${n}" aria-label="Rate ${n} stars">${ic('star')}</button>`).join('')}</span>`:''}
    ${!up?`<button class="btn primary" data-a="bookAgain" data-v="${k.id}">Book again</button>`:''}<a class="btn ghost" href="#book-${b.id}" data-a="closeModal">Business details</a></div>`)}

/* ---- Notifications ---- */
const NICON={reminder:'bell',confirm:'check',pending:'clock',rescheduled:'refresh',cancelled:'x',followup:'calendar',offer:'sparkle',waitlist:'refresh',payment:'card',new:'calendar',request:'clock',newbiz:'building',catreq:'layers'};
function notifList(to){const ns=DB.notifs.filter(n=>n.to===to);return ns.length?ns.map(n=>`<div class="notif ${n.read?'':'unread'}"><span class="ic">${ic(NICON[n.type]||'bell')}</span><div style="flex:1;min-width:0"><div><b>${esc(n.title)}</b></div><div class="muted" style="font-size:13px">${esc(n.body)}</div><div class="muted" style="font-size:12px">${ago(n.at)}</div></div>${n.read?'':'<i class="udot" aria-label="Unread"></i>'}</div>`).join(''):'<p class="muted">You’re all caught up.</p>'}
const ago=t=>{const s=(Date.now()-t)/1000;return s<60?'Just now':s<3600?Math.round(s/60)+' min ago':s<86400?Math.round(s/3600)+' h ago':Math.round(s/86400)+' days ago'};
function vNotifs(){if(!AUTH.client)return gate('Log in to see your notifications.');
  return `<div class="wrap page" style="max-width:760px"><div class="mhead"><div><span class="eyebrow">Inbox</span><h2 style="margin-top:6px">Notifications</h2></div><button class="btn sm" data-a="readAll" data-v="client">Mark all as read</button></div><div class="panel" style="padding:6px 18px">${notifList('client')}</div></div>`}

/* ---- Profile ---- */
function vProfile(){if(!AUTH.client)return gate('Log in to see your profile.');
  const c=AUTH.client,P=DB.profile,tab=S.ptab||'info';const mine=BOOKINGS.filter(k=>k.mine);
  const tabs=[['info','Personal info'],['bookings','Bookings'],['favs','Favourites'],['reviews','Reviews'],['notifs','Notifications'],['payments','Payments'],['settings','Settings & support']];
  let body='';
  if(tab==='info')body=`<form id="profform" class="stack" style="gap:14px"><div class="g2f"><div><label class="lbl" for="pf-name">Full name</label><input class="field" id="pf-name" value="${esc(c.name)}"></div><div><label class="lbl" for="pf-phone">Mobile</label><input class="field" id="pf-phone" value="+91 ${esc(c.phone)}" disabled></div></div><div class="g2f"><div><label class="lbl" for="pf-email">Email</label><input class="field" id="pf-email" type="email" value="${esc(P.email)}"></div><div><label class="lbl" for="pf-area">Area</label><input class="field" id="pf-area" value="${esc(P.area)}"></div></div><button class="btn primary" type="submit" style="justify-self:start">Save changes</button></form>`;
  if(tab==='bookings'){const g=[['Upcoming',mine.filter(isUpcoming)],['Previous',mine.filter(k=>kStatus(k)==='Completed')],['Cancelled',mine.filter(k=>k.status==='cancelled')]];body=g.map(([t,l])=>`<h4 class="ptl">${t} <span class="pill">${l.length}</span></h4><div class="stack" style="gap:8px">${l.map(bkCard).join('')||'<p class="muted">None.</p>'}</div>`).join('')}
  if(tab==='favs')body=`<div class="biz-grid">${DB.favs.map(id=>BIZ[id]).filter(Boolean).map(bizCard).join('')||'<p class="muted">Tap the heart on any business to save it here.</p>'}</div>`;
  if(tab==='reviews')body=DB.myReviews.length?DB.myReviews.map(r=>{const b=BIZ[r.biz];return b?`<div class="review"><div class="row">${logo(b,36)}<div style="flex:1"><b>${esc(b.name)}</b><div class="muted" style="font-size:13px">${ago(r.at)}</div></div>${starRow(r.r)}</div><p>${esc(r.text)}</p></div>`:''}).join(''):'<p class="muted">Rate a completed visit and it shows up here.</p>';
  if(tab==='notifs')body=[['wa','WhatsApp messages'],['sms','SMS'],['em','Email'],['r24','Reminder 24 hours before'],['r2','Reminder 2 hours before']].map(([k,l])=>`<div class="set-row"><div class="t">${l}</div><button class="toggle ${P[k]?'on':''}" data-a="pset" data-v="${k}" aria-label="${l}"></button></div>`).join('')+`<p class="muted" style="font-size:13px;margin-top:8px">Booking confirmations are always sent.</p>`;
  if(tab==='payments'){const pays=mine.filter(k=>kStatus(k)==='Completed'||/Paid|deposit/i.test(k.pay||''));body=`<div class="table-wrap"><table><thead><tr><th>Date</th><th>Business</th><th>Service</th><th>Method</th><th class="num">Amount</th></tr></thead><tbody>${pays.map(k=>`<tr><td>${fmtD(new Date(k.start))}</td><td>${esc(BIZ[k.biz].name)}</td><td>${esc(svcOf(k).name)}</td><td>${esc(/deposit/i.test(k.pay)?'UPI deposit':(k.pay||'').replace('Paid · ','')||'At venue')}</td><td class="num">${inr(/deposit/i.test(k.pay)?200:svcOf(k).price)}</td></tr>`).join('')||'<tr><td colspan="5" class="muted">No payments yet.</td></tr>'}</tbody></table></div>`}
  if(tab==='settings')body=`<div class="set-row"><div><div class="t">Language</div><div class="d">Used by Capi and messages</div></div><select class="field" style="width:auto" aria-label="Language"><option>English</option><option>हिन्दी</option><option>తెలుగు</option></select></div><div class="set-row"><div><div class="t">Help & support</div><div class="d">Chat with Capi or our team</div></div><button class="btn sm" data-a="capiOpen">${ic('headset')} Get help</button></div><div class="set-row"><div><div class="t">Log out</div><div class="d">From this device</div></div><button class="btn sm danger" data-a="logout" data-v="client">${ic('logout')} Log out</button></div>`;
  return `<div class="wrap page"><div class="panel" style="padding:20px;display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:18px">${avatar(c.name,64)}<div style="flex:1"><h2 style="font-size:24px">${esc(c.name)}</h2><div class="muted">+91 ${esc(c.phone)} · ${esc(P.email)}</div></div><div class="row" style="gap:18px">${[['Upcoming',mine.filter(isUpcoming).length],['Visits',mine.filter(k=>kStatus(k)==='Completed').length],['Saved',DB.favs.length]].map(([l,v])=>`<div style="text-align:center"><b style="font-family:var(--f-display);font-size:22px">${v}</b><div class="muted" style="font-size:12px">${l}</div></div>`).join('')}</div></div>
   <div class="ptabs">${tabs.map(([k,l])=>`<button class="chip ${tab===k?'on':''}" data-a="ptab" data-v="${k}">${l}</button>`).join('')}</div>
   <div class="panel" style="padding:18px 20px;margin-top:14px">${body}</div></div>`;
}
function vBookings(){return vCalendar()}

/* ================= AI CHAT ================= */
const T={
 en:{hi:(b)=>`Hey! I’m ${b.bot}. Let me find the perfect slot for you at ${b.name}! What would you like to book?`,which:'Ooh, fun! Which service would you like?',pick:'Found some lovely slots for you:',confirm:'Looks perfect! Shall I book it?',booked:'Yay, you’re booked! I’ll nudge you with a reminder on WhatsApp.',handover:'Connecting you to the team…',cancelled:'Done. Your appointment is cancelled and the slot goes to the waitlist.',tooLate:(h,p)=>`Your visit is less than ${h} hours away, so changes have to go through the team. Call ${p}, or I can connect you to a person now.`,resched:'Sure. When would you like to move it to?'},
 hi:{hi:(b)=>`नमस्ते! मैं ${b.bot} हूँ, ${b.name} की AI सहायक। सेवा, दिन और समय बताइए, मैं स्लॉट ढूँढ दूँगी।`,which:'आप कौन-सी सेवा लेना चाहेंगे?',pick:'ये सबसे नज़दीकी खाली स्लॉट हैं:',confirm:'क्या मैं यह बुक कर दूँ?',booked:'बुक हो गया! पुष्टि और रिमाइंडर WhatsApp पर आएगा।',handover:'आपको टीम से जोड़ रही हूँ…',cancelled:'आपकी अपॉइंटमेंट रद्द कर दी गई है।',tooLate:(h,p)=>`अपॉइंटमेंट में ${h} घंटे से कम समय बचा है, इसलिए बदलाव टीम ही कर सकती है। कॉल करें: ${p}`,resched:'ज़रूर। किस दिन और समय पर बदलना है?'},
 te:{hi:(b)=>`నమస్తే! నేను ${b.bot}, ${b.name} AI అసిస్టెంట్‌ని. సేవ, రోజు, సమయం చెప్పండి, నేను స్లాట్ వెతుకుతాను.`,which:'మీకు ఏ సేవ కావాలి?',pick:'అందుబాటులో ఉన్న దగ్గరి స్లాట్లు ఇవి:',confirm:'ఇది బుక్ చేయమంటారా?',booked:'బుక్ అయింది! నిర్ధారణ, రిమైండర్ WhatsAppలో వస్తాయి.',handover:'మిమ్మల్ని టీమ్‌తో కలుపుతున్నాను…',cancelled:'మీ అపాయింట్‌మెంట్ రద్దు చేయబడింది.',tooLate:(h,p)=>`అపాయింట్‌మెంట్‌కు ${h} గంటల కంటే తక్కువ సమయం ఉంది, కాబట్టి మార్పులు టీమ్ మాత్రమే చేయగలదు. కాల్ చేయండి: ${p}`,resched:'సరే. ఏ రోజు, ఏ సమయానికి మార్చాలి?'}
};
const t=k=>T[S.lang][k]||T.en[k];
function chatState(id){if(!S.chat[id]){S.chat[id]={msgs:[{who:'bot',html:id==='appointly'?helpGreeting():t('hi')(BIZ[id])}],ctx:{},offers:[],pending:null,human:false,mode:'book',target:null}}return S.chat[id]}
function chatPanel(b,inDrawer){
  const cs=chatState(b.id);
  const quick=b.id==='appointly'?helpQuick():['What are your prices?','Earliest slot tomorrow morning',`Book ${b.services[1]?b.services[1].name.toLowerCase():b.services[0].name.toLowerCase()} this weekend`,'Reschedule my booking','Cancel my booking','Talk to a person'];
  return `<section class="${inDrawer?'':'panel '}chat" aria-label="Chat with ${esc(b.bot)}">
   <div class="chat-head">${botAv(b,42)}
    <div class="who"><b>${esc(b.bot)}</b> <span class="muted" style="font-size:13px">· ${esc(b.name)}</span><div id="chatstatus" style="margin-top:2px">${cs.human?'<span class="pill amber">Kavya from the team is here</span>':'<span class="pill ok live">AI · online</span>'}</div></div>
    <label class="row" style="gap:6px;font-size:13px" title="Language">${ic('globe')}<select class="field" id="lang" data-change="lang" style="padding:6px 8px;width:auto" aria-label="Language"><option value="en" ${S.lang==='en'?'selected':''}>EN</option><option value="hi" ${S.lang==='hi'?'selected':''}>हिन्दी</option><option value="te" ${S.lang==='te'?'selected':''}>తెలుగు</option></select></label>
    <button class="btn sm" data-a="handover" title="Talk to a person">${ic('headset')}</button>
    ${inDrawer?`<button class="btn ghost sm" data-a="closeDrawer" aria-label="Close chat">${ic('x')}</button>`:''}
   </div>
   <div class="chat-log" id="chatlog"></div>
   <div class="chat-quick">${quick.map(q=>`<button class="chip" data-a="say" data-v="${esc(q)}">${esc(q)}</button>`).join('')}</div>
   <form class="chat-form" id="chatform"><input class="field" id="chatin" autocomplete="off" placeholder="Tell Capi what you need…" aria-label="Message"><button class="btn primary" type="submit" aria-label="Send">${ic('send')}</button></form>
  </section>`;
}
function vChat(id){
  const b=BIZ[id];if(!b)return vDiscover();
  return `<div class="wrap page" style="padding-top:18px"><div class="crumbs"><a href="#book-${b.id}">← ${esc(b.name)}</a></div>
   <div class="chat-grid">${chatPanel(b,false)}
    <aside class="chat-side stack" style="gap:14px">
     <div class="panel" style="overflow:hidden"><div style="height:130px">${scene(b,'room')}</div><div style="padding:16px"><b>${esc(b.name)}</b><div class="muted" style="font-size:13px">${esc(subLabel(b))} · ${esc(b.area)}</div><div class="stars" style="margin-top:4px">${ic('star')}${b.rating} <span class="muted" style="font-weight:500">(${b.reviews.toLocaleString('en-IN')})</span></div></div></div>
     <div class="panel" style="padding:18px"><div class="row" style="margin-bottom:12px">${ic('sparkle')}<b>What ${esc(b.bot)} knows</b></div>
      <div class="stack" style="gap:8px;font-size:14px">${[['Services & prices',b.services.length],['Staff schedules',b.staff.length],['FAQs',b.faqs.length],['Cancel window',b.cancelHrs+' h'],['Languages','EN · HI · TE']].map(([a,c])=>`<div class="row" style="justify-content:space-between"><span class="muted">${a}</span><b>${c}</b></div>`).join('')}</div></div>
     <div class="policy">${ic('shield')}<span>${esc(b.bot)} only books after you confirm.</span></div>
    </aside></div></div>`;
}
function renderChatLog(){
  const id=S.chatBiz;const el=$('#chatlog');if(!el||!id)return;const b=BIZ[id]||PLAT;const cs=chatState(id);const plat=id==='appointly';
  const intro=`<div class="chat-intro"><span class="intro-appy">${appySVG('full')}</span><b>${esc(b.bot)}</b><span class="muted" style="font-size:13px">${plat?'Ask me about Appointly.':`Books, reschedules and cancels for ${esc(b.name)}.`}</span></div>`;
  const hn=plat?'Rhea Das':'Kavya Reddy',hl=plat?'Rhea · Appointly team':'Kavya · Front desk';
  el.innerHTML=intro+cs.msgs.map(m=>m.who==='sys'?`<div class="mrow sys"><div class="msg">${m.html}</div></div>`:`<div class="mrow ${m.who}">${m.who==='bot'?botAv(b,28):m.who==='human'?avatar(hn,28):''}<div class="msg">${m.who==='human'?`<div class="who">${hl}</div>`:''}${m.html}</div></div>`).join('')+(cs.typing?`<div class="mrow bot">${botAv(b,28)}<div class="msg"><span class="typing"><i></i><i></i><i></i></span></div></div>`:'');
  el.scrollTop=el.scrollHeight;
  if(!cs.waved){cs.waved=true;setTimeout(()=>appyMood('.chat-intro .appy, .chat-head .appy','wave',2600),200)}
}
function botSay(id,html,delay=650){const cs=chatState(id);cs.typing=true;renderChatLog();appyMood('.chat-head .appy','think');setTimeout(()=>{cs.typing=false;cs.msgs.push({who:cs.human?'human':'bot',html});renderChatLog();appyMood('.chat-head .appy','talk',900)},delay)}
function parse(text,b){
  const s=text.toLowerCase();const r={};
  if(/[ऀ-ॿ]/.test(text))r.lang='hi';else if(/[ఀ-౿]/.test(text))r.lang='te';
  const sv=b.services.find(x=>x.kw.some(k=>s.includes(k))||s.includes(x.name.toLowerCase()));if(sv)r.svc=sv.id;
  const st=b.staff.find(x=>s.includes(x.first.toLowerCase()));if(st)r.staff=st.id;
  if(/day after/.test(s))r.day=2;else if(/tomorrow|kal\b|రేపు|कल/.test(s))r.day=1;else if(/today|tonight|asap|now|ఈరోజు|आज/.test(s))r.day=0;else if(/weekend/.test(s))r.day=(6-TODAY.getDay()+7)%7;else if(/next week/.test(s))r.day=(8-TODAY.getDay()+7)%7||7;
  else DAYFULL.forEach((d,i)=>{if(s.includes(d))r.day=(i-TODAY.getDay()+7)%7});
  const tm=s.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
  if(tm){let h=+tm[1]%12+(tm[3]==='pm'?12:0);r.at=h*60+(+tm[2]||0);if(/after/.test(s)){r.part=[r.at,1440];delete r.at}else if(/before/.test(s)){r.part=[0,r.at];delete r.at}}
  else if(/morning|सुबह|ఉదయం/.test(s))r.part=[0,720];else if(/afternoon|lunch/.test(s))r.part=[720,1020];else if(/evening|after work|शाम|సాయంత్రం/.test(s))r.part=[1020,1440];
  if(/human|person|agent|staff|someone|call me|reception|front desk/.test(s))r.intent='human';
  else if(/cancel|रद्द|రద్దు/.test(s))r.intent='cancel';
  else if(/reschedul|move my|change my|postpone|prepone/.test(s))r.intent='resched';
  else if(/price|cost|how much|fee|charges|rate/.test(s))r.intent='price';
  else if(/where|address|location|direction/.test(s))r.intent='where';
  else if(/hour|timing|open|close/.test(s)&&!r.svc)r.intent='hours';
  else if(/policy|refund/.test(s))r.intent='policy';
  else if(/insurance|cashless/.test(s))r.intent='ins';
  else if(/^(hi|hello|hey|namaste|నమస్తే|नमस्ते)\b/.test(s)&&!r.svc)r.intent='hello';
  return r;
}
function findSlots(b,ctx,n=4){
  const svc=b.services.find(x=>x.id===ctx.svc);const out=[];const d0=ctx.day??0;
  for(let d=d0;d<d0+10&&out.length<n;d++){const date=addDays(TODAY,d);const h=hoursOn(b,date);if(!h)continue;
    const cands=[];for(let m=h[0];m+svc.dur<=h[1];m+=30){if(ctx.at!=null&&Math.abs(m-ctx.at)>60)continue;if(ctx.part&&(m<ctx.part[0]||m>=ctx.part[1]))continue;cands.push(m)}
    if(ctx.at!=null)cands.sort((a,c)=>Math.abs(a-ctx.at)-Math.abs(c-ctx.at));
    for(const m of cands){const st=freeStaff(b,ctx.staff||'any',date,m,svc.dur);if(st){out.push({d,m,staff:st});if(out.length>=n)break}}
    if(ctx.day!=null&&d===d0&&out.length)break;
  }
  return out;
}
const upcomingWith=id=>BOOKINGS.filter(k=>k.mine&&k.biz===id&&isUpcoming(k)).sort((a,c)=>a.start-c.start)[0];
function handleChat(text){
  if(S.chatBiz==='appointly')return handleHelp(text);
  const id=S.chatBiz;const b=BIZ[id];const cs=chatState(id);
  cs.msgs.push({who:'me',html:esc(text)});renderChatLog();
  const r=parse(text,b);
  if(r.lang&&r.lang!==S.lang){S.lang=r.lang;const sel=$('#lang');if(sel)sel.value=S.lang}
  if(cs.human){botSay(id,`Thanks, I’ve noted that. I’m checking with ${b.staff[0].first} and will reply here in a minute. You can also call ${b.phone}.`,1100);return}
  if(r.intent==='human')return doHandover(id);
  if(r.intent==='hello')return botSay(id,t('hi')(b));
  if(r.intent==='price')return botSay(id,`Here’s the menu:<div class="ccard">${b.services.map(s=>`<div class="row" style="justify-content:space-between"><span>${esc(s.name)} <span class="muted">· ${s.dur} min</span></span><b class="tnum">${inr(s.price)}</b></div>`).join('')}</div><div class="opts">${b.services.slice(0,3).map(s=>`<button data-a="say" data-v="Book ${esc(s.name.toLowerCase())}">Book ${esc(s.name)}</button>`).join('')}</div>`);
  if(r.intent==='where')return botSay(id,`We’re at ${esc(b.address)}. Other branches: ${b.branches.slice(1).map(esc).join(', ')||'none'}.<div class="opts"><button data-a="say" data-v="What are your hours?">Opening hours</button></div>`);
  if(r.intent==='hours'){const h=hoursOn(b,TODAY);return botSay(id,`Today we’re open ${h?`${fmtT(h[0])} – ${fmtT(h[1])}`:'— closed today'}. Mon–Sat ${fmtT(b.open)} – ${fmtT(b.close)}; Sunday ${b.sun?`${fmtT(b.sun[0])} – ${fmtT(b.sun[1])}`:'closed'}.`)}
  if(r.intent==='policy')return botSay(id,`You can cancel or reschedule free of charge up to <b>${b.cancelHrs} hours</b> before your appointment. Closer than that, please call ${b.phone} and the team will help.`);
  if(r.intent==='ins')return botSay(id,b.insurance.length?`Yes, we accept ${b.insurance.join(', ')}. Bring your card and a photo ID.`:'We don’t work with insurance, but we accept UPI and cards.');
  if(r.intent==='cancel'||r.intent==='resched'){
    if(!AUTH.client)return botSay(id,`Please confirm your mobile number first so I can find your booking.<div class="opts"><button data-a="chatLogin">Verify my number</button></div>`);
    const k=upcomingWith(id);
    if(!k)return botSay(id,`I don’t see an upcoming appointment with ${esc(b.name)} on your account. Would you like to book one?`);
    const hrs=(k.start-Date.now())/36e5;const d=new Date(k.start);const when=`${relD(d)}, ${fmtT(d.getHours()*60+d.getMinutes())}`;
    if(hrs<b.cancelHrs)return botSay(id,`Your <b>${esc(svcOf(k).name)}</b> is ${when}.<br>${t('tooLate')(b.cancelHrs,b.phone)}<div class="opts"><button data-a="handover">Connect me to a person</button></div>`);
    if(r.intent==='cancel'){cs.target=k.id;return botSay(id,`Your <b>${esc(svcOf(k).name)}</b> with ${esc(staffOf(k).first)} is ${when}. Cancel it?<div class="opts"><button data-a="chatCancel" data-v="${k.id}">Yes, cancel</button><button data-a="say" data-v="Reschedule my booking">Reschedule instead</button></div>`)}
    cs.mode='resched';cs.target=k.id;cs.ctx={svc:k.svc,staff:k.staff};
    if(r.day==null&&r.part==null&&r.at==null)return botSay(id,`Your <b>${esc(svcOf(k).name)}</b> is ${when}. ${t('resched')}<div class="opts"><button data-a="say" data-v="Tomorrow morning">Tomorrow morning</button><button data-a="say" data-v="This weekend">This weekend</button><button data-a="say" data-v="Next week evening">Next week, evening</button></div>`);
  }
  ['svc','staff','day','at','part'].forEach(k=>{if(r[k]!=null)cs.ctx[k]=r[k]});
  if(r.part)delete cs.ctx.at;if(r.at!=null)delete cs.ctx.part;
  if(!cs.ctx.svc)return botSay(id,`${t('which')}<div class="opts">${b.services.map(s=>`<button data-a="say" data-v="${esc(s.name)}">${esc(s.name)} · ${inr(s.price)}</button>`).join('')}</div>`);
  const slots=findSlots(b,cs.ctx);cs.offers=slots;const svc=b.services.find(x=>x.id===cs.ctx.svc);
  if(!slots.length)return botSay(id,`I couldn’t find a free ${esc(svc.name.toLowerCase())} slot for that. Want me to add you to the waitlist? I’ll message you on WhatsApp if one opens.<div class="opts"><button data-a="say" data-v="Any time this week">Any time this week</button><button data-a="chatWait">Join waitlist</button></div>`);
  const who=cs.ctx.staff?b.staff.find(s=>s.id===cs.ctx.staff).first:null;
  botSay(id,`${who?`${esc(who)} has these times for `:'For '}<b>${esc(svc.name)}</b> (${svc.dur} min, ${inr(svc.price)}). ${t('pick')}<div class="opts">${slots.map((o,i)=>`<button data-a="pickSlot" data-v="${i}">${relD(addDays(TODAY,o.d))} ${fmtT(o.m)}${who?'':' · '+esc(b.staff.find(s=>s.id===o.staff).first)}</button>`).join('')}</div>`);
}
function doHandover(id){const cs=chatState(id);const b=BIZ[id]||PLAT;const plat=id==='appointly';const hn=plat?'Rhea':'Kavya';
  if(cs.human)return;if(!plat&&!S.handover){botSay(id,`Live handover is off right now. Please call ${b.phone}.`);return}
  cs.msgs.push({who:'sys',html:plat?'Connecting you to the Appointly team…':t('handover')});renderChatLog();cs.human=true;appyMood('.chat-head .appy','wave',2400);
  setTimeout(()=>{cs.msgs.push({who:'sys',html:`${hn} from ${plat?'the Appointly team':'the front desk'} joined the chat`});cs.msgs.push({who:'human',html:plat?'Hi! I’m Rhea from Appointly. Capi filled me in. How can I help?':`Hi${AUTH.client?' '+esc(AUTH.client.name.split(' ')[0]):''}, I’m Kavya from ${esc(b.name)}. I can see your chat with ${b.bot}. How can I help?`});
    const h=$('#chatstatus');if(h)h.innerHTML=`<span class="pill amber">${hn} from the team is here</span>`;renderChatLog()},1400);
}
function drawerHTML(){
  const b=BIZ[S.chatBiz]||PLAT;const tab=S.drawerTab;
  const tabs=S.drawerTabs?`<div class="seg" style="margin:10px 12px 6px">${[['book','Pick a time'],['chat','Chat with '+b.bot]].map(([k,l])=>`<button class="${tab===k?'on':''}" data-a="wtab" data-v="${k}">${esc(l)}</button>`).join('')}</div>`:'';
  if(tab==='chat')return tabs+chatPanel(b,true);
  return `<div class="row" style="padding:12px 16px;border-bottom:1px solid var(--line)"><span style="width:38px;height:38px;border-radius:10px;overflow:hidden;flex:none">${scene(b,'exterior')}</span><div style="flex:1;min-width:0"><b>${esc(b.name)}</b><div class="muted" style="font-size:12px">Book online · no account needed</div></div><button class="btn ghost sm" data-a="closeDrawer" aria-label="Close">${ic('x')}</button></div>${tabs}<div class="wbody">${bookFlow(b)}<p class="muted" style="text-align:center;font-size:12px;padding:10px 0 0">Powered by Appointly</p></div>`;
}
function openDrawer(id,tab='chat',tabs=false,svc){S.chatBiz=id;S.drawer=true;S.drawerTab=tab;S.drawerTabs=tabs;const b=BIZ[id]||PLAT;S.bubbleSeen=S.bubbleSeen||{};S.bubbleSeen[S.view]=true;
  if(id==='appointly'){const cs=chatState(id);if(cs.msgs.length<=1)cs.msgs=[{who:'bot',html:helpGreeting()}]}
  else{if(!S.mb||S.mb.biz!==id)S.mb={biz:id,svc:null,branch:b.branches[0],staff:'any',day:0,m:null,pay:'venue'};if(svc){S.mb.svc=svc;S.mb.m=null}}
  $('#drawer').innerHTML=`<div class="drawer-scrim" data-a="closeDrawer" data-self="1"></div><div class="drawer" role="dialog" aria-label="Book with ${esc(b.name)}" id="drawerbox">${drawerHTML()}</div>`;
  if(tab==='chat')renderChatLog();$('#launch').innerHTML='';setTimeout(()=>{const i=$('#chatin');if(i&&matchMedia('(min-width:721px)').matches)i.focus()},300)}
function renderDrawer(){const d=$('#drawerbox');if(d){d.innerHTML=drawerHTML();if(S.drawerTab==='chat')renderChatLog()}}
function closeDrawer(){S.drawer=false;$('#drawer').innerHTML='';renderLauncher()}

/* ================= BUSINESS DASHBOARD ================= */
const greet=()=>new Date().getHours()<12?'morning':new Date().getHours()<17?'afternoon':'evening';
const AIDX=new Map();
function dayAppts(b,off){const list=apptsOn(b,addDays(TODAY,off));list.forEach(a=>AIDX.set(a.id,a));return list}
function rangeAppts(b,from,to){let out=[];for(let d=from;d<=to;d++)out=out.concat(dayAppts(b,d));return out}
function aCls(a){if(a.status==='cancelled')return 'cancel';if(a.status==='pending')return a.date<TODAY.getTime()?'cancel':'pend';if(a.date===TODAY.getTime())return 'today';return a.date>TODAY.getTime()?'up':'done'}
const ALBL={today:'Today',up:'Upcoming',pend:'Pending',cancel:'Cancelled',done:'Completed'};
const aDate=a=>new Date(a.date);
function remOf(id){return DB.rem&&DB.rem[id]||{}}
const DASHNAV=[['overview','chart','Dashboard'],['appts','calendar','Appointments'],['reminders','bell','Reminders'],['calendar','calendar','Calendar'],['slots','clock','Services & Slots'],['customers','user','Customers'],['staff','users','Staff'],['profile','building','Business Profile'],['website','globe','Website Integration'],['offers','sparkle','Offers'],['analytics','chart','Analytics & Reports'],['settings','sliders','Settings']];
ICON.sliders=ICON.sliders||'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>';
function vDash(){
  const b=CUR();if(!b)return '';AIDX.clear();
  const pend=rangeAppts(b,0,21).filter(isReq).length;const unread=DB.notifs.filter(n=>n.to===b.id&&!n.read).length;
  const body=({overview:dOverview,appts:dAppts,reminders:dReminders,calendar:dCalendar,slots:dSlots,customers:dCustomers,staff:dStaff,profile:dProfile,website:dChannels,offers:dOffers,analytics:dAnalytics,settings:dSettings}[S.dash]||dOverview)(b);
  return `<div class="ws">
   <aside class="side">
    <div class="biz-sw">${logo(b,38)}<div style="min-width:0"><b style="font-size:14px;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(b.name)}</b><div class="muted" style="font-size:12px">${esc(subLabel(b))} · ${b.plan||'Growth'}</div></div></div>
    ${b.status!=='active'?`<div class="pill ${b.status==='pending'?'amber':'bad'}" style="margin:0 6px 10px;white-space:normal">${b.status==='pending'?'Awaiting verification. Not visible to customers yet.':'Inactive. Hidden from customers.'}</div>`:''}
    ${DASHNAV.map(([k,i,l])=>`<button class="${S.dash===k?'on':''}" data-a="dash" data-v="${k}">${ic(i)}${l}${k==='appts'&&pend?`<span class="badge">${pend}</span>`:''}${k==='overview'&&unread?`<span class="badge">${unread}</span>`:''}</button>`).join('')}
    <div class="sidefoot" style="margin-top:auto;padding:12px;border-radius:12px;background:var(--surface-2);font-size:13px"><b>Booking page</b><div class="muted" style="word-break:break-all">book.appointly.app/${b.id}</div><a href="#book-${b.id}" class="btn sm" style="margin-top:8px;width:100%">Preview</a></div>
   </aside>
   <div class="main" id="dashmain">${body}</div></div>`;
}
function dHead(title,sub,right=''){return `<div class="mhead"><div><span class="muted" style="font-size:14px">${sub}</span><h2>${title}</h2></div><div class="row" style="flex-wrap:wrap">${right}</div></div>`}
function stPill(a){const c=aCls(a);return `<span class="pill st-${c}">${a.rescheduled&&c!=='cancel'?'Rescheduled':ALBL[c]}</span>`}
function apptActions(a){const c=aCls(a);return a.status==='pending'&&c==='pend'?`<button class="btn sm primary" data-a="aSet" data-v="${a.id}|confirmed">Accept</button><button class="btn sm danger" data-a="aSet" data-v="${a.id}|cancelled">Reject</button>`:(c==='today'||c==='up')?`<button class="btn sm" data-a="aResched" data-v="${a.id}">Reschedule</button><button class="btn sm danger" data-a="aSet" data-v="${a.id}|cancelled">Cancel</button>`:''}
function dOverview(b){
  const today=dayAppts(b,0),up=rangeAppts(b,1,7),past=rangeAppts(b,-29,0),fut=rangeAppts(b,0,14);
  const pend=fut.filter(a=>isReq(a));const cancelled=past.filter(a=>a.status==='cancelled');
  const rev=past.filter(a=>a.status==='confirmed'&&(a.date<TODAY.getTime()||a.start+a.dur<=nowMin())).reduce((s,a)=>s+a.price,0);
  const days=Array.from({length:14},(_,i)=>{const l=dayAppts(b,i-13);return{d:addDays(TODAY,i-13),n:l.filter(a=>a.status!=='cancelled').length,c:l.filter(a=>a.status==='cancelled').length}});
  const max=Math.max(10,Math.ceil(Math.max(...days.map(x=>x.n+x.c))/10)*10);const W=640,H=220,pl=34,pb=26,pt=10,bw=(W-pl-10)/14;const y=v=>pt+(H-pt-pb)*(1-v/max);
  const chart=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block" role="img" aria-label="Appointments per day, last 14 days">${[0,.5,1].map(f=>`<line x1="${pl}" x2="${W-6}" y1="${y(max*f)}" y2="${y(max*f)}" stroke="var(--line)" stroke-dasharray="${f?'3 4':''}"/><text x="${pl-8}" y="${y(max*f)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${Math.round(max*f)}</text>`).join('')}${days.map((x,i)=>{const X=pl+i*bw+bw*.18,w=bw*.64;return `<rect x="${X}" y="${y(x.n)}" width="${w}" height="${y(0)-y(x.n)}" fill="var(--brand)" rx="3"/><rect x="${X}" y="${y(x.n+x.c)}" width="${w}" height="${Math.max(0,y(x.n)-y(x.n+x.c)-2)}" fill="var(--st-cancel)" rx="3"/>${i%2===1||i===13?`<text x="${X+w/2}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--muted)">${i===13?'Today':x.d.getDate()+' '+MON[x.d.getMonth()]}</text>`:''}`}).join('')}</svg>`;
  const card=(l,v,d,cls='')=>`<div class="panel kpi ${cls}"><small>${l}</small><b>${v}</b><span class="d">${d}</span></div>`;
  return dHead(`Good ${greet()}, ${esc((AUTH.business.name||b.owner||'').split(' ').slice(0,2).join(' '))}`,`${fmtD(TODAY)} · ${esc(b.name)}`,`<span class="pill ok live">Live sync on</span><button class="btn sm" data-a="dash" data-v="calendar">${ic('calendar')} Open calendar</button>`)+`
  <div class="kpis six">${card("Today’s appointments",today.filter(a=>a.status!=='cancelled').length,`${today.filter(a=>a.status==='pending').length} pending`,'k-today')}${card('Upcoming · 7 days',up.filter(blocking).length,'confirmed + pending','k-up')}${card('Total bookings · 30 days',past.length,`${past.filter(a=>a.src==='db').length} from Appointly`)}${card('Revenue · 30 days',inr(rev),'completed visits')}${card('Pending requests',pend.length,pend.length?'needs your reply':'all caught up','k-pend')}${card('Cancellations · 30 days',cancelled.length,`${past.length?Math.round(cancelled.length/past.length*100):0}% of bookings`,'k-cancel')}</div>
  <div class="g2" style="margin-bottom:18px">
   <div class="panel"><div class="ph"><h3>Today</h3><div class="legend">${['today','up','pend','cancel'].map(c=>`<span><i class="sw st-${c}"></i>${ALBL[c]}</span>`).join('')}</div></div><div class="pb">${today.length?today.map(a=>`<button class="tl-row tlb" data-a="aInfo" data-v="${a.id}"><span class="mono" style="font-size:13px">${fmtT(a.start)}</span><div style="min-width:0;text-align:left"><b style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.customer)}</b><span class="muted" style="font-size:13px">${esc(a.svc)} · ${esc((b.staff.find(s=>s.id===a.staff)||{}).first||'')}</span></div>${stPill(a)}</button>`).join(''):'<p class="muted">No appointments today.</p>'}</div></div>
   <div class="panel"><div class="ph"><h3>Pending requests</h3><button class="btn ghost sm" data-a="dash" data-v="appts">All appointments ${ic('arrow')}</button></div><div class="pb">${pend.slice(0,6).map(a=>`<div class="req"><div style="min-width:0"><b>${esc(a.customer)}</b><div class="muted" style="font-size:13px">${esc(a.svc)} · ${relD(aDate(a))}, ${fmtT(a.start)}</div></div><div class="row" style="gap:6px">${apptActions(a)}</div></div>`).join('')||'<p class="muted">No pending requests.</p>'}</div></div>
  </div>
  <div class="panel" style="margin-bottom:18px"><div class="ph"><h3>Appointments, last 14 days</h3><div class="legend"><span><i class="sw" style="background:var(--brand)"></i>Booked</span><span><i class="sw st-cancel"></i>Cancelled</span></div></div><div class="pb">${chart}</div></div>
  <div class="g3"><div class="ins"><span class="pill amber tag">Fill quiet hours</span><p>Mid-afternoons run at <b>38% capacity</b>. An off-peak offer could fill about 9 slots a week.</p><button class="btn sm" data-a="dash" data-v="offers">Create offer</button></div>
   <div class="ins"><span class="pill brand tag">Reminders</span><p><b>${rangeAppts(b,1,1).filter(blocking).length} customers</b> have appointments tomorrow. Capi sends WhatsApp reminders automatically.</p><button class="btn sm" data-a="dash" data-v="reminders">Open reminders</button></div>
   <div class="ins"><span class="pill warn tag">Cancellations</span><p>${cancelled.length} cancellations in 30 days. Deposits for first-time customers usually halve this.</p><button class="btn sm" data-a="dash" data-v="settings">Booking rules</button></div></div>`;
}
function dAppts(b){
  const tab=S.atab||'pending';const all=rangeAppts(b,-14,21);
  const L={pending:all.filter(a=>isReq(a)),today:all.filter(a=>a.date===TODAY.getTime()),upcoming:all.filter(a=>a.date>TODAY.getTime()&&blocking(a)),past:all.filter(a=>a.date<TODAY.getTime()&&a.status!=='cancelled').reverse(),cancelled:all.filter(a=>a.status==='cancelled').reverse()};
  const list=L[tab];
  return dHead('Appointments','Accept requests, reschedule, cancel and update statuses',`<button class="btn sm primary" data-a="newAppt">${ic('plus')} New appointment</button>`)+`
  <div class="secnav" style="position:static;margin-bottom:14px">${[['pending','Pending requests'],['today','Today'],['upcoming','Upcoming'],['past','Past'],['cancelled','Cancelled']].map(([k,l])=>`<a href="#dashboard" class="${tab===k?'on':''}" data-a="atab" data-v="${k}">${l} <span class="pill">${L[k].length}</span></a>`).join('')}</div>
  <div class="panel table-wrap"><table><thead><tr><th>Booking ID</th><th>Customer</th><th>Service</th><th>Staff</th><th>Date & time</th><th>Source</th><th>Status</th><th></th></tr></thead><tbody>
  ${list.slice(0,60).map(a=>`<tr><td class="mono" style="font-size:12.5px"><button class="link" data-a="aInfo" data-v="${a.id}">${a.bid}</button></td><td><b>${esc(a.customer)}</b><div class="muted" style="font-size:12px">${esc(a.phone)}</div></td><td>${esc(a.svc)}</td><td>${esc((b.staff.find(s=>s.id===a.staff)||{}).first||'')}</td><td>${relD(aDate(a))}, ${fmtT(a.start)}</td><td>${esc(a.source)}</td><td>${stPill(a)}</td><td><div class="row" style="gap:6px">${apptActions(a)||(aCls(a)==='done'&&a.status==='confirmed'?`<button class="btn sm" data-a="aSet" data-v="${a.id}|noshow">No-show</button>`:'')}</div></td></tr>`).join('')||`<tr><td colspan="8" class="muted">Nothing here.</td></tr>`}
  </tbody></table></div>
  <div class="panel" style="margin-top:18px"><div class="ph"><h3>Waitlist</h3><span class="pill brand">Auto-offers freed slots</span></div><div class="pb">${['Rahul Verma','Sneha Iyer','Karthik M.'].map((n,i)=>`<div class="req"><div><b>${n}</b><div class="muted" style="font-size:13px">${esc(b.services[i%b.services.length].name)} · ${['Any weekday morning','Weekend','After 5 PM'][i]}</div></div><button class="btn sm" data-a="toast" data-v="Slot offered to ${n} on WhatsApp">Offer slot</button></div>`).join('')}</div></div>`;
}
function dReminders(b){
  const list=rangeAppts(b,0,3).filter(a=>blocking(a)&&(a.date>TODAY.getTime()||a.start>nowMin()));
  return dHead('Reminders','Capi reminds customers automatically. Your team can follow up personally.',`<span class="pill">${list.filter(a=>!remOf(a.id).contacted).length} not contacted</span>`)+`
  <div class="panel" style="padding:14px 18px;margin-bottom:16px;display:flex;gap:18px;flex-wrap:wrap;align-items:center"><b>Automatic reminders</b>${[['rem24','24 hours before'],['rem2','2 hours before']].map(([k,l])=>`<label class="row" style="gap:8px"><button class="toggle ${b[k]!==false?'on':''}" data-a="bset" data-v="${k}" aria-label="${l}"></button>${l}</label>`).join('')}<span class="muted" style="font-size:13px">Customer phone numbers are visible only to logged-in staff.</span></div>
  <div class="panel table-wrap"><table><thead><tr><th>Customer</th><th>Contact number</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th><th>Reminder</th><th>Action</th></tr></thead><tbody>
  ${list.map(a=>{const r=remOf(a.id);return `<tr><td><b>${esc(a.customer)}</b>${r.note?`<div class="muted" style="font-size:12px">${ic('list')} ${esc(r.note)}</div>`:''}</td><td class="mono" style="font-size:12.5px">${esc(a.phone)}</td><td>${esc(a.svc)}</td><td>${relD(aDate(a))}</td><td>${fmtT(a.start)}</td><td>${a.status==='pending'?'<span class="pill st-pend">Pending</span>':'<span class="pill st-up">Confirmed</span>'}</td><td>${r.contacted?'<span class="pill ok">Contacted</span>':'<span class="pill">Not contacted</span>'}${r.sent?`<div class="muted" style="font-size:11.5px">Reminder sent ${ago(r.sent)}</div>`:''}</td>
   <td><div class="row" style="gap:6px"><button class="btn sm" data-a="remCall" data-v="${a.id}">${ic('phone')} Call</button><button class="btn sm" data-a="remSend" data-v="${a.id}">${ic('whatsapp')} Send</button><button class="btn sm ${r.contacted?'':'primary'}" data-a="remMark" data-v="${a.id}">${r.contacted?'Undo':'Mark contacted'}</button><button class="btn ghost sm" data-a="remNote" data-v="${a.id}" aria-label="Add note">${ic('list')}</button></div></td></tr>`}).join('')||'<tr><td colspan="8" class="muted">No upcoming appointments in the next 3 days.</td></tr>'}
  </tbody></table></div>`;
}
function dCalendar(b){
  const view=S.cview||'day';const off=S.calDay||0;const base=addDays(TODAY,off);
  const nav=`<div class="seg" style="width:auto">${['day','week','month'].map(v=>`<button class="${view===v?'on':''}" data-a="cview" data-v="${v}">${v[0].toUpperCase()+v.slice(1)}</button>`).join('')}</div><button class="btn sm" data-a="calDay" data-v="-1" aria-label="Previous">←</button><button class="btn sm" data-a="calDay" data-v="0">Today</button><button class="btn sm" data-a="calDay" data-v="1" aria-label="Next">→</button>`;
  const legend=`<div class="legend" style="margin-bottom:12px">${['today','up','resch','pend','cancel','done'].map(c=>`<span><i class="sw st-${c}"></i>${ALBL[c]}</span>`).join('')}${S.calStaff?`<button class="chip sm on" data-a="calStaff" data-v="">${esc((b.staff.find(s=>s.id===S.calStaff)||{}).name)} ✕</button>`:''}</div>`;
  if(view==='month'){const m0=new Date(base.getFullYear(),base.getMonth(),1);const first=addDays(m0,-((m0.getDay()+6)%7));const days=Array.from({length:42},(_,i)=>addDays(first,i));
    return dHead('Calendar',`${MON[m0.getMonth()]} ${m0.getFullYear()}`,nav)+legend+`<div class="panel bmonth"><div class="mgrid">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="mhd">${d}</div>`).join('')}${days.map(d=>{const o=Math.round((d-TODAY)/864e5);const l=apptsOn(b,d).filter(a=>!S.calStaff||a.staff===S.calStaff);l.forEach(a=>AIDX.set(a.id,a));return `<div class="bmday ${d.getMonth()!==m0.getMonth()?'out':''} ${o===0?'today':''}"><button class="dnum" data-a="calGo" data-v="${o}">${d.getDate()}</button>${l.slice(0,3).map(a=>`<button class="ev st-${aCls(a)}" data-a="aInfo" data-v="${a.id}">${fmtT(a.start).replace(':00','')} ${esc(a.customer.split(' ')[0])}</button>`).join('')}${l.length>3?`<button class="more" data-a="calGo" data-v="${o}">+${l.length-3} more</button>`:''}</div>`}).join('')}</div></div>`}
  if(view==='week'){const start=addDays(base,-((base.getDay()+6)%7));const h=[b.open,b.close];const rows=Math.ceil((h[1]-h[0])/30);const cols='64px repeat(7,minmax(110px,1fr))';
    return dHead('Calendar',`Week of ${fmtD(start)}`,nav)+legend+`<div class="panel cal"><div class="cal-inner" style="min-width:860px"><div class="cal-head" style="grid-template-columns:${cols}"><div></div>${Array.from({length:7},(_,i)=>{const d=addDays(start,i);return `<div class="${d.getTime()===TODAY.getTime()?'tdy':''}"><button class="link" data-a="calGo" data-v="${Math.round((d-TODAY)/864e5)}">${DAY[d.getDay()]} ${d.getDate()}</button></div>`}).join('')}</div>
     <div class="cal-body" style="grid-template-columns:${cols}"><div class="cal-times">${Array.from({length:rows},(_,i)=>`<div>${(h[0]+i*30)%60===0?fmtT(h[0]+i*30).replace(':00',''):''}</div>`).join('')}</div>
     ${Array.from({length:7},(_,i)=>{const d=addDays(start,i);const l=apptsOn(b,d).filter(a=>!S.calStaff||a.staff===S.calStaff);l.forEach(a=>AIDX.set(a.id,a));const lanes={};return `<div class="cal-col">${Array.from({length:rows},()=>`<div class="cal-cell" style="cursor:default"></div>`).join('')}${l.map(a=>{const k=Math.floor((a.start-h[0])/30);lanes[k]=(lanes[k]||0)+1;const ln=lanes[k]-1;return `<div class="appt ev2 st-${aCls(a)}" style="top:${(a.start-h[0])/30*44+2}px;height:${Math.max(20,a.dur/30*44-4)}px;left:${4+ln*10}px" data-a="aInfo" data-v="${a.id}"><b>${esc(a.customer)}</b>${fmtT(a.start)}</div>`}).join('')}</div>`}).join('')}</div></div></div>`}
  const h=hoursOn(b,base)||[b.open,b.close];const ap=apptsOn(b,base);ap.forEach(a=>AIDX.set(a.id,a));const staff=S.calStaff?b.staff.filter(s=>s.id===S.calStaff):b.staff;const rows=Math.ceil((h[1]-h[0])/30);const cols=`64px repeat(${staff.length},minmax(150px,1fr))`;const nm=nowMin();
  return dHead('Calendar',`${relD(base)} · ${ap.filter(a=>a.status!=='cancelled').length} appointments`,nav)+legend+`
  <div class="panel cal"><div class="cal-inner"><div class="cal-head" style="grid-template-columns:${cols}"><div></div>${staff.map(s=>`<div>${avatar(s.name,30)}<span style="min-width:0"><span style="display:block">${esc(s.first)}</span><span class="muted" style="font-size:12px;font-weight:500">${esc(s.role)}</span></span></div>`).join('')}</div>
   <div class="cal-body" style="grid-template-columns:${cols}"><div class="cal-times">${Array.from({length:rows},(_,i)=>`<div>${(h[0]+i*30)%60===0?fmtT(h[0]+i*30).replace(':00',''):''}</div>`).join('')}</div>
    ${staff.map(s=>`<div class="cal-col">${Array.from({length:rows},(_,i)=>{const m=h[0]+i*30;const br=(b.breaks||[]).some(([a,z])=>m>=a&&m<z);return `<div class="cal-cell ${br?'brk':''}" ${br?'':`data-a="cellAdd" data-v="${s.id}:${m}" title="Add at ${fmtT(m)}"`}></div>`}).join('')}
      ${ap.filter(a=>a.staff===s.id).map(a=>`<div class="appt ev2 st-${aCls(a)}" style="top:${(a.start-h[0])/30*44+2}px;height:${Math.max(20,a.dur/30*44-4)}px" data-a="aInfo" data-v="${a.id}"><b>${esc(a.customer)}${a.mine?' ★':''}</b>${fmtT(a.start)} · ${esc(a.svc)}</div>`).join('')}</div>`).join('')}
    ${off===0&&nm>h[0]&&nm<h[1]?`<div class="nowline" style="top:${(nm-h[0])/30*44}px;left:64px"></div>`:''}
   </div></div></div>`;
}
function dSlots(b){
  const tm=m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
  return dHead('Services & Slots','Booked slots are blocked automatically on every channel, so double bookings can’t happen.',`<button class="btn sm primary" data-a="svcEdit" data-v="">${ic('plus')} Add service</button>`)+`
  <div class="panel table-wrap" style="margin-bottom:18px"><table><thead><tr><th>Service</th><th class="num">Duration</th><th class="num">Price</th><th>Staff</th><th>Bookable online</th><th></th></tr></thead><tbody>
  ${b.services.map(s=>`<tr><td><b>${esc(s.name)}</b><div class="muted" style="font-size:12px">${esc(s.desc)}</div></td><td class="num">${s.dur} min</td><td class="num">${inr(s.price)}</td><td>${s.staff?s.staff.map(x=>esc((b.staff.find(t=>t.id===x)||{}).first||'')).join(', '):'All staff'}</td><td><button class="toggle ${s.off?'':'on'}" data-a="svcToggle" data-v="${s.id}" aria-label="Bookable online"></button></td><td><div class="row" style="gap:6px"><button class="btn ghost sm" data-a="svcEdit" data-v="${s.id}">Edit</button><button class="btn ghost sm danger" data-a="svcDel" data-v="${s.id}">Remove</button></div></td></tr>`).join('')}
  </tbody></table></div>
  <form class="panel slotform" id="slotform"><div class="ph"><h3>Working hours & slot rules</h3></div><div class="pb stack" style="gap:14px">
   <div class="g4"><div><label class="lbl" for="sl-open">Opens</label><input class="field" type="time" id="sl-open" value="${tm(b.open)}"></div><div><label class="lbl" for="sl-close">Closes</label><input class="field" type="time" id="sl-close" value="${tm(b.close)}"></div><div><label class="lbl" for="sl-sun">Sunday</label><select class="field" id="sl-sun"><option value="open" ${b.sun?'selected':''}>Open</option><option value="closed" ${b.sun?'':'selected'}>Closed</option></select></div><div><label class="lbl" for="sl-int">Slot interval</label><select class="field" id="sl-int">${[15,30,45,60].map(x=>`<option ${b.slotInt===x?'selected':''} value="${x}">${x} min</option>`).join('')}</select></div></div>
   <div class="g4"><div><label class="lbl" for="sl-bs">Break starts</label><input class="field" type="time" id="sl-bs" value="${b.breaks&&b.breaks[0]?tm(b.breaks[0][0]):''}"></div><div><label class="lbl" for="sl-be">Break ends</label><input class="field" type="time" id="sl-be" value="${b.breaks&&b.breaks[0]?tm(b.breaks[0][1]):''}"></div><div><label class="lbl" for="sl-buf">Buffer between bookings</label><select class="field" id="sl-buf">${[0,5,10,15,30].map(x=>`<option ${b.buffer===x?'selected':''} value="${x}">${x} min</option>`).join('')}</select></div><div><label class="lbl" for="sl-lim">Daily booking limit</label><input class="field" type="number" id="sl-lim" min="1" value="${b.dailyLimit||40}"></div></div>
   <div><label class="lbl">Holidays</label><div class="row" style="gap:8px;flex-wrap:wrap"><input class="field" type="date" id="sl-hol" style="max-width:200px"><button class="btn sm" type="button" data-a="holAdd">Add holiday</button>${(b.holidays||[]).map(h=>`<button type="button" class="chip sm" data-a="holDel" data-v="${h}">${esc(h)} ✕</button>`).join('')}</div></div>
   <div><label class="lbl">Staff availability</label>${b.staff.map(s=>`<div class="set-row"><div class="row" style="gap:10px">${avatar(s.name,28)}<b>${esc(s.name)}</b></div><div class="chips">${[1,2,3,4,5,6,0].map(d=>`<button type="button" class="chip sm ${(s.days||[]).includes(d)?'on':''}" data-a="stDay" data-v="${s.id}:${d}">${DAY[d]}</button>`).join('')}</div></div>`).join('')}</div>
   <button class="btn primary" type="submit" style="justify-self:start">Save slot settings</button></div></form>`;
}
function custData(b){const all=rangeAppts(b,-60,21);const m={};all.forEach(a=>{const c=m[a.customer]||(m[a.customer]={name:a.customer,phone:a.phone,visits:0,spend:0,last:0,next:0,src:{},list:[]});c.list.push(a);if(a.status==='cancelled')return;if(a.date<=TODAY.getTime()){c.visits++;c.spend+=a.price;c.last=Math.max(c.last,a.date)}else if(!c.next||a.date<c.next)c.next=a.date;c.src[a.source]=(c.src[a.source]||0)+1});return Object.values(m).sort((x,y)=>y.visits-x.visits)}
function dCustomers(b){const q=(S.cq||'').toLowerCase();const rows=custData(b).filter(c=>!q||c.name.toLowerCase().includes(q));
  return dHead('Customers',`${rows.length} customers · last 60 days`,`<div class="search" style="padding:4px 4px 4px 12px;box-shadow:none">${ic('search')}<input id="cq" placeholder="Search customers" value="${esc(S.cq||'')}" aria-label="Search customers"></div>`)+`
  <div class="panel table-wrap"><table><thead><tr><th>Name</th><th>Phone</th><th class="num">Visits</th><th>Last visit</th><th>Next visit</th><th class="num">Spend</th><th>Usually books via</th><th></th></tr></thead><tbody>
  ${rows.slice(0,40).map(c=>`<tr><td><span class="row" style="gap:10px">${avatar(c.name,30)}<b>${esc(c.name)}</b></span></td><td class="mono" style="font-size:12.5px">${esc(c.phone)}</td><td class="num">${c.visits}</td><td>${c.last?fmtD(new Date(c.last)):'—'}</td><td>${c.next?fmtD(new Date(c.next)):'—'}</td><td class="num">${inr(c.spend)}</td><td>${esc(Object.entries(c.src).sort((a,z)=>z[1]-a[1])[0][0])}</td><td><button class="btn ghost sm" data-a="custInfo" data-v="${esc(c.name)}">History</button></td></tr>`).join('')}
  </tbody></table></div>`}
function dStaff(b){const month=rangeAppts(b,-29,0);
  return dHead('Staff',`${b.staff.length} team members`,`<button class="btn primary sm" data-a="staffEdit" data-v="">${ic('plus')} Add staff</button>`)+`
  <div class="g3" style="grid-template-columns:repeat(auto-fill,minmax(270px,1fr))">${b.staff.map(s=>{const mine=month.filter(a=>a.staff===s.id&&a.status==='confirmed');const rev=mine.reduce((x,a)=>x+a.price,0);const today=dayAppts(b,0).filter(a=>a.staff===s.id&&a.status!=='cancelled');
   return `<div class="panel" style="padding:18px;display:grid;gap:12px"><div class="row">${avatar(s.name,48)}<div style="flex:1;min-width:0"><b>${esc(s.name)}</b><div class="muted" style="font-size:13px">${esc(s.role)}</div></div><button class="btn ghost sm" data-a="staffEdit" data-v="${s.id}">Edit</button></div>
    <div class="row" style="justify-content:space-between;font-size:13px"><span class="muted">Today</span><b>${today.length} appointments</b></div>
    <div class="row" style="justify-content:space-between;font-size:13px"><span class="muted">Last 30 days</span><b>${mine.length} visits · ${inr(rev)}</b></div>
    <div class="row" style="justify-content:space-between;font-size:13px"><span class="muted">Works</span><span>${(s.days||[]).length===7?'Every day':(s.days||[]).map(d=>DAY[d]).join(', ')}</span></div>
    <div><div class="muted" style="font-size:12px;margin-bottom:6px">Services</div><div class="chips" style="flex-wrap:wrap">${b.services.map(v=>`<button class="chip sm ${!s.svcs||s.svcs.includes(v.id)?'on':''}" data-a="staffSvc" data-v="${s.id}:${v.id}">${esc(v.name)}</button>`).join('')}</div></div>
    <div class="row"><button class="btn sm" data-a="staffCal" data-v="${s.id}">${ic('calendar')} View calendar</button>${b.staff.length>1?`<button class="btn sm danger" data-a="staffDel" data-v="${s.id}">Remove</button>`:''}</div></div>`}).join('')}</div>`}
function dProfile(b){const c=catOf(b.cat);
  return dHead('Business Profile','What customers see on your booking page and in Explore',`<a class="btn sm" href="#book-${b.id}">${ic('user')} Preview page</a>`)+`
  <form class="panel" id="bprof" style="padding:20px;display:grid;gap:14px">
   <div class="row" style="gap:16px;flex-wrap:wrap"><span id="bpLogo">${logo(b,72)}</span><div><label class="btn sm" for="bp-logo">${ic('download')} Change logo</label><input type="file" id="bp-logo" accept="image/*" hidden></div>
    <div class="row" style="margin-left:auto;gap:10px"><span class="muted">Status</span><button type="button" class="toggle ${b.status==='active'?'on':''}" data-a="bizStatus" aria-label="Business active"></button><b>${b.status==='active'?'Active':b.status==='pending'?'Awaiting verification':'Inactive'}</b></div></div>
   <div class="g2f"><div><label class="lbl" for="bp-name">Business name</label><input class="field" id="bp-name" value="${esc(b.name)}"></div><div><label class="lbl" for="bp-web">Website</label><input class="field" id="bp-web" value="${esc(b.website||'')}"></div></div>
   <div><label class="lbl" for="bp-desc">Description</label><textarea class="field" id="bp-desc" rows="3">${esc(b.about)}</textarea></div>
   <div class="g2f"><div><label class="lbl" for="bp-cat">Category</label><select class="field" id="bp-cat">${DB.cats.map(x=>`<option value="${x.id}" ${x.id===b.cat?'selected':''}>${esc(x.label)}</option>`).join('')}</select></div><div><label class="lbl" for="bp-sub">Subcategory</label><select class="field" id="bp-sub">${(c?c.subs:[]).map(x=>`<option value="${x.id}" ${x.id===b.sub?'selected':''}>${esc(x.label)}</option>`).join('')}</select></div></div>
   <div class="g2f"><div><label class="lbl" for="bp-addr">Address</label><input class="field" id="bp-addr" value="${esc(b.address)}"></div><div><label class="lbl" for="bp-area">Area</label><input class="field" id="bp-area" value="${esc(b.area)}"></div></div>
   <div class="g2f"><div><label class="lbl" for="bp-phone">Phone</label><input class="field" id="bp-phone" value="${esc(b.phone)}"></div><div><label class="lbl" for="bp-email">Email</label><input class="field" id="bp-email" value="${esc(b.email)}"></div></div>
   <div><label class="lbl">Photos & portfolio</label><div class="pgrid">${PHOTOS.map(([k])=>`<span>${scene(b,k)}</span>`).join('')}${(b.photos||[]).map(p=>`<span><img src="${p}" alt="Uploaded photo"></span>`).join('')}<label class="padd" for="bp-photo">${ic('plus')}<small>Add photo</small></label><input type="file" id="bp-photo" accept="image/*" hidden></div></div>
   <button class="btn primary" type="submit" style="justify-self:start">Save profile</button></form>`}
function snip(b){return `<script src="https://widget.appointly.app/v1.js" data-business="${b.id}" async></`+`script>`}
function dChannels(b){const stats=[['Appointly app',34,'calendar'],['Website widget',27,'globe'],['Booking link',18,'share'],['Capi chat',14,'sparkle'],['Walk-in & phone',7,'users']];
  return dHead('Website Integration','Every channel uses the same availability and appointment database.',`<a class="btn sm primary" href="#site-${b.id}">${ic('globe')} See widget on a website</a>`)+`
  <div class="g2"><div class="stack" style="gap:18px">
   <div class="panel" style="padding:18px;display:grid;gap:12px"><div class="row" style="justify-content:space-between"><b>Booking page URL</b><span class="pill ok live">Live</span></div><div class="urlbox"><span>book.appointly.app/${b.id}</span><button class="btn sm" data-a="copy" data-v="https://book.appointly.app/${b.id}" aria-label="Copy link">${ic('copy')}</button></div><p class="muted" style="font-size:13.5px">Customers book without an Appointly account. Their slot is blocked everywhere instantly.</p><div class="row" style="flex-wrap:wrap"><a class="btn sm" href="#book-${b.id}">Open page</a><button class="btn sm" data-a="toast" data-v="Book button added to your Google Business Profile">${ic('pin')} Add to Google</button><button class="btn sm" data-a="toast" data-v="Link added to your WhatsApp Business auto-reply">${ic('whatsapp')} Add to WhatsApp</button></div></div>
   <div class="panel" style="padding:18px;display:grid;gap:12px;min-width:0"><b>Embeddable widget</b><p class="muted" style="font-size:13.5px">Paste once before &lt;/body&gt;. Adds a Book Appointment button and Capi.</p><pre class="code"><code>${esc(snip(b))}</code></pre><div class="row" style="flex-wrap:wrap"><button class="btn sm primary" data-a="copy" data-v="${esc(snip(b))}">${ic('copy')} Copy code</button><button class="btn sm" data-a="toast" data-v="Install guide emailed to your developer">Email to my developer</button></div></div>
   <div class="panel" style="padding:18px;display:grid;gap:10px;min-width:0"><b>Plugin & API</b><div class="row" style="flex-wrap:wrap"><button class="btn sm" data-a="toast" data-v="WordPress plugin downloaded (demo)">WordPress plugin</button><button class="btn sm" data-a="toast" data-v="Wix app link copied (demo)">Wix app</button><button class="btn sm" data-a="toast" data-v="Shopify app link copied (demo)">Shopify app</button></div><pre class="code"><code>GET  /v1/businesses/${b.id}/availability?date=YYYY-MM-DD
POST /v1/businesses/${b.id}/bookings</code></pre><div class="row" style="gap:8px"><span class="muted" style="font-size:13px">API key</span><span class="mono" style="font-size:12.5px">apx_demo_••••••••${b.bid.slice(-3)}</span></div></div>
  </div><div class="stack" style="gap:18px">
   <div class="panel" style="padding:18px;display:grid;gap:10px;justify-items:center;text-align:center"><b>QR code</b>${qr(b.id)}<p class="muted" style="font-size:13.5px">Print for reception. Customers scan to open your booking page.</p><button class="btn sm" data-a="toast" data-v="QR poster sent to your email as PDF">${ic('download')} Printable poster</button></div>
   <div class="panel"><div class="ph"><h3>Bookings by channel · 30 days</h3></div><div class="pb stack" style="gap:12px">${stats.map(([n,v,i])=>`<div><div class="row" style="justify-content:space-between;font-size:14px;margin-bottom:6px"><span class="row" style="gap:8px">${ic(i)}${n}</span><b class="tnum">${v}%</b></div><div class="load"><i style="width:${v}%"></i></div></div>`).join('')}</div></div>
  </div></div>`}
function dOffers(b){return dHead('Offers','Promotions show on your page, in Explore and on customers’ home screens',`<button class="btn sm primary" data-a="offerEdit" data-v="">${ic('plus')} Create offer</button>`)+`
  <div class="g3" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">${(b.offers||[]).map(o=>`<div class="panel" style="padding:18px;display:grid;gap:10px"><div class="row" style="justify-content:space-between"><span class="pill ${o.active?'ok':''}">${o.active?'Active':'Paused'}</span>${o.ends<=7?'<span class="pill amber">Limited time</span>':''}</div><b style="font-size:17px">${esc(o.title)}</b><p class="muted" style="font-size:14px">${esc(o.desc)}</p><div class="muted" style="font-size:13px">${o.pct?o.pct+'% off · ':''}${o.svc?esc((b.services.find(s=>s.id===o.svc)||{}).name||''):'All services'} · ends in ${o.ends} days</div><div class="row"><button class="btn sm" data-a="offerToggle" data-v="${o.id}">${o.active?'Pause':'Resume'}</button><button class="btn sm ghost" data-a="offerEdit" data-v="${o.id}">Edit</button><button class="btn sm ghost danger" data-a="offerDel" data-v="${o.id}">Delete</button></div></div>`).join('')||`<div class="panel empty">No offers yet. Create one to fill quiet hours.</div>`}</div>`}
function dAnalytics(b){const past=rangeAppts(b,-29,0);const ok=past.filter(a=>a.status==='confirmed');const rev=ok.reduce((s,a)=>s+a.price,0);
  const by=(f)=>{const m={};past.forEach(a=>{const k=f(a);m[k]=(m[k]||0)+1});return Object.entries(m).sort((x,y)=>y[1]-x[1])};
  const bars=(rows,tot)=>rows.map(([n,v])=>`<div><div class="row" style="justify-content:space-between;font-size:14px;margin-bottom:6px"><span>${esc(n)}</span><b class="tnum">${v}</b></div><div class="load"><i style="width:${tot?v/tot*100:0}%"></i></div></div>`).join('');
  const svcRev=Object.entries(ok.reduce((m,a)=>(m[a.svc]=(m[a.svc]||0)+a.price,m),{})).sort((x,y)=>y[1]-x[1]);
  return dHead('Analytics & Reports','Last 30 days',`<button class="btn sm" data-a="toast" data-v="Report exported as CSV (demo)">${ic('download')} Export</button>`)+`
  <div class="kpis"><div class="panel kpi"><small>Revenue</small><b>${inr(rev)}</b></div><div class="panel kpi"><small>Appointments</small><b>${past.length}</b></div><div class="panel kpi"><small>Avg. per visit</small><b>${inr(ok.length?Math.round(rev/ok.length):0)}</b></div><div class="panel kpi"><small>Rating</small><b>${b.rating||'—'}★</b><span class="d">${b.reviews} reviews</span></div></div>
  <div class="g3"><div class="panel"><div class="ph"><h3>By status</h3></div><div class="pb stack" style="gap:12px">${bars(by(a=>a.status==='cancelled'?'Cancelled':a.status==='pending'?'Pending':'Completed'),past.length)}</div></div>
   <div class="panel"><div class="ph"><h3>By channel</h3></div><div class="pb stack" style="gap:12px">${bars(by(a=>a.source),past.length)}</div></div>
   <div class="panel"><div class="ph"><h3>Revenue by service</h3></div><div class="pb stack" style="gap:12px">${svcRev.map(([n,v])=>`<div class="row" style="justify-content:space-between;font-size:14px"><span>${esc(n)}</span><b class="tnum">${inr(v)}</b></div>`).join('')}</div></div></div>
  <div class="panel table-wrap" style="margin-top:18px"><table><thead><tr><th>Staff performance</th><th class="num">Appointments</th><th class="num">Revenue</th><th class="num">Cancellations</th></tr></thead><tbody>${b.staff.map(s=>{const l=past.filter(a=>a.staff===s.id);return `<tr><td><span class="row" style="gap:10px">${avatar(s.name,28)}${esc(s.name)}</span></td><td class="num">${l.length}</td><td class="num">${inr(l.filter(a=>a.status==='confirmed').reduce((x,a)=>x+a.price,0))}</td><td class="num">${l.filter(a=>a.status==='cancelled').length}</td></tr>`}).join('')}</tbody></table></div>
  <div class="g2" style="margin-top:18px"><div class="panel" style="padding:18px"><b>Customer reviews</b>${(b.reviews?reviewsFor(b):[]).slice(0,3).map(r=>`<div class="review"><div class="row"><b style="flex:1">${r.n}</b>${starRow(r.r)}</div><p class="muted" style="font-size:14px">${esc(r.text)}</p></div>`).join('')||'<p class="muted">No reviews yet.</p>'}</div>
   <div class="panel" style="padding:18px;display:grid;gap:10px"><b>Subscription & billing</b><div class="sumrow"><span>Plan</span><b>${b.plan||'Growth'}</b></div><div class="sumrow"><span>Next invoice</span><b>${fmtD(addDays(TODAY,12))} · ${inr({Starter:999,Growth:2499,Scale:5999}[b.plan||'Growth'])}</b></div><div class="sumrow"><span>Payment method</span><b>UPI AutoPay</b></div><button class="btn sm" style="justify-self:start" data-a="dash" data-v="settings">Manage plan</button></div></div>`}
function dSettings(b){return dHead('Settings','Booking rules, Capi, notifications, team and billing','')+`
  <div class="g2"><div class="stack" style="gap:18px">
   <div class="panel" style="padding:4px 20px"><div class="set-row"><div><div class="t">Auto-confirm bookings</div><div class="d">Off means every booking arrives as a pending request.</div></div><button class="toggle ${b.autoConfirm?'on':''}" data-a="bset" data-v="autoConfirm" aria-label="Auto-confirm"></button></div>
    <div class="set-row"><div><div class="t">Cancellation window</div><div class="d">Customers can cancel online until this many hours before.</div></div><div class="row" style="gap:6px"><input class="field mono" id="cwin" type="number" min="0" max="72" value="${b.cancelHrs}" style="width:80px" aria-label="Hours"><span class="muted">h</span></div></div>
    <div class="set-row"><div><div class="t">Human handover in chat</div><div class="d">Capi passes the chat to your team when asked.</div></div><button class="toggle ${S.handover?'on':''}" data-a="toggleHandover" aria-label="Human handover"></button></div></div>
   <div class="panel" style="padding:18px;display:grid;gap:12px"><div class="row">${botAv(b,52)}<div><b>Your assistant</b><div class="muted" style="font-size:13px">Shown on your page, widget and WhatsApp</div></div></div><div><label class="lbl" for="botname">Assistant name</label><input class="field" id="botname" value="${esc(b.bot)}"></div>
    <b style="font-size:14px">FAQs Capi answers</b><div class="stack" style="gap:8px" id="faqs">${b.faqs.map(([q,a])=>`<div class="faqi"><b>${esc(q)}</b>${esc(a)}</div>`).join('')}</div><button class="btn sm" style="justify-self:start" data-a="addFaq">${ic('plus')} Add FAQ</button></div>
  </div><div class="stack" style="gap:18px">
   <div class="panel" style="padding:4px 20px"><div class="set-row"><b>Business notifications</b></div>${[['nNew','New appointment requests'],['nConf','Booking confirmations'],['nCancel','Cancellations'],['nResch','Rescheduling requests'],['nUp','Upcoming appointments'],['nCust','New customer registrations'],['nOffer','Offer and promotion updates']].map(([k,l])=>`<div class="set-row"><div class="t" style="font-weight:500">${l}</div><button class="toggle ${b[k]===false?'':'on'}" data-a="bset" data-v="${k}" aria-label="${l}"></button></div>`).join('')}</div>
   <div class="panel" style="padding:18px;display:grid;gap:10px"><b>Team access</b>${[['Owner',esc(b.owner||AUTH.business.name),'Everything, including billing'],['Manager','—','Appointments, staff, customers, offers'],['Staff',b.staff.length+' people','Own calendar and reminders only']].map(([r,w,d])=>`<div class="sumrow"><span><b style="color:var(--fg)">${r}</b> · ${d}</span><b>${w}</b></div>`).join('')}<button class="btn sm" style="justify-self:start" data-a="toast" data-v="Invite sent">${ic('plus')} Invite teammate</button></div>
   <div class="panel" style="padding:18px;display:grid;gap:10px"><b>Subscription & billing</b><div class="chips">${['Starter','Growth','Scale'].map(p=>`<button class="chip ${b.plan===p?'on':''}" data-a="plan" data-v="${p}">${p} · ${inr({Starter:999,Growth:2499,Scale:5999}[p])}/mo</button>`).join('')}</div><div class="table-wrap"><table><tbody>${[1,2,3].map(i=>{const d=new Date(TODAY);d.setMonth(d.getMonth()-i);return `<tr><td>${MON[d.getMonth()]} ${d.getFullYear()}</td><td class="num">${inr({Starter:999,Growth:2499,Scale:5999}[b.plan||'Growth'])}</td><td><span class="pill ok">Paid</span></td></tr>`}).join('')}</tbody></table></div></div>
  </div></div>`}

/* ================= BUSINESS'S OWN WEBSITE (widget demo) ================= */
function vSite(id){
  const b=BIZ[id];
  return `<div class="site">
   <div class="demo-bar">${ic('globe')}<span class="mono">www.${b.id==='smile'?'smilestudiodental':b.id}.in</span><span class="pill amber">Demo: the business’s own website with the Appointly widget</span><a class="btn sm" href="${AUTH.business?'#dashboard':'#home'}">${AUTH.business?'Back to dashboard':'Back to Appointly'}</a></div>
   <header class="site-head"><div class="wrap row"><b class="site-logo"><span style="width:34px;height:34px;border-radius:50%;background:var(--site-accent);color:#fff;display:grid;place-items:center">${ic(IND[b.look||b.ind].i)}</span>${esc(b.name)}</b><span class="spacer"></span><nav class="hide-sm row" style="gap:22px;font-size:14px"><a href="#site-${b.id}">Treatments</a><a href="#site-${b.id}">Our team</a><a href="#site-${b.id}">Visit us</a></nav><button class="btn sm sitebtn" data-a="widget" data-v="${b.id}">Book appointment</button></div></header>
   <section class="site-hero"><div class="bgimg">${scene(b,'room')}</div><div class="wrap"><p style="opacity:.85;font-weight:600">${esc(b.area)}, ${esc(b.city)} · since ${b.since}</p><h1>${b.cat==='health'?'Gentle, unhurried care for the whole family':'Look and feel your best'}</h1><p style="max-width:52ch;margin-top:12px;opacity:.9">${esc(b.about)}</p><div class="row" style="margin-top:22px;flex-wrap:wrap"><button class="btn lg sitebtn" data-a="widget" data-v="${b.id}">Book online</button><button class="btn lg" data-a="widgetChat" data-v="${b.id}" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.4)">${ic('chat')} Ask ${esc(b.bot)}</button></div></div></section>
   <section class="site-sec"><div class="wrap"><h2 class="site-h2">Treatments</h2><div class="site-cards">${b.services.slice(0,6).map(s=>`<div class="site-card"><b>${esc(s.name)}</b><p>${esc(s.desc)}</p><div class="row" style="justify-content:space-between;margin-top:auto"><span class="tnum" style="font-weight:700">${inr(s.price)} · ${s.dur} min</span><button class="btn sm sitebtn" data-a="widget" data-v="${b.id}:${s.id}">Book</button></div></div>`).join('')}</div></div></section>
   <section class="site-sec" style="background:var(--site-soft)"><div class="wrap"><h2 class="site-h2">Our team</h2><div class="site-cards">${b.staff.map(s=>`<div class="site-card" style="flex-direction:row;align-items:center">${avatar(s.name,52)}<div><b>${esc(s.name)}</b><p>${esc(s.role)} · ${esc(s.qual)}</p></div></div>`).join('')}</div></div></section>
   <section class="site-sec"><div class="wrap two"><div><h2 class="site-h2">Visit us</h2><p>${esc(b.address)}</p><p style="margin-top:8px" class="mono">${b.phone}</p><p style="margin-top:8px">Mon–Sat ${fmtT(b.open)} – ${fmtT(b.close)}</p></div><div class="map">${mapSvg(b)}</div></div></section>
   <footer class="site-foot"><div class="wrap row" style="justify-content:space-between;flex-wrap:wrap"><span>© ${new Date().getFullYear()} ${esc(b.name)}</span><span style="opacity:.7">Online booking by Appointly</span></div></footer>
  </div>`;
}
function qr(seed){const n=25,c=6;let r='';for(let y=0;y<n;y++)for(let x=0;x<n;x++){if((x<8&&y<8)||(x>=n-8&&y<8)||(x<8&&y>=n-8))continue;if(hash(seed+x+'-'+y)%2)r+=`<rect x="${x*c}" y="${y*c}" width="${c}" height="${c}"/>`}
  const f=(x,y)=>`<rect x="${x*c}" y="${y*c}" width="${7*c}" height="${7*c}" fill="#341119"/><rect x="${(x+1)*c}" y="${(y+1)*c}" width="${5*c}" height="${5*c}" fill="#fff"/><rect x="${(x+2)*c}" y="${(y+2)*c}" width="${3*c}" height="${3*c}" fill="#341119"/>`;
  return `<svg viewBox="-12 -12 ${n*c+24} ${n*c+24}" width="170" height="170" role="img" aria-label="QR code for your booking link"><rect x="-12" y="-12" width="${n*c+24}" height="${n*c+24}" rx="12" fill="#fff"/><g fill="#341119">${r}</g>${f(0,0)}${f(n-7,0)}${f(0,n-7)}</svg>`}
/* ================= PLATFORM ADMIN ================= */
const ADMNAV=[['overview','chart','Admin Dashboard'],['businesses','building','Business Management'],['clients','users','Client Management'],['categories','layers','Categories'],['verify','shield','Business Verification'],['bookings','calendar','Booking Monitoring'],['reports','chart','Reports & Analytics'],['subs','card','Subscriptions'],['settings','sliders','System Settings']];
function vAdmin(){const body=({overview:aOverview,businesses:aBiz,clients:aClients,categories:aCats,verify:aVerify,bookings:aBookings,reports:aReports,subs:aSubs,settings:aSettings}[S.adm||'overview'])();
  return `<div class="ws"><aside class="side"><div class="biz-sw"><span class="logo-mark" style="width:38px;height:38px">${ic('shield')}</span><div><b style="font-size:14px">Appointly Admin</b><div class="muted" style="font-size:12px">Demo environment</div></div></div>
   ${ADMNAV.map(([k,i,l])=>`<button class="${(S.adm||'overview')===k?'on':''}" data-a="adm" data-v="${k}">${ic(i)}${l}${k==='verify'&&Object.values(BIZ).some(b=>b.status==='pending')?`<span class="badge">${Object.values(BIZ).filter(b=>b.status==='pending').length}</span>`:''}</button>`).join('')}</aside><div class="main">${body}</div></div>`}
function todaysAll(){let n=0;Object.values(BIZ).forEach(b=>{n+=apptsOn(b,TODAY).filter(blocking).length});return n}
function aOverview(){const bs=Object.values(BIZ);
  return dHead('Platform overview','All businesses and categories','<span class="pill ok live">All systems normal</span>')+`
  <div class="kpis six"><div class="panel kpi"><small>Businesses</small><b>${bs.length}</b><span class="d">${bs.filter(live).length} active</span></div><div class="panel kpi k-pend"><small>Awaiting verification</small><b>${bs.filter(b=>b.status==='pending').length}</b></div><div class="panel kpi"><small>Categories</small><b>${DB.cats.length}</b><span class="d">${DB.cats.reduce((s,c)=>s+c.subs.length,0)} subcategories</span></div><div class="panel kpi"><small>Clients</small><b>${(48200+bs.length*37).toLocaleString('en-IN')}</b></div><div class="panel kpi k-today"><small>Bookings today</small><b>${todaysAll()}</b><span class="d">across all businesses</span></div><div class="panel kpi"><small>MRR</small><b>${inr(bs.reduce((s,b)=>s+({Starter:999,Growth:2499,Scale:5999}[b.plan]||0),0))}</b><span class="d">demo tenants</span></div></div>
  <div class="g2"><div class="panel"><div class="ph"><h3>Businesses by category</h3></div><div class="pb stack" style="gap:12px">${DB.cats.map(c=>{const n=bs.filter(b=>b.cat===c.id).length;return `<div><div class="row" style="justify-content:space-between;font-size:14px;margin-bottom:6px"><span class="row" style="gap:8px">${ic(c.icon)}${esc(c.label)}</span><b>${n}</b></div><div class="load"><i style="width:${n/bs.length*100}%"></i></div></div>`}).join('')}</div></div>
   <div class="panel"><div class="ph"><h3>Recent activity</h3></div><div class="pb">${notifList('admin')}</div></div></div>`}
function aBiz(){return dHead('Business management',`${Object.keys(BIZ).length} businesses`,'')+`<div class="panel table-wrap"><table><thead><tr><th>Business</th><th>ID</th><th>Category › Subcategory</th><th>Plan</th><th>Status</th><th>Verified</th><th></th></tr></thead><tbody>
  ${Object.values(BIZ).map(b=>`<tr><td><span class="row" style="gap:10px">${logo(b,30)}<b>${esc(b.name)}</b></span></td><td class="mono" style="font-size:12px">${b.bid}</td><td>${esc(catLabel(b.cat))} › ${esc(subLabel(b))}</td><td>${b.plan||'—'}</td><td><span class="pill ${b.status==='active'?'ok':b.status==='pending'?'amber':'bad'}">${b.status}</span></td><td>${b.verified?ic('check'):'—'}</td><td><div class="row" style="gap:6px"><button class="btn ghost sm" data-a="admBizToggle" data-v="${b.id}">${b.status==='active'?'Deactivate':'Activate'}</button><a class="btn ghost sm" href="#book-${b.id}">View</a></div></td></tr>`).join('')}</tbody></table></div>`}
function aClients(){const rows=CNAMES.slice(0,14).map((n,i)=>({n,ph:fakePhone(n),b:2+hash(n)%14,j:`${1+hash(n)%20} months ago`}));if(AUTH.client)rows.unshift({n:AUTH.client.name,ph:'+91 '+AUTH.client.phone,b:BOOKINGS.filter(k=>k.mine).length,j:'This device'});
  return dHead('Client management',`${(48200+Object.keys(BIZ).length*37).toLocaleString('en-IN')} clients · demo data`,'')+`<div class="panel table-wrap"><table><thead><tr><th>Name</th><th>Phone</th><th class="num">Bookings</th><th>Joined</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(r=>`<tr><td><span class="row" style="gap:10px">${avatar(r.n,28)}${esc(r.n)}</span></td><td class="mono" style="font-size:12.5px">${esc(r.ph)}</td><td class="num">${r.b}</td><td>${r.j}</td><td><span class="pill ok">Active</span></td><td><button class="btn ghost sm" data-a="toast" data-v="Support view opened (read-only)">View</button></td></tr>`).join('')}</tbody></table></div>`}
function aCats(){return dHead('Category & subcategory management','Changes appear in Explore and registration immediately',`<button class="btn sm primary" data-a="catAdd">${ic('plus')} Add category</button>`)+`
  ${DB.catReq.filter(r=>r.status==='pending').length?`<div class="panel" style="padding:16px 18px;margin-bottom:16px"><b>Requested by businesses</b>${DB.catReq.filter(r=>r.status==='pending').map((r,i)=>`<div class="req"><div><b>${esc(catLabel(r.cat))} › ${esc((subOf(r.cat,r.sub)||{}).label||r.sub)}</b><div class="muted" style="font-size:13px">by ${esc(r.by)} · ${ago(r.at)}</div></div><div class="row" style="gap:6px"><button class="btn sm primary" data-a="catReq" data-v="${i}|approved">Approve</button><button class="btn sm danger" data-a="catReq" data-v="${i}|rejected">Reject</button></div></div>`).join('')}</div>`:''}
  <div class="stack" style="gap:12px">${DB.cats.map(c=>`<div class="panel" style="padding:16px 18px"><div class="row" style="justify-content:space-between;flex-wrap:wrap"><div class="row">${ic(c.icon)}<b style="font-size:16px">${esc(c.label)}</b>${c.isNew?'<span class="pill amber">New</span>':''}<span class="muted" style="font-size:13px">${Object.values(BIZ).filter(b=>b.cat===c.id).length} businesses</span></div><div class="row" style="gap:6px"><button class="btn sm" data-a="subAdd" data-v="${c.id}">${ic('plus')} Subcategory</button><button class="btn ghost sm" data-a="catRename" data-v="${c.id}">Rename</button></div></div>
   <div class="chips" style="flex-wrap:wrap;margin-top:10px">${c.subs.map(s=>{const n=Object.values(BIZ).filter(b=>b.cat===c.id&&b.sub===s.id).length;return `<span class="chip sm">${esc(s.label)} <b>${n}</b>${s.isNew?' · new':''}${n?'':` <button class="link" data-a="subDel" data-v="${c.id}:${s.id}" aria-label="Delete ${esc(s.label)}">✕</button>`}</span>`}).join('')}</div></div>`).join('')}</div>`}
function aVerify(){const p=Object.values(BIZ).filter(b=>b.status==='pending'||!b.verified);
  return dHead('Business verification',`${p.length} to review`,'')+(p.length?`<div class="stack" style="gap:12px">${p.map(b=>`<div class="panel" style="padding:16px 18px;display:flex;gap:14px;align-items:center;flex-wrap:wrap">${logo(b,48)}<div style="flex:1;min-width:200px"><b>${esc(b.name)}</b><div class="muted" style="font-size:13px">${esc(catLabel(b.cat))} › ${esc(subLabel(b))} · ${esc(b.address)} · ${esc(b.email)}</div><div class="muted" style="font-size:13px">${b.services.length} services · ${b.staff.length} staff · status: ${b.status}</div></div><a class="btn sm" href="#book-${b.id}">Preview</a><button class="btn sm primary" data-a="admVerify" data-v="${b.id}|ok">Approve & publish</button><button class="btn sm danger" data-a="admVerify" data-v="${b.id}|no">Reject</button></div>`).join('')}</div>`:'<div class="panel empty">Nothing waiting. New registrations that choose “Submit for verification” show up here.</div>')}
function aBookings(){const rows=[];Object.values(BIZ).forEach(b=>apptsOn(b,TODAY).slice(0,3).forEach(a=>rows.push([b,a])));BOOKINGS.slice(-10).forEach(k=>{const b=BIZ[k.biz];if(b)rows.unshift([b,dbAsAppt(k)])});
  return dHead('Booking monitoring','Today and recent bookings across all businesses','<span class="pill ok live">No double bookings detected</span>')+`<div class="panel table-wrap"><table><thead><tr><th>Booking ID</th><th>Business</th><th>Customer</th><th>Service</th><th>When</th><th>Source</th><th>Status</th></tr></thead><tbody>${rows.slice(0,50).map(([b,a])=>`<tr><td class="mono" style="font-size:12px">${a.bid}</td><td>${esc(b.name)}</td><td>${esc(a.customer)}</td><td>${esc(a.svc)}</td><td>${relD(new Date(a.date))}, ${fmtT(a.start)}</td><td>${esc(a.source)}</td><td><span class="pill st-${aCls(a)}">${ALBL[aCls(a)]}</span></td></tr>`).join('')}</tbody></table></div>`}
function aReports(){return dHead('Reports & analytics','Platform-wide, last 30 days','')+`<div class="g2">${DB.cats.map(c=>{const bs=Object.values(BIZ).filter(b=>b.cat===c.id);let n=0;bs.forEach(b=>{for(let d=-6;d<=0;d++)n+=apptsOn(b,addDays(TODAY,d)).length});return `<div class="panel" style="padding:16px 18px"><div class="row" style="justify-content:space-between"><span class="row" style="gap:8px">${ic(c.icon)}<b>${esc(c.label)}</b></span><b class="tnum">${n}</b></div><div class="muted" style="font-size:13px">bookings in the last 7 days · ${bs.length} businesses</div></div>`}).join('')}</div>`}
function aSubs(){const bs=Object.values(BIZ);return dHead('Subscription management','Plans across all businesses','')+`<div class="kpis">${['Starter','Growth','Scale'].map(p=>`<div class="panel kpi"><small>${p}</small><b>${bs.filter(b=>b.plan===p).length}</b><span class="d">${inr({Starter:999,Growth:2499,Scale:5999}[p])}/month</span></div>`).join('')}<div class="panel kpi"><small>Trials</small><b>${bs.filter(b=>!b.demo).length}</b><span class="d">new registrations</span></div></div>
  <div class="panel table-wrap"><table><thead><tr><th>Business</th><th>Plan</th><th>Renews</th><th>Status</th></tr></thead><tbody>${bs.map((b,i)=>`<tr><td>${esc(b.name)}</td><td>${b.plan||'Growth'}</td><td>${fmtD(addDays(TODAY,(i*7)%28+1))}</td><td><span class="pill ${b.demo?'ok':'brand'}">${b.demo?'Paid':'Trial'}</span></td></tr>`).join('')}</tbody></table></div>`}
function aSettings(){return dHead('System settings','','')+`<div class="panel" style="padding:4px 20px">${[['Separate demo environment','Demo accounts and data never mix with production',1],['OTP verification for customers','WhatsApp and SMS codes',1],['Email verification for businesses','Required at sign-up',1],['Password hashing','bcrypt, cost 12 (production)',1],['Row-level data isolation','Each business sees only its own data',1],['Allow businesses to propose categories','Shown in Explore immediately, reviewed here',1],['Double-booking protection','Slot locks on every channel',1]].map(([t,d,on])=>`<div class="set-row"><div><div class="t">${t}</div><div class="d">${d}</div></div><button class="toggle ${on?'on':''}" data-a="toggle" aria-label="${t}"></button></div>`).join('')}</div>`}

/* ================= router + render ================= */
let liveTimer=null;
const VIEWS=['home','dashboard','admin','business-login','admin-login','client-login','register','c-home','c-calendar','c-notifs','c-profile','explore'];
function route(){
  const h=decodeURIComponent(location.hash.slice(1))||'home';
  clearInterval(liveTimer);closeDrawer();closeModal();
  let v=h,arg=null;
  const pre=(p,view)=>{if(h.startsWith(p)&&BIZ[h.slice(p.length)]){v=view;arg=h.slice(p.length);return true}return false};
  if(pre('book-','biz')||pre('chat-','chat')||pre('site-','site')){}
  else if(h==='marketplace'||h==='discover')v='explore';
  else if(h==='manage'||h==='bookings')v='c-calendar';
  if(h.startsWith('explore')){v='explore';const pr=h.split('-');const keep=S.F&&S.F.keep;S.F=keep?S.F:{};S.F.cat=catOf(pr[1])?pr[1]:'';S.F.sub=pr[2]&&subOf(pr[1],pr[2])?pr[2]:'';S.F.keep=false}
  if(!['biz','chat','site'].includes(v)&&!VIEWS.includes(v))v='home';
  if(v==='dashboard'&&!CUR())v='business-login';
  if(v==='admin'&&!AUTH.admin)v='admin-login';
  if(v==='business-login'&&CUR())v='dashboard';
  if(v==='admin-login'&&AUTH.admin)v='admin';
  if(v==='client-login'&&AUTH.client)v='c-home';
  if(CLIENTV.includes(v)||v==='client-login')S.clientMode=true;
  if(v==='site')S.channel='Website widget';else if(v==='biz'||v==='chat')S.channel=(S.clientMode||AUTH.client)?'Appointly':'Booking link';
  if(v==='register'&&!S.reg)regInit();
  S.view=v;S.arg=arg;if(v==='chat')S.chatBiz=arg;render();window.scrollTo(0,0);
}
function render(){
  renderTop();AIDX.clear();
  $('#app').innerHTML=({home:vHome,explore:vExplore,biz:()=>vBiz(S.arg),chat:()=>vChat(S.arg),site:()=>vSite(S.arg),'c-home':vCHome,'c-calendar':vCalendar,'c-notifs':vNotifs,'c-profile':vProfile,dashboard:vDash,admin:vAdmin,'business-login':()=>vLogin('business'),'admin-login':()=>vLogin('admin'),'client-login':()=>vLogin('client'),register:vRegister})[S.view]();
  if(S.view==='home')runDemo();
  if(S.view==='chat')renderChatLog();
  if(S.view==='dashboard')startLive();
  renderLauncher();
  if(S.openWidget){const id=S.openWidget;S.openWidget=null;setTimeout(()=>openDrawer(id,'book',true),300)}
}
function redash(){const sc=window.scrollY;$('#app').innerHTML=vDash();window.scrollTo(0,sc);renderTop()}
function startLive(){
  clearInterval(liveTimer);
  liveTimer=setInterval(()=>{
    const b=CUR();if(S.view!=='dashboard'||!b)return clearInterval(liveTimer);
    const sv=b.services[Math.floor(Math.random()*b.services.length)];const nm=CNAMES[Math.floor(Math.random()*CNAMES.length)];const via=['Website widget','Appointly','Capi chat','Booking link'][Math.floor(Math.random()*4)];
    let slot=null;for(let d=0;d<3&&!slot;d++){const date=addDays(TODAY,d);const h=hoursOn(b,date);if(!h)continue;for(let m=Math.max(h[0],d===0?Math.ceil((nowMin()+60)/30)*30:h[0]);m+sv.dur<=h[1];m+=30){const st=freeStaff(b,'any',date,m,sv.dur);if(st){slot={d,m,st};break}}}
    if(!slot)return;const dt=addDays(TODAY,slot.d);dt.setHours(0,slot.m,0,0);
    const status=b.autoConfirm&&Math.random()<.6?'confirmed':'pending';
    BOOKINGS.push({id:bookingId(),biz:b.id,svc:sv.id,staff:slot.st,branch:b.branches[0],start:dt.getTime(),status,via,pay:'Pay at venue',client:{name:nm,phone:fakePhone(nm).replace('+91 ','')},mine:false,created:Date.now(),consent:true});
    notify(b.id,status==='pending'?'request':'new',status==='pending'?'New appointment request':'New booking',`${nm} · ${sv.name} · ${relD(dt)} ${fmtT(slot.m)} · via ${via}`);
    toast(`<b>${status==='pending'?'New request':'New booking'} via ${esc(via)}</b><br>${esc(nm)} · ${esc(sv.name)} · ${relD(dt)} ${fmtT(slot.m)}`,status==='pending'?'clock':'calendar');
    if(['overview','appts','calendar','reminders'].includes(S.dash)&&!$('.scrim'))redash();else renderTop();
  },25000);
}

/* ================= actions ================= */
function scrollToId(v){const el=document.getElementById(v);if(el)el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}
const firstName=n=>(n||'').split(' ')[0];
function successModal(made,b){const k=made[0];const s=svcOf(k);const d=new Date(k.start);
  modal(`<div style="width:120px;height:136px;margin:0 auto">${appySVG('full')}</div><h3 style="text-align:center">${k.status==='pending'?'Request sent!':'You’re booked!'}</h3>
   <div class="idbox"><span class="muted">Booking ID</span><b class="mono">${k.id}</b><button class="btn ghost sm" data-a="copy" data-v="${k.id}" aria-label="Copy booking ID">${ic('copy')}</button></div>
   <p class="muted" style="text-align:center">${esc(s.name)} with ${esc(staffOf(k).name)}<br><b style="color:var(--fg)">${relD(d)}, ${fmtT(d.getHours()*60+d.getMinutes())}</b> · ${esc(b.name)}${made.length>1?`<br>+ ${made.length-1} repeat appointment${made.length>2?'s':''}`:''}</p>
   <div class="policy">${ic('whatsapp')}<span>${k.status==='pending'?`${esc(b.name)} will confirm shortly. `:''}Confirmation and reminders on WhatsApp. ${esc(b.name)} has been notified.</span></div>
   <div class="row"><a class="btn primary" style="flex:1" href="#c-calendar">View my bookings</a><button class="btn" style="flex:1" data-a="closeModal">Done</button></div>`);
  setTimeout(appyCelebrate,120)}
function doManualConfirm(){
  const mb=S.mb,b=BIZ[mb.biz],s=b.services.find(x=>x.id===mb.svc),date=addDays(TODAY,mb.day);const st=freeStaff(b,mb.staff,date,mb.m,s.dur);if(!st)return toast('That time was just taken. Pick another slot.');
  const rp={none:null,week4:{every:'week',count:4},week8:{every:'week',count:8},month3:{every:'month',count:3}}[mb.rep||'none'];
  const made=createBooking({b,svcId:s.id,staff:st,date,m:mb.m,via:S.channel||'Appointly',pay:{venue:'Pay at venue',upi:'UPI deposit ₹200',full:'Paid in full'}[mb.pay],branch:mb.branch,recurring:rp});
  S.mb={...S.mb,m:null};rerenderBook();renderTop();successModal(made,b);
}
function finishChatConfirm(){
  const id=S.chatBiz,b=BIZ[id],cs=chatState(id);const o=cs.pending;if(!o)return;cs.pending=null;const date=addDays(TODAY,o.d);const s=b.services.find(x=>x.id===cs.ctx.svc);
  if(!freeStaff(b,o.staff,date,o.m,s.dur,cs.target)){botSay(id,'Oh no, that slot was just taken! Let me find others.');return}
  if(cs.mode==='resched'&&cs.target){const k=BOOKINGS.find(x=>x.id===cs.target);const d=new Date(date);d.setHours(0,o.m,0,0);k.start=d.getTime();k.staff=o.staff;k.rescheduled=true;saveDB();cs.mode='book';cs.target=null;
    notify('client','rescheduled','Appointment rescheduled',`${s.name} at ${b.name} · ${fmtD(date)}, ${fmtT(o.m)}`);notify(b.id,'rescheduled','Booking rescheduled',`${k.client.name} · ${s.name} · ${fmtD(date)}, ${fmtT(o.m)}`);
    botSay(id,`Done! Your ${esc(s.name)} is now <b>${relD(date)}, ${fmtT(o.m)}</b>.`)}
  else{const made=createBooking({b,svcId:s.id,staff:o.staff,date,m:o.m,via:'Capi chat',pay:'Pay at venue'});setTimeout(appyCelebrate,800);botSay(id,`🎉 ${t('booked')}<div class="ccard"><div class="row" style="justify-content:space-between"><span class="muted">Booking ID</span><b class="mono">${made[0].id}</b></div></div><div class="opts"><button data-a="nav" data-v="c-calendar">View my bookings</button></div>`)}
  cs.ctx={};renderTop();
}
function lightbox(i){const b=BIZ[S.arg];const k=PHOTOS[i];
  modal(`<div class="lightbox" role="dialog" aria-modal="true" aria-label="Photos"><div class="row" style="justify-content:space-between;padding:12px 16px"><b>${esc(b.name)} · ${esc(photoCap(b,k[0],k[1]))}</b><button class="btn ghost sm" data-a="closeModal" aria-label="Close">${ic('x')}</button></div><div class="stagebox">${scene(b,k[0])}</div><div class="thumbs">${PHOTOS.map(([kk,c],j)=>`<button class="${i===j?'on':''}" data-a="photo" data-v="${j}" aria-label="${esc(photoCap(b,kk,c))}">${scene(b,kk)}</button>`).join('')}</div></div>`,true)}
function findAppt(id){return AIDX.get(id)||(BOOKINGS.find(k=>k.id===id)?dbAsAppt(BOOKINGS.find(k=>k.id===id)):null)}
function setAppt(a,status){const b=BIZ[a.biz];
  if(a.src==='db'){const k=BOOKINGS.find(x=>x.id===a.id);if(status==='noshow'){k.status='cancelled';k.noshow=true}else k.status=status;if(k.mine)notify('client',status==='confirmed'?'confirm':'cancelled',status==='confirmed'?`Booking confirmed · ${k.id}`:`Booking ${status==='noshow'?'marked as no-show':'cancelled'}`,`${svcOf(k).name} at ${b.name} · ${fmtD(new Date(k.start))}`)}
  else{DB.appt[a.id]=Object.assign(DB.appt[a.id]||{},{status:status==='noshow'?'cancelled':status})}
  saveDB();toast(status==='confirmed'?`Accepted. ${esc(firstName(a.customer))} has been notified.`:status==='noshow'?'Marked as no-show.':`Cancelled. ${esc(firstName(a.customer))} has been notified and the slot is free again.`,status==='confirmed'?'check':'x')}
function timeOpts(b,staff,date,dur,ignore,sel){const h=hoursOn(b,date);if(!h)return '<option value="">Closed this day</option>';const o=[];for(let m=h[0];m+dur<=h[1];m+=(b.slotInt||30)){if(isFree(b,staff,date,m,dur,ignore))o.push(`<option value="${m}" ${sel===m?'selected':''}>${fmtT(m)}</option>`)}return o.join('')||'<option value="">No free times</option>'}
function reschedModal(kind,id){
  const a=kind==='biz'?findAppt(id):dbAsAppt(BOOKINGS.find(k=>k.id===id));const b=BIZ[a.biz];S.rs={kind,id,a};const d0=Math.max(0,Math.round((a.date-TODAY)/864e5));
  modal(`<h3>Reschedule</h3><p class="muted">${esc(a.customer)} · ${esc(a.svc)} · now ${relD(new Date(a.date))}, ${fmtT(a.start)}</p>
   <form id="reschform" class="stack" style="gap:12px"><div><label class="lbl" for="rs-day">New date</label><select class="field" id="rs-day" data-change="rsDay">${Array.from({length:21},(_,i)=>`<option value="${i}" ${i===d0?'selected':''}>${relD(addDays(TODAY,i))}</option>`).join('')}</select></div>
   <div><label class="lbl" for="rs-time">New time</label><select class="field" id="rs-time">${timeOpts(b,a.staff,addDays(TODAY,d0),a.dur,a.id)}</select></div>
   <div class="row"><button class="btn primary" style="flex:1" type="submit">Reschedule</button><button class="btn" type="button" data-a="closeModal">Cancel</button></div></form>`)}
function apptModal(id){const a=findAppt(id);if(!a)return;const b=BIZ[a.biz];const st=b.staff.find(s=>s.id===a.staff)||{};const r=remOf(a.id);
  modal(`<div class="row" style="justify-content:space-between">${stPill(a)}<button class="btn ghost sm" data-a="closeModal" aria-label="Close">${ic('x')}</button></div>
   <div class="row">${avatar(a.customer,48)}<div><h3 style="font-size:20px">${esc(a.customer)}</h3><span class="muted mono">${esc(a.phone)}</span></div></div>
   <div class="sumrow"><span>Booking ID</span><b class="mono">${a.bid}</b></div><div class="sumrow"><span>Service</span><b>${esc(a.svc)} · ${inr(a.price)}</b></div><div class="sumrow"><span>Staff</span><b>${esc(st.name||'')}</b></div><div class="sumrow"><span>Date & time</span><b>${fmtD(new Date(a.date))}, ${fmtT(a.start)} – ${fmtT(a.start+a.dur)}</b></div><div class="sumrow"><span>Booked via</span><b>${esc(a.source)}</b></div><div class="sumrow"><span>Reminder</span><b>${r.contacted?'Contacted':'Not contacted'}</b></div>
   <div class="row" style="flex-wrap:wrap">${apptActions(a)}${aCls(a)==='done'&&a.status==='confirmed'?`<button class="btn sm" data-a="aSet" data-v="${a.id}|noshow">Mark no-show</button>`:''}<button class="btn sm" data-a="remCall" data-v="${a.id}">${ic('phone')} Call</button><button class="btn sm" data-a="remSend" data-v="${a.id}">${ic('whatsapp')} Send reminder</button></div>`)}
function apptForm(pre={}){const b=CUR();S.na=pre;const d=pre.day||0;const sv=b.services.find(s=>s.id===pre.svc)||b.services[0];const stf=pre.staff||b.staff[0].id;
  modal(`<h3>New appointment</h3><form id="newapptform" class="stack" style="gap:12px">
   <div class="g2f"><div><label class="lbl" for="na-name">Customer name</label><input class="field" id="na-name" required placeholder="Walk-in customer"></div><div><label class="lbl" for="na-phone">Phone</label><input class="field" id="na-phone" inputmode="tel" placeholder="98765 43210"></div></div>
   <div class="g2f"><div><label class="lbl" for="na-svc">Service</label><select class="field" id="na-svc" data-change="naRe">${b.services.map(s=>`<option value="${s.id}" ${s.id===sv.id?'selected':''}>${esc(s.name)} · ${s.dur} min</option>`).join('')}</select></div><div><label class="lbl" for="na-staff">Staff</label><select class="field" id="na-staff" data-change="naRe">${b.staff.map(s=>`<option value="${s.id}" ${s.id===stf?'selected':''}>${esc(s.name)}</option>`).join('')}</select></div></div>
   <div class="g2f"><div><label class="lbl" for="na-day">Date</label><select class="field" id="na-day" data-change="naRe">${Array.from({length:14},(_,i)=>`<option value="${i}" ${i===d?'selected':''}>${relD(addDays(TODAY,i))}</option>`).join('')}</select></div><div><label class="lbl" for="na-time">Time</label><select class="field" id="na-time">${timeOpts(b,stf,addDays(TODAY,d),sv.dur,null,pre.m)}</select></div></div>
   <div class="row"><button class="btn primary" style="flex:1" type="submit">Add appointment</button><button class="btn" type="button" data-a="closeModal">Cancel</button></div></form>`)}
function formModal(title,id,fields,submit){modal(`<h3>${title}</h3><form id="${id}" class="stack" style="gap:12px">${fields}<div class="row"><button class="btn primary" style="flex:1" type="submit">${submit}</button><button class="btn" type="button" data-a="closeModal">Cancel</button></div></form>`)}
const fi=(id,l,v='',t='text',extra='')=>`<div><label class="lbl" for="${id}">${l}</label><input class="field" id="${id}" type="${t}" value="${esc(v)}" ${extra}></div>`;
function readFile(input,cb){const f=input.files&&input.files[0];if(!f)return;if(f.size>1.5e6){toast('Please choose an image under 1.5 MB.','x');return}const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(f)}
const ACT={
 scrollTo(v){if(document.getElementById(v))setTimeout(()=>scrollToId(v),30);else{location.hash='home';setTimeout(()=>scrollToId(v),200)}},
 clientEntry(){S.clientMode=true},guestMode(){S.clientMode=true},
 appyOpen(){S.bubbleSeen=S.bubbleSeen||{};S.bubbleSeen[S.view]=true;if(S.view==='biz'||S.view==='site')openDrawer(S.arg,'chat',S.view==='site');else openDrawer('appointly','chat',false)},
 capiOpen(){ACT.appyOpen()},
 hideBubble(v,el,e){e.stopPropagation();S.bubbleSeen=S.bubbleSeen||{};S.bubbleSeen[S.view]=true;const b=$('#appybubble');if(b)b.remove()},
 dashGo(v){closeDrawer();S.dash=v;if(S.view==='dashboard')redash();else location.hash='dashboard'},
 helpScroll(v){closeDrawer();ACT.scrollTo(v)},
 appyDo(v){appyMood('.meet-appy .appy',v,v==='think'?2600:v==='talk'?1800:2600);if(v==='celebrate')confetti()},
 appyPoke(){S.pokes=(S.pokes||0)+1;clearTimeout(S.pokeT);S.pokeT=setTimeout(()=>S.pokes=0,1500);if(S.pokes>=5){S.pokes=0;appyMood('.meet-appy .appy','celebrate',2600);confetti();toast('Wheee! You found Capi’s happy dance.','sparkle')}else appyMood('.meet-appy .appy',S.pokes%2?'happy':'wave',1400)},
 regTab(){regInit()},
 widget(v){const[id,svc]=v.split(':');openDrawer(id,'book',true,svc)},
 widgetChat(v){openDrawer(v,'chat',true)},
 siteWidget(v){S.openWidget=v;location.hash='site-'+v},
 wtab(v){S.drawerTab=v;renderDrawer()},
 goCat(v){closeDrawer();S.clientMode=true;location.hash='explore-'+v},
 clearSearch(){S.F={cat:S.F.cat,sub:''};location.hash='explore'+(S.F.cat?'-'+S.F.cat:'');render()},
 fav(v){const i=DB.favs.indexOf(v);if(i>=0)DB.favs.splice(i,1);else DB.favs.push(v);saveDB();toast(i>=0?'Removed from favourites':'Saved to favourites','heart');const sc=window.scrollY;render();window.scrollTo(0,sc)},
 quickSlot(v){const[id,d,m,svc,st]=v.split(':');const b=BIZ[id];S.mb={biz:id,svc:svc||b.services[0].id,branch:b.branches[0],staff:st||'any',day:+d,m:+m,pay:'venue',rep:'none'};
   if(location.hash==='#book-'+id){rerenderBook();scrollToId('book')}else{location.hash='book-'+id;setTimeout(()=>scrollToId('book'),150)}},
 bookAgain(v){const k=BOOKINGS.find(x=>x.id===v);if(!k)return;closeModal();S.mb={biz:k.biz,svc:k.svc,branch:k.branch||BIZ[k.biz].branches[0],staff:k.staff,day:0,m:null,pay:'venue',rep:'none'};location.hash='book-'+k.biz;setTimeout(()=>scrollToId('book'),150)},
 pickSvc(v){S.mb.svc=v;S.mb.m=null;rerenderBook();scrollToId('book')},
 mb(v,el){const k=el.dataset.k;const mb=S.mb;const b=BIZ[mb.biz];if(k==='day'){mb.day=+v;mb.m=null}else if(k==='m')mb.m=+v;else{mb[k]=v;const s=b.services.find(x=>x.id===mb.svc);if(s&&mb.m!=null&&!freeStaff(b,mb.staff,addDays(TODAY,mb.day),mb.m,s.dur))mb.m=null}rerenderBook()},
 confirmManual(){needClient(doManualConfirm)},
 photos(v){lightbox(+v)},photo(v){lightbox(+v)},
 waitlist(){needClient(()=>{notify('client','waitlist','You’re on the waitlist','We’ll message you if a slot opens.');toast('You’re on the waitlist. We’ll message you on WhatsApp if a slot opens.','refresh')})},
 openChat(v){openDrawer(v,'chat',false)},
 closeDrawer(v,el,e){if(el&&el.dataset.self&&e.target!==el)return;closeDrawer()},
 say(v){if(!S.chatBiz)return;handleChat(v)},
 pickSlot(v){const id=S.chatBiz,b=BIZ[id],cs=chatState(id);const o=cs.offers[+v];if(!o)return;cs.pending=o;const s=b.services.find(x=>x.id===cs.ctx.svc);const date=addDays(TODAY,o.d);
   cs.msgs.push({who:'me',html:`${relD(date)} ${fmtT(o.m)}`});renderChatLog();
   botSay(id,`${t('confirm')}<div class="ccard">${[['Service',esc(s.name)],['With',esc(b.staff.find(x=>x.id===o.staff).name)],['When',`${relD(date)}, ${fmtT(o.m)}`],['Where',esc(b.branches[0])],['Price',inr(s.price)]].map(([a,c])=>`<div class="row" style="justify-content:space-between"><span class="muted">${a}</span><b>${c}</b></div>`).join('')}</div><div class="opts"><button data-a="chatConfirm">Confirm</button><button data-a="say" data-v="Show me other times">Other times</button></div>`)},
 chatConfirm(){const cs=chatState(S.chatBiz);if(!cs.pending)return;cs.msgs.push({who:'me',html:'Confirm'});renderChatLog();
   if(!AUTH.client){botSay(S.chatBiz,`Almost done! Add your name and number. No account needed.<div class="opts"><button data-a="chatLogin">Add my details</button></div>`);return}finishChatConfirm()},
 chatLogin(){needClient(()=>{renderChatLog();if(chatState(S.chatBiz).pending)finishChatConfirm();else botSay(S.chatBiz,`Thanks${AUTH.client?', '+esc(firstName(AUTH.client.name)):''}! You’re verified. What shall we do?`)})},
 chatCancel(v){const cs=chatState(S.chatBiz);const k=BOOKINGS.find(x=>x.id===v);if(!k)return;k.status='cancelled';saveDB();notify('client','cancelled','Booking cancelled',`${svcOf(k).name} at ${BIZ[k.biz].name}`);notify(k.biz,'cancelled','Booking cancelled',`${k.client.name} · ${svcOf(k).name}`);cs.msgs.push({who:'me',html:'Yes, cancel'});botSay(S.chatBiz,t('cancelled'));renderTop()},
 chatWait(){chatState(S.chatBiz).msgs.push({who:'me',html:'Join waitlist'});botSay(S.chatBiz,'You’re on the waitlist! I’ll ping you on WhatsApp the moment a slot opens.')},
 handover(){if(S.chatBiz)doHandover(S.chatBiz)},
 msgTeam(v){openDrawer(v,'chat');setTimeout(()=>doHandover(v),400)},
 nav(v){closeDrawer();closeModal();location.hash=v},
 bkInfo(v){bookingModal(v)},
 cmon(v){const d=new Date(S.cmon);d.setMonth(d.getMonth()+(+v));S.cmon=d.getTime();render()},
 cday(v){S.cday=+v;S.cdayOnly=true;render()},
 ctab(v){S.ctab=v;S.cdayOnly=false;render()},
 doCancel(v){const k=BOOKINGS.find(x=>x.id===v);const b=BIZ[k.biz];if((k.start-Date.now())/36e5<b.cancelHrs){toast('Too close to the appointment to cancel online. Call the business.');return}
   k.status='cancelled';k.cancelBy='client';delete k.proposal;saveDB();closeModal();notify('client','cancelled','Booking cancelled',`${svcOf(k).name} at ${b.name} · ${fmtD(new Date(k.start))}`);notify(b.id,'cancelled','Booking cancelled',`${k.client.name} · ${svcOf(k).name} · ${fmtD(new Date(k.start))}`);render();toast('Cancelled. The slot was offered to the waitlist.','refresh')},
 resched(v){closeModal();reschedModal('client',v)},
 rate(v){const[id,n]=v.split(':');const k=BOOKINGS.find(x=>x.id===id);k.rated=+n;DB.myReviews.unshift({biz:k.biz,r:+n,text:`Rated ${svcOf(k).name}.`,at:Date.now()});saveDB();closeModal();render();toast('Thanks! Your rating was shared with the business.','star')},
 readAll(v){DB.notifs.forEach(n=>{if(n.to===v)n.read=true});saveDB();if(S.view==='dashboard'){closeModal();redash()}else render()},
 ptab(v){S.ptab=v;render()},
 pset(v){DB.profile[v]=!DB.profile[v];saveDB();render()},
 copy(v){const done=()=>toast(`Copied ${esc(v.length>60?v.slice(0,57)+'…':v)}`,'copy');try{navigator.clipboard.writeText(v).then(done,()=>toast(`Copy this: ${esc(v)}`,'copy'))}catch(e){toast(`Copy this: ${esc(v)}`,'copy')}},
 loginBack(){S.login.step='phone';S.login.err='';refreshLogin()},
 useDemo(v){const b=BIZ[v];AUTH.business={id:b.id,name:b.owner,role:'Owner'};saveAuth();S.dash='overview';toast(`Logged in to ${esc(b.name)} (demo)`,'check');location.hash='dashboard'},
 logout(v){AUTH[v]=null;saveAuth();toast('Logged out','logout');if(v==='client'){S.login={step:'phone',phone:'',name:'',err:''};S.clientMode=false;if(location.hash==='#home')render();else location.hash='home';return}location.hash=v==='business'?'business-login':'admin-login'},
 /* register */
 regBack(){regCollect();S.reg.err='';S.reg.step--;render()},
 regNext(){regCollect();const e=regValidate();S.reg.err=e;if(!e)S.reg.step++;render();window.scrollTo(0,0)},
 regGo(v){regCollect();S.reg.step=+v;S.reg.err='';render()},
 regPublish(){regCollect();regPublish()},
 regCat(v){regCollect();const d=S.reg.d;if(v==='__new'){d.newCat='__pending';d.cat='';d.sub=''}else{d.cat=v;d.sub='';d.newCat='';d.newSub=''}render()},
 regSub(v){regCollect();const d=S.reg.d;if(v==='__new'){d.sub='__new';d.newSub='__pending'}else{d.sub=v;d.newSub=''}d.svcs=[];render()},
 regChip(v){regCollect();const[k,x]=v.split('|');const q=S.reg.d.q;q[k]=q[k]||[];const i=q[k].indexOf(x);if(i>=0)q[k].splice(i,1);else q[k].push(x);render()},
 regAddRow(v){regCollect();S.reg.d[v].push(v==='svcs'?{name:'',desc:'',price:'',dur:30,avail:'All days'}:{name:'',role:'',days:'All working days'});render()},
 regDelRow(v){regCollect();const[k,i]=v.split(':');S.reg.d[k].splice(+i,1);render()},
 regDay(v){regCollect();const ds=S.reg.d.days;const i=ds.indexOf(+v);if(i>=0)ds.splice(i,1);else ds.push(+v);render()},
 regHol(){regCollect();const v=$('#r-hol').value;if(v&&!S.reg.d.holidays.includes(v))S.reg.d.holidays.push(v);render()},
 regDelHol(v){regCollect();S.reg.d.holidays.splice(+v,1);render()},
 regSendOtp(){regCollect();if(!/\S+@\S+\.\S+/.test(S.reg.d.lemail||S.reg.d.email)){S.reg.err='Enter your login email first.';render();return}S.reg.d.otpSent=true;S.reg.err='';render();toast(`Code sent to ${esc(S.reg.d.lemail||S.reg.d.email)}`,'bell')},
 regOtp(){regCollect();if(($('#r-otp')||{}).value==='123456'){S.reg.d.otpOk=true;S.reg.err=''}else S.reg.err='That code isn’t right. Try 123456.';render()},
 /* business */
 dash(v){S.dash=v;S.calStaff=S.dash==='calendar'?S.calStaff:'';redash();window.scrollTo(0,0)},
 atab(v){S.atab=v;redash()},
 aInfo(v){apptModal(v)},
 aSet(v){const[id,st]=v.split('|');const a=findAppt(id);if(!a)return;closeModal();setAppt(a,st);redash()},
 aResched(v){reschedModal('biz',v)},
 newAppt(){apptForm()},
 cellAdd(v){const[st,m]=v.split(':');apptForm({staff:st,m:+m,day:S.calDay||0})},
 cview(v){S.cview=v;redash()},
 calDay(v){const step=S.cview==='week'?7:S.cview==='month'?30:1;S.calDay=+v===0?0:(S.calDay||0)+(+v)*step;redash()},
 calGo(v){S.calDay=+v;S.cview='day';S.dash='calendar';redash()},
 calStaff(v){S.calStaff=v;redash()},
 bset(v){const b=CUR();b[v]=v==='autoConfirm'?!b.autoConfirm:b[v]===false;saveBiz(b);redash()},
 remCall(v){const a=findAppt(v);modal(`<h3>Call ${esc(a.customer)}</h3><div class="idbox"><b class="mono" style="font-size:20px">${esc(a.phone)}</b><button class="btn ghost sm" data-a="copy" data-v="${esc(a.phone)}" aria-label="Copy number">${ic('copy')}</button></div><p class="muted">${esc(a.svc)} · ${relD(new Date(a.date))}, ${fmtT(a.start)}</p><a class="btn primary" href="tel:${esc(a.phone.replace(/\s/g,''))}">${ic('phone')} Call now</a><div class="row"><button class="btn" style="flex:1" data-a="remMark" data-v="${a.id}">Mark as contacted</button><button class="btn" data-a="closeModal">Close</button></div>`)},
 remSend(v){const a=findAppt(v);DB.rem=DB.rem||{};DB.rem[v]=Object.assign(DB.rem[v]||{},{sent:Date.now()});saveDB();closeModal();toast(`Reminder sent to ${esc(firstName(a.customer))} on WhatsApp`,'whatsapp');redash()},
 remMark(v){DB.rem=DB.rem||{};const r=DB.rem[v]=DB.rem[v]||{};r.contacted=!r.contacted;saveDB();closeModal();redash()},
 remNote(v){const r=remOf(v);S.noteId=v;formModal('Reminder note','noteform',`<div><label class="lbl" for="nt">Note</label><textarea class="field" id="nt" rows="3" placeholder="e.g. Asked to come 10 min early">${esc(r.note||'')}</textarea></div>`,'Save note')},
 svcEdit(v){const b=CUR();const s=b.services.find(x=>x.id===v)||{};S.editId=v;formModal(v?'Edit service':'Add service','svcform',fi('sv-name','Service name',s.name||'','text','required')+fi('sv-desc','Description',s.desc||'')+`<div class="g2f">${fi('sv-price','Price (₹)',s.price!=null?s.price:'','number','min="0" required')}${fi('sv-dur','Duration (minutes)',s.dur||30,'number','min="5" required')}</div><div><label class="lbl">Assigned staff</label><div class="chips" style="flex-wrap:wrap">${b.staff.map(t=>`<label class="chip sm"><input type="checkbox" class="sv-st" value="${t.id}" ${!s.staff||s.staff.includes(t.id)?'checked':''}> ${esc(t.name)}</label>`).join('')}</div></div>`,v?'Save service':'Add service')},
 svcDel(v){const b=CUR();if(b.services.length<2){toast('Keep at least one service.','x');return}modal(`<h3>Remove this service?</h3><p class="muted">${esc(b.services.find(s=>s.id===v).name)} will no longer be bookable. Existing bookings stay.</p><div class="row"><button class="btn danger" style="flex:1" data-a="svcDelOk" data-v="${v}">Remove</button><button class="btn" data-a="closeModal">Keep it</button></div>`)},
 svcDelOk(v){const b=CUR();b.services=b.services.filter(s=>s.id!==v);saveBiz(b);GEN.clear();closeModal();redash();toast('Service removed','check')},
 svcToggle(v){const b=CUR();const s=b.services.find(x=>x.id===v);s.off=!s.off;saveBiz(b);redash()},
 holAdd(){const b=CUR();const v=$('#sl-hol').value;if(!v)return;const k=dkey(new Date(v+'T00:00'));b.holidays=b.holidays||[];if(!b.holidays.includes(k))b.holidays.push(k);saveBiz(b);GEN.clear();redash();toast('Holiday added. Those slots are now closed.','check')},
 holDel(v){const b=CUR();b.holidays=b.holidays.filter(h=>h!==v);saveBiz(b);GEN.clear();redash()},
 stDay(v){const b=CUR();const[id,d]=v.split(':');const s=b.staff.find(x=>x.id===id);s.days=s.days||[];const i=s.days.indexOf(+d);if(i>=0)s.days.splice(i,1);else s.days.push(+d);saveBiz(b);GEN.clear();redash()},
 custInfo(v){const c=custData(CUR()).find(x=>x.name===v);if(!c)return;modal(`<div class="row" style="justify-content:space-between"><div class="row">${avatar(c.name,44)}<div><h3 style="font-size:20px">${esc(c.name)}</h3><span class="muted mono">${esc(c.phone)}</span></div></div><button class="btn ghost sm" data-a="closeModal" aria-label="Close">${ic('x')}</button></div><div class="sumrow"><span>Visits</span><b>${c.visits}</b></div><div class="sumrow"><span>Lifetime spend</span><b>${inr(c.spend)}</b></div><b>Booking history</b><div class="stack" style="gap:6px;max-height:260px;overflow:auto">${c.list.sort((a,z)=>z.date-a.date||z.start-a.start).map(a=>`<div class="sumrow"><span>${fmtD(new Date(a.date))}, ${fmtT(a.start)} · ${esc(a.svc)}</span>${stPill(a)}</div>`).join('')}</div>`)},
 staffEdit(v){const b=CUR();const s=b.staff.find(x=>x.id===v)||{};S.editId=v;formModal(v?'Edit staff member':'Add staff member','staffform',fi('st-name','Name',s.name||'','text','required')+fi('st-role','Role',s.role||'')+fi('st-qual','Qualification',s.qual||''),v?'Save':'Add staff')},
 staffDel(v){modal(`<h3>Remove ${esc(CUR().staff.find(s=>s.id===v).name)}?</h3><p class="muted">Their future bookings stay on the calendar so you can reassign them.</p><div class="row"><button class="btn danger" style="flex:1" data-a="staffDelOk" data-v="${v}">Remove</button><button class="btn" data-a="closeModal">Keep</button></div>`)},
 staffDelOk(v){const b=CUR();b.staff=b.staff.filter(s=>s.id!==v);saveBiz(b);GEN.clear();closeModal();redash();toast('Staff member removed','check')},
 staffSvc(v){const b=CUR();const[id,sid]=v.split(':');const s=b.staff.find(x=>x.id===id);s.svcs=s.svcs||b.services.map(x=>x.id);const i=s.svcs.indexOf(sid);if(i>=0)s.svcs.splice(i,1);else s.svcs.push(sid);saveBiz(b);redash()},
 staffCal(v){S.calStaff=v;S.dash='calendar';S.cview='day';redash()},
 bizStatus(){const b=CUR();if(b.status==='pending'){toast('Waiting for verification by the Appointly team.','clock');return}b.status=b.status==='active'?'inactive':'active';saveBiz(b);redash();toast(b.status==='active'?'Your business is visible to customers again.':'Your business is hidden from customers.','check')},
 offerEdit(v){const b=CUR();const o=(b.offers||[]).find(x=>x.id===v)||{};S.editId=v;formModal(v?'Edit offer':'Create offer','offerform',fi('of-title','Title',o.title||'','text','required placeholder="e.g. 15% off weekday mornings"')+fi('of-desc','Description',o.desc||'')+`<div class="g2f">${fi('of-pct','Discount %',o.pct||10,'number','min="0" max="100"')}${fi('of-ends','Ends in (days)',o.ends||14,'number','min="1"')}</div><div><label class="lbl" for="of-svc">Applies to</label><select class="field" id="of-svc"><option value="">All services</option>${b.services.map(s=>`<option value="${s.id}" ${o.svc===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}</select></div>`,v?'Save offer':'Create offer')},
 offerToggle(v){const b=CUR();const o=b.offers.find(x=>x.id===v);o.active=!o.active;saveBiz(b);redash()},
 offerDel(v){const b=CUR();b.offers=b.offers.filter(x=>x.id!==v);saveBiz(b);redash();toast('Offer deleted','check')},
 plan(v){const b=CUR();b.plan=v;saveBiz(b);redash();toast(`Plan changed to ${v}`,'check')},
 bizNotifs(){const b=CUR();modal(`<div class="row" style="justify-content:space-between"><h3>Notifications</h3><button class="btn ghost sm" data-a="closeModal" aria-label="Close">${ic('x')}</button></div><div style="max-height:60dvh;overflow:auto">${notifList(b.id)}</div><button class="btn" data-a="readAll" data-v="${b.id}">Mark all as read</button>`)},
 toggle(v,el){el.classList.toggle('on')},
 toggleHandover(v,el){S.handover=!S.handover;el.classList.toggle('on',S.handover);toast(S.handover?'Human handover on':'Human handover off')},
 addFaq(){S.editId='';formModal('Add FAQ','faqform',fi('fq-q','Question','','text','required')+fi('fq-a','Answer','','text','required'),'Add')},
 /* admin */
 adm(v){S.adm=v;render()},
 admBizToggle(v){const b=BIZ[v];b.status=b.status==='active'?'inactive':'active';saveBiz(b);render()},
 admVerify(v){const[id,ok]=v.split('|');const b=BIZ[id];if(ok==='ok'){b.status='active';b.verified=true;notify(b.id,'confirm','Your business is verified','It’s now live and discoverable in Explore.')}else{b.status='inactive';notify(b.id,'cancelled','Verification declined','Please check your details and resubmit.')}saveBiz(b);render();toast(ok==='ok'?`${esc(b.name)} approved and published`:'Rejected','check')},
 catAdd(){S.editId='';formModal('Add main category','catform',fi('ct-name','Category name','','text','required')+fi('ct-sub','First subcategory','','text','required'),'Add category')},
 subAdd(v){S.editId=v;formModal(`Add subcategory to ${esc(catLabel(v))}`,'subform',fi('sb-name','Subcategory name','','text','required'),'Add')},
 catRename(v){S.editId=v;formModal('Rename category','renform',fi('rn-name','Category name',catLabel(v),'text','required'),'Save')},
 subDel(v){const[c,s]=v.split(':');const cat=catOf(c);cat.subs=cat.subs.filter(x=>x.id!==s);saveDB();render();toast('Subcategory removed','check')},
 catReq(v){const[i,st]=v.split('|');const r=DB.catReq.filter(x=>x.status==='pending')[+i];r.status=st;const sub=subOf(r.cat,r.sub);if(sub)sub.isNew=st!=='approved';if(st==='rejected'&&sub){}saveDB();render();toast(st==='approved'?'Category approved':'Category request rejected','check')},
 install(){modal(`<div class="success-ic" style="background:var(--brand-soft);color:var(--brand)">${ic('download')}</div><h3>Install Appointly</h3><p class="muted"><b style="color:var(--fg)">iPhone:</b> tap Share, then “Add to Home Screen”.<br><b style="color:var(--fg)">Android:</b> tap the menu, then “Install app”.<br><b style="color:var(--fg)">Laptop:</b> click the install icon in the address bar.</p><button class="btn primary" data-a="closeModal">Got it</button>`)},
 toast(v){toast(esc(v),'check')},
 closeModal(v,el,e){if(el.dataset.self&&e.target!==el)return;closeModal()}
};
document.addEventListener('click',e=>{const a=e.target.closest('[data-a]');if(!a)return;if(a.dataset.self&&e.target!==a)return;const fn=ACT[a.dataset.a];if(!fn)return;if(a.tagName==='BUTTON'||a.dataset.self||['scrollTo','ctab','atab'].includes(a.dataset.a))e.preventDefault();fn(a.dataset.v,a,e)});
document.addEventListener('submit',e=>{const f=e.target;e.preventDefault();const b=CUR();const val=id=>($('#'+id)||{}).value||'';
  if(f.id==='chatform'){const i=$('#chatin');const v=i.value.trim();if(!v)return;i.value='';handleChat(v)}
  if(f.id==='homesearch'||f.id==='exsearch'){const q=val(f.id+'-q').trim();if(!q)return;const P=smartParse(q);S.clientMode=true;S.F={q,cat:P.cat||'',sub:P.sub||'',area:P.area||'',avail:P.avail||'',part:P.part||'',price:P.price||'',rating:P.rating||'',keep:true};const h='explore'+(P.cat?'-'+P.cat+(P.sub?'-'+P.sub:''):'');if(location.hash==='#'+h){S.F.keep=false;render()}else location.hash=h}
  if(f.id==='phoneform'){const nm=$('#gname')?$('#gname').value.trim():'';const p=$('#ph').value.replace(/\D/g,'');S.login.name=nm;S.login.phone=$('#ph').value;const cons=$('#gconsent');S.login.consent=cons?cons.checked:true;
    if($('#gname')&&nm.length<2&&!$('#mlogin').closest('.auth-card')){S.login.err='Enter your name.';refreshLogin();return}
    if(p.length!==10){S.login.err='Enter a 10-digit mobile number.';refreshLogin();return}
    if(cons&&!cons.checked){S.login.err='Please allow booking messages so we can send your confirmation.';refreshLogin();return}
    S.login={...S.login,step:'code',phone:p.replace(/(\d{5})(\d{5})/,'$1 $2'),err:''};refreshLogin();toast('Code sent on WhatsApp and SMS','whatsapp')}
  if(f.id==='otpform'){if($('#otp').value.trim()!=='123456'){S.login.err='That code is not right. Check the message and try again.';refreshLogin();return}loginClient(S.login.name||(AUTH.client&&AUTH.client.name)||'Ananya Rao',S.login.phone)}
  if(f.id==='bizform'){const em=val('be').trim().toLowerCase(),pw=val('bp');const biz=Object.values(BIZ).find(x=>x.email.toLowerCase()===em);S.blogin={email:em,pw:''};
    if(!biz||biz.password!==pw){S.blogin.err='Email or password is incorrect.';render();return}AUTH.business={id:biz.id,name:biz.owner,role:'Owner'};saveAuth();S.blogin={};S.dash='overview';toast(`Welcome back, ${esc(firstName(biz.owner))}`,'check');location.hash='dashboard'}
  if(f.id==='adminform'){if(val('ap')!=='Appointly@Admin'||val('a2')!=='123456'){S.aerr='Password or authenticator code is incorrect.';render();return}S.aerr='';AUTH.admin={email:val('ae')};saveAuth();location.hash='admin'}
  if(f.id==='profform'){AUTH.client.name=val('pf-name').trim()||AUTH.client.name;saveAuth();DB.profile.email=val('pf-email');DB.profile.area=val('pf-area');saveDB();render();toast('Profile saved','check')}
  if(f.id==='reschform'){const t=+val('rs-time');if(!val('rs-time'))return toast('Pick an available time.','x');const day=+val('rs-day');const{kind,a}=S.rs;const d=addDays(TODAY,day);d.setHours(0,t,0,0);proposeResched(kind,a,d,t)}
  if(f.id==='newapptform'){const t=val('na-time');if(!t)return toast('No free time selected.','x');const sv=b.services.find(s=>s.id===val('na-svc'));const st=val('na-staff');const day=+val('na-day');const d=addDays(TODAY,day);
    if(!isFree(b,st,d,+t,sv.dur))return toast('That slot was just taken. Pick another.','x');d.setHours(0,+t,0,0);const nm=val('na-name').trim()||'Walk-in customer';
    BOOKINGS.push({id:bookingId(),biz:b.id,svc:sv.id,staff:st,branch:b.branches[0],start:d.getTime(),status:'confirmed',via:'Walk-in / phone',pay:'Pay at venue',client:{name:nm,phone:val('na-phone').trim()},mine:false,created:Date.now()});saveDB();closeModal();redash();toast(`Added for ${esc(nm)}. Slot blocked on all channels.`,'check')}
  if(f.id==='noteform'){DB.rem=DB.rem||{};DB.rem[S.noteId]=Object.assign(DB.rem[S.noteId]||{},{note:val('nt')});saveDB();closeModal();redash()}
  if(f.id==='svcform'){const s=S.editId?b.services.find(x=>x.id===S.editId):{id:b.id+'v'+Date.now().toString(36),g:'Services',kw:[]};Object.assign(s,{name:val('sv-name').trim(),desc:val('sv-desc'),price:+val('sv-price')||0,dur:+val('sv-dur')||30});s.kw=kwOf(s.name);const st=[...document.querySelectorAll('.sv-st:checked')].map(x=>x.value);s.staff=st.length===b.staff.length?null:st;if(!S.editId)b.services.push(s);saveBiz(b);GEN.clear();closeModal();redash();toast('Service saved','check')}
  if(f.id==='staffform'){const s=S.editId?b.staff.find(x=>x.id===S.editId):{id:b.id+'s'+Date.now().toString(36),exp:1,langs:'English, Hindi, Telugu',days:[1,2,3,4,5,6],svcs:null};Object.assign(s,{name:val('st-name').trim(),role:val('st-role'),qual:val('st-qual')});if(!S.editId)b.staff.push(s);prepBiz(b);saveBiz(b);GEN.clear();closeModal();redash();toast('Staff saved','check')}
  if(f.id==='offerform'){b.offers=b.offers||[];const o=S.editId?b.offers.find(x=>x.id===S.editId):{id:b.id+'o'+Date.now().toString(36),active:true};Object.assign(o,{title:val('of-title').trim(),desc:val('of-desc'),pct:+val('of-pct')||0,ends:+val('of-ends')||14,svc:val('of-svc')||null});if(!S.editId){b.offers.push(o);notify('client','offer',o.title,`${b.name} · ends in ${o.ends} days`)}saveBiz(b);closeModal();redash();toast('Offer saved and shown to customers','sparkle')}
  if(f.id==='faqform'){b.faqs.push([val('fq-q'),val('fq-a')]);saveBiz(b);closeModal();redash();toast('FAQ added. Capi can answer it now.','sparkle')}
  if(f.id==='slotform'){const tm=x=>toMin(x);b.open=tm(val('sl-open'));b.close=tm(val('sl-close'));if(b.close<=b.open)return toast('Closing time must be after opening.','x');b.sun=val('sl-sun')==='open'?[b.open,b.close]:null;b.slotInt=+val('sl-int');b.buffer=+val('sl-buf');b.dailyLimit=+val('sl-lim')||40;const bs=val('sl-bs'),be=val('sl-be');b.breaks=bs&&be&&tm(be)>tm(bs)?[[tm(bs),tm(be)]]:[];saveBiz(b);GEN.clear();redash();toast('Slot settings saved. Availability updated everywhere.','check')}
  if(f.id==='bprof'){b.name=val('bp-name').trim()||b.name;b.website=val('bp-web');b.about=val('bp-desc');b.cat=val('bp-cat');b.sub=val('bp-sub');b.address=val('bp-addr');b.area=val('bp-area');b.phone=val('bp-phone');b.email=val('bp-email');saveBiz(b);redash();toast('Profile saved. Your page and Explore are updated.','check')}
  if(f.id==='catform'){const n=val('ct-name').trim(),sn=val('ct-sub').trim();const id=slug(n);if(!id||catOf(id))return toast('That category already exists.','x');DB.cats.push({id,label:n,icon:'sparkle',subs:[{id:slug(sn)||'sub',label:sn}]});saveDB();closeModal();render();toast('Category added. It’s live in Explore.','check')}
  if(f.id==='subform'){const n=val('sb-name').trim();const c=catOf(S.editId);const id=slug(n);if(!id||c.subs.find(s=>s.id===id))return toast('That subcategory already exists.','x');c.subs.push({id,label:n});saveDB();closeModal();render();toast('Subcategory added','check')}
  if(f.id==='renform'){catOf(S.editId).label=val('rn-name').trim();saveDB();closeModal();render()}
});
document.addEventListener('change',e=>{const el=e.target;const k=el.dataset.change;
  if(el.dataset.f&&!el.dataset.row&&S.view==='explore'&&S.F){S.F[el.dataset.f]=el.value;S.F.keep=true;const sc=window.scrollY;$('#app').innerHTML=vExplore();window.scrollTo(0,sc)}
  if(k==='pay'&&S.mb)S.mb.pay=el.value;
  if(k==='rep'&&S.mb)S.mb.rep=el.value;
  if(k==='rsDay'&&S.rs){const a=S.rs.a;$('#rs-time').innerHTML=timeOpts(BIZ[a.biz],a.staff,addDays(TODAY,+el.value),a.dur,a.id)}
  if(k==='naRe'){const b=CUR();const sv=b.services.find(s=>s.id===$('#na-svc').value);$('#na-time').innerHTML=timeOpts(b,$('#na-staff').value,addDays(TODAY,+$('#na-day').value),sv.dur)}
  if(k==='lang'){S.lang=el.value;chatState(S.chatBiz).msgs.push({who:'bot',html:S.chatBiz==='appointly'?helpGreeting():t('hi')(BIZ[S.chatBiz])});renderChatLog()}
  if(el.id==='cwin'){const b=CUR();b.cancelHrs=Math.max(0,+el.value||0);saveBiz(b);toast(`Cancellation window set to ${b.cancelHrs} hours.`,'lock')}
  if(el.id==='botname'){const b=CUR();b.bot=el.value.trim()||'Capi';delete S.chat[b.id];saveBiz(b);toast(`Assistant renamed to ${esc(b.bot)}`,'sparkle');redash()}
  if(el.id==='bp-cat'){const c=catOf(el.value);$('#bp-sub').innerHTML=c.subs.map(x=>`<option value="${x.id}">${esc(x.label)}</option>`).join('')}
  if(el.id==='cq'){S.cq=el.value;redash()}
  if(el.id==='r-logo')readFile(el,url=>{S.reg.d.logo=url;$('#logoPrev').innerHTML=`<span class="blogo" style="width:64px;height:64px"><img src="${url}" alt="Logo preview"></span>`});
  if(el.id==='bp-logo')readFile(el,url=>{const b=CUR();b.logo=url;saveBiz(b);redash();toast('Logo updated','check')});
  if(el.id==='bp-photo')readFile(el,url=>{const b=CUR();b.photos=(b.photos||[]).concat(url);saveBiz(b);redash();toast('Photo added to your portfolio','check')});
});
document.addEventListener('mouseover',e=>{const a=e.target.closest('.appy-btn');if(a&&!S.hovT){S.hovT=1;appyMood('.appy-launch .appy','happy',1000);setTimeout(()=>S.hovT=0,1600)}});
document.addEventListener('input',e=>{if(e.target.id==='chatin'){const a=$('.chat-head .appy');if(a&&a.dataset.mood!=='think')appyMood('.chat-head .appy','think',1400)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();if(S.drawer)closeDrawer()}});
document.body.insertAdjacentHTML('afterbegin',APPY_DEFS);
/* ================= v12: two-way reschedule, business cancel + rebook, calendar tones, Capi for business ================= */
Object.assign(ST_CLASS,{'Action needed':'pend','Requested':'pend'});
ALBL.resch='Rescheduled';
const isReq=a=>a.status!=='cancelled'&&((a.status==='pending'&&a.date>=TODAY.getTime())||(a.proposal&&a.proposal.by==='client'));
const propTxt=p=>{const d=new Date(p.start);return `${relD(startOfDay(d))}, ${fmtT(d.getHours()*60+d.getMinutes())}`};
function kStatus(k){if(k.status==='cancelled')return 'Cancelled';if(k.proposal&&isUpcoming(k))return k.proposal.by==='business'?'Action needed':'Requested';if(k.status==='pending')return k.start<Date.now()?'Expired':'Pending';if(k.start+kDur(k)*6e4<Date.now())return 'Completed';return k.rescheduled?'Rescheduled':'Confirmed'}
function aCls(a){if(a.status==='cancelled')return 'cancel';if(a.proposal&&a.date>=TODAY.getTime())return 'pend';if(a.status==='pending')return a.date<TODAY.getTime()?'cancel':'pend';if(a.date===TODAY.getTime())return 'today';if(a.date>TODAY.getTime())return a.rescheduled?'resch':'up';return 'done'}
function stPill(a){const c=aCls(a);if(a.proposal&&c==='pend')return `<span class="pill st-pend">${a.proposal.by==='client'?'Reschedule request':'Awaiting customer'}</span>`;return `<span class="pill st-${c}">${ALBL[c]}</span>`}
function apptActions(a){const c=aCls(a);
  if(a.proposal&&a.status!=='cancelled'){const t=propTxt(a.proposal);
    return a.proposal.by==='client'?`<span class="muted" style="font-size:12.5px">Wants ${t}</span><button class="btn sm primary" data-a="propAccept" data-v="${a.id}">Accept new time</button><button class="btn sm" data-a="propDecline" data-v="${a.id}">Decline</button>`
      :`<span class="muted" style="font-size:12.5px">Proposed ${t}</span><button class="btn sm" data-a="propDecline" data-v="${a.id}">Withdraw</button>`}
  if(a.status==='pending'&&c==='pend')return `<button class="btn sm primary" data-a="aSet" data-v="${a.id}|confirmed">Accept</button><button class="btn sm danger" data-a="aSet" data-v="${a.id}|cancelled">Reject</button>`;
  if(['today','up','resch'].includes(c))return `<button class="btn sm" data-a="aResched" data-v="${a.id}">Reschedule</button><button class="btn sm danger" data-a="aSet" data-v="${a.id}|cancelled">Cancel</button>`;
  return ''}

/* ---- client calendar day tone ---- */
function dayTone(ks,d){if(!ks.length)return '';const st=ks.map(kStatus);
  if(st.some(s=>s==='Action needed'||s==='Requested'||s==='Pending'))return 'has-pend';
  if(st.includes('Confirmed')||st.includes('Rescheduled')){if(d.getTime()===TODAY.getTime())return 'has-today';return st.includes('Rescheduled')?'has-resch':'has-up'}
  if(st.includes('Cancelled'))return 'has-cancel';return 'has-done'}

/* ---- rebook suggestions after a business cancellation ---- */
function altBiz(b,n=3){const pool=Object.values(BIZ).filter(x=>x.id!==b.id&&live(x));return pool.filter(x=>x.sub===b.sub).concat(pool.filter(x=>x.sub!==b.sub&&x.cat===b.cat).sort((p,q)=>q.rating-p.rating)).slice(0,n)}
function slotChips(b,kid,svcIdx,mode){return firstSlots(b,3,'any',0,svcIdx).map(s=>`<button class="slot" data-a="${mode}" data-v="${b.id}|${s.d}|${s.m}|${kid}">${relD(addDays(TODAY,s.d))} ${fmtT(s.m)}</button>`).join('')||'<span class="muted">No free slots this week</span>'}
function rebookBlock(k){const b=BIZ[k.biz];const si=Math.max(0,b.services.findIndex(s=>s.id===k.svc));
  return `<div class="rebook"><b>Book again</b>
   <div class="rb-sec"><span class="muted" style="font-size:13px">Another time at ${esc(b.name)}</span><div class="slots">${slotChips(b,k.id,si,'rbSame')}</div><button class="btn ghost sm" data-a="bookAgain" data-v="${k.id}">More times</button></div>
   <div class="rb-sec"><span class="muted" style="font-size:13px">Or a similar place nearby</span>${altBiz(b).map(x=>`<div class="rb-alt"><div class="row" style="gap:10px">${logo(x,36)}<div style="min-width:0;flex:1"><b>${esc(x.name)}</b><div class="muted" style="font-size:12.5px">${esc(subLabel(x))} · ${esc(x.area)} · ★ ${x.rating}</div></div><a class="btn ghost sm" href="#book-${x.id}" data-a="closeModal">View</a></div><div class="slots">${slotChips(x,k.id,0,'rbAlt')}</div></div>`).join('')}</div></div>`}

function bookingModal(id){const k=BOOKINGS.find(x=>x.id===id);if(!k)return;const b=BIZ[k.biz],s=svcOf(k),st=staffOf(k)||{},d=new Date(k.start);const status=kStatus(k);const hrs=(k.start-Date.now())/36e5;const up=isUpcoming(k);const locked=up&&hrs<b.cancelHrs;const p=k.proposal;
  const banner=p&&up?(p.by==='business'?`<div class="note warn">${ic('refresh')}<div><b>${esc(b.name)} asked to move this booking</b><div>New time: <b>${propTxt(p)}</b>${p.reason?` · ${esc(p.reason)}`:''}</div><div class="row" style="flex-wrap:wrap;margin-top:10px;gap:8px"><button class="btn sm primary" data-a="propAccept" data-v="${k.id}">${ic('check')} Accept new time</button><button class="btn sm" data-a="resched" data-v="${k.id}">Suggest another time</button><button class="btn sm" data-a="propDecline" data-v="${k.id}">Keep original</button></div></div></div>`
    :`<div class="note warn">${ic('clock')}<div><b>Waiting for ${esc(b.name)} to approve</b><div>You asked for <b>${propTxt(p)}</b>. Your original time stays until they accept.</div><div class="row" style="margin-top:10px"><button class="btn sm" data-a="propDecline" data-v="${k.id}">Withdraw request</button></div></div></div>`):'';
  const cBanner=k.status==='cancelled'&&k.cancelBy==='business'?`<div class="note bad">${ic('x')}<div><b>${esc(b.name)} cancelled this booking</b><div>${esc((k.cancelReason||'The business could not keep this slot').replace(/\.$/,''))}. Sorry about that!</div></div></div>${k.rebooked?`<div class="note">${ic('check')}<span>You already rebooked${k.rebooked.startsWith('APX')?` · <b class="mono">${k.rebooked}</b>`:''}.</span></div>`:rebookBlock(k)}`:'';
  modal(`<div class="row" style="justify-content:space-between"><span class="pill st-${ST_CLASS[status]}">${status}</span><button class="btn ghost sm" data-a="closeModal" aria-label="Close">${ic('x')}</button></div>
   <div class="row">${logo(b,52)}<div><h3 style="font-size:20px">${esc(b.name)}</h3><span class="muted">${esc(subLabel(b))} · ${esc(b.area)}</span></div></div>
   ${banner}${cBanner}
   <div class="sumrow"><span>Booking ID</span><b class="mono">${k.id}</b></div><div class="sumrow"><span>Service</span><b>${esc(s.name)}</b></div><div class="sumrow"><span>Staff</span><b>${esc(st.name||'')}</b></div>
   <div class="sumrow"><span>Date</span><b>${fmtD(d)}</b></div><div class="sumrow"><span>Time</span><b>${fmtT(d.getHours()*60+d.getMinutes())} · ${s.dur} min</b></div><div class="sumrow"><span>Price</span><b>${inr(s.price)} · ${esc(k.pay||'Pay at venue')}</b></div><div class="sumrow"><span>Booked via</span><b>${esc(k.via)}</b></div>
   ${locked&&!p?`<div class="lock">${ic('lock')}<span>Too close to change online. Call <span class="mono">${b.phone}</span>.</span></div>`:''}
   <div class="row" style="flex-wrap:wrap">${up&&!locked&&!p?`<button class="btn" data-a="resched" data-v="${k.id}">${ic('refresh')} Reschedule</button><button class="btn danger" data-a="doCancel" data-v="${k.id}">${ic('x')} Cancel</button>`:''}
    ${status==='Completed'&&!k.rated?`<span class="row" style="gap:2px">${[1,2,3,4,5].map(n=>`<button class="btn ghost sm" style="padding:4px" data-a="rate" data-v="${k.id}:${n}" aria-label="Rate ${n} stars">${ic('star')}</button>`).join('')}</span>`:''}
    ${!up&&k.cancelBy!=='business'?`<button class="btn primary" data-a="bookAgain" data-v="${k.id}">Book again</button>`:''}<a class="btn ghost" href="#book-${b.id}" data-a="closeModal">Business details</a></div>`)}

/* ---- client home: things that need the client ---- */
function actionCards(){const mine=BOOKINGS.filter(k=>k.mine);
  const items=mine.filter(k=>(k.proposal&&k.proposal.by==='business'&&isUpcoming(k))||(k.status==='cancelled'&&k.cancelBy==='business'&&!k.rebooked&&k.start>Date.now()-2*864e5));
  if(!items.length)return '';
  return `<section class="hsec"><div class="hhead"><h2>${ic('sparkle')} Needs your reply</h2></div><div class="stack" style="gap:10px">${items.map(k=>{const b=BIZ[k.biz];const can=k.status==='cancelled';
    return `<button class="panel actcard ${can?'bad':'warn'}" data-a="bkInfo" data-v="${k.id}">${logo(b,44)}<div style="min-width:0;flex:1;text-align:left"><b>${can?`${esc(b.name)} cancelled your ${esc(svcOf(k).name)}`:`${esc(b.name)} proposed a new time`}</b><div class="muted" style="font-size:13px">${can?esc(k.cancelReason||'')+' · pick another slot':`${esc(svcOf(k).name)} · ${propTxt(k.proposal)}`}</div></div><span class="btn sm ${can?'':'primary'}">${can?'Rebook':'Review'}</span></button>`}).join('')}</div></section>`}

/* ---- business: cancel with a reason ---- */
const CANCEL_REASONS=['Staff unavailable','Emergency closure','Overbooked','Equipment issue','Customer request'];
function bizCancelModal(a){S.bc=a.id;modal(`<h3>${a.status==='pending'?'Decline request':'Cancel appointment'}</h3><p class="muted">${esc(a.customer)} · ${esc(a.svc)} · ${relD(aDate(a))}, ${fmtT(a.start)}</p>
  <div><label class="lbl" for="bc-reason">Reason (shown to the customer)</label><select class="field" id="bc-reason">${CANCEL_REASONS.map(r=>`<option>${r}</option>`).join('')}</select></div>
  <p class="muted" style="font-size:13px">${esc(firstName(a.customer))} gets a message with options to pick another time here or book a similar place.</p>
  <div class="row"><button class="btn danger" style="flex:1" data-a="bCancelGo" data-v="${a.id}">${a.status==='pending'?'Decline & notify':'Cancel & notify'}</button><button class="btn" data-a="closeModal">Keep it</button></div>`)}

/* ---- reschedule modal: business adds a reason ---- */
function reschedModal(kind,id){
  const a=kind==='biz'?findAppt(id):dbAsAppt(BOOKINGS.find(k=>k.id===id));const b=BIZ[a.biz];S.rs={kind,id,a};const d0=Math.max(0,Math.round((a.date-TODAY)/864e5));
  modal(`<h3>${kind==='biz'?'Propose a new time':'Request a new time'}</h3><p class="muted">${esc(kind==='biz'?a.customer:b.name)} · ${esc(a.svc)} · now ${relD(new Date(a.date))}, ${fmtT(a.start)}</p>
   <form id="reschform" class="stack" style="gap:12px"><div><label class="lbl" for="rs-day">New date</label><select class="field" id="rs-day" data-change="rsDay">${Array.from({length:21},(_,i)=>`<option value="${i}" ${i===d0?'selected':''}>${relD(addDays(TODAY,i))}</option>`).join('')}</select></div>
   <div><label class="lbl" for="rs-time">New time</label><select class="field" id="rs-time">${timeOpts(b,a.staff,addDays(TODAY,d0),a.dur,a.id)}</select></div>
   ${kind==='biz'?`<div><label class="lbl" for="rs-reason">Reason (shown to the customer)</label><select class="field" id="rs-reason">${['Staff unavailable','Running late on schedule','Equipment issue','Better slot available','Other'].map(r=>`<option>${r}</option>`).join('')}</select></div>`:''}
   <p class="muted" style="font-size:13px">${kind==='biz'?'The customer must accept the new time. Until then the original booking stays.':'The business must approve. Your original time stays until then.'}</p>
   <div class="row"><button class="btn primary" style="flex:1" type="submit">${kind==='biz'?'Send to customer':'Send request'}</button><button class="btn" type="button" data-a="closeModal">Cancel</button></div></form>`)}
function proposeResched(kind,a,d,t){const bb=BIZ[a.biz];const reason=kind==='biz'?(($('#rs-reason')||{}).value||''):'';let k;
  if(a.src==='db')k=BOOKINGS.find(x=>x.id===a.id);
  else{DB.appt[a.id]={status:'moved'};k={id:a.bid,biz:a.biz,svc:a.svcId,staff:a.staff,branch:bb.branches[0],start:a.date+a.start*6e4,status:a.status==='pending'?'pending':'confirmed',via:a.source,pay:'Pay at venue',client:{name:a.customer,phone:a.phone.replace('+91 ','')},mine:false,created:Date.now()};BOOKINGS.push(k)}
  k.proposal={by:kind==='biz'?'business':'client',start:d.getTime(),staff:k.staff,reason,at:Date.now()};saveDB();
  const when=`${fmtD(d)}, ${fmtT(t)}`;
  if(kind==='biz'){if(k.mine)notify('client','rescheduled',`${bb.name} proposed a new time`,`${svcOf(k).name} · ${when}${reason?' · '+reason:''}. Accept or decline in My bookings.`);
    closeModal();toast(`New time sent to ${esc(firstName(k.client.name))}. It moves once they accept.`,'refresh');
    if(!k.mine)setTimeout(()=>{const kk=BOOKINGS.find(x=>x.id===k.id);if(kk&&kk.proposal&&kk.proposal.by==='business'){applyProposal(kk);toast(`${esc(firstName(kk.client.name))} accepted the new time.`,'check');if(S.view==='dashboard'&&!$('.scrim'))redash()}},9000)}
  else{notify(bb.id,'request','Reschedule request',`${k.client.name} · ${svcOf(k).name} · wants ${when}`);closeModal();toast(`Request sent to ${esc(bb.name)}. We’ll tell you when they reply.`,'clock')}
  if(S.view==='dashboard')redash();else render()}
function applyProposal(k){const p=k.proposal;const b=BIZ[k.biz];const d=new Date(p.start);const m=d.getHours()*60+d.getMinutes();
  const st=freeStaff(b,p.staff||k.staff,startOfDay(d),m,kDur(k),k.id)||freeStaff(b,'any',startOfDay(d),m,kDur(k),k.id);if(!st)return false;
  k.start=p.start;k.staff=st;k.rescheduled=true;if(k.status==='pending')k.status='confirmed';delete k.proposal;saveDB();return true}

Object.assign(ACT,{
  aSet(v){const[id,st]=v.split('|');const a=findAppt(id);if(!a)return;if(st==='cancelled')return bizCancelModal(a);closeModal();setAppt(a,st);redash()},
  bCancelGo(v){const a=findAppt(v);if(!a)return;const b=BIZ[a.biz];const reason=($('#bc-reason')||{}).value||'Staff unavailable';
    if(a.src==='db'){const k=BOOKINGS.find(x=>x.id===a.id);k.status='cancelled';k.cancelBy='business';k.cancelReason=reason;delete k.proposal;
      if(k.mine)notify('client','cancelled',`${b.name} cancelled your booking`,`${svcOf(k).name} · ${fmtD(new Date(k.start))} · ${reason}. Tap My bookings to pick another time.`)}
    else DB.appt[a.id]=Object.assign(DB.appt[a.id]||{},{status:'cancelled',cancelBy:'business',cancelReason:reason});
    saveDB();closeModal();toast(`Cancelled. ${esc(firstName(a.customer))} got rebooking options.`,'x');redash()},
  propAccept(v){const k=BOOKINGS.find(x=>x.id===v);if(!k||!k.proposal)return;const by=k.proposal.by;const b=BIZ[k.biz];const t=propTxt(k.proposal);
    if(!applyProposal(k))return toast('That time was just taken. Suggest another one.','x');
    if(by==='business'){notify(b.id,'rescheduled','Customer accepted new time',`${k.client.name} · ${svcOf(k).name} · ${t}`);notify('client','confirm','New time confirmed',`${svcOf(k).name} at ${b.name} · ${t}`)}
    else if(k.mine)notify('client','confirm',`${b.name} approved your new time`,`${svcOf(k).name} · ${t}`);
    closeModal();toast(`Moved to ${t}. Both sides notified.`,'check');appyCelebrate();if(S.view==='dashboard')redash();else render()},
  propDecline(v){const k=BOOKINGS.find(x=>x.id===v);if(!k||!k.proposal)return;const by=k.proposal.by;const b=BIZ[k.biz];const mine=S.view!=='dashboard';delete k.proposal;saveDB();
    const msg=(by==='business')===mine?'declined':'withdrawn';
    if(by==='business'&&mine)notify(b.id,'cancelled','Customer kept the original time',`${k.client.name} · ${svcOf(k).name} · ${fmtD(new Date(k.start))}`);
    if(by==='client'&&!mine&&k.mine)notify('client','cancelled',`${b.name} couldn’t move your booking`,`${svcOf(k).name} stays on ${fmtD(new Date(k.start))}. You can request another time.`);
    closeModal();toast(msg==='declined'?'Declined. The original time stays.':'Request withdrawn. The original time stays.','refresh');if(S.view==='dashboard')redash();else render()},
  rbSame(v){const[bid,d,m,kid]=v.split('|');const b=BIZ[bid];const old=BOOKINGS.find(x=>x.id===kid);const date=addDays(TODAY,+d);const st=freeStaff(b,'any',date,+m,kDur(old));if(!st)return toast('That slot was just taken.','x');
    const made=createBooking({b,svcId:old.svc,staff:st,date,m:+m,via:'Appointly',pay:old.pay||'Pay at venue'});old.rebooked=made[0].id;saveDB();closeModal();appyCelebrate();toast(`Rebooked · <b class="mono">${made[0].id}</b><br>${relD(date)}, ${fmtT(+m)} at ${esc(b.name)}`,'check');render()},
  rbAlt(v){const[bid,d,m,kid]=v.split('|');const b=BIZ[bid];const old=BOOKINGS.find(x=>x.id===kid);if(old){old.rebooked='alt';saveDB()}closeModal();
    S.mb={biz:bid,svc:b.services[0].id,branch:b.branches[0],staff:'any',day:+d,m:+m,pay:'venue',rep:'none'};location.hash='book-'+bid;setTimeout(()=>scrollToId('book'),200)},
  capiAsk(v){handleHelp(v)}
});

/* ================= Capi for business: answers from live data ================= */
function bizAsk(s){const b=CUR();if(!b)return null;
  const go=(l,a,v='')=>`<button data-a="${a}" data-v="${v}">${l}</button>`;const ask=q=>`<button data-a="capiAsk" data-v="${q}">${q}</button>`;
  const ok=a=>a.status!=='cancelled';const nm=x=>esc(x.customer);
  let off=0,lab='today';if(/tomorrow/.test(s)){off=1;lab='tomorrow'}else if(/yesterday/.test(s)){off=-1;lab='yesterday'}
  const past=/last|past|previous/.test(s);let from=off,to=off,rl=lab;
  if(/week/.test(s)){[from,to]=past?[-7,-1]:[0,6];rl=past?'the last 7 days':'the next 7 days'}
  else if(/month|30 days/.test(s)){[from,to]=[-29,0];rl='the last 30 days'}
  const list=rangeAppts(b,from,to);const sf=b.staff.find(x=>s.includes(x.first.toLowerCase()));const L=sf?list.filter(a=>a.staff===sf.id):list;const who=sf?` for ${esc(sf.name)}`:'';
  const card=(arr,n=6,show=a=>from===to?fmtT(a.start):`${relD(aDate(a))} ${fmtT(a.start)}`)=>arr.length?`<div class="ccard">${arr.slice(0,n).map(a=>`<div class="row" style="justify-content:space-between;gap:8px"><span><b class="mono" style="font-size:12.5px">${show(a)}</b> ${nm(a)}</span><span class="muted" style="font-size:12.5px">${esc(a.svc)}</span></div>`).join('')}${arr.length>n?`<div class="muted" style="font-size:12.5px">+${arr.length-n} more</div>`:''}</div>`:'';
  const rev=arr=>arr.filter(a=>a.status==='confirmed').reduce((x,a)=>x+a.price,0);
  const isDone=a=>a.date<TODAY.getTime()||(a.date===TODAY.getTime()&&a.start+a.dur<=nowMin());

  if(/pending|request|approv|accept|waiting/.test(s)){const r=rangeAppts(b,0,21).filter(isReq);const nb=r.filter(a=>!a.proposal).length,rs=r.length-nb;
    S.atab='pending';return r.length?`You have <b>${r.length}</b> waiting for your reply: ${nb} new booking${nb===1?'':'s'} and ${rs} reschedule request${rs===1?'':'s'}.${card(r,5,a=>`${relD(aDate(a))} ${fmtT(a.start)}`)}<div class="opts">${go('Open requests','dashGo','appts')}</div>`:'All caught up! No requests waiting. 🎉'}
  if(/revenue|earn|income|sales|money|made|collect/.test(s)){
    if(from===0&&to===0){const t=L.filter(ok);const e=rev(t.filter(isDone)),f=rev(t.filter(a=>!isDone(a)));return `Today${who} you’ve earned <b>${inr(e)}</b> from ${t.filter(a=>isDone(a)&&a.status==='confirmed').length} completed visits, with <b>${inr(f)}</b> more booked for later today.`}
    if(from>=0){return `Booked revenue for ${rl}${who}: <b>${inr(rev(L))}</b> across ${L.filter(a=>a.status==='confirmed').length} confirmed appointments.`}
    const e=rev(L.filter(isDone));return `You earned <b>${inr(e)}</b>${who} in ${rl} from ${L.filter(a=>isDone(a)&&a.status==='confirmed').length} completed visits. That’s about ${inr(Math.round(e/Math.max(1,to-from+1)))} a day.<div class="opts">${go('Open analytics','dashGo','analytics')}</div>`}
  if(/cancel|no.?show/.test(s)){const r=(from===to&&!/today|tomorrow|yesterday/.test(s))?rangeAppts(b,-29,0):L;const c=r.filter(a=>a.status==='cancelled');const per=r.length?Math.round(c.length/r.length*100):0;
    return `<b>${c.length}</b> cancellation${c.length===1?'':'s'}${who} in ${from===to&&!/today|tomorrow|yesterday/.test(s)?'the last 30 days':rl} (${per}% of bookings).${per>12?' Reminders 2 hours before can bring this down.':' That’s healthy!'}`}
  if(/free|availab|empty|gap|open slot|slots?\b/.test(s)){const date=addDays(TODAY,off);const h=hoursOn(b,date);if(!h)return `You’re closed ${lab}.`;const sv=b.services[0];const out=[];
    for(let m=h[0];m+sv.dur<=h[1];m+=(b.slotInt||30)){if(freeStaff(b,sf?sf.id:'any',date,m,sv.dur))out.push(m)}
    return out.length?`<b>${out.length}</b> free ${sv.dur}-min slots ${lab}${who}:<div class="ccard"><div class="slots">${out.slice(0,12).map(m=>`<span class="slot">${fmtT(m)}</span>`).join('')}</div></div><div class="opts">${go('Add a walk-in','newAppt')}</div>`:`${lab[0].toUpperCase()+lab.slice(1)} is fully booked${who}! 🎉`}
  if(/next|who.?s coming|coming up/.test(s)){const n=dayAppts(b,0).filter(a=>blocking(a)&&a.start>=nowMin()-5&&(!sf||a.staff===sf.id));
    if(!n.length){const t=dayAppts(b,1).filter(blocking);return t.length?`Nothing more today${who}. First up tomorrow: <b>${nm(t[0])}</b> at ${fmtT(t[0].start)} for ${esc(t[0].svc)}.`:'Nothing more today or tomorrow.'}
    const a=n[0];return `Next up${who}: <b>${nm(a)}</b> at <b>${fmtT(a.start)}</b> for ${esc(a.svc)} with ${esc((b.staff.find(x=>x.id===a.staff)||{}).name||'')}.${n.length>1?` Then ${n.length-1} more today.`:''}<div class="opts">${go('Open details','aInfo',a.id)}${go('Call','remCall',a.id)}</div>`}
  if(/busiest|busy|peak|rush/.test(s)){const days=Array.from({length:7},(_,i)=>({i,n:dayAppts(b,i).filter(blocking).length}));const top=days.slice().sort((x,y)=>y.n-x.n)[0];
    const hrs={};rangeAppts(b,-29,0).filter(ok).forEach(a=>{const h=Math.floor(a.start/60);hrs[h]=(hrs[h]||0)+1});const ph=+Object.entries(hrs).sort((x,y)=>y[1]-x[1])[0][0];
    return `Busiest day this week: <b>${relD(addDays(TODAY,top.i))}</b> with ${top.n} appointments. Your peak hour over the last month is <b>${fmtT(ph*60)}–${fmtT(ph*60+60)}</b>.`}
  if(/popular|top service|best|most booked|which service/.test(s)){const c={};rangeAppts(b,-29,0).filter(ok).forEach(a=>{c[a.svc]=(c[a.svc]||0)+1});const t=Object.entries(c).sort((x,y)=>y[1]-x[1]).slice(0,3);
    return `Top services in the last 30 days:<div class="ccard">${t.map(([n,v],i)=>`<div class="row" style="justify-content:space-between"><span>${i+1}. ${esc(n)}</span><b>${v}</b></div>`).join('')}</div>`}
  if(/remind|contact|follow|call list/.test(s)){const r=rangeAppts(b,0,1).filter(a=>blocking(a)&&!remOf(a.id).contacted&&(a.date>TODAY.getTime()||a.start>nowMin()));
    return r.length?`<b>${r.length}</b> customers for today and tomorrow haven’t been contacted yet.${card(r,5,a=>`${relD(aDate(a))} ${fmtT(a.start)}`)}<div class="opts">${go('Open reminders','dashGo','reminders')}</div>`:'Everyone for today and tomorrow has been contacted. Nice work!'}
  if(/rating|review|star/.test(s)){const rv=reviewsFor(b);return `You’re rated <b>★ ${b.rating}</b> from ${b.reviews} reviews.${rv&&rv[0]?` Latest: “${esc(rv[0].text)}”`:''}`}
  if(/repeat|loyal|regular|top customer|new customer/.test(s)){const c=custData(b);const rep=c.filter(x=>x.visits>1);return `${c.length} customers in the last 60 days, <b>${rep.length}</b> of them repeat visitors. Your most regular: <b>${esc(c[0].name)}</b> (${c[0].visits} visits).<div class="opts">${go('Open customers','dashGo','customers')}</div>`}
  if(/staff|team|doctor|who.?s working|working/.test(s)&&!sf){const t=dayAppts(b,off).filter(ok);return `Staff load ${lab}:<div class="ccard">${b.staff.map(x=>`<div class="row" style="justify-content:space-between"><span>${esc(x.name)}</span><b>${t.filter(a=>a.staff===x.id).length}</b></div>`).join('')}</div>`}
  if(/how many|clients?|customers?|appointments?|bookings?|patients?|schedule|today|tomorrow|yesterday|week|visits?/.test(s)){const t=L.filter(ok);const pe=t.filter(a=>a.status==='pending').length;
    const done=t.filter(a=>isDone(a)&&a.status==='confirmed').length;const left=t.filter(a=>!isDone(a)&&blocking(a)).length;const cx=L.length-t.length;
    if(from===to)return `${lab[0].toUpperCase()+lab.slice(1)}${who} you have <b>${t.length} appointments</b>${off===0?`: ${done} done, ${left} still to come`:''}${pe?`, ${pe} pending`:''}${cx?` and ${cx} cancelled`:''}.${card(off===0?t.filter(a=>!isDone(a)):t)}<div class="opts">${go('Open calendar','dashGo','calendar')}</div>`;
    return `${rl[0].toUpperCase()+rl.slice(1)}${who}: <b>${t.length} appointments</b>${pe?` (${pe} pending)`:''}${cx?`, ${cx} cancelled`:''}.<div class="opts">${go('Open calendar','dashGo','calendar')}</div>`}
  if(/pric|widget|website|embed|link|walk.?in|thank|great|awesome|love|capybara|who are you|^(hi|hello|hey|namaste)\b/.test(s))return null;
  return `Hmm, I’m not sure about that one. Try asking me:<div class="opts">${['How many clients today?','Pending requests','Revenue this month','Free slots tomorrow','Who’s next?','Busiest day this week'].map(ask).join('')}</div>`}
function helpGreeting(){
  if(S.view==='dashboard'&&CUR()){const b=CUR();const t=dayAppts(b,0).filter(a=>a.status!=='cancelled');const r=rangeAppts(b,0,21).filter(isReq).length;
    return `Hi boss! Capi here. You have <b>${t.length} appointments today</b> and <b>${r} requests</b> waiting. Ask me anything about your bookings!<div class="opts">${['How many clients today?','Who’s next?','Pending requests','Revenue this month','Free slots tomorrow','Busiest day this week'].map(q=>`<button data-a="capiAsk" data-v="${q}">${q}</button>`).join('')}</div>`}
  if(S.view==='manage')return `Hi! I’m Capi. Verify your number on this page and I’ll fetch all your bookings!<div class="opts"><button data-a="say" data-v="How do I cancel?">How do I cancel?</button></div>`;
  return `Hey! I’m Capi, your little appointment buddy. What can I do for you today?<div class="opts"><button data-a="say" data-v="How does it work?">How does it work?</button><button data-a="say" data-v="Pricing">Pricing</button><button data-a="say" data-v="Add to my website">Add to my website</button><button data-a="say" data-v="I want to book an appointment">Book an appointment</button></div>`}
function helpQuick(){return S.view==='dashboard'&&CUR()?['Clients today','Pending requests','Revenue this week','Free slots today','Who’s next?']:['How does it work?','Pricing','Add to my website','Talk to the team']}

/* make seeded proposals land on a genuinely free slot */
(function(){let ch=false;BOOKINGS.forEach(k=>{const p=k.proposal;if(!p||p.ok||!isUpcoming(k))return;const b=BIZ[k.biz];if(!b)return;const d=new Date(p.start);const day=startOfDay(d);const dur=kDur(k);
  for(let o=0;o<5;o++){const dd=addDays(day,o);const h=hoursOn(b,dd);if(!h)continue;for(let m=h[0];m+dur<=h[1];m+=(b.slotInt||30)){const st=freeStaff(b,'any',dd,m,dur,k.id);if(st&&dd.getTime()+m*6e4!==k.start){const x=new Date(dd);x.setHours(0,m,0,0);p.start=x.getTime();p.staff=st;p.ok=1;ch=true;return}}}});if(ch)saveDB()})();
window.addEventListener('hashchange',route);
route();
