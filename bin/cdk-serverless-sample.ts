#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkServerlessSampleStack } from '../lib/cdk-serverless-sample-stack';

const app = new cdk.App();
new CdkServerlessSampleStack(app, 'CdkServerlessSampleStack');
