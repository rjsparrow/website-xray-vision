import { useState, useEffect, useCallback, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────
const A = "#5c6d5e", AW = "#b68d40", BG = "#e8e4dd", C = "#fff", BD = "#e8e4df", M = "#8a8278", D = "#1a1a1a", S = "#f5f2ed";
const s = (x={}) => ({fontFamily:"'DM Sans',sans-serif",...x});
const m = (x={}) => ({fontFamily:"'DM Mono',monospace",...x});

// ─── CHIP OPTIONS ────────────────────────────────────────────────────
const PEER_GROUPS = ["Healthcare (Large)","Healthcare (Small)","Senior Living","Peer Group"];
const STATUS_OPTIONS = ["Not Started","In Progress","Complete"];
const NAV_STYLES = ["Simple Dropdown","Mega Menu","Hamburger Only","Sticky Nav","Sidebar Nav","Hybrid"];
const ANIMATION_FEATURES = ["Parallax scrolling","Scroll-triggered animations","Video backgrounds","Hover effects on cards/images","Page transition animations","Loading animations","Animated statistics/counters","Micro-interactions","CSS transitions on navigation","None / Minimal"];
const PHOTO_STYLES = ["Warm / Natural light","Clinical / Sterile","Dramatic / Editorial","Candid / Lifestyle","Rendering-heavy","Aerial / Drone","Detail-focused","People in spaces","Empty / Aspirational","Before/After"];
const MODERNITY = ["Dated","Average","Modern","Cutting Edge"];
const MOBILE = ["Poor","Adequate","Good","Excellent"];
const SPEED = ["Slow","Medium","Fast"];
const HP_SECTIONS = ["Hero / Banner","Mission / Tagline Statement","Services Overview","Market Sectors","Featured Projects","Stats / By the Numbers","Testimonials / Client Quotes","Team Spotlight","News / Blog Feed","Awards / Recognition","Call to Action","Video / Media Embed","Client Logos","Careers CTA","Newsletter Signup","Office Locations"];
const TONE_TAGS = ["Corporate","Warm / Approachable","Clinical / Technical","Aspirational","Conversational","Academic","Bold / Confident","Humble / Understated","Community-Focused","Innovation-Forward"];
const PERSONALITY = ["Low","Medium","High"];
const GEO_SIGNALS = ["Mentions rural healthcare","Mentions critical access hospitals","Mentions community hospitals","Mentions underserved populations","Mentions FQHC / community health centers","Positions as national firm","Positions as regional firm","Emphasizes local roots","Lists multiple office locations","Targets large health systems","Targets independent / small providers","Mentions specific states or regions","Client size language (bed count, revenue, etc.)"];
const PORT_FEATURES = ["Filterable by sector/type","Project detail pages","Before/after imagery","Outcome metrics / data","Client testimonials on project pages","Square footage / budget info","Process narrative","Team credits","Related projects section","Video walkthroughs","Photography gallery","Awards listed per project","Downloadable case study / PDF"];
const PORT_EMPHASIS = ["Photography-heavy","Narrative / Storytelling","Data / Outcomes","Process-focused","Minimal / Grid only"];
const NARR_INCLUDES = ["Project problem / challenge statement","Design solution description","Client goals or vision","Community context or impact","Technical / clinical program details","Sustainability or wellness features","Construction phasing or delivery method","Collaboration / process description","Future-looking or aspirational language","Quantifiable outcomes (patient satisfaction, efficiency, etc.)","Named client challenge (specific, not generic)"];
const META_FIELDS = ["Client name","Location","Market / sector","Size (SF)","Construction cost / budget","Services provided","Completion date","Certifications (LEED, WELL, etc.)","Team members credited","Awards"];
const NARR_TONE = ["Firm as subject ('we designed...')","Client as subject ('the hospital needed...')","Reads like marketing copy","Reads like a case study","Outcome-oriented (what changed after)","Process-oriented (what they did)"];
const NARR_ABSENT = ["No outcomes / metrics","No testimonial","No team credits","No budget / cost","No process description","No before condition described","No community context","No awards listed","No related projects","No downloadable content"];
const ABOUT_STORY = ["Founding story","Mission-driven narrative","Growth / scale","Technical credentials","Community roots","Awards / recognition"];
const JARGON = ["Low","Medium","High"];
const WARMTH = ["Very Corporate","Somewhat Corporate","Neutral","Somewhat Warm","Very Warm"];

// ─── STORAGE ────────────────
const SK = "xray-v5-firms", SO = "xray-v5-order";
async function sGet(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } }
async function sSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) { console.error(e); } }
async function imgGet(firmId, slot) { try { return localStorage.getItem(`xray-img-${firmId}-${slot}`) || null; } catch { return null; } }
async function imgSet(firmId, slot, data) { try { if (data) { localStorage.setItem(`xray-img-${firmId}-${slot}`, data); } else { localStorage.removeItem(`xray-img-${firmId}-${slot}`); } } catch(e) { console.error(e); } }
const IMG_SLOTS = ["logo","hero","fullPage","portfolio","aboutScreenshot","peopleScreenshot"];

