import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './ChartOverlay.css';

export default function ChartOverlay({ data, open, title, onClose, variable }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!open || !data || data.length === 0) return;

    // 1. Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    // 2. Dimensions (Taller to emphasize the vertical depth column)
    const width = 280;
    const height = 260;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // 3. Setup scales for a Vertical Profile (Depth on Y-axis, Property on X-axis)
    let xDomain = [10, 35]; // Property range (e.g. Temperature)
    let lineColor = '#ef4444';
    let displayData = data;

    if (variable === 'salinity') {
      xDomain = [30, 40];
      lineColor = '#0ea5e9';
      displayData = data.map(val => 32 + (val / 10));
    } else if (variable === 'currents') {
      xDomain = [0, 2];
      lineColor = '#10b981';
      displayData = data.map(val => val / 25);
    }

    // X-axis: Environmental Property value
    const x = d3.scaleLinear()
      .domain(xDomain)
      .range([0, width]);

    // Y-axis: Depth (0m at top, 2000m at bottom)
    const depths = [0, 200, 500, 1000, 1500, 2000];
    const y = d3.scaleLinear()
      .domain([0, 2000]) 
      .range([0, height]);

    // Map data points across standard depth intervals
    const profilePoints = displayData.map((val, i) => ({
      value: val,
      depth: depths[i] || (i * 300)
    }));

    // 4. Line Generator (Swapped X and Y for vertical water column orientation)
    const line = d3.line()
      .x(d => x(d.value))
      .y(d => y(d.depth))
      .curve(d3.curveCatmullRom);

  // 5. Append Axes
    // X-Axis (Property) at the top
    svg.append('g')
      .call(d3.axisTop(x).ticks(4))
      .attr('color', '#64748b')
      .selectAll('text')
      .attr('font-family', "'JetBrains Mono', monospace");

    // Y-Axis (Depth in meters) on the left
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}m`))
      .attr('color', '#64748b')
      .selectAll('text')
      .attr('font-family', "'JetBrains Mono', monospace");

    // 6. Draw Gradient Area Fill to represent water column mass
    const area = d3.area()
      .x0(x(xDomain[0]))
      .x1(d => x(d.value))
      .y(d => y(d.depth))
      .curve(d3.curveCatmullRom);

    svg.append('path')
      .datum(profilePoints)
      .attr('fill', lineColor)
      .attr('fill-opacity', 0.15)
      .attr('d', area);

    // 7. Draw the Profile Curve Line
    svg.append('path')
      .datum(profilePoints)
      .attr('fill', 'none')
      .attr('stroke', lineColor)
      .attr('stroke-width', 3)
      .attr('d', line);

  }, [data, open, variable]);

  return (
    <div className={`chart-overlay ${open ? 'open' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
        <h3 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 'bold', margin: 0 }}>
          {title || "Instrument Telemetry"}
        </h3>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}
        >
          &times;
        </button>
      </div>
      <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 'bold' }}>
        Vertical Water Column Profile ({variable || 'temperature'})
      </div>
      <div ref={chartRef}></div>
    </div>
  );
}