import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import ChallengeBox from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { GetServerSideProps } from 'next';
import React from 'react';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number,
  currentExpericence: number,
  challengesCompleted: number
}

export default function Home(props) { 
  return ( 
  <ChallengesProvider 
    level={props.level}
    currentExpericence={props.currentExpericence}
    challengesCompleted={props.challengesCompleted}>
      <div className={styles.container}>    
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />

      <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div> 
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExpericence, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExpericence: Number(currentExpericence),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}