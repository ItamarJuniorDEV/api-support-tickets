export function update({ req, res, database }) {
  const { id } = req.params;
  const { equipment, description } = req.body;

  return res.writeHead(200).end();
}
