import { Text, Input, Button } from '@nextui-org/react';
import Nav from '../../components/NavBar/index.js';
import styles from './styles.module.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {
  CreateObject as CreateObjectApi,
  GetObjectById,
  UpdateObject,
} from '../../api/index.js';
import { useRouter } from 'next/router.js';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/pt-br';
import SkeletonContainer from './components/SkeletonContainer/index.js';

moment.locale('pt-br');

const Editor = dynamic(() => import('../../components/Editor/index.js'), {
  ssr: false,
});

export default function CreateObject({ id }) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [object, setObject] = useState('{}');
  const [schema, setSchema] = useState('{}');
  const [loading, setLoading] = useState(false);

  const getObjectById = async (id) => {
    try {
      setLoading(true);
      console.log(id);
      const response = await GetObjectById(id);
      if (!response?.object) {
        throw 'Nenhum objeto encontrado';
      }

      const data = response?.object;

      setName(data.name);
      setObject(JSON.stringify(data.data, null, 1));
      setSchema(JSON.stringify(data.model, null, 1));
    } catch (error) {
      toast.error(error?.message?.response?.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      router.replace('/createObject');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getObjectById(id);
    }
  }, []);

  const isValidForm = () => {
    try {
      if (!name) {
        throw 'Informe o nome';
      }

      try {
        const data = JSON.parse(object);
        if (!Object.values(data).length) {
          throw 'Objeto sem chave';
        }
      } catch (error) {
        throw 'Informe um Objeto válido';
      }

      try {
        const data = JSON.parse(schema);
        if (!Object.values(data).length) {
          throw 'Objeto sem chave';
        }
      } catch (error) {
        throw 'Informe um Model válido';
      }

      return true;
    } catch (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      return false;
    }
  };

  const submitForm = async () => {
    try {
      if (!isValidForm()) {
        return;
      }

      const body = {
        name,
        data: JSON.parse(object),
        model: JSON.parse(schema),
      };

      if (id) {
        await UpdateObject(id, body);
      } else {
        await CreateObjectApi(body);
      }

      toast.success(`Objeto ${id ? 'editado' : 'criado'} com sucesso!`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
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
    <section>
      <Nav />
      {loading ? (
        <SkeletonContainer />
      ) : (
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
            <Button type="submit" onClick={submitForm}>
              Salvar
            </Button>
          </section>
        </section>
      )}
    </section>
  );
}
