import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlogIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog created successfully",
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.updateBlogIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog updated successfully",
    data: result,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.deleteBlogIntoDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Blog deleted successfully",
    data: result,
  });
});
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All Blogs fetched successfully",
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
