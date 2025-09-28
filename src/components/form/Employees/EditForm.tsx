"use client";
import { useFormContext } from "@/context/FormContext";
import Form from "../Form";
import Button from "@/components/ui/button/Button";
import InputForm from "../form-elements/InputForm";
import { useNotification } from "@/context/NotificationContext";
import { FaRegSmileBeam } from "react-icons/fa";
import SelectForm from "../form-elements/SelectForm";
import RadioGroup from "../form-elements/RadioButtons";
import { usePrefill } from "@/hooks/usePrefill";

export default function AddForm() {
  const { values, setErrors} = useFormContext();
  const { openNotification } = useNotification();

  usePrefill({
    name: "Nguyễn Văn A",
    phone: "0912345678",
    email: "vanapx2004@gmail.com",
    password: "123456",
    confirmPassword: "123456",
    role: "1",
    status: "1",
    });

  const handleSubmit = (data: Record<string, any> | FormData) => {
    const newErrors: { name: string; message: string }[] = [];

    // validate text fields
    if (!values.name) newErrors.push({ name: "name", message: "Tiêu đề không được để trống" });
    if (!values.description) newErrors.push({ name: "description", message: "Nội dung không được để trống" });
    if (!values.images) newErrors.push({ name: "images", message: "Vui lòng chọn ảnh" });

    setErrors(newErrors);

    if (newErrors.length === 0) {
      if (data instanceof FormData) {
        // multipart submit
        console.log("🚀 Multipart FormData submit:");
        for (const [key, value] of data.entries()) {
          console.log(key, value);
        }
        console.log("Categories:", data); // nếu là multi select
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
      <InputForm label="Tên nhân viên" name="name" placeholder="Nhập tên nhân viên" />
      <InputForm label="Số điện thoại" name="phone" placeholder="Nhập số điện thoại" />
      <InputForm label="Email" name="email" placeholder="Nhập email" type="email"/>
      <InputForm label="Mật khẩu" name="password" placeholder="Nhập mật khẩu" type="password"/>
      <InputForm label="Xác nhận mật khẩu" name="confirmPassword" placeholder="Nhập lại mật khẩu" type="password"/>
      <SelectForm className="w-full" label="Vai trò" name="role" placeholder="Chọn vai trò" options={[{value: '1', label: 'Role 1'}, {value: '2', label: 'Role 2'}]} />
      <RadioGroup title="Trạng thái" name="status" options={
        [
          {
            value: '1',
            label: 'Hoạt động',
          },
          {
            value: '2',
            label: 'Ngừng hoạt động',
          },
          {
            value: '3',
            label: 'Chờ xác nhận',
          }
        ]
      } defaultValue="1"/>
      <div className="flex justify-center">
        <Button type="submit" variant="primary" className="mt-4" size="md">
          Sửa nhân viên
        </Button>
      </div>
    </Form>
  );
}
