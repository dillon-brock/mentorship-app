import { Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { getUser, signUpStudent } from '../../services/auth';

export default function StudentSignUpForm({ accountType }) {

  const { setUser } = useUserContext();

  if (!accountType) {
    return <Navigate to='/auth/sign-up/student' />
  }

  const handleSignUpStudent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formDataObj = Object.fromEntries(formData);
    formDataObj = {
      ...formDataObj,
      imageUrl: formData.get('imageUrl') || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
    await signUpStudent({...formDataObj});
    
    const userInfo = await getUser();
    setUser(userInfo);
  }

  return (
    <Form className="text-left" style={{ width: '50%', margin: '0 auto' }} onSubmit={handleSignUpStudent}>
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

      <div style={{ display: 'flex' }}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}