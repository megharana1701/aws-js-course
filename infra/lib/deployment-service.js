"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentService = void 0;
const constructs_1 = require("constructs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const path = '../dist/app/browser';
class DeploymentService extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const hostingBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, 'FrontendBucket', {
            blockPublicAccess: aws_cdk_lib_1.aws_s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        const distribution = new aws_cdk_lib_1.aws_cloudfront.Distribution(this, 'CloudfrontDistribution', {
            defaultBehavior: {
                origin: aws_cdk_lib_1.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(hostingBucket),
                viewerProtocolPolicy: aws_cdk_lib_1.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            defaultRootObject: 'index.html',
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                },
            ],
        });
        new aws_cdk_lib_1.aws_s3_deployment.BucketDeployment(this, 'BucketDeployment', {
            sources: [aws_cdk_lib_1.aws_s3_deployment.Source.asset(path)],
            destinationBucket: hostingBucket,
            distribution,
            distributionPaths: ['/*'],
        });
        new aws_cdk_lib_1.CfnOutput(this, 'CloudFrontUrl', {
            value: distribution.domainName,
            description: 'The distrubution Url',
            exportName: 'CloudFrontUrl',
        });
        new aws_cdk_lib_1.CfnOutput(this, 'BucketName', {
            value: hostingBucket.bucketName,
            description: 'The name of the S3 bucket',
            exportName: 'BucketName',
        });
    }
}
exports.DeploymentService = DeploymentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95bWVudC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVwbG95bWVudC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF1QztBQUN2Qyw2Q0FPcUI7QUFFckIsTUFBTSxJQUFJLEdBQUcscUJBQXFCLENBQUM7QUFFbkMsTUFBYSxpQkFBa0IsU0FBUSxzQkFBUztJQUM5QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sYUFBYSxHQUFHLElBQUksb0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQzlELGlCQUFpQixFQUFFLG9CQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBUztZQUNyRCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSw0QkFBYyxDQUFDLFlBQVksQ0FDbEQsSUFBSSxFQUNKLHdCQUF3QixFQUN4QjtZQUNFLGVBQWUsRUFBRTtnQkFDZixNQUFNLEVBQ0osb0NBQXNCLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUMzRCxhQUFhLENBQ2Q7Z0JBQ0gsb0JBQW9CLEVBQ2xCLDRCQUFjLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCO2FBQ3hEO1lBQ0QsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixjQUFjLEVBQUU7Z0JBQ2Q7b0JBQ0UsVUFBVSxFQUFFLEdBQUc7b0JBQ2Ysa0JBQWtCLEVBQUUsR0FBRztvQkFDdkIsZ0JBQWdCLEVBQUUsYUFBYTtpQkFDaEM7YUFDRjtTQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksK0JBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQy9ELE9BQU8sRUFBRSxDQUFDLCtCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsaUJBQWlCLEVBQUUsYUFBYTtZQUNoQyxZQUFZO1lBQ1osaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbkMsS0FBSyxFQUFFLFlBQVksQ0FBQyxVQUFVO1lBQzlCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsVUFBVSxFQUFFLGVBQWU7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDaEMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxVQUFVO1lBQy9CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsVUFBVSxFQUFFLFlBQVk7U0FDekIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBcERELDhDQW9EQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQge1xyXG4gIGF3c19zMyxcclxuICBhd3NfY2xvdWRmcm9udCxcclxuICBhd3NfY2xvdWRmcm9udF9vcmlnaW5zLFxyXG4gIGF3c19zM19kZXBsb3ltZW50LFxyXG4gIENmbk91dHB1dCxcclxuICBSZW1vdmFsUG9saWN5LFxyXG59IGZyb20gJ2F3cy1jZGstbGliJztcclxuXHJcbmNvbnN0IHBhdGggPSAnLi4vZGlzdC9hcHAvYnJvd3Nlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVwbG95bWVudFNlcnZpY2UgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcblxyXG4gICAgY29uc3QgaG9zdGluZ0J1Y2tldCA9IG5ldyBhd3NfczMuQnVja2V0KHRoaXMsICdGcm9udGVuZEJ1Y2tldCcsIHtcclxuICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IGF3c19zMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXHJcbiAgICAgIHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcclxuICAgICAgYXV0b0RlbGV0ZU9iamVjdHM6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgYXdzX2Nsb3VkZnJvbnQuRGlzdHJpYnV0aW9uKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICAnQ2xvdWRmcm9udERpc3RyaWJ1dGlvbicsXHJcbiAgICAgIHtcclxuICAgICAgICBkZWZhdWx0QmVoYXZpb3I6IHtcclxuICAgICAgICAgIG9yaWdpbjpcclxuICAgICAgICAgICAgYXdzX2Nsb3VkZnJvbnRfb3JpZ2lucy5TM0J1Y2tldE9yaWdpbi53aXRoT3JpZ2luQWNjZXNzQ29udHJvbChcclxuICAgICAgICAgICAgICBob3N0aW5nQnVja2V0LFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgdmlld2VyUHJvdG9jb2xQb2xpY3k6XHJcbiAgICAgICAgICAgIGF3c19jbG91ZGZyb250LlZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVmYXVsdFJvb3RPYmplY3Q6ICdpbmRleC5odG1sJyxcclxuICAgICAgICBlcnJvclJlc3BvbnNlczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBodHRwU3RhdHVzOiA0MDQsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlSHR0cFN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiAnL2luZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBuZXcgYXdzX3MzX2RlcGxveW1lbnQuQnVja2V0RGVwbG95bWVudCh0aGlzLCAnQnVja2V0RGVwbG95bWVudCcsIHtcclxuICAgICAgc291cmNlczogW2F3c19zM19kZXBsb3ltZW50LlNvdXJjZS5hc3NldChwYXRoKV0sXHJcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBob3N0aW5nQnVja2V0LFxyXG4gICAgICBkaXN0cmlidXRpb24sXHJcbiAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbJy8qJ10sXHJcbiAgICB9KTtcclxuXHJcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdDbG91ZEZyb250VXJsJywge1xyXG4gICAgICB2YWx1ZTogZGlzdHJpYnV0aW9uLmRvbWFpbk5hbWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGRpc3RydWJ1dGlvbiBVcmwnLFxyXG4gICAgICBleHBvcnROYW1lOiAnQ2xvdWRGcm9udFVybCcsXHJcbiAgICB9KTtcclxuXHJcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdCdWNrZXROYW1lJywge1xyXG4gICAgICB2YWx1ZTogaG9zdGluZ0J1Y2tldC5idWNrZXROYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBuYW1lIG9mIHRoZSBTMyBidWNrZXQnLFxyXG4gICAgICBleHBvcnROYW1lOiAnQnVja2V0TmFtZScsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19