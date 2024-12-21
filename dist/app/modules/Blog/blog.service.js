"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = void 0;
const blog_model_1 = require("./blog.model");
const queryManager_1 = __importDefault(require("../../dynamicQueryHandler/queryManager"));
const blog_constants_1 = require("./blog.constants");
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.create(payload);
    return result;
});
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
    return result;
});
const deleteBlogIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findByIdAndDelete(id, { new: true });
    return result;
});
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await BlogModel.find();
    const blogQuery = new queryManager_1.default(blog_model_1.BlogModel.find().populate("author"), query)
        .search(blog_constants_1.searchAbleFields)
        .sort()
        .filter();
    // console.log(blogQuery);
    const result = yield blogQuery.modelQuery;
    return result;
});
exports.blogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogsFromDB,
    deleteBlogIntoDB,
};
