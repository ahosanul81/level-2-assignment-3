"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./modules/User/user.route"));
const globalErrorHandler_1 = require("./utils/globalErrorHandler");
const auth_route_1 = __importDefault(require("./modules/Auth/auth.route"));
const blog_route_1 = __importDefault(require("./modules/Blog/blog.route"));
const admin_route_1 = __importDefault(require("./modules/Admin/admin.route"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/auth/user", user_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/blogs", blog_route_1.default);
app.use("/api/admin", admin_route_1.default);
app.get("/", (req, res) => {
    res.json("Blog server is running");
});
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
