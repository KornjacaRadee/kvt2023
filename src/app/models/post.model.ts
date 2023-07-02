import { UserModel } from "src/app/models/user.model";
import { CommentModel } from "src/app/models/comment.model";
import { LikeModel } from "src/app/models/like.model";
export class PostModel {
  postId!: number;
  postName: string;
  content!: string;
  creationDate!: Date;
  comments!: CommentModel[];
  likes!: LikeModel[];
  user!: UserModel;
}
