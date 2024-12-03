"use client";
import Google_icon from '@/public/icons8-google.svg';
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
const LoginPages = () => {
  
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    
    setError(params.get("error"));
    setSuccess(params.get("success"));
    if (session.status === "authenticated") {
      router?.push("/dashboard");
   }
  }, [params, router, session.status]);
  

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        {error && error}
        <button className={styles.button}>Login</button>
        
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        <div className={styles.google_btn}>
        <Image src={Google_icon}  alt="img" width={28} height={28}/>
         <span>Login with Google</span>
        </div>
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
      {/* <button
        onClick={() => {
          signIn("github");
        }}
        className={styles.button + " " + styles.github}
      >
        Login with Github
      </button> */}
    </div>
  );
};

export default LoginPages;