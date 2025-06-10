import React, { useState } from 'react';
import SkipSelector from './components/SkipSelector';
import SkipDetails from './components/SkipDetails';

const App = () => {
  const [selectedSkip, setSelectedSkip] = useState(null);

  const handleSkipSelect = (skip) => {
    setSelectedSkip(skip);
  };

  const handleBack = () => {
    setSelectedSkip(null);
  };

  const handleConfirm = () => {
    // Handle the confirmation logic here
    alert(`Confirmed selection of ${selectedSkip.size} Yard Skip!`);
    // You can add more logic here, such as navigating to a confirmation page or submitting the selection to a server.
  };

  return (
    <div>
      {!selectedSkip ? (
        <SkipSelector onContinue={handleSkipSelect} />
      ) : (
        <SkipDetails
          selectedSkip={selectedSkip}
          onBack={handleBack}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default App;
