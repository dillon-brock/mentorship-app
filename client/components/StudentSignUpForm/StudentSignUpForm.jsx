import { useRef, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import { getUser, signUpStudent } from '../../services/auth';
import { uploadProfilePicture } from '../../services/cloudinary';

import styles from './studentSignUpForm.module.css';

export default function StudentSignUpForm() {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const [imageData, setImageData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const { setUser } = useUserContext();

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

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
    setImageData(formData);
  }

  const handleSignUpStudent = async (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData);
    let imageUrl = '';
    if (imageData) {
      const uploadImageResponse = await uploadProfilePicture(imageData);
      imageUrl = uploadImageResponse.secure_url;
    }
    let response = await signUpStudent({...formDataObj, imageUrl: imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'});
    
    if (response.status && response.status === 500) {
      setFormErrors({ email: 'This email is already being used by another account. Please sign in or use a different email.'});
      return;
    }

    const userInfo = await getUser();
    setUser(userInfo);
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <h3 className={styles.title}>Student Sign Up</h3>
      <Form className={styles.form} onSubmit={handleSignUpStudent}>
        <Row xl={2}>
          <Form.Group className="mb-2" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control className={styles.input} type="text" placeholder="Jane" name="firstName" ref={firstNameInputRef} onChange={handleChangeFirstName}/>
            {formErrors.firstName &&
              <Form.Text className="text-danger">{formErrors.firstName}</Form.Text>
            }
          </Form.Group>

          <Form.Group className="mb-2" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control className={styles.input} type="text" placeholder="Doe" name="lastName" ref={lastNameInputRef} onChange={handleChangeLastName} />
            {formErrors.lastName &&
              <Form.Text className="text-danger">{formErrors.lastName}</Form.Text>
            }
          </Form.Group>
        </Row>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control className={styles.input} type="email" placeholder="name@example.com" name="email" ref={emailInputRef} onChange={handleChangeEmail}/>
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
          <Form.Control className={styles.input} type="password" placeholder="******" name="password" ref={passwordInputRef} onChange={handleChangePassword}/>
          {formErrors.password &&
          <div>
            <Form.Text className="text-danger">{formErrors.password}</Form.Text>
          </div>
          }
        </Form.Group>

        <Form.Group className="mb-2" controlId="image">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control className={styles.input} type="file" name="image" onChange={handleChangeImage} />
          <Form.Text className="text-muted">This is optional and will only be visible in messages and to teachers with whom you are connected.</Form.Text>
        </Form.Group>

        <div className={styles.buttonContainer}>
          <Button className={styles.button} type="submit">
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
}