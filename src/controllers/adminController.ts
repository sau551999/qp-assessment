import { Request, Response } from "express";
import GroceryItem from "../models/groceryItem";

export const addGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const newItem = await GroceryItem.create({ name, price, stock });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
};

// View all items
export const viewGroceryItems = async (_req: Request, res: Response) => {
  try {
    const items = await GroceryItem.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// Remove an item
export const removeGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await GroceryItem.destroy({ where: { id } });
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

// Update an item
export const updateGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    await GroceryItem.update({ name, price, stock }, { where: { id } });
    res.status(200).json({ message: "Item updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};
