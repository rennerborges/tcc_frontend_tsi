import { Text, Collapse, Col, Row, Input } from '@nextui-org/react';
import Nav from './components/NavBar/index.js';
import styles from './styles.module.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { GetObjects } from '../../api/index.js';
import { useRouter } from 'next/router.js';
import { toast } from 'react-toastify';

const Editor = dynamic(() => import('../../components/Editor/index.js'), {
  ssr: false,
});

export default function Dashboard() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [objects, setObjects] = useState([]);

  const getObjects = async () => {
    try {
      const response = await GetObjects();

      setObjects(response.objects);
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

      if (error.status === 401) {
        router.replace('/login');
      }
    }
  };

  useEffect(() => {
    getObjects();
  }, []);

  return (
    <section>
      <Nav />
      <section className={styles.container}>
        <Row justify="space-between" align="center">
          <Text b size={25} css={{ color: '$accents9' }}>
            Seus objetos
          </Text>
          <Row align="center" fluid={false}>
            <Input
              value={search}
              onChange={(event) => {
                const { value } = event.target;
                setSearch(value);
              }}
              clearable
              placeholder="Ex.: Cadeira"
              color="default"
              start
            />
            <MdSearch className={styles.iconSearch} size={24} />
          </Row>
        </Row>
        {console.log('objects', objects)}
        <Collapse.Group>
          {objects.map((object) => (
            <Collapse
              key={object._id}
              title={
                <Col>
                  <Row>
                    <Text
                      b
                      size={20}
                      css={{ tt: 'capitalize', color: '$accents8' }}
                    >
                      {object.name}
                    </Text>
                  </Row>
                  <Row>
                    <Text size={16} css={{ color: '$accents6' }}>
                      {`${object.createdBy} ${object.createdAt}`}
                    </Text>
                  </Row>
                </Col>
              }
            >
              <Text b size={20} css={{ tt: 'capitalize', color: '$accents9' }}>
                Objeto:
              </Text>
              <Editor value={object.data} readOnly onChange={() => {}} />
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
                Model:
              </Text>
              <Editor value={object.model} readOnly onChange={() => {}} />
            </Collapse>
          ))}
        </Collapse.Group>
      </section>
    </section>
  );
}
