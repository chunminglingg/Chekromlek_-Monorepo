import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavAfter from "@/components/Organisms/navbar/NavAfter";
import { SideBarLogin } from "@/components/Organisms/sidebar/SieBarLogin";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chekromlek",
  description: `Chekromlek" is a social media platform dedicated to sharing creative projects. It provides a user-friendly interface for artists, designers, and entrepreneurs to showcase their work, connect with others, and inspire a global community of creators`,
  icons: "/icons/logo.svg",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavAfter />
        <div className="h-full w-1/2 max-sm:w-[80%] max-lg:w-[90%] mx-auto">
          <div className="h-[100px]"></div>
          {children}
        </div>
        < SideBarLogin />
      </body>
    </html>
  );
}