// ─── UI COMPONENTS ───────────────────────────────────────────────
const inputSt = {...s(),width:"100%",padding:"10px 12px",border:`1px solid #d6d0c8`,borderRadius:8,fontSize:13,color:D,background:C,outline:"none",boxSizing:"border-box"};
const txSt = {...inputSt,minHeight:80,resize:"vertical",background:S};
const cardSt = {background:C,borderRadius:12,border:`1px solid ${BD}`,padding:"24px 28px",marginBottom:20};
const lblSt = {...m(),fontSize:12,textTransform:"uppercase",letterSpacing:1.8,color:M,marginBottom:10};
const fldSt = {...s(),fontSize:12,fontWeight:600,color:"#5c5549",marginBottom:4};

const SL = ({children}) => <div style={lblSt}>{children}</div>;
const FL = ({children}) => <div style={fldSt}>{children}</div>;
const Chip = ({text,active,onClick}) => <button onClick={onClick} style={{...s(),fontSize:12,padding:"5px 14px",borderRadius:20,border:active?`1.5px solid ${A}`:`1.5px solid ${BD}`,background:active?A:"transparent",color:active?"#fff":"#5c5549",cursor:"pointer",fontWeight:active?600:400,transition:"all 0.15s ease",margin:"0 6px 6px 0"}}>{text}</button>;
const ChipSet = ({items,selected=[],onChange}) => <div style={{display:"flex",flexWrap:"wrap",marginBottom:16}}>{items.map(i=><Chip key={i} text={i} active={selected.includes(i)} onClick={()=>{const c=[...selected];c.includes(i)?onChange(c.filter(x=>x!==i)):onChange([...c,i]);}}/>)}</div>;

let _setPreview = null;

