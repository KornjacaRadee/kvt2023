import { UserModel } from "src/app/models/user.model";
export class PostModel {
  id!: number;
  postName: string;
  content!: string;
  creationDate!: Date;
  user!: UserModel;
}
