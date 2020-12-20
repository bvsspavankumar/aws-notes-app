# AWS Cloud-native application

## Create sls project:
sls create -t aws-nodejs -p sls0_1220

## Create node project
npm init -y

## Add required dependencies
npm install --save aws-sdk moment underscore uuid

## Update the serverless.yml
Add configuration to create dynamoDB table

## Deploy
sls deploy

## CI/CD pipeline with codecommit
Credentials should be generated from the IAM console if ssh key was not saved for access.

## Setup codepipeline
Add buildspec.yml with the different stages and corresponding commands