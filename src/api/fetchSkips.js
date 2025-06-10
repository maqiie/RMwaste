// src/api.js

export const fetchSkips = async () => {
  try {
    const res = await fetch(
      'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.skips || data;
  } catch (error) {
    console.error('Error fetching skips:', error);
    // Fallback mock data
    return [
      {"id":17933,"size":4,"hire_period_days":14,"price_before_vat":278,"vat":20,"allowed_on_road":true,"allows_heavy_waste":true},
      {"id":17934,"size":6,"hire_period_days":14,"price_before_vat":305,"vat":20,"allowed_on_road":true,"allows_heavy_waste":true},
      {"id":17935,"size":8,"hire_period_days":14,"price_before_vat":375,"vat":20,"allowed_on_road":true,"allows_heavy_waste":true},
      {"id":17936,"size":10,"hire_period_days":14,"price_before_vat":400,"vat":20,"allowed_on_road":false,"allows_heavy_waste":false},
      {"id":17937,"size":12,"hire_period_days":14,"price_before_vat":439,"vat":20,"allowed_on_road":false,"allows_heavy_waste":false},
      {"id":17938,"size":14,"hire_period_days":14,"price_before_vat":470,"vat":20,"allowed_on_road":false,"allows_heavy_waste":false},
      {"id":17939,"size":16,"hire_period_days":14,"price_before_vat":496,"vat":20,"allowed_on_road":false,"allows_heavy_waste":false},
      {"id":15124,"size":20,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"allowed_on_road":false,"allows_heavy_waste":true},
      {"id":15125,"size":40,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"allowed_on_road":false,"allows_heavy_waste":false}
    ];
  }
};
