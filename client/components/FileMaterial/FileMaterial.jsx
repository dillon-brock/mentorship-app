import { useState } from "react"
import { Button, Image } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";

export default function FileMaterial({ url, name}) {

  const [showMenuButton, setShowMenuButton] = useState(false);

  return (
    <div onMouseEnter={() => setShowMenuButton(true)} onMouseLeave={() => setShowMenuButton(false)} style={{ position: 'relative', display: 'flex', width: '275px', height: '360px', flexDirection: 'column', alignItems: 'center'}}>
      <a href={url} key={url} target="_blank">
        <div style={{ width: "275px", height: "330px", border: '2px solid black', borderRadius: '10px' }}>
          <Image src={`${url.slice(0, -3)}png`} style={{ width: '100%', height: '100%'}} rounded/>
        </div>
        {name && <p style={{ textAlign: 'center' }}>{name}</p>}
      </a>
      {showMenuButton &&
      <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
        <Button variant="light">
          <FaEllipsisV />
        </Button>
      </div>
      }
    </div>
  )
}