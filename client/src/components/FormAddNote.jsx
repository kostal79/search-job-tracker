import React from "react";
import { Field, Form, Formik } from "formik";

export default function FormAddNote({ initialValues, onSubmit }) {


  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => (
        <Form
          className=" text-grey-dark text-base font-bold grid grid-cols-2 gap-6"
          type="text"
          name="company"
          onChange={props.handleChange}
        >
          <label htmlFor="company">Company:</label>
          <Field name="company" placeholder="enter company name..." />
          <label htmlFor="vacancy">Vacancy:</label>
          <Field name="vacancy" placeholder="enter vacancy name..." />
          <label name="status">Status:</label>
          <Field as="select" name="status">
            <option value="refused">refused</option>
            <option value="under review">under review</option>
            <option value="interview">interview</option>
            <option value="offer">offer</option>
            <option value="declined offer">declined offer</option>
          </Field>
          <label name="contact">Contact:</label>
          <Field name="contact" placeholder="enter contancts" />
          <label name="comment">Comment:</label>
          <Field as="textarea" name="comment" placeholder="enter comment" />
          <button type="submit" disabled={props.isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
