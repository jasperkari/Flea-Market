/* eslint-disable no-underscore-dangle */
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const IBM = require('ibm-cos-sdk');
const { v4: uuidv4 } = require('uuid');

const service = CloudantV1.newInstance({
  authenticator: new IamAuthenticator({
    apikey: process.env.CLOUDANT_API_KEY
  }),
  serviceUrl:
    'https://5787f254-8c6b-48cc-8f28-4626479bca67-bluemix.cloudantnosqldb.appdomain.cloud'
});

const config = {
  endpoint: 's3.eu-de.cloud-object-storage.appdomain.cloud',
  apiKeyId: process.env.s3_api,
  serviceInstanceId:
    'crn:v1:bluemix:public:cloud-object-storage:global:a/a3b8e816ae29455ebc2f334d40da3749:e881314a-62a2-47e0-9cd9-2f249700d8ed::',
  signatureVersion: 'iam'
};

const cos = new IBM.S3(config);

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
        imageKey: row.doc.image,
        name: row.doc.name,
        username: row.doc.username,
        price: row.doc.price,
        description: row.doc.description
      }));

      const imagePromises = products.map(async (product) => {
        try {
          const data = await cos
            .getObject({
              Bucket: 'productimage',
              Key: product.imageKey
            })
            .promise();
          return data.Body;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(`ERROR: ${e.code} - ${e.message}\n`);
          return null;
        }
      });

      const images = await Promise.all(imagePromises);

      const productsWithImages = products.map((product, index) => ({
        ...product,
        image: images[index]
      }));

      return productsWithImages;
    },
    async getUserProducts(ctx) {
      const username = ctx.meta.user.username;

      const response = await service.postFind({
        db: 'product',
        selector: {
          username
        }
      });    

      const products = response.result.docs.map((row) => ({
        id: row._id,
        rev: row._rev,
        imageKey: row.image,
        name: row.name,
        username: row.username,
        price: row.price,
        description: row.description
      }));

      console.log(products);

      const imagePromises = products.map(async (product) => {
        try {
          const data = await cos
            .getObject({
              Bucket: 'productimage',
              Key: product.imageKey
            })
            .promise();
          return data.Body;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(`ERROR: ${e.code} - ${e.message}\n`);
          return null;
        }
      });

      const images = await Promise.all(imagePromises);

      const productsWithImages = products.map((product, index) => ({
        ...product,
        image: images[index]
      }));

      return productsWithImages;
    },
    async createProduct(ctx) {
      const { file } = ctx.params.req;
      const { name } = ctx.params;
      const { price } = ctx.params;
      const { description } = ctx.params;
      const { username } = ctx.params;
      const uniqueName = uuidv4();

      try {
        await cos
          .putObject({
            Bucket: 'productimage',
            Key: uniqueName,
            Body: file.buffer
          })
          .promise();
        // eslint-disable-next-line no-console
        console.log('File uploaded successfully');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`ERROR: ${e.code} - ${e.message}\n`);
      }

      const newDocument = {
        name,
        price,
        description,
        username,
        image: uniqueName
      };

      const response = await service.postDocument({
        db: 'product',
        document: newDocument
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
      const products = await ctx.call('prodDb.getProducts');
      const productExists = products.find(
        (product) => product.id === params.id
      );

      if (!productExists) {
        return { error: "This product doesn't exist" };
      }

      const response = await service.deleteDocument({
        db: 'product',
        docId: productExists.id,
        rev: productExists.rev
      });

      return response.result;
    },
    async deleteOwnProduct(ctx) {
      const { id } = ctx.params;
      const metaUsername = ctx.meta.user.username;
      const products = await ctx.call('prodDb.getProducts');
      const productExists = products.find(
        (product) => product.id === id
      );

      if (!productExists) {
        return { error: "This product doesn't exist" };
      }

      if (productExists.username !== metaUsername) {
        return { error: "Username doesn't match" };
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
