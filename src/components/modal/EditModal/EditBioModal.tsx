"use client";

import { useEffect, useRef } from "react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { useEditBioModal } from "@/hooks/useEditBioModal";
import { useEditBio } from "@/hooks/useEditUser";
import useCurrentUser from "@/hooks/useCurrentUser";

import TextField from "@/components/common/form/TextField";
import TextArea from "@/components/common/form/TextArea";
import Button from "@/components/common/Button";
import Modal from "../Modal";

type ValueType = {
  name: string;
  bio: string;
};

type FormikRefType = FormikProps<ValueType> & React.MutableRefObject<FormikProps<ValueType>>;

const validateSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  bio: Yup.string().max(64, "Maxium character is 64"),
});

const EditBioModal = () => {
  const formikRef = useRef<FormikRefType>(null);

  const { data, isLoading } = useCurrentUser();
  const { onClose } = useEditBioModal();
  const { mutateAsync } = useEditBio();

  const submitHandler = async (valus: ValueType) => {
    const toastId = toast.loading("Updating Profile...");
    try {
      await mutateAsync(valus);
      toast.success("Update successfuly", {
        id: toastId,
      });
    } catch {
      toast.error("Update failure!", {
        id: toastId,
      });
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (formikRef.current && !isLoading) {
      formikRef.current.setFieldValue("name", data?.name || "");
      formikRef.current.setFieldValue("bio", data?.bio || "");
    }
  }, [data?.bio, data?.name]);

  return (
    <Modal onClose={onClose}>
      <div className="w-full h-full">
        <Formik
          innerRef={formikRef}
          initialValues={{ name: "", bio: "" }}
          onSubmit={submitHandler}
          validationSchema={validateSchema}
          validateOnMount
        >
          {({ isValid, isSubmitting }) => (
            <Form className="w-full h-full">
              <div className="h-full flex flex-col gap-y-6 pt-6">
                <TextField label="Name" type="text" name="name" />
                <TextArea label="Bio" name="bio" placeholder="write bio..." maxLength={64} />
                <div className="flex gap-x-5 mt-auto">
                  <Button btnStyle="outline" btnWidth="full" type="button" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    btnStyle="primary"
                    btnWidth="full"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
export default EditBioModal;
