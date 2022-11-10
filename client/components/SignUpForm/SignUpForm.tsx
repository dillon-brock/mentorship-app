import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { SignUpFormProps } from '../../types/propTypes.js';

export default function SignUpForm({ accountType }: SignUpFormProps): JSX.Element {

  const [showBioInput, setShowBioInput]: [boolean, (x: boolean) => void] = useState(false);
  const [showContactInfoInput, setShowContactInfoInput]: [boolean, (x: boolean) => void] = useState(false);

  return (
    <Form style={{ width: '50%', margin: '0 auto', textAlign: 'left' }}>
      <Form.Group className="mb-2" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Jane" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Doe" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="******" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="zipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="number" placeholder="97214"></Form.Control>
      </Form.Group>

      {accountType === 'teacher' &&
      <>
        <Form.Group className="mb-2" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Art"></Form.Control>
        </Form.Group>

        {showBioInput ?
          <Form.Group className="mb-2" controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Drawing instructor for 10 years"></Form.Control>
          </Form.Group>
          :
          <Button variant="outline-primary" onClick={() => setShowBioInput(true)}>+ Add Bio</Button>
        }

        {showContactInfoInput ?
          <div>
            <Form.Group className="mb-2" controlId="phoneNumber">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control type="email" placeholder="name@example.com"></Form.Control>
            </Form.Group>
          </div>
          :
          <Button variant="outline-primary">+ Add Contact Info</Button>
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