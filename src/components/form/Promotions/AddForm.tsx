"use client";
import { useFormContext } from "@/context/FormContext";
import Form from "../Form";
import Button from "@/components/ui/button/Button";
import InputForm from "../form-elements/InputForm";
import TextAreaForm from "../form-elements/TextAreaForm";
import DatePickerForm from "../form-elements/DatePickerForm";
import { useNotification } from "@/context/NotificationContext";
import { FaRegSmileBeam } from "react-icons/fa";
import SelectForm from "../form-elements/SelectForm";
import { useEffect, useState } from "react";
import { ProductService } from "@/services/productService";
import { PromotionService } from "@/services/promotionService";
import { useRouter } from "next/navigation";

type Option = {
  value: string;
  label: string;
};

export default function AddForm() {
  const { values, setErrors } = useFormContext();
  const { openNotification } = useNotification();
  const [optionSelect, setOptionSelect] = useState<Option[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resOption = await ProductService.getListProduct("/api/Product/admin");
        console.log(resOption);
        const options: Option[] = resOption.result.items.map((item: any) => ({
          value: item.id,
          label: item.productName,
        }));
        setOptionSelect(options);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const handleSubmit = async (data: Record<string, any> | FormData) => {
    const newErrors: { name: string; message: string }[] = [];

    // validate text fields
    if (!values.Title) newErrors.push({ name: "Title", message: "Tiêu đề không được để trống" });
    if (!values.StartDate) newErrors.push({ name: "StartDate", message: "Ngày bắt đầu không được để trống" });
    if (!values.EndDate) newErrors.push({ name: "EndDate", message: "Ngày kết thúc không được để trống" });
    if (!values.ProductIds) newErrors.push({ name: "ProductIds", message: "Sản phẩm không được để trống" });
    if (!values.DiscountPercent) newErrors.push({ name: "DiscountPercent", message: "Phần trăm không được để trống" });

    setErrors(newErrors);

    if (newErrors.length === 0) {
      try {
        const res = await PromotionService.createPromotion(data);
        if(res.success){
          openNotification({
            message: "Thêm khuyến mãi thành công",
            description: "Khuyến mãi đã được thêm vào hệ thống.",
            placement: "top",
            duration: 3,
            icon: <FaRegSmileBeam style={{ color: "green" }} />,
            style: { borderLeft: "5px solid green" },
          });
          router.push("/promotions");
          router.refresh();
        }else{
          openNotification({
            message: "Thêm khuyến mãi lỗi",
            description: "Khuyến mãi không được thêm vào hệ thống",
            placement: "top",
            duration: 3,
            icon: <FaRegSmileBeam style={{ color: "red" }} />,
            style: { borderLeft: "5px solid red" },
          });
        }
      } catch (error) {
        openNotification({
            message: "Thêm khuyến mãi lỗi",
            description: "Khuyến mãi không được thêm vào hệ thống: "+error,
            placement: "top",
            duration: 3,
            icon: <FaRegSmileBeam style={{ color: "red" }} />,
            style: { borderLeft: "5px solid red" },
          });
      }
    } else {
      console.log("❌ Errors:", newErrors);
    }
  };

  return (
    <Form onSubmit={handleSubmit} mode="multipart" method="POST">
      <InputForm label="Tiêu đề" name="Title" placeholder="Nhập tiêu đề" />
      <TextAreaForm label="Mô tả" name="Description" placeholder="Nhập nội dung" />
      <InputForm label="% giảm giá" name="DiscountPercent" placeholder="Nhập % giảm giá" type="number" />
      <DatePickerForm
        id="StartDate"
        name="StartDate"
        label="Ngày bắt đầu"
        placeholder="Chọn ngày bắt đầu"
        mode="single"
        required
      />
      <DatePickerForm
        id="EndDate"
        name="EndDate"
        label="Ngày kết thúc"
        placeholder="Chọn ngày kết thúc"
        mode="single"
        required
      />
      <SelectForm
        name="ProductIds"
        label="Sản phẩm áp dụng khuyến mãi"
        mode="multiple"
        placeholder="Chọn sản phẩm áp dụng khuyến mãi"
        options={optionSelect}
      />
      <div className="flex justify-center">
        <Button type="submit" variant="primary" className="mt-4" size="md">
          Thêm khuyến mãi
        </Button>
      </div>
    </Form>
  );
}
