// pages/_app.js
import { Inter } from "next/font/google";
import '@/app/globals.css'; // Make sure the path to your global CSS is correct

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;