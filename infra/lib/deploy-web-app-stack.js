"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployWebAppStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const deployment_service_1 = require("./deployment-service");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class DeployWebAppStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new deployment_service_1.DeploymentService(this, "deployment");
        // The code that defines your stack goes here
        // example resource
        // const queue = new sqs.Queue(this, 'InfraQueue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });
    }
}
exports.DeployWebAppStack = DeployWebAppStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LXdlYi1hcHAtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXBsb3ktd2ViLWFwcC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBcUQ7QUFDckQsNkRBQXlEO0FBQ3pELDhDQUE4QztBQUU5QyxNQUFhLGlCQUFrQixTQUFRLG1CQUFLO0lBQzFDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxzQ0FBaUIsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFMUMsNkNBQTZDO1FBRTdDLG1CQUFtQjtRQUNuQixvREFBb0Q7UUFDcEQsaURBQWlEO1FBQ2pELE1BQU07SUFDUixDQUFDO0NBQ0Y7QUFiRCw4Q0FhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XHJcbmltcG9ydCB7IFN0YWNrLCB0eXBlIFN0YWNrUHJvcHMgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0IHsgRGVwbG95bWVudFNlcnZpY2UgfSBmcm9tIFwiLi9kZXBsb3ltZW50LXNlcnZpY2VcIjtcclxuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIERlcGxveVdlYkFwcFN0YWNrIGV4dGVuZHMgU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgbmV3IERlcGxveW1lbnRTZXJ2aWNlKHRoaXMsIFwiZGVwbG95bWVudFwiKTtcclxuXHJcbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcclxuXHJcbiAgICAvLyBleGFtcGxlIHJlc291cmNlXHJcbiAgICAvLyBjb25zdCBxdWV1ZSA9IG5ldyBzcXMuUXVldWUodGhpcywgJ0luZnJhUXVldWUnLCB7XHJcbiAgICAvLyAgIHZpc2liaWxpdHlUaW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMDApXHJcbiAgICAvLyB9KTtcclxuICB9XHJcbn1cclxuIl19