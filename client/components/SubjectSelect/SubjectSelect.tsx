import { Form } from "react-bootstrap"
import { Subject } from "../../types"
import { ChangeEvent } from "react";

type Props = {
  subjects: Subject[];
  error?: string;
  handleChangeSubject?: (e: ChangeEvent<HTMLSelectElement>) => void;
  showLabel?: boolean;
  defaultValue?: string;
  firstOption?: string;
  className: string
}

export default function SubjectSelect({ 
  subjects, error = "", 
  handleChangeSubject = () => {}, 
  showLabel = false, defaultValue,
  firstOption, className
}: Props) {
  
  return (
    <>
      {showLabel && <Form.Label>Subject</Form.Label>}
      <Form.Select className={className} name="subject" onChange={handleChangeSubject} defaultValue={defaultValue}>
        <option disabled value=''>{firstOption && firstOption}</option>
        {subjects.map(subject => (
          <option key={subject.id} value={subject.id}>{subject.subject}</option>))}
      </Form.Select>
      {error &&
        <Form.Text className="text-danger">{error}</Form.Text>
      }
    </>
  )
}