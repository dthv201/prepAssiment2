// import express from "express";
// import commentsController from "../controllers/comments_controller";

// const router = express.Router();

// router.post("/", commentsController.createComment.bind(commentsController));
// router.get("/", commentsController.getAllComments.bind(commentsController));
// router.get("/:id", (req, res) => {
//     commentsController.getCommentById(req, res);
// });
// router.put("/:id", commentsController.updateComment.bind(commentsController));
// router.delete("/:id", commentsController.deleteComment.bind(commentsController));

// export default router;

import express from "express";
import commentsController from "../controllers/comments_controller";

const router = express.Router();

router.get("/", commentsController.getAll.bind(commentsController));

router.get("/:id", (req, res) => {
    commentsController.getById(req, res);
});

router.post("/", commentsController.create.bind(commentsController));

router.put("/:id", commentsController.update.bind(commentsController));
router.delete("/:id", commentsController.deleteItem.bind(commentsController));

export default router;