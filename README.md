# OpenfrontMapGenerator

このプロジェクトは、パーリンノイズを用いて地形マップ（PNG画像）を生成するWebアプリです。

## 主な機能
- パーリンノイズによる地形生成
- 地形タイプごとに色分け（添付表に準拠）
- 左側にマッププレビュー、右側に設定バー（縦横比・サイズ調整スライダー）
- 生成画像のダウンロード

## 開発・起動方法

```
npm install
npm run dev
```

## 技術スタック
- Vite
- React
- TypeScript

---

地形色分けやUI仕様は今後も拡張予定です。

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
