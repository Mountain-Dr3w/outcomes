import routePaths from '@/lib/veriflux/map-routes.json';
const zoomLevel = 11;
function point(lat:number,lon:number) {
 const latRad=lat*Math.PI/180;
 return [(lon+180)/360*2**zoomLevel, (1-Math.asinh(Math.tan(latRad))/Math.PI)/2*2**zoomLevel];
}
const center=point(38.91,-77.04);
const origin=[Math.floor(center[0])-1,Math.floor(center[1])-1];
const vehicles=[
 [1,38.92,-77.0],[2,38.955,-77.17],[3,38.865,-77.14],
 [4,38.845,-76.96],[5,38.99,-76.94],[6,38.81,-77.13],[7,39.035,-77.10],
];
export function VerifluxMap({zoom,selectedId,showVehicles}:{zoom:number;selectedId:number;showVehicles:boolean}) {
 return <svg viewBox="0 0 768 768" preserveAspectRatio="xMidYMid slice" role="img" aria-label={showVehicles ? "Washington-area map with illustrative road routes and vehicle positions" : "Washington-area map, no routes for this date"}>
  <g transform={`translate(384 384) scale(${zoom}) translate(-384 -384)`}>
   {Array.from({length:9},(_,i)=>{const x=i%3,y=Math.floor(i/3);return <image style={{filter:"saturate(.3) contrast(.92) brightness(1.04)"}} key={i} x={x*256} y={y*256} width="256" height="256" href={`https://tile.openstreetmap.org/${zoomLevel}/${origin[0]+x}/${origin[1]+y}.png`}/>;})}
   {showVehicles && [...routePaths].sort((a,b)=>Number(a.id===selectedId)-Number(b.id===selectedId)).map(route=>{
    const d=route.coordinates.map(([lon,lat],i)=>{const p=point(lat,lon);return `${i?'L':'M'}${((p[0]-origin[0])*256).toFixed(2)} ${((p[1]-origin[1])*256).toFixed(2)}`;}).join(' ');
    const active=route.id===selectedId;
    return <g key={route.id}><path d={d} fill="none" stroke="white" strokeWidth={active?7:5} strokeLinejoin="round" strokeLinecap="round"/><path d={d} fill="none" stroke={active?'#00894e':'#658b80'} strokeWidth={active?4:2.5} strokeLinejoin="round" strokeLinecap="round" opacity={active?1:.75}/></g>;
   })}
   {showVehicles && vehicles.map(([id,lat,lon])=>{const route=routePaths.find(r=>r.id===((id-1)%4)+1)!;const position=route.coordinates[Math.floor(route.coordinates.length*(id>4?.7:.42))];const p=point(position?.[1]??lat,position?.[0]??lon),x=(p[0]-origin[0])*256,y=(p[1]-origin[1])*256;const active=route.id===selectedId;return <g key={id} transform={`translate(${x} ${y})`}>
    <circle r="5" fill="#064b47" stroke="white" strokeWidth="2"/>
    {id===5 && <line x1="0" y1="-3" x2="0" y2="-40" stroke="#064b47" strokeWidth="2"/>}
    <g transform={id===5?"translate(0 -34)":undefined}><path d="M-5 -8 L0 -2 L5 -8" fill={active?'#64eba0':'#064b47'}/>
    <rect x="-29" y="-40" width="58" height="33" rx="5" fill={active?'#64eba0':'#064b47'} stroke="white" strokeWidth="2"/>
    <g transform="translate(-22 -32)" fill="none" stroke={active?'#064b47':'white'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 2h12v11H1zM13 6h5l3 4v3h-8M3 13v2m16-2v2"/><circle cx="5" cy="15" r="2"/><circle cx="17" cy="15" r="2"/></g>
    <text x="15" y="-18" fill={active?'#064b47':'white'} fontFamily="Arial,sans-serif" fontSize="14" fontWeight="600" textAnchor="middle">{id}</text></g>
   </g>;})}
  </g>
 </svg>;
}
