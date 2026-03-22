import { useState, useEffect } from "react";

const PEER_GROUPS = ["Healthcare (Large)", "Healthcare (Small)", "Senior Living", "Peer Group"];

const STATUS_OPTIONS = ["Not Started", "In Progress", "Complete"];

const EMPTY_FIRM = {
  name: "",
  url: "",
  peerGroup: "Healthcare (Large)",
  status: "Not Started",
  keyTakeaway: "",
  thumbsRating: "",
  
  // Structure & UX
  sitemap: [],
  navStyles: [],
  headingFont: "",
  bodyFont: "",
  primaryColor: "",
  secondaryColor: "",
  accentColor: "",
  paletteNotes: "",
  photoStyles: [],
  visualIdNotes: "",
  animations: [],
  modernity: "",
  mobile: "",
  speed: "",
  structureNotes: "",
  
  // Homepage
  heroHeadline: "",
  heroSubtext: "",
  homepageSections: [],
  sectionOrder: "",
  toneTags: [],
  personality: "",
  readingNotes: "",
  geoSignals: [],
  geoRegions: "",
  clientSizeNotes: "",
  ctaInventory: "",
  homepageNotes: "",
  
  // About
  aboutUrl: "",
  aboutMissionVision: "",
  aboutStoryType: [],
  aboutYearFounded: "",
  aboutMarketsNamed: "",
  aboutAwardsCerts: "",
  aboutClientLogos: "",
  aboutOfficeDetail: "",
  aboutVideoMedia: "",
  aboutWordCount: "",
  aboutJargonDensity: "",
  aboutAiWritingCheck: "",
  aboutAudienceTarget: "",
  aboutCommunityConnection: "",
  aboutWarmthScale: "",
  aboutWeLanguage: "",
  aboutNotablePhrases: "",
  aboutNotes: "",
  
  // People
  peopleUrl: "",
  peopleHeadcount: "",
  peopleOrganization: "",
  peopleInfoPerPerson: "",
  peoplePhotoStyle: "",
  peopleCertifications: "",
  peopleProjectConnection: "",
  peopleCommunityInterests: "",
  peopleCultureContent: "",
  peopleApproachability: "",
  peopleBioDepth: "",
  peopleJargonDensity: "",
  peopleAiWritingCheck: "",
  peopleWarmthScale: "",
  peopleBioConsistency: "",
  peopleNotes: "",
  
  // Portfolio
  portfolioUrl: "",
  totalProjects: "",
  portfolioOrg: "",
  filterCategories: "",
  categoryCounts: "",
  portfolioFeatures: [],
  portfolioEmphasis: [],
  portfolioVideo: "",
  portfolioNotes: "",
  sampleProjectName: "",
  sampleProjectUrl: "",
  sampleWordCount: "",
  sampleParagraphs: "",
  sampleReadingLevel: "",
  narrativeIncludes: [],
  metadataFields: [],
  narrativeTone: [],
  narrativeAbsent: [],
  textAnalysisNotes: "",
  
  // SEO
  domainAuthority: "",
  monthlyTraffic: "",
  topTrafficSource: "",
  bounceRate: "",
  topKeywords: "",
  referralSources: "",
  pageTitle: "",
  metaDescription: "",
  seoNotes: ""
};

