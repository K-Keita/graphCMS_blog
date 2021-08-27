import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import client from '../libs/apollo-client';
import { GetStaticProps } from "next";
import { gql } from "@apollo/client";

type Blog = {
  id: string;
  title: string;
  createdAt: string;
  content: { html: JSX.Element };
  image: { url: string };
};

type Props = {
  data: { blogs: Blog[] };
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Countries {
        blogs {
          id
          createdAt
          title
          content {
            html
          }
          image {
            url
          }
        }
      }
    `,
  });

  return {
    props: {
      data: data,
    },
  };
};

const Home: NextPage<Props> = ({ data }: Props) => {
  console.log(data);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>GraphCMS Blog</h1>
        <div className={styles.grid}>
          {data.blogs.map((value: Blog) => {
            const d = new Date(value.createdAt);
            const createdDate =
              String(d.getFullYear()) +
              "." +
              String(("0" + (d.getMonth() + 1)).slice(-2)) +
              "." +
              String(("0" + d.getDate()).slice(-2));
            return (
              <Link passHref key={value.title} href={`/articles/${value.id}`}>
                <div className={styles.card}>
                  <p>{createdDate}</p>
                  <h2>{value.title}</h2>
                  <Image
                    alt={value.title}
                    src={value.image.url}
                    width={350}
                    height={190}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
