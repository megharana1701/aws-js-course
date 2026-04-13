"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentService = void 0;
const constructs_1 = require("constructs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const path = "./resources/build";
class DeploymentService extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const hostingBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, "FrontendBucket", {
            blockPublicAccess: aws_cdk_lib_1.aws_s3.BlockPublicAccess.BLOCK_ALL,
        });
        const distribution = new aws_cdk_lib_1.aws_cloudfront.Distribution(this, "CloudfrontDistribution", {
            defaultBehavior: {
                origin: aws_cdk_lib_1.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(hostingBucket),
                viewerProtocolPolicy: aws_cdk_lib_1.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            defaultRootObject: "index.html",
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: "/index.html",
                },
            ],
        });
        new aws_cdk_lib_1.aws_s3_deployment.BucketDeployment(this, "BucketDeployment", {
            sources: [aws_cdk_lib_1.aws_s3_deployment.Source.asset(path)],
            destinationBucket: hostingBucket,
            distribution,
            distributionPaths: ["/*"],
        });
        new aws_cdk_lib_1.CfnOutput(this, "CloudFrontUrl", {
            value: distribution.domainName,
            description: "The distrubution Url",
            exportName: "CloudFrontUrl",
        });
        new aws_cdk_lib_1.CfnOutput(this, "BucketName", {
            value: hostingBucket.bucketName,
            description: "The name of the S3 bucket",
            exportName: "BucketName",
        });
    }
}
exports.DeploymentService = DeploymentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95bWVudC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVwbG95bWVudC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF1QztBQUN2Qyw2Q0FNcUI7QUFFckIsTUFBTSxJQUFJLEdBQUcsbUJBQW1CLENBQUM7QUFFakMsTUFBYSxpQkFBa0IsU0FBUSxzQkFBUztJQUM5QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sYUFBYSxHQUFHLElBQUksb0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQzlELGlCQUFpQixFQUFFLG9CQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBUztTQUN0RCxDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxJQUFJLDRCQUFjLENBQUMsWUFBWSxDQUNsRCxJQUFJLEVBQ0osd0JBQXdCLEVBQ3hCO1lBQ0UsZUFBZSxFQUFFO2dCQUNmLE1BQU0sRUFDSixvQ0FBc0IsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQzNELGFBQWEsQ0FDZDtnQkFDSCxvQkFBb0IsRUFDbEIsNEJBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUI7YUFDeEQ7WUFDRCxpQkFBaUIsRUFBRSxZQUFZO1lBQy9CLGNBQWMsRUFBRTtnQkFDZDtvQkFDRSxVQUFVLEVBQUUsR0FBRztvQkFDZixrQkFBa0IsRUFBRSxHQUFHO29CQUN2QixnQkFBZ0IsRUFBRSxhQUFhO2lCQUNoQzthQUNGO1NBQ0YsQ0FDRixDQUFDO1FBRUYsSUFBSSwrQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDL0QsT0FBTyxFQUFFLENBQUMsK0JBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxpQkFBaUIsRUFBRSxhQUFhO1lBQ2hDLFlBQVk7WUFDWixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNuQyxLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVU7WUFDOUIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxVQUFVLEVBQUUsZUFBZTtTQUM1QixDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNoQyxLQUFLLEVBQUUsYUFBYSxDQUFDLFVBQVU7WUFDL0IsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxVQUFVLEVBQUUsWUFBWTtTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFsREQsOENBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcclxuaW1wb3J0IHtcclxuICBhd3NfczMsXHJcbiAgYXdzX2Nsb3VkZnJvbnQsXHJcbiAgYXdzX2Nsb3VkZnJvbnRfb3JpZ2lucyxcclxuICBhd3NfczNfZGVwbG95bWVudCxcclxuICBDZm5PdXRwdXQsXHJcbn0gZnJvbSBcImF3cy1jZGstbGliXCI7XHJcblxyXG5jb25zdCBwYXRoID0gXCIuL3Jlc291cmNlcy9idWlsZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlcGxveW1lbnRTZXJ2aWNlIGV4dGVuZHMgQ29uc3RydWN0IHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQpO1xyXG5cclxuICAgIGNvbnN0IGhvc3RpbmdCdWNrZXQgPSBuZXcgYXdzX3MzLkJ1Y2tldCh0aGlzLCBcIkZyb250ZW5kQnVja2V0XCIsIHtcclxuICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IGF3c19zMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgYXdzX2Nsb3VkZnJvbnQuRGlzdHJpYnV0aW9uKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBcIkNsb3VkZnJvbnREaXN0cmlidXRpb25cIixcclxuICAgICAge1xyXG4gICAgICAgIGRlZmF1bHRCZWhhdmlvcjoge1xyXG4gICAgICAgICAgb3JpZ2luOlxyXG4gICAgICAgICAgICBhd3NfY2xvdWRmcm9udF9vcmlnaW5zLlMzQnVja2V0T3JpZ2luLndpdGhPcmlnaW5BY2Nlc3NDb250cm9sKFxyXG4gICAgICAgICAgICAgIGhvc3RpbmdCdWNrZXQsXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTpcclxuICAgICAgICAgICAgYXdzX2Nsb3VkZnJvbnQuVmlld2VyUHJvdG9jb2xQb2xpY3kuUkVESVJFQ1RfVE9fSFRUUFMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWZhdWx0Um9vdE9iamVjdDogXCJpbmRleC5odG1sXCIsXHJcbiAgICAgICAgZXJyb3JSZXNwb25zZXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaHR0cFN0YXR1czogNDA0LFxyXG4gICAgICAgICAgICByZXNwb25zZUh0dHBTdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgcmVzcG9uc2VQYWdlUGF0aDogXCIvaW5kZXguaHRtbFwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBuZXcgYXdzX3MzX2RlcGxveW1lbnQuQnVja2V0RGVwbG95bWVudCh0aGlzLCBcIkJ1Y2tldERlcGxveW1lbnRcIiwge1xyXG4gICAgICBzb3VyY2VzOiBbYXdzX3MzX2RlcGxveW1lbnQuU291cmNlLmFzc2V0KHBhdGgpXSxcclxuICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IGhvc3RpbmdCdWNrZXQsXHJcbiAgICAgIGRpc3RyaWJ1dGlvbixcclxuICAgICAgZGlzdHJpYnV0aW9uUGF0aHM6IFtcIi8qXCJdLFxyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIkNsb3VkRnJvbnRVcmxcIiwge1xyXG4gICAgICB2YWx1ZTogZGlzdHJpYnV0aW9uLmRvbWFpbk5hbWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBkaXN0cnVidXRpb24gVXJsXCIsXHJcbiAgICAgIGV4cG9ydE5hbWU6IFwiQ2xvdWRGcm9udFVybFwiLFxyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIkJ1Y2tldE5hbWVcIiwge1xyXG4gICAgICB2YWx1ZTogaG9zdGluZ0J1Y2tldC5idWNrZXROYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJUaGUgbmFtZSBvZiB0aGUgUzMgYnVja2V0XCIsXHJcbiAgICAgIGV4cG9ydE5hbWU6IFwiQnVja2V0TmFtZVwiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==