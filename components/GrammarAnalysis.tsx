import React from 'react';
import { GrammarAnalysis } from '../types';

interface GrammarAnalysisProps {
  analysis: GrammarAnalysis;
}

export const GrammarAnalysisDisplay: React.FC<GrammarAnalysisProps> = ({ analysis }) => {
  if (!analysis || !analysis.errors || analysis.errors.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-xl">✨</span>
        </div>
        <h3 className="font-bold text-slate-800">Excellent Grammar!</h3>
        <p className="text-slate-500 text-sm mt-1">
          Koli didn't detect any major grammatical errors in your speech. Keep it up!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <h4 className="font-bold text-slate-700 text-sm flex items-center gap-2">
          <span className="text-lg">🛠️</span> Grammar Improvements
        </h4>
        <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">
          {analysis.errors.length} found
        </span>
      </div>

      <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto custom-scrollbar">
        {analysis.errors.map((item, index) => (
          <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-1 shrink-0">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {/* Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-rose-50/50 p-2.5 rounded-lg border border-rose-100">
                    <p className="text-xs text-rose-400 font-bold uppercase tracking-wider mb-1">You said</p>
                    <p className="text-slate-700 font-medium text-sm line-through decoration-rose-400/50 decoration-2">
                      {item.original}
                    </p>
                  </div>
                  <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                    <div className="flex justify-between items-start">
                       <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Better</p>
                       <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded text-center font-medium">
                         {item.type}
                       </span>
                    </div>
                    <p className="text-slate-800 font-bold text-sm">
                      {item.correction}
                    </p>
                  </div>
                </div>
                
                {/* Explanation */}
                <div className="flex items-start gap-2 pt-1">
                   <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <p className="text-sm text-slate-500 leading-snug">
                     {item.explanation}
                   </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};