import { Button, Form } from "react-bootstrap";
import { signIn } from "../../services/authService";

export default function SignInForm() {

  const handleSignIn = async (e) => {
    const formData = new FormData(e.target);
    await signIn({ email: formData.get('email'), password: formData.get('password') });
  }

  return (
    <Form style={{ width: '50%', margin: '0 auto', textAlign: 'left' }} onSubmit={handleSignIn}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="******" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}