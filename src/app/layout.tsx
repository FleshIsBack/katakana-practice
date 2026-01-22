import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "カタカナ Practice | Learn Katakana",
  description: "Practice Japanese Katakana characters by row with instant feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