const FIELD_DEFINITIONS = {
  navStyles: ["Simple dropdown", "Mega menu", "Hamburger", "Sticky", "Sidebar", "Hybrid"],
  photoStyles: ["Warm / Natural light", "Clinical / Sterile", "Dramatic / Editorial", "Candid / Lifestyle", "Rendering-heavy", "Aerial / Drone", "Detail-focused", "People in spaces", "Empty / Aspirational", "Before/After"],
  animations: ["Parallax scrolling", "Scroll-triggered animations", "Video backgrounds", "Hover effects on cards/images", "Page transition animations", "Loading animations", "Animated statistics/counters", "Micro-interactions", "CSS transitions on navigation", "None / Minimal"],
  modernity: ["Dated", "Average", "Modern", "Cutting Edge"],
  mobile: ["Poor", "Adequate", "Good", "Excellent"],
  speed: ["Slow", "Medium", "Fast"],
  homepageSections: ["Hero/Banner", "Mission/Tagline Statement", "Services Overview", "Market Sectors", "Featured Projects", "Stats/By the Numbers", "Testimonials/Client Quotes", "Team Spotlight", "News/Blog Feed", "Awards/Recognition", "Call to Action", "Video/Media Embed", "Client Logos", "Careers CTA", "Newsletter Signup", "Office Locations"],
  toneTags: ["Corporate", "Warm / Approachable", "Clinical / Technical", "Aspirational", "Conversational", "Academic", "Bold / Confident", "Humble / Understated", "Community-Focused", "Innovation-Forward"],
  personality: ["Low", "Medium", "High"],
  geoSignals: ["Mentions rural healthcare", "Mentions critical access hospitals", "Mentions community hospitals", "Mentions underserved populations", "Mentions FQHC / community health centers", "Positions as national firm", "Positions as regional firm", "Emphasizes local roots", "Lists multiple office locations", "Targets large health systems", "Targets independent / small providers", "Mentions specific states or regions", "Client size language (bed count, revenue, etc.)"],
  aboutStoryType: ["Founding story", "Mission-driven narrative", "Growth/scale", "Technical credentials", "Community roots", "Awards/recognition"],
  aboutJargonDensity: ["Low", "Medium", "High"],
  portfolioFeatures: ["Filterable by sector/type", "Project detail pages", "Before/after imagery", "Outcome metrics / data", "Client testimonials on project pages", "Square footage / budget info", "Process narrative", "Team credits", "Related projects section", "Video walkthroughs", "Photography gallery", "Awards listed per project", "Downloadable case study / PDF"],
  portfolioEmphasis: ["Photography-heavy", "Narrative / Storytelling", "Data / Outcomes", "Process-focused", "Minimal / Grid only"],
  narrativeIncludes: ["Project problem / challenge statement", "Design solution description", "Client goals or vision", "Community context or impact", "Technical / clinical program details", "Sustainability or wellness features", "Construction phasing or delivery method", "Collaboration / process description", "Future-looking or aspirational language", "Quantifiable outcomes (patient satisfaction, efficiency, etc.)", "Named client challenge (specific, not generic)"],
  metadataFields: ["Client name", "Location", "Market / sector", "Size (SF)", "Construction cost / budget", "Services provided", "Completion date", "Certifications (LEED, WELL, etc.)", "Team members credited", "Awards"],
  narrativeTone: ["Firm as subject ('we designed...')", "Client as subject ('the hospital needed...')", "Reads like marketing copy", "Reads like a case study", "Outcome-oriented (what changed after)", "Process-oriented (what they did)"],
  narrativeAbsent: ["No outcomes / metrics", "No testimonial", "No team credits", "No budget / cost", "No process description", "No before condition described", "No community context", "No awards listed", "No related projects", "No downloadable content"]
};

const ChipField = ({ label, options, value = [], onChange }) => {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange(value.filter(v => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };
  
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#5c5549", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            style={{
              padding: "6px 12px",
              fontSize: 12,
              border: value.includes(opt) ? "1px solid #b68d40" : "1px solid #d6d0c8",
              borderRadius: 16,
              background: value.includes(opt) ? "#f5f2ed" : "#fff",
              color: value.includes(opt) ? "#b68d40" : "#5c5549",
              fontWeight: value.includes(opt) ? 600 : 400,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s ease"
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

const TextField = ({ label, value, onChange, placeholder = "", multiline = false }) => {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#5c5549", marginBottom: 6 }}>{label}</div>
      <Tag
        type={multiline ? undefined : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d6d0c8",
          borderRadius: 8,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "#1a1a1a",
          background: "#fff",
          outline: "none",
          resize: multiline ? "vertical" : undefined,
          minHeight: multiline ? 80 : undefined,
          boxSizing: "border-box"
        }}
      />
    </div>
  );
};

const SelectField = ({ label, options, value, onChange }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#5c5549", marginBottom: 6 }}>{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d6d0c8",
          borderRadius: 8,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "#1a1a1a",
          background: "#fff",
          outline: "none",
          boxSizing: "border-box",
          cursor: "pointer"
        }}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
};

