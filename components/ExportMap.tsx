export function ExportMap() {
  return (
    <svg viewBox="0 0 650 290" className="h-auto w-full" role="img" aria-label="Ankara">
      <g fill="#dcdfe4" stroke="#ffffff" strokeWidth="0.8">
        <path d="M35,55 L95,40 L150,55 L165,95 L130,130 L95,145 L70,120 L40,95 Z" />
        <path d="M135,160 L175,165 L195,205 L175,265 L150,275 L135,230 Z" />
        <path d="M275,55 L345,42 L395,52 L405,95 L375,118 L335,120 L290,108 L270,85 Z" />
        <path d="M280,125 L350,125 L385,155 L375,220 L345,260 L310,250 L295,195 L272,160 Z" />
        <path d="M395,48 L525,38 L595,65 L605,125 L560,165 L490,170 L435,145 L395,110 Z" />
        <path d="M515,205 L580,200 L595,235 L565,265 L520,255 Z" />
      </g>
      <g fill="none" stroke="#8b1220" strokeWidth="1.4" opacity="0.8">
        <path className="map-arc" d="M362,102 Q290,65 215,98" />
        <path className="map-arc" d="M362,102 Q315,70 295,78" />
        <path className="map-arc" d="M362,102 Q330,130 305,155" />
        <path className="map-arc" d="M362,102 Q345,165 328,215" />
        <path className="map-arc" d="M362,102 Q415,80 465,92" />
        <path className="map-arc" d="M362,102 Q445,115 510,132" />
        <path className="map-arc" d="M362,102 Q400,140 432,168" />
        <path className="map-arc" d="M362,102 Q270,135 225,185" />
      </g>
      <g fill="#1c2024">
        <circle cx="215" cy="98" r="3" />
        <circle cx="295" cy="78" r="3" />
        <circle cx="305" cy="155" r="3" />
        <circle cx="328" cy="215" r="3" />
        <circle cx="465" cy="92" r="3" />
        <circle cx="510" cy="132" r="3.5" fill="#8b1220" />
        <circle cx="432" cy="168" r="3" />
        <circle cx="225" cy="185" r="3" />
      </g>
      <g transform="translate(362, 102)">
        <circle cx="0" cy="0" r="14" fill="#8b1220" opacity="0.25" className="map-pulse" />
        <circle cx="0" cy="0" r="4.5" fill="#8b1220" />
        <path d="M0,-28 C-7.5,-28 -13,-22.5 -13,-15 C-13,-6 0,2 0,2 C0,2 13,-6 13,-15 C13,-22.5 7.5,-28 0,-28 Z" fill="#8b1220" />
        <circle cx="0" cy="-15" r="4.5" fill="#ffffff" />
        <text x="0" y="18" textAnchor="middle" fill="#1c2024" fontWeight="700" fontSize="11">
          Ankara
        </text>
      </g>
    </svg>
  );
}
