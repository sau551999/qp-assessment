import { Request, Response } from "express";
import GroceryItem from "../models/groceryItem";

export const viewAvailableItems = async (_req: Request, res: Response) => {
  try {
    const items = await GroceryItem.findAll({ where: { stock: { [Symbol("gt")]: 0 } } });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

export const bookGroceryItems = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    for (const { id, quantity } of items) {
      const groceryItem = await GroceryItem.findByPk(id);
      if (groceryItem && groceryItem.stock >= quantity) {
        await groceryItem.update({ stock: groceryItem.stock - quantity });
      } else {
        return res.status(400).json({ message: `Insufficient stock for item ID ${id}` });
      }
    }
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};
