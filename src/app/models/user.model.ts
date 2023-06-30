export class UserModel {
  id!: number;
  username!: string;
  password!: string;
  email!: string;
  lastLogin!: string;
  firstName!: string;
  lastName!: string;
  friends!: [];
  friendOf!: [];
  role!: string;
  groupAdmin!: [];
  deleted!: boolean;

}
