export const signUp = async (formData) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  console.log(formData);

  if (!res) throw new Error("Error while signing up");
  const data = await res.json();
  return data;
};

export const signIn = async (formData) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signin`, {
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
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signout`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error while signing out");
  const data = await res.json();
  return data;
};

export const me = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error while signing in");

  const data = await res.json();
  return data;
};

export const verifyUser = async (token) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/verify/${token}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error while verifying user");
  }
  const data = await res.json();
  return data;
};

export const updateUser = async (formData) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  const data = await res.json();
  return data;
};
