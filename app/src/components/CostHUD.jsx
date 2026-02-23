import { useState } from 'react';
import { DollarSign, X, TrendingUp } from 'lucide-react';

export default function CostHUD({ costData }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
      >
        <DollarSign className="w-4 h-4 text-green-400" />
        <div className="text-sm">
          <div className="text-slate-400">Today: <span className="text-green-400 font-medium">${costData.today.toFixed(2)}</span></div>
          <div className="text-slate-400">Total: <span className="text-white font-medium">${costData.total.toFixed(2)}</span></div>
        </div>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-slate-800 rounded-xl p-6 w-96 max-w-[90vw]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Cost Breakdown
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-slate-400 mb-2">By Agent</h4>
                {Object.entries(costData.byAgent).map(([agent, cost]) => (
                  <div key={agent} className="flex justify-between py-1">
                    <span>{agent}</span>
                    <span className="text-green-400">${cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm text-slate-400 mb-2">By Model</h4>
                {Object.entries(costData.byModel).map(([model, cost]) => (
                  <div key={model} className="flex justify-between py-1">
                    <span className="text-sm">{model}</span>
                    <span className="text-green-400">${cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Burn rate</span>
                  <span>$0.42/hr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
