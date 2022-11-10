import { Navbar, Button, Link, Text, Row } from '@nextui-org/react';
import Cookie from 'js-cookie';
import { useTheme as useNextTheme } from 'next-themes';
import { Switch, useTheme as useThemeUI } from '@nextui-org/react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

export default function Nav() {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useThemeUI();

  const router = useRouter();

  const logout = () => {
    Cookie.remove('token');
  };

  return (
    <Navbar
      isBordered={isDark}
      variant="static"
      css={{
        '& .nextui-navbar-container': {
          maxWidth: '100%',
          width: '100%',
        },
      }}
    >
      <Navbar.Brand>
        <Text
          b
          color="inherit"
          hideIn="xs"
          size={20}
          css={{ color: '$primary', cursor: 'pointer' }}
          onClick={() => {
            router.replace('/');
          }}
        >
          NuPPGIN
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
        {/* <Navbar.Link href="#">Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Company</Navbar.Link> */}
      </Navbar.Content>
      <Navbar.Content>
        <Row align="center">
          <div className={styles.iconTheme}>
            {isDark ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
          </div>
          <Switch
            checked={isDark}
            onChange={(e) => setTheme(!isDark ? 'dark' : 'light')}
          />
        </Row>
        <Navbar.Item>
          <Button
            onClick={logout}
            auto
            color="error"
            flat
            as={Link}
            href="/login"
          >
            Sair
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
