import { Text, Collapse, Col, Row, Input } from '@nextui-org/react';
import Nav from './components/NavBar/index.js';
import styles from './styles.module.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const Editor = dynamic(() => import('../../components/Editor/index.js'), {
  ssr: false,
});

export default function Dashboard() {
  const [search, setSearch] = useState('');

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

        <Collapse.Group>
          <Collapse
            title={
              <Col>
                <Row>
                  <Text
                    b
                    size={20}
                    css={{ tt: 'capitalize', color: '$accents8' }}
                  >
                    Cadeira gamer
                  </Text>
                </Row>
                <Row>
                  <Text size={16} css={{ color: '$accents6' }}>
                    renner@mail.com ás 13h do dia 23/10/2022
                  </Text>
                </Row>
              </Col>
            }
          >
            <Text b size={20} css={{ tt: 'capitalize', color: '$accents9' }}>
              Objeto:
            </Text>
            <Editor />
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
            <Editor />
          </Collapse>
          <Collapse
            title={
              <Col>
                <Row>
                  <Text
                    b
                    size={20}
                    css={{ tt: 'capitalize', color: '$accents8' }}
                  >
                    Cadeira gamer
                  </Text>
                </Row>
                <Row>
                  <Text size={16} css={{ color: '$accents6' }}>
                    renner@mail.com ás 13h do dia 23/10/2022
                  </Text>
                </Row>
              </Col>
            }
          >
            <Text b size={20} css={{ tt: 'capitalize', color: '$accents9' }}>
              Objeto:
            </Text>
            <Editor />
            <Text b size={20} css={{ tt: 'capitalize', color: '$accents9' }}>
              Model:
            </Text>
            <Editor />
          </Collapse>
          <Collapse
            title={
              <Col>
                <Row>
                  <Text
                    b
                    size={20}
                    css={{ tt: 'capitalize', color: '$accents8' }}
                  >
                    Cadeira gamer
                  </Text>
                </Row>
                <Row>
                  <Text size={16} css={{ color: '$accents6' }}>
                    renner@mail.com ás 13h do dia 23/10/2022
                  </Text>
                </Row>
              </Col>
            }
          >
            <Text b size={20} css={{ tt: 'capitalize', color: '$accents9' }}>
              Objeto:
            </Text>
            <Editor />
            <Text b size={20} css={{ tt: 'capitalize', color: '$accents9' }}>
              Model:
            </Text>
            <Editor />
          </Collapse>
        </Collapse.Group>
      </section>
    </section>
  );
}
