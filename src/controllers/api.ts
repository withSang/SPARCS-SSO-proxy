import { Request, Response } from "express";

const verifyUser = (req: Request, res: Response) => {
  const sparcsID = req.session.user?.sparcs_id;
  if (!sparcsID) res.status(401).send("Unauthorized");
  else res.status(200).send("Logged in");
};

export { verifyUser };
