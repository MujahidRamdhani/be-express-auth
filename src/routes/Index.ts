import { Router, Request, Response } from 'express';

const indexRoutes = Router({ mergeParams: true });

indexRoutes.get('/', (req: Request, res: Response) => {
  res.send('Hallo');
});

export default indexRoutes;
