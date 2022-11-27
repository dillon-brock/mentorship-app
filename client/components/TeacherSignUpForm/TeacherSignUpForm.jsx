import { Button, Form } from 'react-bootstrap';

export default function TeacherSignUpForm({ setEmail, setPassword, setFirstName, setLastName, setStep }) {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
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

  const handleNext = async (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target);
    setEmail(formData.get('email'));
    setPassword(formData.get('password'));
    setFirstName(formData.get('firstName'));
    setLastName(formData.get('lastName'));
    setStep(2);
  }


  return (
    <Form className="text-left" style={{ width: '50%', margin: '0 auto' }} onSubmit={handleNext}>
      <Form.Group className="mb-2" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Jane" name="firstName" onChange={handleChangeFirstName} ref={firstNameInputRef}/>
      </Form.Group>

      <Form.Group className="mb-2" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Doe" name="lastName" onChange={handleChangeLastName} ref={lastNameInputRef}/>
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" name="email" onChange={handleChangeEmail} ref={emailInputRef} />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="******" name="password" onChange={handleChangePassword} ref={passwordInputRef} />
      </Form.Group>

      <div style={{ display: 'flex' }}>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}