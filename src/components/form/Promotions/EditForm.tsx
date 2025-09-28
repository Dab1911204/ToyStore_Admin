"use client";
import { useFormContext } from "@/context/FormContext";
import Form from "../Form";
import Button from "@/components/ui/button/Button";
import { usePrefill } from "@/hooks/usePrefill";
import InputForm from "../form-elements/InputForm";
import TextAreaForm from "../form-elements/TextAreaForm";
import { useNotification } from "@/context/NotificationContext";
import { FaRegSmileBeam } from "react-icons/fa";
import SelectForm from "../form-elements/SelectForm";
import DatePickerForm from "../form-elements/DatePickerForm";

export default function EditForm() {
  const { values, setErrors } = useFormContext();
  const { openNotification } = useNotification();


  // Populate dữ liệu cũ (edit)
  // Populate dữ liệu cũ (edit) chỉ 1 lần khi mount
  usePrefill({
    title:"Tết thiếu nhi",
    description:"jsjsjjsjs",
    discountPercent:10,
    startDate:"2025-10-11",
    endDate:"2026-10-11",
    category:["1","2","3"]
  });


  const handleSubmit = (data: Record<string, any> | FormData) => {
    const newErrors: { name: string; message: string }[] = [];

    // validate text fields
    if (!values.title) newErrors.push({ name: "title", message: "Tiêu đề không được để trống" });

    setErrors(newErrors);

    if (newErrors.length === 0) {
      if (data instanceof FormData) {
        // multipart submit
        console.log("🚀 Multipart FormData submit:");
        for (const [key, value] of data.entries()) {
          console.log(key, value);
        }
      } else {
        // json submit
        console.log("🚀 JSON submit:", data);
      }
      openNotification({
        message: "Custom Notification",
        description: "Nội dung chi tiết thông báo",
        placement: "top",
        duration: 3,
        icon: <FaRegSmileBeam style={{ color: "green" }} />,
        style: { borderLeft: "5px solid green" },
      })
    } else {
      console.log("❌ Errors:", newErrors);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputForm label="Tiêu đề" name="title" placeholder="Nhập tiêu đề" />
      <TextAreaForm label="Mô tả" name="description" placeholder="Nhập nội dung" />
      <InputForm label="% giảm giá" name="discountPercent" placeholder="Nhập % giảm giá" type="number"/>
      <DatePickerForm
        id="startDate"
        name="startDate"
        label="Ngày bắt đầu"
        placeholder="Chọn ngày bắt đầu"
        mode="single"
        required
      />
      <DatePickerForm
        id="endDate"
        name="endDate"
        label="Ngày kết thúc"
        placeholder="Chọn ngày kết thúc"
        mode="single"
        required
      />
      <SelectForm
        name="category"
        label="Sản phẩm áp dụng khuyến mãi"
        mode="multiple"
        placeholder="Chọn sản phẩm áp dụng khuyến mãi"
        options={[
          {
            value:"1",
            label:"Sản phẩm 1"
          },
          {
            value:"2",
            label:"Sản phẩm 2"
          },
          {
            value:"3",
            label:"Sản phẩm 3"
          },
          {
            value:"4",
            label:"Sản phẩm 4"
          },
          {
            value:"5",
            label:"Sản phẩm 5"
          },
          {
            value:"6",
            label:"Sản phẩm 6"
          },
        ]}
      />
      <div className="flex justify-center">
        <Button type="submit" variant="primary" className="mt-4" size="md">
          Thêm khuyến mãi
        </Button>
      </div>
    </Form>
  );
}
