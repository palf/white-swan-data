export type UUID = string; // for book-keeping only; would be better to use a branded type

export type User = {
  id: UUID;
  username: string;
};

const adminUser: User = {
  id: '5616d0b0-e242-4a85-80e9-371adc122e71',
  username: 'admin',
};

export function resolveUser(
  username: string,
  password: string
): User | undefined {
  if (username === 'admin' && password === 'password') {
    return adminUser;
  }
}
