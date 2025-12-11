import React from 'react';

interface SpeakingRateGaugeProps {
  wpm: number;
}

export const SpeakingRateGauge: React.FC<SpeakingRateGaugeProps> = ({ wpm }) => {
  // Clamp WPM for visual purposes (0 to 220 scale)
  const visualWpm = Math.min(Math.max(wpm, 0), 220);
  
  // Calculate needle angle: -90deg (start) to 90deg (end)
  const angle = (visualWpm / 220) * 180 - 90;
  
  let statusColor = 'text-slate-400';
  let statusText = 'Listening...';
  
  // Only show status if user is actually speaking (WPM > 5)
  if (wpm > 5) {
      if (wpm < 100) {
        statusColor = 'text-amber-500';
        statusText = 'Too Slow';
      } else if (wpm <= 160) {
        statusColor = 'text-emerald-500';
        statusText = 'Good Pace';
      } else {
        statusColor = 'text-rose-500';
        statusText = 'Too Fast';
      }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col items-center relative overflow-hidden transition-all duration-300">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Speaking Pace</h4>
      
      <div className="relative w-48 h-24 mb-1 overflow-hidden">
        {/* SVG Gauge */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Background Arc */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#f1f5f9" strokeWidth="16" strokeLinecap="round" />
            
            {/* Zones */}
            {/* Slow: 0-100 WPM (Start at 180deg, End at ~261deg) */}
            <path d="M 20 100 A 80 80 0 0 1 88 21" fill="none" stroke="#fbbf24" strokeWidth="16" className="opacity-40" />
            
            {/* Good: 100-160 WPM (Start at 261deg, End at ~310deg) */}
            <path d="M 88 21 A 80 80 0 0 1 151 39" fill="none" stroke="#10b981" strokeWidth="16" className="opacity-40" />
            
            {/* Fast: 160-220 WPM (Start at 310deg, End at 360deg) */}
            <path d="M 151 39 A 80 80 0 0 1 180 100" fill="none" stroke="#f43f5e" strokeWidth="16" className="opacity-40" />

            {/* Needle */}
            <g transform={`rotate(${angle} 100 100)`} className="transition-transform duration-700 ease-out">
               <line x1="100" y1="100" x2="100" y2="25" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
               <circle cx="100" cy="100" r="6" fill="#334155" />
            </g>
        </svg>
      </div>
      
      <div className="text-center -mt-5 z-10">
         <div className="text-3xl font-bold tabular-nums text-slate-800 leading-none">{Math.round(wpm)}</div>
         <div className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">WPM</div>
         <div className={`text-xs font-bold mt-1 transition-colors duration-300 ${statusColor}`}>
           {statusText}
         </div>
      </div>
    </div>
  );
};