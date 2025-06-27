// Product model 정의

module.exports = (sequelize, DataTypes) => {
  const newProduct = sequelize.define(
    // Product 모델 정의
    "Product",
    {
      id: {
        type: DataTypes.INTEGER, // 양수
        autoIncrement: true, // 자동 증가
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      image_url: DataTypes.STRING(255),
      spec: {
        type: DataTypes.ENUM("hit", "best", "new", "normal"),
        defaultValue: "normal",
      },
      //   created_at: {
      //     type: DataTypes.DATE,
      //     defaultValue: DataTypes.NOW,
      //   },
      //   updated_at: {
      //     type: DataTypes.DATE,
      //     defaultValue: DataTypes.NOW,
      //   },
    },
    {
      tableName: "products",
      timestamps: true, // createdAt, updatedAt 자동 생성
      underscored: true, // created_at, updated_at으로 생성
    }
  );
  return newProduct;
};
