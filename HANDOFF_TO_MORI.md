# 森さんへ：服薬記録アプリ 引き継ぎガイド

このドキュメントは、これまで一緒に開発してきた **服薬記録アプリ** を森さんが引き継いで、**ご自身でも開発を続けていけるようにする** ための手順書です。

- 想定読者：**コーディング初心者**で、**Claude などのチャット型 AI でアプリを作った経験がある人**
- OS：**Windows / Mac どちらでも OK**
- ターミナル（黒い画面）はほぼ使いません。**GUI ツール中心**で進めます

---

## このアプリの概要（30秒で）

- **服薬記録アプリ**：毎日薬を飲んだか記録 → 連続日数（ストリーク）を表示
- **Expo + React Native** 製（iOS / Android / Web 全部で動く）
- 公開先：**GitHub Pages**（`https://ki1015.github.io/medication-tracker/` でブラウザから誰でも使える）
- データは **AsyncStorage**（端末内に保存）。サーバーやデータベースはなし

---

## 引き継ぎの全体像

森さんに揃えてもらうもの：

| # | ツール | 用途 | 無料？ |
|---|--------|------|--------|
| 1 | **GitHub アカウント** | コードの共有（クラウド上の保管庫） | ◯ |
| 2 | **GitHub Desktop** | git 操作を GUI で（コマンド不要） | ◯ |
| 3 | **Node.js (LTS)** | アプリを動かすための実行環境 | ◯ |
| 4 | **Cursor**（推奨） or **VS Code** | コードを編集するエディタ | ◯ |

> **なぜ Cursor を推奨？**
> Cursor は **チャットで AI に「ここ直して」「機能足して」と頼める VS Code** です。森さんが Claude チャットで作ってきた感覚のまま、このアプリも触れます。慣れている方を選んでも OK。

---

## ステップ1：GitHub アカウントを作って招待を受ける

