// api.js

import users from "./users.json";

export function login(email, password) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user ? user : null;
}
