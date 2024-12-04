import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

async function generData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    next:{
      cache: "no-store",
      revalidate:10,
    }

  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
async function getData(id) {
  const res = await fetch(`http://localhost:10000/api/posts/${id}`, {
    cache: "no-store",
  });
 
  if (!res.ok) {
    return notFound()
  }

  return res.json();
}
export async function generateStaticParams() {
  const posts = await generData();
 
  return posts.map((postId) => ({id:postId._id}))
}
const BlogPost = async ({ params }) => {
  const paramsId = (await params).id;
  const data = await getData(paramsId);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.desc}
          </p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt="img"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt="img"
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
         {data.content}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
