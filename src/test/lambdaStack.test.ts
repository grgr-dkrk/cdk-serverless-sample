import { Code } from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import { LambdaStack } from '../stacks'
import * as path from 'path'
import { SynthUtils } from '@aws-cdk/assert'
import { envMock } from './__mocks__/env'

describe('lambdaStack', () => {
  const app = new cdk.App()
  const lambdaStack = new LambdaStack(app, 'TestLambdaStack', {
    code: Code.fromAsset(path.resolve(__dirname, './__mocks__/functions')),
    deployEnv: 'staging',
    handlerName: 'LambdaFunctionMock',
    env: envMock,
  })
  it('snapshot', () => {
    expect(SynthUtils.toCloudFormation(lambdaStack)).toMatchSnapshot(
      'lambdaTest',
    )
  })
})
