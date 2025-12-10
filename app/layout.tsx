import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RNGaaS Demo',
  description: 'Random Number Generator as a Service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
