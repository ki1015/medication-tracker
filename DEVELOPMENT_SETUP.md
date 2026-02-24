# iPhoneアプリ開発環境と友達との共有方法

> **Windows で開発したい・無料で友達の iPhone で触れる形にしたい** 場合は、  
> **`WINDOWS_AND_FREE_SHARING.md`** を参照してください。PWA や Expo を使った方法をまとめています。

---

## 1. 必要な開発環境・ソフト（Mac でネイティブアプリを作る場合）

### 必須

| 項目 | 内容 |
|------|------|
| **OS** | **macOS**（Mac が必要です） |
| **統合開発環境（IDE）** | **Xcode**（Apple 公式・無料） |
| **プログラミング言語** | **Swift** |
| **Apple ID** | 無料で作成可能。Xcode のダウンロード・実機テストに必要 |

**重要**: iPhone アプリのビルドは **Mac でしかできません**。Windows だけでは Xcode が動かないため、以下のいずれかが必要です。

- **Mac を用意する**（実機・Mac 本体推奨）
- **Mac をレンタル/クラウドで利用する**（MacStadium、MacinCloud など有料）
- **ハックintosh**（非公式・サポート外のためおすすめしません）

---

### Xcode の入手とセットアップ

1. **Mac** で **App Store** を開く  
2. 「**Xcode**」で検索 → **取得／インストール**（無料・数GB 程度）  
3. 初回起動時に「Command Line Tools」のインストールを求められたら **インストール**  
4. **Xcode → Settings → Accounts** で **Apple ID** を追加（まだの場合）

これでシミュレータで iPhone アプリを動かせます。

---

### 実機で動かす場合（自分の iPhone で試す）

- **Apple ID** だけで、自分の iPhone に **開発用アプリをインストール**できます（有料の Apple Developer Program は不要）。
- iPhone を USB で Mac に接続し、Xcode で「実機」を選択して実行します。
- 初回は iPhone の「設定 → 一般 → VPNとデバイス管理」で開発者を「信頼」する必要があります。

---

## 2. 友達と一緒に開発・共有する方法

### 方法A: コードの共有（共同開発）

| 手段 | 説明 |
|------|------|
| **Git + GitHub / GitLab** | ソースコードを共有し、同じプロジェクトで編集。**最も一般的**。 |
| **Git + Bitbucket** | GitHub と同様。プライベートリポジトリが無料で使いやすい場合あり。 |

**流れの例**:
1. あなたが Mac で Xcode プロジェクトを作成  
2. **Git** でリポジトリを初期化し、**GitHub** などにプッシュ  
3. 友達も **Mac + Xcode** を用意し、リポジトリを **clone**  
4. 二人で同じリポジトリでブランチを切ったり、コミット・プッシュし合う  

**注意**: 友達も **Mac と Xcode** がないと、iPhone アプリの「開発・ビルド」はできません。コードのレビューや編集だけなら、GitHub 上で見ることは可能です。

---

### 方法B: プロトタイプ（アプリ本体）を共有して触ってもらう

友達が「コードを触らず、アプリを触りたい」場合は次のような方法があります。

| 手段 | 説明 |
|------|------|
| **TestFlight** | Apple の公式「ベータ配布」サービス。**Apple Developer Program（有料・年額）** が必要。 |
| **実機を貸す / 隣で見せる** | あなたの iPhone にインストールしたアプリを、その場で触ってもらう。 |
| **シミュレータの動画・画面共有** | 画面収録や Zoom などで、シミュレータの様子を共有。 |

**TestFlight を使う場合**:
- **Apple Developer Program**（約 12,800 円/年）に登録が必要  
- Xcode でアーカイブ → App Store Connect にアップロード → TestFlight で友達をテスターとして招待  
- 友達は **TestFlight アプリ** からあなたのアプリをインストールし、自分の iPhone で試せる  

プロトタイプを「何人かに配って触ってもらう」なら、TestFlight が一番本格的です。

---

## 3. まとめ：何を用意するか

| 目的 | あなた | 友達 |
|------|--------|------|
| **開発する** | Mac + Xcode + Apple ID | Mac + Xcode + Apple ID（一緒にコードを書く場合） |
| **コードを共有する** | Git + GitHub（など）でリポジトリ作成 | 同じリポジトリを clone |
| **アプリを配布して触ってもらう** | Apple Developer Program + TestFlight | TestFlight アプリでインストール（Developer は不要） |

- **無料で進める**: Mac + Xcode + Git + GitHub でコード共有。アプリは「あなたの実機」か「画面共有・動画」で見せる。  
- **友達の iPhone にインストールして渡したい**: Apple Developer Program に加入し、TestFlight で配布する形がおすすめです。

---

## 4. 参考リンク

- [Xcode - Apple Developer](https://developer.apple.com/xcode/)
- [Swift - Apple Developer](https://developer.apple.com/swift/)
- [TestFlight - Apple](https://developer.apple.com/testflight/)
- [Apple Developer Program](https://developer.apple.com/programs/)（有料・TestFlight 用）
