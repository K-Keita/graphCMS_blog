
graphCMSを使ったブログの作成をしていきます。

こちらは前回の記事の続きになります。

前回の記事：[Next.jsでGraphCMSを使ったブログの作成](https://www.kabe-log.com/posts/cktmomnc86ax00b34b12lkibw)

今回はGetStaticPathsを用いて、それぞれの記事の詳細ページを作っていきます。

### react-markdown, remark-gfmのインストール

markdown記事を記述できるreact-markdownとそのプラグインであるremark-gfmをインストールします。

```bash
yarn add remark-gfm react-markdown
```

### posts/[id]/index.tsxの作成

[ ]をつけるとダイナミックルーティングが有効になります。したがって、idの部分が動的に変化するようになります。

ちなみに,
posts/[id]/index.tsxとposts/[id].tsxは同じ挙動になります。

```bash
posts/[id]/index.tsx

import { gql } from "@apollo/client";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import type { ParsedUrlQuery } from "node:querystring";
import type { VFC } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import client from "../../../libs/graphcms";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

type Data = {
  id: string;
  title: string;
  createdAt: string;
  content: any;
  image: { url: string };
};

type Blogs = {
  blogs: Data[];
};

type Props = {
  data: Data;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = await client.query<{ blogs: { id: string }[] }>({
    query: gql`
      query MyQuery {
        blogs {
          id
        }
      }
    `,
  });

  const paths = data.blogs.map((value) => {
    return { params: { id: value.id } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { data } = await client.query<Data>({
    query: gql`
      query Articles($id: ID) {
        blogs(where: { id: $id }) {
          id
          title
          createdAt
          content
          image {
            url
          }
        }
      }
    `,
    variables: { id: params ? params.id : null },
  });

  return {
    props: {
      data: data.blogs[0],
    },
    revalidate: 60,
  };
};

const Article: VFC<Props> = (props) => {
  const d = new Date(props.data.createdAt);
  const createdDate =
    String(d.getFullYear()) +
    "." +
    String(("0" + (d.getMonth() + 1)).slice(-2)) +
    "." +
    String(("0" + d.getDate()).slice(-2));


  return (
    <>
      <Head>
        <title>{props.data.title}</title>
        <meta name="content" content={props.data.description} />
      </Head>
      <main className={styles.post_area}>
        <h3>{createdDate}</h3>
        <h1>{props.data.title}</h1>
        <div className={styles.postImage}>
          <Image
            alt={props.data.title}
            src={props.data.image.url}
            width={600}
            height={300}
          />
        </div>
        <div>
          <ReactMarkdown plugins={[gfm]} className={styles.markdown}>
            {props.data.content}
          </ReactMarkdown>
        </div>
      <Link href="/" passHref>
        <a className={styles.btn}>戻る</a>
      </Link>
      </main>
    </>
  );
};

export default Article;
```

-css-

スタイルをつけていきます。ここはご自身でカスタマイズしてください。
ここでは、シンプルに最低限のスタイルをつけていきます。

以下のスタイルを追加していきましょう。

```bash
.post_area {
  width: 90%;
  margin: 3.4rem auto;
  max-width: 44rem;
}

.post_area > h1 {
  border-top: solid 2px black;
  border-bottom: solid 2px black;
  padding: 8px;
  margin: 0;
  font-size: 2.0rem;
}

.post_area > h3 {
  margin: 5px;
}

.postImage {
  max-width: 600px;
  margin: 20px auto;
}

.markdown {
  max-width: 600px;
  margin: 0 auto;
}

.btn {
  display: table;
  margin: 30px auto;
  color: blue;
  font-size: 1.2rem;
}

.btn:hover {
  text-decoration: underline;
}
```

￼
以上で個別ページに飛べるようになりました。

Vercelにデプロイする時は環境変数の設定を忘れないようにしましょう。

こちらで、環境変数について取り扱っています。

[firebase authを使用した環境をVercelにデプロイする方法](https://www.kabe-log.com/posts/ckt85apoo5pdv0d39m6i2vkfn)
