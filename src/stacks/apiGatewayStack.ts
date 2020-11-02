import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { Function as LambdaFunction } from '@aws-cdk/aws-lambda'
import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway'
import { DeployEnv } from '../config'

type Props = StackProps & {
  lambda: LambdaFunction
  resourceName: string
  deployEnv: DeployEnv
  apiName?: string
  method?: string
}

/**
 * Stack for aws-api-gateway
 */
export class APIGatewayStack extends Stack {
  public readonly restAPI: RestApi
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    const { apiName, lambda, method, resourceName } = props

    // rest api
    this.restAPI = new RestApi(this, `ApiGateway${id}`, {
      restApiName: apiName || 'myApi',
    })

    // add Resource
    const resource = this.restAPI.root.addResource(resourceName)

    // Integration
    const lambdaIntegration = new LambdaIntegration(lambda)

    // add Method
    resource.addMethod(method || 'GET', lambdaIntegration)
  }
}
