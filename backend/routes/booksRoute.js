import express from "express";
import { Book } from "../models/bookModel.js";
import { AsyncLocalStorage } from "async_hooks";

const router = express.Router();

//used for adding a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(200).send({
        message: "Send all required fields:title,author,publishYear",
      });
    }
    const newbook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newbook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    // res.status(500).send({ message: error.message });
  }
});

//used for getting all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    // res.status(500).send({ message: error.message });
  }
});

//used for getting a book by id

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    // res.status(500).send({ message: error.message });
  }
});

//used for updating a book by id
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Please fill all fields" });
    }
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "book updated sucessfully" });
  } catch (error) {
    console.log(error.message);

    res.status(500).send({ message: error.message });
  }
});

//used to delete a book by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "book deleted sucessfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
