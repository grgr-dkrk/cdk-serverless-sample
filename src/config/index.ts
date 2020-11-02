// dotenv
import * as dotenv from 'dotenv'
dotenv.config()

// types
export type DeployEnv =
  | typeof DEPLOY_ENVIRONMENT_STG
  | typeof DEPLOY_ENVIRONMENT_PROD
export type AWSAccount = string | undefined
export type AWSRegion = string

// ID
export const ID_PREFIX = 'CdkServerLessSample'

// Deploy Environments
export const DEPLOY_ENVIRONMENT_STG = 'staging'
export const DEPLOY_ENVIRONMENT_PROD = 'production'

// Default Env
export const DEFAULT_AWS_ACCOUNT = process.env.AWS_ACCOUNT
export const DEFAULT_REGION = process.env.AWS_REGION || 'us-east-1'
export const AwsAccount: Record<DeployEnv, AWSAccount> = {
  [DEPLOY_ENVIRONMENT_STG]: DEFAULT_AWS_ACCOUNT,
  [DEPLOY_ENVIRONMENT_PROD]: DEFAULT_AWS_ACCOUNT,
}
export const Region: Record<DeployEnv, AWSRegion> = {
  [DEPLOY_ENVIRONMENT_STG]: DEFAULT_REGION,
  [DEPLOY_ENVIRONMENT_PROD]: DEFAULT_REGION,
}
export type Env = {
  account: AWSAccount
  region: AWSRegion
}
