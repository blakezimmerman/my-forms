import { css } from 'client/styling';

export const truncate = (width: string) => css`
  width: ${width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const hexToRgb = (hex: string) => ({
  r: parseInt(hex.substring(0, 2), 16), // hexToR,
  g: parseInt(hex.substring(2, 4), 16), // hexToG
  b: parseInt(hex.substring(4, 6), 16) // hexToB
});

export const hexa = (hex: string, alpha: number) => {
  const validHex = validateHex(hex);
  const { r, g, b } = hexToRgb(validHex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getColorByBg = (bgHex: string) => {
  const validHex = validateHex(bgHex);
  const { r, g, b } = hexToRgb(validHex);
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? '#000' : '#fff';
};

export const changeLuminance = (hex: string, lum: number) => {
  const validHex = validateHex(hex);
  lum = lum || 0;

  // Convert to decimal and change luminosity
  let rgb = '#', c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(validHex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
};

const validateHex = (hex: string) => {
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  return hex;
};
