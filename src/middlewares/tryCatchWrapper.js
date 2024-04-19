import sequelize from "../db/connect.js";
import { createCustomError } from "../errors/customErrors.js";

export function tryCatchWrapper(func, transaction = false) {
  return async (req, res, next) => {
    const t = transaction ? await sequelize.transaction() : null;

    try {
      if (transaction) {
        await func(req, res, next, t);
        await t.commit();
      } else {
        await func(req, res, next);
      }
    } catch (error) {
      if (transaction) await t.rollback();
      return next(createCustomError(error, 400));
    }
  };
}
