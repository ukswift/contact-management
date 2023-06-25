import axios from "axios";
import express from "express";

const router = express.Router();

const DB_URL = "http://localhost:3004/contacts/";

router.get("/contacts", async (req, res) => {
  const contacts = await axios.get(DB_URL);
  res.json(contacts.data);
});

router.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await axios.get(DB_URL + id);
    res.json(contact.data);
  } catch (error) {
    res.status(400).json({ message: "The contact does not exist" });
  }
});

router.post("/contacts", async (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    res.status(400).json({ message: "Bad request" });
  }
  const resp = await axios.post(DB_URL, { name, number });
  res.status(201).json({ message: "Contact created successfully" });
  console.log(name, number);
});

router.put("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { name, number } = req.body;
  if (!name || !number) {
    res.status(400).json({ message: "Bad request" });
  }
  try {
    const contact = await axios.put(DB_URL + id, { name, number });
    res.json({ message: "Updated contact details successfully" });
  } catch (error) {
    res.status(400).json({ message: "The contact does not exist" });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await axios.delete(DB_URL + id);
    res.json(contact.data);
  } catch (error) {
    res.json({ message: "Contact deleted successfully" });
  }
});

export default router;
