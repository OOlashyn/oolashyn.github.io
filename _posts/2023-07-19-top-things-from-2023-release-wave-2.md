---
layout: post
title: Top 7 things from Power Platform 2023 release wave 2
date: 2023-07-19 20:45:20 -0500
description: Learn about top 7 things I think are the most interesting in Power Platform 2023 release wave 2
excerpt: Learn about top 7 things I think are the most interesting in Power Platform 2023 release wave 2
img: 2023-07-19-cover.jpg
image: /assets/img/2023-07-19-cover.jpg
tags: [D365, PowerPlatform, PowerPages]
---

A couple of days ago, Microsoft published their Power Platform and Dynamics 365 2023 release wave 2 notes (see [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/) for Power Platform and [here](https://learn.microsoft.com/en-us/dynamics365/release-plan/2023wave2/) for Dynamics 365) and as usual it has a lot of exciting things, especially in regards to AI and Bootstrap 5 ~~at last~~. Below you can find my top things from this release in no particular order. If you are interested in older release notes check my previous [blogs](https://www.dancingwithcrm.com/top-things-from-2023-release-1/) on this topic.

## Solution context in Maker Portal

![Containers]({{site.baseurl}}/assets/img/2023-07-19-container.jpg){: .center-image }

If you ever created new things in Dataverse (like Tables, Apps, Web resources etc) directly via Maker Portal, outside of the specific solution, those changes would automatically appear in the so-called **Common Data Services Default Solution** with default publisher prefix. Although experienced creators are aware of this behaviour and are working in predefined solutions, new makers and developers might not know or expect this, which can lead to the necessity to recreate and rebuild some things.

Luckily we will be able to change that soon with the new ability to select any other unmanaged solution as the active solution context. More importantly, this will set the publisher from that solution as the default one as well (no more random cr6eb20 anymore). This will help to promote easier usage of the Maker Portal, better customization hygiene and create a setup for more successful application lifecycle management.

Admin will be able to configure this feature in **Public Preview** from **Oct 2023**. There is no **GA** date yet. The original announcement can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/power-apps/makers-set-solution-context-customizations-outside-solution-explorer).

## Clean data with AI

![Network]({{site.baseurl}}/assets/img/2023-07-19-network.jpg){: .center-image }

Microsoft is truly becoming an AI company and bringing AI everywhere. Microsoft understands the value of good quality data, so this time it brings AI to the Dataverse to help with data cleanup tasks in the form of the smarter data layer and data hygiene suit. So far we don't have a full description of what a "smarter data layer" exactly will be, but according to Microsoft - a smarter data layer will be infused with AI models, to allow the makers to create smarter and context-aware apps with better data quality.

In regards to the data hygiene suite MS says that it will include semantically smart data validation for email and phone numbers, smart data deduplication rules, and native content AI experiences fully integrated into Dataverse and Power Platform to complete the data-insights-action loop.

This feature will start with email-type columns to help bring more sophisticated email validation that will include the reason why the data entry is invalid. This will help both users and admins to maintain a higher quality of the data on a proactive basis.

I hope that in the future this feature will allow us to configure our smart data layer for custom fields with custom validation which will help to improve data quality drastically and resolve so many different scenarios. But unfortunately, at least for now, we don't have any more details about this feature or its future.

It will become **GA** for all users in **Mar 2024**. The original announcement can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/data-platform/accelerate-value-clean-data).

## Power Pages Copilot

![Robot]({{site.baseurl}}/assets/img/2023-07-19-robot.jpg){: .center-image }

Another feature - another AI infusion. This time it is for Power Pages. Previously MS brought Copilot to Power Pages to help with Form creation. This time scope is bigger and consists of next things:

- site creation
- Q&A to help build the site
- Copilot actions for end-users

### Site creation

Let's start with site creation. You just need to describe what website you want to create and Copilot will generate it for you - including sitemap, different pages, home page layout and theme. If you don't like the suggestion you could ask Copilot to regenerate them or use it later to refine it.

