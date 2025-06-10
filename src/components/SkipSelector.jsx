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
  AlertCircle
} from "lucide-react";

// Import your actual fetchSkips function
// import { fetchSkips } from "../api/fetchSkips";

// Mock API function for demo - replace with your actual import above
const fetchSkips = async () => {
  try {
    const res = await fetch(
      'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
    );
    console.log('Fetch status:', res.status);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log('Fetched data:', data);
    return data.skips || data;
  } catch (error) {
    console.error('Error fetching skips:', error);
    // Fallback to mock data for demo
    return [
      {"id":17933,"size":4,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":278,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:52.813","allowed_on_road":true,"allows_heavy_waste":true},
      {"id":17934,"size":6,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":305,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:52.992","allowed_on_road":true,"allows_heavy_waste":true},
      {"id":17935,"size":8,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":375,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.171","allowed_on_road":true,"allows_heavy_waste":true},
      {"id":17936,"size":10,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":400,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.339","allowed_on_road":false,"allows_heavy_waste":false},
      {"id":17937,"size":12,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":439,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.516","allowed_on_road":false,"allows_heavy_waste":false},
      {"id":17938,"size":14,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":470,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.69","allowed_on_road":false,"allows_heavy_waste":false},
      {"id":17939,"size":16,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":496,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.876","allowed_on_road":false,"allows_heavy_waste":false},
      {"id":15124,"size":20,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:40.344435","updated_at":"2025-04-07T13:16:52.434","allowed_on_road":false,"allows_heavy_waste":true},
      {"id":15125,"size":40,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:40.344435","updated_at":"2025-04-07T13:16:52.603","allowed_on_road":false,"allows_heavy_waste":false}
    ];
  }
};

export default function SkipSelector({ onContinue }) {
  const [skips, setSkips] = useState([]);
  const [filteredSkips, setFilteredSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-slate-600 font-medium">Loading skip options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                Choose Your Skip Size
              </h1>
              <p className="text-slate-600 mt-2">Select the perfect skip for your project needs</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  showFilters 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by size (e.g., 6 yard)..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
            />
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Filter Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.roadAllowed}
                    onChange={(e) => handleFilterChange('roadAllowed', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-slate-700">Road Placement Only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.heavyWaste}
                    onChange={(e) => handleFilterChange('heavyWaste', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-slate-700">Heavy Waste Allowed</span>
                </label>
                <div>
                  <label className="block text-slate-700 text-sm font-medium mb-2">
                    Max Price: £{filters.maxPrice}
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="1500"
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredSkips.map((skip) => {
            const finalPrice = calculateFinalPrice(skip);
            const isSelected = selectedSkip?.id === skip.id;
            
            return (
              <div
                key={skip.id}
                onClick={() => handleSkipSelect(skip)}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 shadow-2xl scale-[1.02]' 
                    : 'hover:scale-[1.01]'
                }`}
              >
                {/* Header */}
                <div className={`p-6 pb-4 ${isSelected ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{skip.size} Yard Skip</h3>
                        <p className="text-sm text-slate-600">{skip.hire_period_days} day hire period</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="p-2 bg-green-100 rounded-full">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-slate-900">£{finalPrice}</span>
                      <span className="text-sm text-slate-500">inc. VAT</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      £{skip.price_before_vat} + £{Math.round(skip.price_before_vat * skip.vat / 100)} VAT
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className={`w-4 h-4 ${skip.hire_period_days >= 14 ? 'text-green-600' : 'text-slate-400'}`} />
                      <span className="text-slate-700">{skip.hire_period_days} days</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation className={`w-4 h-4 ${skip.allowed_on_road ? 'text-green-600' : 'text-slate-400'}`} />
                      <span className="text-slate-700">
                        {skip.allowed_on_road ? 'Road OK' : 'Private only'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Weight className={`w-4 h-4 ${skip.allows_heavy_waste ? 'text-green-600' : 'text-slate-400'}`} />
                      <span className="text-slate-700">
                        {skip.allows_heavy_waste ? 'Heavy waste' : 'Light waste'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-700">{skip.postcode}</span>
                    </div>
                  </div>
                </div>

                {/* Selection Overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredSkips.length === 0 && (
          <div className="text-center py-12">
            <Truck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No skips found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Continue Button */}
        {selectedSkip && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <button
              onClick={handleContinue}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300"
            >
              <span>Continue with {selectedSkip.size} Yard Skip</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}