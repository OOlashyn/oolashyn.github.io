---
layout: post
title: Deployment profiles in Power Apps Portals
date: 2021-09-29 22:01:20 +0200
description: Learn how you can user deployment profiles in Portal CLI to deploy environment specific variables
excerpt: Learn how you can user deployment profiles in Portal CLI to deploy environment specific variables
img: 2021-09-29-cover.jpg
image: /assets/img/2021-09-29-cover.jpg
tags: [Portal]
---

A couple of days ago, Microsoft announced support for deployment profiles switch for Portal CLI upload command, which makes the full ALM story for Portals one step closer (see official doc [here](https://docs.microsoft.com/en-us/powerapps/maker/portals/power-apps-cli#use-deployment-profile)). Let's find out what deployment profile is and how my Portal Helper extension can help you working with them.

## Deployment profile

So what is a deployment profile? The deployment profile allows you to define a set of variables for the environment in YAML format. For example, you have some site setting that has different values across your dev, test and prod environments. Previously, you needed to either not deploy that site setting and create it manually or change it after the deployment. But now you can create files with specific values for each environment that will be used during the deployment process.

### Creating deployment profile

To create a deployment profile you need to create a **deployment-profiles** folder in the root folder of your portal. This folder will contain all your deployment profiles and will not be overridden during the download command. Then you need to create the profile itself - inside the deployment-profiles folder create a file **PROFILE_NAME.deployment.yml** (for example *test.deployment.yml*). The file should contain a table name with the list of attributes and respective values. You can have multiple tables and records specified in the same file.

{% capture code %}
adx_sitesetting:
    - adx_contentsnippetid: 09d34372-8420-ec11-b6e6-000d3ab86fbc
      adx_name: google-secret
      adx_value:  Authentication/OpenAuth/Google/Secret
{% endcapture %}
{% include code.html code=code lang="yaml" %}

### Upload portal with the deployment profile

To upload the portal with the specified profile you need to use deploymentProfile parameter in the upload command:

{% capture code %}
pac paportal upload --path "C:\Code\Portals\starter-portal" --deploymentProfile test
{% endcapture %}
{% include code.html code=code lang="yaml" %}

## Portal helper to the rescue

Portal Helper is an extension that I developed to help users to work with Portal CLI more efficiently ([Github page](https://github.com/OOlashyn/portal-helper-vscode)). With this update, I am adding two new things.

First, **Upload Portal** command now support the deployment profiles parameter. Moreover, if you have deployment profiles extension will prepopulate dropdown with them for faster selection.

{% include video.html mp4="upload-portal-dep-profile.mp4" %}

Also, I created a new command called **Create Deployment Profile**, which will create a YAML file for you and a folder for them if it didn't exist previously.

{% include video.html mp4="create-dep-profile.mp4" %}

## Conclusion

I am really happy that MS continues to develop the portal part of MS Power Platform CLI allowing us to do much more. A deployment profile is an awesome feature that solves one of the most annoying obstacles on the ALM journey. I will continue to develop my extension so it supports the latest features and makes developers life easier.
