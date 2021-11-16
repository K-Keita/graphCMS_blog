//ブログでパララックスを使う時用
// import { gql } from "@apollo/client";
// import type { GetStaticProps } from "next";
// import Head from "next/head";
// // import type { VFC } from "react";
// // import type { VFC } from "react";
// import { PagesButton } from "src/components/utils/pagesButton";
// import type { SideData } from "src/interfaces";
// import type { BlogProps, Data } from "src/interfaces";
// import { ArticlesList } from "src/layouts/articlesList";
// // import { MainContainer } from "src/layouts/mainContainer";
// import { SideContainer } from "src/layouts/sideContainer";
// import { client } from "src/libs/apollo-client";
// import Image from "next/image";
// import React, { useState } from "react";
// import {
//   useSpring,
//   useTrail,
//   useSprings,
//   animated,
//   config,
// } from "react-spring";
// import { Parallax, ParallaxLayer } from "@react-spring/parallax";

// export const getStaticProps: GetStaticProps<BlogProps> = async () => {
//   const { data } = await client.query<Data>({
//     query: gql`
//       query MyQuery {
//         articlesIDConnection(first: 8) {
//           pageInfo {
//             hasNextPage
//             hasPreviousPage
//           }
//         }
//         articlesID(orderBy: createdDate_DESC, first: 8) {
//           id
//           createdDate
//           title
//           description
//           image {
//             url
//           }
//           categories {
//             categoryName
//           }
//         }
//         assets(
//           where: { imageArticles_some: { NOT: [] } }
//           orderBy: createdAt_DESC
//           first: 7
//         ) {
//           imageArticles {
//             id
//             title
//             createdDate
//             image {
//               url
//             }
//           }
//         }
//       }
//     `,
//   });

//   const sideData = data.assets.map((value: { imageArticles: SideData[] }) => {
//     return value.imageArticles[0];
//   });

//   return {
//     props: {
//       data: data.articlesID,
//       sideData: sideData,
//       page: data.articlesIDConnection,
//     },
//     revalidate: 60,
//   };
// };

// const Test = (props: any) => {
//   const data = props.data.slice(3);
//   return (
//     <>
//       <Head>
//         <link rel="icon" href="/favicon.ico" />
//         <title>カベログ</title>
//         <meta
//           name="description"
//           content="都内で働く20代エンジニアです。まだエンジニアになって日が浅く勉強の日々が続いておりその成長過程を収めたブログとなっています。"
//         />
//       </Head>
//       <Parallax pages={4} style={{ top: "0", left: "0" }}>
//         <ParallaxLayer
//           offset={0}
//           // speed={1.0}
//           style={{
//             width: "100%",
//             height: "100vh",
//           }}
//         >
//           <Image src="/images/main/main.webp" layout={"fill"} />
//         </ParallaxLayer>
//         <ParallaxLayer
//           offset={1.0}
//           // speed={1.0}
//           style={{ backgroundColor: "green" }}
//         >
//           ここでポートフォリオ
//           <div className="bg-white w-96 h-20 mx-auto mt-3">ポートフォリオ</div>
//         </ParallaxLayer>
//         <ParallaxLayer offset={2} style={{ backgroundColor: "lime" }}>
//           ここでブログ
//         </ParallaxLayer>
//         <ParallaxLayer offset={3} style={{ backgroundColor: "blue" }}>
//           ここでコンタクト
//         </ParallaxLayer>
//         <ParallaxLayer offset={1.9} speed={0.2}>
//           <div className="w-48 h-32 bg-blue-500">ブログ</div>
//         </ParallaxLayer>
//         <ParallaxLayer offset={1.2} speed={0.8}>
//           <div className="w-10/12 mx-auto h-96 bg-red-500" />
//         </ParallaxLayer>
//         {/* <ParallaxLayer
//           offset={1.6}
//           speed={2}
//           style={{ backgroundColor: "orange" }}
//         /> */}
//         <ParallaxLayer offset={1.8} speed={2.0}>
//           <main className="mx-auto w-full justify-around flex xl:w-11/12">
//             <div className="w-60 h-20 bg-gray-600"></div>
//             <div className="w-60 h-20 bg-red-600"></div>
//           </main>
//         </ParallaxLayer>
//         <ParallaxLayer offset={2.0} speed={1.5}>
//           <main className="w-3/4 ">
//             <ArticlesList data={data} />
//           </main>
//         </ParallaxLayer>
//         {/* <ParallaxLayer offset={2.0} horizontal={true} speed={1.7}>
//         </ParallaxLayer> */}
//         <ParallaxLayer offset={1.8} speed={0.5}>
//           <section className="ml-auto sm:w-10/12 lg:w-3/12 xl:w-3/12">
//             <SideContainer sideData={props.sideData} />
//           </section>
//         </ParallaxLayer>
//       </Parallax>
//     </>
//   );
// };

// export default Test;
