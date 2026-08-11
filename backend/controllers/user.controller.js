const {
  registerUser,
} = require("../services/user.service");

const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      ok: true,
      message: "Usuario registrado correctamente",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};