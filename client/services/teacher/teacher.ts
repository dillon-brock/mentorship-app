import { TeacherAccountData, TeacherAccountWithSubjects } from "./types";

export async function getTeachers(subject: string, lessonType = 'Any', minPrice = 0, maxPrice = 200) {
  const params = new URLSearchParams;
  params.set('subject', subject);
  params.set('lessonType', lessonType);
  params.set('minPrice', String(minPrice));
  params.set('maxPrice', String(maxPrice));
  const response = await fetch(`/api/v1/teachers?${params.toString()}`, {
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

export async function getTeacherById(id: string) {
  const response = await fetch(`/api/v1/teachers/${id}`, {
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

export async function getStudents() {
  const response = await fetch(`/api/v1/students`, {
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

export async function addTeacherAccount({ firstName, lastName, 
  imageUrl, subjects, bio, zipCode, phoneNumber, contactEmail, 
  city, state }: TeacherAccountWithSubjects) {
  const res = await fetch(`/api/v1/teachers/add-account`, {
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

export async function updateAccount({ bio, zipCode, city, state, phoneNumber, contactEmail, firstName, lastName, imageUrl }: TeacherAccountData) {
  const response = await fetch(`/api/v1/teachers/me`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
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
  const response = await fetch(`/api/v1/teachers/me`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  });
  const teacherProfileInfo = await response.json();
  if (response.ok) return teacherProfileInfo;
}