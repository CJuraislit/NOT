import app from './app';
import { sequelize } from './config/db';

const PORT = Number(process.env.PORT) || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected successfully.');

    app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
  } catch (error) {
    console.log(error);
  }
};

start();
