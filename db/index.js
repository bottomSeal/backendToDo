const { Sequelize } = require("sequelize");

//Создваем instance Sequelize
const sequelizeInstance = new Sequelize({

    dialect: "sqlite",
    storage: "./sqliteData/database.sqlite",
});

const initDB = async () => {
    try {
        await sequelizeInstance.authenticate(); //Авторизация нашей ORM в БД
        await sequelizeInstance.sync(); //Синхронизация МОДЕЛЕЙ
        console.log("Sequelize was initialized");
    } catch (error) {
        console.log("Sequelize ERROR (initDB)", error);
        process.exit();
    }
};

module.exports = {
    sequelizeInstance,
    initDB,
};
