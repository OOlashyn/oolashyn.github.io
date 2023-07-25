---
layout: post
title: How to fix "XRM Network error operation not allowed as mime type is blocked"
date: 2023-07-24 20:45:20 -0500
description: Learn how to fix "XRM Network error operation not allowed as mime type is blocked"
excerpt: Learn how to fix "XRM Network error operation not allowed as mime type is blocked"
img: 2023-07-02-cover.jpg
image: /assets/img/2023-07-02-cover.jpg
tags: [PowerPlatform, PowerPages]
---

Recently when uploading the Power Pages site to a new environment I was met with the next error: **"XRM Network error operation not allowed as mime type img/svg is blocked"**. And fixing this error led me to discover some differences between the old and new UI for the Power Platform Admin Center for an environment and new options that are now available to us. So let's check it out.

## The old way

Power Platform environment configurations allowed us to manage the list of blocked extensions for quite some time. To do so you need to go to your environment, click **Advanced Settings > Settings > Administration > System Settings**. There in the **General** tab, you will see a list of the blocked extensions for the attachments.

![Old UI]({{site.baseurl}}/assets/img/2023-07-24-oldui.jpg){: .center-image }

However, in my case, there was no svg there already. So what was blocking my file upload? Well, the new UI gives us more options to control extensions.

## The new way and solution

Let's go to the **Power Platform Admin Center**, and select an environment that we need. In the environment go to **Settings**, expand the **Product** section and click **Privacy+Security**. There are 3 options which allow you to control files for the environment:

- **Blocked Attachments** - this same option as before where you can provide a list of blocked extension fields
- **Blocked Mime Type** - a new option allows you to block specific mime types allowing more granular control over attachments
- **Allowed Mime Types** - a new option which is useful when you have only a couple of mime types that should be allowed in your system. This will take precedence over the Blocked Mime Types option.

![New UI]({{site.baseurl}}/assets/img/2023-07-24-newui.jpg){: .center-image }

The second option was a culprit in my case as image/svg+xml was set in this field preventing svg upload to the system. Clearing up **"Blocked Mime Type"** resolved the problem.

## Conclusion

So to reiterate - if you have an "XRM Network error operation not allowed as mime type is blocked" issue go to the Power Platform Admin Center and make sure that your file's mime type is not in the list of blocked attachments or mime types (or added to the allowed mime type list if your environment has stricter level of security). Hope this will help.