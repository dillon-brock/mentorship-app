import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { getUser, signUpStudent, signUpTeacher } from '../../services/auth';
import { getCityFromZipCode } from '../../services/zipcode';

export default function TeacherSignUpForm({ handleNext }) {

  return (
    <Form className="text-left" style={{ width: '50%', margin: '0 auto' }} onSubmit={handleNext}>
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
          Next
        </Button>
      </div>
    </Form>
  );
}