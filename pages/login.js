import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/login.module.css';
import { Text } from '@nextui-org/react';

export default function Home() {
  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}>Lado esquerdo</section>
      <section className={styles.rightContainer}>
        <Text>Seja bem-vindo!</Text>
      </section>
    </section>
  );
}
