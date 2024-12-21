import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.db_user}:${config.db_pass}@cluster0.jhmpwvf.mongodb.net/blog-project?retryWrites=true&w=majority&appName=Cluster0`
    );
    app.listen(config.port, () => {
      console.log(`Blog project app listening on port ${config.port}`);
    });
  } catch (error) {}
}
main();
