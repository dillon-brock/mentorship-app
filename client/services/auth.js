export async function signUpStudent({ email, password, firstName, lastName, imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/students`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      imageUrl
    }),
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  })

  if (response.ok) {
    return response;
  }
}

export async function signUpTeacher({
  email,
  password,
  firstName,
  lastName,
  subject,
  bio,
  zipCode,
  phoneNumber,
  contactEmail,
  imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
}) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      imageUrl,
      subject,
      bio,
      zipCode,
      phoneNumber,
      contactEmail
    }),
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  })

  if (response.ok) {
    return response;
  }
}

export async function signIn({ email, password }) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/users/sessions`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  })
}

export async function getUser() {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/users/me`, {
    credentials: "include",
    headers: {
      "Accept": "application/json"
    }
  });

  const user = await response.json();
  if (response.ok) {
    return user;
  }
}