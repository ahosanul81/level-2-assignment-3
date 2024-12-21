import { TUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";

const updateUserStatusIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await UserModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  ).select({ _id: 1, isBlocked: 1 });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id, { new: true });
  return result;
};
export const adminServices = {
  updateUserStatusIntoDB,
  deleteUserFromDB,
};
