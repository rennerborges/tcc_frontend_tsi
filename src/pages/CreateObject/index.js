import { Text, Collapse, Col, Row, Input, Button } from '@nextui-org/react';
import Nav from '../../components/NavBar/index.js';
import styles from './styles.module.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { GetObjects } from '../../api/index.js';
import { useRouter } from 'next/router.js';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/pt-br';
import Fuse from 'fuse.js';

moment.locale('pt-br');

const Editor = dynamic(() => import('../../components/Editor/index.js'), {
  ssr: false,
});

export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [object, setObject] = useState('{}');
  const [schema, setSchema] = useState('{}');

  const formatObjectString = (json) => JSON.stringify(json, null, 1);

  return (
    <section>
      <Nav />
      <section className={styles.container}>
        <Text
          b
          size={20}
          css={{
            display: 'block',
            marginTop: '15px',
            tt: 'capitalize',
            color: '$accents9',
          }}
        >
          Criar um objeto
        </Text>

        <Input
          value={name}
          onChange={(event) => {
            const { value } = event.target;
            setName(value);
          }}
          fullWidth
          clearable
          label="Nome"
          placeholder="Ex.: Mesa de escritório"
          color="default"
        />
        <Text
          size={16}
          css={{
            display: 'block',
            marginTop: '15px',
            tt: 'capitalize',
            color: '$accents9',
          }}
        >
          Objeto:
        </Text>
        <Editor
          value={object}
          onChange={(value, e) => {
            console.log('value', value);
            setObject(value);
          }}
        />
        <Text
          size={16}
          css={{
            display: 'block',
            marginTop: '15px',
            tt: 'capitalize',
            color: '$accents9',
          }}
        >
          Model:
        </Text>
        <Editor
          value={schema}
          onChange={(value) => {
            setSchema(value);
          }}
        />
        <section className={styles.containerBtn}>
          <Button type="submit">Salvar</Button>
        </section>
      </section>
    </section>
  );
}
