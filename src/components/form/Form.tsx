"use client";
import { useFormContext } from "@/context/FormContext";
import { FormProps } from "@/types/props";
import React, { FC } from "react";

const Form: FC<FormProps> = ({ onSubmit, children, className, mode = "json" }) => {
  const { values, setSubmitted } = useFormContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (mode === "multipart") {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => formData.append(key, file));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      onSubmit(formData); // 🔥 trả về FormData
    } else {
      onSubmit(values); // 🔥 trả về JSON object
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      encType={mode === "multipart" ? "multipart/form-data" : undefined}
    >
      {children}
    </form>
  );
};

export default Form;
