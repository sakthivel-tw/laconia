const AWS = require("aws-sdk");

module.exports = class DynamoDbOrderRepository {
  constructor(tableName) {
    this.tableName = tableName;
    this.documentClient = new AWS.DynamoDB.DocumentClient();
  }

  save(order) {
    const params = {
      TableName: this.tableName,
      Item: order
    };
    return this.documentClient.put(params).promise();
  }

  async find(orderId) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: "OrderId = :orderId",
      ExpressionAttributeValues: {
        ":orderId": orderId
      }
    };

    const data = await this.documentClient.query(params).promise();
    return data.Items[0];
  }
};
