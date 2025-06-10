// src/api/fetchSkips.js
export async function fetchSkips() {
  const res = await fetch(
    'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
  );
  console.log('Fetch status:', res.status);  // 🧪 Logging
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  console.log('Fetched data:', data);         // 🧪 Logging
  return data.skips || data;
}
