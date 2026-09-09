import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Globe from './components/Globe';
import Sidebar from './components/Sidebar';
import TimePlayer from './components/TimePlayer';
import ChartOverlay from './components/ChartOverlay';

function App() {
  const [depth, setDepth] = useState(0);
  const [variable, setVariable] = useState('temperature');
  const [chartOpen, setChartOpen] = useState(false);
  
  // Track the currently active instrument and its data
  const [activeInstrument, setActiveInstrument] = useState(null);

  // Track active layer visibility for in-situ instruments
  const [layers, setLayers] = useState({
    argo: true,
    gliders: false
  });

  const handleLayerToggle = (layerKey, isChecked) => {
    setLayers(prev => ({ ...prev, [layerKey]: isChecked }));
  };

  const handleInstrumentSelect = (float) => {
    setActiveInstrument(float);
    setChartOpen(true); // Automatically slide in the D3 chart
  };

  return (
    <div id="app">
      <NavBar />
      <Sidebar 
        onLayerToggle={handleLayerToggle} 
        onDepthChange={setDepth} 
        onVariableChange={setVariable}
      />
      
      {/* Pass the selection handler and layer state down to the globe */}
      <Globe 
        onInstrumentSelect={handleInstrumentSelect}
        selectedInstrument={activeInstrument}
        layers={layers}
        depth={depth}
        variable={variable}
      />

      <TimePlayer onTimeChange={(timeStep) => {
        // You can use this timeStep later to shift model predictions or update data arrays!
        console.log("Current Simulation Step:", timeStep);
      }} />
      
      {/* Feed the clicked instrument's profile data into the D3 chart */}
      <ChartOverlay 
        data={activeInstrument ? activeInstrument.profileData : [0]} 
        open={chartOpen} 
        title={activeInstrument ? activeInstrument.name : ""}
        onClose={() => {
          setChartOpen(false);
          setActiveInstrument(null); // Clears the selection, flying camera back out!
        }}
        variable={variable}
      />
    </div>
  );
}

export default App;