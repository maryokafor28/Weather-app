import "./globals.css";
import { UnitProvider } from "@/context/UnitContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AutoThemeProvider } from "@/context/AutoTheme";

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
            <AutoThemeProvider>{children}</AutoThemeProvider>
          </ThemeProvider>
        </UnitProvider>
      </body>
    </html>
  );
}
