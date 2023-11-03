import User, { IUser } from "../Model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT = 3;

class AuthController {
  static user: IUser;

  constructor(user: IUser) {
    AuthController.user = user;
  }

  static genToken(user: IUser) {
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    return token;
  }

  static async signup(userT: IUser) {
    try {
      userT.password = bcrypt.hashSync(userT.password.toString(), SALT);
      const newUser = new User(userT);
      await newUser.save();
      return newUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async signin(email: string, password: string) {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw "error usuário não encontrado";
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password.toString());

    if (!passwordIsValid) {
      throw new Error("Invalid Email or Password!");
    }
    const token = AuthController.genToken(user);

    return { token, userData: email };
  }
}

export default AuthController;
