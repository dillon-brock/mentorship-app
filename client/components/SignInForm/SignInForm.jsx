import { Button, Form } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { getUser, signIn } from "../../services/auth";

export default function SignInForm() {

  const { user, setUser } = useUserContext();
  console.log(user);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await signIn({ email: formData.get('email'), password: formData.get('password') });
    const userInfo = await getUser();
    setUser(userInfo);
  }

  return (
    <Form style={{ width: '50%', margin: '0 auto', textAlign: 'left' }} onSubmit={handleSignIn}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" name="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="******" name="password"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}