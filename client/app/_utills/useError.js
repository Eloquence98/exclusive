import { useState, useRef } from "react";

export function useError() {
  const [error, setError] = useState("");
  const ref = useRef(null);

  return [error, setError, ref];
}
