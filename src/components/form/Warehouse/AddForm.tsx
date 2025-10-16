"use client";
import { useFormContext } from "@/context/FormContext";
import Form from "../Form";
import Button from "@/components/ui/button/Button";
import InputForm from "../form-elements/InputForm";
import { useNotification } from "@/context/NotificationContext";
import { FaRegSmileBeam } from "react-icons/fa";
import SelectForm from "../form-elements/SelectForm";
import { useEffect, useState } from "react";
import { ProductService } from "@/services/productService";
import { SupplierService } from "@/services/supplierService";
import { useRouter } from "next/navigation";
import { WarehouseService } from "@/services/warehouseService";

type Option = {
    value: string;
    label: string;
};

export default function AddForm() {
    const { values, setValue, setErrors } = useFormContext();
    const { openNotification } = useNotification();
    const [optionSelectProduct, setOptionSelectProduct] = useState<Option[]>([]);
    const [optionSelectSupplier, setOptionSelectSupplier] = useState<Option[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const resOption = await ProductService.getListProduct("/api/Product/admin");
                const options: Option[] = resOption.result.items.map((item: any) => ({
                    value: item.id,
                    label: `${item.productName} - ${item.supplierName}`,
                }));
                setOptionSelectProduct(options);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSupplier = async () => {
            try {
                const resOption = await SupplierService.getListSupplier("/api/Supplier/Admin");
                const options: Option[] = resOption.result.items.map((item: any) => ({
                    value: item.id,
                    label: item.supplierName,
                }));
                setOptionSelectSupplier(options);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
        fetchSupplier();
    }, []);

    // ✅ Tự động tính tổng tiền khi có thay đổi giá hoặc số lượng
    useEffect(() => {
        const price = parseFloat(values.price) || 0;
        const quantity = parseInt(values.quantity) || 0;
        const totalValue = price * quantity;
        setTotal(totalValue);

        // nếu bạn muốn lưu vào FormContext để gửi lên backend luôn:
        setValue("total", totalValue);
    }, [values.price, values.quantity]);

    const handleSubmit = async (data: Record<string, any> | FormData) => {
        const newErrors: { name: string; message: string }[] = [];

        if (!values.ProductIds) newErrors.push({ name: "ProductIds", message: "Sản phẩm không được để trống" });
        if (!values.SupplierIds) newErrors.push({ name: "SupplierIds", message: "Nhà cung cấp không được để trống" });
        if (!values.price) newErrors.push({ name: "price", message: "Giá không được để trống" });
        if (!values.quantity) newErrors.push({ name: "quantity", message: "Số lượng không được để trống" });

        setErrors(newErrors);

        if (newErrors.length === 0) {
            setIsLoading(true); // 🔹 Bắt đầu loading
            try {
                const res = await WarehouseService.createWarehouse(data);
                if (res.success) {
                    openNotification({
                        message: "Thêm sản phẩm vào kho thành công",
                        description: "Sản phẩm đã được thêm vào hệ thống.",
                        placement: "top",
                        duration: 3,
                        icon: <FaRegSmileBeam style={{ color: "green" }} />,
                        style: { borderLeft: "5px solid green" },
                    });
                    router.push("/warehouses");
                    router.refresh();
                } else {
                    openNotification({
                        message: "Thêm sản phẩm vào kho lỗi",
                        description: "Sản phẩm không được thêm vào hệ thống",
                        placement: "top",
                        duration: 3,
                        icon: <FaRegSmileBeam style={{ color: "red" }} />,
                        style: { borderLeft: "5px solid red" },
                    });
                }
            } catch (error) {
                openNotification({
                    message: "Thêm sản phẩm vào kho lỗi",
                    description: "Sản phẩm không được thêm vào hệ thống: " + error,
                    placement: "top",
                    duration: 3,
                    icon: <FaRegSmileBeam style={{ color: "red" }} />,
                    style: { borderLeft: "5px solid red" },
                });
            } finally {
                setIsLoading(false); // 🔹 Tắt loading
            }
        } else {
            console.log("❌ Errors:", newErrors);
        }
    };

    return (
        <Form onSubmit={handleSubmit} mode="multipart">
            <SelectForm
                name="IdProduct"
                label="Sản phẩm nhập vào kho"
                placeholder="Chọn sản phẩm nhập vào kho"
                options={optionSelectProduct}
            />
            {/* ✅ Hàng ngang gồm 3 phần: Giá - Số lượng - Tổng tiền */}
            <div className="flex gap-3 mt-4 items-end">
                <InputForm
                    label="Giá"
                    name="price"
                    className="w-1/3"
                    placeholder="Nhập giá"
                    type="number"
                />

                <InputForm
                    label="Số lượng"
                    name="quantity"
                    className="w-1/3"
                    placeholder="Nhập số lượng"
                    type="number"
                />

                {/* ✅ Tổng tiền nằm cùng hàng với input */}
                <div className="w-1/3 flex items-center h-[42px] border rounded-lg px-3 bg-gray-50">
                    <span className="text-gray-700 font-medium">
                        Tổng tiền:
                    </span>
                    <span className="ml-2 text-gray-900 font-semibold">
                        {total ? total.toLocaleString("vi-VN") + " VNĐ" : "0 VNĐ"}
                    </span>
                </div>
            </div>

            <div className="flex justify-center">
                <Button
                    type="submit"
                    variant="primary"
                    className="mt-4"
                    size="md"
                    disabled={isLoading} // 🔹 Khi đang loading thì disable
                >
                    {isLoading ? (
                        <>
                            <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                            Đang thêm...
                        </>
                    ) : (
                        "Thêm sản phẩm vào kho"
                    )}
                </Button>
            </div>
        </Form>
    );
}
