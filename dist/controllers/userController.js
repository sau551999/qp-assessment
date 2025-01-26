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
exports.bookGroceryItems = exports.viewAvailableItems = void 0;
const groceryItem_1 = __importDefault(require("../models/groceryItem"));
const viewAvailableItems = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield groceryItem_1.default.findAll({ where: { stock: { [Symbol("gt")]: 0 } } });
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching items", error });
    }
});
exports.viewAvailableItems = viewAvailableItems;
const bookGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        for (const { id, quantity } of items) {
            const groceryItem = yield groceryItem_1.default.findByPk(id);
            if (groceryItem && groceryItem.stock >= quantity) {
                yield groceryItem.update({ stock: groceryItem.stock - quantity });
            }
            else {
                return res.status(400).json({ message: `Insufficient stock for item ID ${id}` });
            }
        }
        res.status(200).json({ message: "Order placed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
});
exports.bookGroceryItems = bookGroceryItems;
