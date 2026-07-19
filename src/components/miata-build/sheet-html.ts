const sheetHtml = `
<!-- ============ SPEC PLATE HEADER ============ -->
  <div class="plate">
    <div class="plate-top">
      <div>
        <div class="eyebrow">Owner Build Sheet · Est. Dec 2024</div>
        <h1>MX‑5 MIATA</h1>
        <h2>2008 &nbsp;·&nbsp; Grand Touring &nbsp;·&nbsp; NC1 &nbsp;·&nbsp; Copper Red Mica</h2>
        <p class="disclaimer">All whp figures on this page are estimates from manufacturer dynos and similar NC builds. This car has not been on a dyno yet.</p>
      </div>
      <div class="vin-box">
        CHASSIS&nbsp; <b>NC1 · 2.0L MZR</b><br>
        TRANS&nbsp;&nbsp;&nbsp; <b>Manual, LHD</b><br>
        RECORD&nbsp; <b>41 modifications logged</b><br>
        SPAN&nbsp;&nbsp;&nbsp;&nbsp; <b>12/2024 — 07/2026</b><br>
        ALL-IN&nbsp;&nbsp; <b>$20,272 (purchase + parts + labor)</b><br>
        TUNE&nbsp;&nbsp;&nbsp; <b>Fab9 VersaTuner N1 · $399</b>
      </div>
    </div>

    <div class="stats">
      <div class="stat"><div class="num">$7,700</div><div class="lbl">Purchase price</div></div>
      <div class="stat"><div class="num">$8,322</div><div class="lbl">Parts (41) + tune</div></div>
      <div class="stat"><div class="num">$4,250</div><div class="lbl">Labor</div></div>
      <div class="stat stat-total"><div class="num">$20,272</div><div class="lbl">Total build investment</div></div>
    </div>

    <!-- Cost breakdown bar -->
    <div class="cost-bar-wrap">
      <div class="cost-bar">
        <div class="seg seg-purchase" style="width:38.0%"><span>Purchase · $7,700</span></div>
        <div class="seg seg-parts" style="width:41.0%"><span>Parts · $8,322</span></div>
        <div class="seg seg-labor" style="width:21.0%"><span>Labor · $4,250</span></div>
      </div>
      <div class="cost-bar-legend">
        <span><i class="dot" style="background:var(--text-dim)"></i>Purchase price · 38.0%</span>
        <span><i class="dot" style="background:var(--copper)"></i>Parts · 41.1%</span>
        <span><i class="dot" style="background:var(--brass)"></i>Labor · 21.0%</span>
      </div>
    </div>

    <!-- Dyno signature graphic -->
    <div class="dyno-wrap">
      <div class="dyno-head">
        <h3>Power &amp; exhaust package + tune · estimated curve</h3>
        <div class="legend">
          <span><span class="swatch" style="background:var(--text-faint)"></span>Stock 2.0L MZR (~132 whp)</span>
          <span><span class="swatch" style="background:var(--brass)"></span>Header + midpipe + exhaust (~150 whp)</span>
          <span><span class="swatch" style="background:var(--copper-bright)"></span>+ Fab9 tune (~165 whp)</span>
        </div>
      </div>
      <svg viewBox="0 0 820 210" width="100%" height="210" preserveAspectRatio="none">
        <!-- y-axis gridlines + whp labels -->
        <g stroke="var(--hairline-soft)" stroke-width="1">
          <line x1="40" y1="35.6" x2="780" y2="35.6" stroke-dasharray="2 4"/>
          <line x1="40" y1="56.3" x2="780" y2="56.3" stroke-dasharray="2 4"/>
          <line x1="40" y1="77.0" x2="780" y2="77.0" stroke-dasharray="2 4"/>
          <line x1="40" y1="97.8" x2="780" y2="97.8" stroke-dasharray="2 4"/>
          <line x1="40" y1="118.5" x2="780" y2="118.5" stroke-dasharray="2 4"/>
          <line x1="40" y1="139.3" x2="780" y2="139.3" stroke-dasharray="2 4"/>
        </g>
        <g fill="var(--text-faint)" font-family="JetBrains Mono, monospace" font-size="9">
          <text x="34" y="38.6" text-anchor="end">180</text>
          <text x="34" y="59.3" text-anchor="end">160</text>
          <text x="34" y="80.0" text-anchor="end">140</text>
          <text x="34" y="100.8" text-anchor="end">120</text>
          <text x="34" y="121.5" text-anchor="end">100</text>
          <text x="34" y="142.3" text-anchor="end">80</text>
          <text x="10" y="90" text-anchor="middle" transform="rotate(-90 10 90)" font-size="8.5" letter-spacing="1">WHP</text>
        </g>
        <!-- x-axis -->
        <g stroke="var(--hairline)" stroke-width="1"><line x1="40" y1="160" x2="780" y2="160"/></g>
        <g fill="var(--text-faint)" font-family="JetBrains Mono, monospace" font-size="9.5">
          <text x="40" y="176">2000</text>
          <text x="235" y="176">3500</text>
          <text x="448" y="176">5000</text>
          <text x="662" y="176">6500</text>
          <text x="740" y="176">rpm</text>
        </g>
        <!-- stock curve -->
        <path d="M40,149.6 C75.6,145.3 182.3,132.0 253.5,123.7 C324.6,115.4 395.8,106.2 466.9,99.9 C538.1,93.5 628.2,87.1 680.4,85.3 C732.6,83.6 763.4,88.8 780,89.5"
              fill="none" stroke="var(--text-faint)" stroke-width="2.5"/>
        <!-- hardware-only curve -->
        <path d="M40,143.4 C75.6,138.2 182.3,122.0 253.5,112.3 C324.6,102.6 395.8,92.9 466.9,85.3 C538.1,77.7 628.2,69.1 680.4,66.7 C732.6,64.2 763.4,70.1 780,70.8"
              fill="none" stroke="var(--brass)" stroke-width="2.5"/>
        <!-- hardware + tune curve -->
        <path d="M40,140.5 C75.6,134.5 182.3,115.5 253.5,104.0 C324.6,92.5 407.6,80.5 466.9,71.5 C526.2,62.5 573.7,53.0 609.2,51.1 C644.8,49.2 651.9,52.0 680.4,54.0 C708.8,56.0 763.4,62.5 780,64.5"
              fill="none" stroke="var(--copper-bright)" stroke-width="2.5"/>
        <!-- peak markers -->
        <circle cx="680.4" cy="85.3" r="3.2" fill="var(--text-faint)"/>
        <text x="680.4" y="102" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="var(--text-faint)">132</text>
        <circle cx="680.4" cy="66.7" r="3.2" fill="var(--brass)"/>
        <text x="700" y="63" text-anchor="start" font-family="JetBrains Mono, monospace" font-size="9.5" fill="var(--brass)">150 whp</text>
        <circle cx="609.2" cy="51.1" r="3.2" fill="var(--copper-bright)"/>
        <text x="609.2" y="41" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9.5" fill="var(--copper-bright)">165 whp*</text>
      </svg>
      <div class="foot">*Stock NC 2.0Ls usually land around 130-132 whp on a Dyno Dynamics (factory rating is ~166-170 crank). Header + midpipe + exhaust gains (~+15-20 whp) are from RoadsterSport's back-to-back testing on this same combo. Tuned peak (~165 whp) assumes about <b>+15 whp</b> from the Fab9 VersaTuner N1 map. Still waiting on a real dyno pull on this car.</div>
    </div>
  </div>

  <!-- ============ POWER & EXHAUST ============ -->
  <div class="section">
    <div class="sec-head">
      <svg class="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 14c0-4 2-8 4-10 2 3 1 5 3 5s2-2 2-4c2 2 4 6 4 9a6 6 0 0 1-12 0Z"/><path d="M10 15a2 2 0 1 0 4 0"/></svg>
      <h3>Power &amp; Exhaust</h3>
      <div class="sec-sub">6 parts · $3,206.94 · the hp column</div>
    </div>
    <div class="panel">
      <div class="illus-row">
        <div class="illus">
          <svg width="70" height="46" viewBox="0 0 70 46" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 6c4 0 4 4 8 4s4-4 8-4 4 6 8 6 4-6 8-6"/>
            <path d="M8 6v10M16 10v8M24 10v10M32 10v12M40 6v14"/>
            <path d="M8 16h32c6 0 10 4 10 10v4h-14"/>
            <ellipse cx="52" cy="30" rx="8" ry="6"/>
          </svg>
          <div class="illus-cap"><b>Equal-length header</b> — eliminates the factory 4-into-1 pinch point at the collector, extends primary runner length</div>
        </div>
        <div class="illus">
          <svg width="70" height="46" viewBox="0 0 70 46" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 26h20"/>
            <rect x="24" y="18" width="18" height="16" rx="3"/>
            <path d="M42 26h10"/>
            <ellipse cx="58" cy="26" rx="8" ry="9"/>
            <path d="M58 17v18"/>
          </svg>
          <div class="illus-cap"><b>High-flow midpipe + 5" cat</b> — cuts backpressure through the mid-range, feeds a straighter path to the muffler</div>
        </div>
      </div>
      <table>
        <thead><tr><th>Part</th><th>Installed</th><th class="num">Cost</th><th>Performance note</th></tr></thead>
        <tbody>
          <tr><td class="part">Mazda Motorsport Intake System</td><td class="date">01/03/2025</td><td class="cost">$439.90</td>
            <td class="note"><span class="gain-tag">+2–3 whp</span>Lower intake restriction than the factory airbox; quicker throttle tip-in, deeper induction sound</td></tr>
          <tr><td class="part">RoadsterSport MX5 STREET Header</td><td class="date">04/02/2026</td><td class="cost">$799.00</td>
            <td class="note"><span class="gain-tag">+8–10 whp</span>Catted, plug-and-play, retains factory sensor locations — the single biggest gain on the car</td></tr>
          <tr><td class="part">RoadsterSport Helmholtz Midpipe &amp; 5" Cat</td><td class="date">04/06/2026</td><td class="cost">$912.10</td>
            <td class="note"><span class="gain-tag">+5–8 lb-ft</span>Mid-range torque, concentrated 3,500–6,500 rpm</td></tr>
          <tr><td class="part">RoadsterSport Exhaust</td><td class="date">12/19/2024</td><td class="cost">$528.94</td>
            <td class="note"><span class="gain-tag">+7–8 whp</span>Cat-back muffler; opens up flow and exhaust note over stock</td></tr>
          <tr><td class="part">Short &amp; Long O2 Sensor Extension Cords</td><td class="date">04/02/2026</td><td class="cost">$128.00</td>
            <td class="note">Supporting part — relocates O2 sensors to fit the header swap, no gain on its own</td></tr>
          <tr><td class="part">Fab9 Custom Tune — VersaTuner N1</td><td class="date">07/22/2026</td><td class="cost">$399.00</td>
            <td class="note"><span class="gain-tag">+15 whp*</span>Custom ECU map for the intake/header/midpipe/exhaust already on the car. Fuel and timing opened up vs the safe factory calibration.</td></tr>
        </tbody>
      </table>
      <div class="sec-foot"><b>System total:</b> header + midpipe + exhaust together are about <b>+15-20 whp</b> and a similar torque bump per RoadsterSport's testing, mostly from 3,500 rpm up. Add the Fab9 tune (~<b>+15 whp</b>) and the whole package is roughly <b>+30-35 whp</b> over stock.</div>
      <div class="foot" style="padding:0 16px 12px;">*Tune gain is an estimate from similar NC setups with the same hardware. Not confirmed on this car's dyno yet.</div>
    </div>
  </div>

  <!-- ============ COOLING ============ -->
  <div class="section">
    <div class="sec-head">
      <svg class="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2c3 4 6 8 6 12a6 6 0 0 1-12 0c0-4 3-8 6-12Z"/></svg>
      <h3>Cooling System</h3>
      <div class="sec-sub">7 parts · $1,212.93 · protects the gains above</div>
    </div>
    <div class="panel">
      <div class="illus-row">
        <div class="illus" style="flex:1;">
          <svg width="70" height="46" viewBox="0 0 70 46" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="6" y="6" width="40" height="34" rx="2"/>
            <path d="M14 6v34M22 6v34M30 6v34M38 6v34"/>
            <path d="M46 14h10a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H46"/>
          </svg>
          <div class="illus-cap"><b>32mm all-aluminum radiator</b> — replaces the plastic-tank factory unit with more core capacity for sustained load</div>
        </div>
      </div>
      <table>
        <thead><tr><th>Part</th><th>Installed</th><th class="num">Cost</th><th>Function</th></tr></thead>
        <tbody>
          <tr><td class="part">CSF Performance Radiator 32mm</td><td class="date">10/08/2025</td><td class="cost">$415.00</td>
            <td class="note">All-aluminum core; keeps coolant temp in check when the header/exhaust are working hard</td></tr>
          <tr><td class="part">Coolant Expansion Tank</td><td class="date">10/08/2025</td><td class="cost">$346.00</td>
            <td class="note">Factory tanks are a known age-related crack point — replaced preventatively</td></tr>
          <tr><td class="part">Gates Engine Water Pump</td><td class="date">10/08/2025</td><td class="cost">$59.00</td>
            <td class="note">Preventative swap alongside the cooling system refresh</td></tr>
          <tr><td class="part">HPS Silicone Radiator Coolant Hose Kit</td><td class="date">11/02/2025</td><td class="cost">$306.70</td>
            <td class="note">Silicone resists heat-soak and swelling far better than factory rubber</td></tr>
          <tr><td class="part">Lower Radiator Mounts (L/R)</td><td class="date">11/09/2025</td><td class="cost">$31.79</td>
            <td class="note">Fresh isolators to go with the new radiator</td></tr>
          <tr><td class="part">Serpentine Belt</td><td class="date">11/18/2025</td><td class="cost">$19.00</td>
            <td class="note">Preventative maintenance</td></tr>
          <tr><td class="part">PENTOSIN Pentofrost A3</td><td class="date">03/26/2026</td><td class="cost">$35.44</td>
            <td class="note">Coolant fill</td></tr>
        </tbody>
      </table>
      <div class="sec-foot">No horsepower claim here. Without solid cooling though, the header and exhaust gains fade once things get hot on track.</div>
    </div>
  </div>

  <!-- ============ SUSPENSION & HANDLING ============ -->
  <div class="section">
    <div class="sec-head">
      <svg class="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v3M16 3v3M8 18v3M16 18v3"/><path d="M8 6c0 3 8 3 8 6s-8 3-8 6M16 6c0 3-8 3-8 6s8 3 8 6"/></svg>
      <h3>Suspension &amp; Handling</h3>
      <div class="sec-sub">7 parts · $1,948.97 · grip, not hp</div>
    </div>
    <div class="panel">
      <div class="illus-row">
        <div class="illus">
          <svg width="70" height="46" viewBox="0 0 70 46" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 8v6M14 14c8 3 8 9 0 12M14 26c8 3 8 9 0 12M14 38v-6"/>
            <path d="M14 8h34M14 40h34"/>
            <ellipse cx="56" cy="8" rx="4" ry="4"/>
            <ellipse cx="56" cy="40" rx="4" ry="4"/>
          </svg>
          <div class="illus-cap"><b>Adjustable sway bar + springs</b> — lower spring rate front &amp; rear, tunable anti-roll bar stiffness</div>
        </div>
        <div class="illus">
          <svg width="70" height="46" viewBox="0 0 70 46" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="24" cy="23" r="15"/>
            <circle cx="24" cy="23" r="5"/>
            <path d="M24 8v10M24 28v8M11 23h9M35 23h9"/>
            <path d="M40 12l10-4M40 34l10 4"/>
          </svg>
          <div class="illus-cap"><b>Camber links + bushings</b> — corrects geometry for the lowered ride height, removes rubber deflection under load</div>
        </div>
      </div>
      <table>
        <thead><tr><th>Part</th><th>Installed</th><th class="num">Cost</th><th>Effect</th></tr></thead>
        <tbody>
          <tr><td class="part">Whiteline Sway Bar Kit (F/R)</td><td class="date">01/15/2026</td><td class="cost">$615.99</td>
            <td class="note">Adjustable, less body roll, sharper turn-in and more predictable rotation mid-corner</td></tr>
          <tr><td class="part">Rear Upper Lateral Camber Links</td><td class="date">01/15/2026</td><td class="cost">$399.00</td>
            <td class="note">Restores correct camber/toe on the lowered rear, keeps the contact patch flat under load</td></tr>
          <tr><td class="part">Progress Technology MX5 Springs</td><td class="date">11/12/2025</td><td class="cost">$238.50</td>
            <td class="note">Lowers center of gravity, tightens spring rate over the soft factory setup</td></tr>
          <tr><td class="part">Energy Suspension Front Control Arm Bushings</td><td class="date">01/15/2026</td><td class="cost">$105.99</td>
            <td class="note">Polyurethane replaces soft factory rubber — less deflection under cornering load</td></tr>
          <tr><td class="part">Energy Suspension Rear Control Arm Bushings</td><td class="date">01/15/2026</td><td class="cost">$145.99</td>
            <td class="note">Same, rear axle</td></tr>
          <tr><td class="part">Energy Suspension Steering Rack Bushings</td><td class="date">01/15/2026</td><td class="cost">$30.99</td>
            <td class="note">Tightens steering feel, removes rack slop</td></tr>
          <tr><td class="part">Bridgestone Potenza RE050A (set of 4)</td><td class="date">12/10/2024</td><td class="cost">$412.51</td>
            <td class="note">Summer performance tire — the single biggest real-world grip upgrade on the car</td></tr>
        </tbody>
      </table>
      <div class="sec-foot">Doesn't add peak power. Flatter body control, less bushing deflection, and more front-end bite so the power upgrades actually stick in a corner.</div>
    </div>
  </div>

  <!-- ============ STEERING & DRIVETRAIN ============ -->
  <div class="section">
    <div class="sec-head">
      <svg class="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><path d="M12 4v4M12 16v4M4.5 8l3 2M16.5 14l3 2M4.5 16l3-2M16.5 10l3-2"/></svg>
      <h3>Steering &amp; Drivetrain</h3>
      <div class="sec-sub">6 parts · $603.64 · reliability + response</div>
    </div>
    <div class="panel">
      <table>
        <thead><tr><th>Part</th><th>Installed</th><th class="num">Cost</th><th>Effect</th></tr></thead>
        <tbody>
          <tr><td class="part">RoadsterSport Competition Motor Mounts</td><td class="date">01/16/2026</td><td class="cost">$217.00</td>
            <td class="note">Firmer poly mounts cut drivetrain movement — sharper throttle response and less wheel hop off the line (no hp gain, better power transfer)</td></tr>
          <tr><td class="part">Aluminum Power Steering Reservoir</td><td class="date">03/18/2026</td><td class="cost">$252.27</td>
            <td class="note">Replaces the factory reservoir, a known long-term failure point</td></tr>
          <tr><td class="part">Power Steering Return Hose</td><td class="date">03/16/2026</td><td class="cost">$53.60</td><td class="note">Reservoir service line</td></tr>
          <tr><td class="part">Power Steering Reservoir Hose</td><td class="date">03/16/2026</td><td class="cost">$34.60</td><td class="note">Reservoir service line</td></tr>
          <tr><td class="part">Power Steering Cooler Tube Clip</td><td class="date">11/16/2025</td><td class="cost">$20.38</td><td class="note">Retaining hardware</td></tr>
          <tr><td class="part">Valvoline MaxLife Full Synthetic ATF</td><td class="date">03/26/2026</td><td class="cost">$25.79</td><td class="note">Fluid service</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ============ AERO & EXTERIOR ============ -->
  <div class="section">
    <div class="sec-head">
      <svg class="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12h11M11 12l4-4M11 12l4 4M18 9h3M18 15h3"/></svg>
      <h3>Aero &amp; Exterior</h3>
      <div class="sec-sub">7 parts · $623.28</div>
    </div>
    <div class="panel">
      <div class="illus-row">
        <div class="illus">
          <svg width="70" height="46" viewBox="0 0 70 46" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 32c8-16 20-24 32-24s24 8 32 24"/>
            <path d="M4 32h64"/>
            <path d="M14 32c2-6 6-9 10-9M60 32c-2-6-6-9-10-9"/>
          </svg>
          <div class="illus-cap"><b>Front lip + undertray</b> — cleans airflow entry and smooths the underbody, helping route air through the new radiator</div>
        </div>
      </div>
      <table>
        <thead><tr><th>Part</th><th>Installed</th><th class="num">Cost</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td class="part">LRB Speed NC Undertray</td><td class="date">11/09/2025</td><td class="cost">$228.00</td>
            <td class="note">Smooths underbody airflow, helps direct air through the radiator</td></tr>
          <tr><td class="part">Front Lip</td><td class="date">10/03/2025</td><td class="cost">$174.00</td>
            <td class="note">Reduces front-end lift, cleans up airflow entry</td></tr>
          <tr><td class="part">Flyin Miata Tow Hook</td><td class="date">02/19/2025</td><td class="cost">$58.28</td><td class="note">Track-day / paddock requirement</td></tr>
          <tr><td class="part">Copper Red Mica Touch-Up Paint</td><td class="date">01/01/2026</td><td class="cost">$96.00</td><td class="note">Chip touch-up, factory color match</td></tr>
          <tr><td class="part">Front Hood Hydraulic Struts</td><td class="date">11/16/2025</td><td class="cost">$38.00</td><td class="note">Quality-of-life, replaces the prop rod</td></tr>
          <tr><td class="part">Hella Horn Kit</td><td class="date">11/08/2025</td><td class="cost">$19.00</td><td class="note">Louder, better-toned horn</td></tr>
          <tr><td class="part">Stubby Antenna</td><td class="date">12/11/2024</td><td class="cost">$10.00</td><td class="note">Weight / aesthetic swap</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ============ INTERIOR ============ -->
  <div class="section">
    <div class="sec-head">
      <svg class="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/><path d="M5 12h13a2 2 0 0 1 2 2v3H7l-2-2v-3Z"/><path d="M7 19v-2M17 19v-2"/></svg>
      <h3>Interior</h3>
      <div class="sec-sub">6 parts · $682.78</div>
    </div>
    <div class="panel">
      <table>
        <thead><tr><th>Part</th><th>Installed</th><th class="num">Cost</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td class="part">NC2/NC3 Center Console Assembly</td><td class="date">12/11/2024</td><td class="cost">$143.70</td><td class="note">Later-gen console swap</td></tr>
          <tr><td class="part">NC2/NC3 Center Console Panels</td><td class="date">01/09/2025</td><td class="cost">$126.29</td><td class="note">Matching trim panels</td></tr>
          <tr><td class="part">NC Door Insert Covers</td><td class="date">01/02/2025</td><td class="cost">$109.10</td><td class="note">Refreshed door card inserts</td></tr>
          <tr><td class="part">Japanese Weighted Teardrop</td><td class="date">12/10/2024</td><td class="cost">$137.00</td><td class="note">Shift knob — added heft sharpens shift feel</td></tr>
          <tr><td class="part">Sparco Land Gloves</td><td class="date">12/25/2024</td><td class="cost">$119.00</td><td class="note">Driving gloves</td></tr>
          <tr><td class="part">Door Pull Straps</td><td class="date">12/11/2024</td><td class="cost">$47.69</td><td class="note">Lightweight pull straps</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ============ MAINTENANCE ============ -->
  <div class="section">
    <div class="sec-head">
      <svg class="sec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14.7 6.3a4 4 0 0 0-5.6 5.1L4 16.5V20h3.5l5.1-5.1a4 4 0 0 0 5.1-5.6l-2.6 2.6-2.1-2.1 2.7-2.5Z"/></svg>
      <h3>Maintenance</h3>
      <div class="sec-sub">2 parts · $43.78</div>
    </div>
    <div class="panel">
      <table>
        <thead><tr><th>Part</th><th>Installed</th><th class="num">Cost</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td class="part">Valve Cover Seal</td><td class="date">03/27/2026</td><td class="cost">$32.99</td><td class="note">Oil leak service</td></tr>
          <tr><td class="part">Valve Cover Gasket (L362-10-2D5A)</td><td class="date">03/27/2026</td><td class="cost">$10.79</td><td class="note">Paired with the seal above</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="page-foot">
    <span>2008 MAZDA MX‑5 · NC1 · BUILD SHEET</span>
    <span>$7,700 purchase · $8,322 parts · $4,250 labor · $20,272 all-in · updated 07/2026</span>
  </div>
`

export default sheetHtml
