'use client'
import "../globals.css";
import Navbar from "@/components/common/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Navbar />
        <main >
            <div className="">
                {children}
            </div>
        </main>
    </>
  );
}
