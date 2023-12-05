import bcrypt from "bcryptjs";

export const verifyPasswordServer = async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
