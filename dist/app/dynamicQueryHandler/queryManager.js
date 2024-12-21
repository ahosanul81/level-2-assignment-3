"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryManager {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchAbleFields) {
        const search = this === null || this === void 0 ? void 0 : this.query.searchParam;
        if (search) {
            this.modelQuery = this === null || this === void 0 ? void 0 : this.modelQuery.find({
                $or: searchAbleFields.map((field) => ({
                    [field]: { $regex: search, $options: "i" },
                })),
            });
        }
        return this;
    }
    sort() {
        const sortBy = (this === null || this === void 0 ? void 0 : this.query.sortBy) || "createdAt";
        const sortOrder = (this === null || this === void 0 ? void 0 : this.query.sortOrder) || "desc";
        if (sortBy) {
            this.modelQuery = this === null || this === void 0 ? void 0 : this.modelQuery.sort(sortBy);
        }
        if (sortBy && sortOrder) {
            if (sortOrder === "desc") {
                this.modelQuery = this === null || this === void 0 ? void 0 : this.modelQuery.sort({ sortBy: -1 });
            }
            else {
                this.modelQuery = this === null || this === void 0 ? void 0 : this.modelQuery.sort({ sortBy: 1 });
            }
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        // filter
        const excludeFields = ["search", "sortBy", "sortOrder"];
        excludeFields.forEach((elem) => delete queryObj[elem]);
        console.log(queryObj);
        this.modelQuery = this === null || this === void 0 ? void 0 : this.modelQuery.find(queryObj);
        return this;
    }
}
exports.default = QueryManager;
