import type { NextPage } from 'next'
import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Loader} from 'semantic-ui-react'
import{ IndexPageProps,SerchCatImage } from '../components/interface'
import type { GetServerSideProps } from 'next'
import { Header } from '../components/MunchikinHeader';
import styles from '../styles/Home.module.css'
import Button from '@mui/material/Button';
import Link from 'next/link'

export const fetchCatImage = async ():Promise<SerchCatImage>=>{
  const res = await fetch("https://api.thecatapi.com/v1/images/search?breed_ids=munc");
  const result = await res.json();
  // console.log(result[0]);
  return result[0];
}
const Home: NextPage<IndexPageProps> = ({initialCatImageUrl}) => {

  const [catImageUrl,setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading,setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false)
  }

  return (
    
    <div className={styles.main}>
      <Header/>
      <div className={styles.container}>
      <div className={styles.code}><Link href='/'>Home</Link></div>
      <div className={styles.code}><Link href='/Bengal'>Bengal</Link></div>
      <div className={styles.code}><Link href="/Showshoe">Snowshoe</Link></div>
      </div>
        
      {isLoading ? (
        <Loader active size="huge" inline="centered"/>
        ):(<img src={catImageUrl}height="auto"/>
        )}
      
      <Button variant="contained" color="success" onClick={handleClick}>今日の猫さん</Button>
      
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () =>{
  const catImage = await fetchCatImage();
  return{
    props:{
      initialCatImageUrl:catImage.url,
    }
  }
}

export default Home