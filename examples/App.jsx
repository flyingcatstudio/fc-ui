import React from 'react';
import { useState } from 'react';
import {
  Search, Bell, Settings, Home, FileText, BarChart3, Users, Calendar,
  Package, ChevronRight, Plus, Activity, Inbox, Zap, RefreshCw, Check,
  Type, MousePointer, Tag, FormInput, Image as ImageIcon, List, Square,
  Compass, MoreHorizontal, ArrowRight, Hash, Sparkles, Layout,
  MessageSquare, Eye, Star, ArrowLeft, MoreVertical,
} from 'lucide-react';

import {
  FcProvider, useFc, THEMES, HolyGrail,
  // Typography
  FcTitle, FcEm, FcSubtitle, FcText, FcCaption, FcEyebrow, FcLabel,
  // Buttons
  FcButton, FcIconButton, FcSwitch, FcSegmented,
  // Tags
  FcTag, FcBadge, FcKbd, FcChip, FcDot,
  // Form
  FcInput, FcTextarea, FcCheckbox, FcRadio, FcSelect, FcSlider,
  // Display
  FcAvatar, FcAvatarGroup, FcProgress, FcSpinner, FcMetric,
  // Disclosure
  FcAccordion, FcAccordionItem, FcTabs,
  // Feedback
  FcAlert, FcToastProvider, useToast, FcEmpty, FcTooltip, FcModal,
  // Container
  FcCard, FcPanel, FcDivider, FcSection, FcRow,
  // Nav
  FcNavGroup, FcNavItem, FcBreadcrumb, FcLogo, FcThemeSwitcher,
  FcDotNavigation, FcDialNav,
} from '@fcstudio/fc-ui';

const CATEGORIES = [
  { id:'typography', label:'Typography', icon:Type },
  { id:'buttons',    label:'Buttons',    icon:MousePointer },
  { id:'tags',       label:'Tags & Badges', icon:Tag },
  { id:'form',       label:'Form',       icon:FormInput },
  { id:'display',    label:'Display',    icon:ImageIcon },
  { id:'disclosure', label:'Disclosure', icon:List },
  { id:'feedback',   label:'Feedback',   icon:Bell },
  { id:'container',  label:'Container',  icon:Square },
  { id:'navigation', label:'Navigation', icon:Compass },
];

const Demo = ({ name, desc, children, span=1 }) => (
  <div style={{ gridColumn:`span ${span}`, display:'flex', flexDirection:'column', gap:14, padding:18, background:'var(--fc-surface)', border:'var(--fc-border-width) solid var(--fc-line)', borderRadius:'var(--fc-r-md)' }}>
    <div>
      <div style={{ fontSize:11, fontFamily:'var(--fc-font-mono)', color:'var(--fc-accent)', letterSpacing:'0.08em', marginBottom:4 }}>{name}</div>
      {desc && <div style={{ fontSize:12, color:'var(--fc-ink-3)' }}>{desc}</div>}
    </div>
    <div style={{ display:'flex', flexWrap:'wrap', gap:10, alignItems:'flex-start' }}>{children}</div>
  </div>
);

const Grid = ({ children, cols=2 }) => (
  <div style={{ display:'grid', gridTemplateColumns:`repeat(${cols}, 1fr)`, gap:14 }}>{children}</div>
);

const TypographyShowcase = () => (
  <Grid cols={1}>
    <Demo name="FcTitle" desc="Display heading, theme-aware font scaling">
      <FcTitle>Good evening, <FcEm>Jihyun</FcEm></FcTitle>
    </Demo>
    <Demo name="FcSubtitle · FcText · FcCaption · FcEyebrow · FcLabel">
      <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%' }}>
        <FcEyebrow>SECTION · EYEBROW</FcEyebrow>
        <FcSubtitle>Subtitle text — for paragraph leads below a title. Limited to 560px max width by default.</FcSubtitle>
        <FcText>Body text — for general paragraphs. Sized at 13px for comfortable reading.</FcText>
        <FcText muted>Muted body — same component, muted prop applied.</FcText>
        <FcCaption>Caption · monospace small text</FcCaption>
        <FcLabel required htmlFor="x">Form label (required marker)</FcLabel>
      </div>
    </Demo>
  </Grid>
);

