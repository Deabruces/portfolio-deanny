/**
 * WCAG Contrast Checker and Auto-Fixer
 * Implements WCAG 2.1 Level AA contrast requirements
 */

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface ContrastResult {
  ratio: number;
  passes: {
    AA: boolean;
    AAA: boolean;
    AALarge: boolean;
    AAALarge: boolean;
  };
  textColor: string;
  backgroundColor: string;
}

export interface ContrastFix {
  original: string;
  fixed: string;
  ratio: number;
  strategy: 'darken' | 'lighten' | 'none';
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): ColorRGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Calculate relative luminance (WCAG formula)
 */
export function getRelativeLuminance(rgb: ColorRGB): number {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return 0;
  }

  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio passes WCAG requirements
 */
export function checkContrast(
  textColor: string,
  backgroundColor: string,
  isLargeText: boolean = false
): ContrastResult {
  const ratio = getContrastRatio(textColor, backgroundColor);

  return {
    ratio,
    passes: {
      AA: isLargeText ? ratio >= 3 : ratio >= 4.5,
      AAA: isLargeText ? ratio >= 4.5 : ratio >= 7,
      AALarge: ratio >= 3,
      AAALarge: ratio >= 4.5,
    },
    textColor,
    backgroundColor,
  };
}

/**
 * Darken a color by percentage
 */
function darkenColor(rgb: ColorRGB, percentage: number): ColorRGB {
  const factor = 1 - percentage / 100;
  return {
    r: Math.max(0, Math.min(255, rgb.r * factor)),
    g: Math.max(0, Math.min(255, rgb.g * factor)),
    b: Math.max(0, Math.min(255, rgb.b * factor)),
  };
}

/**
 * Lighten a color by percentage
 */
function lightenColor(rgb: ColorRGB, percentage: number): ColorRGB {
  const factor = percentage / 100;
  return {
    r: Math.max(0, Math.min(255, rgb.r + (255 - rgb.r) * factor)),
    g: Math.max(0, Math.min(255, rgb.g + (255 - rgb.g) * factor)),
    b: Math.max(0, Math.min(255, rgb.b + (255 - rgb.b) * factor)),
  };
}

/**
 * Auto-fix color contrast to meet WCAG AA requirements
 */
export function fixContrast(
  textColor: string,
  backgroundColor: string,
  targetRatio: number = 4.5,
  maxIterations: number = 100
): ContrastFix {
  const bgRgb = hexToRgb(backgroundColor);
  const textRgb = hexToRgb(textColor);

  if (!bgRgb || !textRgb) {
    return {
      original: textColor,
      fixed: textColor,
      ratio: 0,
      strategy: 'none',
    };
  }

  const currentRatio = getContrastRatio(textColor, backgroundColor);

  // Already passes
  if (currentRatio >= targetRatio) {
    return {
      original: textColor,
      fixed: textColor,
      ratio: currentRatio,
      strategy: 'none',
    };
  }

  // Determine if we should darken or lighten the text
  const bgLuminance = getRelativeLuminance(bgRgb);
  const shouldDarken = bgLuminance > 0.5;

  let fixedRgb = { ...textRgb };
  let step = 5; // Start with 5% increments
  let iterations = 0;
  let bestRatio = currentRatio;
  let bestColor = textColor;

  while (iterations < maxIterations) {
    const testRgb = shouldDarken
      ? darkenColor(fixedRgb, step)
      : lightenColor(fixedRgb, step);

    const testHex = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
    const testRatio = getContrastRatio(testHex, backgroundColor);

    if (testRatio >= targetRatio) {
      return {
        original: textColor,
        fixed: testHex,
        ratio: testRatio,
        strategy: shouldDarken ? 'darken' : 'lighten',
      };
    }

    // Track best attempt
    if (testRatio > bestRatio) {
      bestRatio = testRatio;
      bestColor = testHex;
      fixedRgb = testRgb;
    }

    // If we're getting worse, we've gone too far
    if (testRatio < bestRatio * 0.95) {
      break;
    }

    iterations++;
  }

  // Return best attempt even if it doesn't fully meet target
  return {
    original: textColor,
    fixed: bestColor,
    ratio: bestRatio,
    strategy: shouldDarken ? 'darken' : 'lighten',
  };
}

/**
 * Suggest accessible color pairs
 */
export function suggestAccessiblePairs(baseColor: string): string[] {
  const suggestions: string[] = [];

  // Common accessible combinations
  const darkColors = ['#000000', '#1a1a1a', '#2d3748', '#1e293b'];
  const lightColors = ['#ffffff', '#f7fafc', '#f1f5f9', '#e2e8f0'];

  const baseRgb = hexToRgb(baseColor);
  if (!baseRgb) return suggestions;

  const baseLuminance = getRelativeLuminance(baseRgb);

  // If base is dark, suggest light text
  if (baseLuminance < 0.5) {
    lightColors.forEach(color => {
      const ratio = getContrastRatio(color, baseColor);
      if (ratio >= 4.5) {
        suggestions.push(color);
      }
    });
  } else {
    // If base is light, suggest dark text
    darkColors.forEach(color => {
      const ratio = getContrastRatio(color, baseColor);
      if (ratio >= 4.5) {
        suggestions.push(color);
      }
    });
  }

  return suggestions;
}

/**
 * Extract colors from CSS color values (hex, rgb, hsl)
 */
export function parseColor(color: string): string | null {
  // Remove whitespace
  color = color.trim();

  // Hex color
  if (color.startsWith('#')) {
    return color.length === 7 ? color : null;
  }

  // RGB/RGBA
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    return rgbToHex(r, g, b);
  }

  // HSL/HSLA - convert to RGB first
  const hslMatch = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1]) / 360;
    const s = parseInt(hslMatch[2]) / 100;
    const l = parseInt(hslMatch[3]) / 100;

    const hslToRgb = (h: number, s: number, l: number): ColorRGB => {
      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
      };
    };

    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  return null;
}
