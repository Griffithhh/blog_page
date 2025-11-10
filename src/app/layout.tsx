
import "../../styles/globals.css";

import { HeroUIProvider } from "@heroui/react";
import {ToastContainer} from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HeroUIProvider>{children}</HeroUIProvider>
              <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
