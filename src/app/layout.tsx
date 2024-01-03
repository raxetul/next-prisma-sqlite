import '@/styles/global.css';
import { lusitana } from "@/styles/fonts";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Template Dashboard Application',
  // description: '',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} antialiased`}> {children} </body>
    </html>
  );
}
