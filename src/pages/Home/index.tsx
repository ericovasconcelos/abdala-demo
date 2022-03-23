import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import styles from '../styles/Home.module.css'

import data from '../../../data/mrs/summary/6124003faa4aac000c990571.json';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header text={data.search_term} />
      {data.total_cnj_numbers}
    </div>
  )
}

export default Home
