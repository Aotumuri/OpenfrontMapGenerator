// パーリンノイズ生成（シンプルな実装）
export function perlin(x: number, y: number, seed = 0): number {
  // 乱数生成
  function random(ix: number, iy: number) {
    const s = Math.sin(ix * 127.1 + iy * 311.7 + seed * 101.3) * 43758.5453;
    return s - Math.floor(s);
  }
  // 補間
  function lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }
  // グリッド座標
  const x0 = Math.floor(x), x1 = x0 + 1;
  const y0 = Math.floor(y), y1 = y0 + 1;
  // コーナー値
  const v00 = random(x0, y0);
  const v10 = random(x1, y0);
  const v01 = random(x0, y1);
  const v11 = random(x1, y1);
  // 補間
  const tx = x - x0, ty = y - y0;
  const a = lerp(v00, v10, tx);
  const b = lerp(v01, v11, tx);
  return lerp(a, b, ty);
}
