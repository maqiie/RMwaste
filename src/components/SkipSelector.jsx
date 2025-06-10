import React, { useEffect, useState } from "react";
import { fetchSkips } from '../api/fetchSkips';
import {
  Search,
  Truck,
  Clock,
  MapPin,
  Check,
  Filter,
  ArrowRight,
  Calendar,
  Weight,
  Navigation,
  AlertCircle,
  Sparkles,
  Zap,
  Star,
  TrendingUp
} from "lucide-react";

export default function SkipSelector({ onContinue }) {
  const [skips, setSkips] = useState([]);
  const [filteredSkips, setFilteredSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    roadAllowed: false,
    heavyWaste: false,
    maxPrice: 1500
  });

  useEffect(() => {
    fetchSkips()
      .then((data) => {
        setSkips(data);
        setFilteredSkips(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load skips.");
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    applyFilters(value, filters);
  };

  const applyFilters = (searchTerm = search, currentFilters = filters) => {
    let filtered = skips.filter((skip) => {
      const matchesSearch = skip.size.toString().includes(searchTerm) ||
                           `${skip.size} yard`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRoad = !currentFilters.roadAllowed || skip.allowed_on_road;
      const matchesHeavy = !currentFilters.heavyWaste || skip.allows_heavy_waste;
      const finalPrice = skip.price_before_vat * (1 + skip.vat / 100);
      const matchesPrice = finalPrice <= currentFilters.maxPrice;

      return matchesSearch && matchesRoad && matchesHeavy && matchesPrice;
    });

    setFilteredSkips(filtered);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(search, newFilters);
  };

  const handleSkipSelect = (skip) => {
    setSelectedSkip(skip);
  };

 const handleContinue = () => {
  if (selectedSkip && onContinue) {
    onContinue(selectedSkip);
  }
};


  const calculateFinalPrice = (skip) => {
    return Math.round(skip.price_before_vat * (1 + skip.vat / 100));
  };

  const getPopularBadge = (skip) => {
    return skip.size === 6 || skip.size === 8;
  };

  const getBestValueBadge = (skip) => {
    const pricePerYard = calculateFinalPrice(skip) / skip.size;
    return pricePerYard < 50;
  };

  const theme = isDarkMode ? {
    bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    cardBg: 'bg-slate-800/60 border-slate-700/50',
    headerBg: 'bg-slate-900/80 border-slate-700/30',
    text: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    accent: 'from-purple-500 to-pink-500',
    accentHover: 'from-purple-600 to-pink-600',
    button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    input: 'bg-slate-800/60 border-slate-600/50 text-white placeholder-slate-400',
    filterBg: 'bg-slate-800/60 border-slate-700/50'
  } : {
    bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    cardBg: 'bg-white/70 border-white/20',
    headerBg: 'bg-white/80 border-white/50',
    text: 'text-slate-900',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',
    accent: 'from-blue-600 to-purple-600',
    accentHover: 'from-blue-700 to-purple-700',
    button: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    input: 'bg-white/80 border-white/50 text-slate-900 placeholder-slate-400',
    filterBg: 'bg-white/80 border-white/20'
  };

  if (loading) {
    return (
      <div className={`${theme.bg} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
          </div>
          <div className="mt-8 space-y-2">
            <p className={`text-xl font-semibold ${theme.text}`}>Finding Perfect Skips</p>
            <p className={theme.textMuted}>Preparing your options...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${theme.bg} min-h-screen flex items-center justify-center`}>
        <div className={`text-center p-8 ${theme.cardBg} rounded-3xl shadow-2xl max-w-md mx-4`}>
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <h3 className={`text-xl font-bold ${theme.text} mb-2`}>Oops! Something went wrong</h3>
          <p className={`${theme.textMuted} mb-6`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`px-6 py-3 ${theme.button} text-white rounded-xl font-medium transition-all hover:scale-105 shadow-lg`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme.bg} min-h-screen`}>
      {/* Header */}
      <div className={`${theme.headerBg} border-b sticky top-0 z-40 shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative">
              <div className="flex items-center gap-4 mb-3">
                <div className={`p-3 bg-gradient-to-r ${theme.accent} rounded-2xl shadow-lg`}>
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                    Skip Selector Pro
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Sparkles className={`w-4 h-4 ${theme.textMuted}`} />
                    <p className={theme.textMuted}>Find your perfect waste solution</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-3 rounded-xl ${theme.cardBg} shadow-lg hover:scale-105 transition-all`}
                title="Toggle theme"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:scale-105 ${
                  showFilters
                    ? `${theme.button} text-white`
                    : `${theme.cardBg} ${theme.text} hover:shadow-xl`
                }`}
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Smart Filters</span>
                {(filters.roadAllowed || filters.heavyWaste || filters.maxPrice < 1500) && (
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse ml-1"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.textMuted} w-5 h-5 group-focus-within:text-purple-500 transition-colors`} />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by size, features, or requirements..."
                className={`w-full pl-12 pr-4 py-4 ${theme.input} border rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-lg hover:shadow-xl text-lg`}
              />
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className={`${theme.filterBg} rounded-3xl p-8 shadow-2xl border`}>
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-purple-500" />
                <h3 className={`text-xl font-bold ${theme.text}`}>Smart Filter Options</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <label className={`flex items-center gap-4 cursor-pointer p-4 rounded-2xl ${theme.cardBg} hover:scale-105 transition-all shadow-lg group`}>
                  <input
                    type="checkbox"
                    checked={filters.roadAllowed}
                    onChange={(e) => handleFilterChange('roadAllowed', e.target.checked)}
                    className="w-6 h-6 text-purple-600 rounded-lg focus:ring-purple-500 focus:ring-2"
                  />
                  <div>
                    <span className={`${theme.text} font-medium`}>Road Placement</span>
                    <p className={`text-sm ${theme.textMuted}`}>Can be placed on public roads</p>
                  </div>
                </label>
                <label className={`flex items-center gap-4 cursor-pointer p-4 rounded-2xl ${theme.cardBg} hover:scale-105 transition-all shadow-lg group`}>
                  <input
                    type="checkbox"
                    checked={filters.heavyWaste}
                    onChange={(e) => handleFilterChange('heavyWaste', e.target.checked)}
                    className="w-6 h-6 text-purple-600 rounded-lg focus:ring-purple-500 focus:ring-2"
                  />
                  <div>
                    <span className={`${theme.text} font-medium`}>Heavy Waste</span>
                    <p className={`text-sm ${theme.textMuted}`}>Accepts construction debris</p>
                  </div>
                </label>
                <div className={`p-4 rounded-2xl ${theme.cardBg} shadow-lg`}>
                  <label className={`block ${theme.text} font-medium mb-3`}>
                    Budget Limit: £{filters.maxPrice}
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="1500"
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-2">
                    <span>£200</span>
                    <span>£1500</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className={`${theme.cardBg} rounded-2xl p-4 text-center shadow-lg hover:scale-105 transition-all`}>
            <div className={`text-2xl font-bold ${theme.text}`}>{filteredSkips.length}</div>
            <div className={`text-sm ${theme.textMuted}`}>Available Skips</div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl p-4 text-center shadow-lg hover:scale-105 transition-all`}>
            <div className={`text-2xl font-bold ${theme.text}`}>
              {filteredSkips.length > 0 ? Math.min(...filteredSkips.map(s => s.size)) : 0}
            </div>
            <div className={`text-sm ${theme.textMuted}`}>Min Size (Yards)</div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl p-4 text-center shadow-lg hover:scale-105 transition-all`}>
            <div className={`text-2xl font-bold ${theme.text}`}>
              {filteredSkips.length > 0 ? Math.max(...filteredSkips.map(s => s.size)) : 0}
            </div>
            <div className={`text-sm ${theme.textMuted}`}>Max Size (Yards)</div>
          </div>
          <div className={`${theme.cardBg} rounded-2xl p-4 text-center shadow-lg hover:scale-105 transition-all`}>
            <div className={`text-2xl font-bold ${theme.text}`}>
              £{filteredSkips.length > 0 ? Math.min(...filteredSkips.map(calculateFinalPrice)) : 0}
            </div>
            <div className={`text-sm ${theme.textMuted}`}>From Price</div>
          </div>
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSkips.map((skip, index) => {
            const finalPrice = calculateFinalPrice(skip);
            const isSelected = selectedSkip?.id === skip.id;
            const isPopular = getPopularBadge(skip);
            const isBestValue = getBestValueBadge(skip);

            return (
              <div
                key={skip.id}
                onClick={() => handleSkipSelect(skip)}
                className={`group relative ${theme.cardBg} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-2 ${
                  isSelected
                    ? 'border-purple-500 scale-105 shadow-purple-500/20'
                    : 'border-transparent hover:scale-102 hover:border-purple-200'
                } ${!skip.allowed_on_road ? 'opacity-70' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  {isPopular && (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      <Star className="w-3 h-3" />
                      Popular
                    </div>
                  )}
                  {isBestValue && (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      <TrendingUp className="w-3 h-3" />
                      Best Value
                    </div>
                  )}
                  {!skip.allowed_on_road && (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      <AlertCircle className="w-3 h-3" />
                      Not for Road
                    </div>
                  )}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className={`p-6 pb-4 ${isSelected ? 'bg-gradient-to-r from-purple-50/10 to-pink-50/10' : ''}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl shadow-lg ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600'
                      }`}>
                        <Truck className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${theme.text}`}>{skip.size} Yard Skip</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className={`w-4 h-4 ${theme.textMuted}`} />
                          <p className={`text-sm ${theme.textMuted}`}>{skip.hire_period_days} day hire</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
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
                      £{skip.price_before_vat} + £{Math.round(skip.price_before_vat * skip.vat / 100)} VAT ({skip.vat}%)
                    </p>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.cardBg} group-hover:scale-105 transition-all`}>
                      <Calendar className={`w-5 h-5 ${skip.hire_period_days >= 14 ? 'text-green-500' : 'text-slate-400'}`} />
                      <div>
                        <div className={`text-sm font-medium ${theme.text}`}>{skip.hire_period_days} days</div>
                        <div className={`text-xs ${theme.textMuted}`}>Hire period</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.cardBg} group-hover:scale-105 transition-all`}>
                      <Navigation className={`w-5 h-5 ${skip.allowed_on_road ? 'text-green-500' : 'text-orange-400'}`} />
                      <div>
                        <div className={`text-sm font-medium ${theme.text}`}>
                          {skip.allowed_on_road ? 'Road OK' : 'Private only'}
                        </div>
                        <div className={`text-xs ${theme.textMuted}`}>Placement</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.cardBg} group-hover:scale-105 transition-all`}>
                      <Weight className={`w-5 h-5 ${skip.allows_heavy_waste ? 'text-green-500' : 'text-blue-400'}`} />
                      <div>
                        <div className={`text-sm font-medium ${theme.text}`}>
                          {skip.allows_heavy_waste ? 'Heavy waste' : 'Light waste'}
                        </div>
                        <div className={`text-xs ${theme.textMuted}`}>Capacity</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.cardBg} group-hover:scale-105 transition-all`}>
                      <MapPin className="w-5 h-5 text-purple-500" />
                      <div>
                        <div className={`text-sm font-medium ${theme.text}`}>{skip.postcode}</div>
                        <div className={`text-xs ${theme.textMuted}`}>Location</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredSkips.length === 0 && (
          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className={`w-24 h-24 ${theme.cardBg} rounded-full flex items-center justify-center mx-auto shadow-xl`}>
                <Truck className={`w-12 h-12 ${theme.textMuted}`} />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">0</span>
              </div>
            </div>
            <h3 className={`text-2xl font-bold ${theme.text} mb-3`}>No Skips Match Your Criteria</h3>
            <p className={`${theme.textMuted} mb-6 max-w-md mx-auto`}>
              Try adjusting your search terms or filter settings to find more options
            </p>
            <button
              onClick={() => {
                setSearch("");
                setFilters({ roadAllowed: false, heavyWaste: false, maxPrice: 1500 });
                applyFilters("", { roadAllowed: false, heavyWaste: false, maxPrice: 1500 });
              }}
              className={`px-6 py-3 ${theme.button} text-white rounded-xl font-medium transition-all hover:scale-105 shadow-lg`}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Continue Button */}
        {selectedSkip && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className={`${theme.cardBg} rounded-2xl p-2 shadow-2xl border`}>
              <button
                onClick={handleContinue}
                className={`flex items-center gap-4 ${theme.button} text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold">Continue with {selectedSkip.size} Yard Skip</div>
                    <div className="text-sm opacity-90">£{calculateFinalPrice(selectedSkip)} inc. VAT</div>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Floating Action Hint */}
        {!selectedSkip && filteredSkips.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40 animate-bounce">
            <div className={`${theme.cardBg} rounded-xl p-3 shadow-lg border max-w-xs`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <p className={`text-sm ${theme.textMuted}`}>
                  <span className="font-medium">Pro tip:</span> Click a skip to select it!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
