import React, { useState } from 'react';
import { Viewer, Entity, PointGraphics, LabelGraphics, CameraFlyTo, PolylineGraphics } from 'resium';
import { Cartesian3, Color } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { argoFloats, gliders } from '../argoData';

export default function Globe({ onInstrumentSelect, selectedInstrument, layers, depth, variable }) {
  // 1. Add state to track which instrument is currently being hovered
  const [hoveredTooltip, setHoveredTooltip] = useState(null);

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
      <Viewer 
        full 
        baseLayerPicker={false} 
        infoBox={false}
        selectionIndicator={false}
      >
        {/* HUD Data Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '70px', 
          left: '20px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          color: '#38bdf8',
          padding: '10px 14px',
          borderRadius: '6px',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          zIndex: 1000,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
        <div className="telemetry-text">
            ACTIVE LAYER: {variable.toUpperCase()}
          </div>
          <div className="telemetry-text" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            DEPTH: {depth === 0 || depth === "0" ? "0000m (Surface)" : `${depth}m`}
          </div>
        </div>

        {/* 2. Visual Hover Tooltip Overlay (Only shows when hoveredTooltip has text) */}
        {hoveredTooltip && (
          <div style={{
            position: 'absolute',
            bottom: '80px', // Keeps it above your bottom time player
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 69, 0, 0.9)', // Matches the marker color
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.5)'
          }}>
            {hoveredTooltip}
          </div>
        )}

        <CameraFlyTo 
          destination={
            selectedInstrument 
              ? Cartesian3.fromDegrees(selectedInstrument.longitude, selectedInstrument.latitude, 1500000)
              : Cartesian3.fromDegrees(75.0, 20.0, 20000000)
          } 
          duration={2.0} 
        />

        {/* Render Argo floats only if the 'argo' layer toggle is checked */}
        {layers?.argo && argoFloats.map(float => (
          <Entity 
            key={float.id}
            position={Cartesian3.fromDegrees(float.longitude, float.latitude)}
            name={float.name}
            onClick={() => onInstrumentSelect(float)}
            // 3. Set the hover state to show the UI tooltip, and clear it when the mouse leaves
            onMouseEnter={() => setHoveredTooltip(`${float.name} - Click for details`)}
            onMouseLeave={() => setHoveredTooltip(null)}
          >
            <PointGraphics pixelSize={16} color={Color.ORANGERED} />
            <LabelGraphics 
              text={float.id.toUpperCase()} 
              font="12px sans-serif"
              fillColor={Color.WHITE}
              outlineColor={Color.BLACK}
              outlineWidth={2}
              pixelOffset={new Cartesian3(0, -20, 0)}
            />
          </Entity>
        ))}
        {/* Render Glider trajectories if the 'gliders' toggle is checked */}
        {layers?.gliders && gliders.map(glider => (
          <Entity 
            key={glider.id}
            name={glider.name}
            onClick={() => onInstrumentSelect(glider)}
            onMouseEnter={() => setHoveredTooltip(`${glider.name} - Click for details`)}
            onMouseLeave={() => setHoveredTooltip(null)}
          >
            {/* Renders a glowing cyan path line for the trajectory */}
            <PolylineGraphics 
              positions={Cartesian3.fromDegreesArray(glider.path)}
              width={5}
              material={Color.CYAN}
            />
          </Entity>
        ))}
      </Viewer>
    </div>
  );
}