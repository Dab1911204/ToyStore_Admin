"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TableContextType {
  urlApi: string;  
  setParam: (name: string, value: string | number | null) => void;
}

interface TableContextProviderProps {
  children: ReactNode;
  initialUrl?: string; // URL mặc định từ bên ngoài
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableContextProvider = ({ children, initialUrl = "" }: TableContextProviderProps) => {
  const [urlApi, setUrlApi] = useState<string>(initialUrl);

  const setParam = (name: string, value: string | number | null) => {
    const url = new URL(urlApi);
    
    if (value === "" || value === null) {
      url.searchParams.delete(name); // xóa param nếu rỗng
    } else {
      url.searchParams.set(name, value.toString()); // set hoặc update param
    }

    setUrlApi(url.toString());
  };

  return (
    <TableContext.Provider value={{ urlApi, setParam }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = (): TableContextType => {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error("useTableContext phải được dùng bên trong TableContextProvider");
  return ctx;
};
