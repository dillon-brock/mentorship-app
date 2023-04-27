import { Form } from "react-bootstrap";
import styles from './pagingSelect.module.css';
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  setPageLength: Dispatch<SetStateAction<number>>;
}

export default function PagingSelect({ setPageLength }: Props) {

  const handleChangePageLength = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageLength(e.target.value as unknown as number)
  }

  return (
    <div>
      <Form.Group>
        <Form.Label className={styles.label}>Per Page</Form.Label>
        <Form.Select 
          className={styles.select} 
          defaultValue={10} 
          onChange={handleChangePageLength}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </Form.Select>
      </Form.Group>
    </div>
  )
}