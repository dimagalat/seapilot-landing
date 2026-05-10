/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle */
const { useState, useEffect, useRef } = React;

/* ----------------------- Brand mark ----------------------- */
function Mark({ size = 22, color = "var(--beacon)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" stroke={color} strokeWidth="1.2"></circle>
      <path d="M12 3L14.5 12L12 21L9.5 12Z" fill={color}></path>
      <path d="M3 12L12 14.5L21 12L12 9.5Z" fill={color} opacity="0.5"></path>
    </svg>
  );
}

/* ----------------------- Defaults ----------------------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tone": "editorial",
  "hero": "instrument",
  "theme": "ink",
  "density": "spacious"
}/*EDITMODE-END*/;

/* ----------------------- Nav ----------------------- */
function Nav({ onDemo }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand-mark" aria-label="Sea Pilot">
          <Mark size={22} />
          <span className="brand-word">seapilot<em>.ai</em></span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#product">Product</a>
          <a href="#how">How it works</a>
          <a href="#customers">Customers</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="nav-cta">
          <a className="ghost" href="index.html">Sign in</a>
          <button className="btn btn-primary" onClick={onDemo}>
            Request a demo <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ----------------------- Hero visuals ----------------------- */

function InstrumentArt() {
  // Live-ish ticker — cycles synthetic events for a live-ops feel.
  const seed = [
    { id: "REG-2419", lbl: "Checkout · v2.41 build", tag: "PASS", ts: "0.2s ago" },
    { id: "QA-018",   lbl: "Refund flow · empathy",   tag: "WARN", ts: "0.6s ago" },
    { id: "REG-2418", lbl: "Auth · session expiry",   tag: "PASS", ts: "1.1s ago" },
    { id: "QA-017",   lbl: "Plan downgrade reply",    tag: "PASS", ts: "1.8s ago" },
    { id: "REG-2417", lbl: "Inbox sort · pinned",     tag: "FAIL", ts: "2.4s ago" },
    { id: "QA-016",   lbl: "Refund flow · accuracy",  tag: "PASS", ts: "3.1s ago" },
    { id: "REG-2416", lbl: "Settings · SSO toggle",   tag: "PASS", ts: "3.9s ago" },
    { id: "QA-015",   lbl: "Cancellation · tone",     tag: "PASS", ts: "4.7s ago" },
  ];
  const [rows, setRows] = useState(seed.slice(0, 5));
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % seed.length;
      const next = [seed[i], ...rows].slice(0, 5);
      setRows(next.map((r, idx) => ({ ...r, ts: `${(idx * 0.7 + 0.2).toFixed(1)}s ago` })));
    }, 2400);
    return () => clearInterval(id);
  }, [rows]);

  return (
    <div className="instr">
      <div className="instr-head">
        <span>Bridge · live ops</span>
        <span className="dotrow">
          <span className="lit"></span><span className="lit"></span><span className="lit"></span><span></span><span></span>
        </span>
      </div>
      <div className="instr-body">
        <div className="gauges">
          <div className="gauge">
            <span className="gk">Build coverage · today</span>
            <span className="gv"><em>100%</em></span>
            <span className="gd"><span className="delta">+70 pts</span> vs sprint QA</span>
          </div>
          <div className="gauge">
            <span className="gk">Tickets verified</span>
            <span className="gv">8,412</span>
            <span className="gd"><span className="delta">+98%</span> sample</span>
          </div>
          <div className="gauge warn">
            <span className="gk">Regressions caught</span>
            <span className="gv">14</span>
            <span className="gd"><span className="delta">2 pre-merge</span></span>
          </div>
        </div>
        <div className="ticker">
          <div className="ticker-head">
            <span>Stream · regressions + QA evals</span>
            <span className="live"><span className="pulse"></span>live</span>
          </div>
          <div className="ticker-rows">
            {rows.map((r, i) => (
              <div className="trow" key={r.id + i}>
                <span className="tt">{r.id}</span>
                <span className="tlbl"><b>{r.lbl}</b></span>
                <span className={`tt-tag ${r.tag.toLowerCase()}`}>{r.tag}</span>
                <span className="ts">{r.ts}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="instr-foot">
          <span>Bearing 000° · clear channel</span>
          <span>seapilot.ai · v1.0</span>
        </div>
      </div>
    </div>
  );
}

function CompassArt() {
  return (
    <div className="compass-stage" aria-hidden="true">
      <svg viewBox="0 0 460 460">
        <defs>
          <radialGradient id="bg" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="oklch(58% 0.11 188 / 0.18)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <circle cx="230" cy="230" r="220" fill="url(#bg)"/>
        <circle cx="230" cy="230" r="200" fill="none" stroke="var(--beacon)" strokeOpacity="0.3" strokeWidth="1"/>
        <circle cx="230" cy="230" r="170" fill="none" stroke="var(--beacon)" strokeOpacity="0.2" strokeWidth="1"/>
        <circle cx="230" cy="230" r="130" fill="none" stroke="var(--beacon)" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 4"/>
        {/* tick marks */}
        {Array.from({length: 24}).map((_, i) => {
          const a = (i * 15) * Math.PI / 180;
          const r1 = 200, r2 = i % 6 === 0 ? 184 : 192;
          const x1 = 230 + Math.sin(a) * r1, y1 = 230 - Math.cos(a) * r1;
          const x2 = 230 + Math.sin(a) * r2, y2 = 230 - Math.cos(a) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--beacon)" strokeOpacity={i%6===0?0.7:0.35} strokeWidth="1"/>
        })}
        {/* cardinals */}
        <g fontFamily="JetBrains Mono, monospace" fontSize="13" fill="var(--beacon-deep)" letterSpacing="0.18em">
          <text x="230" y="38" textAnchor="middle">N</text>
          <text x="430" y="234" textAnchor="middle">E</text>
          <text x="230" y="430" textAnchor="middle">S</text>
          <text x="30"  y="234" textAnchor="middle">W</text>
        </g>
        {/* prow */}
        <g transform="translate(230 230)">
          <path d="M0 -140 L30 0 L0 140 L-30 0 Z" fill="var(--beacon)"/>
          <path d="M-140 0 L0 30 L140 0 L0 -30 Z" fill="var(--beacon)" opacity="0.45"/>
          <path d="M0 -140 L15 0 L0 40 L-15 0 Z" fill="var(--signal)"/>
          <circle r="10" fill="var(--ink)" stroke="var(--beacon)" strokeWidth="1.5"/>
          <circle r="3" fill="var(--beacon)"/>
        </g>
        <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--fg-3)" letterSpacing="0.18em">
          <text x="230" y="390" textAnchor="middle">BEARING 000°</text>
        </g>
      </svg>
    </div>
  );
}

function WordmarkArt() {
  return (
    <div className="wordmark-stage">
      <div className="top">Sea Pilot · agentic quality operations</div>
      <h2 className="word">seapilot<em>.ai</em></h2>
      <div className="top" style={{display:'flex', justifyContent:'space-between'}}>
        <span>Bearing 000°</span>
        <span>v 1.0 · clear channel</span>
      </div>
    </div>
  );
}

function ProductMockArt() {
  return (
    <div className="product-stage">
      <div className="pm-head">
        <div className="lights"><span/><span/><span/></div>
        <div className="url">seapilot.ai/app/autopilot</div>
      </div>
      <div className="pm-body">
        <div className="pm-rail">
          <div className="rl"><span className="dot"/>Inbox</div>
          <div className="rl"><span className="dot"/>Bridge</div>
          <div className="rl active"><span className="dot"/>Autopilot</div>
          <div className="rl"><span className="dot"/>Fleet QA</div>
          <div className="rl"><span className="dot"/>Studio</div>
        </div>
        <div className="pm-main">
          <div className="pm-card"><div className="ck">Run · checkout-v2.41</div><div className="cv">Validating <em style={{color:'var(--chart)', fontStyle:'italic'}}>16/16 cases</em></div></div>
          <div className="pm-card"><div className="ck">Coverage</div><div className="cv">100<span style={{fontSize: 14, color:'var(--fg-3)'}}>%</span></div></div>
          <div className="pm-card"><div className="ck">Regressions caught (this week)</div><div className="cv">14 <span style={{fontSize: 13, color:'var(--fg-3)'}}>· 2 pre-merge</span></div></div>
        </div>
      </div>
    </div>
  );
}

function HeroArt({ kind }) {
  return (
    <div className="hero-art">
      {kind === "instrument" && <InstrumentArt/>}
      {kind === "compass"    && <CompassArt/>}
      {kind === "wordmark"   && <WordmarkArt/>}
      {kind === "product"    && <ProductMockArt/>}
    </div>
  );
}

/* ----------------------- Sections ----------------------- */
function Hero({ heroKind, onDemo }) {
  return (
    <section className="hero" id="top">
      <div className="page">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Agentic quality operations · enterprise</div>
            <h1>Quality that keeps up,<br/><em>automatically.</em></h1>
            <p className="hero-sub">
              The AI platform that catches product regressions before release and verifies every support answer — so your team ships faster and your customers trust you more.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary btn-lg" onClick={onDemo}>
                Request a demo <span className="arrow">→</span>
              </button>
              <a className="btn btn-ghost btn-lg" href="autopilot.html">
                See Autopilot <span className="arrow">→</span>
              </a>
            </div>
            <div className="hero-meta">
              <span><b>100%</b> build coverage</span>
              <span><b>100%</b> ticket evaluation</span>
              <span>SOC 2 · HIPAA-ready</span>
            </div>
          </div>
          <HeroArt kind={heroKind}/>
        </div>
      </div>
    </section>
  );
}

function VPs() {
  return (
    <section className="section" id="product">
      <div className="page">
        <div className="section-head">
          <div className="section-num">01 / Value</div>
          <div>
            <h2 className="section-title">Two surfaces. <em>One quality system.</em></h2>
            <p className="section-lede">
              Sea Pilot watches both ends of the customer experience: the product you ship and the answers your team sends. Continuous, verifiable, end-to-end — without adding QA headcount.
            </p>
          </div>
        </div>

        <div className="vps">
          <div className="vp">
            <div className="vp-num"><b>VP 01</b> Continuous regression detection</div>
            <h3 className="vp-h">Catch what manual QA misses — before your customers do.</h3>
            <p className="vp-promise">
              AI agents run continuously across your CI/CD pipeline, surfacing regressions the moment they're introduced. Stop shipping with known risk. Stop learning about bugs from support tickets.
            </p>
            <div className="vp-meter">
              <div className="row">
                <span>Sea Pilot</span>
                <span className="bar"><i style={{width:'100%'}}/></span>
                <span className="pct">100%</span>
              </div>
              <div className="row legacy">
                <span>Sprint QA</span>
                <span className="bar"><i style={{width:'30%'}}/></span>
                <span className="pct">30%</span>
              </div>
              <p className="vp-body" style={{marginTop: 6}}>Of every build change — not the 30% a sprint-cycle QA team can reach.</p>
            </div>
          </div>

          <div className="vp">
            <div className="vp-num"><b>VP 02</b> Support quality at scale</div>
            <h3 className="vp-h">Know if your support team is actually helping — for every interaction.</h3>
            <p className="vp-promise">
              Automatically evaluate response accuracy, tone, and resolution quality across 100% of support tickets. No more spot-checking 2% and hoping it's representative.
            </p>
            <div className="vp-meter">
              <div className="row">
                <span>Sea Pilot</span>
                <span className="bar"><i style={{width:'100%'}}/></span>
                <span className="pct">100%</span>
              </div>
              <div className="row legacy">
                <span>Manual QA</span>
                <span className="bar"><i style={{width:'2%'}}/></span>
                <span className="pct">~2%</span>
              </div>
              <p className="vp-body" style={{marginTop: 6}}>Every conversation, every rep, every channel. Traditional review samples ~50 tickets a week.</p>
            </div>
          </div>

          <div className="vp">
            <div className="vp-num"><b>VP 03</b> Quality without the bottleneck</div>
            <h3 className="vp-h">Ship faster. Don't compromise.</h3>
            <p className="vp-promise">
              QA stops being the slowest step in the release cycle when AI does the verification. Teams that used to wait three days for sign-off move to continuous confidence.
            </p>
            <div className="vp-meter">
              <div className="row">
                <span>Cycle time</span>
                <span className="bar"><i style={{width:'22%'}}/></span>
                <span className="pct">−68%</span>
              </div>
              <div className="row legacy">
                <span>Headcount</span>
                <span className="bar"><i style={{width:'0%'}}/></span>
                <span className="pct">+0</span>
              </div>
              <p className="vp-body" style={{marginTop: 6}}>Compressed release cycles. Lower regression rate. No new headcount required.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Positioning() {
  return (
    <section className="positioning" aria-label="Positioning">
      <div className="page">
        <div className="band">
          <div className="label">Category · what this is</div>
          <div>
            <blockquote>
              An <em>AI-native quality operations platform</em> for any SaaS. We make sure everything you ship works and everything you say to customers is accurate, without slowing the team or hiring more people to check.
            </blockquote>
            <div className="deny">
              <span className="is">It is &nbsp; AI-native quality operations</span>
              <span className="not">Not test automation</span>
              <span className="not">Not a support helpdesk</span>
              <span className="not">Not a chatbot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="page">
        <div className="section-head">
          <div className="section-num">02 / How it works</div>
          <div>
            <h2 className="section-title">Two paths in. <em>One quality system.</em></h2>
            <p className="section-lede">Sea Pilot meets your team where the work already happens. Wire it into your pipeline if you want code-level coverage. Record a flow if you want coverage tomorrow morning. Most teams run both.</p>
          </div>
        </div>

        <div className="paths">
          <article className="path path-white">
            <header>
              <div className="path-k">Path A · whitebox</div>
              <h3 className="path-h">Wire into <em>CI/CD.</em></h3>
              <p className="path-s">For teams who want coverage on every commit. Sea Pilot reads your repo, your build history, and your prior incidents — then runs continuously inside your pipeline.</p>
            </header>
            <ol className="path-steps">
              <li>
                <span className="ps-n">01</span>
                <div>
                  <div className="ps-h">Connect the repo &amp; pipeline.</div>
                  <div className="ps-s">GitHub / GitLab / CircleCI · OAuth · read-only by default.</div>
                </div>
              </li>
              <li>
                <span className="ps-n">02</span>
                <div>
                  <div className="ps-h">Agents study the codebase.</div>
                  <div className="ps-s">Build history, prior bugs, policy docs — a rubric grounded in your product.</div>
                </div>
              </li>
              <li>
                <span className="ps-n">03</span>
                <div>
                  <div className="ps-h">Verify on every PR.</div>
                  <div className="ps-s">Regressions surface in the diff. Failures route with full context.</div>
                </div>
              </li>
            </ol>
            <footer className="path-foot">
              <span className="pf-k">Time to value</span>
              <span className="pf-v">~48 hours · shadow mode → green</span>
            </footer>
          </article>

          <article className="path path-black">
            <header>
              <div className="path-k">Path B · blackbox</div>
              <h3 className="path-h">Just <em>record the flow.</em></h3>
              <p className="path-s">For teams whose code lives behind a wall — agencies, partner builds, legacy estates, or anyone who'd rather not plumb credentials. Click through the app once. Sea Pilot replays it forever.</p>
            </header>
            <ol className="path-steps">
              <li>
                <span className="ps-n">01</span>
                <div>
                  <div className="ps-h">Record once.</div>
                  <div className="ps-s">Open the recorder. Click through your flow as if you were the user.</div>
                </div>
              </li>
              <li>
                <span className="ps-n">02</span>
                <div>
                  <div className="ps-h">Sea Pilot generalizes.</div>
                  <div className="ps-s">Selectors, assertions, edge cases, fixtures — synthesized from one pass.</div>
                </div>
              </li>
              <li>
                <span className="ps-n">03</span>
                <div>
                  <div className="ps-h">Replay continuously.</div>
                  <div className="ps-s">Schedule, pre-release, on demand. Failures arrive with a video and a diff.</div>
                </div>
              </li>
            </ol>
            <footer className="path-foot">
              <span className="pf-k">Time to value</span>
              <span className="pf-v">As soon as the flow is recorded · minutes</span>
            </footer>
          </article>
        </div>

        <p className="paths-note">
          <span className="pn-k">For support quality:</span> &nbsp; Fleet QA grades from day one of ingest — every reply, every channel, no plumbing required.
        </p>
      </div>
    </section>
  );
}

function ProductStrip() {
  const items = [
    {
      k: "Autopilot",
      h: "Pre-release regression runs",
      s: "An AI QA team that runs your test plan on every build.",
      href: "autopilot.html",
      art: (
        <div className="ta">
          <div className="ta-row beacon"/>
          <div className="ta-row long"/>
          <div className="ta-row med"/>
          <div className="ta-row short"/>
          <div style={{marginTop:'auto', fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fg-3)'}}>16/16 PASS</div>
        </div>
      ),
    },
    {
      k: "Fleet QA",
      h: "Every reply, scored",
      s: "Rubric-driven evaluation of every human and AI conversation.",
      href: "index.html",
      art: (
        <div className="ta">
          <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap: 4}}>
            {[88,72,94,81,90,67,95,84,92,79,88,76,91,83,86,90].map((v,i)=>(
              <div key={i} style={{height: 36, alignSelf:'end', display:'flex', alignItems:'flex-end'}}>
                <div style={{width:'100%', height:`${v}%`, background: v < 75 ? 'var(--signal)' : 'var(--beacon)', borderRadius: 2}}/>
              </div>
            ))}
          </div>
          <div style={{marginTop:'auto', fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fg-3)'}}>Avg 84 · this week</div>
        </div>
      ),
    },
    {
      k: "Bridge",
      h: "Live operations dashboard",
      s: "One screen for product quality + support quality, side by side.",
      href: "index.html",
      art: (
        <div className="ta">
          <svg viewBox="0 0 200 80" preserveAspectRatio="none" style={{width:'100%', height: 80}}>
            <path d="M0 60 C 30 50, 50 30, 80 32 S 130 70, 160 28 200 18 200 18" stroke="var(--beacon)" strokeWidth="1.5" fill="none"/>
            <path d="M0 70 C 30 65, 50 55, 80 60 S 130 50, 160 45 200 38 200 38" stroke="var(--fg-3)" strokeWidth="1" strokeDasharray="2 3" fill="none"/>
          </svg>
          <div style={{marginTop:'auto', fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fg-3)'}}>7-day trend · clear channel</div>
        </div>
      ),
    },
    {
      k: "Studio",
      h: "Author rubrics + policies",
      s: "Plain-English rules. Tested in shadow before they ship.",
      href: "index.html",
      art: (
        <div className="ta">
          <div style={{padding: 8, background:'var(--bg)', border: '1px solid var(--rule-bg)', borderRadius: 6, fontFamily:'var(--font-mono)', fontSize: 10.5, color:'var(--fg-2)', lineHeight: 1.55}}>
            <div><span style={{color:'var(--beacon-deep)'}}>rule</span> empathy_on_refund</div>
            <div style={{paddingLeft: 12}}>when intent = "refund"</div>
            <div style={{paddingLeft: 12}}>require tone ≥ 0.7</div>
          </div>
          <div style={{marginTop:'auto', fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fg-3)'}}>42 rubrics · 6 policies</div>
        </div>
      ),
    },
  ];

  return (
    <section className="section">
      <div className="page">
        <div className="section-head">
          <div className="section-num">03 / Surfaces</div>
          <div>
            <h2 className="section-title">See it in <em>the app.</em></h2>
            <p className="section-lede">Four surfaces, one operational graph. Click through to the working surfaces — they're real builds, not videos.</p>
          </div>
        </div>

        <div className="strip">
          {items.map((it) => (
            <a className="thumb" key={it.k} href={it.href}>
              <div className="thumb-art">{it.art}</div>
              <div className="thumb-meta">
                <div className="thumb-k">{it.k}</div>
                <h4 className="thumb-h">{it.h}</h4>
                <p className="thumb-s">{it.s}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoFor() {
  return (
    <section className="section" id="customers">
      <div className="page">
        <div className="section-head">
          <div className="section-num">04 / Who it's for</div>
          <div>
            <h2 className="section-title">Built for teams where <em>velocity has outrun QA capacity.</em></h2>
            <p className="section-lede">Sea Pilot is for QA leads, engineering managers, and support operations teams at B2B SaaS companies scaling from 50 to 500 employees — the teams where product velocity has outrun QA capacity, and support quality is invisible until something breaks.</p>
          </div>
        </div>

        <div className="who">
          <div className="who-lede">
            <p>You'll know it's a fit when one or more of the below feels like it was written about your team. We talk to a lot of QA leads. The signal is consistent.</p>
          </div>
          <ul className="who-list">
            <li><span className="k">01</span><span>Your QA team is overwhelmed by test debt and slipping every release.</span></li>
            <li><span className="k">02</span><span>You've had a production incident that testing should have caught.</span></li>
            <li><span className="k">03</span><span>Your support team uses AI tools and you're not sure what they're saying.</span></li>
            <li><span className="k">04</span><span>Engineering is waiting on QA sign-off to ship.</span></li>
            <li><span className="k">05</span><span>You're being asked to scale quality without scaling headcount.</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function CTABand({ onDemo }) {
  return (
    <section className="section" id="pricing" style={{borderTop:'none', paddingTop: 0}}>
      <div className="page">
        <div className="cta-band">
          <div>
            <h3>Go from zero to <em>continuous quality coverage</em> in under a week.</h3>
            <p>Pricing scales with verified coverage, not seats. We'll quote it after a 30-minute call once we understand your stack.</p>
          </div>
          <div className="form-shell">
            <div className="h">Request a demo</div>
            <p className="s">See it in action.</p>
            <button className="btn btn-primary btn-lg" onClick={onDemo} style={{justifyContent:'center'}}>
              Request your demo <span className="arrow">→</span>
            </button>
            <p className="micro">No commitment. We respond within 1 business day.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="f">
      <div className="f-grid">
        <div>
          <p className="f-mark">seapilot<em>.ai</em></p>
          <p>The AI-native quality operations platform for B2B SaaS. Verified product. Verified replies. No new headcount.</p>
        </div>
        <div>
          <h5>Product</h5>
          <ul>
            <li><a href="autopilot.html">Autopilot</a></li>
            <li><a href="index.html">Fleet QA</a></li>
            <li><a href="index.html">Bridge</a></li>
            <li><a href="index.html">Studio</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="branding-guide.html">Brand</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div>
          <h5>Resources</h5>
          <ul>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="f-meta">
        <span>seapilot, inc · quality operations</span>
        <span>verified product · verified replies</span>
      </div>
    </footer>
  );
}

/* ----------------------- Demo modal ----------------------- */
function DemoModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", email: "", company: "", challenge: "" });
  const firstRef = useRef(null);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setTimeout(() => firstRef.current && firstRef.current.focus(), 80);
      const onKey = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, onClose]);

  function submit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  function set(k) { return (e) => setForm({ ...form, [k]: e.target.value }); }

  return (
    <div className={`scrim ${open ? "open" : ""}`} onClick={onClose} aria-hidden={!open}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="demo-h" onClick={(e)=>e.stopPropagation()}>
        {!submitted ? (
          <>
            <div className="modal-head">
              <div>
                <div className="k">Request a demo</div>
                <h3 className="h" id="demo-h">See it in action.</h3>
                <p className="s">We'll show you how to go from zero to continuous quality coverage in under a week.</p>
              </div>
              <button className="modal-close" onClick={onClose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <form className="modal-body" onSubmit={submit}>
              <div className="field">
                <label htmlFor="first">First name</label>
                <input ref={firstRef} id="first" type="text" placeholder="First name" value={form.first} onChange={set("first")} required/>
              </div>
              <div className="field">
                <label htmlFor="last">Last name</label>
                <input id="last" type="text" placeholder="Last name" value={form.last} onChange={set("last")} required/>
              </div>
              <div className="field full">
                <label htmlFor="email">Work email</label>
                <input id="email" type="email" placeholder="you@company.com" value={form.email} onChange={set("email")} required/>
              </div>
              <div className="field full">
                <label htmlFor="company">Company name</label>
                <input id="company" type="text" placeholder="Company" value={form.company} onChange={set("company")} required/>
              </div>
              <div className="field full">
                <label htmlFor="challenge">Biggest QA challenge</label>
                <textarea id="challenge" placeholder="Tell us your biggest quality challenge right now" value={form.challenge} onChange={set("challenge")}/>
              </div>
              <div className="full" style={{display:'none'}}><button type="submit"/></div>
            </form>
            <div className="modal-foot">
              <span className="micro">No commitment. We respond within 1 business day.</span>
              <button className="btn btn-primary" onClick={submit}>Request your demo <span className="arrow">→</span></button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-head">
              <div>
                <div className="k">Request received</div>
                <h3 className="h" id="demo-h" style={{fontFamily:'var(--font-display)'}}>Got it. <em>We'll be in touch within one business day.</em></h3>
                <p className="s">Meanwhile, you can poke around the working surfaces — Autopilot is a real build, not a video.</p>
              </div>
              <button className="modal-close" onClick={onClose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="modal-success">
              <div style={{display:'flex', gap: 10, flexWrap:'wrap'}}>
                <a className="btn btn-primary" href="autopilot.html">Open Autopilot <span className="arrow">→</span></a>
                <a className="btn btn-ghost" href="index.html">Open Bridge <span className="arrow">→</span></a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ----------------------- App ----------------------- */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [demoOpen, setDemoOpen] = useState(false);

  // Reflect tweaks onto <body> data-attrs
  useEffect(() => {
    document.body.dataset.tone = tweaks.tone;
    document.body.dataset.theme = tweaks.theme;
    document.body.dataset.density = tweaks.density;
  }, [tweaks.tone, tweaks.theme, tweaks.density]);

  function openDemo() { setDemoOpen(true); }
  function closeDemo() { setDemoOpen(false); }

  return (
    <>
      <Nav onDemo={openDemo}/>
      <Hero heroKind={tweaks.hero} onDemo={openDemo}/>
      <VPs/>
      <Positioning/>
      <HowItWorks/>
      <ProductStrip/>
      <WhoFor/>
      <CTABand onDemo={openDemo}/>
      <Footer/>
      <DemoModal open={demoOpen} onClose={closeDemo}/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Tone">
          <TweakRadio
            label="Voice"
            value={tweaks.tone}
            onChange={(v) => setTweak("tone", v)}
            options={[
              { value: "declarative", label: "Declarative" },
              { value: "editorial",   label: "Editorial" },
              { value: "operational", label: "Operational" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Hero visual">
          <TweakSelect
            label="Variant"
            value={tweaks.hero}
            onChange={(v) => setTweak("hero", v)}
            options={[
              { value: "instrument", label: "Live instrument panel" },
              { value: "compass",    label: "Compass / brand abstract" },
              { value: "wordmark",   label: "Dark wordmark cover" },
              { value: "product",    label: "Product mock" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Theme">
          <TweakRadio
            label="Background"
            value={tweaks.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[
              { value: "paper", label: "Paper" },
              { value: "ink",   label: "Ink" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Density">
          <TweakRadio
            label="Spacing"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "tight",    label: "Tight" },
              { value: "cozy",     label: "Cozy" },
              { value: "spacious", label: "Spacious" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
