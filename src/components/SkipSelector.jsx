import React, { useEffect, useState } from "react";
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
  TrendingUp,
  Palette,
  Moon,
  Sun,
  X,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

// Mock data for demonstration
const mockSkips = [
  {
    id: 1,
    size: 4,
    price_before_vat: 180,
    vat: 20,
    hire_period_days: 7,
    allowed_on_road: true,
    allows_heavy_waste: false,
    postcode: "SW1A 1AA",
  },
  {
    id: 2,
    size: 6,
    price_before_vat: 250,
    vat: 20,
    hire_period_days: 14,
    allowed_on_road: true,
    allows_heavy_waste: true,
    postcode: "E1 6AN",
  },
  {
    id: 3,
    size: 8,
    price_before_vat: 320,
    vat: 20,
    hire_period_days: 14,
    allowed_on_road: false,
    allows_heavy_waste: true,
    postcode: "NW1 2BH",
  },
  {
    id: 4,
    size: 12,
    price_before_vat: 450,
    vat: 20,
    hire_period_days: 21,
    allowed_on_road: false,
    allows_heavy_waste: true,
    postcode: "SE1 9RT",
  },
  {
    id: 5,
    size: 16,
    price_before_vat: 600,
    vat: 20,
    hire_period_days: 21,
    allowed_on_road: false,
    allows_heavy_waste: true,
    postcode: "W1D 3QU",
  },
  {
    id: 6,
    size: 2,
    price_before_vat: 120,
    vat: 20,
    hire_period_days: 7,
    allowed_on_road: true,
    allows_heavy_waste: false,
    postcode: "EC1A 1BB",
  },
];

const fetchSkips = () => Promise.resolve(mockSkips);

