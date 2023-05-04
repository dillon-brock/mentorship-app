import { Form } from "react-bootstrap"
import { Subject } from "../../types"
import styles from './subjectSelect.module.css';
import { ChangeEvent } from "react";

type Props = {
  subjects: Subject[];
  error: string;
  handleChangeSubject: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function SubjectSelect({ subjects, error, handleChangeSubject }: Props) {
  
  return (
    <>
      <Form.Select className={styles.select} onChange={handleChangeSubject}>
        <option value=''></option>
        {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.subject}</option>)}
      </Form.Select>
      {error &&
        <Form.Text className="text-danger">{error}</Form.Text>
      }
    </>
  )
}