const ButtonsShowcase = () => {
  const [seg, setSeg] = useState('day');
  const [sw, setSw] = useState(true);
  const [sw2, setSw2] = useState(false);
  return (
    <Grid>
      <Demo name="FcButton" desc="5 variants × 3 sizes" span={2}>
        <FcButton variant="primary" icon={<Zap size={13}/>}>Primary</FcButton>
        <FcButton variant="outline">Outline</FcButton>
        <FcButton variant="soft">Soft</FcButton>
        <FcButton variant="ghost">Ghost</FcButton>
        <FcButton variant="danger">Danger</FcButton>
        <FcButton disabled>Disabled</FcButton>
        <FcButton size="sm">Small</FcButton>
        <FcButton size="md">Medium</FcButton>
        <FcButton size="lg" icon={<ArrowRight size={14}/>}>Large</FcButton>
      </Demo>
      <Demo name="FcIconButton">
        <FcIconButton><Bell size={15}/></FcIconButton>
        <FcIconButton active><Settings size={15}/></FcIconButton>
        <FcIconButton><MoreHorizontal size={15}/></FcIconButton>
      </Demo>
      <Demo name="FcSwitch" desc="Toggle on/off">
        <FcSwitch checked={sw} onChange={setSw}/>
        <FcSwitch checked={sw2} onChange={setSw2}/>
        <FcSwitch size="sm" checked={sw} onChange={setSw}/>
      </Demo>
      <Demo name="FcSegmented" desc="Pick one of N" span={2}>
        <FcSegmented value={seg} onChange={setSeg} options={[
          { value:'day', label:'Day' }, { value:'week', label:'Week' },
          { value:'month', label:'Month' }, { value:'year', label:'Year' },
        ]}/>
        <FcCaption>selected: {seg}</FcCaption>
      </Demo>
    </Grid>
  );
};

const TagsShowcase = () => {
  const [chips, setChips] = useState(['React','Tailwind','Vite']);
  const [chipSel, setChipSel] = useState('Design');
  return (
    <Grid>
      <Demo name="FcTag" desc="Status pill, 5 tones" span={2}>
        <FcTag>default</FcTag>
        <FcTag tone="accent">accent</FcTag>
        <FcTag tone="success" leading={<Check size={9}/>}>parsed</FcTag>
        <FcTag tone="warn">flagged</FcTag>
        <FcTag tone="danger">error</FcTag>
      </Demo>
      <Demo name="FcBadge" desc="Count or dot overlay">
        <FcBadge count={3}><FcIconButton><Bell size={15}/></FcIconButton></FcBadge>
        <FcBadge count={128}><FcIconButton><Inbox size={15}/></FcIconButton></FcBadge>
        <FcBadge dot><FcIconButton><MessageSquare size={15}/></FcIconButton></FcBadge>
      </Demo>
      <Demo name="FcKbd">
        <span style={{ fontSize:12, color:'var(--fc-ink-2)' }}>Press <FcKbd inline>⌘</FcKbd>+<FcKbd inline>K</FcKbd> to search</span>
      </Demo>
      <Demo name="FcChip" desc="Removable & selectable" span={2}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {chips.map(c => (
            <FcChip key={c} onRemove={() => setChips(chips.filter(x=>x!==c))}>{c}</FcChip>
          ))}
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:8 }}>
          {['Design','Code','Docs','Ops'].map(c => (
            <FcChip key={c} selected={chipSel===c} onClick={() => setChipSel(c)}>{c}</FcChip>
          ))}
        </div>
      </Demo>
      <Demo name="FcDot" desc="Status indicator">
        <FcDot color="var(--fc-success)" pulse/>
        <FcDot color="var(--fc-warn)"/>
        <FcDot color="var(--fc-danger)"/>
        <FcDot size={10} color="var(--fc-accent)"/>
      </Demo>
    </Grid>
  );
};

