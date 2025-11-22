/**
 * Download chart as PNG by converting SVG to canvas
 */
export const downloadChart = (ref, filename, scale = 1) => {
  if (!ref.current) return;

  const originalSvg = ref.current.querySelector('svg');
  if (!originalSvg) return;

  // Clone so we can safely modify width/height for higher resolution export.
  const svg = originalSvg.cloneNode(true);

  let baseWidth;
  let baseHeight;
  const viewBox = svg.getAttribute('viewBox');
  if (viewBox) {
    const parts = viewBox.split(/\s+/);
    if (parts.length === 4) {
      baseWidth = parseFloat(parts[2]);
      baseHeight = parseFloat(parts[3]);
    }
  }
  // Fallback if no viewBox (not expected here) use bounding box
  if (!baseWidth || !baseHeight) {
    const bbox = originalSvg.getBoundingClientRect();
    baseWidth = bbox.width;
    baseHeight = bbox.height;
  }

  const exportWidth = baseWidth * scale;
  const exportHeight = baseHeight * scale;
  svg.setAttribute('width', exportWidth);
  svg.setAttribute('height', exportHeight);

  const serializer = new XMLSerializer();
  const svgData = serializer.serializeToString(svg);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    canvas.width = exportWidth;
    canvas.height = exportHeight;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, exportWidth, exportHeight);

    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  img.src = url;
};
