'use client';

import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

export function ThemeColorPicker() {
  const [themeHue, setThemeHue] = useState(330);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get stored hue
    const storedHue = localStorage.getItem('portfolio-theme-hue');
    if (storedHue) {
      setThemeHue(parseInt(storedHue, 10));
    }
  }, []);

  const handleHueChange = (e) => {
    const newHue = parseInt(e.target.value, 10);
    setThemeHue(newHue);
    
    // Update CSS variable
    document.documentElement.style.setProperty('--theme-hue', newHue.toString());
    
    // Save to localStorage
    localStorage.setItem('portfolio-theme-hue', newHue.toString());
  };

  const presetColors = [
    { name: 'Pink', hue: 330 },
    { name: 'Purple', hue: 270 },
    { name: 'Blue', hue: 210 },
    { name: 'Cyan', hue: 180 },
    { name: 'Green', hue: 150 },
    { name: 'Yellow', hue: 60 },
    { name: 'Orange', hue: 30 },
    { name: 'Red', hue: 0 },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
        style={{
          background: `hsl(${themeHue}, 65%, 38%)`,
          color: 'white',
        }}
        title="Change Theme Color"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden xl:inline">Theme</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 p-4 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Theme Color</h3>
              <div 
                className="w-10 h-10 rounded-lg border-2 border-slate-200 dark:border-slate-600 shadow-md transition-transform hover:scale-110"
                style={{ background: `hsl(${themeHue}, 65%, 38%)` }}
              />
            </div>

            {/* Slider */}
            <div className="mb-4">
              <div className="relative h-10 rounded-lg overflow-hidden mb-3 shadow-inner"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(0, 70%, 60%), 
                    hsl(60, 70%, 60%), 
                    hsl(120, 70%, 60%), 
                    hsl(180, 70%, 60%), 
                    hsl(240, 70%, 60%), 
                    hsl(300, 70%, 60%), 
                    hsl(360, 70%, 60%)
                  )`
                }}
              >
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={themeHue}
                  onChange={handleHueChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-slate-900 dark:border-white rounded-full shadow-xl pointer-events-none transition-all"
                  style={{ left: `${(themeHue / 360) * 100}%`, transform: 'translate(-50%, -50%)' }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                <span className="font-mono font-semibold">Hue: {themeHue}°</span>
                <span>Drag to adjust color</span>
              </div>
            </div>

            {/* Presets */}
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">Quick Presets</p>
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color.hue}
                    onClick={() => {
                      setThemeHue(color.hue);
                      document.documentElement.style.setProperty('--theme-hue', color.hue.toString());
                      localStorage.setItem('portfolio-theme-hue', color.hue.toString());
                    }}
                    className={`
                      relative h-14 rounded-lg transition-all shadow-md hover:shadow-lg
                      ${themeHue === color.hue 
                        ? 'ring-2 ring-slate-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-slate-800 scale-105' 
                        : 'hover:scale-105'
                      }
                    `}
                    style={{ background: `hsl(${color.hue}, 70%, 60%)` }}
                    title={color.name}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-lg">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                ✨ Changes apply to both admin and public site
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
