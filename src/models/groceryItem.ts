import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

// Define the interface for the attributes
interface GroceryItemAttributes {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// Define the optional attributes for creation (id is auto-incremented)
interface GroceryItemCreationAttributes
  extends Optional<GroceryItemAttributes, "id"> {}

class GroceryItem extends Model<
  GroceryItemAttributes,
  GroceryItemCreationAttributes
> {
  stock!: number;  // Non-null assertion operator
}

GroceryItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "GroceryItem",
    tableName: "grocery_items",
    timestamps: false,
  }
);

export default GroceryItem;
