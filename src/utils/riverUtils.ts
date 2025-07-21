// 川生成ロジック
// - 標高が riverSourceHeight 以上のランダムな地点から、指定数だけ川を生やす
// - 各川は低い隣接タイルに水を伸ばし、海（元から水）に到達したら終了
// - 進行不能（周囲がすべて高い or 既に川）なら川ごと消す
// - シードでランダム性を制御

export function addRivers(
  heightMap: number[][],
  riverSourceHeight: number,
  riverCount: number,
  seed: number,
  riverHeight: number = 0.05 // 川の高さ（水域より少し高い値）
): number[][] {
  const h = heightMap.length;
  const w = heightMap[0]?.length || 0;
  const result = heightMap.map(row => [...row]);
  const rng = mulberry32(seed);

  // 川の開始点候補を集める
  const sources: [number, number][] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (heightMap[y][x] >= riverSourceHeight) {
        sources.push([y, x]);
      }
    }
  }
  // シャッフルして riverCount 個選ぶ
  shuffle(sources, rng);
  const selected = sources.slice(0, riverCount);

  for (const [sy, sx] of selected) {
    let y = sy, x = sx;
    const riverPath: [number, number][] = [[y, x]];
    let failed = false;
    let visited = Array.from({ length: h }, () => Array(w).fill(false));
    visited[y][x] = true;
    while (true) {
      // 隣接タイルのうち、今より低いもの（既に川でない/海でない）を集める
      const neighbors: [number, number][] = [];
      let foundSea = false;
      for (const [dy, dx] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const ny = y + dy, nx = x + dx;
        if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;
        if (heightMap[ny][nx] < 0.18) { // 海
          foundSea = true;
          break;
        }
        if (result[ny][nx] < riverHeight) {
          // 既に川
          continue;
        }
        if (heightMap[ny][nx] < heightMap[y][x] && !visited[ny][nx]) {
          neighbors.push([ny, nx]);
        }
      }
      if (foundSea) {
        // 川を描画
        for (const [py, px] of riverPath) {
          result[py][px] = riverHeight;
        }
        break;
      }
      if (neighbors.length === 0) {
        // 行き止まり: この川は消す
        failed = true;
        break;
      }
      // ランダムに次のタイルを選ぶ
      const [ny, nx] = neighbors[Math.floor(rng() * neighbors.length)];
      y = ny; x = nx;
      riverPath.push([y, x]);
      visited[y][x] = true;
    }
    if (failed) {
      // 何もしない（川を描画しない）
    }
  }
  return result;
}

// シード付き乱数生成器
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// 配列シャッフル
function shuffle<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
