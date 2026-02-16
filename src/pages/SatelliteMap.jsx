import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
    Layers, Droplets, Sun, AlertTriangle, Info, X,
    ChevronRight, ArrowUpRight, Droplet
} from 'lucide-react';

// Fix Leaflet Icon default issues
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// ════ CONFIGURATION ════
const CENTER_COORDS = [39.6390, 22.4191]; // Thessaly, Greece
const ZOOM_LEVEL = 14;

// ════ MOCK DATA: ZONES ════
const ZONES = [
    {
        id: 'A',
        name: 'Cotton Field - Zone A',
        type: 'Critical',
        color: '#ef4444', // Red
        moisture: 18,
        deficit: -22, // mm
        status: 'Severe Stress',
        recommendation: "Soil is extremely dry. Irrigate 22,000 Liters/Ha this afternoon immediately to prevent yield loss.",
        coordinates: [
            [39.6420, 22.4100],
            [39.6450, 22.4120],
            [39.6430, 22.4180],
            [39.6400, 22.4150]
        ]
    },
    {
        id: 'B',
        name: 'Wheat Field - Zone B',
        type: 'Warning',
        color: '#f59e0b', // Yellow
        moisture: 42,
        deficit: -8, // mm
        status: 'Moderate',
        recommendation: "Moisture levels dropping. Schedule light irrigation within 2 days if no rain is forecast.",
        coordinates: [
            [39.6380, 22.4200],
            [39.6410, 22.4250],
            [39.6390, 22.4280],
            [39.6350, 22.4220]
        ]
    },
    {
        id: 'C',
        name: 'Corn Field - Zone C',
        type: 'Optimal',
        color: '#10b981', // Green
        moisture: 68,
        deficit: 0,
        status: 'Healthy',
        recommendation: "Field condition is optimal. Maintain routine monitoring schedule.",
        coordinates: [
            [39.6320, 22.4100],
            [39.6350, 22.4150],
            [39.6300, 22.4180],
            [39.6280, 22.4120]
        ]
    }
];

