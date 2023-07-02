import { UserModel } from "src/app/models/user.model";
import { CommentModel } from "src/app/models/comment.model";
export class PostModel {
  postId!: number;
  postName: string;
  content!: string;
  creationDate!: Date;
  comments!: CommentModel[];
  user!: UserModel;
}
