
import Button from "@/components/button/Button.js";
import Image from "next/image.js";
import { notFound } from "next/navigation";
import { items } from "./data.js";
import styles from './page.module.css';
const getData = (cat) => {
  const data = items[cat];
  if (data) {
    return data;
  }

  return notFound();
};

export function generateStaticParams() {
  let category = Object.keys(items)
  return category.map((item) =>  ({category: item}))
}
 async function Category({ params }) {
  
  const paramsCategory =  (await params).category;
  const data = await getData(paramsCategory);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{(await params).category}</h1>

      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            <Button text="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              fill={true}
              src={item.image}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );

}

export default Category;