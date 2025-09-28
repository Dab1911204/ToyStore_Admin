"use client";
import { useFormContext } from "@/context/FormContext";
import Form from "../Form";
import Button from "@/components/ui/button/Button";
import { usePrefill } from "@/hooks/usePrefill";
import InputForm from "../form-elements/InputForm";
import { useNotification } from "@/context/NotificationContext";
import { FaRegSmileBeam } from "react-icons/fa";
import SelectForm from "../form-elements/SelectForm";

export default function EditForm() {
  const { values, setErrors } = useFormContext();
  const { openNotification } = useNotification();


  // Populate dữ liệu cũ (edit)
  // Populate dữ liệu cũ (edit) chỉ 1 lần khi mount
  usePrefill({
    name: "Trung Thu",
    categoryParent: '2',
  });


  const handleSubmit = (data: Record<string, any> | FormData) => {
    const newErrors: { name: string; message: string }[] = [];

    // validate text fields
    if (!values.title) newErrors.push({ name: "title", message: "Tiêu đề không được để trống" });
    if (!values.content) newErrors.push({ name: "content", message: "Nội dung không được để trống" });
    if (!values.image) newErrors.push({ name: "image", message: "Vui lòng chọn ảnh" });

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
      <InputForm label="Tên danh mục" name="name" placeholder="Nhập tên danh mục" />
      <SelectForm className="w-full" label="Danh mục cha" name="categoryParent" placeholder="Chọn danh mục cha" options={[{value: '1', label: 'Danh mục cha 1'}, {value: '2', label: 'Danh mục cha 2'}]} />
      <div className="flex justify-center">
        <Button type="submit" variant="primary" className="mt-4" size="md">
          Thêm danh mục
        </Button>
      </div>
    </Form>
  );
}
