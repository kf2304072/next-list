import Head from "next/head";
import Styles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "./components/header";
import Content from "./components/content";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok " + response.statusText);
  }
  return response.json();
};


export default function Home(){

  let title = "ともすた";
  const {data, error} =useSWR("/api/message",fetcher);
  if(error) return <div>failed to load</div>
  if(!data) return <div>loading...</div>
  return (
    <Content>
      <Head>
        <title>{title}</title>
      </Head>
      <Header title={title}/>
      <p>{data.message}</p>
      <div>
        <Link href="/about">About</Link>
      </div>

    </Content>
  )
}