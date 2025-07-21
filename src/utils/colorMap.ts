// 地形タイプ・色マップ
export type Terrain = {
  name: string;
  rgb: [number, number, number];
  hex: string;
  type: 'Water' | 'Plains' | 'Highlands' | 'Mountains' | 'Shoreline';
  magnitude: number;
};

export const terrainColors: Terrain[] = [
  { name: 'Water', rgb: [0, 0, 106], hex: '#00006a', type: 'Water', magnitude: 0 },
  { name: 'Plains0', rgb: [190, 220, 140], hex: '#bedc8c', type: 'Plains', magnitude: 0 },
  { name: 'Plains1', rgb: [190, 218, 142], hex: '#beda8e', type: 'Plains', magnitude: 1 },
  { name: 'Plains2', rgb: [190, 216, 144], hex: '#bed890', type: 'Plains', magnitude: 2 },
  { name: 'Plains3', rgb: [190, 214, 146], hex: '#bed692', type: 'Plains', magnitude: 3 },
  { name: 'Plains4', rgb: [190, 212, 148], hex: '#bed494', type: 'Plains', magnitude: 4 },
  { name: 'Plains5', rgb: [190, 210, 150], hex: '#bed296', type: 'Plains', magnitude: 5 },
  { name: 'Plains6', rgb: [190, 208, 152], hex: '#bed098', type: 'Plains', magnitude: 6 },
  { name: 'Plains7', rgb: [190, 206, 154], hex: '#bece9a', type: 'Plains', magnitude: 7 },
  { name: 'Plains8', rgb: [190, 204, 156], hex: '#becc9c', type: 'Plains', magnitude: 8 },
  { name: 'Plains9', rgb: [190, 202, 158], hex: '#beca9e', type: 'Plains', magnitude: 9 },
  { name: 'Highlands10', rgb: [220, 203, 160], hex: '#dccba0', type: 'Highlands', magnitude: 10 },
  { name: 'Highlands11', rgb: [222, 205, 162], hex: '#decda2', type: 'Highlands', magnitude: 11 },
  { name: 'Highlands12', rgb: [224, 207, 164], hex: '#e0cfa4', type: 'Highlands', magnitude: 12 },
  { name: 'Highlands13', rgb: [226, 209, 166], hex: '#e2d1a6', type: 'Highlands', magnitude: 13 },
  { name: 'Highlands14', rgb: [228, 211, 168], hex: '#e4d3a8', type: 'Highlands', magnitude: 14 },
  { name: 'Highlands15', rgb: [230, 213, 170], hex: '#e6d5aa', type: 'Highlands', magnitude: 15 },
  { name: 'Highlands16', rgb: [232, 215, 172], hex: '#e8d7ac', type: 'Highlands', magnitude: 16 },
  { name: 'Highlands17', rgb: [234, 217, 174], hex: '#ead9ae', type: 'Highlands', magnitude: 17 },
  { name: 'Highlands18', rgb: [236, 219, 176], hex: '#ecdbb0', type: 'Highlands', magnitude: 18 },
  { name: 'Highlands19', rgb: [238, 221, 178], hex: '#eeddb2', type: 'Highlands', magnitude: 19 },
  { name: 'Mountains20', rgb: [240, 240, 180], hex: '#f0f0b4', type: 'Mountains', magnitude: 20 },
  { name: 'Mountains21', rgb: [240, 240, 182], hex: '#f0f0b6', type: 'Mountains', magnitude: 21 },
  { name: 'Mountains22', rgb: [241, 241, 184], hex: '#f1f1b8', type: 'Mountains', magnitude: 22 },
  { name: 'Mountains23', rgb: [242, 242, 186], hex: '#f2f2ba', type: 'Mountains', magnitude: 23 },
  { name: 'Mountains24', rgb: [242, 242, 188], hex: '#f2f2bc', type: 'Mountains', magnitude: 24 },
  { name: 'Mountains25', rgb: [242, 242, 190], hex: '#f2f2be', type: 'Mountains', magnitude: 25 },
  { name: 'Mountains26', rgb: [243, 243, 192], hex: '#f3f3c0', type: 'Mountains', magnitude: 26 },
  { name: 'Mountains27', rgb: [244, 244, 194], hex: '#f4f4c2', type: 'Mountains', magnitude: 27 },
  { name: 'Mountains28', rgb: [244, 244, 196], hex: '#f4f4c4', type: 'Mountains', magnitude: 28 },
  { name: 'Mountains29', rgb: [244, 244, 198], hex: '#f4f4c6', type: 'Mountains', magnitude: 29 },
  { name: 'Mountains30', rgb: [245, 245, 200], hex: '#f5f5c8', type: 'Mountains', magnitude: 30 },
  { name: 'Shoreline', rgb: [0, 0, 0], hex: '#000000', type: 'Shoreline', magnitude: 0 }, // プログラムで設定
];

// ノイズ値から地形色を決定
export function getTerrainColor(value: number): [number, number, number] {
  if (value < 0.18) return [0, 0, 106]; // Water
  if (value < 0.32) return [190, 220, 140]; // Plains0
  if (value < 0.34) return [190, 218, 142];
  if (value < 0.36) return [190, 216, 144];
  if (value < 0.38) return [190, 214, 146];
  if (value < 0.40) return [190, 212, 148];
  if (value < 0.42) return [190, 210, 150];
  if (value < 0.44) return [190, 208, 152];
  if (value < 0.46) return [190, 206, 154];
  if (value < 0.48) return [190, 204, 156];
  if (value < 0.50) return [190, 202, 158];
  if (value < 0.56) return [220, 203, 160];
  if (value < 0.58) return [222, 205, 162];
  if (value < 0.60) return [224, 207, 164];
  if (value < 0.62) return [226, 209, 166];
  if (value < 0.64) return [228, 211, 168];
  if (value < 0.66) return [230, 213, 170];
  if (value < 0.68) return [232, 215, 172];
  if (value < 0.70) return [234, 217, 174];
  if (value < 0.72) return [236, 219, 176];
  if (value < 0.74) return [238, 221, 178];
  if (value < 0.80) return [240, 240, 180];
  if (value < 0.82) return [240, 240, 182];
  if (value < 0.84) return [241, 241, 184];
  if (value < 0.86) return [242, 242, 186];
  if (value < 0.88) return [242, 242, 188];
  if (value < 0.90) return [242, 242, 190];
  if (value < 0.92) return [243, 243, 192];
  if (value < 0.94) return [244, 244, 194];
  if (value < 0.96) return [244, 244, 196];
  if (value < 0.98) return [244, 244, 198];
  return [245, 245, 200]; // Mountains30
}
