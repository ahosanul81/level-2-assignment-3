import { Query } from "mongoose";

class QueryManager<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    const search = this?.query.searchParam;

    if (search) {
      this.modelQuery = this?.modelQuery.find({
        $or: searchAbleFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      });
    }
    return this;
  }

  sort() {
    const sortBy = this?.query.sortBy || "createdAt";
    const sortOrder = this?.query.sortOrder || "desc";
    if (sortBy) {
      this.modelQuery = this?.modelQuery.sort(sortBy as string);
    }
    if (sortBy && sortOrder) {
      if (sortOrder === "desc") {
        this.modelQuery = this?.modelQuery.sort({ sortBy: -1 });
      } else {
        this.modelQuery = this?.modelQuery.sort({ sortBy: 1 });
      }
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    // filter
    const excludeFields = ["search", "sortBy", "sortOrder"];
    const { filter: authorId } = queryObj;

    excludeFields.forEach((elem) => delete queryObj[elem]);
    this.modelQuery = this?.modelQuery.find({ author: authorId });
    return this;
  }
}

export default QueryManager;
