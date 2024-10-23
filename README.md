# littletiger

## CICD Pipeline Configuration and Usage

This repository uses GitHub Actions for continuous integration and continuous deployment (CICD). The pipeline is configured to deploy any changed file after a merge to the public bucket `littletiger` at `https://br-se1.magaluobjects.com/`.

### GitHub Actions for Deployment

The deployment process is managed using GitHub Actions. The workflow file is located at `.github/workflows/deploy.yml`.

### Setting Up GitHub Secrets for AWS Credentials

To configure the pipeline, you need to set up GitHub Secrets for your AWS credentials. Follow these steps:

1. Go to your repository on GitHub.
2. Click on `Settings`.
3. In the left sidebar, click on `Secrets` and then `Actions`.
4. Click on `New repository secret`.
5. Add the following secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
   - `AWS_ENDPOINT`: Your custom AWS endpoint.

These secrets will be used by the GitHub Actions workflow to authenticate and deploy the changed files to the S3 bucket.
