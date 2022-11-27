export async function addStudentAccount({ firstName, lastName, imageUrl }) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/students/add-account`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      firstName,
      lastName,
      imageUrl
    })
  })

  const newStudentInfo = await response.json();
  if (response.ok) return newStudentInfo;
}

export async function getStudentProfile() {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/students/me`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  });

  const studentProfileInfo = await response.json();
  if (response.ok) return studentProfileInfo;
}

export async function updateAccount({ firstName, lastName, imageUrl }) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/students/me`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
      imageUrl
    })
  });

  if (response.ok) return await response.json();
}