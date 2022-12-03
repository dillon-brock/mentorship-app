import { Button } from "react-bootstrap";

export default function NoStudentsDisplay() {
  return (
    <>
      <h3>You currently have no students or pending requests.</h3>
      <h4>While you wait for students to reach out, you can</h4>
      <Button>Upload Teaching Materials &nbsp;&nbsp;&nbsp;{'>'}</Button>
      <Button>Connect With Other Instructors &nbsp;&nbsp;&nbsp;{'>'}</Button>
    </>
  )
}