### Interactive 3D Ocean Data Visualization System (SIH 2026)

**Overview**
This repository hosts a high-performance, web-based 3D visualization platform developed for the Smart India Hackathon (SIH) 2026. The system is designed to seamlessly integrate numerical ocean model outputs (such as temperature, salinity, and currents) with in-situ observational data, enabling researchers and policymakers to explore complex oceanographic phenomena directly within a standard web browser.[cite: 3]

**Key Features & Capabilities:**
* **Hardware-Accelerated 3D Globe:** Built using CesiumJS, which leverages WebGL to render highly performant 3D globes and maps natively in the browser without requiring any additional plugins.[cite: 3]
* **Volumetric Rendering & Transfer Functions:** Utilizes advanced WebGL raymarching techniques to visualize 3D scalar fields. The system implements customizable transfer functions to assign specific colors and opacity levels to data values (e.g., mapping ocean temperature to a visual colorbar), allowing users to truly "see inside" the ocean volume.[cite: 3]
* **In-Situ Data Integration:** Supports the overlay of discrete observational data, such as Argo floats. The architecture is designed to handle Quality Control (QC) flags from NetCDF files, ensuring that only reliable, validated sensor data is displayed in the 3D scene.[cite: 3]
* **Interactive Analytics:** Features real-time UI controls for variable selection, depth-slice navigation, and data point querying.[cite: 3]

**Built With:**
* HTML5 / CSS3 / JavaScript[cite: 3]
* React.js & D3.js
* CesiumJS (3D Geospatial Engine)[cite: 3]
* *Designed for future backend integration with Python, Xarray, and Cloud-Optimized Zarr/Kerchunk data pipelines.*[cite: 3]

**Prerequisites & Pre-installs**
Before running this project locally, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16.0 or higher recommended)
* npm (Node Package Manager - comes bundled with Node.js)
* A modern web browser with WebGL enabled (Chrome, Firefox, Edge)

**Local Setup Instructions**
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/OceanVis.git](https://github.com/yourusername/OceanVis.git)
   cd OceanVis