const FormShowcase = () => {
  const [text, setText] = useState('');
  const [area, setArea] = useState('');
  const [chk, setChk] = useState(true);
  const [radio, setRadio] = useState('a');
  const [sel, setSel] = useState('react');
  const [slider, setSlider] = useState(60);
  return (
    <Grid>
      <Demo name="FcInput" span={2}>
        <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:6 }}>
          <FcLabel htmlFor="search">Search projects</FcLabel>
          <FcInput id="search" leading={<Search size={14} color="var(--fc-ink-3)"/>}
            trailing={<FcKbd>⌘K</FcKbd>} placeholder="Type to search…"
            value={text} onChange={setText}/>
        </div>
      </Demo>
      <Demo name="FcTextarea" span={2}>
        <div style={{ width:'100%' }}>
          <FcLabel>Notes</FcLabel>
          <FcTextarea value={area} onChange={setArea} placeholder="Write something…"/>
        </div>
      </Demo>
      <Demo name="FcCheckbox · FcRadio" span={2}>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <FcCheckbox checked={chk} onChange={setChk} label="Send me weekly digests"/>
          <FcCheckbox checked={!chk} onChange={v=>setChk(!v)} label="Subscribe to product updates"/>
          <div style={{ display:'flex', gap:18, marginTop:6 }}>
            {[['a','Auto'],['b','Light'],['c','Dark']].map(([v,l]) => (
              <FcRadio key={v} checked={radio===v} onChange={()=>setRadio(v)} label={l}/>
            ))}
          </div>
        </div>
      </Demo>
      <Demo name="FcSelect" desc="Custom dropdown with click-outside">
        <FcSelect value={sel} onChange={setSel} options={[
          { value:'react', label:'React' }, { value:'vue', label:'Vue' },
          { value:'svelte', label:'Svelte' }, { value:'solid', label:'Solid' },
        ]}/>
      </Demo>
      <Demo name="FcSlider">
        <div style={{ width:'100%' }}>
          <FcSlider value={slider} onChange={setSlider} suffix="%"/>
        </div>
      </Demo>
    </Grid>
  );
};

const DisplayShowcase = () => {
  const [progress, setProgress] = useState(35);
  return (
    <Grid>
      <Demo name="FcAvatar" desc="Initials, sizes, tones" span={2}>
        <FcAvatar size={28}>JH</FcAvatar>
        <FcAvatar size={36}>MK</FcAvatar>
        <FcAvatar size={44} tone="muted">SY</FcAvatar>
        <FcAvatar size={36}>★</FcAvatar>
      </Demo>
      <Demo name="FcAvatarGroup" desc="Stacked with overflow">
        <FcAvatarGroup avatars={[
          { label:'JH' }, { label:'MK' }, { label:'SY' }, { label:'EJ' }, { label:'TK' }, { label:'PB' },
        ]} max={4}/>
      </Demo>
      <Demo name="FcProgress" span={2}>
        <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:12 }}>
          <FcProgress value={progress}/>
          <FcProgress value={75}/>
          <FcProgress indeterminate/>
          <div style={{ display:'flex', gap:8 }}>
            <FcButton size="sm" variant="outline" onClick={()=>setProgress(Math.max(0,progress-10))}>−10</FcButton>
            <FcButton size="sm" variant="outline" onClick={()=>setProgress(Math.min(100,progress+10))}>+10</FcButton>
            <FcCaption>{progress}%</FcCaption>
          </div>
        </div>
      </Demo>
      <Demo name="FcSpinner">
        <FcSpinner size={16}/><FcSpinner size={22}/><FcSpinner size={28}/>
      </Demo>
      <Demo name="FcMetric" span={2}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10, width:'100%' }}>
          <FcMetric label="Parsed" value="1,284" delta="+12.4%"/>
          <FcMetric label="Latency" value="342ms" delta="−18ms"/>
          <FcMetric label="Errors" value="47" delta="+5" tone="down"/>
        </div>
      </Demo>
    </Grid>
  );
};

