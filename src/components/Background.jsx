import { bgColor } from "../theme";

export default function Background({ children }) {
  return (
    <div style={{ height: "100%", backgroundColor: bgColor }}>{children}</div>
  );
}
