import React, { useState } from 'react';
import './Sidebar.css';

export default function Sidebar({ onLayerToggle, onDepthChange, onVariableChange }) {
  const [depth, setDepth] = useState(0);

  return (
    <div className="sidebar">
      <h3>Data Layer</h3>
      <select 
        onChange={e => onVariableChange(e.target.value)}
        style={{ width: '100%', padding: '6px', background: '#1e293b', color: '#fff', border: '1px solid #475569', borderRadius: '4px' }}
      >
        <option value="temperature">Temperature (°C)</option>
        <option value="salinity">Salinity (PSU)</option>
        <option value="currents">Currents (m/s)</option>
      </select>

      <h3>Depth Slicing</h3>
      <input 
        type="range" 
        min="0" 
        max="2000" 
        step="50"
        value={depth}
        onChange={e => {
          setDepth(e.target.value);
          onDepthChange(e.target.value);
        }} 
      />
      <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: '4px' }}>
        {depth === "0" ? "Surface Level" : `${depth} meters`}
      </div>
      
      <h3>In-Situ Instruments</h3>
      <label>
        <input type="checkbox" defaultChecked onChange={e => onLayerToggle('argo', e.target.checked)} />
        Argo Floats
      </label>
      <label>
        <input type="checkbox" onChange={e => onLayerToggle('gliders', e.target.checked)} />
        Gliders
      </label>
    </div>
  );
}