import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import connectDB from "@/lib/db/mongoose";
import { Settings } from "@/lib/db/models";

export async function generateMetadata() {
  try {
    await connectDB();
    const settings = await Settings.findOne().lean();
    
    if (settings) {
      const title = settings.siteTitle 
        ? `${settings.siteName} - ${settings.siteTitle}`
        : `${settings.siteName} - Full Stack Developer Portfolio`;
        
      return {
        title: title,
        description: settings.siteDescription || "Analytical Full Stack Developer with proven experience designing responsive, high-performance web applications.",
        keywords: "full stack developer, MERN stack, React.js, Node.js, JavaScript, Python, web development, portfolio",
      };
    }
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
  }
  
  // Fallback metadata
  return {
    title: "Full Stack Developer Portfolio",
    description: "Analytical Full Stack Developer with proven experience designing responsive, high-performance web applications.",
    keywords: "full stack developer, MERN stack, React.js, Node.js, JavaScript, Python, web development, portfolio",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  var hue = localStorage.getItem('portfolio-theme-hue') || '330';
                  
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.setProperty('--theme-hue', hue);
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <SessionProvider>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
