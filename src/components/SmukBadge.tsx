import React from 'react';

interface SmukBadgeProps {
  className?: string;
  size?: number | string;
}

export const SmukBadge: React.FC<SmukBadgeProps> = ({ className = "w-full h-full", size }) => {
  return (
    <svg
      viewBox="0 0 300 420"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Outline */}
      <defs>
        <clipPath id="shieldClip">
          <path d="M40 70 H260 C260 70 270 200 240 280 C210 340 150 375 150 375 C150 375 90 340 60 280 C30 200 40 70 40 70 Z" />
        </clipPath>
        <linearGradient id="redGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="100%" stopColor="#d50000" />
        </linearGradient>
        <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0018f5" />
          <stop offset="100%" stopColor="#000cb8" />
        </linearGradient>
      </defs>

      {/* Background White Card */}
      <rect width="300" height="420" rx="16" fill="white" />

      {/* TOP HEADER BOX */}
      <path
        d="M32 16 H268 V66 H32 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <text
        x="150"
        y="38"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="17"
        fontWeight="900"
        fill="#000000"
        letterSpacing="0.8"
      >
        ST. KALEMBA S.S
      </text>
      <text
        x="150"
        y="58"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="900"
        fill="#000000"
        letterSpacing="0.8"
      >
        VILLAMARIA
      </text>

      {/* MAIN SHIELD BORDER */}
      <path
        d="M32 66 H268 C268 66 280 210 246 298 C212 364 150 400 150 400 C150 400 88 364 54 298 C20 210 32 66 32 66 Z"
        fill="#ffffff"
        stroke="#000000"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* INNER SHIELD */}
      <g clipPath="url(#shieldClip)">
        {/* Red Top-Left Triangle */}
        <polygon points="32,66 268,66 32,300" fill="url(#redGrad)" />
        {/* Blue Bottom-Right Triangle */}
        <polygon points="268,66 268,300 150,400 32,300" fill="url(#blueGrad)" />

        {/* Diagonal Division Line */}
        <line x1="32" y1="300" x2="268" y2="66" stroke="#ffffff" strokeWidth="4" />

        {/* GRADUATION CAP (MORTARBOARD) */}
        <g transform="translate(150, 130)">
          {/* Cap Base */}
          <ellipse cx="0" cy="20" rx="30" ry="12" fill="#111111" stroke="#ffffff" strokeWidth="1.5" />
          {/* Diamond Top */}
          <polygon points="0,-16 54,0 0,16 -54,0" fill="#111111" stroke="#ffffff" strokeWidth="2.5" />
          {/* Button in center */}
          <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
          {/* Tassel */}
          <path d="M0 0 Q 30 10 36 32" stroke="#ffffff" strokeWidth="2.5" fill="none" />
          <path d="M34 32 C 34 30, 42 38, 40 44 C 38 48, 30 46, 34 32 Z" fill="#ffffff" stroke="#111111" strokeWidth="1" />
        </g>

        {/* CROSSED PENS */}
        <g transform="translate(150, 205)">
          {/* Left Pen */}
          <g transform="rotate(-15) translate(-22, -35)">
            <rect x="-4" y="0" width="8" height="50" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <polygon points="-4,50 4,50 0,65" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <polygon points="-1,61 1,61 0,65" fill="#000000" />
            <path d="M-6 8 C -8 18, -4 28, -4 30" stroke="#000000" strokeWidth="1.5" fill="none" />
          </g>
          {/* Right Pen */}
          <g transform="rotate(15) translate(22, -35)">
            <rect x="-4" y="0" width="8" height="50" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <polygon points="-4,50 4,50 0,65" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <polygon points="-1,61 1,61 0,65" fill="#000000" />
            <path d="M6 8 C 8 18, 4 28, 4 30" stroke="#000000" strokeWidth="1.5" fill="none" />
          </g>
        </g>

        {/* OPEN BOOK OF WISDOM */}
        <g transform="translate(150, 248)">
          {/* Book Base Outline */}
          <path
            d="M-52 26 C -30 20 -10 24 0 30 C 10 24 30 20 52 26 L 52 -22 C 30 -28 10 -24 0 -18 C -10 -24 -30 -28 -52 -22 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="3"
          />
          {/* Book Spine Center */}
          <line x1="0" y1="-18" x2="0" y2="30" stroke="#000000" strokeWidth="2.5" />
          {/* Text Lines Left Page */}
          <line x1="-42" y1="-12" x2="-8" y2="-8" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <line x1="-42" y1="-2" x2="-8" y2="2" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <line x1="-42" y1="8" x2="-8" y2="12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <line x1="-42" y1="18" x2="-14" y2="21" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          {/* Text Lines Right Page */}
          <line x1="8" y1="-8" x2="42" y2="-12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="2" x2="42" y2="-2" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="12" x2="42" y2="8" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="21" x2="42" y2="18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      {/* Inner White Border around shield */}
      <path
        d="M44 72 H256 C256 72 267 205 238 286 C208 348 150 382 150 382 C150 382 92 348 62 286 C33 205 44 72 44 72 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.5"
      />

      {/* RIBBON CURLS (BACK LAYER) */}
      <path d="M16 350 C 16 325 38 318 50 338 L 48 376 C 32 376 16 372 16 350 Z" fill="#888888" stroke="#000000" strokeWidth="3" />
      <path d="M284 350 C 284 325 262 318 250 338 L 252 376 C 268 376 284 372 284 350 Z" fill="#888888" stroke="#000000" strokeWidth="3" />

      {/* BOTTOM RIBBON BANNER */}
      <path
        d="M26 345 C 75 378 225 378 274 345 L 270 390 C 215 422 85 422 30 390 Z"
        fill="url(#redGrad)"
        stroke="#000000"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* CURVED TEXT ON RIBBON */}
      <path
        id="ribbonTextPath"
        d="M34 380 Q 150 412 266 380"
        fill="none"
      />
      <text fill="#ffffff" fontWeight="900" fontSize="17" letterSpacing="0.5">
        <textPath href="#ribbonTextPath" startOffset="50%" textAnchor="middle">
          Der Herr Ist Mein Hirt
        </textPath>
      </text>
    </svg>
  );
};
