import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { IArticleFields } from "../src/@types/contentful";
import ContentService from "../src/util/content-service";
import styles from "../styles/Home.module.css";

interface Props {
  article: IArticleFields;
}

const Article: NextPage<Props> = ({ article }: any) => (
  <div className={styles.container}>
    <Head>
      <title>{article.title} | My awesome Harry Potter blog</title>
      <meta name="description" content={article.description} />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.description}>{article.description}</p>
      <time dateTime={article.publishDate} className={styles.publishDate}>
        Published on {article.publishDate}
      </time>

      <div className={styles.article}>{documentToReactComponents(article.content)}</div>
    </main>
  </div>
);

export default Article;

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
    ctx,
  ) => {
    const { slug } = ctx.params!;
    const article = await ContentService.instance.getArticleBySlug(slug);
  
    if (!article) {
      return { notFound: true };
    }
  
    return {
      props: {
        article: article.fields,
      },
    };
  };
  
  export const getStaticPaths: GetStaticPaths = async () => {
    const articles =
      await ContentService.instance.getEntriesByType<IArticleFields>("article");
  
    return {
      paths: articles.map((article) => ({
        params: {
          slug: article.fields.slug,
        },
      })),
      fallback: false,
    };
  };