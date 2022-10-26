import { Text, Collapse, Col, Row, Input } from '@nextui-org/react';
import Nav from './components/NavBar/index.js';
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

  const searchObjects = () => {
    if (!search) {
      return objects;
    }

    const options = {
      // isCaseSensitive: false,
      // includeScore: false,
      // shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      threshold: 0.2,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      keys: ['code', 'name', 'createdBy'],
    };

    const fuse = new Fuse(objects, options);

    const filter = fuse.search(search);
    console.log('filter:', filter);

    return filter.map(({ item }) => item);
  };

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
          {searchObjects().map((object) => (
            <Collapse
              key={object._id}
              title={
                <Col>
                  <Row align="center">
                    <Text
                      b
                      size={20}
                      css={{ tt: 'capitalize', color: '$accents8' }}
                    >
                      {object.name}
                    </Text>
                    <Text
                      size={16}
                      css={{
                        marginLeft: '10px !important',
                        color: '$accents6',
                      }}
                    >
                      {`#${object.code}`}
                    </Text>
                  </Row>
                  <Row>
                    <Text size={16} css={{ color: '$accents6' }}>
                      {`Criado por ${object.createdBy} em ${moment(
                        object.createdAt
                      ).format('LL')}`}
                    </Text>
                  </Row>
                  <Row>
                    <Text size={16} css={{ color: '$accents6' }}>
                      {}
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
