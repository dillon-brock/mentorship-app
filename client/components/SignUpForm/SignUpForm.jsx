import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { signUpStudent, signUpTeacher } from '../../services/authService';

export default function SignUpForm({ accountType }) {

  const [showBioInput, setShowBioInput] = useState(false);
  const [showContactInfoInput, setShowContactInfoInput] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const baseInfo = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
    if (accountType === 'student') await signUpStudent({ ...baseInfo });
    if (accountType === 'teacher') await signUpTeacher({
      ...baseInfo,
      zipCode: formData.get('zip'),
      subject: formData.get('zip'),
      bio: formData.get('bio'),
      phoneNumber: formData.get('phoneNumber'),
      contactEmail: formData.get('contactEmail')
    })
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
            <Form.Group className="mb-2" controlId="contactEmail">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" name="contactEmail"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-2" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="(555)555-5555" name="phoneNumber"></Form.Control>
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