import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { checkForExistingUser } from '../../services/auth';

import styles from './teacherSignUpForm.module.css';
import globalStyles from '../../global.module.css';
import { FormErrors } from './types';

type Props = {
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function TeacherSignUpForm({ setEmail, setPassword, setFirstName, setLastName, setStep }: Props) {

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showInvalidConfirmation, setShowInvalidConfirmation] = useState<boolean>(false);

  const isFormInvalid = () => {
    let invalid: boolean = false;

    if (firstNameInputRef.current && firstNameInputRef.current.value === '') {
      setFormErrors({ 
        ...formErrors, 
        firstName: 'First name is required'
      });
      invalid = true;
      return invalid;
    }

    if (lastNameInputRef.current && lastNameInputRef.current.value === '') {
      setFormErrors({ 
        ...formErrors, 
        lastName: 'Last name is required'
      });
      invalid = true;
      return invalid;
    }

    if (emailInputRef.current && (emailInputRef.current.value === '' || !emailInputRef.current.checkValidity())) {
      setFormErrors({ 
        ...formErrors, 
        email: 'Please enter a valid email.'
      });
      invalid = true;
      return invalid;
    }
    if (passwordInputRef.current && (passwordInputRef.current.value === '' || passwordInputRef.current.value.length < 6)) {
      setFormErrors({ 
        ...formErrors, 
        password: 'Password must be at least 6 characters'
      });
      invalid = true;
      return invalid;
    }
    if (passwordConfirmationRef.current &&
      passwordInputRef.current &&
      passwordConfirmationRef.current.value !== passwordInputRef.current.value) {
      setFormErrors({ 
        ...formErrors, 
        passwordConfirmation: 'Passwords do not match.'
      });
      invalid = true;
      return invalid;
    }

    return invalid;
  };

  const handleChangeFirstName = () => {
    if (formErrors.firstName) 
      setFormErrors({ ...formErrors, firstName: ''});
  }

  const handleChangeLastName = () => {
    if (formErrors.lastName) 
      setFormErrors({ ...formErrors, lastName: ''});
  }

  const handleChangeEmail = () => {
    if (formErrors.email) 
      setFormErrors({ ...formErrors, email: ''});
  }

  const handleChangePassword = () => {
    if (formErrors.password) 
      setFormErrors({ ...formErrors, password: ''});
  }

  const handleChangePasswordConfirmation = () => {
    if (passwordConfirmationRef.current &&
      passwordInputRef.current &&
      passwordConfirmationRef.current.value === passwordInputRef.current.value) {
      setShowInvalidConfirmation(false);
    } else {
      setShowInvalidConfirmation(true);
      setFormErrors({ ...formErrors, passwordConfirmation: '' });
    }
  }

  const handleNext = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const existingUser = await checkForExistingUser(formData.get('email'));
    if (existingUser) {
      setFormErrors({ 
        ...formErrors, 
        email: 'This email is already being used by another account. Please sign in or use a different email.' 
      })
      return;
    }
    setEmail(formData.get('email') as string);
    setPassword(formData.get('password') as string);
    setFirstName(formData.get('firstName') as string);
    setLastName(formData.get('lastName') as string);
    setStep(2);
  }


  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Teacher Sign Up</h3>
      <Form className={styles.form} onSubmit={handleNext}>
        <Row xl={2}>
          <Form.Group className="mb-2" controlId="firstName">
            <Form.Label className={globalStyles.authFormLabel}>First Name</Form.Label>
            <Form.Control 
              className={styles.input} 
              type="text" 
              placeholder="Jane"
              name="firstName" 
              onChange={handleChangeFirstName} 
              ref={firstNameInputRef}
            />
            {formErrors.firstName && 
              <Form.Text className="text-danger">{formErrors.firstName}</Form.Text>
            }
          </Form.Group>

          <Form.Group className="mb-2" controlId="lastName">
            <Form.Label className={globalStyles.authFormLabel}>Last Name</Form.Label>
            <Form.Control 
              className={styles.input} 
              type="text"
              placeholder="Doe" 
              name="lastName" 
              onChange={handleChangeLastName} 
              ref={lastNameInputRef}
            />
            {formErrors.lastName &&
              <Form.Text className="text-danger">{formErrors.lastName}</Form.Text>
            }
          </Form.Group>
        </Row>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label className={globalStyles.authFormLabel}>Email address</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="email" 
            placeholder="name@example.com" 
            name="email" 
            onChange={handleChangeEmail} 
            ref={emailInputRef} 
          />
          {formErrors.email &&
          <div>
            <Form.Text className="text-danger">{formErrors.email}</Form.Text>
          </div>
          }
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label className={globalStyles.authFormLabel}>Password</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="password" 
            placeholder="******" 
            name="password" 
            onChange={handleChangePassword} 
            ref={passwordInputRef} 
          />
          {formErrors.password &&
            <Form.Text className="text-danger">{formErrors.password}</Form.Text>
          }
        </Form.Group>

        <Form.Group className="mb-2" controlId="passwordCheck">
          <Form.Label className={globalStyles.authFormLabel}>Confirm Password</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="password" 
            placeholder="******" 
            name="password-confirmation" 
            ref={passwordConfirmationRef} 
            isInvalid={showInvalidConfirmation}
            onChange={handleChangePasswordConfirmation}
            onFocus={() => setShowInvalidConfirmation(true)}
          />
          {formErrors.passwordConfirmation &&
            <Form.Text className="text-danger">{formErrors.passwordConfirmation}</Form.Text>
          }
        </Form.Group>

        <div className={styles.buttonContainer}>
          <Button className={styles.button} variant="primary" type="submit">
            Next
          </Button>
          <p className={styles.stepDisplay}>Step 1 of 3</p>
        </div>
      </Form>
    </div>
  );
}