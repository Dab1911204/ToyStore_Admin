import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1,"NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME không được để trống"),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1,"NEXT_PUBLIC_CLOUDINARY_API_KEY không được để trống"),
  NEXT_PUBLIC_CLOUDINARY_API_SECRET: z.string().min(1,"NEXT_PUBLIC_CLOUDINARY_API_SECRET không được để trống"),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  NEXT_PUBLIC_CLOUDINARY_API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});
if (!configProject.success) {
  console.error("❌ Lỗi biến môi trường:", configProject.error.format());
  throw new Error("Các giá trị khai báo trong file .env không hợp lệ");
}

const envConfig = configProject.data;
export default envConfig;