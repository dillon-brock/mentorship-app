export default function LocationDropdown() {

  const [radiusForDisplay, setRadiusForDisplay] = useState(25);

  return (
    <div>
      <Form.Group className="mb-2" controlId="zipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="number" minLength="5" maxLength="5" placeholder="97214" name="zipCode" onChange={() => setErrorMessage('')} />
      </Form.Group>
      <Form.Group className="mb-2" controlId="radius">
        <Form.Label>Distance</Form.Label>
        <Form.Control type="range" min="0" max="50" step="5" name="radius" value={radiusForDisplay} onInput={(e) => setRadiusForDisplay(e.target.value)}/>
        <Form.Text>{radiusForDisplay} miles</Form.Text>
      </Form.Group>
    </div>
  )
}