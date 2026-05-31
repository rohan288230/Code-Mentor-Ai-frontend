const User = require('../models/User');

class AuthService {
  static async registerUser(name, email, password) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });
    if (!user) {
      throw new Error('Invalid user data');
    }
    return user;
  }

  // static async loginUser(email, password) {
  //   const user = await User.findOne({ email });
  //   if (user && (await user.matchPassword(password))) {
  //     return user;
  //   }
  //   throw new Error('Invalid email or password');
  // }
  static async loginUser(email, password) {
  

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }


  const isMatch = await user.matchPassword(password);


  if (isMatch) {
    return user;
  }

  throw new Error("Invalid email or password");
}


  static async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = AuthService;
