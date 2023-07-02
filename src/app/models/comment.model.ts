import { PostModel } from "src/app/models/post.model";
export class CommentModel {
  id!: number;
  content!: string;
  userId!: number;
  post!: PostModel;
  postedOn!: Date;

}
