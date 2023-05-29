import * as dotenv from "dotenv";
dotenv.config();

import { createPost, getPost, getPosts } from "./db/db.js";
import { handleErrors } from "./db/error.js";

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ ok: true, result: "root path: ok" });
});


app.get("/posts", async (req, res) => {
  try {
    const result = await getPosts();
    return res.json({ ok: true, result });
  } catch (error) {
    console.log(error)
    const { status, message } = handleErrors(error.code)
    return res.status(status).json({ ok: false, result: message });
  }
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getPost(id)
    return res.json({ ok: true, result });
  } catch (error) {
    console.log(error)
    const { status, message } = handleErrors(error.code)
    return res.status(status).json({ ok: false, result: message });
  }
})

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion} = req.body
  try {
    const result = await createPost({ titulo, img, descripcion})
    return res.status(201).json({ ok: true, result })
  } catch (error) {
    console.log(error)
    const { status, message } = handleErrors(error.code)
    return res.status(status).json({ ok: false, result: message });
  }
})





















const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("servidor listo en http://localhost:" + PORT);
});