const DisclosureShowcase = () => {
  const [tab, setTab] = useState('overview');
  return (
    <Grid cols={1}>
      <Demo name="FcAccordion" desc="Single-open accordion with chevron rotation">
        <div style={{ width:'100%' }}>
          <FcAccordion defaultOpen={0}>
            <FcAccordionItem title="What is fc-ui?" icon={<Sparkles size={14} color="var(--fc-accent)"/>}>
              A theme-aware React component library with Dashboard, Glass, and 8-bit presets.
              All components consume CSS variables — swap a theme, every component reskins.
            </FcAccordionItem>
            <FcAccordionItem title="How does theming work?" icon={<Layout size={14} color="var(--fc-accent)"/>}>
              {'<FcProvider>'} injects CSS variables on a root scope; components reference them via var().
              No prop drilling, no per-component theme prop.
            </FcAccordionItem>
            <FcAccordionItem title="Can I add my own theme?" icon={<Plus size={14} color="var(--fc-accent)"/>}>
              Add a new entry to the THEMES map with the same variable keys. The switcher auto-includes it.
            </FcAccordionItem>
          </FcAccordion>
        </div>
      </Demo>
      <Demo name="FcTabs" desc="Underline-style tab switcher">
        <div style={{ width:'100%' }}>
          <FcTabs value={tab} onChange={setTab} tabs={[
            { value:'overview', label:'Overview', content: <FcText>Overview tab content — a quick summary of the project.</FcText> },
            { value:'specs', label:'Specs', content: <FcText>Specs tab — list of technical specifications.</FcText> },
            { value:'changelog', label:'Changelog', content: <FcText>Changelog tab — version history and notable changes.</FcText> },
          ]}/>
        </div>
      </Demo>
    </Grid>
  );
};

const FeedbackShowcase = () => {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  return (
    <Grid cols={1}>
      <Demo name="FcAlert" desc="Info, success, warn, danger">
        <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
          <FcAlert tone="info" title="Heads up" onClose={()=>{}}>You're using the dashboard theme. Try Glass or 8-bit.</FcAlert>
          <FcAlert tone="success" title="Saved">Your changes have been saved to the cloud.</FcAlert>
          <FcAlert tone="warn" title="Disk usage high">You're using 87% of your storage quota.</FcAlert>
          <FcAlert tone="danger" title="Action failed">Could not parse document — please retry.</FcAlert>
        </div>
      </Demo>
      <Demo name="FcToast" desc="Imperative push, auto-dismiss in 3s">
        <FcButton variant="outline" onClick={()=>toast({ message:'Saved successfully', tone:'success' })}>Trigger success</FcButton>
        <FcButton variant="outline" onClick={()=>toast({ message:'Failed to connect', tone:'danger' })}>Trigger danger</FcButton>
        <FcButton variant="outline" onClick={()=>toast({ message:'Heads up — your session expires soon', tone:'warn' })}>Trigger warn</FcButton>
      </Demo>
      <Demo name="FcTooltip">
        <FcTooltip label="Refresh data"><FcIconButton><RefreshCw size={15}/></FcIconButton></FcTooltip>
        <FcTooltip label="Send message" side="bottom"><FcIconButton><MessageSquare size={15}/></FcIconButton></FcTooltip>
        <FcTooltip label="View profile"><FcIconButton><Eye size={15}/></FcIconButton></FcTooltip>
      </Demo>
      <Demo name="FcModal" desc="Centered overlay, Escape closes">
        <FcButton onClick={()=>setOpen(true)}>Open dialog</FcButton>
        <FcModal open={open} onClose={()=>setOpen(false)} title="Delete project"
          footer={<>
            <FcButton variant="ghost" onClick={()=>setOpen(false)}>Cancel</FcButton>
            <FcButton variant="danger" onClick={()=>{setOpen(false); toast({ message:'Project deleted', tone:'danger' });}}>Delete</FcButton>
          </>}>
          This action is permanent. All associated files, deployments, and analytics will be removed.
        </FcModal>
      </Demo>
      <Demo name="FcEmpty">
        <div style={{ width:'100%' }}>
          <FcEmpty icon={Inbox} title="No documents yet" message="Upload a PDF to start parsing." action={<FcButton size="sm" icon={<Plus size={12}/>}>Upload</FcButton>}/>
        </div>
      </Demo>
    </Grid>
  );
};

