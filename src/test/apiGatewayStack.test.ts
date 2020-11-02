import { Code } from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import { APIGatewayStack, LambdaStack } from '../stacks'
import * as path from 'path'
import { SynthUtils } from '@aws-cdk/assert'
import { envMock } from './__mocks__/env'

describe('APIGatewayStack', () => {
  const app = new cdk.App()
  const lambdaStack = new LambdaStack(app, 'TestLambdaStack', {
    code: Code.fromAsset(path.resolve(__dirname, './__mocks__/functions')),
    deployEnv: 'staging',
    handlerName: 'LambdaFunctionMock',
    env: envMock,
  })
  const apiGatewayStack = new APIGatewayStack(app, 'TestApiGatewayStack', {
    lambda: lambdaStack.lambda,
    resourceName: 'LambdaFunctionMock',
    deployEnv: 'staging',
    env: envMock,
  })
  it('snapshot', () => {
    expect(SynthUtils.toCloudFormation(apiGatewayStack)).toMatchSnapshot(
      'apiGatewayTest',
    )
  })
})
