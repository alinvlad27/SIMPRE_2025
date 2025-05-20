import { useState } from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [isLogin, setIsLogin] = useState(false);

  return <Component {...pageProps} setIsLogin={setIsLogin} isLogin={isLogin} />;
}