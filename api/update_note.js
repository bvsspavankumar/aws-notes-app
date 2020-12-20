/**
 * Route: PATCH /note/{note_id}
 */

const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-1'})

const util = require('./utils')

const dynamodb = new AWS.Dynamodb.DocumentClient()
const tableName = process.env.NOTES_TABLE;

exports.handler = async event => {
    try {
        let item = JSON.parse(event.body).Item;
        item.user_id = util.getUserId(event.headers)
        item.user_name = util.getUserName(event.headers)
        item.expires = moment().add(90, 'days').unix()

        let data = await dynamodb.put({
            TableName: tableName,
            Item: item,
            ConditionExpression: '#t = :t',
            ExpressionAttributeNames: {
                '#t': 'timestamp'
            },
            ExpressionAttributeValues: {
                ':t': item.timestamp
            }
        }).promise();

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: Json.stringify(item)
        }
    } catch (err) {
        console.log("Error", err)
        return {
            statusCode: err.statusCode?err.statusCode:500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name?err.name:"Exception",
                message: err.message?err.messaage:"Unknown error"
            })
        }
    }
}