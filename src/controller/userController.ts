import User from "../modules/User";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
      return;
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
  
      // user
      user.password = undefined;

      res.status(200).json({user,token});
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
};


export const register = async (req, res) => {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
      return;
    }

    // Check if user already exist
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 2);

    // Create user in our database
    const user = await User.create({
      email,
      password: encryptedPassword,
      createdAt: new Date(),
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.password = undefined
    // return new user
    res.status(201).json({user});
}
