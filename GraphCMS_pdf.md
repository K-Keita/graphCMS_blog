
## pdfファイルをURL化し、API経由で表示させる方法(Next.js)

今回はページの遷移先に、PDF ファイルを指定して表示させる方法についてまとめました。

URL 化した PDF ファイルを直接コードに貼り付けるのは、セキュリティ上よくないです。
そこで今回は graphCMS にデータを保存し、クエリを投げてファイルを取得します。

この記事で使っている技術

- Next.js の GetStaticProps
- GraphQL クエリ

こちらの詳細については今回は扱いません。

また、GraphCMS の使用方法については別記事で記述しているので省きます。
こちらの記事で扱っています。
[Next.jsでgraphCMSを使ったブログの作成](https://www.kabe-log.com/posts/cktmomnc86ax00b34b12lkibw)

### ドライブに pdf ファイルをアップロード

google ドライブに PDF ファイルをアップロードします。

アップロード方法はこちら
[https://support.google.com/drive/answer/2424368?hl=ja&co=GENIE.Platform%3DDesktop](https://support.google.com/drive/answer/2424368?hl=ja&co=GENIE.Platform%3DDesktop)

ちなみにドライブで作成した URL を直接コードに貼り付けると、Google にログインされます。

### model の作成

まずはモデルを作成します。

今回は pdf_file という名前で作成します。

### Schema の作成

次にスキーマを作成します。
Add fields から　 Asset picker を選択

こちらも名前を pdf-file にします。

### Content の作成

左サイドバーからコンテンツを選択し、作成した pdf_file を選択

右上の青ボタンから create item を選択

ここで、先ほどドライブに保存した PDF ファイルをアップロードします。

Google アカウントへのアクセス権を取得し、

アップロードしたら、公開にチェックを入れて「save and publish」を押して保存します。

一度 playground でクエリを投げ、結果を取得できるか試してみましょう。

しっかし、取得できています。（僕は今回二つの PDF をアップロードしました）

### GetStaticProps でファイルを取得

今回は Next.js の GetStaticProps を使用して、PDFファイルをとってきます。

Apollo-client と graphql をインストール

```bash
yarn add @apollo-client graphql
```

#### apollo-client.ts の作成

libs フォルダを作成し、その配下に apollo-client.ts を作成します。

```bash
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHCMS_API,
  cache: new InMemoryCache(),
});

export default client;
```

#### ファイル URL の取得

PDF ファイルへの遷移タグを記述するページへ移動し、getStaticProps でファイルを取得しましょう。
build 時にデータを取得します。

```bash
import client from 'src/libs/apollo-client';
import {GetStaticProps} from 'next';
import {gql} from '@apollo/client';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        pdfFiles {
          pdfFile {
            url
          }
        }
      }
    `,

  });

  return {
    props: {
      data: data.pdfFiles
    }
  }

}
```

Typescript の型です。ベストプラクティスかはわかりません。

```bash
type PDF = {
pdfFile: {url: string}
}

type Props = {data: PDF[ ];
```

取得した data をコンソールに表示するとわかると思いますが、このデータは配列なので取得するときは

data[0].proFile.url 　で、インデックスを指定する必要があるので間違えないように
しましょう。

それではボタンを作って取得してみます。

指定のリンクタグの href 属性に url を指定するだけです。

```bash
<a
  href={data[0].pdfFile.url}
  target="_blank"
  rel="noopener noreferrer"
>
  Pdfファイルの取得
</a>
```

データが取得できたと思います。

graphCMS から取得できているのが確認できます。また、この場合、Google にログインしてないですね。
