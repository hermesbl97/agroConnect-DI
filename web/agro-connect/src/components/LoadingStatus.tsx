import { theme } from "../styles/colors";

interface LoadingMessage {
  message: string;
}

export function LoadingStatus({ message }: LoadingMessage) {
  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "40vh", 
        color: theme.primary, 
        backgroundColor: theme.bg,
        borderRadius: "12px",
        border: `1px dashed ${theme.borders}`
      }}
    >
      {/* Spinner animado usando Tailwind para no complicar el CSS manual */}
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-current mb-4"></div>
      
      <p style={{ 
        fontSize: "1.1rem", 
        fontWeight: 600, 
        fontFamily: "Noto Serif", // Usando la fuente de tu diseño
        color: theme.text 
      }}>
        {message}
      </p>
    </div>
  );
}