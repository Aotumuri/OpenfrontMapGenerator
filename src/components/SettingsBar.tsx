import React from 'react';

type SettingsBarProps = {
  width: number;
  height: number;
  scale: number;
  seed: number;
  baseHeight: number;
  removePond: boolean;
  minWaterSize: number;
  removeLand: boolean;
  minLandSize: number;
  setWidth: (v: number) => void;
  setHeight: (v: number) => void;
  setScale: (v: number) => void;
  setSeed: (v: number) => void;
  setBaseHeight: (v: number) => void;
  setRemovePond: (v: boolean) => void;
  setMinWaterSize: (v: number) => void;
  setRemoveLand: (v: boolean) => void;
  setMinLandSize: (v: number) => void;
  onGenerate: () => void;
};

const SettingsBar: React.FC<SettingsBarProps> = ({ width, height, scale, seed, baseHeight, removePond, minWaterSize, removeLand, minLandSize, setWidth, setHeight, setScale, setSeed, setBaseHeight, setRemovePond, setMinWaterSize, setRemoveLand, setMinLandSize, onGenerate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 220 }}>
      <label>
        幅: {width}px
        <input type="range" min={64} max={512} value={width} onChange={e => setWidth(Number(e.target.value))} />
      </label>
      <label>
        高さ: {height}px
        <input type="range" min={64} max={512} value={height} onChange={e => setHeight(Number(e.target.value))} />
      </label>
      <label>
        ノイズスケール: {scale.toFixed(2)}
        <input type="range" min={1} max={50} step={0.01} value={scale} onChange={e => setScale(Number(e.target.value))} />
      </label>
      <label>
        シード: {seed}
        <input type="number" min={0} max={9999} value={seed} onChange={e => setSeed(Number(e.target.value))} />
      </label>
      <label>
        基本高さ: {baseHeight.toFixed(2)}
        <input type="range" min={0} max={1} step={0.01} value={baseHeight} onChange={e => setBaseHeight(Number(e.target.value))} />
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" checked={removePond} onChange={e => setRemovePond(e.target.checked)} />
        池を許さない（孤立水域除去）
      </label>
      <label>
        水域最小連結数: {minWaterSize}
        <input type="range" min={1} max={1000} value={minWaterSize} onChange={e => setMinWaterSize(Number(e.target.value))} />
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" checked={removeLand} onChange={e => setRemoveLand(e.target.checked)} />
        孤立陸地を除去
      </label>
      <label>
        陸地最小連結数: {minLandSize}
        <input type="range" min={1} max={1000} value={minLandSize} onChange={e => setMinLandSize(Number(e.target.value))} />
      </label>
      <button onClick={onGenerate}>生成</button>
    </div>
  );
};

export default SettingsBar;
