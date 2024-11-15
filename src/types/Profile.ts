// types/Profile.ts
export interface Role {
  id: number;
  name: string;
}

export interface BaseUser {
  id: number;
  username: string;
  email: string;
}

export interface User extends BaseUser {
  role: Role;
}

export interface Image {
  id: number;
}

export interface BaseProfile {
  id: number;
  name: string;
  surname: string;
  country: string;
  state: string;
  city: string;
  street: string;
  apartment: string;
  phone_number: string;
}

export interface Profile extends BaseProfile {
  user: User;
  image: Image;
}
