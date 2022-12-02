export async function getTeachers(subject, lessonType = 'Any', minPrice = 0, maxPrice = 200) {
  console.log(subject);
  const params = new URLSearchParams;
  params.set('subject', subject);
  params.set('lessonType', lessonType);
  params.set('minPrice', minPrice);
  params.set('maxPrice', maxPrice);
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers?${params.toString()}`, {
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

export async function addTeacherAccount({ firstName, lastName, imageUrl, subjects, bio, zipCode, phoneNumber, contactEmail, city, state }) {
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
      subjects,
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

export async function updateAccount({ subject, bio, zipCode, city, state, phoneNumber, contactEmail, firstName, lastName, imageUrl}) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers/me`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      subject,
      bio,
      zipCode,
      city,
      state,
      phoneNumber,
      contactEmail,
      firstName,
      lastName,
      imageUrl
    })
  });

  const updatedInfo = await response.json();
  if (response.ok) return updatedInfo;
}

export async function getTeacherProfile() {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers/me`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  });
  const teacherProfileInfo = await response.json();
  if (response.ok) return teacherProfileInfo;
}