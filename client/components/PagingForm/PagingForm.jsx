import { Form } from "react-bootstrap";

export default function PagingForm({ setPageLength, setPage, totalPages }) {

  handlePreviousPage = () => {
    setPage(prev => {
      if (prev > 1) return prev - 1;
      return 1;
    })
  }

  handleNextPage = () => {
    setPage(prev => {
      if (prev < totalPages) return prev + 1;
      return totalPages;
    })
  }

  return (
    <Form.Group>
      <Form.Label>Results per Page</Form.Label>
      <Form.Select defaultValue={10} onChange={(e) => setPageLength(e.target.value)}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </Form.Select>
      <Button onClick={handlePreviousPage}>Prev</Button>
      <Button onClick={handleNextPage}>Next</Button>
    </Form.Group>
  )
}