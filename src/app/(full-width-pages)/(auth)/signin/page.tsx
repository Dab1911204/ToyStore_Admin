import SignInForm from "@/components/auth/SignInForm";
import { FormProvider } from "@/context/FormContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

export default function SignIn() {
  return (
    <>
      <FormProvider >
        <SignInForm />
      </FormProvider>
    </>
  );
}