export default function WebsiteXRayVision() {
  const [firms, setFirms] = useState({});
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [activeTab, setActiveTab] = useState("structure");
  const [view, setView] = useState("audit"); // "audit" | "compare"

  useEffect(() => {
    const stored = localStorage.getItem("xray-firms");
    if (stored) {
      try {
        setFirms(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored data");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("xray-firms", JSON.stringify(firms));
  }, [firms]);

  const updateFirm = (name, updates) => {
    setFirms(prev => ({
      ...prev,
      [name]: { ...prev[name], ...updates }
    }));
  };

  const addFirm = () => {
    const name = prompt("Enter firm name:");
    if (!name || firms[name]) return;
    setFirms(prev => ({ ...prev, [name]: { ...EMPTY_FIRM, name } }));
    setSelectedFirm(name);
  };

  const importJSON = () => {
    const json = prompt("Paste JSON:");
    if (!json) return;
    try {
      const data = JSON.parse(json);
      if (!data.name) {
        alert("JSON must include 'name' field");
        return;
      }
      setFirms(prev => ({ ...prev, [data.name]: { ...EMPTY_FIRM, ...data } }));
      setSelectedFirm(data.name);
    } catch (e) {
      alert("Invalid JSON");
    }
  };

  const exportJSON = () => {
    if (!selectedFirm) return;
    const json = JSON.stringify(firms[selectedFirm], null, 2);
    navigator.clipboard.writeText(json);
    alert("JSON copied to clipboard");
  };

  const firm = selectedFirm ? firms[selectedFirm] : null;
  const firmList = Object.values(firms).sort((a, b) => a.name.localeCompare(b.name));

  const TABS = [
    { id: "structure", label: "Structure & UX" },
    { id: "homepage", label: "Homepage" },
    { id: "about", label: "About" },
    { id: "people", label: "People" },
    { id: "portfolio", label: "Portfolio" },
    { id: "seo", label: "SEO" }
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f5f2ed", minHeight: "100vh", color: "#1a1a1a" }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "#2c2c2c", padding: "32px 32px 28px", color: "#f5f2ed" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: 2.5, color: "#b68d40", marginBottom: 8 }}>
            MKM Design Group
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, fontWeight: 400, margin: 0, lineHeight: 1.2 }}>
            Website X-Ray Vision
          </h1>
          <p style={{ fontSize: 14, color: "#a09a90", marginTop: 8, marginBottom: 0, maxWidth: 560, lineHeight: 1.5 }}>
            Deep website audits across structure, content, team, portfolio, and SEO.
          </p>

          <div style={{ display: "flex", gap: 0, marginTop: 24 }}>
            {[{ key: "audit", label: "Audit" }, { key: "compare", label: "Compare" }].map(tab => (
              <button
                key={tab.key}
                onClick={() => setView(tab.key)}
                style={{
                  padding: "10px 24px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  borderBottom: view === tab.key ? "2px solid #b68d40" : "2px solid transparent",
                  background: "transparent",
                  color: view === tab.key ? "#f5f2ed" : "#7a756d",
                  transition: "all 0.15s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px 64px" }}>
        {view === "audit" && (
          <div style={{ display: "flex", gap: 32 }}>
            {/* Sidebar */}
            <div style={{ width: 220, flexShrink: 0 }}>
              <button
                onClick={addFirm}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#5c6d5e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: 12
                }}
              >
                + Add Firm
              </button>
              <button
                onClick={importJSON}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#fff",
                  color: "#5c6d5e",
                  border: "1px solid #d6d0c8",
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: 16
                }}
              >
                Import JSON
              </button>

              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#8a8278", marginBottom: 8 }}>
                Firms ({firmList.length})
              </div>
              {firmList.map(f => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFirm(f.name)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 10px",
                    border: "none",
                    borderRadius: 6,
                    background: selectedFirm === f.name ? "#5c6d5e" : "transparent",
                    color: selectedFirm === f.name ? "#fff" : "#1a1a1a",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: selectedFirm === f.name ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.12s ease",
                    marginBottom: 2
                  }}
                >
                  {f.name}
                </button>
              ))}
            </div>

            {/* Main Panel */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {!firm ? (
                <div style={{ background: "#fff", borderRadius: 12, padding: 48, textAlign: "center", border: "1px solid #e8e4df" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>←</div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: "#1a1a1a", marginBottom: 8 }}>
                    Select a firm to begin
                  </div>
                  <div style={{ fontSize: 13, color: "#8a8278" }}>
                    Pick a competitor from the sidebar or add a new one.
                  </div>
                </div>
              ) : (
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e4df" }}>
                  {/* Firm Header */}
                  <div style={{ padding: "24px 28px", borderBottom: "1px solid #e8e4df" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                      <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, fontWeight: 400, margin: 0 }}>
                        {firm.name}
                      </h2>
                      <button
                        onClick={exportJSON}
                        style={{
                          padding: "8px 16px",
                          background: "#f5f2ed",
                          border: "1px solid #d6d0c8",
                          borderRadius: 6,
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          color: "#5c5549"
                        }}
                      >
                        Export JSON
                      </button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                      <SelectField
                        label="Peer Group"
                        options={PEER_GROUPS}
                        value={firm.peerGroup}
                        onChange={(v) => updateFirm(firm.name, { peerGroup: v })}
                      />
                      <SelectField
                        label="Status"
                        options={STATUS_OPTIONS}
                        value={firm.status}
                        onChange={(v) => updateFirm(firm.name, { status: v })}
                      />
                      <TextField
                        label="URL"
                        value={firm.url}
                        onChange={(v) => updateFirm(firm.name, { url: v })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Tabs */}
                  <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #e8e4df", paddingLeft: 28 }}>
                    {TABS.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          padding: "12px 20px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                          border: "none",
                          borderBottom: activeTab === tab.id ? "2px solid #b68d40" : "2px solid transparent",
                          background: "transparent",
                          color: activeTab === tab.id ? "#1a1a1a" : "#8a8278",
                          cursor: "pointer",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div style={{ padding: "24px 28px" }}>
                    {activeTab === "structure" && (
                      <>
                        <ChipField label="Navigation Styles" options={FIELD_DEFINITIONS.navStyles} value={firm.navStyles} onChange={(v) => updateFirm(firm.name, { navStyles: v })} />
                        <TextField label="Heading Font" value={firm.headingFont} onChange={(v) => updateFirm(firm.name, { headingFont: v })} />
                        <TextField label="Body Font" value={firm.bodyFont} onChange={(v) => updateFirm(firm.name, { bodyFont: v })} />
                        <TextField label="Primary Color" value={firm.primaryColor} onChange={(v) => updateFirm(firm.name, { primaryColor: v })} placeholder="#000000" />
                        <TextField label="Secondary Color" value={firm.secondaryColor} onChange={(v) => updateFirm(firm.name, { secondaryColor: v })} />
                        <TextField label="Accent Color" value={firm.accentColor} onChange={(v) => updateFirm(firm.name, { accentColor: v })} />
                        <TextField label="Palette Notes" value={firm.paletteNotes} onChange={(v) => updateFirm(firm.name, { paletteNotes: v })} multiline />
                        <ChipField label="Photography Style" options={FIELD_DEFINITIONS.photoStyles} value={firm.photoStyles} onChange={(v) => updateFirm(firm.name, { photoStyles: v })} />
                        <TextField label="Visual Identity Notes" value={firm.visualIdNotes} onChange={(v) => updateFirm(firm.name, { visualIdNotes: v })} multiline />
                        <ChipField label="Animation & Motion" options={FIELD_DEFINITIONS.animations} value={firm.animations} onChange={(v) => updateFirm(firm.name, { animations: v })} />
                        <SelectField label="Modernity" options={FIELD_DEFINITIONS.modernity} value={firm.modernity} onChange={(v) => updateFirm(firm.name, { modernity: v })} />
                        <SelectField label="Mobile Friendly" options={FIELD_DEFINITIONS.mobile} value={firm.mobile} onChange={(v) => updateFirm(firm.name, { mobile: v })} />
                        <SelectField label="Load Speed" options={FIELD_DEFINITIONS.speed} value={firm.speed} onChange={(v) => updateFirm(firm.name, { speed: v })} />
                        <TextField label="Structure Notes" value={firm.structureNotes} onChange={(v) => updateFirm(firm.name, { structureNotes: v })} multiline />
                      </>
                    )}

                    {activeTab === "homepage" && (
                      <>
                        <TextField label="Hero Headline" value={firm.heroHeadline} onChange={(v) => updateFirm(firm.name, { heroHeadline: v })} />
                        <TextField label="Hero Subtext" value={firm.heroSubtext} onChange={(v) => updateFirm(firm.name, { heroSubtext: v })} multiline />
                        <ChipField label="Homepage Sections" options={FIELD_DEFINITIONS.homepageSections} value={firm.homepageSections} onChange={(v) => updateFirm(firm.name, { homepageSections: v })} />
                        <TextField label="Section Order (top to bottom)" value={firm.sectionOrder} onChange={(v) => updateFirm(firm.name, { sectionOrder: v })} multiline placeholder="e.g., Hero, Services, Projects..." />
                        <ChipField label="Tone Tags" options={FIELD_DEFINITIONS.toneTags} value={firm.toneTags} onChange={(v) => updateFirm(firm.name, { toneTags: v })} />
                        <SelectField label="Personality Level" options={FIELD_DEFINITIONS.personality} value={firm.personality} onChange={(v) => updateFirm(firm.name, { personality: v })} />
                        <TextField label="Reading Level & Language Notes" value={firm.readingNotes} onChange={(v) => updateFirm(firm.name, { readingNotes: v })} multiline />
                        <ChipField label="Geographic & Market Signals" options={FIELD_DEFINITIONS.geoSignals} value={firm.geoSignals} onChange={(v) => updateFirm(firm.name, { geoSignals: v })} />
                        <TextField label="States/Regions Mentioned" value={firm.geoRegions} onChange={(v) => updateFirm(firm.name, { geoRegions: v })} />
                        <TextField label="Client Size Positioning Notes" value={firm.clientSizeNotes} onChange={(v) => updateFirm(firm.name, { clientSizeNotes: v })} multiline />
                        <TextField label="CTAs on Homepage" value={firm.ctaInventory} onChange={(v) => updateFirm(firm.name, { ctaInventory: v })} multiline />
                        <TextField label="Homepage Notes" value={firm.homepageNotes} onChange={(v) => updateFirm(firm.name, { homepageNotes: v })} multiline />
                      </>
                    )}

                    {activeTab === "about" && (
                      <>
                        <TextField label="About Page URL" value={firm.aboutUrl} onChange={(v) => updateFirm(firm.name, { aboutUrl: v })} />
                        <TextField label="Mission/Vision Statement" value={firm.aboutMissionVision} onChange={(v) => updateFirm(firm.name, { aboutMissionVision: v })} multiline />
                        <ChipField label="Story Type" options={FIELD_DEFINITIONS.aboutStoryType} value={firm.aboutStoryType} onChange={(v) => updateFirm(firm.name, { aboutStoryType: v })} />
                        <TextField label="Year Founded / History" value={firm.aboutYearFounded} onChange={(v) => updateFirm(firm.name, { aboutYearFounded: v })} />
                        <TextField label="Markets Named" value={firm.aboutMarketsNamed} onChange={(v) => updateFirm(firm.name, { aboutMarketsNamed: v })} />
                        <TextField label="Awards/Certifications Featured" value={firm.aboutAwardsCerts} onChange={(v) => updateFirm(firm.name, { aboutAwardsCerts: v })} />
                        <TextField label="Client/Partner Logos" value={firm.aboutClientLogos} onChange={(v) => updateFirm(firm.name, { aboutClientLogos: v })} />
                        <TextField label="Office Location Detail" value={firm.aboutOfficeDetail} onChange={(v) => updateFirm(firm.name, { aboutOfficeDetail: v })} />
                        <TextField label="Video/Media on About Page" value={firm.aboutVideoMedia} onChange={(v) => updateFirm(firm.name, { aboutVideoMedia: v })} />
                        <TextField label="Word Count" value={firm.aboutWordCount} onChange={(v) => updateFirm(firm.name, { aboutWordCount: v })} />
                        <SelectField label="Jargon Density" options={FIELD_DEFINITIONS.aboutJargonDensity} value={firm.aboutJargonDensity} onChange={(v) => updateFirm(firm.name, { aboutJargonDensity: v })} />
                        <TextField label="AI Writing Check" value={firm.aboutAiWritingCheck} onChange={(v) => updateFirm(firm.name, { aboutAiWritingCheck: v })} multiline />
                        <TextField label="Audience Target" value={firm.aboutAudienceTarget} onChange={(v) => updateFirm(firm.name, { aboutAudienceTarget: v })} />
                        <TextField label="Community/Rural Connection" value={firm.aboutCommunityConnection} onChange={(v) => updateFirm(firm.name, { aboutCommunityConnection: v })} multiline />
                        <TextField label="Warmth vs Corporate" value={firm.aboutWarmthScale} onChange={(v) => updateFirm(firm.name, { aboutWarmthScale: v })} />
                        <TextField label="'We' Language vs 'The Firm'" value={firm.aboutWeLanguage} onChange={(v) => updateFirm(firm.name, { aboutWeLanguage: v })} />
                        <TextField label="Notable Phrases" value={firm.aboutNotablePhrases} onChange={(v) => updateFirm(firm.name, { aboutNotablePhrases: v })} multiline placeholder="Under 15 words each" />
                        <TextField label="About Page Notes" value={firm.aboutNotes} onChange={(v) => updateFirm(firm.name, { aboutNotes: v })} multiline />
                      </>
                    )}

                    {activeTab === "people" && (
                      <>
                        <TextField label="People Page URL" value={firm.peopleUrl} onChange={(v) => updateFirm(firm.name, { peopleUrl: v })} />
                        <TextField label="Total Headcount" value={firm.peopleHeadcount} onChange={(v) => updateFirm(firm.name, { peopleHeadcount: v })} />
                        <TextField label="Organization Method" value={firm.peopleOrganization} onChange={(v) => updateFirm(firm.name, { peopleOrganization: v })} />
                        <TextField label="Info Per Person" value={firm.peopleInfoPerPerson} onChange={(v) => updateFirm(firm.name, { peopleInfoPerPerson: v })} />
                        <TextField label="Photo Style" value={firm.peoplePhotoStyle} onChange={(v) => updateFirm(firm.name, { peoplePhotoStyle: v })} />
                        <TextField label="Certifications Highlighted" value={firm.peopleCertifications} onChange={(v) => updateFirm(firm.name, { peopleCertifications: v })} />
                        <TextField label="People Connected to Projects" value={firm.peopleProjectConnection} onChange={(v) => updateFirm(firm.name, { peopleProjectConnection: v })} />
                        <TextField label="Community Interests in Bios" value={firm.peopleCommunityInterests} onChange={(v) => updateFirm(firm.name, { peopleCommunityInterests: v })} />
                        <TextField label="Culture/Recruiting Content" value={firm.peopleCultureContent} onChange={(v) => updateFirm(firm.name, { peopleCultureContent: v })} />
                        <TextField label="Approachability Factor" value={firm.peopleApproachability} onChange={(v) => updateFirm(firm.name, { peopleApproachability: v })} multiline />
                        <TextField label="Bio Depth" value={firm.peopleBioDepth} onChange={(v) => updateFirm(firm.name, { peopleBioDepth: v })} />
                        <TextField label="Jargon Density" value={firm.peopleJargonDensity} onChange={(v) => updateFirm(firm.name, { peopleJargonDensity: v })} />
                        <TextField label="AI Writing Check" value={firm.peopleAiWritingCheck} onChange={(v) => updateFirm(firm.name, { peopleAiWritingCheck: v })} multiline />
                        <TextField label="Warmth vs Corporate" value={firm.peopleWarmthScale} onChange={(v) => updateFirm(firm.name, { peopleWarmthScale: v })} />
                        <TextField label="Bio Consistency" value={firm.peopleBioConsistency} onChange={(v) => updateFirm(firm.name, { peopleBioConsistency: v })} />
                        <TextField label="People Page Notes" value={firm.peopleNotes} onChange={(v) => updateFirm(firm.name, { peopleNotes: v })} multiline />
                      </>
                    )}

                    {activeTab === "portfolio" && (
                      <>
                        <TextField label="Portfolio Page URL" value={firm.portfolioUrl} onChange={(v) => updateFirm(firm.name, { portfolioUrl: v })} />
                        <TextField label="Total Projects" value={firm.totalProjects} onChange={(v) => updateFirm(firm.name, { totalProjects: v })} />
                        <TextField label="Organization Method" value={firm.portfolioOrg} onChange={(v) => updateFirm(firm.name, { portfolioOrg: v })} />
                        <TextField label="Filter Categories" value={firm.filterCategories} onChange={(v) => updateFirm(firm.name, { filterCategories: v })} multiline />
                        <TextField label="Counts per Category" value={firm.categoryCounts} onChange={(v) => updateFirm(firm.name, { categoryCounts: v })} multiline />
                        <ChipField label="Portfolio Features" options={FIELD_DEFINITIONS.portfolioFeatures} value={firm.portfolioFeatures} onChange={(v) => updateFirm(firm.name, { portfolioFeatures: v })} />
                        <ChipField label="Presentation Emphasis" options={FIELD_DEFINITIONS.portfolioEmphasis} value={firm.portfolioEmphasis} onChange={(v) => updateFirm(firm.name, { portfolioEmphasis: v })} />
                        <TextField label="Video/Animation Usage" value={firm.portfolioVideo} onChange={(v) => updateFirm(firm.name, { portfolioVideo: v })} />
                        <TextField label="Portfolio Notes" value={firm.portfolioNotes} onChange={(v) => updateFirm(firm.name, { portfolioNotes: v })} multiline />
                        
                        <div style={{ borderTop: "1px solid #e8e4df", paddingTop: 16, marginTop: 16 }}>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#8a8278", marginBottom: 12 }}>
                            Sample Project Text Analysis
                          </div>
                          <TextField label="Project Name" value={firm.sampleProjectName} onChange={(v) => updateFirm(firm.name, { sampleProjectName: v })} />
                          <TextField label="Project URL" value={firm.sampleProjectUrl} onChange={(v) => updateFirm(firm.name, { sampleProjectUrl: v })} />
                          <TextField label="Word Count" value={firm.sampleWordCount} onChange={(v) => updateFirm(firm.name, { sampleWordCount: v })} />
                          <TextField label="Paragraphs" value={firm.sampleParagraphs} onChange={(v) => updateFirm(firm.name, { sampleParagraphs: v })} />
                          <TextField label="Reading Level" value={firm.sampleReadingLevel} onChange={(v) => updateFirm(firm.name, { sampleReadingLevel: v })} />
                          <ChipField label="Narrative Includes" options={FIELD_DEFINITIONS.narrativeIncludes} value={firm.narrativeIncludes} onChange={(v) => updateFirm(firm.name, { narrativeIncludes: v })} />
                          <ChipField label="Metadata Fields Present" options={FIELD_DEFINITIONS.metadataFields} value={firm.metadataFields} onChange={(v) => updateFirm(firm.name, { metadataFields: v })} />
                          <ChipField label="Narrative Tone" options={FIELD_DEFINITIONS.narrativeTone} value={firm.narrativeTone} onChange={(v) => updateFirm(firm.name, { narrativeTone: v })} />
                          <ChipField label="Notably Absent" options={FIELD_DEFINITIONS.narrativeAbsent} value={firm.narrativeAbsent} onChange={(v) => updateFirm(firm.name, { narrativeAbsent: v })} />
                          <TextField label="Text Analysis Notes" value={firm.textAnalysisNotes} onChange={(v) => updateFirm(firm.name, { textAnalysisNotes: v })} multiline />
                        </div>
                      </>
                    )}

                    {activeTab === "seo" && (
                      <>
                        <TextField label="Domain Authority" value={firm.domainAuthority} onChange={(v) => updateFirm(firm.name, { domainAuthority: v })} />
                        <TextField label="Monthly Traffic" value={firm.monthlyTraffic} onChange={(v) => updateFirm(firm.name, { monthlyTraffic: v })} />
                        <TextField label="Top Traffic Source" value={firm.topTrafficSource} onChange={(v) => updateFirm(firm.name, { topTrafficSource: v })} />
                        <TextField label="Bounce Rate" value={firm.bounceRate} onChange={(v) => updateFirm(firm.name, { bounceRate: v })} />
                        <TextField label="Top Keywords" value={firm.topKeywords} onChange={(v) => updateFirm(firm.name, { topKeywords: v })} multiline />
                        <TextField label="Referral Sources" value={firm.referralSources} onChange={(v) => updateFirm(firm.name, { referralSources: v })} multiline />
                        <TextField label="Page Title (homepage <title>)" value={firm.pageTitle} onChange={(v) => updateFirm(firm.name, { pageTitle: v })} />
                        <TextField label="Meta Description" value={firm.metaDescription} onChange={(v) => updateFirm(firm.name, { metaDescription: v })} multiline />
                        <TextField label="SEO Notes" value={firm.seoNotes} onChange={(v) => updateFirm(firm.name, { seoNotes: v })} multiline />
                      </>
                    )}

                    {/* Bottom Section - Key Takeaway & Thumbs */}
                    <div style={{ borderTop: "1px solid #e8e4df", paddingTop: 16, marginTop: 16 }}>
                      <TextField label="Key Takeaway (one sentence)" value={firm.keyTakeaway} onChange={(v) => updateFirm(firm.name, { keyTakeaway: v })} />
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#5c5549", marginBottom: 6 }}>Thumbs Rating</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          {["up", "down"].map(val => (
                            <button
                              key={val}
                              onClick={() => updateFirm(firm.name, { thumbsRating: val })}
                              style={{
                                padding: "10px 20px",
                                fontSize: 20,
                                border: firm.thumbsRating === val ? "2px solid #b68d40" : "1px solid #d6d0c8",
                                borderRadius: 8,
                                background: firm.thumbsRating === val ? "#f5f2ed" : "#fff",
                                cursor: "pointer"
                              }}
                            >
                              {val === "up" ? "👍" : "👎"}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {view === "compare" && (
          <div>
            {firmList.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 12, padding: 48, textAlign: "center", border: "1px solid #e8e4df" }}>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: "#1a1a1a", marginBottom: 8 }}>
                  No firms yet
                </div>
                <div style={{ fontSize: 13, color: "#8a8278" }}>
                  Add firms in the Audit view to see comparisons here.
                </div>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e4df", padding: "24px 28px" }}>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, marginBottom: 16 }}>
                  Firm Comparison
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: "12px 16px", borderBottom: "2px solid #e8e4df", fontFamily: "'DM Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#8a8278" }}>Firm</th>
                        <th style={{ textAlign: "left", padding: "12px 16px", borderBottom: "2px solid #e8e4df", fontFamily: "'DM Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#8a8278" }}>Peer Group</th>
                        <th style={{ textAlign: "left", padding: "12px 16px", borderBottom: "2px solid #e8e4df", fontFamily: "'DM Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#8a8278" }}>Status</th>
                        <th style={{ textAlign: "center", padding: "12px 16px", borderBottom: "2px solid #e8e4df", fontFamily: "'DM Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#8a8278" }}>Thumbs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {firmList.map((f, i) => (
                        <tr key={f.name} style={{ background: i % 2 === 0 ? "#fff" : "#faf8f5" }}>
                          <td style={{ padding: "12px 16px", borderBottom: "1px solid #e8e4df", fontWeight: 600 }}>{f.name}</td>
                          <td style={{ padding: "12px 16px", borderBottom: "1px solid #e8e4df" }}>{f.peerGroup}</td>
                          <td style={{ padding: "12px 16px", borderBottom: "1px solid #e8e4df" }}>{f.status}</td>
                          <td style={{ padding: "12px 16px", borderBottom: "1px solid #e8e4df", textAlign: "center", fontSize: 18 }}>
                            {f.thumbsRating === "up" ? "👍" : f.thumbsRating === "down" ? "👎" : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
