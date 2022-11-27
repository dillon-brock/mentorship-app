import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { getUser, signIn } from "../../services/auth";

export default function SignInForm() {

  const { setUser } = useUserContext();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [formErrors, setFormErrors] = useState({});

  const isFormInvalid = () => {
    let invalid = false;

    if (emailInputRef.current.value === '' || !emailInputRef.current.checkValidity()) {
      setFormErrors({ ...formErrors, email: 'Please enter a valid email.'});
      invalid = true;
    }
    if (passwordInputRef.current.value === '' || passwordInputRef.current.value.length < 6) {
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target);
    const signInResponse = await signIn({ email: formData.get('email'), password: formData.get('password') });
    if (signInResponse.status) {
      if (signInResponse.message === 'Invalid email') {
        setFormErrors({ ...formErrors, email: `The email you've entered is not connected to an account. Please sign up or try a different email.`})
      }
      if (signInResponse.message === 'Invalid password') {
        setFormErrors({ ...formErrors, password: `The password you've entered is incorrect.`});
      }
      return;
    }
    const userInfo = await getUser();
    setUser(userInfo);
  }

  return (
    <Form style={{ width: '50%', margin: '0 auto', textAlign: 'left' }} onSubmit={handleSignIn}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" name="email" ref={emailInputRef} onChange={handleChangeEmail}/>
        {formErrors.email &&
          <Form.Text className="text-danger">{formErrors.email}</Form.Text>
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="******" name="password" ref={passwordInputRef} onChange={handleChangePassword}/>
        {formErrors.password &&
          <Form.Text className="text-danger">{formErrors.password}</Form.Text>
        }
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </Form>
  )
}