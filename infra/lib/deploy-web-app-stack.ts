import { Construct } from "constructs";
import { Stack, type StackProps } from "aws-cdk-lib";
import { DeploymentService } from "./deployment-service";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DeployWebAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new DeploymentService(this, "deployment");

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
