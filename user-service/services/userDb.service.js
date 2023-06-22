/* eslint-disable no-underscore-dangle */
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

const service = CloudantV1.newInstance({
  authenticator: new IamAuthenticator({
    apikey: process.env.CLOUDANT_API_KEY
  }),
  serviceUrl:
    'https://5787f254-8c6b-48cc-8f28-4626479bca67-bluemix.cloudantnosqldb.appdomain.cloud'
});

module.exports = {
  name: 'userDb',
  actions: {
    async getUsers() {
      const response = await service.postAllDocs({
        db: 'user',
        includeDocs: true
      });
      const users = response.result.rows.map((row) => ({
        id: row.doc._id,
        rev: row.doc._rev,
        username: row.doc.username,
        password: row.doc.password,
        email: row.doc.email,
        admin: row.doc.admin
      }));
      return users;
    },
    async createUser(ctx) {
      const response = await service.postDocument({
        db: 'user',
        document: ctx.params
      });
      return response.result;
    },
    async updateUser(ctx) {
      const { id, user } = ctx.params;
      const response = await service.postDocument({
        db: 'user',
        document: {
          _id: id,
          ...user
        }
      });
      return response.result;
    },
    async deleteUser(ctx) {
      const { params } = ctx;
      const users = await ctx.call('db.getUsers');
      const userExists = users.find(
        (user) => user.username === params.username
      );
      if (!userExists) {
        return { error: "A user with this username doesn't exists" };
      }
      const response = await service.deleteDocument({
        db: 'user',
        docId: userExists.id,
        rev: userExists.rev
      });
      return response.result;
    }
  }
};
