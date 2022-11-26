import { Button, Form } from "react-bootstrap";

export default function TeacherBioForm({ handleSubmit, imageUrl, setImageUrl }) {

  const handleChangeImage = (e) => {
    const imageUrlFromInput = e.target.files[0];
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2" controlId="image">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type="file" name="image" onChange={handleChangeImage} />
      </Form.Group>
      <Form.Group className="mb-2" controlId="bio">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" rows={4} placeholder="Drawing instructor for 10 years" name="bio"></Form.Control>
      </Form.Group>
      <Form.Text>Fields below are optional, and the information will be displayed on your public profile.</Form.Text>
      <Form.Group className="mb-2" controlId="contactEmail">
        <Form.Label>Contact Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" name="contactEmail"></Form.Control>
      </Form.Group>
      <Form.Group className="mb-2" controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" placeholder="(555)555-5555" name="phoneNumber"></Form.Control>
      </Form.Group>
      <Button type="submit">Submit</Button>
  </Form>
  )
}