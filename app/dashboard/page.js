"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import styles from './page.module.css';

// deshboard
const DeshBoard = () => {
const session = useSession();
const router = useRouter();
const fetcher = (...args) => fetch(...args).then(res => res.json());
const [errors, setErrors] = useState({})
const { data, mutate, error } = useSWR(
  `/api/posts?username=${session?.data?.user.name}`,
  fetcher
);


const [formData, setFormData] = useState({
  title: '',
  desc: '',
  img: '',
  content: ''
})


useEffect(() => {
  if(session.status === 'unauthenticated'){
    router?.push("/dashboard/login")
 }
}, [router, session.status])


if(session.status === 'loading'){
  return <p>Loading...</p>
}



const handleChange = (e) => {
  const {name, value} = e.target;
  setFormData({
      ...formData, [name] : value
  })
}

const resetForm = () => {
  setFormData({
    title: '',
    desc: '',
    img: '',
    content: ''
  })
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = {}
  if(!formData.title.trim()) {
      validationErrors.title = "Title is required"
  }

  if(!formData.desc.trim()) {
      validationErrors.desc = "Decision  is required"
  }

  if(!formData.img.trim()) {
      validationErrors.img = "Images is required"
  }  else if (formData.img.includes('https://') !== true){
    validationErrors.img = "Images  http// or https// url link "

  }

  if(!formData.content.trim()) {
    validationErrors.content = "Conten is required"
}
    
setErrors(validationErrors);


let valid = Object.keys(validationErrors).length === 0;
if(valid) {
  try {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title:formData.title,
        desc:formData.desc,
        img:formData.img,
        content:formData.content,
        username: session.data.user.name,
      }),
    });
    mutate();
    resetForm();
    router?.push('/dashboard/blogslist')
    
  } catch (error) {
    console.log(error);
}
}


  


};



if (session.status === "authenticated") {
  return (
    <div className={styles.container}>
      <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        <div className={styles.formBox}>
        <input type="text" name='title' placeholder="Title" className={styles.input} onChange={handleChange} value={formData.title}   />
        {errors.title && <span className={styles.text_color}>{errors.title}</span>} 
        </div>
        <div className={styles.formBox}>
        <input type="text" name='desc' placeholder="Desc"  onChange={handleChange}     className={styles.input} value={formData.desc} />
        {errors.desc && <span className={styles.text_color}>{errors.desc}</span>} 
        </div>
        <div className={styles.formBox}>
        <input type="text" name='img' placeholder="Image Url" onChange={handleChange} className={styles.input} value={formData.img}/>
        {errors.img && <span className={styles.text_color}>{errors.img}</span>} 
        </div>

        <div className={styles.formBox}>
        <textarea
          placeholder="Content"
          className={styles.textArea}
          cols="30"
          rows="10"
          name='content'
          value={formData.content}
          onChange={handleChange}    
        ></textarea>
         {errors.content && <span className={styles.text_color}>{errors.content}</span>} 
          </div>
        <button className={styles.button}>Send</button>
      </form>
    </div>
  );
}
}

export default DeshBoard;
