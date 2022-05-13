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
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.get('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Make sure cell storage file exists (user provides this in CLI)
        // If file does not exist, add in default list of cells.
        // Read the file
        // Parse a list of cells from the file
        // Return the list of cells to browser
    }));
    router.post('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Make sure file exists
        // If not, create it
        // Take the list of cells from the request obj
        // Serialize the list
        // Write the serialized list to the file
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
