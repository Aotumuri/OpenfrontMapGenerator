// 高さマップを滑らかにする（平均化フィルタ）
// strength: 1回あたりの重み（0~1, 0で変化なし, 1で完全平均）
// passes: 繰り返し回数
export function smoothHeightMap(
  heightMap: number[][],
  strength: number = 0.5,
  passes: number = 1,
  mode: 'normal' | 'coarse' = 'normal',
  coarseScale: number = 0.1 // 0.1なら10分の1解像度で平均
): number[][] {
  const h = heightMap.length;
  const w = heightMap[0]?.length || 0;
  if (mode === 'coarse') {
    // 粗い範囲で平均化: 一度縮小→拡大
    const ch = Math.max(2, Math.floor(h * coarseScale));
    const cw = Math.max(2, Math.floor(w * coarseScale));
    // 縮小
    const small: number[][] = Array.from({ length: ch }, (_, sy) =>
      Array.from({ length: cw }, (_, sx) => {
        // 元画像の範囲平均
        let sum = 0, cnt = 0;
        const y0 = Math.floor(sy * h / ch), y1 = Math.floor((sy + 1) * h / ch);
        const x0 = Math.floor(sx * w / cw), x1 = Math.floor((sx + 1) * w / cw);
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            sum += heightMap[y][x];
            cnt++;
          }
        }
        return cnt ? sum / cnt : 0;
      })
    );
    // 拡大（バイリニア補間）
    const upscaled: number[][] = Array.from({ length: h }, (_, y) =>
      Array.from({ length: w }, (_, x) => {
        const fy = y / h * ch;
        const fx = x / w * cw;
        const y0 = Math.floor(fy), y1 = Math.min(ch - 1, y0 + 1);
        const x0 = Math.floor(fx), x1 = Math.min(cw - 1, x0 + 1);
        const wy = fy - y0, wx = fx - x0;
        // バイリニア補間
        const v00 = small[y0][x0];
        const v01 = small[y0][x1];
        const v10 = small[y1][x0];
        const v11 = small[y1][x1];
        return (
          v00 * (1 - wy) * (1 - wx) +
          v01 * (1 - wy) * wx +
          v10 * wy * (1 - wx) +
          v11 * wy * wx
        );
      })
    );
    // 元の高さと合成
    return heightMap.map((row, y) =>
      row.map((v, x) => v * (1 - strength) + upscaled[y][x] * strength)
    );
  } else {
    // 通常の近傍平均
    let map = heightMap.map(row => [...row]);
    for (let p = 0; p < passes; p++) {
      const next = map.map(row => [...row]);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let sum = 0, cnt = 0;
          for (const [dy, dx] of [[0,0],[1,0],[-1,0],[0,1],[0,-1]]) {
            const ny = y + dy, nx = x + dx;
            if (ny >= 0 && ny < h && nx >= 0 && nx < w) {
              sum += map[ny][nx];
              cnt++;
            }
          }
          const avg = sum / cnt;
          next[y][x] = map[y][x] * (1 - strength) + avg * strength;
        }
      }
      map = next;
    }
    return map;
  }
}
