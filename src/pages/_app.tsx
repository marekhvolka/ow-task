import { type AppType } from "next/app";
import { Poppins } from "next/font/google";

import { api } from "~/utils/api";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
          :root {
            --font-outfit: ${poppins.style.fontFamily};
          }

          * {
            font-family: ${poppins.style.fontFamily};
          }
        `}</style>
      <Component {...pageProps} />;
    </>
  );
};

export default api.withTRPC(MyApp);