const ImageSlot = ({image,onUpload,onDelete,label,height=180,contain=false}) => {
  const ref = useRef(null);
  const handle = (e) => { const f=e.target.files?.[0]; if(!f)return; const r=new FileReader(); r.onload=(ev)=>onUpload(ev.target.result); r.readAsDataURL(f); };
  return <div style={{marginBottom:12}}>
    <FL>{label}</FL>
    {image ? <div style={{position:"relative",borderRadius:8,overflow:"hidden",border:`1px solid ${BD}`,background:contain?"#f0ece6":"transparent"}}>
      <img src={image} alt={label} onClick={()=>_setPreview&&_setPreview(image)} style={{width:"100%",height:height||"auto",objectFit:contain?"contain":"cover",objectPosition:"top",display:"block",padding:contain?8:0,boxSizing:"border-box",cursor:"pointer"}}/>
      <button onClick={onDelete} style={{position:"absolute",top:8,right:8,width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,0.6)",color:"#fff",border:"none",cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
    </div> : <div onClick={()=>ref.current?.click()} style={{width:"100%",height:height||180,borderRadius:8,border:`2px dashed #d6d0c8`,background:S,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",color:M,...s(),fontSize:12,boxSizing:"border-box"}}>
      <div style={{fontSize:24,marginBottom:4,opacity:0.4}}>📷</div><div>Click to upload</div>
    </div>}
    <input ref={ref} type="file" accept="image/*" onChange={handle} style={{display:"none"}}/>
  </div>;
};

const TwoColLayout = ({children,screenshot,onScreenshot,onDelete,label}) => {
  const ref = useRef(null);
  const handle = (e) => { const f=e.target.files?.[0]; if(!f)return; const r=new FileReader(); r.onload=(ev)=>onScreenshot(ev.target.result); r.readAsDataURL(f); };
  return <div style={{display:"flex",gap:24,alignItems:"flex-start"}}>
    <div style={{flex:"2 1 0",minWidth:0}}>{children}</div>
    <div style={{flex:"1 1 0",minWidth:200,position:"sticky",top:24}}>
      <FL>{label}</FL>
      {screenshot?<div style={{position:"relative",borderRadius:8,overflow:"hidden",border:`1px solid ${BD}`}}>
        <img src={screenshot} alt={label} onClick={()=>_setPreview&&_setPreview(screenshot)} style={{width:"100%",display:"block",objectPosition:"top",cursor:"pointer"}}/>
        <button onClick={onDelete} style={{position:"absolute",top:8,right:8,width:28,height:28,borderRadius:"50%",background:"rgba(0,0,0,0.6)",color:"#fff",border:"none",cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
      </div>:<div onClick={()=>ref.current?.click()} style={{width:"100%",minHeight:300,borderRadius:8,border:`2px dashed #d6d0c8`,background:S,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",color:M,...s(),fontSize:12}}>
        <div style={{fontSize:24,marginBottom:4,opacity:0.4}}>📷</div><div>Upload full page</div>
      </div>}
      <input ref={ref} type="file" accept="image/*" onChange={handle} style={{display:"none"}}/>
    </div>
  </div>;
};

// ─── TABS ────────────────────────────────────────────────────────────
const TabStructure = ({firm:d,onChange:o}) => (
  <div style={cardSt}>
    <SL>Visual Design & Technical Quality</SL>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <div><FL>Heading Font</FL><input value={d.headingFont||""} onChange={e=>o("headingFont",e.target.value)} style={inputSt}/></div>
      <div><FL>Body Font</FL><input value={d.bodyFont||""} onChange={e=>o("bodyFont",e.target.value)} style={inputSt}/></div>
    </div>
    <FL>Animation & Motion</FL>
    <ChipSet items={ANIMATION_FEATURES} selected={d.animations||[]} onChange={v=>o("animations",v)}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
      {[["Modernity","modernity",MODERNITY],["Mobile Friendly","mobile",MOBILE],["Load Speed","speed",SPEED]].map(([l,k,opts])=><div key={k}><FL>{l}</FL><select value={d[k]||""} onChange={e=>o(k,e.target.value)} style={{...inputSt,cursor:"pointer"}}><option value="">Select...</option>{opts.map(x=><option key={x} value={x}>{x}</option>)}</select></div>)}
    </div>
  </div>
);

// ... (TabHomepage, TabAbout, TabPeople, TabPortfolio, TabSEO, CompareMatrix components would go here - keeping short for brevity)

// ─── MAIN APP ────────────────────────────────────────────────────────
const TABS = [
  {id:"structure",label:"Structure & UX"},
  {id:"homepage",label:"Homepage"},
  {id:"about",label:"About"},
  {id:"people",label:"People"},
  {id:"portfolio",label:"Portfolio"},
  {id:"seo",label:"SEO & Traffic"},
];

export default function XRayVision({ onBack }) {
  const [firms, setFirms] = useState({});
  const [order, setOrder] = useState([]);
  const [sel,setSel] = useState(null);
  const [tab,setTab] = useState(null);
  const [view,setView] = useState("audit");
  const [search,setSearch] = useState("");
  const [loaded,setLoaded] = useState(false);
  const [trayOpen,setTrayOpen] = useState(false);
  const [images,setImages] = useState({});
  const [newName,setNewName] = useState("");
  const [newUrl,setNewUrl] = useState("");
  const [newGroup,setNewGroup] = useState(PEER_GROUPS[0]);
  const [previewImg,setPreviewImg] = useState(null);
  _setPreview = setPreviewImg;

  // Load from LocalStorage
  useEffect(()=>{(async()=>{
    const d = await sGet(SK)||{};
    const o = await sGet(SO)||[];
    setFirms(d); 
    setOrder(o);
    const imgs = {};
    for(const id of o) { 
        imgs[id]={}; 
        for(const slot of IMG_SLOTS) { 
            const img = await imgGet(id,slot); 
            if(img) imgs[id][slot]=img; 
        } 
    }
    setImages(imgs);
    setLoaded(true);
  })();},[]);

  // Auto-save
  useEffect(()=>{ if(loaded) sSet(SK,firms); },[firms,loaded]);
  useEffect(()=>{ if(loaded) sSet(SO,order); },[order,loaded]);

  const updateFirm = useCallback((key,value)=>{
    if(!sel) return;
    const now = new Date().toISOString().split("T")[0];
    setFirms(p=>({...p,[sel]:{...p[sel],[key]:value,lastReviewed:now}}));
  },[sel]);

  const updateImage = useCallback((slot,data)=>{
    if(!sel) return;
    imgSet(sel,slot,data);
    setImages(p=>({...p,[sel]:{...(p[sel]||{}),[slot]:data}}));
  },[sel]);

  const addFirm = () => {
    if(!newName.trim()) return;
    const id = Date.now().toString();
    const firm = {id,name:newName.trim(),url:newUrl.trim(),peerGroup:newGroup,status:"Not Started",lastReviewed:new Date().toISOString().split("T")[0]};
    setFirms(p=>({...p,[id]:firm})); 
    setOrder(p=>[...p,id]);
    setSel(id); 
    setTrayOpen(false); 
    setNewName("");
  };

  const cur = sel?firms[sel]:null;
  const curImgs = sel?(images[sel]||{}):{};

  if(!loaded) return <div style={{...s(),background:BG,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:M}}>Loading X-Ray Vision...</div>;

  return (
    <div style={{...s(),background:BG,minHeight:"100vh",color:D}}>
      {/* HEADER */}
      <div style={{background:"#2c2c2c",padding:"32px 32px 28px",color:"#f5f2ed"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{...m(),fontSize:11,textTransform:"uppercase",letterSpacing:2.5,color:AW,marginBottom:8}}>MKM Design Group</div>
          <h1 style={{...s(),fontSize:32,fontWeight:700,margin:0}}>Website X-Ray Vision</h1>
          <div style={{display:"flex",gap:0,marginTop:24}}>
            {[{k:"audit",l:"Audit Firms"},{k:"matrix",l:"Compare All"}].map(t=>
              <button key={t.k} onClick={()=>setView(t.k)} style={{padding:"10px 24px",...s(),fontSize:13,fontWeight:600,border:"none",cursor:"pointer",borderBottom:view===t.k?`2px solid ${AW}`:"2px solid transparent",background:"transparent",color:view===t.k?"#f5f2ed":"#7a756d"}}>{t.l}</button>
            )}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 32px 64px"}}>
        {view === "audit" && (
            sel ? (
                <div>
                    <button onClick={()=>setSel(null)} style={{...s(),fontSize:13,color:A,background:"none",border:"none",cursor:"pointer",marginBottom:16}}>← Back to List</button>
                    <div style={cardSt}>
                        <h2>{cur.name}</h2>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                            <ImageSlot image={curImgs.logo} onUpload={img=>updateImage("logo",img)} onDelete={()=>updateImage("logo",null)} label="Logo" height={100} contain/>
                            <div>
                                <FL>Website URL</FL>
                                <input value={cur.url||""} onChange={e=>updateFirm("url",e.target.value)} style={inputSt}/>
                            </div>
                        </div>
                    </div>
                    <TabStructure firm={cur} onChange={updateFirm} />
                </div>
            ) : (
                <div style={cardSt}>
                    <h3>Add a Firm</h3>
                    <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Firm Name" style={{...inputSt, marginBottom:10}} />
                    <button onClick={addFirm} style={{padding:"10px 20px", background:A, color:"#fff", border:"none", borderRadius:8}}>Add Firm</button>
                    <div style={{marginTop:20}}>
                        {order.map(id => (
                            <div key={id} onClick={()=>setSel(id)} style={{padding:12, borderBottom:`1px solid ${BD}`, cursor:"pointer"}}>
                                {firms[id].name}
                            </div>
                        ))}
                    </div>
                </div>
            )
        )}
      </div>
    </div>
  );
}
