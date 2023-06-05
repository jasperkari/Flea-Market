/* eslint-disable no-underscore-dangle */
import {
  getAllUsers as _getAllUsers,
  getWithUsername,
  createUser as _createUser,
  deleteUser as _deleteUser,
  login as _login
} from './service';

function getAllUsers() {
  return _getAllUsers();
}

async function getUser(username) {
  const users = await _getAllUsers();
  const user = getWithUsername(users, username);
  if (!user) {
    return { error: 'no user found' };
  }
  return user;
}

async function createUser(user) {
  const users = await _getAllUsers();
  if (!getWithUsername(users, user.username)) {
    return _createUser(user);
  }
  return { error: 'username already taken' };
}

async function deleteUser(username) {
  const users = await _getAllUsers();
  const user = getWithUsername(users, username);
  if (!user) {
    return { error: 'no user found' };
  }
  return _deleteUser(user._id);
}

async function login(username, password) {
  const users = await _getAllUsers();
  return _login(users, username, password);
}

export default {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  login
};
