"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn, useSession } from "next-auth/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import toast from "react-hot-toast";

import TextField from "@/components/common/form/TextField";
import Button from "@/components/common/Button";

interface LoginFormValues {
  identity: string;
  password: string;
}

const initialValues: LoginFormValues = {
  identity: "",
  password: "",
};

const validationSchema = Yup.object({
  identity: Yup.string().required("Identity is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const { push } = useRouter();
  const session = useSession();

  useLayoutEffect(() => {
    if (session.status === "authenticated") {
      push("/");
    }
  }, [session.status]);

  const loginHandler = async (values: LoginFormValues) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      const userSession = await getSession();

      if (response?.ok && !response.error) {
        toast.success(`Welcome ${userSession?.user.name || ""} `, {
          id: toastId,
        });

        const url = new URL(response.url as string);
        const urlParams = new URLSearchParams(url.search);
        const callbackUrl = urlParams.get("callbackUrl");

        if (callbackUrl) {
          push(callbackUrl);
        } else {
          push("/");
        }
      }

      if (response?.error) {
        toast.error(response.error, {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error("Something is wrong", {
        id: toastId,
      });
    }
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
              <TextField name="identity" type="text" label="Email or Username" />
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
