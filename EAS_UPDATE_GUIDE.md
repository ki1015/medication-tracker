# EAS Update でメンバーと共有する手順

EAS Update を使うと、**あなたの PC でサーバーを起動していなくても**、メンバーがアプリの最新版を試せるようになります。

---

## 前提

- **Expo アカウント**（無料）：[expo.dev/signup](https://expo.dev/signup) で作成
- メンバーが更新を受け取るには、**開発ビルド（development build）** を一度インストールする必要があります（下記「4. メンバーがアプリをインストールする」参照）。  
  **Expo Go だけ**では、EAS Update の更新を直接受け取れません。

---

## 1. EAS CLI と expo-updates の準備

### 1-1. EAS CLI を入れる（1回だけ）

```bash
npm install -g eas-cli
```

### 1-2. Expo にログイン

```bash
eas login
```

表示に従って、Expo のメールアドレスとパスワードを入力します。  
ログイン確認：`eas whoami`

### 1-3. プロジェクトに expo-updates を入れる

プロジェクトのフォルダで：

```bash
cd c:\Users\isake\dev\20260224drug
npx expo install expo-updates
```

---

## 2. EAS Update の設定（1回だけ）

```bash
eas update:configure
```

このコマンドで次のような設定が入ります：

- `app.json` に `runtimeVersion` と `updates.url`、`extra.eas.projectId` が追加される
- まだ EAS にプロジェクトがない場合は、Expo のサイトでプロジェクトが自動作成される

質問が出たら、案内に従って進めてください。

---

## 3. 更新を公開する（コードを変えるたびに実行）

コードやデザインを変更したあと、メンバーに配布する更新を公開するには：

```bash
eas update --channel preview --message "共有用"
```

- `--channel preview`：プレビュー用チャンネル（本番と分けたいときはこの名前で OK）
- `--message "..."`：更新の説明（何を変えたかなど）

**現在の Git ブランチ名で自動的に公開したい場合：**

```bash
eas update --auto
```

成功すると、ターミナルに **EAS のダッシュボード用 URL** が表示されます。

例：

```
✔ Published!
...
EAS Dashboard  https://expo.dev/accounts/あなたのアカウント/projects/medication-tracker/updates/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

この **URL をメンバーに共有** します。

---

## 4. メンバーがアプリを試す方法

### 方法A：開発ビルドで受け取る（推奨）

EAS Update の更新を受け取るには、**Expo Go ではなく「開発ビルド」** が必要です。

1. **あなたが開発ビルドを作成する（1回だけ）**

   ```bash
   eas build --profile development --platform ios
   ```

   - iOS の場合は Apple Developer アカウントが必要です（無料アカウントでも可。EAS の案内に従う）。
   - 完了すると、EAS のダッシュボードにビルドのダウンロード用リンクや QR コードが表示されます。

2. **メンバーが開発ビルドをインストールする**

   - あなたが EAS ダッシュボードのリンクや QR コードをメンバーに送る
   - メンバーは iPhone でそのリンクを開くか QR を読み取り、開発ビルド（あなたのアプリ）をインストール

3. **あなたが更新を公開する**

   ```bash
   eas update --channel preview --message "共有用"
   ```

4. **メンバーが更新を受け取る**

   - インストールした開発ビルドのアプリを開く
   - アプリが自動的に EAS から更新を取得し、次回起動時（またはアプリ内の再読み込み）で最新版が表示されます

### 方法B：プレビュー用 QR コードで試す

1. あなたが `eas update --channel preview --message "共有用"` を実行
2. 表示された **EAS ダッシュボードの URL** をメンバーに送る
3. メンバーがブラウザでその URL を開く
4. ページ内の **「Preview」ボタン** を押す
5. 表示された **QR コード** を、**開発ビルドを入れた端末**で読み取る  
   → その更新がそのまま開きます

※ この QR は「開発ビルド」用です。Expo Go だけの端末では開けない場合があります。

---

## 5. よく使うコマンドのまとめ

| やりたいこと           | コマンド |
|------------------------|----------|
| 更新を公開する         | `eas update --channel preview --message "説明"` |
| 今の Git ブランチで公開 | `eas update --auto` |
| ログイン確認           | `eas whoami` |
| プロジェクト設定確認   | `eas project:info` |

---

## 6. 注意点

- **Expo Go だけ**では、EAS Update で配布した更新は受け取れません。メンバーに試してもらうには、**開発ビルドを 1 回インストールしてもらう**必要があります。
- 開発ビルドの作成には **EAS Build** を使います。iOS の場合は Apple Developer アカウント（無料可）が必要です。
- 無料プランでも、EAS Update と EAS Build の一定枠が使えます。詳細は [Expo の料金ページ](https://expo.dev/pricing) を確認してください。

---

## 7. 参考リンク

- [EAS Update の概要](https://docs.expo.dev/eas-update/introduction/)
- [EAS Update の始め方](https://docs.expo.dev/eas-update/getting-started/)
- [チームでプレビューを共有する](https://docs.expo.dev/review/share-previews-with-your-team/)
