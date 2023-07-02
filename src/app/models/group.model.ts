import { UserModel } from "src/app/models/user.model";
import { PostModel } from "src/app/models/post.model";
export class GroupModel {
  id!: number;
  name: string;
  descripiton!: string;
  creationDate!: Date;
  posts!: PostModel[];
  user!: UserModel;
}
