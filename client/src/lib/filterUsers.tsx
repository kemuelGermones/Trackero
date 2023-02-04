import { IUser } from "../types/interface";

// Filter Users

const filterUsers = (users: IUser[], category: string) => {
  // Filter by Developer

  if (category === "Developer" && Array.isArray(users)) {
    return [...users].filter((user) => user.role === "Developer");
  }

  // Filter by Administrator

  if (category === "Administrator" && Array.isArray(users)) {
    return [...users].filter((user) => user.role === "Administrator");
  }
  return users;
};

export default filterUsers;