const ContainerShowcase = () => (
  <Grid cols={1}>
    <Demo name="FcCard">
      <div style={{ width:'100%' }}>
        <FcCard>
          <FcEyebrow>CARD</FcEyebrow>
          <FcTitle size={20}>Generic container</FcTitle>
          <FcSubtitle>Used for grouping arbitrary content with consistent surface styling.</FcSubtitle>
        </FcCard>
      </div>
    </Demo>
    <Demo name="FcPanel" desc="Card with header bar">
      <div style={{ width:'100%' }}>
        <FcPanel title="Recent activity" action={<a style={{ fontSize:11, color:'var(--fc-ink-2)' }}>View all</a>}>
          <FcRow leading={<FcDot color="var(--fc-accent)"/>} title="Invoice-2026-Q2.pdf" meta="Parsing Agent" trailing={<FcTag tone="success">parsed</FcTag>}/>
          <FcRow leading={<FcDot color="var(--fc-warn)"/>} title="Contract draft v3" meta="Validation Agent" trailing={<FcTag tone="warn">flagged</FcTag>}/>
        </FcPanel>
      </div>
    </Demo>
    <Demo name="FcDivider">
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:14 }}>
        <FcDivider/>
        <FcDivider label="OR"/>
      </div>
    </Demo>
  </Grid>
);

const NavigationShowcase = () => {
  const [dial, setDial] = useState('home');
  return (
    <Grid cols={1}>
      <Demo name="FcBreadcrumb">
        <FcBreadcrumb items={['Workspace', 'Projects', 'fc-ui', 'Components']}/>
      </Demo>
      <Demo name="FcNavGroup · FcNavItem">
        <div style={{ width:240, padding:12, background:'var(--fc-surface)', border:'var(--fc-border-width) solid var(--fc-line)', borderRadius:'var(--fc-r-md)' }}>
          <FcNavGroup label="WORKSPACE">
            <FcNavItem icon={Home} active>Overview</FcNavItem>
            <FcNavItem icon={Inbox} count={12}>Inbox</FcNavItem>
            <FcNavItem icon={FileText} count={48}>Documents</FcNavItem>
          </FcNavGroup>
        </div>
      </Demo>
      <Demo name="FcDotNavigation" desc="Tap the dots to expand into 3×3 icon grid">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:240, width:'100%', padding:20 }}>
          <FcDotNavigation items={[
            { icon: Home }, { icon: MessageSquare }, { icon: Calendar },
            { icon: ImageIcon }, { icon: Bell }, { icon: Sparkles },
            { icon: Inbox }, { icon: Activity }, { icon: Settings },
          ]}/>
        </div>
      </Demo>
      <Demo name="FcDialNav" desc="Rotary dial — knob rotates to point at selected icon">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:280, width:'100%', padding:20 }}>
          <FcDialNav value={dial} onChange={setDial} items={[
            { icon: Home,         label: 'Home',     value: 'home' },
            { icon: Search,       label: 'Search',   value: 'search' },
            { icon: Star,         label: 'Favorite', value: 'star' },
            { icon: MoreVertical, label: 'More',     value: 'more' },
            { icon: RefreshCw,    label: 'Refresh',  value: 'refresh' },
            { icon: ArrowLeft,    label: 'Back',     value: 'back' },
          ]}/>
        </div>
      </Demo>
    </Grid>
  );
};

