"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroceryItem = exports.removeGroceryItem = exports.viewGroceryItems = exports.addGroceryItem = void 0;
const groceryItem_1 = __importDefault(require("../models/groceryItem"));
const addGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, stock } = req.body;
        const newItem = yield groceryItem_1.default.create({ name, price, stock });
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding item", error });
    }
});
exports.addGroceryItem = addGroceryItem;
// View all items
const viewGroceryItems = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield groceryItem_1.default.findAll();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching items", error });
    }
});
exports.viewGroceryItems = viewGroceryItems;
// Remove an item
const removeGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield groceryItem_1.default.destroy({ where: { id } });
        res.status(200).json({ message: "Item removed" });
    }
    catch (error) {
        res.status(500).json({ message: "Error removing item", error });
    }
});
exports.removeGroceryItem = removeGroceryItem;
// Update an item
const updateGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        yield groceryItem_1.default.update({ name, price, stock }, { where: { id } });
        res.status(200).json({ message: "Item updated" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating item", error });
    }
});
exports.updateGroceryItem = updateGroceryItem;
