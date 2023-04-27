import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, Form, Image, Row } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import { getUser, signUpStudent } from '../../services/auth/auth';
import { uploadProfilePicture } from '../../services/cloudinary/cloudinary';

import styles from './studentSignUpForm.module.css';
import globalStyles from '../../global.module.css';
import { StudentFormData, FormErrors } from './types';

export default function StudentSignUpForm() {

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [showInvalidConfirmation, setShowInvalidConfirmation] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [imageData, setImageData] = useState<FormData | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { setUser } = useUserContext();
  
  const isFormInvalid = () => {
    let invalid: boolean = false;

    if (firstNameInputRef.current && firstNameInputRef.current.value === '') {
      setFormErrors({ ...formErrors, firstName: 'First name is required'});
      invalid = true;
      return invalid;
    }

    if (lastNameInputRef.current && lastNameInputRef.current.value === '') {
      setFormErrors({ ...formErrors, lastName: 'Last name is required'});
      invalid = true;
      return invalid;
    }

    if (emailInputRef.current && (emailInputRef.current.value === '' || !emailInputRef.current.checkValidity())) {
      setFormErrors({ ...formErrors, email: 'Please enter a valid email.'});
      invalid = true;
      return invalid;
    }
    if (passwordInputRef.current && (passwordInputRef.current.value === '' || passwordInputRef.current.value.length < 6)) {
      setFormErrors({ ...formErrors, password: 'Password must be at least 6 characters.'});
      invalid = true;
      return invalid;
    }
    if (passwordConfirmationRef.current &&
      passwordInputRef.current &&
      (passwordConfirmationRef.current.value !== passwordInputRef.current.value)) {
      setFormErrors({ ...formErrors, passwordConfirmation: 'Passwords do not match.'});
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

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
      setImagePreviewUrl(URL.createObjectURL(file));
      setImageData(formData);
    }
  }

  const handleSignUpStudent = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target as HTMLFormElement);
    let formDataObj = Object.fromEntries(formData);
    let imageUrl: string = '';
    if (imageData) {
      const uploadImageResponse = await uploadProfilePicture(imageData);
      imageUrl = uploadImageResponse.secure_url;
    }
    let response = await signUpStudent({
      ...(formDataObj as StudentFormData), 
      imageUrl: imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    });
    
    if (response.status === 500) {
      setFormErrors({ email: 'This email is already being used by another account. Please sign in or use a different email.'});
      return;
    }

    const userInfo = await getUser();
    setUser(userInfo);
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Student Sign Up</h3>
      <Form className={styles.form} onSubmit={handleSignUpStudent}>
        <Row xl={2}>
          <Form.Group className="mb-2" controlId="firstName">
            <Form.Label className={globalStyles.authFormLabel}>First Name</Form.Label>
            <Form.Control 
              className={styles.input} 
              type="text" 
              placeholder="Jane" 
              name="firstName" 
              ref={firstNameInputRef} 
              onChange={handleChangeFirstName}
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
              ref={lastNameInputRef} 
              onChange={handleChangeLastName} 
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
            ref={emailInputRef} 
            onChange={handleChangeEmail}
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
            ref={passwordInputRef} 
            onChange={handleChangePassword}
          />
          {formErrors.password &&
          <div>
            <Form.Text className="text-danger">{formErrors.password}</Form.Text>
          </div>
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

        <Form.Group className="mb-2" controlId="image">
          <Form.Label className={globalStyles.authFormLabel}>Profile Picture</Form.Label>
          <Form.Control className={styles.input} type="file" name="image" onChange={handleChangeImage} />
          <Form.Text className="text-muted">This is optional and will only be visible in messages and to teachers with whom you are connected.</Form.Text>
        </Form.Group>
          {imagePreviewUrl &&
          <div className={styles.imageContainer}>
            <Image className={styles.image} src={imagePreviewUrl} />
          </div>
          }

        <div className={styles.buttonContainer}>
          <Button className={styles.button} type="submit">
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
}