export default function SkipSelector({ onContinue }) {
  const [skips, setSkips] = useState([]);
  const [filteredSkips, setFilteredSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filters, setFilters] = useState({
    roadAllowed: false,
    heavyWaste: false,
    maxPrice: 1500,
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
      const matchesSearch =
        skip.size.toString().includes(searchTerm) ||
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

  const theme = isDarkMode
    ? {
        bg: "bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950",
        overlay: "bg-slate-950/80",
        cardBg: "bg-slate-900/60 border-slate-800/50 backdrop-blur-xl",
        headerBg: "bg-slate-950/90 border-slate-800/30 backdrop-blur-xl",
        text: "text-slate-100",
        textSecondary: "text-slate-300",
        textMuted: "text-slate-500",
        accent: "from-violet-500 via-purple-500 to-fuchsia-500",
        accentHover: "from-violet-600 via-purple-600 to-fuchsia-600",
        button: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700",
        input: "bg-slate-900/60 border-slate-700/50 text-slate-100 placeholder-slate-400 backdrop-blur-xl",
        filterBg: "bg-slate-900/80 border-slate-800/30 backdrop-blur-xl",
        glass: "bg-white/5 backdrop-blur-xl border-white/10",
        glow: "shadow-purple-500/25",
      }
    : {
        bg: "bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30",
        overlay: "bg-white/80",
        cardBg: "bg-white/80 border-white/60 backdrop-blur-xl",
        headerBg: "bg-white/90 border-white/60 backdrop-blur-xl",
        text: "text-slate-900",
        textSecondary: "text-slate-700",
        textMuted: "text-slate-500",
        accent: "from-blue-600 via-indigo-600 to-purple-600",
        accentHover: "from-blue-700 via-indigo-700 to-purple-700",
        button: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700",
        input: "bg-white/90 border-white/60 text-slate-900 placeholder-slate-400 backdrop-blur-xl",
        filterBg: "bg-white/90 border-white/40 backdrop-blur-xl",
        glass: "bg-white/40 backdrop-blur-xl border-white/20",
        glow: "shadow-blue-500/25",
      };

  if (loading) {
    return (
      <div
        className={`${theme.bg} min-h-screen flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10 animate-pulse"></div>
        <div className="relative z-10">
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-purple-200/30 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-4 w-16 h-16 border-2 border-transparent border-t-pink-400 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <div className="space-y-4">
              <h2
                className={`text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
              >
                Curating Perfect Skips
              </h2>
              <p className={`${theme.textMuted} text-lg`}>
                Analyzing the best options for you...
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${theme.bg} min-h-screen flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-600/10 to-orange-600/10"></div>
        <div
          className={`relative z-10 text-center p-8 ${theme.glass} rounded-3xl shadow-2xl max-w-md mx-4 border`}
        >
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-white text-xs">!</span>
            </div>
          </div>
          <h3 className={`text-2xl font-bold ${theme.text} mb-4`}>
            Something went wrong
          </h3>
          <p className={`${theme.textMuted} mb-8 leading-relaxed`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`px-8 py-4 ${theme.button} text-white rounded-2xl font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme.bg} min-h-screen relative overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
      </div>

      <div className={`${theme.headerBg} border-b sticky top-0 z-50 shadow-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="relative">
              <div className="flex items-center gap-6">
                <div
                  className={`relative p-4 bg-gradient-to-r ${theme.accent} rounded-3xl shadow-xl ${theme.glow}`}
                >
                  <Truck className="w-10 h-10 text-white" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
                </div>
                <div className="space-y-2">
                  <h1
                    className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                  >
                    Skip Selector Pro
                  </h1>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <p className={`${theme.textMuted} text-lg`}>
                      AI-powered waste solution finder
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`group relative p-4 ${theme.glass} rounded-2xl shadow-lg hover:scale-110 transition-all duration-300 border`}
                title="Toggle theme"
              >
                <div className="relative">
                  {isDarkMode ? (
                    <Sun className="w-6 h-6 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
                  ) : (
                    <Moon className="w-6 h-6 text-slate-600 group-hover:rotate-12 transition-transform duration-300" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:scale-105 ${
                  showFilters
                    ? `${theme.button} text-white shadow-xl ${theme.glow}`
                    : `${theme.glass} ${theme.text} hover:shadow-xl border`
                }`}
              >
                <Filter
                  className={`w-5 h-5 transition-transform duration-300 ${
                    showFilters ? "rotate-180" : "group-hover:rotate-12"
                  }`}
                />
                <span className="hidden sm:inline font-bold">
                  Smart Filters
                </span>
                {(filters.roadAllowed ||
                  filters.heavyWaste ||
                  filters.maxPrice < 1500) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-pulse"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-12 space-y-8">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-focus-within:opacity-75 transition duration-1000"></div>
              <div className="relative">
                <Search
                  className={`absolute left-6 top-1/2 transform -translate-y-1/2 ${theme.textMuted} w-6 h-6 group-focus-within:text-purple-500 transition-colors duration-300`}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by size, features, or specific requirements..."
                  className={`w-full pl-16 pr-6 py-6 ${theme.input} border rounded-3xl focus:ring-2 focus:ring-purple-500/50 focus:border-transparent outline-none transition-all duration-300 shadow-xl hover:shadow-2xl text-lg font-medium`}
                />
                {search && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {showFilters && (
            <div
              className={`${theme.filterBg} rounded-3xl p-8 shadow-2xl border relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500"></div>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${theme.text}`}>
                    Advanced Filtering
                  </h3>
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  className={`p-2 ${theme.glass} rounded-xl hover:scale-110 transition-all duration-300`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <label
                  className={`group relative cursor-pointer p-6 rounded-2xl ${theme.glass} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={filters.roadAllowed}
                      onChange={(e) =>
                        handleFilterChange("roadAllowed", e.target.checked)
                      }
                      className="w-6 h-6 text-purple-600 rounded-lg focus:ring-purple-500 focus:ring-2 transition-all"
                    />
                    <div className="space-y-1">
                      <span className={`${theme.text} font-semibold text-lg`}>
                        Road Placement
                      </span>
                      <p className={`text-sm ${theme.textMuted}`}>
                        Allowed on public roads
                      </p>
                    </div>
                  </div>
                </label>
                <label
                  className={`group relative cursor-pointer p-6 rounded-2xl ${theme.glass} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={filters.heavyWaste}
                      onChange={(e) =>
                        handleFilterChange("heavyWaste", e.target.checked)
                      }
                      className="w-6 h-6 text-purple-600 rounded-lg focus:ring-purple-500 focus:ring-2 transition-all"
                    />
                    <div className="space-y-1">
                      <span className={`${theme.text} font-semibold text-lg`}>
                        Heavy Waste
                      </span>
                      <p className={`text-sm ${theme.textMuted}`}>
                        Construction debris allowed
                      </p>
                    </div>
                  </div>
                </label>
                <div
                  className={`p-6 rounded-2xl ${theme.glass} shadow-lg border space-y-4`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${theme.text} font-semibold text-lg`}>
                      Budget Limit
                    </span>
                    <span
                      className={`text-2xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                    >
                      £{filters.maxPrice}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="1500"
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", parseInt(e.target.value))
                    }
                    className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer hover:from-purple-300 hover:to-pink-300 transition-all"
                  />
                  <div className="flex justify-between">
                    <span className={`text-sm ${theme.textMuted}`}>£200</span>
                    <span className={`text-sm ${theme.textMuted}`}>£1500+</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: "Available Skips",
                value: filteredSkips.length,
                icon: Truck,
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Min Size (Yards)",
                value: filteredSkips.length > 0
                  ? Math.min(...filteredSkips.map((s) => s.size))
                  : 0,
                icon: ArrowRight,
                color: "from-green-500 to-emerald-500",
              },
              {
                label: "Max Size (Yards)",
                value: filteredSkips.length > 0
                  ? Math.max(...filteredSkips.map((s) => s.size))
                  : 0,
                icon: TrendingUp,
                color: "from-purple-500 to-violet-500",
              },
              {
                label: "Starting From",
                value: `£${
                  filteredSkips.length > 0
                    ? Math.min(...filteredSkips.map(calculateFinalPrice))
                    : 0
                }`,
                icon: Star,
                color: "from-pink-500 to-rose-500",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`${theme.glass} rounded-2xl p-6 text-center shadow-xl hover:scale-105 transition-all duration-300 border group`}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-3xl font-bold ${theme.text} mb-2`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${theme.textMuted} font-medium`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredSkips.map((skip, index) => {
              const finalPrice = calculateFinalPrice(skip);
              const isSelected = selectedSkip?.id === skip.id;
              const isPopular = getPopularBadge(skip);
              const isBestValue = getBestValueBadge(skip);

              return (
                <div
                  key={skip.id}
                  onClick={() => handleSkipSelect(skip)}
                  className={`group relative ${theme.glass} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-2 transform hover:scale-[1.02] ${
                    isSelected
                      ? "border-purple-500 scale-[1.02] " +
                        theme.glow +
                        " shadow-purple-500/30"
                      : "border-transparent hover:border-purple-200/50"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      isSelected
                        ? "from-purple-500/10 via-transparent to-pink-500/10"
                        : "from-transparent via-transparent to-transparent"
                    } transition-all duration-500`}
                  ></div>

                  <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
                    {isPopular && (
                      <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                        <Star className="w-3 h-3" />
                        Popular
                      </div>
                    )}
                    {isBestValue && (
                      <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                        <TrendingUp className="w-3 h-3" />
                        Best Value
                      </div>
                    )}
                    {!skip.allowed_on_road && (
                      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                        <AlertCircle className="w-3 h-3" />
                        Private Only
                      </div>
                    )}
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 left-2 z-20">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`p-5 rounded-3xl shadow-xl transition-all duration-300 ${
                          isSelected
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110"
                            : "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 group-hover:scale-110"
                        }`}
                      >
                        <Truck className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className={`text-2xl font-bold ${theme.text}`}>
                          {skip.size} Yard Skip
                        </h3>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-purple-500" />
                          <p className={`text-lg ${theme.textMuted} font-medium`}>
                            {skip.hire_period_days} day hire
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl">
                      <div className="flex items-baseline gap-4 mb-3">
                        <span
                          className={`text-4xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                        >
                          £{finalPrice}
                        </span>
                        <div
                          className={`px-4 py-2 ${theme.glass} rounded-full border`}
                        >
                          <span className={`text-sm ${theme.textMuted} font-semibold`}>
                            inc. VAT
                          </span>
                        </div>
                      </div>
                      <p className={`text-sm ${theme.textMuted} font-medium`}>
                        £{skip.price_before_vat} + £
                        {Math.round(skip.price_before_vat * skip.vat / 100)} VAT (
                        {skip.vat}%)
                      </p>
                      <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                        <p className="text-xs text-purple-500 font-bold">
                          £{Math.round(finalPrice / skip.size)} per cubic yard
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`flex items-center gap-3 p-4 rounded-2xl ${theme.glass} group-hover:scale-105 transition-all duration-300 border`}
                      >
                        <div
                          className={`p-3 rounded-xl ${
                            skip.hire_period_days >= 14
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className={`text-lg font-bold ${theme.text}`}>
                            {skip.hire_period_days}
                          </div>
                          <div className={`text-sm ${theme.textMuted}`}>
                            days
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-3 p-4 rounded-2xl ${theme.glass} group-hover:scale-105 transition-all duration-300 border`}
                      >
                        <div
                          className={`p-3 rounded-xl ${
                            skip.allowed_on_road
                              ? "bg-green-500"
                              : "bg-amber-500"
                          }`}
                        >
                          <Navigation className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${theme.text}`}>
                            {skip.allowed_on_road ? "Road OK" : "Private"}
                          </div>
                          <div className={`text-xs ${theme.textMuted}`}>
                            Placement
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-3 p-4 rounded-2xl ${theme.glass} group-hover:scale-105 transition-all duration-300 border`}
                      >
                        <div
                          className={`p-3 rounded-xl ${
                            skip.allows_heavy_waste
                              ? "bg-orange-500"
                              : "bg-blue-500"
                          }`}
                        >
                          <Weight className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${theme.text}`}>
                            {skip.allows_heavy_waste ? "Heavy" : "Light"}
                          </div>
                          <div className={`text-xs ${theme.textMuted}`}>
                            Waste type
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-3 p-4 rounded-2xl ${theme.glass} group-hover:scale-105 transition-all duration-300 border`}
                      >
                        <div className="p-3 rounded-xl bg-purple-500">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${theme.text}`}>
                            {skip.postcode}
                          </div>
                          <div className={`text-xs ${theme.textMuted}`}>
                            Area
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`mt-6 p-4 rounded-2xl bg-gradient-to-r ${theme.accent} opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}
                    >
                      <div className="flex items-center justify-center gap-3 text-white font-bold">
                        <span>Select This Skip</span>
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSkips.length === 0 && (
            <div className="text-center py-20">
              <div
                className={`${theme.glass} rounded-3xl p-12 max-w-2xl mx-auto shadow-2xl border`}
              >
                <div className="relative mb-8">
                  <div
                    className={`${theme.glass} rounded-full flex items-center justify-center mx-auto shadow-xl border w-32 h-32`}
                  >
                    <Truck className={`w-16 h-16 ${theme.textMuted}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white text-lg font-bold">0</span>
                  </div>
                </div>
                <h3 className={`text-3xl font-bold ${theme.text} mb-4`}>
                  No Perfect Matches Found
                </h3>
                <p
                  className={`${theme.textMuted} mb-8 text-lg leading-relaxed max-w-md mx-auto`}
                >
                  Your search criteria are quite specific. Try adjusting your
                  filters or search terms to discover more options.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSearch("");
                      setFilters({
                        roadAllowed: false,
                        heavyWaste: false,
                        maxPrice: 1500,
                      });
                      applyFilters("", {
                        roadAllowed: false,
                        heavyWaste: false,
                        maxPrice: 1500,
                      });
                    }}
                    className={`px-8 py-4 ${theme.button} text-white rounded-2xl font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl`}
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(true)}
                    className={`px-8 py-4 ${theme.glass} ${theme.text} rounded-2xl font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl border`}
                  >
                    Adjust Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedSkip && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom duration-500">
              <div
                className={`${theme.glass} rounded-3xl p-3 shadow-2xl border backdrop-blur-xl`}
              >
                <button
                  onClick={handleContinue}
                  className={`group flex items-center gap-6 ${theme.button} text-white px-10 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-black">
                        Continue with {selectedSkip.size} Yard Skip
                      </div>
                      <div className="text-lg opacity-90 font-semibold">
                        £{calculateFinalPrice(selectedSkip)} including VAT
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>
          )}

          {!selectedSkip && filteredSkips.length > 0 && (
            <div className="fixed bottom-8 right-8 z-40 animate-bounce">
              <div
                className={`${theme.glass} rounded-2xl p-4 shadow-xl border max-w-xs backdrop-blur-xl`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.text}`}>Pro Tip</p>
                    <p className={`text-xs ${theme.textMuted}`}>
                      Click any skip card to select it and continue
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!selectedSkip && filteredSkips.length > 3 && (
            <div className="mt-12">
              <div
                className={`${theme.glass} rounded-3xl p-8 shadow-xl border`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${theme.text}`}>
                    Quick Recommendations
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <button
                    onClick={() =>
                      handleSkipSelect(
                        filteredSkips.find((s) => s.size === 6) || filteredSkips[0]
                      )
                    }
                    className={`group p-6 ${theme.glass} rounded-2xl hover:scale-105 transition-all duration-300 text-left border hover:border-purple-300`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="w-6 h-6 text-orange-500" />
                      <span className={`font-bold ${theme.text}`}>
                        Most Popular
                      </span>
                    </div>
                    <p className={`text-sm ${theme.textMuted}`}>
                      6-yard skip - perfect for home projects
                    </p>
                  </button>
                  <button
                    onClick={() =>
                      handleSkipSelect(
                        filteredSkips.reduce((prev, current) =>
                          calculateFinalPrice(current) / current.size <
                          calculateFinalPrice(prev) / prev.size
                            ? current
                            : prev
                        )
                      )
                    }
                    className={`group p-6 ${theme.glass} rounded-2xl hover:scale-105 transition-all duration-300 text-left border hover:border-green-300`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                      <span className={`font-bold ${theme.text}`}>Best Value</span>
                    </div>
                    <p className={`text-sm ${theme.textMuted}`}>
                      Lowest cost per cubic yard
                    </p>
                  </button>
                  <button
                    onClick={() =>
                      handleSkipSelect(
                        filteredSkips.reduce((prev, current) =>
                          current.size > prev.size ? current : prev
                        )
                      )
                    }
                    className={`group p-6 ${theme.glass} rounded-2xl hover:scale-105 transition-all duration-300 text-left border hover:border-purple-300`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Truck className="w-6 h-6 text-purple-500" />
                      <span className={`font-bold ${theme.text}`}>
                        Largest Size
                      </span>
                    </div>
                    <p className={`text-sm ${theme.textMuted}`}>
                      Maximum capacity available
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
