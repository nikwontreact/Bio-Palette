import { Palette, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/lib/theme-context";

const presetColors = [
  { name: "Teal", hue: 168 },
  { name: "Blue", hue: 210 },
  { name: "Purple", hue: 270 },
  { name: "Pink", hue: 330 },
  { name: "Red", hue: 0 },
  { name: "Orange", hue: 30 },
  { name: "Yellow", hue: 50 },
  { name: "Green", hue: 140 },
];

export function ColorPicker() {
  const { themeHue, setThemeHue, theme } = useTheme();

  const handleReset = () => {
    setThemeHue(168);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-color-picker"
          aria-label="Open color picker"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium text-sm">Theme Color</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-7 px-2 text-xs"
              data-testid="button-reset-color"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-md border border-border flex-shrink-0"
                style={{
                  backgroundColor: `hsl(${themeHue} ${theme === "dark" ? "58% 48%" : "65% 38%"})`,
                }}
                data-testid="preview-color-swatch"
              />
              <div className="flex-1 space-y-1">
                <Slider
                  value={[themeHue]}
                  onValueChange={(value) => setThemeHue(value[0])}
                  max={360}
                  min={0}
                  step={1}
                  className="w-full"
                  data-testid="slider-theme-hue"
                  style={{
                    background: `linear-gradient(to right, 
                      hsl(0, 65%, 50%), 
                      hsl(60, 65%, 50%), 
                      hsl(120, 65%, 50%), 
                      hsl(180, 65%, 50%), 
                      hsl(240, 65%, 50%), 
                      hsl(300, 65%, 50%), 
                      hsl(360, 65%, 50%))`,
                    borderRadius: "9999px",
                  }}
                />
                <p className="text-xs text-muted-foreground">Hue: {themeHue}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Presets</p>
            <div className="grid grid-cols-4 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setThemeHue(color.hue)}
                  className={`w-full aspect-square rounded-md border-2 transition-all ${
                    themeHue === color.hue
                      ? "border-foreground scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: `hsl(${color.hue} ${theme === "dark" ? "58% 48%" : "65% 38%"})`,
                  }}
                  title={color.name}
                  data-testid={`preset-color-${color.name.toLowerCase()}`}
                  aria-label={`Set theme color to ${color.name}`}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Colors automatically adapt to light and dark modes
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
