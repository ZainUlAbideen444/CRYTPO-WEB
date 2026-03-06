// TradeForm.jsx — Buy/Sell form with modal confirmation
import { useState } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export default function TradeForm({ coin, balance, onTrade }) {
  const [side, setSide] = useState('BUY');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tradeSuccess, setTradeSuccess] = useState(false);

  const handleAmountChange = (val) => {
    setAmount(val);
    if (val && coin?.price) setTotal((parseFloat(val) * coin.price).toFixed(2));
    else setTotal('');
  };

  const handleTotalChange = (val) => {
    setTotal(val);
    if (val && coin?.price) setAmount((parseFloat(val) / coin.price).toFixed(8));
    else setAmount('');
  };

  const confirmTrade = () => {
    setShowModal(false);
    setTradeSuccess(true);
    if (onTrade) onTrade({ side, coin: coin?.symbol, amount: parseFloat(amount), total: parseFloat(total), price: coin?.price });
    setTimeout(() => {
      setTradeSuccess(false);
      setAmount('');
      setTotal('');
    }, 3000);
  };

  const percentButtons = [25, 50, 75, 100];

  return (
    <div>
      {/* Side Toggle */}
      <div className="flex rounded-lg overflow-hidden mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => setSide('BUY')}
          className={`flex-1 py-2.5 text-sm font-bold font-sans tracking-wider transition-all ${side === 'BUY' ? 'text-white' : 'text-white/30'}`}
          style={side === 'BUY' ? { background: 'linear-gradient(135deg, #16a34a, #15803d)', boxShadow: '0 0 20px rgba(22,163,74,0.3)' } : {}}>
          BUY
        </button>
        <button onClick={() => setSide('SELL')}
          className={`flex-1 py-2.5 text-sm font-bold font-sans tracking-wider transition-all ${side === 'SELL' ? 'text-white' : 'text-white/30'}`}
          style={side === 'SELL' ? { background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 0 20px rgba(239,68,68,0.3)' } : {}}>
          SELL
        </button>
      </div>

      {/* Price Display */}
      {coin && (
        <div className="flex justify-between items-center mb-4 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <span className="text-xs text-white/40">Market Price</span>
          <span className="text-sm font-mono font-bold text-white">${coin.price.toLocaleString()}</span>
        </div>
      )}

      {/* Amount Input */}
      <div className="mb-3">
        <label className="text-xs text-white/40 mb-1.5 block tracking-wider">AMOUNT ({coin?.symbol || 'COIN'})</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder="0.00"
          className="input-dark w-full px-3 py-2.5 rounded-lg text-sm font-mono"
        />
      </div>

      {/* Percent shortcuts */}
      <div className="flex gap-2 mb-3">
        {percentButtons.map(p => (
          <button key={p} onClick={() => {
            if (balance && coin?.price) {
              const t = (balance * p / 100);
              handleTotalChange(t.toFixed(2));
            }
          }}
            className="flex-1 py-1 text-xs font-semibold rounded-md transition-all hover:bg-red-500/10 hover:text-red-400 text-white/40"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {p}%
          </button>
        ))}
      </div>

      {/* Total Input */}
      <div className="mb-4">
        <label className="text-xs text-white/40 mb-1.5 block tracking-wider">TOTAL (USDT)</label>
        <input
          type="number"
          value={total}
          onChange={(e) => handleTotalChange(e.target.value)}
          placeholder="0.00"
          className="input-dark w-full px-3 py-2.5 rounded-lg text-sm font-mono"
        />
      </div>

      {/* Balance */}
      <div className="flex justify-between text-xs mb-4">
        <span className="text-white/30">Available</span>
        <span className="font-mono text-white/60">${balance?.toLocaleString()} USDT</span>
      </div>

      {/* Submit */}
      <button
        onClick={() => { if (amount && total) setShowModal(true); }}
        disabled={!amount || !total || !coin}
        className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider transition-all ${!amount || !total ? 'opacity-40 cursor-not-allowed' : ''}`}
        style={side === 'BUY'
          ? { background: 'linear-gradient(135deg, #16a34a, #15803d)', boxShadow: amount && total ? '0 0 20px rgba(22,163,74,0.2)' : 'none', color: 'white' }
          : { background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: amount && total ? '0 0 20px rgba(239,68,68,0.2)' : 'none', color: 'white' }
        }>
        {side} {coin?.symbol || 'COIN'}
      </button>

      {/* Success Banner */}
      {tradeSuccess && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg animate-fade-in-up"
          style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-xs text-green-400 font-semibold">Trade executed successfully!</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" onClick={() => setShowModal(false)}>
          <div className="glass-card p-6 w-80 animate-fade-in-up" onClick={e => e.stopPropagation()}
            style={{ border: '1px solid rgba(239,68,68,0.2)', boxShadow: '0 0 40px rgba(239,68,68,0.15)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-bold text-white">Confirm Trade</h3>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X size={16} /></button>
            </div>

            <div className="space-y-3 mb-5">
              {[
                ['Action', side, side === 'BUY' ? 'text-green-400' : 'text-red-400'],
                ['Coin', coin?.symbol || '', 'text-white'],
                ['Amount', `${parseFloat(amount).toFixed(8)} ${coin?.symbol}`, 'text-white font-mono'],
                ['Price', `$${coin?.price.toLocaleString()}`, 'text-white font-mono'],
                ['Total', `$${parseFloat(total).toLocaleString()}`, 'text-yellow-400 font-mono font-bold'],
              ].map(([label, val, cls]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs text-white/40">{label}</span>
                  <span className={`text-xs font-semibold ${cls}`}>{val}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <AlertCircle size={12} className="text-red-400 flex-shrink-0" />
              <p className="text-xs text-white/50">This is a simulated trade. No real money involved.</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1 py-2.5 rounded-xl text-sm">Cancel</button>
              <button onClick={confirmTrade}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                style={side === 'BUY'
                  ? { background: 'linear-gradient(135deg, #16a34a, #15803d)' }
                  : { background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                Confirm {side}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
