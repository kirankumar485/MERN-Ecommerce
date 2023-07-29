import User from "../model/user-schema.js";

export const userSignup = async (request, response) => {
  try {
    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response.status(401).json({ message: "Username already exist" });
    }

    const user = request.body;
    const newUser = new User(user);
    await newUser.save();

    response.status(200).json({ message: user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const userLogin = async (request, response) => {
  try {
    console.log(request.body);
    const username = request.body.login;
    const password = request.body.password;
    console.log(username, "kkkkk");
    let user = await User.findOne({ username: username, password: password });
    console.log(user);
    if (user) {
      return response.status(200).json({ data: user });
    } else {
      return response.status(401).json("Invalid Login");
    }
  } catch (error) {
    response.status(500).json("Error", error);
  }
};
