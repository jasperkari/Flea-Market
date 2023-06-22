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
  name: 'prodDb',
  actions: {
    async getProducts() {
      const response = await service.postAllDocs({
        db: 'product',
        includeDocs: true
      });
      const products = response.result.rows.map((row) => ({
        id: row.doc._id,
        rev: row.doc._rev,
        image: row.doc.image,
        name: row.doc.name,
        username: row.doc.username,
        price: row.doc.price,
        description: row.doc.description
      }));
      return products;
    },
    async createProduct(ctx) {
      const response = await service.postDocument({
        db: 'product',
        document: ctx.params
      });
      return response.result;
    },
    async updateProduct(ctx) {
      const { id, name } = ctx.params;
      const response = await service.postDocument({
        db: 'product',
        document: {
          _id: id,
          ...name
        }
      });
      return response.result;
    },
    async deleteProduct(ctx) {
      const { params } = ctx;
      const products = await ctx.call('db.getProducts');
      const productExists = products.find(
        (product) => product.id === params.id
      );
      if (!productExists) {
        return { error: "A user with this username doesn't exists" };
      }
      const response = await service.deleteDocument({
        db: 'product',
        docId: productExists.id,
        rev: productExists.rev
      });
      return response.result;
    }
  }
};
