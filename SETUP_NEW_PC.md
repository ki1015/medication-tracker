# 別のPCでクローンしたときのセットアップ

このリポジトリは **Git にはソースコードだけ** が入っています。  
別のPC（新しいPC）で `git clone` したあとには、**そのPCで必要なものを入れ直す**必要があります。

---

## リポジトリに含まれていないもの（毎回そのPCで用意する）

| 内容 | 説明 |
|------|------|
| **node_modules** | npm のライブラリ一式。`.gitignore` で除外されているため、clone しても入ってきません。 |
| **.expo/** | Expo のキャッシュ。同様に除外されています。 |
| **.env / .env.local** | 環境変数（使っている場合）。セキュリティのためリポジトリに入れないことが多いです。 |
| **Node.js / npm** | 実行環境。PCごとにインストールが必要です。 |

---

## 新しいPCで最初にやること

### 1. このPCにインストールするもの（まだ入っていない場合）

| ソフト | 用途 | 入手先 |
|--------|------|--------|
| **Node.js** | JavaScript の実行環境（npm も一緒に入ります） | https://nodejs.org/ （LTS 推奨・v18 以上） |
| **Git** | リポジトリの clone / push / pull | https://git-scm.com/ または「Git for Windows」 |

- インストール後、**ターミナル（PowerShell やコマンドプロンプト）をいったん閉じて開き直す**と、`node` や `npm` が使えるようになります。
- 確認: `node -v` と `npm -v` がバージョン表示されれば OK です。

### 2. リポジトリをクローンしたあと（すでに clone 済みの場合はここから）

**必ずプロジェクトのフォルダ内**（`medication-tracker` の中）で、次を実行します。

```powershell
cd C:\Users\k-isayama\dev\20260310デザイン思考薬\medication-tracker
npm install
```

- これで **node_modules** がそのPCに作成され、`expo` や `react-native` などが入ります。
- 初回は 1〜2 分かかることがあります。

### 3. 動作確認

```powershell
# 開発サーバー起動（ブラウザや Expo Go で確認用）
npm start

# または Web 用にビルドして docs に出力（GitHub Pages 更新用）
npm run export:web
```

- `expo` が見つからない・Metro のエラーが出る場合は、**もう一度 `npm install`** を実行してからやり直してください。

---

## よくある状況と対処

| 状況 | 対処 |
|------|------|
| `expo は認識されていません` | プロジェクトフォルダで `npm install` を実行。その後は `npx expo ...` または `npm run export:web` を使う。 |
| `No platforms are configured to use the Metro bundler` | 同じPCでまだ `npm install` していない、または失敗している可能性が高い。`npm install` をやり直す。 |
| `Cannot find module 'expo'` | 上と同じ。`npm install` で node_modules を用意する。 |
| 別のPCでコードを変更した | そのPCでも `git pull` のあと、必要なら `npm install`（package.json が変わっていれば）。その後 `npm start` や `npm run export:web` で確認。 |

---

## まとめ（別PCで clone したときの手順）

1. **Node.js**（と Git）をそのPCにインストールする。
2. リポジトリを **clone**（まだなら）する。
3. **`cd medication-tracker`** でプロジェクトフォルダに入る。
4. **`npm install`** で依存関係を入れる。
5. **`npm start`** または **`npm run export:web`** で動かす。

「リポジトリにはソースだけが入っている」ことを前提に、**使うPCごとに `npm install` が必須**と覚えておくと安心です。
