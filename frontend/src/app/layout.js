/* eslint-disable @next/next/no-sync-scripts */
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task Manager - PedalStart',
  description: 'This is the assignment of PedalStart',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {children}
        <ToastContainer />
        <script src="https://kit.fontawesome.com/1b20c7f767.js" crossorigin="anonymous"></script>
      </body>
    </html>
  );
}
