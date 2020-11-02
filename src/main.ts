#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { LambdaStack } from './stacks/lambdaStack'
import { AwsAccount, DeployEnv, Env, ID_PREFIX, Region } from './config'
import { Code } from '@aws-cdk/aws-lambda'
import { APIGatewayStack } from './stacks'
import * as path from 'path'

const app = new cdk.App()

const apiResourceName = 'ping'

const deployEnv = app.node.tryGetContext('deployEnv') as DeployEnv | undefined
if (!deployEnv) throw new Error('There is No DeployEnv')

const env: Env = {
  account: AwsAccount[deployEnv],
  region: Region[deployEnv],
}
if (!env.account) throw new Error('There is No AWS Account')

/**
 * Stack: Lambda
 */
const pingLambdaStack = new LambdaStack(
  app,
  `${ID_PREFIX}-LambdaStack-${deployEnv}`,
  {
    code: Code.fromAsset(path.resolve(__dirname, './app/dist')),
    handlerName: apiResourceName,
    deployEnv,
    env,
  },
)

/**
 * Stack: API Gateway
 */
new APIGatewayStack(app, `${ID_PREFIX}-APIGatewayStack-${deployEnv}`, {
  lambda: pingLambdaStack.lambda,
  resourceName: apiResourceName,
  deployEnv,
  env,
})
