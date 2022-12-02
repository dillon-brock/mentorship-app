import { Button, Form } from "react-bootstrap";
import { addTeachingMaterial } from "../../services/teachingMaterials";

export default function MaterialLinkUploadForm({ subjects, setTeachingMaterials, setShowUploadModal }) {

  const handleUpload = async (e) => {
    const formData = new FormData(e.target);
    const newTeachingMaterial = await addTeachingMaterial({
      subjectId: formData.get('subject'),
      name: formData.get('name'),
      url: formData.get('url'),
      type: 'link'
    });
    setTeachingMaterials(prev => [...prev, newTeachingMaterial]);
    setShowUploadModal(false);
  }

  return (
    <Form onSubmit={handleUpload}>
      <Form.Group className="mb-3" controlId="url">
        <Form.Label>URL</Form.Label>
        <Form.Control type="text" name="url" placeholder="example.com/subject-info" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Subject Info on example.com" />
        <Form.Text>A name is not required for link uploads, but it&apos;s helpful for students to find materials.</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Select name="subject" defaultValue=''>
        <option disabled value=''>Choose the subject associated with this link...</option>
        {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
        </Form.Select>
      </Form.Group>
      <Button onClick={() => setShowUploadModal(false)}>Cancel</Button>
      <Button type="submit">Upload</Button>
    </Form>
  )
}