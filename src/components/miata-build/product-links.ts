/** Product URLs keyed by exact part names in the build sheet. */
const productLinks: Record<string, string> = {
  "Flyin Miata Tow Hook": "https://flyinmiata.com/products/flyin-miata-front-tow-hook-for-nc-and-nd-silver",
  "Coolant Expansion Tank": "https://www.amazon.com/dp/B071NVPF8C",
  "Aluminum Power Steering Reservoir": "https://www.good-win-racing.com/Mazda-Performance-Part/61-2173.html",
  "Gates Engine Water Pump": "https://www.partsgeek.com/y46187m-mazda-mx5-miata-water-pump.html",
  "HPS Silicone Radiator Coolant Hose Kit": "https://www.good-win-racing.com/Mazda-Performance-Part/61-3193.html",
  "Mazda Motorsport Intake System": "https://5xracing.com/i-23993659-aem-cold-air-intake-for-2006-15-mazda-mx-5-nc.html",
  "Power Steering Return Hose":
    "https://www.jimellismazdaparts.com/products/Mazda/Power-Steering-Return-Hose-Upper/1904737/NE5132683B.html",
  "Power Steering Reservoir Hose":
    "https://www.jimellismazdaparts.com/products/Mazda/Power-Steering-Reservoir-Hose/1904739/NE5132688.html",
  "RoadsterSport MX5 STREET Header": "https://www.good-win-racing.com/Mazda-Performance-Part/61-1155.html",
  'RoadsterSport Helmholtz Midpipe & 5" Cat': "https://www.good-win-racing.com/Mazda-Performance-Part/61-1738.html",
  "CSF Performance Radiator 32mm": "https://www.good-win-racing.com/Mazda-Performance-Part/61-1519.html",
  "RoadsterSport Exhaust": "https://www.good-win-racing.com/Mazda-Performance-Part/60-13262.html",
  "Whiteline Sway Bar Kit (F/R)": "https://whitelineperformance.com/products/bmk004-sway-bar-vehicle-kit",
  "Rear Upper Lateral Camber Links":
    "https://www.splparts.com/products/nc-miata-rear-upper-lateral-camber-links-mx-5-rx-8-fe.html",
  "Progress Technology MX5 Springs": "https://www.good-win-racing.com/Mazda-Performance-Part/61-0545NC.html",
  "Energy Suspension Front Control Arm Bushings":
    "https://emnotek.com/products/energy-suspension-90-97-mazda-miata-red-front-control-arm-bushing-set",
  "Energy Suspension Rear Control Arm Bushings": "https://www.energysuspensionparts.com/11.3110",
  "Energy Suspension Steering Rack Bushings":
    "https://mossmiata.com/910-416-polyurethane-rack-and-pinion-bushing-set-by-energy-suspension",
  "RoadsterSport Competition Motor Mounts": "https://www.good-win-racing.com/Mazda-Performance-Part/61-1713.html",
  "Bridgestone Potenza RE050A (set of 4)": "https://www.tirerack.com/tires/bridgestone-potenza-re050a",
  "NC Door Insert Covers":
    "https://www.redlinegoods.com/MiataNCshiftboot.php/MiataNCdoorinserts/2006-15-Mazda-Miata-NC-door-insert-covers",
  "NC2/NC3 Center Console Assembly": "https://www.ebay.com/itm/235822527550",
  "NC2/NC3 Center Console Panels":
    "https://www.jimellismazdaparts.com/showAssembly.aspx?ukey_assembly=308988&ukey_make=995&ukey_model=14360&modelYear=2012&ukey_category=20229",
  "Japanese Weighted Teardrop":
    "https://billetworkz.com/collections/mazda-6-speed-rlu-shift-knobs-weighted-engraved/products/6-speed-miata-japanese-weighted-6-speed-mazda-rlu-fitment",
  "Door Pull Straps": "https://www.superautomotiveaccessories.com/product/the-strap",
  "LRB Speed NC Undertray": "https://lrbspeed.com/product/nc-mx-5-miata-undertray/",
  "Serpentine Belt": "https://mossmiata.com/910-917-belt-serpentine",
  "Stubby Antenna": "https://www.amazon.com/dp/B08GYC2LB5",
  "Hella Horn Kit": "https://www.amazon.com/dp/B076W4Q14G",
  "Front Hood Hydraulic Struts": "https://www.amazon.com/dp/B099PQVSNX",
  "Front Lip": "https://www.carbonmiata.com/shop/ad-fbl-mmt06gv-pu-gv-style-front-lip-06-08-nc1-for-miata-nc-1080",
  "Sparco Land Gloves": "https://www.sparcousa.com/product/land-copy",
  "Power Steering Cooler Tube Clip": "https://www.ebay.com/itm/146587941959",
  "PENTOSIN Pentofrost A3": "https://www.rockauto.com/en/moreinfo.php?pk=7668884&cc=2002678&pt=11393&jsn=16",
  "Valvoline MaxLife Full Synthetic ATF":
    "https://www.rockauto.com/en/moreinfo.php?pk=10410961&cc=2002678&pt=11395&jsn=21",
  "Valve Cover Seal": "https://a.co/d/07H9sklr",
  "Valve Cover Gasket (L362-10-2D5A)": "https://a.co/d/0i6HeVGE",
}

export function getProductLink(partName: string): string | undefined {
  return productLinks[partName]
}

export function enhanceSheetWithProductLinks(html: string): string {
  return html.replace(/<td class="part">([^<]+)<\/td>/g, (_match, rawName: string) => {
    const name = rawName.replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    const url = getProductLink(name)
    if (!url) {
      return `<td class="part">${rawName}</td>`
    }
    const safeUrl = url.replace(/"/g, "&quot;")
    return `<td class="part part--linked">
      <span class="part-label">${rawName}</span>
      <span class="part-tip" role="tooltip">
        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer">View product ↗</a>
      </span>
    </td>`
  })
}

export default productLinks
