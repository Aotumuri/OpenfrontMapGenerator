import { useState } from 'react';
import './App.css';
import MapPreview from './components/MapPreview';
import SettingsBar from './components/SettingsBar';


function App() {
  const [width, setWidth] = useState(256);
  const [height, setHeight] = useState(256);
  const [scale, setScale] = useState(4.0);
  const [seed, setSeed] = useState(0);
  const [baseHeight, setBaseHeight] = useState(0.2);
  const [removePond, setRemovePond] = useState(true);
  const [minWaterSize, setMinWaterSize] = useState(1000);
  const [removeLand, setRemoveLand] = useState(true);
  const [minLandSize, setMinLandSize] = useState(1000);
  const [generate, setGenerate] = useState(true);
  // 川生成用
  const [riverSourceHeight, setRiverSourceHeight] = useState(0.5);
  const [riverCount, setRiverCount] = useState(3);
  const [riverHeight, setRiverHeight] = useState(0.05);
  // 大陸モード
  const [continentMode, setContinentMode] = useState(false);
  const [continentCount, setContinentCount] = useState(1);

  const handleGenerate = () => {
    setGenerate(false);
    setTimeout(() => setGenerate(true), 10);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#222', color: '#eee', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, height: '100vh', overflow: 'hidden' }}>
        <MapPreview
          width={width}
          height={height}
          seed={seed}
          scale={scale}
          baseHeight={baseHeight}
          removePond={removePond}
          minWaterSize={minWaterSize}
          removeLand={removeLand}
          minLandSize={minLandSize}
          generate={generate}
          riverSourceHeight={riverSourceHeight}
          riverCount={riverCount}
          riverHeight={riverHeight}
          continentMode={continentMode}
          continentCount={continentCount}
        />
      </div>
      <div style={{ width: 320, background: '#333', padding: 24, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24, height: '100vh', position: 'fixed', right: 0, top: 0, zIndex: 10, borderLeft: '1px solid #222' }}>
        <h2 style={{ margin: 0 }}>設定</h2>
        <SettingsBar
          width={width}
          height={height}
          scale={scale}
          seed={seed}
          baseHeight={baseHeight}
          removePond={removePond}
          minWaterSize={minWaterSize}
          removeLand={removeLand}
          minLandSize={minLandSize}
          riverSourceHeight={riverSourceHeight}
          setRiverSourceHeight={setRiverSourceHeight}
          riverCount={riverCount}
          setRiverCount={setRiverCount}
          riverHeight={riverHeight}
          setRiverHeight={setRiverHeight}
          continentMode={continentMode}
          setContinentMode={setContinentMode}
          continentCount={continentCount}
          setContinentCount={setContinentCount}
          setWidth={setWidth}
          setHeight={setHeight}
          setScale={setScale}
          setSeed={setSeed}
          setBaseHeight={setBaseHeight}
          setRemovePond={setRemovePond}
          setMinWaterSize={setMinWaterSize}
          setRemoveLand={setRemoveLand}
          setMinLandSize={setMinLandSize}
          onGenerate={handleGenerate}
        />
        <div style={{ fontSize: 12, color: '#aaa', marginTop: 32 }}>
          パーリンノイズ地形マップ自動生成<br />
          色分けは指定表に準拠
        </div>
      </div>
      {/* 右端固定の設定バーの下にメインを押し出すためのダミーdiv */}
      <div style={{ width: 320, flexShrink: 0 }} />
    </div>
  );
}

export default App;
