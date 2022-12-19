import {
  Text,
  Collapse,
  Col,
  Row,
  Input,
  Button,
  Tooltip,
} from '@nextui-org/react';
import Nav from '../../components/NavBar';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { MdSearch, MdEdit, MdDelete } from 'react-icons/md';
import { DeleteObject, GetObjects } from '../../api/index.js';
import Router, { useRouter } from 'next/router.js';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/pt-br';
import Fuse from 'fuse.js';
import ShowObject from './components/ShowObject';
import SkeletonContainer from './components/SkeletonContainer';
import NotFoundContainer from './components/NotFoundContainer';
import ConfirmModal from '../../components/ConfirmModal';

moment.locale('pt-br');

export default function Dashboard() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [objects, setObjects] = useState([]);
  const [idDelete, setIdDelete] = useState(0);

  const getObjects = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
      threshold: 0.2,
      keys: ['code', 'name', 'createdBy'],
    };

    const fuse = new Fuse(objects, options);

    const filter = fuse.search(search);

    return filter.map(({ item }) => item);
  };

  const handleEditPage = (event, id) => {
    event.stopPropagation();
    Router.push({
      pathname: '/createObject',
      query: { id },
    });
  };

  const deleteObjectAction = (event, id) => {
    event.stopPropagation();
    setIdDelete(id);
  };

  const deleteObject = async (confirm) => {
    console.log(confirm);
    if (!confirm) {
      return setIdDelete(0);
    }

    try {
      setLoading(true);

      await DeleteObject(idDelete);

      toast.success(`Objeto deletado com sucesso!`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      getObjects();
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
    } finally {
      setLoading(false);
      setIdDelete(0);
    }
  };

  const renderItens = (itens) => {
    if (loading) {
      return <SkeletonContainer />;
    }

    if (!itens.length) {
      return <NotFoundContainer />;
    }

    return (
      <Collapse.Group>
        {itens.map((object) => (
          <Collapse
            key={object._id}
            title={
              <Row justify="space-between" align="center">
                <Col>
                  <Row>
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
                </Col>
                <Row
                  justify="flex-end"
                  align="center"
                  css={{ width: 'auto' }}
                  className={styles.containerIconsAction}
                >
                  <Tooltip content={'Apagar'} rounded color="error">
                    <MdDelete
                      onClick={(event) => deleteObjectAction(event, object._id)}
                      className={styles.iconAction}
                    />
                  </Tooltip>
                  <Tooltip content={'Editar'} rounded color="primary">
                    <MdEdit
                      onClick={(event) => handleEditPage(event, object._id)}
                      className={styles.iconAction}
                    />
                  </Tooltip>
                </Row>
              </Row>
            }
          >
            <ShowObject
              name="Object"
              object={object.data}
              exportName={object.name}
            />
            <ShowObject
              name="Model"
              object={object.model}
              exportName={`${object.name}_model`}
            />
          </Collapse>
        ))}
      </Collapse.Group>
    );
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
            <Button
              css={{
                minWidth: 120,
                marginRight: 15,
              }}
              onClick={() => {
                router.push('/createObject');
              }}
            >
              Criar
            </Button>
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

        {renderItens(searchObjects())}
      </section>
      <ConfirmModal open={Boolean(idDelete)} onClose={deleteObject} />
    </section>
  );
}
