export type ProfileStatus = "pending" | "approved" | "rejected";

export interface Church {
  id: string;
  code: string;
  name: string;
}

export interface Profile {
  id: string;
  church_id: string;
  name: string;
  phone: string;
  base_role: string;
  status: ProfileStatus;
}
