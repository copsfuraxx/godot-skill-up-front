export async function get(path: string, token: string) {
  const res = await fetch(`http://localhost:8080/${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    }
  });
  return [
    res.ok ? await res.json(): null,
    res.status
  ];
}

export async function post(path: string, token: string, body: any) {
    const res = await fetch(`http://localhost:8080/${path}`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    return [
      res.ok ? await res.json(): null,
      res.status
    ];
}