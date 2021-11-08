---
layout: post
title: GitHub Actions for Power Apps Portals
date: 2021-11-08 20:01:20 +0200
description: Learn how you can use GitHub Actions to deploy your Power Apps Portals
excerpt: Learn how you can use GitHub Actions to deploy your Power Apps Portals
img: 2021-11-06-cover.jpg
image: /assets/img/2021-11-06-cover.jpg
tags: [Portal]
---

Last week Microsoft had a lot of different announcements at Ignite 2021 conference. Among others, there were some regarding portals: [public preview for Read operation in Web API](https://powerapps.microsoft.com/en-us/blog/power-apps-portals-query-data-using-portals-web-api-public-preview/), [public preview for custom components on pages](https://powerapps.microsoft.com/en-us/blog/power-apps-portals-use-code-components-on-pages-preview/), [GA for Power Apps Portals support for Microsoft Power Platform CLI](https://powerapps.microsoft.com/en-us/blog/announcing-general-availability-ga-of-power-apps-portals-support-for-microsoft-power-platform-cli/). All of them are huge and important for the future of the portals. However, one thing, in my opinion, was a bit overlooked among others - GitHub Actions support for portal commands in CLI.

## What are GitHub Actions?

GitHub Actions is a CI/CD system built into GitHub itself. It allows you to automate common tasks and react to events in your source control system like pull requests, push etc. To create an action you need to create a YAML file that will describe what exactly needs to happen (step by step) and when it should be triggered. Find more about GitHub Actions [here](https://github.com/features/actions).

## Power Platform Actions

CI/CD isn't a new thing in the Power Platform space. For quite some time in Azure DevOps were sets of actions created by community members. Later with the introduction of Power Platform CLI MS created a proprietary set called Power Platform Actions. A year ago to ensure parity with the Azure DevOps platform MS announces Power Platform Actions for GitHub Actions in public preview. To find more about what actions are available for GitHub Actions and how to get started with it check this [official tutorial](https://docs.microsoft.com/en-us/power-platform/alm/tutorials/github-actions-start) and [documentation](https://docs.microsoft.com/en-us/power-platform/alm/devops-github-actions).

As soon as MS announced the public preview for Power Platform CLI support for Power Apps Portals Arpit Arpit Shrivastava created an Azure DevOps extension to support automated portal builds (find more about it on [his blog](https://arpitpowerguide.com/2021/05/28/powerapps-portals-build-tools-an-azure-devops-extension-to-automate-portal-deployment/)) which opened an easy way to automate portal deployments in Azure.

And with last week announcement, we can easily automate deployments in GitHub as well.

## Upload Portal action

Right now we have only one action related to the portal - Upload portal. This is a command that allows you to upload a portal from the folder to the target environment. Additionaly, using deployment profiles (see more about them in [my previous article](https://www.dancingwithcrm.com/deployment-profiles-pa-portal/)) you can deploy a portal with some specific environment configuration.

This action accepts the next parameters:

- **environment-url** - the url of the target Dataverse environment, REQUIRED
- **app-id** - The application (client) ID to authenticate with. This parameter is **REQUIRED** when authenticating with Service Principal credentials.
- **client-secret** - The client secret used to authenticate with. This parameter is **REQUIRED** when authenticating with Service Principal credentials.
- **tenant-id** - The tenant ID when authenticating with app-id and client-secret.
- **upload-path** - Path where the website content is stored.
- **deployment-profile** - Upload portal data with environment details defined through profile variables in deployment-profiles/\[profile-name\].deployment.yaml file.

Below you can find a sample YAML file for the simplest action that will upload portal on pull or push requests to the main branch. You can also find this file on [my sample github repository](https://github.com/OOlashyn/portal-alm-github-actions).

{% capture importantText %}
Please remove <strong>\</strong>  symbol where I marked it in the sample below before using (added because of the blog restriction)
{% endcapture %}
{% include important-block.html importantText=importantText %}

{% capture code %}
# This is a basic workflow to help you get started with Portal Actions

name: Portal CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

env:
# edit your values here
  ENVIRONMENT_URL: YOUR_ORG_URL
  CLIENT_ID: YOUR_CLIENT_ID
  TENANT_ID: YOUR_TENANT_ID
  PORTAL_PATH: PORTAL_FOLDER

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      
      - name: upload-paportal action
        uses: microsoft/powerplatform-actions/upload-paportal@0.4.3
        with:
          # remove \ symbol before using (added because of the blog restriction)
          environment-url: ${\{env.ENVIRONMENT_URL}}
          app-id: ${\{env.CLIENT_ID}}
          # using secrets GitHub variable to securely use stored credentials
          # see how to use credentials - https://docs.github.com/en/actions/security-guides/encrypted-secrets
          client-secret: ${\{secrets.DATAVERSESPN}}
          tenant-id: ${\{env.TENANT_ID}}
          upload-path: ${\{env.PORTAL_PATH}}
          # uncomment next line to use deployment profiles
          # deployment-profile: PROFILE_NAME
{% endcapture %}
{% include code.html code=code lang="yaml" %}

## Conclusion

Now when portal support in CLI is GA we finally have a supported and simple way to automate portal deployment. And because both GitHub Actions and Azure DevOps are available you can choose the tool that fits your needs.
