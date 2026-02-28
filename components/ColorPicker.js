'use client';

import { Palette, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTheme } from '@/lib/theme-context';

export function ColorPicker() {
  const { themeHue, setThemeHue } = useTheme();

  const handleReset = () => {
    setThemeHue(330); // Reset to pink
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open color picker"
          className="transition-transform hover:scale-110"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-6" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm mb-1">Theme Color</h4>
              <p className="text-xs text-muted-foreground">Choose your accent color</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="h-8 w-8"
              title="Reset to default"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Gradient slider */}
          <div className="relative">
            <div 
              className="absolute inset-0 h-2 rounded-full pointer-events-none top-1/2 -translate-y-1/2"
              style={{
                background: `linear-gradient(to right, 
                  hsl(0, 70%, 55%), 
                  hsl(30, 70%, 55%), 
                  hsl(60, 70%, 55%), 
                  hsl(90, 70%, 55%), 
                  hsl(120, 70%, 55%), 
                  hsl(150, 70%, 55%), 
                  hsl(180, 70%, 55%), 
                  hsl(210, 70%, 55%), 
                  hsl(240, 70%, 55%), 
                  hsl(270, 70%, 55%), 
                  hsl(300, 70%, 55%), 
                  hsl(330, 70%, 55%), 
                  hsl(360, 70%, 55%))`,
              }}
            />
            <Slider
              value={[themeHue]}
              onValueChange={(value) => setThemeHue(value[0])}
              max={360}
              min={0}
              step={1}
              className="cursor-pointer relative z-10 [&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-range]]:bg-transparent [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-gray-300 [&_[data-slot=slider-thumb]]:shadow-lg"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
