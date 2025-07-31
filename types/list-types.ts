
export interface CorporateListItem {
  id: string;
  name: string;
}

export interface UserRole {
  id: string;
  name: string;
}

export interface UserProfile  {
  accessToken: string;
  name: string;
  email: string;
  profileImage: string;
  role: UserRole;
}
