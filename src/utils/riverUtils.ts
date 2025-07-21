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
  riverHeight: number = 0.02 // 川の高さ（水域より少し高い値）
): number[][] {
  const h = heightMap.length;
  const w = heightMap[0]?.length || 0;
  const result = heightMap.map(row => [...row]);
  const rng = mulberry32(seed);


  // 川の開始点候補を集める（周囲に自分より低いタイルがある場所のみ）
  const sources: [number, number][] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (heightMap[y][x] < riverSourceHeight) continue;
      let hasLower = false;
      for (const [dy, dx] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const ny = y + dy, nx = x + dx;
        if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;
        if (heightMap[ny][nx] < heightMap[y][x]) {
          hasLower = true;
          break;
        }
      }
      if (hasLower) {
        sources.push([y, x]);
      }
    }
  }
  // シャッフルして riverCount 個選ぶ
  shuffle(sources, rng);
  console.log("sources.length",sources.length);
  const selected = sources.slice(0, riverCount);

  for (const [sy, sx] of selected) {
    const riverPath = findRiverPathBFS(heightMap, sy, sx, riverHeight, rng);
    if (riverPath) {
      for (const [py, px] of riverPath) {
        result[py][px] = riverHeight;
      }
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

function findRiverPathBFS(
  heightMap: number[][],
  startY: number,
  startX: number,
//   riverHeight: number,
  seaHeight: number = 0.18,
  rng: () => number,
  allowUp = 0.02 // 上昇許容幅
): [number, number][] | null {
  const h = heightMap.length;
  const w = heightMap[0]?.length || 0;
  const visited = Array.from({ length: h }, () => Array(w).fill(false));
  const queue: Array<{ y: number; x: number; path: [number, number][]; cost: number }> = [
    { y: startY, x: startX, path: [[startY, startX]], cost: 0 }
  ];
  visited[startY][startX] = true;
  while (queue.length) {
    queue.sort((a, b) => a.cost - b.cost);
    const { y, x, path, cost } = queue.shift()!;
    if (heightMap[y][x] < seaHeight) {
      return path;
    }
    // 探索順序をランダムにシャッフル
    const neighbors: [number, number][] = [[1,0],[-1,0],[0,1],[0,-1]];
    shuffle(neighbors, rng);
    for (const [dy, dx] of neighbors) {
      const ny = y + dy, nx = x + dx;
      if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;
      if (visited[ny][nx]) continue;
      const diff = heightMap[ny][nx] - heightMap[y][x];
      if (diff < 0 || diff <= allowUp) {
        visited[ny][nx] = true;
        // ランダムな微小揺らぎを加える
        const stepCost = (diff < 0 ? 0 : diff * 10) + rng() * 0.08;
        queue.push({
          y: ny,
          x: nx,
          path: [...path, [ny, nx]],
          cost: cost + stepCost
        });
      }
    }
  }
  return null;
}