const SHOWCASES = {
  typography: TypographyShowcase,
  buttons:    ButtonsShowcase,
  tags:       TagsShowcase,
  form:       FormShowcase,
  display:    DisplayShowcase,
  disclosure: DisclosureShowcase,
  feedback:   FeedbackShowcase,
  container:  ContainerShowcase,
  navigation: NavigationShowcase,
};

const COMPONENT_COUNTS = {
  typography: 6, buttons: 4, tags: 5, form: 6, display: 5,
  disclosure: 2, feedback: 5, container: 4, navigation: 5,
};

function CatToggle() {
  const { catEnabled, setCatEnabled } = useFc();
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <span style={{ fontSize:11, fontFamily:'var(--fc-font-mono)', color:'var(--fc-ink-2)', letterSpacing:'0.08em' }}>CAT</span>
      <FcSwitch checked={catEnabled} onChange={setCatEnabled}/>
    </div>
  );
}

function Showcase() {
  const [active, setActive] = useState('buttons');
  const Comp = SHOWCASES[active];
  const cat = CATEGORIES.find(c => c.id === active);
  return (
    <HolyGrail>
      <HolyGrail.Header>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, height:'100%' }}>
          <FcLogo subtitle="component library · v0.1.0"/>
          <FcBreadcrumb items={['fc-ui', 'Components', cat.label]}/>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <CatToggle/>
            <FcThemeSwitcher/>
          </div>
        </div>
      </HolyGrail.Header>

      <HolyGrail.Nav>
        <FcNavGroup label="COMPONENTS">
          {CATEGORIES.map(c => (
            <FcNavItem key={c.id} icon={c.icon} active={active===c.id}
              count={COMPONENT_COUNTS[c.id]} onClick={()=>setActive(c.id)}>
              {c.label}
            </FcNavItem>
          ))}
        </FcNavGroup>
      </HolyGrail.Nav>

      <HolyGrail.Main>
        <div style={{ marginBottom:24 }}>
          <FcEyebrow>{cat.label.toUpperCase()}</FcEyebrow>
          <FcTitle size={28}>{cat.label}</FcTitle>
          <FcSubtitle>{COMPONENT_COUNTS[active]} components · all theme-aware, all interactive</FcSubtitle>
        </div>
        <Comp/>
      </HolyGrail.Main>

      <HolyGrail.Aside>
        <FcSection icon={Hash} title="Category info">
          <FcRow leading={<cat.icon size={14} color="var(--fc-accent)"/>} title={cat.label}
            meta={`${COMPONENT_COUNTS[active]} components`} trailing={<FcTag tone="accent">active</FcTag>}/>
        </FcSection>
        <FcSection icon={Activity} title="All categories">
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {CATEGORIES.map(c => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 0', fontSize:12, color: c.id===active?'var(--fc-ink)':'var(--fc-ink-2)' }}>
                <c.icon size={12}/>
                <span style={{ flex:1 }}>{c.label}</span>
                <FcCaption>{COMPONENT_COUNTS[c.id]}</FcCaption>
              </div>
            ))}
          </div>
        </FcSection>
        <FcCard padding={14}>
          <FcEyebrow>TIP</FcEyebrow>
          <FcText muted>Every component reads from CSS variables. Switching theme reskins all of them with zero re-render logic.</FcText>
        </FcCard>
      </HolyGrail.Aside>

      <HolyGrail.Footer>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, height:'100%', fontSize:11, color:'var(--fc-ink-3)', fontFamily:'var(--fc-font-mono)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--fc-ink-2)' }}>
            <FcDot color="var(--fc-success)" pulse/> {Object.values(COMPONENT_COUNTS).reduce((a,b)=>a+b,0)} components ready
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <span>v0.1.0</span><span>·</span><span>9 categories</span><span>·</span><span>3 themes</span>
          </div>
        </div>
      </HolyGrail.Footer>
    </HolyGrail>
  );
}

export default function App() {
  return (
    <FcProvider defaultTheme="dashboard">
      <FcToastProvider>
        <Showcase/>
      </FcToastProvider>
    </FcProvider>
  );
}
