export const signUp = async (formData) => {
  const res = await fetch(`http://localhost:3000/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res) throw new Error("Error while signing up");
  const data = await res.json();
  return data;
};

export const signIn = async (formData) => {
  const res = await fetch(`http://localhost:3000/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  if (!res) throw new Error("Error while signing in");
  const data = await res.json();
  return data;
};

export const signOut = async () => {
  const res = await fetch(`http://localhost:3000/auth/signout`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res) throw new Error("Error while signing out");
  const data = await res.json();
  return data;
};

export const me = async () => {
  const res = await fetch(`http://localhost:3000/auth/me`, {
    credentials: "include",
  });

  if (!res) throw new Error("Error while signing in");

  const data = await res.json();
  return data;
};

export const verifyUser = async (token) => {
  const res = await fetch(`http://localhost:3000/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(token),
  });
  if (!res) throw new Error("Error while signing up");
  const data = await res.json();
  return data;
};
