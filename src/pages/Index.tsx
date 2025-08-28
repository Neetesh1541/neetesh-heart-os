import React, { useState } from 'react';
import { BootScreen } from '../components/BootScreen';
import { Desktop } from '../components/Desktop';

const Index = () => {
  const [isBooted, setIsBooted] = useState(false);

  const handleBootComplete = () => {
    setIsBooted(true);
  };

  if (!isBooted) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return <Desktop />;
};

export default Index;
