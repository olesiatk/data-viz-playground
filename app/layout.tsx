import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Charts App",
  description: "test charts app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
