"use client";

import Button from "@/components/common/Button";
import TextField from "@/components/common/form/TextField";
import { Formik, Form, FormikHelpers } from "formik";
import Link from "next/link";
import * as Yup from "yup";

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
    .max(15, "Username must be at most 15 characters"),
  password: Yup.string().required("Password is required"),
});

export default function RegisterPage() {
  const RegisterHandler = (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    console.log(values);
  };

  return (
    <div className="w-full pt-20 py-10">
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
        {({}) => (
          <Form>
            <div className="space-y-8">
              <TextField name="email" type="text" label="Email" />
              <TextField name="name" type="text" label="Name" />
              <TextField name="username" type="text" label="Username" maxLength={15} />
              <TextField name="password" type="password" label="Password" />
              <Button btnWidth="full">Register</Button>
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