As of now, we don't know how specific Copilot would be (ie can we generate a Home page with a specific layout or in the context of the specific company theme), but regardless it will simplify initial website creation drastically and allow for more time spent on refining and making the website look better than long initial creation process. I hope that in the future we will have the ability to create even more with Copilot like specific pages and more.

This feature will be available for **Public Preview** in **Oct 2023**. The original announcement can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/power-pages/use-copilot-create-website).

### Q&A

With this feature you won't need to leave Power Pages Studion anymore to find more information - just ask Copilot. Q&A will summarize the information that is spread across Learn, community, and other key resources (maybe even this website, who knows) to answer makers' questions regarding everything Power Pages to unlock better website creation with less hassle.

This feature will be available for **Public Preview** in **Oct 2023**. The original announcement can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/power-pages/use-copilot-get-answers-questions).

### Website Copilot Actions

Right now you can easily enable the Power Virtual Agents chatbot for your Power Pages site. But this feature takes it to the next level - Website Copilot Actions will allow your Power Pages users to ask the chatbot for help to complete actions like filling simple forms with basic validation in place, finding and getting redirected to resources on the website, and more.

This will be a huge boost for both end-user experience and site accessibility. Unfortunately, we don't know how easy would be to configure specific actions and scenarios, whether can we use existing chatbots, etc. But this sounds amazingly promising and I cannot wait to try this one out.

This feature will be available for **Public Preview** in **Nov 2023**. The original announcement can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/power-pages/enable-website-copilot-actions-userss).

## Low-code plugins

As somebody said when Power FX was first introduced - it will be everywhere. And seems like that prediction is becoming a reality with the introduction of low-code plugins. You will be able to create a real-time server-side plugin using Power FX. They will have almost all sets of capabilities of the Power FX from the canvas app (although not all) and will behave similarly to the Dataverse Custom Actions and APIs.

This doesn't mean that you need to abandon your good old C# plugins and rewrite your current logic with Power FX. Low-code plugins have a particular use-case scenario in mind - to shift complex logic and calculation from canvas apps to the server. It is not a secret, that code for canvas apps can grow out of proportion and need a lot of hacks and tricks to ensure stable performance. Moving complex logic from the app to the server will lead to a boost in performance and a better user experience.

Low-code plugins will be available in canvas apps for **Public Preview** in **Sep 2023** and should go **GA** in **Dec 2023**. The original announcement can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/data-platform/build-canvas-app-low-code-plugins-better-experiences) and [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/data-platform/build-own-business-logic-using-dataverse-low-code-plugins).

## Bootstrap 5

![Bootstrap 5]({{site.baseurl}}/assets/img/2023-01-25-bootstrap5.png){: .center-image }

Bootstrap 5 for Power Pages is the most requested feature from the community. Originally announced as part of 2023 Release Wave 1 it shifted to this Release Wave. But hopefully this time it will stay.

Update to the latest version includes a bunch of benefits (like security fixes and UI improvements) but also allows a lot of new front-end developers to start with Power Pages more easily (as they might be more familiar with the most recent version of Bootstrap).

You will be able to migrate your existing Power Pages site to V5 using the PAC CLI tool (available from version 1.23 but you still need a backend update as well). The tool will create a local copy of your site with changes to V5. Keep in mind that it will only convert standard Bootstrap classes so if you created some custom things you would need to update them manually.

For some time Power Pages will support both V3 and V5, but eventually, everyone will need to migrate. For now, we don't know what will be the deprecation date (but knowing Microsoft it will be somewhere close to the end of 2024 or even 2025).

This feature will be available for **Public Preview** in **Jul 2023** and **GA** in **q**. The original announcement can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/power-pages/enable-website-copilot-actions-userss).

## Conclusion

In this post, I highlighted the features that I think are the most interesting in the upcoming release. AI is changing how we can interact and create things in the Power Platform and it is exciting - cannot wait to try these features out. But other awesome things are waiting for you in the documentation, so check it [out](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave2/).
