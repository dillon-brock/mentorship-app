import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { signUpStudent } from '../../services/authService';
import { SignUpFormProps } from '../../types/propTypes';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUpForm({ accountType }: SignUpFormProps): JSX.Element {

  const [showBioInput, setShowBioInput]: [boolean, (x: boolean) => void] = useState(false);
  const [showContactInfoInput, setShowContactInfoInput]: [boolean, (x: boolean) => void] = useState(false);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (accountType === 'student') await signUpStudent({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    });
  }

  return (
    <Form style={{ width: '50%', margin: '0 auto', textAlign: 'left' }} onSubmit={handleSignUp}>
      <Form.Group className="mb-2" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Jane" name="firstName"/>
      </Form.Group>

      <Form.Group className="mb-2" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Doe" name="lastName"/>
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" name="email"/>
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="******" name="password"/>
      </Form.Group>

      {accountType === 'teacher' &&
      <>
      <Form.Group className="mb-2" controlId="zipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="number" placeholder="97214" name="zip"></Form.Control>
      </Form.Group>

        <Form.Group className="mb-2" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Art" name="subject"></Form.Control>
        </Form.Group>

        {showBioInput ?
          <Form.Group className="mb-2" controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Drawing instructor for 10 years" name="bio"></Form.Control>
          </Form.Group>
          :
          <Button variant="outline-primary" onClick={() => setShowBioInput(true)}>+ Add Bio</Button>
        }

        {showContactInfoInput ?
          <div>
            <Form.Group className="mb-2" controlId="phoneNumber">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" name="contactEmail"></Form.Control>
            </Form.Group>
          </div>
          :
          <Button variant="outline-primary" onClick={() => setShowContactInfoInput(true)}>+ Add Contact Info</Button>
        }

      </>
      }
      <div style={{ display: 'flex' }}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}