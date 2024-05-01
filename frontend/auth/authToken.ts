export interface TokenResponse {
    token: string;
    name: string;
    username: string;
    permission: string;
}

// Function to set data in localStorage
export function setToken(token: string): void {
  localStorage.setItem('token', token);
}
export function setName(name: string): void {
  localStorage.setItem('name', name);
}
export function setUsername(username: string): void {
  localStorage.setItem('username', username);
}
export function setPermission(permission: string): void {
  localStorage.setItem('permission', permission);
}


// Function to get data from localStorage
export function getToken(): string | null {
  return localStorage.getItem('token');
}
export function getName(): string | null {
  return localStorage.getItem('name');
}
export function getUsername(): string | null {
  return localStorage.getItem('username');
}
export function getPermission(): string | null {
  return localStorage.getItem('permission');
}
// Function to remove data from localStorage
export function removeToken(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('username');
  localStorage.removeItem('permission');
}

export function logout(): void {
  removeToken();
}