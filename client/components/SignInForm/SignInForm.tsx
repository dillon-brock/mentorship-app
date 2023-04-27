import { FormEvent, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { getUser, signIn } from "../../services/auth/auth";

import styles from './signInForm.module.css';
import globalStyles from '../../global.module.css';

type FormErrors = {
  email?: string;
  password?: string;
}

export default function SignInForm() {

  const { setUser } = useUserContext();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const isFormInvalid = () => {
    let invalid: boolean = false;

    if (emailInputRef.current && (
      emailInputRef.current.value === '' || 
      !emailInputRef.current.checkValidity())) {
      setFormErrors({ ...formErrors, email: 'Please enter a valid email.'});
      invalid = true;
    }
    if (passwordInputRef.current && (
      passwordInputRef.current.value === '' || 
      passwordInputRef.current.value.length < 6)) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 6 characters'});
      invalid = true;
    }

    return invalid;
  };

  const handleChangeEmail = () => {
    if (formErrors.email) setFormErrors({ ...formErrors, email: ''});
  }

  const handleChangePassword = () => {
    if (formErrors.password) setFormErrors({ ...formErrors, password: ''});
  }

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const signInResponse = await signIn({ 
      email: formData.get('email') as string, 
      password: formData.get('password') as string 
    });
    if (signInResponse.status) {
      if (signInResponse.message === 'Invalid email') {
        setFormErrors({ 
          ...formErrors, 
          email: `The email you've entered is not connected to an account. Please sign up or try a different email.`
        })
      }
      if (signInResponse.message === 'Invalid password') {
        setFormErrors({ 
          ...formErrors, 
          password: `The password you've entered is incorrect.`
        });
      }
      return;
    }
    const userInfo = await getUser();
    setUser(userInfo);
  }

  return (
    <div>
      <h3 className={styles.title}>Sign In</h3>
      <Form className={styles.form} onSubmit={handleSignIn}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={globalStyles.authFormLabel}>Email address</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="email" 
            placeholder="name@example.com" 
            name="email" 
            ref={emailInputRef} 
            onChange={handleChangeEmail}
          />
          {formErrors.email &&
            <Form.Text className="text-danger">{formErrors.email}</Form.Text>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={globalStyles.authFormLabel}>Password</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="password" 
            placeholder="******" 
            name="password" 
            ref={passwordInputRef} 
            onChange={handleChangePassword}
          />
          {formErrors.password &&
            <Form.Text className="text-danger">{formErrors.password}</Form.Text>
          }
        </Form.Group>
        <div className={styles.buttonContainer}>
          <Button type="submit" className={styles.button}>
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  )
}