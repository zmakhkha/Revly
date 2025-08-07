import { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'antd/dist/reset.css';
import './globals.css';

export const metadata = {
  title: 'Revly Dashboard',
  description: 'Vendor & User Management',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="layout-grid">
          <aside className="sidebar">
            <Navbar />
          </aside>
          {/* 
          <header className="header">
            {/* Optional: Add Header Content 
            <h2 style={{ margin: 0 }}>Revly Dashboard</h2>
          </header>
          */}

          <main className="main-content">
            {children}
            <ToastContainer />
          </main>
        </div>
      </body>
    </html>
  );
}
