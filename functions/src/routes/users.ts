import * as express from "express";
const router = express.Router();

router.get("/info", (req, res) =>
  res.send({ name: "vu le", message: "i'm a software" })
);

export default router;
