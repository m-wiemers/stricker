import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Menu from '../components/menu';
import styled from 'styled-components';
import { AuthProvider } from '../firebase/context';
import { useRouter } from 'next/router';
import { auth } from '../firebase';

const Content = styled.div`
  margin: 2rem;
`;

function MyApp({ Component, pageProps }: AppProps & any) {
  const menuPoints = [
    { linkName: 'home', href: '/' },
    { linkName: 'konzerte', href: '/concerts' },
    { linkName: 'personal', href: '/personal' },
  ];

  const dashboardMenu = [
    { linkName: 'Überblick', href: '/dashboard' },
    { linkName: 'Konzert anlegen', href: '/dashboard/addconcerts' },
    { linkName: 'Konzerte', href: '/dashboard/concerts' },
    { linkName: 'Mitarbeiter', href: '/dashboard/workers' },
    { linkName: 'Personalplanung', href: '/dashboard/personal' },
  ];

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Stricker Intern</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {router.pathname !== '/' &&
        router.pathname !== '/signedoutpage' &&
        !router.pathname.includes('authes') &&
        !router.pathname.includes('dashboard') && (
          <Menu menuPoints={menuPoints} />
        )}
      {router.pathname.includes('dashboard') && (
        <Menu menuPoints={dashboardMenu} />
      )}
      <AuthProvider>
        <Content>
          <Component {...pageProps} />
        </Content>
      </AuthProvider>
    </>
  );
}

export default MyApp;
