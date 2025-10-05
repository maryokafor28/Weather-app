import "./globals.css";
import { UnitProvider } from "@/context/UnitContext";
import { ThemeProvider } from "@/context/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UnitProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="navy"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
        </UnitProvider>
      </body>
    </html>
  );
}
