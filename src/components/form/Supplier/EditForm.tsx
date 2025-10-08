"use client";
import { useFormContext } from "@/context/FormContext";
import Form from "../Form";
import Button from "@/components/ui/button/Button";
import InputForm from "../form-elements/InputForm";
import { useNotification } from "@/context/NotificationContext";
import { FaRegSmileBeam } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { EditFormProps } from "@/types/props";
import { useEffect } from "react";

type InfoSupplier = {
    SupplierName: string;
    Phone: string;
    Email: string;
    Address: string;
    Note: string;
};

export default function EditForm({ id, supplier }: EditFormProps & { supplier?: InfoSupplier }) {
    const { values, setValue, setErrors } = useFormContext();
    const { openNotification } = useNotification();
    const router = useRouter();

    // Prefill form khi mở
    useEffect(() => {
        if (supplier) {
            setValue("name", supplier.SupplierName);
            setValue("phone", supplier.Phone);
            setValue("email", supplier.Email);
            setValue("address", supplier.Address);
            setValue("note", supplier.Note ?? "");
        }
    }, [supplier, setValue]);


    const handleSubmit = async (data: Record<string, any> | FormData) => {
        const newErrors: { name: string; message: string }[] = [];

        // validate các trường
        if (!values.name) newErrors.push({ name: "name", message: "Tên không được để trống" });
        if (!values.phone) newErrors.push({ name: "phone", message: "Số điện thoại không được để trống" });
        if (!values.email) newErrors.push({ name: "email", message: "Email không được để trống" });
        if (!values.address) newErrors.push({ name: "address", message: "Địa chỉ không được để trống" });

        setErrors(newErrors);

        if (newErrors.length === 0) {
            try {
                const res = await fetch(`/api/Supplier/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }).then(r => r.json());

                if (res.success) {
                    openNotification({
                        message: "Sửa nhà cung cấp thành công",
                        description: "Thông tin nhà cung cấp đã được cập nhật.",
                        placement: "top",
                        duration: 3,
                        icon: <FaRegSmileBeam style={{ color: "green" }} />,
                        style: { borderLeft: "5px solid green" },
                    });
                    router.push("/suppliers");
                    router.refresh();
                } else {
                    openNotification({
                        message: "Lỗi sửa nhà cung cấp",
                        description: res.errors?.join(", ") || "Không thể cập nhật thông tin",
                        placement: "top",
                        duration: 3,
                        icon: <FaRegSmileBeam style={{ color: "red" }} />,
                        style: { borderLeft: "5px solid red" },
                    });
                }
            } catch (error) {
                openNotification({
                    message: "Lỗi",
                    description: "Có lỗi xảy ra: " + error,
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
            <InputForm label="Tên nhà cung cấp" name="name" placeholder="Nhập tên nhà cung cấp" />
            <InputForm label="Số điện thoại" name="phone" placeholder="Nhập số điện thoại" />
            <InputForm label="Email" name="email" placeholder="Nhập email" />
            <InputForm label="Địa chỉ" name="address" placeholder="Nhập địa chỉ" />
            <InputForm label="Ghi chú" name="note" placeholder="Nhập ghi chú" />
            <div className="flex justify-center">
                <Button type="submit" variant="primary" className="mt-4" size="md">
                    Sửa Nhà Cung Cấp
                </Button>
            </div>
        </Form>
    );
}
