"use client";
import React, { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import { SelectFieldProps } from "@/types/props";
import BaseSelect from "../select/select";

export default function SelectForm({
  name,
  label,
  size = "md",
  options,
  mode,
  placeholder,
  disabled = false,
  className = "",
  hint,
}: SelectFieldProps) {
  const { values, setValue, errors, setErrors, clearError, submitted } =
    useFormContext();

  const [touched, setTouched] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fieldErrors = errors.filter((err) => err.name === name);
  const latestError = fieldErrors[fieldErrors.length - 1];
  const showError = submitted || touched;
  const hasError = !!latestError && showError;
  const message = hint ?? (showError ? latestError?.message : undefined);

  const currentValue = values[name] ?? (mode === "multiple" ? [] : undefined);

  const handleChange = (val: string[] | string) => {
    setValue(name, val);

    if (touched) {
      if (!val || (Array.isArray(val) && val.length === 0)) {
        setErrors((prev) => [
          ...prev,
          { name, message: "Vui lòng chọn ít nhất một giá trị" },
        ]);
      } else {
        clearError(name);
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!currentValue || (Array.isArray(currentValue) && currentValue.length === 0)) {
      setErrors((prev) => [
        ...prev,
        { name, message: "Vui lòng chọn ít nhất một giá trị" },
      ]);
    } else {
      clearError(name);
    }
  };

  return (
    <BaseSelect
      id={name}
      size={size}
      name={name}
      label={label}
      options={options}
      mode={mode}
      placeholder={placeholder}
      disabled={disabled}
      value={currentValue}
      error={hasError}
      message={message}
      onChange={handleChange}
      onBlur={handleBlur}
      onSearch={setSearchValue}
      searchValue={searchValue}
      className={className}
    />
  );
}
