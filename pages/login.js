import styles from '../styles/login.module.css';
import { Text, Input, Button } from '@nextui-org/react';

export default function Home() {
  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.card}>
          <Text className={styles.title} css={{ color: '$white' }}>
            Start your <br /> journey with us
          </Text>
          <Text className={styles.subtitle} css={{ color: '$white' }}>
            Discovery the worlds best community of freelances and bussiness
            owners.
          </Text>
        </div>
      </section>
      <section className={styles.rightContainer}>
        <Text className={styles.titleForm} css={{ color: '$mygray900' }}>
          Seja bem-vindo!
        </Text>
        <Text className={styles.subtitleForm} css={{ color: '$mygray500' }}>
          Realize seu login para continuar
        </Text>

        <form>
          <Input
            fullWidth
            clearable
            label="Usuário"
            placeholder="Ex.: user@mail.com"
            color="default"
          />

          <div className={styles.margin}></div>

          <Input.Password
            fullWidth
            clearable
            color="default"
            type="password"
            label="Senha"
          />

          <Button className={styles.btn}>Entrar</Button>
        </form>
      </section>
    </section>
  );
}
