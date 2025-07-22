import { useState, useEffect } from 'react';
import presets from './presets/presets.json';
import './App.css';
import MapPreview from './components/MapPreview';
import SettingsBar from './components/SettingsBar';

function App() {
  // プリセット管理
  const [presetList] = useState(presets);
  const [presetIndex, setPresetIndex] = useState(0);
  // 既存のuseState群
  const [coarseSmoothMode, setCoarseSmoothMode] = useState(false);
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
  // ノイズ強調
  const [roughMode, setRoughMode] = useState(false);
  // スムージング
  const [smoothMode, setSmoothMode] = useState(false);
  const [smoothStrength, setSmoothStrength] = useState(0.5);
  // global noise
  const [globalNoiseMode, setGlobalNoiseMode] = useState(false);
  const [globalNoiseScale, setGlobalNoiseScale] = useState(0.3);
  const [globalNoiseStrength, setGlobalNoiseStrength] = useState(0.5);

  // プリセット選択時にパラメータを反映
  useEffect(() => {
    const p = presetList[presetIndex];
    if (!p) return;
    setWidth(p.width);
    setHeight(p.height);
    setScale(p.scale);
    setSeed(p.seed);
    setBaseHeight(p.baseHeight);
    setRemovePond(p.removePond);
    setMinWaterSize(p.minWaterSize);
    setRemoveLand(p.removeLand);
    setMinLandSize(p.minLandSize);
    setRiverSourceHeight(p.riverSourceHeight);
    setRiverCount(p.riverCount);
    setRiverHeight(p.riverHeight);
    setContinentMode(p.continentMode);
    setContinentCount(p.continentCount);
    setRoughMode(p.roughMode);
    setSmoothMode(p.smoothMode);
    setSmoothStrength(p.smoothStrength);
    setCoarseSmoothMode(p.coarseSmoothMode);
    setGlobalNoiseMode(p.globalNoiseMode ?? false);
    setGlobalNoiseScale(p.globalNoiseScale ?? 0.3);
    setGlobalNoiseStrength(p.globalNoiseStrength ?? 0.5);
  }, [presetIndex, presetList]);

  const handleGenerate = () => {
    setGenerate(false);
    setTimeout(() => setGenerate(true), 10);
  };

  // プリセット選択時にパラメータを反映
  useEffect(() => {
    const p = presetList[presetIndex];
    if (!p) return;
    setWidth(p.width);
    setHeight(p.height);
    setScale(p.scale);
    setSeed(p.seed);
    setBaseHeight(p.baseHeight);
    setRemovePond(p.removePond);
    setMinWaterSize(p.minWaterSize);
    setRemoveLand(p.removeLand);
    setMinLandSize(p.minLandSize);
    setRiverSourceHeight(p.riverSourceHeight);
    setRiverCount(p.riverCount);
    setRiverHeight(p.riverHeight);
    setContinentMode(p.continentMode);
    setContinentCount(p.continentCount);
    setRoughMode(p.roughMode);
    setSmoothMode(p.smoothMode);
    setSmoothStrength(p.smoothStrength);
    setCoarseSmoothMode(p.coarseSmoothMode);
    setGlobalNoiseMode(p.globalNoiseMode);
    setGlobalNoiseScale(p.globalNoiseScale);
    setGlobalNoiseStrength(p.globalNoiseStrength);
  }, [presetIndex, presetList]);
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
          roughMode={roughMode}
          smoothMode={smoothMode}
          smoothStrength={smoothStrength}
          coarseSmoothMode={coarseSmoothMode}
          globalNoiseMode={globalNoiseMode}
          globalNoiseScale={globalNoiseScale}
          globalNoiseStrength={globalNoiseStrength}
        />
      </div>
      <div style={{ width: 320, background: '#333', padding: 24, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24, height: '100vh', position: 'fixed', right: 0, top: 0, zIndex: 10, borderLeft: '1px solid #222', overflowY: 'auto' }}>
        <h2 style={{ margin: 0 }}>設定</h2>
        <SettingsBar
          presetList={presetList}
          presetIndex={presetIndex}
          setPresetIndex={setPresetIndex}
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
          continentMode={continentMode}
          setContinentMode={setContinentMode}
          continentCount={continentCount}
          setContinentCount={setContinentCount}
          roughMode={roughMode}
          setRoughMode={setRoughMode}
          smoothMode={smoothMode}
          setSmoothMode={setSmoothMode}
          smoothStrength={smoothStrength}
          setSmoothStrength={setSmoothStrength}
          coarseSmoothMode={coarseSmoothMode}
          setCoarseSmoothMode={setCoarseSmoothMode}
          globalNoiseMode={globalNoiseMode}
          setGlobalNoiseMode={setGlobalNoiseMode}
          globalNoiseScale={globalNoiseScale}
          setGlobalNoiseScale={setGlobalNoiseScale}
          globalNoiseStrength={globalNoiseStrength}
          setGlobalNoiseStrength={setGlobalNoiseStrength}
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
