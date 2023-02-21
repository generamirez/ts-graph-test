// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

type Data = {
  name: string
}

type ResponseData = {
  [key: string]: number | string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<ResponseData>>
) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  await fs.readFile(jsonDirectory + '/data.json', 'utf-8')
    .then((d) =>
      res.status(200).end(JSON.stringify(d)))
    .catch((err) => {
      res.json(err);
      res.status(404).end();
    });
}
