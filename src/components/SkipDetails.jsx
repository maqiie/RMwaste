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
  ChevronDown,
} from "lucide-react";

const SkipDetails = ({ selectedSkip, onBack, onConfirm }) => {
  const [permitChecked, setPermitChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const calculateFinalPrice = (skip) => {
    return Math.round(skip.price_before_vat * (1 + skip.vat / 100));
  };

  const finalPrice = calculateFinalPrice(selectedSkip);

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const isFormValid = permitChecked && selectedDate && paymentMethod;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl text-slate-700 font-medium transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-lg hover:-translate-y-1"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Selection
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Skip Details & Booking
            </h1>
            <p className="text-slate-600 mt-2">Complete your skip hire booking</p>
          </div>
          <div className="w-32"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skip Details Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
              {/* Skip Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-lg">
                    <Truck className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">{selectedSkip.size} Yard Skip</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <p className="text-slate-600">{selectedSkip.hire_period_days} day hire period</p>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        £{finalPrice}
                      </span>
                      <div className="px-3 py-1 bg-white/60 rounded-full">
                        <span className="text-sm text-slate-600 font-medium">inc. VAT</span>
                      </div>
                    </div>
                    <p className="text-slate-600">
                      £{selectedSkip.price_before_vat} + £{Math.round(selectedSkip.price_before_vat * selectedSkip.vat / 100)} VAT ({selectedSkip.vat}%)
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500 mb-2">Total for</div>
                    <div className="text-2xl font-bold text-slate-800">{selectedSkip.hire_period_days} days</div>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/70 rounded-2xl p-4 border border-white/50 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{selectedSkip.hire_period_days} days</div>
                      <div className="text-xs text-slate-500">Hire period</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 rounded-2xl p-4 border border-white/50 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <Navigation className={`w-5 h-5 ${selectedSkip.allowed_on_road ? 'text-green-500' : 'text-orange-500'}`} />
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">
                        {selectedSkip.allowed_on_road ? 'Road placement' : 'Private only'}
                      </div>
                      <div className="text-xs text-slate-500">Location type</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 rounded-2xl p-4 border border-white/50 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <Weight className={`w-5 h-5 ${selectedSkip.allows_heavy_waste ? 'text-green-500' : 'text-blue-500'}`} />
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">
                        {selectedSkip.allows_heavy_waste ? 'Heavy waste OK' : 'Light waste only'}
                      </div>
                      <div className="text-xs text-slate-500">Waste type</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 rounded-2xl p-4 border border-white/50 hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{selectedSkip.postcode}</div>
                      <div className="text-xs text-slate-500">Delivery area</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Important Information</h4>
                    <p className="text-sm text-amber-700">
                      Delivery is available Monday-Friday, 7am-5pm. Please ensure someone is available to accept delivery and provide clear access instructions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="space-y-6 relative">
            {/* Permit Confirmation */}
            <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-3xl p-6 shadow-xl relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className={`w-6 h-6 ${permitChecked ? 'text-green-500' : 'text-slate-400'}`} />
                <h3 className="text-lg font-bold text-slate-800">Permit Confirmation</h3>
              </div>
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  permitChecked
                    ? 'border-green-200 bg-green-50'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permitChecked}
                      onChange={() => setPermitChecked(!permitChecked)}
                      className="w-5 h-5 text-blue-600 rounded-md focus:ring-blue-500 mt-0.5"
                    />
                    <div>
                      <div className="font-semibold text-slate-800 mb-1">
                        I confirm permit requirements are handled
                      </div>
                      <div className="text-sm text-slate-600">
                        For road placement, you must have the necessary council permits
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Delivery Date */}
            <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-3xl p-6 shadow-xl relative z-20">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-bold text-slate-800">Delivery Date</h3>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center justify-between ${
                    selectedDate
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-slate-800">
                      {selectedDate ? formatDate(new Date(selectedDate)) : 'Select delivery date'}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Monday - Friday only
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
                </button>
                {showDatePicker && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-[100]">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-4">
                      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                        {getAvailableDates().map((date, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedDate(date.toISOString().split('T')[0]);
                              setShowDatePicker(false);
                            }}
                            className={`p-3 rounded-lg text-left transition-all duration-200 w-full ${
                              selectedDate === date.toISOString().split('T')[0]
                                ? 'bg-blue-100 border-2 border-blue-300 text-blue-800'
                                : 'hover:bg-slate-50 border-2 border-transparent'
                            }`}
                          >
                            <div className="font-medium">{formatDate(date)}</div>
                            <div className="text-xs text-slate-500">
                              {date.toLocaleDateString('en-GB')}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-3xl p-6 shadow-xl relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-green-500" />
                <h3 className="text-lg font-bold text-slate-800">Payment Method</h3>
              </div>
              <div className="space-y-3">
                {['Credit Card', 'Debit Card', 'Bank Transfer'].map((method) => (
                  <label key={method} className="block cursor-pointer">
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === method
                        ? 'border-green-200 bg-green-50'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <div className="font-semibold text-slate-800">{method}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Book Now Button */}
            <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-3xl p-6 shadow-xl relative z-10">
              <button
                onClick={() => onConfirm({ selectedDate, paymentMethod })}
                disabled={!isFormValid}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  isFormValid
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Book Now - £{finalPrice}
              </button>
              {!isFormValid && (
                <div className="mt-3 text-sm text-slate-500 text-center">
                  Please complete all required fields above
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkipDetails;