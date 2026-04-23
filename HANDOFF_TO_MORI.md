# 森さんへ：服薬記録アプリ 引き継ぎガイド

このドキュメントは、これまで一緒に開発してきた **服薬記録アプリ** を森さんに渡して、**森さんが自分のものとして自由に改造・利用できる** ようにするための手順書です。

- 想定読者：**コーディング初心者**で、**Claude などのチャット型 AI でアプリを作った経験がある人**
- OS：**Windows / Mac どちらでも OK**
- ターミナル（黒い画面）はほぼ使いません。**GUI ツール中心**で進めます
- **共同開発ではなく、森さんが「自分のコピー」を持ってひとりで自由に触る**スタイルです（GitHub の用語で **Fork** といいます）

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

## ステップ1：GitHub アカウントを作って、このアプリを Fork する

**Fork（フォーク）**＝「元のリポジトリを丸ごと自分のアカウントにコピーする」という GitHub の機能です。Fork 後は **完全に森さん専用のコピー** になるので、何をしても元には影響しません。

1. [github.com](https://github.com) にアクセス → **Sign up**（右上）
2. メールアドレス・パスワード・ユーザー名を登録（無料プランで OK）
3. ログインできたら、ブラウザで https://github.com/ki1015/medication-tracker にアクセス
4. 画面右上の **「Fork」** ボタンをクリック
5. 「Create fork」を押す（設定はデフォルトのままで OK）
6. URL が `https://github.com/森さんのユーザー名/medication-tracker` に変わったら成功 🎉

これで森さん自身のアカウントに **自分専用のコピー** ができました。以降はこれを自由に改造できます。元（私のリポジトリ）には一切影響しません。

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
3. **GitHub.com** タブから **自分の Fork**（`森さんのユーザー名/medication-tracker`）を選択
   - ⚠️ `ki1015/medication-tracker` ではなく、**自分の方**を選んでください
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

森さんは **自分の Fork を自分のペースで触るだけ** なので、とてもシンプルです。

### 作業中（AI とチャットしながら）
- Cursor のチャット欄で「カレンダーの色を青にして」などと頼む
- AI が変更したら、ターミナルで `npx expo start` していればブラウザは自動でリロードされます

### 作業を保存する（Commit & Push）
キリが良いところで、変更を GitHub に保存しておきます。バックアップにもなるし、万一壊しても前の状態に戻せます。

1. **GitHub Desktop を開く**
2. 左側に **変更したファイル一覧** が表示されている
3. 左下の **Summary** 欄に「何をしたか」を日本語で書く（例：「カレンダーの色を青に変更」）
4. **Commit to main** ボタンを押す
5. 上部の **「Push origin」** を押す

これで森さんの GitHub 上に最新版が保存されます。**元（私のリポジトリ）には一切影響しません**。

---

## ステップ6：Web 版（GitHub Pages）を自分のアドレスで公開する（任意）

森さんが「自分だけの Web 版」をブラウザで開けるようにしたい場合の手順です。Fork すると森さん専用の公開アドレス（`https://森さんのユーザー名.github.io/medication-tracker/`）が使えます。

### 初回セットアップ（1 回だけ）
1. ブラウザで森さんの Fork（`https://github.com/森さんのユーザー名/medication-tracker`）を開く
2. **Settings** タブ → 左メニューの **Pages**
3. **Source** を **Deploy from a branch** に
4. **Branch** を **main**、フォルダを **/docs** にして **Save**

### コードを変えたときの更新
エディタのターミナルで：
```
npm run build:pages
```

すると `docs/` フォルダの中身が更新されるので、**GitHub Desktop で commit & push** すれば、数分後に `https://森さんのユーザー名.github.io/medication-tracker/` が自動で新しくなります。

> Web 版が不要（iPhone / Android しか触らない）なら、このステップは丸ごと省略 OK です。

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
- **自分の Fork なので、何をしても元のリポジトリには影響しない**
- GitHub にコードがある = いつでも前の状態に戻せる
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
