import styles from '../../../styles/login.module.css';
import { Text, Input, Button } from '@nextui-org/react';
import Timer from './components/timer';
import { useState } from 'react';
import { LoginRequest } from '../../api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { addDays } from 'date-fns';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { token } = await LoginRequest({
        email: user,
        password,
      });

      Cookie.set('token', token, {
        expires: addDays(new Date(), 1),
      });

      router.replace('/');
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.card}>
          <Timer />
          <Text className={styles.title} css={{ color: '$white' }}>
            Start your
            <br /> NuPPGIN Dashboard
          </Text>
          <Text className={styles.subtitle} css={{ color: '$white' }}>
            Descubra o Dashboard do Núcleo de Pesquisa em Processamento Gráfico
            e Interação Natural.
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

        <form onSubmit={onSubmit}>
          <Input
            value={user}
            onChange={(event) => {
              const { value } = event.target;
              setUser(value);
            }}
            fullWidth
            clearable
            label="Usuário"
            placeholder="Ex.: user@mail.com"
            color="default"
          />

          <div className={styles.margin}></div>

          <Input.Password
            value={password}
            onChange={(event) => {
              const { value } = event.target;
              setPassword(value);
            }}
            fullWidth
            clearable
            color="error"
            type="password"
            label="Senha"
            onError={true}
          />

          <Button type="submit" className={styles.btn}>
            Entrar
          </Button>
        </form>
      </section>
    </section>
  );
}
