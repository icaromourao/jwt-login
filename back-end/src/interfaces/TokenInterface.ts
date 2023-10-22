export interface Token {
  token_id?: number;
  token?: string;
  type?: string;
  user_id?: number;
  is_valid?: boolean;
  expires_in?: number;
  issued_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