export default function SatelliteMap() {
    const [activeLayer, setActiveLayer] = useState('rgb'); // rgb | ndmi
    const [selectedZone, setSelectedZone] = useState(null);
    const [layerMenuOpen, setLayerMenuOpen] = useState(false);

    // Dynamic Tile Provider
    // CartoDB Voyager: Clean, light map, great for overlays
    // Esri Satellite: True satellite view
    const getTileLayer = () => {
        return activeLayer === 'rgb'
            ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png" // Clean Vector-like
            : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"; // Satellite
    };

    return (
        <div className="relative w-full h-[calc(100vh-64px)] bg-slate-50 overflow-hidden font-sans">

            {/* ════ MAP CONTAINER ════ */}
            <MapContainer
                center={CENTER_COORDS}
                zoom={ZOOM_LEVEL}
                scrollWheelZoom={true}
                className="w-full h-full z-0 outline-none"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={getTileLayer()}
                />

                {/* Render Zones */}
                {ZONES.map((zone) => (
                    <Polygon
                        key={zone.id}
                        positions={zone.coordinates}
                        pathOptions={{
                            color: zone.color,
                            fillColor: zone.color,
                            fillOpacity: selectedZone?.id === zone.id ? 0.7 : 0.4,
                            weight: selectedZone?.id === zone.id ? 3 : 2,
                            dashArray: selectedZone?.id === zone.id ? null : '5, 5'
                        }}
                        eventHandlers={{
                            click: () => {
                                setSelectedZone(zone);
                            }
                        }}
                    />
                ))}
            </MapContainer>

            {/* ════ FLOATING CONTROL: LAYER TOGGLE (Top Right) ════ */}
            <div className="absolute top-4 right-4 z-[400] flex flex-col items-end gap-2">
                <button
                    onClick={() => setLayerMenuOpen(!layerMenuOpen)}
                    className="bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/50 text-slate-700 hover:bg-white hover:scale-105 transition-all"
                >
                    <Layers size={24} />
                </button>

                {layerMenuOpen && (
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-xl border border-white/50 w-48 animate-fade-in-up origin-top-right">
                        <div className="text-xs font-bold text-slate-400 uppercase px-3 py-2">Select Layer</div>
                        <button
                            onClick={() => { setActiveLayer('rgb'); setLayerMenuOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg font-medium transition-colors mb-1 ${activeLayer === 'rgb' ? 'bg-[#86A789] text-white' : 'hover:bg-slate-100 text-slate-700'}`}
                        >
                            <span>CartoDB Voyager</span>
                            {activeLayer === 'rgb' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </button>
                        <button
                            onClick={() => { setActiveLayer('ndmi'); setLayerMenuOpen(false); }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg font-medium transition-colors ${activeLayer === 'ndmi' ? 'bg-[#86A789] text-white' : 'hover:bg-slate-100 text-slate-700'}`}
                        >
                            <span>NDMI (Moisture)</span>
                            {activeLayer === 'ndmi' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </button>
                    </div>
                )}
            </div>

            {/* ════ FLOATING CONTROL: LEGEND (Bottom Right) ════ */}
            <div className={`absolute bottom-6 right-4 z-[400] bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 w-64 transition-all duration-300 ${selectedZone ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="text-xs font-extrabold text-slate-600 uppercase mb-3 flex items-center gap-2">
                    <Droplets size={14} className="text-blue-500" /> Soil Moisture Index
                </div>
                <div className="h-3 w-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full mb-2"></div>
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>Low (10%)</span>
                    <span>Moderate</span>
                    <span>High (90%)</span>
                </div>
            </div>

            {/* ════ ACTIONABLE INSIGHT SIDEBAR (Right Overlay) ════ */}
            <div className={`
                absolute inset-x-0 bottom-0 sm:top-0 sm:left-auto sm:right-0 sm:bottom-0 sm:w-96 
                bg-[#FDFBF7]/95 backdrop-blur-xl shadow-2xl z-[500]
                transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) border-t sm:border-l border-white/50
                ${selectedZone ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full'}
                flex flex-col h-[60vh] sm:h-auto rounded-t-[2rem] sm:rounded-none
            `}>
                {selectedZone && (
                    <>
                        {/* Header */}
                        <div className="p-6 pb-2 border-b border-slate-100 flex justify-between items-start">
                            <div>
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border
                                    ${selectedZone.id === 'A' ? 'bg-red-50 text-red-600 border-red-100' :
                                        selectedZone.id === 'B' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            'bg-green-50 text-green-600 border-green-100'
                                    }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${selectedZone.id === 'A' ? 'bg-red-500' : selectedZone.id === 'B' ? 'bg-amber-500' : 'bg-green-500'
                                        } animate-pulse`} />
                                    {selectedZone.status}
                                </div>
                                <h2 className="text-xl font-heading font-extrabold text-slate-900 leading-tight">
                                    {selectedZone.name}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedZone(null)}
                                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">

                            {/* Water Need Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
                                    <div className="text-slate-400 text-xs font-bold uppercase">Moisture</div>
                                    <div className={`text-4xl font-extrabold font-heading ${selectedZone.moisture < 30 ? 'text-red-500' : selectedZone.moisture < 50 ? 'text-amber-500' : 'text-green-500'
                                        }`}>
                                        {selectedZone.moisture}%
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-28">
                                    <div className="text-slate-400 text-xs font-bold uppercase">Water Deficit</div>
                                    <div className="text-4xl font-extrabold font-heading text-slate-900">
                                        {selectedZone.deficit}<span className="text-lg text-slate-400 ml-1 font-sans">mm</span>
                                    </div>
                                </div>
                            </div>

                            {/* AI Recommendation */}
                            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Droplet size={64} className="text-blue-600" />
                                </div>
                                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                    AI Recommendation
                                </h3>
                                <p className="text-sm text-blue-800/90 leading-relaxed font-medium">
                                    "{selectedZone.recommendation}"
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Soil Type</span>
                                    <span className="font-semibold text-slate-900">Clay Loam</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Crop Stage</span>
                                    <span className="font-semibold text-slate-900">Flowering</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Last Irrigated</span>
                                    <span className="font-semibold text-slate-900">3 Days Ago</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-6 pt-2 border-t border-slate-100 bg-white/50 backdrop-blur-sm sm:bg-transparent">
                            <button className="w-full py-4 bg-[#86A789] hover:bg-[#759678] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#86A789]/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                                <Droplets size={20} />
                                Schedule Automatic Irrigation
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
