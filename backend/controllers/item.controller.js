const {
  getItems,
} = require("../services/item.service");

const getAllItems = async (req, res, next) => {
  try {
    const items = await getItems({
      userId: req.user.id,
      search: req.query.search,
    });

    return res.status(200).json({
      ok: true,
      message: "Tareas obtenidas correctamente",
      data: {
        items,
        total: items.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllItems,
};