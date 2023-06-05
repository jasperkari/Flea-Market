import express, { json } from 'express';
import controller from './src/controller';

const app = express();

app.use(json());

app.get('/users', async (req, res) => {
  const users = await controller.getAllUsers();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = req.body;
  res.json(await controller.createUser(user));
});

app.get('/users/:username', async (req, res) => {
  res.json(await controller.getUser(req.params.username));
});

app.put('/users/:username', async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const result = await controller.updateUser(id, user);
  res.json(result);
});

app.delete('/users/:username', async (req, res) => {
  const result = await controller.deleteUser(req.params.username);
  res.json(result);
});

app.get('/login', async (req, res) => {
  res.json(await controller.login(req.body.username, req.body.password));
});

// Start server
app.listen(3001, () => {});
