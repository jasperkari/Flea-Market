/* eslint-disable no-underscore-dangle */
import { CloudantV1 } from '@ibm-cloud/cloudant';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';

const service = CloudantV1.newInstance({
  authenticator: new IamAuthenticator({
    apikey: process.env.CLOUDANT_API_KEY
  }),
  serviceUrl:
    'https://5787f254-8c6b-48cc-8f28-4626479bca67-bluemix.cloudantnosqldb.appdomain.cloud'
});

async function getAllUsers() {
  const response = await service.postAllDocs({
    db: 'user',
    includeDocs: true
  });
  const users = response.result.rows.map((row) => ({
    _id: row.doc._id,
    username: row.doc.username,
    password: row.doc.password,
    email: row.doc.email
  }));
  return users;
}

async function createUser(user) {
  const response = await service.postDocument({
    db: 'user',
    document: user
  });
  return response.result;
}

async function updateUser(id, user) {
  const response = await service.postDocument({
    db: 'user',
    document: {
      _id: id,
      ...user
    }
  });
  return response.result;
}

async function deleteUser(id) {
  const doc = await service.getDocument({
    db: 'user',
    docId: id
  });
  const response = await service.deleteDocument({
    db: 'user',
    docId: id,
    rev: doc.result._rev
  });
  return response.result;
}

function getWithUsername(users, username) {
  return users.find((u) => u.username === username);
}

async function login(users, username, password) {
  const user = users.find((u) => u.username === username);
  if (user) {
    if (user.password === password) {
      return user;
    }
    return { error: 'username or password wrong' };
  }
  return { error: 'username or password wrong' };
}

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getWithUsername,
  login
};
