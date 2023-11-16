"use client";
import { useSession } from "next-auth/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { useAddPost } from "@/hooks/usePosts";

import Button from "../common/Button";

const initialValues = {
  tweet: "",
};

const validationSchema = Yup.object({
  tweet: Yup.string().required().max(300).trim(),
});

const PostForm = () => {
  const session = useSession();
  const { mutateAsync: addPost } = useAddPost();
  const submitTweet = async ({ tweet }: typeof initialValues) => {
    const toastId = toast.loading("loading...");

    try {
      await addPost(tweet);
      toast.success("Successfuly added post", {
        id: toastId,
      });
    } catch (err: unknown) {
      console.log(err);
      toast.error("Failed to add post", {
        id: toastId,
      });
    }
  };

  if (session.status === "loading" || session.status === "unauthenticated") return <></>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={submitTweet}
    >
      {({ isSubmitting, isValid, getFieldProps }) => (
        <Form>
          <div className="w-full p-5 border-b border-slate-6">
            <textarea
              id="tweet"
              placeholder="Just Write..."
              className="w-full h-24 p-5 bg-slate-3 rounded-md focus:outline-none resize-none"
              {...getFieldProps("tweet")}
            />
            <div className="w-full flex justify-end mt-2">
              <Button btnSize="sm" type="submit" disabled={isSubmitting || !isValid}>
                Tweet
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default PostForm;
