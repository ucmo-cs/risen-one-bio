
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'masonmini',
  applicationName: 'risen-one-project',
  appUid: '8bkSPSk928ZCc5r1ZV',
  orgUid: 'd0e522e3-3918-4246-a31d-f989677d4d30',
  deploymentUid: 'c033a7ef-c0d0-4945-bcc9-a4878b2c8470',
  serviceName: 'risen-one-project',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '7.1.0',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'risen-one-project-dev-editBio', timeout: 6 };

try {
  const userHandler = require('./editBio.js');
  module.exports.handler = serverlessSDK.handler(userHandler.editBio, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}