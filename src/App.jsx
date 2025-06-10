import React, { useState } from 'react';
import SkipSelector from './components/SkipSelector';
import './index.css'


export default function App() {
  const [skip, setSkip] = useState(null);

  if (skip) {
    return (
      <div className="flex items-center justify-center h-screen text-center p-6">
        <div>
          <h2 className="text-2xl font-bold">You selected:</h2>
          <p className="mt-3 text-lg">{skip.name} — £{skip.price}</p>
        </div>
      </div>
    );
  }

  return <SkipSelector onContinue={setSkip} />;
}
