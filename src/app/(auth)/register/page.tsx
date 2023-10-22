"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import Button from "@/components/common/Button";
import TextField from "@/components/common/form/TextField";
import { registerUser } from "@/services/authServices";
import { useEffect } from "react";

interface RegisterFormValues {
  email: string;
  name: string;
  username: string;
  password: string;
}

const initialValues: RegisterFormValues = {
  email: "",
  name: "",
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email address"),
  name: Yup.string().required("Name is required"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be at most 16 characters")
    .matches(/^[a-z][a-z0-9_-]{2,16}$/, "Enter valid username (Only a-z , 0-9)"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Your password needs to contain one uppercase letter, one symbol, and a number"
    ),
});

export default function RegisterPage() {
  const { push } = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.status === "authenticated") push("/");
  }, [session.status]);

  const RegisterHandler = async (
    { email, name, password, username }: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    const toastId = toast.loading("Registering ...");
    try {
      await registerUser({ email, name, password, username });

      toast.success("Successfuly registered", {
        id: toastId,
      });

      await signIn("credentials", {
        identity: username || email,
        password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok && !callback.error) {
          push("/");
        }
      });
    } catch (err: any) {
      if (err.response.status === 400) {
        actions.setErrors(err.response.data.errors);
      }
      toast.error("Register failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="w-full py-10">
      <div className="mb-10">
        <h1 className="mt-5 font-bold text-5xl text-center">Create Your Account</h1>
        <p className="mt-2 font-light text-lg text-center text-slate-11">
          Sign up for free and be part of the conversation
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={RegisterHandler}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <div className="space-y-8">
              <TextField name="email" type="text" label="Email" />
              <TextField name="name" type="text" label="Name" />
              <TextField name="username" type="text" label="Username" maxLength={16} />
              <TextField name="password" type="password" label="Password" />
              <Button
                btnWidth="full"
                type="submit"
                className="!mt-14"
                disabled={!isValid || isSubmitting}
              >
                Register
              </Button>
              <p className="text-slate-10 text-center">
                Alredy have an account ?{" "}
                <Link
                  href="/login"
                  className="text-slate-12 underline underline-offset-2 hover:text-slate-12/90 active:text-slate-12/80 transition"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
