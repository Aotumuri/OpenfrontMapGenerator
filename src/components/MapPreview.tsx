import React from 'react';

type MapPreviewProps = {
  width: number;
  height: number;
  seed: number;
  scale: number;
  generate: boolean;
  onGenerated?: () => void;
};


const MapPreview: React.FC<MapPreviewProps> = ({ width, height, seed, scale, generate, onGenerated }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = React.useState(1);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const lastPos = React.useRef<{ x: number; y: number } | null>(null);
  const lastOffset = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastDist = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!generate) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    import('../utils/perlin').then(({ perlin }) => {
      import('../utils/colorMap').then(({ getTerrainColor }) => {
        const img = ctx.createImageData(width, height);
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const nx = x / width * scale;
            const ny = y / height * scale;
            const v = perlin(nx, ny, seed);
            const [r, g, b] = getTerrainColor(v);
            const idx = (y * width + x) * 4;
            img.data[idx] = r;
            img.data[idx + 1] = g;
            img.data[idx + 2] = b;
            img.data[idx + 3] = 255;
          }
        }
        ctx.putImageData(img, 0, 0);
        onGenerated && onGenerated();
      });
    });
  }, [width, height, seed, scale, generate, onGenerated]);

  // ドラッグ移動
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastOffset.current = { ...offset };
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || !lastPos.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setOffset({ x: lastOffset.current.x + dx, y: lastOffset.current.y + dy });
  };
  const handleMouseUp = () => {
    setDragging(false);
    lastPos.current = null;
  };

  // ピンチズーム・トラックパッドズーム・Ctrl+ホイール
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoom(z => {
        let next = z - e.deltaY * 0.002;
        next = Math.max(0.2, Math.min(5, next));
        return next;
      });
    }
  };

  // タッチ: ピンチズームと移動
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastOffset.current = { ...offset };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastDist.current = Math.sqrt(dx * dx + dy * dy);
      // ピンチ中心を基準にズーム位置も調整
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      lastPos.current = { x: centerX, y: centerY };
      lastOffset.current = { ...offset };
    }
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && lastPos.current) {
      const dx = e.touches[0].clientX - lastPos.current.x;
      const dy = e.touches[0].clientY - lastPos.current.y;
      setOffset({ x: lastOffset.current.x + dx, y: lastOffset.current.y + dy });
    } else if (e.touches.length === 2 && lastDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      setZoom(z => {
        let next = z * (dist / lastDist.current!);
        next = Math.max(0.2, Math.min(5, next));
        lastDist.current = dist;
        return next;
      });
    }
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) {
      lastPos.current = null;
      lastDist.current = null;
    }
  };

  // 画面いっぱいに拡大縮小・移動できるように
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', userSelect: 'none', touchAction: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div style={{ position: 'absolute', left: 16, top: 16, zIndex: 2, background: 'rgba(34,34,34,0.7)', color: '#fff', borderRadius: 8, padding: '2px 12px', fontSize: 16 }}>
        {(zoom * 100).toFixed(0)}%
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: width * zoom,
          height: height * zoom,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          background: '#222',
          touchAction: 'none',
          cursor: dragging ? 'grabbing' : 'grab',
        }}
      />
    </div>
  );
};

export default MapPreview;
