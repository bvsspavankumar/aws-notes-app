/**
 * Route: POST /note
 */

const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-1'})

const util = require('./utils')

const dynamodb = new AWS.Dynamodb.DocumentClient()
const tableName = process.env.NOTES_TABLE;

exports.handler = async event => {
    try {

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: Json.stringify('')
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