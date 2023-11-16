"use client";

import { useSession } from "next-auth/react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import { useComment } from "@/hooks/useComment";

import Button from "../common/Button";
import Avatar from "../user/Avatar";

const initialValues = {
  comment: "",
};

const validationSchema = Yup.object({
  comment: Yup.string().required().max(300).trim(),
});

const CommentForm = ({ postId }: { postId: string }) => {
  const session = useSession();
  const { data: user } = useCurrentUser();
  const { mutateAsync } = useComment(postId);

  if (session.status === "loading" || session.status === "unauthenticated") return <></>;

  const submitComment = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    const toastId = toast.loading("loading...");
    try {
      await mutateAsync({ body: values.comment, postId });
      actions.resetForm();
      toast.success("Successfuly commented", {
        id: toastId,
      });
    } catch (err: unknown) {
      toast.error("Comment failure", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex gap-x-5 w-full p-5 border-b border-slate-6">
      <Avatar username={session.data?.user.username as string} src={user?.profileImage} />
      <div className="flex-1">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={submitComment}
        >
          {({ isSubmitting, isValid, getFieldProps }) => (
            <Form>
              <div className="w-full">
                <textarea
                  id="comment"
                  placeholder="Comment ..."
                  className="w-full h-24 p-5 bg-slate-3 rounded-md focus:outline-none resize-none"
                  {...getFieldProps("comment")}
                />
                <div className="w-full flex justify-end mt-2">
                  <Button btnSize="sm" type="submit" disabled={isSubmitting || !isValid}>
                    comment
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default CommentForm;
