const amplifyConfig = {
  Auth: {
    Cognito: true,
    // make sure sign-in is required before credentials are requested
    mandatorySignIn: true,
  },
  aws_project_region: import.meta.env.VITE_AWS_REGION,
  aws_appsync_graphqlEndpoint: import.meta.env.VITE_API_URL,
  aws_appsync_region: import.meta.env.VITE_AWS_REGION,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_cognito_region: import.meta.env.VITE_AWS_REGION,
  aws_user_pools_id: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: import.meta.env
    .VITE_COGNITO_USER_POOL_CLIENT_ID,
  aws_cognito_identity_pool_id: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
  Storage: {
    AWSS3: {
      bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      region: import.meta.env.VITE_AWS_REGION,
    },
  },
};
export default amplifyConfig;
