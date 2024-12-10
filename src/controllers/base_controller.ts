import { Request, Response } from "express";
import { Model } from "mongoose";

export class BaseController<T> {
  model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(req: Request, res: Response) {
    const senderFilter = req.query.sender;
    try {
      if (senderFilter) {
        const posts = await this.model.find({ sender: senderFilter });
        res.status(200).send(posts);
      } else {
        const posts = await this.model.find();
        res.status(200).send(posts);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  };

  async getById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const post = await this.model.findById(id);
      if (post === null) {
        return res.status(404).send("Post not found");
      } else {
        return res.status(200).send(post);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  };

  async create(req: Request, res: Response) {
    console.log(req.body);
    try {
      const post = await this.model.create(req.body);
      res.status(201).send(post);
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  };

  async update (req: Request, res: Response) {
    const id = req.params.id;
    try {
        const rs = await this.model.findOneAndUpdate({ _id: id });
        res.status(200).send(rs);
    } catch (error) {
        res.status(400).send(error);
    }
  
  };
  async deleteItem(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const rs = await this.model.findByIdAndDelete(id);
        res.status(200).send(rs);
    } catch (error) {
        res.status(400).send(error);
    }
};
};


const createController = <T>(model: Model<T>) => {
  return new BaseController(model);
}
export default createController;