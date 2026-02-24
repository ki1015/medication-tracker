# 開発メンバーとの共有方法

服薬記録アプリを一緒に開発しているメンバーと共有する方法をまとめます。

---

## 1. コードを共有する（一緒に編集する）

**Git + GitHub** を使うと、同じプロジェクトをメンバー全員で編集できます。

### あなた（最初にコードを持っている人）がやること

1. **GitHub アカウント**を用意（まだなら [github.com](https://github.com) で無料作成）
2. リポジトリを新規作成（Create repository）。名前は例：`medication-tracker`
3. プロジェクトフォルダで Git を初期化し、GitHub にプッシュ：

```bash
cd c:\Users\isake\dev\20260224drug
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/medication-tracker.git
git push -u origin main
```

4. メンバーを **Collaborator** として招待（GitHub のリポジトリ → Settings → Collaborators）

### メンバーがやること

1. **Git** と **Node.js** をインストール
2. リポジトリをクローンして起動：

```bash
git clone https://github.com/あなたのユーザー名/medication-tracker.git
cd medication-tracker
npm install
npx expo start
```

3. 編集したら `git add .` → `git commit -m "メッセージ"` → `git push` で反映
4. あなたは `git pull` でメンバーの変更を取り込む

→ これで **コードの共有・共同開発** ができます。

---

## 2. アプリを「触って試す」形で共有する

メンバーが **iPhone で実際に操作感を試したい** 場合の方法です。

### 方法A：あなたの PC でサーバーを起動したまま共有（無料）

1. あなたが **同じネットワーク（同じ Wi‑Fi）** で `npx expo start` を実行
2. ターミナルに表示される **QR コード** を撮影してメンバーに送る（LINE・Slack など）
3. メンバーは **Expo Go**（App Store で無料）を入れ、その QR を読み取って「Expo Go で開く」
4. → あなたの PC と **同じ Wi‑Fi** にいるときだけ、メンバーの iPhone でアプリが開きます

**別のネットワークでも試してほしい場合**（自宅とオフィスが違うなど）：

```bash
npx expo start --tunnel
```

→ **Tunnel** モードだと、URL や QR を送るだけで、メンバーが別の Wi‑Fi からでも開けます。  
※ この間も **あなたの PC では `npx expo start --tunnel` を起動したまま** にしておく必要があります。

### 方法B：あなたの PC を止めていても試せるようにする（EAS Update）

**あなたの PC でサーバーを止めていても**、メンバーが Expo Go で同じアプリを開けるようにするには **EAS Update** を使います。

1. [expo.dev](https://expo.dev) で **Expo アカウント**（無料）を作成
2. プロジェクトで EAS CLI を入れ、ログイン：

```bash
npm install -g eas-cli
eas login
```

3. プロジェクトを EAS 用に設定（初回のみ）：

```bash
cd c:\Users\isake\dev\20260224drug
eas update:configure
```

4. アプリの更新を Expo のサーバーにアップロード：

```bash
eas update --branch main --message "共有用"
```

5. 表示された **URL** をメンバーに送る  
6. メンバーは **Expo Go** でその URL を開く → あなたの PC がオフでもアプリを試せます

→ 無料枠で利用できます。コードを更新したら、また `eas update` を実行するとメンバーが最新版を取得できます。

---

## まとめ

| 目的 | やること |
|------|----------|
| **コードを一緒に編集したい** | Git + GitHub でリポジトリを作り、メンバーを Collaborator に追加。みんなで `git clone` → 編集 → `git push` / `git pull` |
| **アプリを触って試してほしい（同じ Wi‑Fi）** | あなたが `npx expo start` で起動 → QR コードを送る → メンバーは Expo Go で QR を読み取り |
| **アプリを触って試してほしい（別ネットワーク・PC オフでも可）** | EAS Update で `eas update` を実行 → 出た URL をメンバーに送る → メンバーは Expo Go でその URL を開く |

まずは **GitHub でコード共有** と **Expo Go + QR/URL で試してもらう** の組み合わせで進めるのがおすすめです。
