import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // Generate Token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //set cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
};

export { generateTokenAndSetCookie };
