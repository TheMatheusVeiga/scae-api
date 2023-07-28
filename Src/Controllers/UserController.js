const _userServices = require('../Services/User.js');

exports.register = async (req, res) => {
  try {
    
    const { first_name, last_name, email, password } = req.body;

    // Validate inputs
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.signIn = async (req, res) => {
  console.log("Controller !");
    const user = req.body;
    const result = await _userServices.signIn(user);
    res.status(201).send(result);
};


async function getUserByEmail(email) {
    const userEmail = String.toLowerCase(email);
    const response = db.query('SELECT * FROM public.users WHERE email = "$1"', [userEmail])
                    .catch(err => {console.log(err)})
                    .then(res => {return res.rows[0]});
    return await response;
}