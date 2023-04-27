import { ConnectionUpdateInfo, DeleteConnectionInfo } from "./types";

export async function createConnection(teacherId: string, studentId: string) {
  const response = await fetch(`/api/v1/connections`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      teacherId,
      studentId
    })
  })

  if (response.ok) {
    return await response.json();
  }
}

export async function updateConnectionStatus({ teacherId, studentId, connectionStatus }: ConnectionUpdateInfo) {
  const response = await fetch(`/api/v1/connections`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      teacherId,
      studentId,
      connectionStatus
    })
  });

  if (response.ok) {
    return await response.json();
  }
}

export async function deleteConnection({ id, studentId, subjectId }: DeleteConnectionInfo) {
  const response = await fetch(`/api/v1/connections/${id}?studentId=${studentId}&subjectId=${subjectId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  });

  return await response.json();
}