import { useEffect, useState } from "react";
import Link from "next/link";
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  NextPage,
} from "next";
import axios from "axios";
import Head from "next/head";
import styles from '../styles/Home.module.css'
import { IArticleFields } from "../src/@types/contentful";
import ContentService from "../src/util/content-service";
/*---------------------- STEP-15 SSR_REST_API --------------------------------------*/

// export const getServerSideProps: GetServerSideProps = async () => {
//   const userReq: any = await axios.get("https://reqres.in/api/users");

//   return {
//     props: {
//       rockets: "data.rockets",
//       dragons: "data.dragons",
//       landpads: "data.landpads",
//       // launches: data.launches,
//       users: userReq.data.data,
//     },
//   };
// };

/*---------------------- STEP-16 SSG_REST_API --------------------------------------*/

//   export const getStaticProps: GetStaticProps = async (context) => {
//     // const usersReq = await axios.get('https://api.rwn-js.com/04/users')
//     const userReq: any = await axios.get('https://reqres.in/api/users');

//     return {
//       props: {
//         users: userReq.data.data
//     }
//   }
// }

interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

// function List({ users }: { users: User[] }) {
//   return (
//     <ul>
//       {
//         users.map((user) =>
//           <li key={user.id}>
//             <Link href={`/users/${user.id}`} passHref>
//               <a> {user.first_name} {user.last_name} </a>
//             </Link>
//           </li>
//         )
//       }
//     </ul>
//   )
// }

//  const HomePage: NextPage = () => {
// const [loading, setLoading] = useState<boolean>(true);
// const [data, setData] = useState<User[]>([]);

// const getUsers = async () => {
//   const usersReq: any = await axios.get('https://reqres.in/api/users');

//   const users = (usersReq.data.data as User[]);
//   setLoading(false);
//   setData(users);
// }

// useEffect(() => {
//   getUsers();
// }, []);

// return (
// <div>
// hello world
{
  /* {loading && <div>Loading users...</div>}
      {data.length > 0 && <List users={data} />} */
}
// </div>
// )
//  }

//  export default HomePage

// const HomePage: NextPage<{ users: User[] }> = (props) => {
//   const { users } = props;
//   console.log("users ", users);

//   return (
//     <div>
//       <h3> All SpaceX Launches </h3>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             <Link href={`/users/${user.id}`} passHref>
//               <a>
//                 {user.first_name} {user.last_name}
//               </a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HomePage;

interface Props {
  articles: IArticleFields[];  
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles = (
    await ContentService.instance.getEntriesByType<IArticleFields>("article")
  ).map((entry) => entry.fields);

  return {
    props: {
      articles,
    },
  };
};



const Home: NextPage<Props> = ({ articles }:any ) => (
  
  <div className={styles.container}>
    <Head>
      <title>My awesome Harry Potter blog</title>
      <meta
        name="description"
        content="This is a blog with many intersting articles about Harry Potter."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to my Harry Potter blog!</h1>

      <p className={styles.description}>
        This is a blog with many intersting articles about Harry Potter.
      </p>

      <div className={styles.grid}>
        {articles.map((article: any) => (
          <a
            key={article.slug}
            href={`/${article.slug}`}
            className={styles.card}
          >
            <h2>{article.title} &rarr;</h2>
            <p>{article.description}</p>
          </a>
        ))}
      </div>
    </main>
  </div>
);

export default Home;


