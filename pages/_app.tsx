import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { Provider } from 'react-redux';
import { store } from '../state/store';
import '../i18n'
import styles from "../styles/Home.module.css";
import ArrowTop from "../public/icons/react-icons/arrow-top";
import { MessengerChat } from "react-messenger-chat-plugin";

export default function MyApp({ Component, pageProps }: AppProps) {
  const _scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />

        <div className={styles.scrollToTopButton} onClick={_scrollToTop}>
        <ArrowTop className={styles.scrollButtonIcon} />
        <MessengerChat
          pageId="100523779398207"
          language="sv_SE"
          themeColor={"#000000"}
          bottomSpacing={300}
          loggedInGreeting="loggedInGreeting"
          loggedOutGreeting="loggedOutGreeting"
          greetingDialogDisplay={"show"}
          debugMode={false}
        />
      </div>
      </Layout>
    </Provider>
  );
}