import {
  Body,
  Controller,
  Middlewares,
  Patch,
  Path,
  Post,
  Request,
  Route,
  SuccessResponse,
} from "tsoa";
import validateInput from "@post/middlewares/input-validation";
import { PostSaveSchema } from "@post/schema/post.schema";
import { PostService } from "@post/services/post.service";
import { StatusCode } from "@post/utils/const";
import { logger } from "@post/utils/logger";
import { verificationToken } from "@post/middlewares/tokenVerify";
import { postDetail } from "@post/database/@types/post.interface";
import CustomError from "@post/errors/customError";

const postService = new PostService();

@Route("v1/post")
export class PostController extends Controller {
  @SuccessResponse(StatusCode.Created, "Created successfully")
  @Post("/")
  @Middlewares(validateInput(PostSaveSchema))
  @Middlewares(verificationToken)
  public async CreatePost(
    @Body() requestBody: postDetail,
    @Request() request: any
  ): Promise<any> {
    try {
      const detailPost = {
        ...requestBody,
        userId: request.userId, // Accessing req.userId instead of req.id
        username: request.username,
      };

      // console.log("req: ", request);

      const post = await postService.createPost(detailPost);
      return {
        message: "Post created successfully",
        data: post,
      };
    } catch (error) {
      logger.error(`Service method error: ${error}`);
      throw error;
    }
  }

  @SuccessResponse(StatusCode.Created, "Created successfully")
  @Patch("/:id")
  @Middlewares(validateInput(PostSaveSchema))
  @Middlewares(verificationToken)
  public async UpdatePost(
    @Request() request: any,
    @Path() id: string,
    @Body() requestBody: postDetail
  ): Promise<any> {
    try {
      const existPost = await postService.findPostById(request.id);
      if (!existPost) {
        throw new CustomError("Post not found", StatusCode.NotFound);
      }
      const post = await postService.updatePost(id, requestBody);
      return {
        message: "Post updated successfully",
        data: post,
      };
    } catch (error) {
      logger.error(`Service method error: ${error}`);
      throw error;
    }
  }
}
