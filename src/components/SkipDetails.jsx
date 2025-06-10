import React, { useState } from "react";
import {
  Truck,
  Clock,
  MapPin,
  Check,
  ArrowLeft,
  Calendar,
  Weight,
  Navigation,
  CreditCard,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

const SkipDetails = ({ selectedSkip, onBack, onConfirm }) => {
  const [permitChecked, setPermitChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const calculateFinalPrice = (skip) => {
    return Math.round(skip.price_before_vat * (1 + skip.vat / 100));
  };

  const finalPrice = calculateFinalPrice(selectedSkip);

  const theme = {
    bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    cardBg: 'bg-white/70 border border-white/20',
    headerBg: 'bg-white/80 border-b border-white/50',
    text: 'text-slate-900',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',
    accent: 'from-blue-600 to-purple-600',
    accentHover: 'from-blue-700 to-purple-700',
    button: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    input: 'bg-white/80 border border-white/50 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500',
  };

  return (
    <div className={`${theme.bg} min-h-screen p-4`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.button} text-white font-medium transition-all hover:scale-105 shadow-lg`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Selection
          </button>
          <div className="flex-grow text-center">
            <h1 className={`text-3xl font-bold ${theme.text}`}>Skip Details</h1>
          </div>
        </div>

        {/* Skip Details Card */}
        <div className={`${theme.cardBg} rounded-3xl p-8 shadow-xl`}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 bg-gradient-to-r ${theme.accent} rounded-2xl shadow-lg`}>
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${theme.text}`}>{selectedSkip.size} Yard Skip</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className={`w-4 h-4 ${theme.textMuted}`} />
                    <p className={`text-sm ${theme.textMuted}`}>{selectedSkip.hire_period_days} day hire</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                    £{finalPrice}
                  </span>
                  <div className={`px-3 py-1 ${theme.cardBg} rounded-full`}>
                    <span className={`text-sm ${theme.textMuted}`}>inc. VAT</span>
                  </div>
                </div>
                <p className={`text-sm ${theme.textMuted}`}>
                  £{selectedSkip.price_before_vat} + £{Math.round(selectedSkip.price_before_vat * selectedSkip.vat / 100)} VAT ({selectedSkip.vat}%)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.cardBg}`}>
                  <Calendar className={`w-5 h-5 ${selectedSkip.hire_period_days >= 14 ? 'text-green-500' : 'text-slate-400'}`} />
                  <div>
                    <div className={`text-sm font-medium ${theme.text}`}>{selectedSkip.hire_period_days} days</div>
                    <div className={`text-xs ${theme.textMuted}`}>Hire period</div>
                  </div>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.cardBg}`}>
                  <Navigation className={`w-5 h-5 ${selectedSkip.allowed_on_road ? 'text-green-500' : 'text-orange-400'}`} />
                  <div>
                    <div className={`text-sm font-medium ${theme.text}`}>
                      {selectedSkip.allowed_on_road ? 'Road OK' : 'Private only'}
                    </div>
                    <div className={`text-xs ${theme.textMuted}`}>Placement</div>
                  </div>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.cardBg}`}>
                  <Weight className={`w-5 h-5 ${selectedSkip.allows_heavy_waste ? 'text-green-500' : 'text-blue-400'}`} />
                  <div>
                    <div className={`text-sm font-medium ${theme.text}`}>
                      {selectedSkip.allows_heavy_waste ? 'Heavy waste' : 'Light waste'}
                    </div>
                    <div className={`text-xs ${theme.textMuted}`}>Capacity</div>
                  </div>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.cardBg}`}>
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className={`text-sm font-medium ${theme.text}`}>{selectedSkip.postcode}</div>
                    <div className={`text-xs ${theme.textMuted}`}>Location</div>
                  </div>
                </div>
              </div>

              {/* Permit Check */}
              <div className={`flex items-center gap-3 p-4 rounded-xl ${theme.cardBg} mb-6`}>
                <ShieldCheck className={`w-6 h-6 ${permitChecked ? 'text-green-500' : 'text-slate-400'}`} />
                <div className="flex items-center">
                  <input
                    id="permit-check"
                    type="checkbox"
                    checked={permitChecked}
                    onChange={() => setPermitChecked(!permitChecked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="permit-check" className={`ml-2 text-sm font-medium ${theme.text}`}>
                    I have the necessary permits for placing the skip
                  </label>
                </div>
              </div>

              {/* Date Selection */}
              <div className={`p-4 rounded-xl ${theme.cardBg} mb-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-purple-500" />
                  <label htmlFor="delivery-date" className={`text-sm font-medium ${theme.text}`}>
                    Select Delivery Date
                  </label>
                </div>
                <input
                  type="date"
                  id="delivery-date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`w-full ${theme.input} rounded-lg p-2`}
                />
              </div>

              {/* Payment Method */}
              <div className={`p-4 rounded-xl ${theme.cardBg} mb-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-purple-500" />
                  <label htmlFor="payment-method" className={`text-sm font-medium ${theme.text}`}>
                    Payment Method
                  </label>
                </div>
                <select
                  id="payment-method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={`w-full ${theme.input} rounded-lg p-2`}
                >
                  <option value="" disabled>Select a payment method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="debit-card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onConfirm}
            disabled={!permitChecked || !selectedDate || !paymentMethod}
            className={`flex items-center gap-4 ${theme.button} text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group ${
              !permitChecked || !selectedDate || !paymentMethod ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Check className="w-6 h-6" />
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipDetails;
