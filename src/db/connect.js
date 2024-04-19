import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.MSSQL_DATABASE,
  process.env.MSSQL_USER,
  process.env.MSSQL_PASSWORD,
  {
    host: process.env.MSSQL_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
    logging: false,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connection with ${process.env.MSSQL_DATABASE} has been established successfully.`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

export default sequelize;
