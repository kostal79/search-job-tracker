import React, { ReactNode } from "react";
import { Field, Form, Formik } from "formik";
import { EditableValuesType } from "../types/types";

interface FormAddNoteProps {
  initialValues: EditableValuesType;
  onSubmit: (values: EditableValuesType) => Promise<void>;
}

export default function FormAddNote({
  initialValues,
  onSubmit,
}: FormAddNoteProps): ReactNode {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => (
        <Form
          className=" text-grey-dark text-base font-bold grid grid-cols-2 gap-6"
          name="company"
          onChange={props.handleChange}
        >
          <label htmlFor="company">Company:</label>
          <Field name="company" placeholder="enter company name..." />
          <label htmlFor="vacancy">Vacancy:</label>
          <Field name="vacancy" placeholder="enter vacancy name..." />
          <label htmlFor="status">Status:</label>
          <Field as="select" name="status">
            <option value="refused">refused</option>
            <option value="under review">under review</option>
            <option value="interview">interview</option>
            <option value="offer">offer</option>
            <option value="declined offer">declined offer</option>
          </Field>
          <label htmlFor="contact">Contact:</label>
          <Field name="contact" placeholder="enter contancts" />
          <label htmlFor="comment">Comment:</label>
          <Field as="textarea" name="comment" placeholder="enter comment" />
          <button type="submit" disabled={props.isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
