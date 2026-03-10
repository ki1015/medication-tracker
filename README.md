# 服薬記録アプリ（Expo）

毎日薬を飲んだかどうかを記録し、連続服用日数（ストリーク）を表示するプロトタイプです。  
**Expo + React Native** で作成。iPhone では **Expo Go** アプリで動作確認できます。

## 必要な環境

- **Node.js**（推奨: v18 以上）
- **npm** または **yarn**
- **iPhone**: 実機で試す場合は **Expo Go** アプリ（App Store で無料）

> **別のPCで clone した場合**  
> リポジトリには `node_modules` が含まれていないため、そのPCで **必ず `npm install`** を実行してください。  
> 手順の詳細は **[SETUP_NEW_PC.md](./SETUP_NEW_PC.md)** を参照してください。

## セットアップと起動

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npx expo start
```

起動後、ターミナルに **QR コード** が表示されます。

## iPhone で試す（Expo Go）

1. App Store から **Expo Go** をインストール
2. iPhone のカメラで、ターミナルに表示された **QR コード** を読み取る
3. 「Expo Go で開く」をタップすると、アプリが起動します

（同じ Wi‑Fi に PC と iPhone が接続されている必要があります。繋がらない場合は「Tunnel」モードで起動: `npx expo start --tunnel`）

## 主な機能

- **カレンダー**: 月単位で表示。日付をタップすると「飲んだ」に記録（再度タップで「飲んでいない」に戻る）
- **連続服用日数**: 上段にストリークとメーターを表示（初期値は 115 日）
- **今月の服用日数**: 下段に表示
- **アラート1**: 「飲み忘れてますよ」のサンプル通知
- **アラート2**: 「薬が明日なくなります。補充してください。」のサンプル通知

## 友達と共有する（無料）

1. あなたが `npx expo start` で起動
2. **Tunnel** モードなら `npx expo start --tunnel` で URL が発行される
3. 友達に **Expo Go** をインストールしてもらい、あなたが共有した **URL** または **QR コード** で開いてもらう

（同じ Wi‑Fi でなくても、Tunnel なら URL 共有で試せます）

## GitHub Pages 用に Web をビルドする場合

```bash
npm install   # 別PCで初回のみ
npm run export:web
```

`docs` フォルダに静的ファイルが出力されます。この内容をコミットして push すると GitHub Pages が更新されます。

## 技術スタック

- Expo SDK 54
- React Native
- AsyncStorage（記録の永続化）
