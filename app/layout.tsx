import { Nunito } from "next/font/google";

import './globals.css'
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";

export const metadata = {
  title: 'AirCnc',
  description: 'Clone Airbnb',
}

const font = Nunito(
  {
    subsets:["latin"]
  }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
      <ClientOnly>
        {/* <Modal actionLabel="Submit" isOpen={false} title="Login"/> */}
        <ToasterProvider/>
        <RegisterModal/>
        <LoginModal/>
        <Navbar/>
      </ClientOnly>
        {children}
        </body>
    </html>
  )
}
