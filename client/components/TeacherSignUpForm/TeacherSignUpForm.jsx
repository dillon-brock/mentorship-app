import { useRef, useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { checkForExistingUser } from '../../services/auth';

import styles from './teacherSignUpForm.module.css';

export default function TeacherSignUpForm({ setEmail, setPassword, setFirstName, setLastName, setStep }) {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const [showInvalidConfirmation, setShowInvalidConfirmation] = useState(false);

  const isFormInvalid = () => {
    let invalid = false;

    if (firstNameInputRef.current.value === '') {
      setFormErrors({ ...formErrors, firstName: 'First name is required'});
      invalid = true;
      return invalid;
    }

    if (lastNameInputRef.current.value === '') {
      setFormErrors({ ...formErrors, lastName: 'Last name is required'});
      invalid = true;
      return invalid;
    }

    if (emailInputRef.current.value === '' || !emailInputRef.current.checkValidity()) {
      setFormErrors({ ...formErrors, email: 'Please enter a valid email.'});
      invalid = true;
      return invalid;
    }
    if (passwordInputRef.current.value === '' || passwordInputRef.current.value.length < 6) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 6 characters'});
      invalid = true;
      return invalid;
    }
    if (passwordConfirmationRef.current.value !== passwordInputRef.current.value) {
      setFormErrors({ ...formErrors, passwordConfirmation: 'Passwords do not match.'});
      invalid = true;
      return invalid;
    }

    return invalid;
  };

  const handleChangeFirstName = () => {
    if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: ''});
  }

  const handleChangeLastName = () => {
    if (formErrors.lastName) setFormErrors({ ...formErrors, lastName: ''});
  }

  const handleChangeEmail = () => {
    if (formErrors.email) setFormErrors({ ...formErrors, email: ''});
  }

  const handleChangePassword = () => {
    if (formErrors.password) setFormErrors({ ...formErrors, password: ''});
  }

  const handleChangePasswordConfirmation = () => {
    if (passwordConfirmationRef.current.value === passwordInputRef.current.value) {
      setShowInvalidConfirmation(false);
    } else {
      setShowInvalidConfirmation(true);
      setFormErrors({ ...formErrors, passwordConfirmation: '' });
    }
  }

  const handleNext = async (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target);
    const existingUser = await checkForExistingUser(formData.get('email'));
    if (existingUser) {
      setFormErrors({ ...formErrors, email: 'This email is already being used by another account. Please sign in or use a different email.' })
      return;
    }
    setEmail(formData.get('email'));
    setPassword(formData.get('password'));
    setFirstName(formData.get('firstName'));
    setLastName(formData.get('lastName'));
    setStep(2);
  }


  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Teacher Sign Up</h3>
      <Form className={styles.form} onSubmit={handleNext}>
        <Row xl={2}>
          <Form.Group className="mb-2" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control className={styles.input} type="text" placeholder="Jane" name="firstName" onChange={handleChangeFirstName} ref={firstNameInputRef}/>
            {formErrors.firstName && 
              <Form.Text className="text-danger">{formErrors.firstName}</Form.Text>
            }
          </Form.Group>

          <Form.Group className="mb-2" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control className={styles.input} type="text" placeholder="Doe" name="lastName" onChange={handleChangeLastName} ref={lastNameInputRef}/>
            {formErrors.lastName &&
              <Form.Text className="text-danger">{formErrors.lastName}</Form.Text>
            }
          </Form.Group>
        </Row>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control className={styles.input} type="email" placeholder="name@example.com" name="email" onChange={handleChangeEmail} ref={emailInputRef} />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
          {formErrors.email &&
          <div>
            <Form.Text className="text-danger">{formErrors.email}</Form.Text>
          </div>
          }
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control className={styles.input} type="password" placeholder="******" name="password" onChange={handleChangePassword} ref={passwordInputRef} />
          {formErrors.password &&
            <Form.Text className="text-danger">{formErrors.password}</Form.Text>
          }
        </Form.Group>

        <Form.Group className="mb-2" controlId="passwordCheck">
          <Form.Label>Confirm Password</Form.Label>
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