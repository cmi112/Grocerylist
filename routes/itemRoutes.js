const router = require("express").Router();
const item = require("../controllers/item");


router.get("/",item.getItems);
router.get("/:id", item.getSingelItem);
router.post("/", item.postItem);
router.patch("/:id",item.patchItem);
// router.get("/items", item.findItemlist);
 router.delete("/:id",item.deleteItem);

module.exports = router;
