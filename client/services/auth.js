export async function signUpStudent({ email, password, firstName, lastName, imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }) {
  const response = await fetch(`/api/v1/students`, {
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

  return await response.json();
}

export async function signUpTeacher({
  email,
  password,
  firstName,
  lastName,
  subjects,
  bio,
  zipCode,
  phoneNumber,
  contactEmail,
  imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  city,
  state
}) {
  const response = await fetch(`/api/v1/teachers`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      subjects,
      imageUrl,
      bio,
      zipCode,
      phoneNumber,
      contactEmail,
      city,
      state
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

export async function signUpUser({ email, password, type }) {
  const response = await fetch(`/api/v1/users`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      type
    }),
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    }
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  }
}

export async function signIn({ email, password }) {
  const response = await fetch(`/api/v1/users/sessions`, {
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

  return await response.json();
}

export async function getUser() {
  const response = await fetch(`/api/v1/users/me`, {
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

export async function signOut() {
  const res = await fetch(`/api/v1/users/sessions`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

export async function updateUserType(type) {
  const res = await fetch(`/api/v1/users/me`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ type })
  });

  const updatedUser = await res.json();
  if (res.ok) return updatedUser;
}

export async function checkForExistingUser(email) {
  const response = await fetch(`/api/v1/users/find`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  return await response.json();
}