export async function getTeachers(subject) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers?subject=${subject}`, {
    credentials: "include",
    headers: {
      "Accept": "application/json"
    }
  });

  const teachers = await response.json();
  if (response.ok) {
    return teachers;
  }
}

export async function getTeacherById(id) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers/${id}`, {
    credentials: "include",
    headers: {
      "Accept": "application/json"
    }
  });

  const teacher = await response.json();
  if (response.ok) {
    return teacher;
  }
}

export async function getStudents(id) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers/${id}/students`, {
    credentials: "include",
    headers: {
      "Accept": "application/json"
    }
  })

  if (response.ok) {
    const students = await response.json();
    return students;
  }
}

export async function addTeacherAccount({ firstName, lastName, imageUrl, subject, bio, zipCode, phoneNumber, contactEmail, city, state }) {
  const res = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers/add-account`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      firstName,
      lastName,
      imageUrl,
      subject,
      bio,
      zipCode,
      phoneNumber,
      contactEmail,
      city,
      state
    })
  });

  const newTeacherInfo = await res.json();
  if (res.ok) return newTeacherInfo;
}