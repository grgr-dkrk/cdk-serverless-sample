import { Construct, Duration, Stack, StackProps } from '@aws-cdk/core'
import { Code, Function as LambdaFunction, Runtime } from '@aws-cdk/aws-lambda'
import { DeployEnv } from '../config'

type Props = StackProps & {
  code: Code
  handlerName: string
  deployEnv: DeployEnv
  functionName?: string
}

/**
 * Stack for aws-lambda
 */
export class LambdaStack extends Stack {
  public readonly lambda: LambdaFunction
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    const { code, handlerName, functionName } = props

    this.lambda = new LambdaFunction(this, `LambdaFunc${id}`, {
      code,
      functionName: functionName || 'Lambda',
      handler: `index.${handlerName}`,
      runtime: Runtime.NODEJS_10_X,
      timeout: Duration.seconds(10),
    })
  }
}
