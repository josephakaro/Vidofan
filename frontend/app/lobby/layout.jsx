import { ThemeProvider } from "@/components/ThemeProvider";

export default function LobbyLayout({ children }) {
  return (
    <div className="flex flex-col justify-center items-center align-middle h-screen">
        <ThemeProvider
            attribute="class"
          >
            {children}
          </ThemeProvider>
    </div>
  );
}