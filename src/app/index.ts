import { ping as pingFunction } from './functions/ping'
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

export const ping: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  console.log(event)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: pingFunction(),
      },
      null,
      2,
    ),
  }
}
