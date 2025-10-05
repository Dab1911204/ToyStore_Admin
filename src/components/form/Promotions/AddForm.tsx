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

type Option = {
  value: string;
  label: string;
};

export default function AddForm() {
  const { values, setErrors } = useFormContext();
  const { openNotification } = useNotification();
  const [optionSelect, setOptionSelect] = useState<Option[]>([]);

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
    if (!values.title) newErrors.push({ name: "title", message: "Tiêu đề không được để trống" });

    setErrors(newErrors);

    if (newErrors.length === 0) {
      try {
        console.log("🚀 Multipart FormData submit:");
        
        // 🧩 Chuyển toàn bộ FormData sang Object để debug dễ hơn
        if (data instanceof FormData) {
          const obj: Record<string, any> = {};
          data.forEach((value, key) => {
            if (obj[key]) {
              obj[key] = Array.isArray(obj[key]) ? [...obj[key], value] : [obj[key], value];
            } else {
              obj[key] = value;
            }
          });
          console.log("🔍 FormData -> Object:", obj);
        }

        const res = await PromotionService.createPromotion(data);
        console.log(res);

        openNotification({
          message: "Thêm khuyến mãi thành công",
          description: "Khuyến mãi đã được thêm vào hệ thống.",
          placement: "top",
          duration: 3,
          icon: <FaRegSmileBeam style={{ color: "green" }} />,
          style: { borderLeft: "5px solid green" },
        });
      } catch (error) {
        console.log("❌ Lỗi khi thêm khuyến mãi:", error);
      }
    } else {
      console.log("❌ Errors:", newErrors);
    }
  };

  return (
    <Form onSubmit={handleSubmit} mode="multipart" method="POST">
      <InputForm label="Tiêu đề" name="title" placeholder="Nhập tiêu đề" />
      <TextAreaForm label="Mô tả" name="description" placeholder="Nhập nội dung" />
      <InputForm label="% giảm giá" name="discountPercent" placeholder="Nhập % giảm giá" type="number" />
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
        name="productIds"
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
