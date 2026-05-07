import { theme } from "../styles/colors";

export function ErrorStatus({ error }: { error: string }) {
  return (
    <div style={{ padding: "20px", color: theme.error, border: `1px solid ${theme.error}`, borderRadius: "8px" }}>
      <p>{error}</p>
    </div>
  );
}