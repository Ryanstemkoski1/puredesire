import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import './Users.css';

const UserForm = (props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string()
            .email("You have enter an invalid email address")
            .required("Required"),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
            // .required("Required"),
        role: Yup.string()
            .required("Required"),
    });
    console.log(props);
    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup>
                        <Field name="name" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="name"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field name="email" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="email"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field name="password" type="password"
                               className="form-control" />
                        <ErrorMessage
                            name="password"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field as="select" name="role" className="form-control">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </Field>
                        <ErrorMessage
                            name="role"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>
                    <Button variant="danger" size="lg"
                            block="block" type="submit">
                        {props.children}
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default UserForm;