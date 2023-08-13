/* eslint-disable no-underscore-dangle */
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const IBM = require('ibm-cos-sdk');

const service = CloudantV1.newInstance({
  authenticator: new IamAuthenticator({
    apikey: process.env.CLOUDANT_API_KEY
  }),
  serviceUrl:
    'https://5787f254-8c6b-48cc-8f28-4626479bca67-bluemix.cloudantnosqldb.appdomain.cloud'
});

const config = {
  endpoint: 's3.eu-de.cloud-object-storage.appdomain.cloud',
  apiKeyId: 'HBBw--JKn5otzUVSyknQE2GksF7Ek3LgdYQXkNZhUM53',
  serviceInstanceId:
    'crn:v1:bluemix:public:cloud-object-storage:global:a/a3b8e816ae29455ebc2f334d40da3749:e881314a-62a2-47e0-9cd9-2f249700d8ed::',
  signatureVersion: 'iam'
};

const cos = new IBM.S3(config);

module.exports = {
  name: 'orderDb',
  actions: {
    async getOrders() {
      const response = await service.postAllDocs({
        db: 'order',
        includeDocs: true
      });

      const Orders = response.result.rows.map((row) => ({
        id: row.doc._id,
        rev: row.doc._rev,
        imageKey: row.doc.imageKey,
        name: row.doc.name,
        username: row.doc.username,
        price: row.doc.price,
        description: row.doc.description
      }));

      const imagePromises = Orders.map(async (Order) => {
        try {
          const data = await cos
            .getObject({
              Bucket: 'productimage',
              Key: Order.imageKey
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

      const OrdersWithImages = Orders.map((Order, index) => ({
        ...Order,
        image: images[index]
      }));

      return OrdersWithImages;
    },
    async createOrder(ctx) {
      const documents = ctx.params.cart.map((item) => ({
        name: item.name,
        imageKey: item.imageKey,
        username: item.username,
        price: item.price,
        description: item.description,
        buyer: ctx.meta.user.username,
        fullName: ctx.params.formData.fullName,
        email: ctx.params.formData.email,
        phone: ctx.params.formData.phone,
        address: ctx.params.formData.address
      }));

      const responses = await Promise.all(
        documents.map((document) =>
          service.postDocument({
            db: 'order',
            document
          })
        )
      );

      await Promise.all(
        ctx.params.cart.map((item) =>
          ctx.call('prodDb.deleteProduct', { id: item.id })
        )
      );

      return responses;
    }
  }
};