### 森さん側
1. [github.com](https://github.com) にアクセス → **Sign up**
2. メールアドレス・パスワード・ユーザー名を登録（無料プランで OK）
3. **ユーザー名を私（諫山）に教えてください**

### 私（諫山）側
4. GitHub の `ki1015/medication-tracker` リポジトリを開く
5. **Settings** → **Collaborators** → **Add people** → 森さんのユーザー名を入力して招待
6. 森さんのメールに招待メールが届くので、リンクから **Accept invitation**

これで森さんも `ki1015/medication-tracker` を編集・push できるようになります。

---

## ステップ2：必要なソフトをインストール

すべて無料です。インストール順は何でも OK。

### ① GitHub Desktop
- ダウンロード：https://desktop.github.com/
- インストール後、**File → Options → Accounts** で GitHub アカウントにログイン

### ② Node.js（LTS 版）
- ダウンロード：https://nodejs.org/
- ページの **「LTS」と書かれた左側** のボタンをクリック（v20 や v22 など、年によって変わります）
- インストーラの指示通り進める（チェック項目はデフォルトのままで OK）
- **インストール後、PC を一度再起動するのが安全**

**確認方法**（任意）：
- Windows：「PowerShell」を開いて `node -v` と入力 → `v20.x.x` のように表示されれば OK
- Mac：「ターミナル」を開いて `node -v` と入力 → 同様

### ③ エディタ（Cursor 推奨）
- **Cursor**（推奨）：https://cursor.com/
- **VS Code**（代替）：https://code.visualstudio.com/

Cursor を選ぶと、エディタ内でチャットしながら AI にコードを書かせられます（Claude チャットに近い体験）。

---

## ステップ3：リポジトリを森さんの PC に持ってくる

### GitHub Desktop で clone する
1. **GitHub Desktop** を開く
2. **File → Clone repository** を選ぶ
3. **GitHub.com** タブから `ki1015/medication-tracker` を選択
4. **Local path** で保存場所を選ぶ（例：`ドキュメント` の中）
5. **Clone** ボタンを押す

これで森さんの PC にコード一式がコピーされます。

### node_modules を入れる（初回必須）
リポジトリには **アプリを動かすための部品（node_modules）が入っていません**。森さんの PC で 1 回だけ用意します。

**Cursor / VS Code から：**
1. Cursor（または VS Code）を起動
2. **File → Open Folder** で先ほど clone したフォルダ（`medication-tracker`）を開く
3. メニューの **Terminal → New Terminal** で下にターミナルが開く
4. 以下を入力して Enter：
   ```
   npm install
   ```
5. 1〜2 分待つ（緑の文字がたくさん出ます）

これで準備完了です。

---

## ステップ4：アプリを動かしてみる

エディタ内のターミナル（さっきと同じ場所）で：

```
npx expo start
```

実行すると **QR コードが表示されます**。

### ブラウザで見る
- ターミナルに表示される `Web` のキー（`w` キー）を押す → ブラウザでアプリが開きます

### iPhone で見る
1. App Store で **Expo Go** をインストール
2. iPhone のカメラで QR コードを読み取る
3. 「Expo Go で開く」をタップ

> **同じ Wi-Fi 必須**。繋がらない場合は `npx expo start --tunnel` を使う

止めたいときは、ターミナルで **Ctrl + C**（Mac でも Control + C）。

---

## ステップ5：開発のサイクル（毎回これを繰り返す）

これが一番大事です。慣れれば 5 分で身につきます。

### 作業を始めるとき
1. **GitHub Desktop を開く**
2. 上部の **「Fetch origin」** ボタン → **「Pull origin」** に変わったら押す
   - これで「私が作業した最新版」を取り込めます
3. Cursor でフォルダを開いて編集を開始

### 作業中（AI とチャットしながら）
- Cursor のチャット欄で「カレンダーの色を青にして」などと頼む
- AI が変更したら、ターミナルで `npx expo start` していればブラウザは自動でリロードされます

### 作業を保存して共有するとき
1. **GitHub Desktop を開く**
2. 左側に **変更したファイル一覧** が表示されている
3. 左下の **Summary** 欄に「何をしたか」を日本語で書く（例：「カレンダーの色を青に変更」）
4. **Commit to main** ボタンを押す（または別のブランチ名）
5. 上部の **「Push origin」** を押す

これで GitHub にアップロードされ、私もその変更を `Pull` で取り込めます。

---

## ステップ6：Web 版（GitHub Pages）を更新するとき

このアプリは `https://ki1015.github.io/medication-tracker/` でも公開されています。コードを変えたら、Web 版も更新が必要です。

エディタのターミナルで：
```
npm run build:pages
```

すると `docs/` フォルダの中身が更新されるので、**GitHub Desktop で commit & push** すれば、数分後に公開ページも自動で新しくなります。

> Web 版の更新が要らないとき（iPhone / Android しか触らない場合）は、このステップは省略 OK です。

---

## トラブルシューティング

| 症状 | 対処 |
|------|------|
| `npm install` でエラー | ターミナルで `npm cache clean --force` → もう一度 `npm install` |
| `expo は認識されていません` | `npm install` をやり直す。それでもダメなら `npx expo start` と頭に `npx` を付ける |
| QR で iPhone から開けない | 同じ Wi-Fi にいるか確認。ダメなら `npx expo start --tunnel` |
| AI に頼んだらアプリが壊れた | **GitHub Desktop の「History」タブ** で過去のコミットを右クリック → **Revert this commit** で戻せます |
| よく分からないエラー | エラー文章をそのまま Cursor のチャットに貼って「これ直して」と聞く |

---

## 「壊しちゃったらどうしよう」が一番怖いとき

**安心ポイント**：
- **GitHub にコードがある = いつでも前の状態に戻せる**
- ローカル（森さんの PC）で何をしても、`Push` しなければ GitHub には反映されない
- 不安なら **「ブランチ」** を作って実験するのが安全（GitHub Desktop で Branch → New Branch）

慣れるまでは、**大きな変更の前に必ず一度 `Push` しておく** のがおすすめです。

---

## 参考ドキュメント

このリポジトリには他にも以下のドキュメントがあります：

| ファイル | 内容 |
|---------|------|
| `README.md` | アプリの基本情報・主な機能 |
| `PLANNING.md` | 開発の経緯・設計メモ |
| `SETUP_NEW_PC.md` | 別 PC でセットアップするときの詳細（コマンド中心） |
| `SHARING_WITH_TEAM.md` | チーム共有の詳しい解説 |
| `EAS_UPDATE_GUIDE.md` | EAS Update（PC 起動なしで Expo Go 共有）の手順 |
| `WINDOWS_AND_FREE_SHARING.md` | Windows での開発・無料共有の選択肢 |

**まずはこの `HANDOFF_TO_MORI.md` だけで動き出せるように作っています。** 他のドキュメントは「もっと詳しく知りたくなったら」見てください。

---

## 困ったら

詰まった瞬間に **そのままスクショと一緒に諫山に連絡** してください。たいていの問題は 5 分で解決します。

楽しい開発を！
