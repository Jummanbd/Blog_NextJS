"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import useSWR from 'swr';
import style from './page.module.css';
const BlogList =  () => {
const session = useSession();
const router = useRouter();
const [searchBox , setSearchBox] = useState("")
const fetcher = (...args) => fetch(...args).then(res => res.json());
const { data, mutate } = useSWR(
  `/api/posts?username=${session?.data?.user.name} `,
  fetcher
);
useEffect(() => {
  if(session.status === 'unauthenticated'){
    router?.push("/dashboard/login")
 }
}, [router, session.status])
if(session.status === 'loading'){
  return <p>Loading...</p>
}




const handleDelete = async (id) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    mutate();
  } catch (err) {
    console.log(err);
  }
};
const submitSearch = (event) => {
   setSearchBox(data.filter(e => e.title.toLowerCase().includes(event.target.value)))
};


 return (
  <main className={style.container}> 
  <div className={style.table_box}>
     <div className={style.wrapper}>

   <h1 className={style.title}>Blogs List</h1>
   <div className={style.search}>
      <input type="text" className={style.searchInput} placeholder="Search the title..." onChange={submitSearch}/>
      <button type="submit" className={style.searchButton} >
       <IoIosSearch />
     </button>
</div>
    </div>
    <table className={style.customers}>
    <thead>
      <tr>
        <th className={style.img_box}>Images</th>
        <th>Title</th>
        <th>Descison</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {(searchBox === 0  || searchBox === "" ? data : searchBox)?.map((item) => (
                    <tr key={item._id}>
                    <td>
                      <Link href={`/blog/${item._id}`}>
                      <Image src={item.img}  width={60} height={30} alt='blog-img'/>
                      </Link>
                      </td>
                    <td className={`${style.font_bold} ${style.text_ellipsis}` }>
                      <Link href={`/blog/${item._id}`}>
                      <p>{item.title}</p>
                      </Link>
                      </td> 
                    <td className={`${style.font_bold} ${style.text_ellipsis}`}>
                      <Link href={`/blog/${item._id}`}>
                      <p>{item.desc}</p>
                      </Link>
                    </td> 
                    <td>
                    <div className={style.wrap}>
                      <button className={style.btn}  onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                  </td>
                    </tr>
                  
        ))
        }
         </tbody>
    </table>
  </div>

  </main>
 )
}

export default BlogList;
