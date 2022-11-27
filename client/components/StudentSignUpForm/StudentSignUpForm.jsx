import { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import { getUser, signUpStudent } from '../../services/auth';

export default function StudentSignUpForm() {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const { setUser } = useUserContext();

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

    if (firstNameInputRef.current.value === '') {
      setFormErrors({ ...formErrors, firstName: 'First name is required'});
      invalid = true;
    }

    if (lastNameInputRef.current.value === '') {
      setFormErrors({ ...formErrors, lastName: 'Last name is required'});
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

  const handleChangeFirstName = () => {
    if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: ''});
  }

  const handleChangeLastName = () => {
    if (formErrors.lastName) setFormErrors({ ...formErrors, lastName: ''});
  } 

  const handleSignUpStudent = async (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData);
    formDataObj = {
      ...formDataObj,
      imageUrl: formData.get('imageUrl') || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
    let response = await signUpStudent({...formDataObj});
    
    if (response.status && response.status === 500) {
      setFormErrors({ email: 'This email is already being used by another account. Please sign in or use a different email.'});
      return;
    }

    const userInfo = await getUser();
    setUser(userInfo);
  }

  return (
    <Form className="text-left" style={{ width: '50%', margin: '0 auto' }} onSubmit={handleSignUpStudent}>
      <Form.Group className="mb-2" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Jane" name="firstName" ref={firstNameInputRef} onChange={handleChangeFirstName}/>
      </Form.Group>
      {formErrors.firstName &&
        <Form.Text className="text-danger">{formErrors.firstName}</Form.Text>
      }

      <Form.Group className="mb-2" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Doe" name="lastName" ref={lastNameInputRef} onChange={handleChangeLastName} />
      </Form.Group>
      {formErrors.lastName &&
        <Form.Text className="text-danger">{formErrors.lastName}</Form.Text>
      }

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" name="email" ref={emailInputRef} onChange={handleChangeEmail}/>
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
        <Form.Control type="password" placeholder="******" name="password" ref={passwordInputRef} onChange={handleChangePassword}/>
        {formErrors.password &&
        <div>
          <Form.Text className="text-danger">{formErrors.password}</Form.Text>
        </div>
        }
      </Form.Group>

      <div style={{ display: 'flex' }}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}