"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import toast from "react-hot-toast";

import { getCurrentUser } from "@/services/authServices";
import TextField from "@/components/common/form/TextField";
import Button from "@/components/common/Button";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email address"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const { push } = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      push("/");
    }
  }, [session.status]);

  const loginHandler = async (values: LoginFormValues) => {
    const toastId = toast.loading("Loading...");

    await signIn("credentials", {
      ...values,
      redirect: false,
    }).then(async (callback) => {
      if (callback?.ok && !callback.error) {
        const { name } = await getCurrentUser();

        toast.success(`Welcome ${name || ""} `, {
          id: toastId,
        });
        const url = new URL(callback?.url as string);
        const urlParams = new URLSearchParams(url.search);
        const callbackUrl = urlParams.get("callbackUrl");

        if (callbackUrl) {
          push(callbackUrl);
        } else {
          push("/");
        }
      }

      if (callback?.error) {
        toast.error(callback.error, {
          id: toastId,
        });
      }
    });
  };

  return (
    <div className="w-full py-5">
      <div className="mb-10">
        <h1 className="mt-5 font-bold text-5xl text-center">
          Login to <span className="text-blue-10">Twitter</span>
        </h1>
        <p className="mt-2 font-light text-lg text-center text-slate-11">
          Stay Connected and Engage with Other on Twitter
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={loginHandler}
        validationSchema={validationSchema}
        validateOnMount
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <div className="space-y-8">
              <TextField name="email" type="text" label="Email" />
              <TextField name="password" type="password" label="Password" />
              <Button btnWidth="full" type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "loading ..." : "Login"}
              </Button>
              <p className="text-slate-10 text-center">
                First time using Twitter ?{" "}
                <Link
                  href="/register"
                  className="text-slate-12 underline underline-offset-2 hover:text-slate-12/90 active:text-slate-12/80 transition"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
