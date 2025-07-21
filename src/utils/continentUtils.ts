// 大陸モード: 陸地の連結成分をラベリングし、大きい順にN個だけ残し他は水にする
// landThreshold: 陸地とみなす高さ
// keepCount: 残す大陸の個数
// waterHeight: 水にする場合の高さ
export function keepLargestContinents(
  heightMap: number[][],
  landThreshold: number,
  keepCount: number,
  waterHeight: number
): number[][] {
  const h = heightMap.length;
  const w = heightMap[0]?.length || 0;
  const visited = Array.from({ length: h }, () => Array(w).fill(false));
  const result = heightMap.map(row => [...row]);
  const continents: { size: number; tiles: [number, number][] }[] = [];
  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];
  function bfs(sy: number, sx: number): [number, [number, number][]] {
    const q: [number, number][] = [[sy, sx]];
    const group: [number, number][] = [[sy, sx]];
    visited[sy][sx] = true;
    let count = 1;
    while (q.length) {
      const [y, x] = q.shift()!;
      for (const [dy, dx] of dirs) {
        const ny = y + dy, nx = x + dx;
        if (
          ny >= 0 && ny < h && nx >= 0 && nx < w &&
          !visited[ny][nx] && heightMap[ny][nx] >= landThreshold
        ) {
          visited[ny][nx] = true;
          q.push([ny, nx]);
          group.push([ny, nx]);
          count++;
        }
      }
    }
    return [count, group];
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!visited[y][x] && heightMap[y][x] >= landThreshold) {
        const [count, group] = bfs(y, x);
        continents.push({ size: count, tiles: group });
      }
    }
  }
  // 大きい順にソート
  continents.sort((a, b) => b.size - a.size);
  // 残す大陸
  const keep = new Set<number>();
  for (let i = 0; i < Math.min(keepCount, continents.length); i++) {
    for (const [y, x] of continents[i].tiles) {
      keep.add(y * 10000 + x);
    }
  }
  // 残さない大陸を水に
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (heightMap[y][x] >= landThreshold && !keep.has(y * 10000 + x)) {
        result[y][x] = waterHeight;
      }
    }
  }
  return result;
}
