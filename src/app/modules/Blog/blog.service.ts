import { unknown } from "zod";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import QueryManager from "../../dynamicQueryHandler/queryManager";
import { searchAbleFields } from "./blog.constants";

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result;
};
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await BlogModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );

  return result;
};
const deleteBlogIntoDB = async (id: string) => {
  const result = await BlogModel.findByIdAndDelete(id, { new: true });
  return result;
};
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  // const result = await BlogModel.find();
  const blogQuery = new QueryManager(BlogModel.find().populate("author"), query)
    .search(searchAbleFields)
    .sort()
    .filter();
  // console.log(blogQuery);
  const result = await blogQuery.modelQuery;
  return result;
};

export const blogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  getAllBlogsFromDB,
  deleteBlogIntoDB,
};
