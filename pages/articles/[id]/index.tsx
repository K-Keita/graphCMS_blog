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
  const { data } = await client.query<Blogs>({
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
        <ReactMarkdown plugins={[gfm]} className={styles.markdown}>
          {props.data.content}
        </ReactMarkdown>
        <Link href="/" passHref>
          <a className={styles.btn}>戻る</a>
        </Link>
      </main>
    </>
  );
};

export default Article;
