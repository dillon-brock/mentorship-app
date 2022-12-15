import { Form } from "react-bootstrap";
import styles from './pagingSelect.module.css';

export default function PagingSelect({ setPageLength }) {
  return (
    <div>
      <Form.Group>
        <Form.Label className={styles.label}>Per Page</Form.Label>
        <Form.Select 
          className={styles.select} 
          defaultValue={10} 
          onChange={(e) => setPageLength(e.target.value)}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </Form.Select>
      </Form.Group>
    </div>
  )
}