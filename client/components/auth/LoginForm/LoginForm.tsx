import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Meta, Button, PageLoader, Input } from 'components/shared';
import { useAuth, useToast } from 'contexts';
import styles from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(6),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const { setToast } = useToast();

  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <Meta title="Log In" />
      {submitting && <PageLoader />}
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={async ({ email, password }) => {
          try {
            await login(email, password);
          } catch (error) {
            setToast('error', error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <h1 className={styles.pageHeading}> Login </h1>
            <Input
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              type="email"
              error={Boolean(errors.email && touched.email)}
            />
            {errors.email && touched.email ? (
              <div className={styles.error}>{errors.email}</div>
            ) : null}
            <Input
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              type="password"
              error={Boolean(errors.password && touched.password)}
            />
            {errors.password && touched.password ? (
              <div className={styles.error}>{errors.password}</div>
            ) : null}

            <div className={styles.bottom}>
              <Button
                type="submit"
                title="Log In"
                disabled={submitting}
                className={styles.button}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;