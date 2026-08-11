const {
  getItems,
  createItemForUser,
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

const createNewItem = async (req, res, next) => {
  try {
    const item = await createItemForUser({
      userId: req.user.id,
      itemData: req.body,
    });

    return res.status(201).json({
      ok: true,
      message: "Tarea creada correctamente",
      data: {
        item,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllItems,
  createNewItem,
};