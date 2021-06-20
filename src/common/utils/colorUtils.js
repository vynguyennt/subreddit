export function extractColorFromHex(h) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length === 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length === 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return { r, g, b };
}

export function extractColorFromRGB(c) {
  c = c.substr(c.indexOf("(") + 1);
  c = c.substr(0, c.length - 1);

  const [r, g, b] = c.split(",");

  return { r, g, b };
}

// support Hex or RGB color only
export function selectTextColorForBg(color) {
  const { r, g, b } =
    color.indexOf("#") > -1
      ? extractColorFromHex(color)
      : extractColorFromRGB(color);
  if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
    return "#1a1a1b";
  } else {
    return "#ffffff";
  }
}
