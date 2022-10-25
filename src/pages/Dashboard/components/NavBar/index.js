import { Navbar, Button, Link, Text, useTheme, Image } from '@nextui-org/react';

export default function Nav() {
  const { isDark } = useTheme();

  return (
    <Navbar isBordered={isDark} variant="static">
      <Navbar.Brand>
        <Text
          b
          color="inherit"
          hideIn="xs"
          size={20}
          css={{ color: '$primary' }}
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
        <Navbar.Item>
          <Button auto color="error" flat as={Link} href="/login">
            Sair
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
