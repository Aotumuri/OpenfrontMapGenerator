// 陸地ラベリングし、孤立陸地を水に変換する
// landThreshold: 陸地とみなす高さの閾値
// minSize: 許容する陸地の最小連結数
// waterHeight: 水にする場合の高さ
export function removeIsolatedLand(
  heightMap: number[][],
  landThreshold: number,
  minSize: number,
  waterHeight: number
): number[][] {
  const h = heightMap.length;
  const w = heightMap[0]?.length || 0;
  const visited = Array.from({ length: h }, () => Array(w).fill(false));
  const result = heightMap.map(row => [...row]);

  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    // [1, 1], [1, -1], [-1, 1], [-1, -1], // 斜めも連結とみなす
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
        if (count <= minSize) {
          for (const [gy, gx] of group) {
            result[gy][gx] = waterHeight;
          }
        }
      }
    }
  }
  return result;
}
// 高さマップから水域ラベリングし、孤立水域を陸地化する
// waterThreshold: 水とみなす高さの閾値
// minSize: 許容する水域の最小連結数
// landHeight: 陸地にする場合の高さ
export function removeIsolatedWater(
  heightMap: number[][],
  waterThreshold: number,
  minSize: number,
  landHeight: number
): number[][] {
  const h = heightMap.length;
  const w = heightMap[0]?.length || 0;
  const visited = Array.from({ length: h }, () => Array(w).fill(false));
  const result = heightMap.map(row => [...row]);

  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    // [1, 1], [1, -1], [-1, 1], [-1, -1], // 斜めも連結とみなす
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
          !visited[ny][nx] && heightMap[ny][nx] < waterThreshold
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
      if (!visited[y][x] && heightMap[y][x] < waterThreshold) {
        const [count, group] = bfs(y, x);
        if (count <= minSize) {
          for (const [gy, gx] of group) {
            result[gy][gx] = landHeight;
          }
        }
      }
    }
  }
  return result;
}
