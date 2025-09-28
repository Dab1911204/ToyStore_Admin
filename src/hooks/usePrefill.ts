// src/hooks/usePrefill.ts
import { useEffect } from "react";
import { useFormContext } from "@/context/FormContext";

export function usePrefill(defaults: Record<string, any>) {
  const { setValue } = useFormContext();

  // chỉ chạy 1 lần khi mount
  useEffect(() => {
    Object.entries(defaults).forEach(([key, value]) => {
      setValue(key, value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
}
