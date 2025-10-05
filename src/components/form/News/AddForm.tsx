"use client";
import { useFormContext } from "@/context/FormContext";
import Form from "../Form";
import Button from "@/components/ui/button/Button";
import InputForm from "../form-elements/InputForm";
import TextAreaForm from "../form-elements/TextAreaForm";
import ImageInputForm from "../form-elements/ImageInputForm";
import { useNotification } from "@/context/NotificationContext";
import { FaRegSmileBeam } from "react-icons/fa";
import { NewsService } from "@/services/newsService";  // ✅ import service
import { useRouter } from "next/navigation";     // ✅ import router

export default function AddForm() {
  const { values, setErrors } = useFormContext();
  const { openNotification } = useNotification();
  const router = useRouter();

  const handleSubmit = async (data: Record<string, any> | FormData) => {
    const newErrors: { name: string; message: string }[] = [];

    // validate text fields
    if (!values.title) newErrors.push({ name: "title", message: "Tiêu đề không được để trống" });
    if (!values.content) newErrors.push({ name: "content", message: "Nội dung không được để trống" });
    if (!values.image) newErrors.push({ name: "image", message: "Vui lòng chọn ảnh" });

    setErrors(newErrors);

    if (newErrors.length === 0) {
      try {
        console.log("🚀 Submit data:", data);

        // ✅ Gọi API thêm tin tức
        await NewsService.createNews(data);

        // ✅ Hiển thị thông báo
        openNotification({
          message: "Thành công",
          description: "Tin tức đã được thêm thành công!",
          placement: "top",
          duration: 3,
          icon: <FaRegSmileBeam style={{ color: "green" }} />,
          style: { borderLeft: "5px solid green" },
        });

        // ✅ Quay về trang danh sách và refresh
        // router.push("/news");
        // router.refresh();
      } catch (error) {
        console.error("❌ Lỗi khi thêm tin tức:", error);
        openNotification({
          message: "Thất bại",
          description: "Không thể thêm tin tức. Vui lòng thử lại!",
          placement: "top",
          duration: 3,
          style: { borderLeft: "5px solid red" },
        });
      }
    } else {
      console.log("❌ Errors:", newErrors);
    }
  };

  return (
    <Form onSubmit={handleSubmit} mode="multipart" method="POST">
      <InputForm label="Tiêu đề" name="title" placeholder="Nhập tiêu đề" />
      <ImageInputForm label="Hình ảnh" name="image" />
      <TextAreaForm label="Nội dung" name="content" placeholder="Nhập nội dung" />
      <div className="flex justify-center">
        <Button type="submit" variant="primary" className="mt-4" size="md">
          Thêm Tin Tức
        </Button>
      </div>
    </Form>
  );
}
