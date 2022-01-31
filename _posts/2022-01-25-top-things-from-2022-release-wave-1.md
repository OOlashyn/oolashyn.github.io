---
layout: post
title: Top 11 things from Power Platform 2022 release wave 1
date: 2022-01-30 21:45:20 -0500
description: Learn about 8 things I think are most interesting in Power Platform 2022 release wave 1
excerpt: Learn about 8 things I think are most interesting in Power Platform 2022 release wave 1
img: 2022-01-30-cover.jpg
image: /assets/img/2022-01-30-cover.jpg
tags: [D365, PowerPlatform, Portal]
---

Earlier this week Microsoft published their Power Platform and Dynamics 365 2022 release wave 1 notes (see [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/) for Power Platform and [here](https://docs.microsoft.com/en-us/dynamics365-release-plan/2022wave1/) for Dynamics 365). Below you can find my top things from this release in no particular order. If you are interested in older release notes check my previous [blogs](https://www.dancingwithcrm.com/top-things-from-2021-release-wave-2/) on this topic.

## Bridging UI gaps

Microsoft introduced Unified Interface back in 2018. And it come a long way in improving our user experience. However, to this day there are things that we are using daily that utilize old Legacy UI. Things like searching data in advance find and customizing forms (especially adding custom controls). Well, the wait is over - in the new release both of these gaps will be finally bridged.

Advance find now will be accessible from search directly allowing a more seamless and productive experience. With the new UI, you not only be able to apply filters and select columns for the views but also search for available views (which be a huge benefit when you have a bunch of those).

![Advance Find Main]({{site.baseurl}}/assets/img/2022-01-30-advance-find-main.jpg){: .center-image }

![Advance Find Table Selection]({{site.baseurl}}/assets/img/2022-01-30-advance-find-table-selection.jpg){: .center-image }

Forms in the maker portal will finally support adding custom controls, lookup filtering, applying business rules and customizing formatting.

Both of these features will be available in **GA** in **April 2022** and advance find will start **public preview** in **Feb 2022**.

The original announcement for form can be found [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/power-apps/build-forms-entirely-using-features-modern-form-designer) and for advance find [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/power-apps/explore-data-through-modern-advanced-find).

## Power Fx named formulas to ease development and improve performance

If you ever worked with the canvas app you probably had to initialize some global variables or collections in App.OnStart or Screen.OnVisible. Despite being a commonly used pattern - and in many cases only available one - it isn't the best one for performance. With this pattern, Power Apps cannot properly perform a lot of optimization technics (like deferred loading and caching). To solve this problem named formulas are being introduced in this release wave.

With this new feature initialization will go from **Set( X, Last(Contacts) )** to **X = Last(Contacts)**. It doesn't look that different, but there are a lot of changes in the background. The named formula creates a dependency relationship between variable X and Contacts. This means that now we have only one source of truth for X - the formula that defines it. The benefit of this approach is that Power Fx doesn't need to evaluate the X until it is used and X can be recalculated depending on the current state of Contacts. This feature will be in **public preview** in **Mar 2022** and **GA** in **May 2022**.

The original announcement can be found [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/power-apps/power-fx-named-formulas-ease-development-improve-performance).

## Support for data sources with dynamic schema

Working with connectors, both standard and custom, is easy when you are using only a predefined set of columns. However, there are situations when you need to break from the limitations and access something out of the standard schema. For example, you customized your Azure DevOps pipeline with custom columns, but the standard connector didn't allow you to access them. Previously you would need to parse responses in json and search for custom stuff (or use other clever ways). With the new dynamic schema, you will have no problem defining those custom columns and using them directly within the connector. According to Microsoft, 40% of all connectors have some form of dynamic schema that now will be accessible. At the moment there is no example of how exactly it will look like or how we will define that dynamic scheme. I guess we would need to wait until **public preview** in **Jun 2022** to find more.

The original announcement can be found [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/power-apps/support-data-sources-dynamic-schema)

## Greater control over connection reference creation and reuse during flow creation

Connection references are an important part of flows, however, working with them can be cumbersome and confusing. For example, during the flow creation, we don't have control over references creation or reuse which might lead to unwanted situations like usage of wrong references or duplicates. This will change in the new release - MS says that we will have greater control over connection references during the creation of the flow. Details are a bit vague, but we should be able to choose whether we want to create a new reference or select an existing one. This feature will be **GA** in **Apr 2022**.

The original announcement can be found [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/power-automate/greater-control-over-connection-reference-creation-reuse-during-creation)

## Flow ownership supported for Service Principals

Flow ownership is always a tricky topic. At the moment, SP (application user in Dataverse) cannot be the owner of the flow. Because of this organizations are using special users that serve the "shared service account" role. This isn't great especially if you consider ALM processes. With the spring wave MS updating sharing capabilities to allow flow ownership by application users. This feature should be available for **GA** in **Apr 2022**.

The original announcement can be found [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/power-automate/ownership-supported-service-principals)

## Provide the ability to create and update custom connectors using Power Platform CLI

Custom connectors allow developers to create wrappers around different REST APIs to easily use them inside Power Automate, Power Apps or Logic Apps. At the moment process of connector creation and management isn't developer and ALM friendly - everything happens through UI. With spring release Microsoft will enable the ability to create, update and remove custom connectors using the next tools: 

* CLI 
* Visual Studio Code
* GitHub Actions
* Azure DevOps tasks

The **public preview** should start in **May 2022** and **GA** scheduled for **Jun 2022**.

The original announcement can be found [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/power-platform-pro-development/provide-ability-create-update-custom-connectors-using-power-platform-cli)

## Portals support for file and image columns in Microsoft Dataverse

One of the most requested features since the introduction of File and Image columns in Dataverse was to add support for them in Portals. There are multiple scenarios where having file/image columns would improve the user experience (for example, submitting multiple documents in a multi-step process). Previously we needed to use workarounds (like Azure Functions to submit and retrieve files) to make this work. Luckily wait is almost over - this feature will be available for **Public Preview** in **Apr 2022** for image column with **GA** in **Jun 2022** and **Public Preview** in **Jun 2022** for file column with **GA** in **Aug 2022**.

File column will be available in basic forms, advanced forms and lists. Image column will be available only for basic and advanced forms.

The original announcement for file column can be found [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/power-apps-portals/portals-support-file-columns-dataverse) and for image column [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/power-apps-portals/portals-support-image-columns-dataverse).

## Support for portal actions using admin APIs

A lot of administrative tasks around Portals are hard to perform because they require some sort of UI interaction - like creation or restart operations. In the upcoming release Microsoft will introduce a set of APIs to perform the following actions:

* create portal
* list available portals
* delete portal
* restart portal

Currently, Power Platform CLI for Portals supports all actions above except restart. I guess that MS will extend CLI to include restart action, but MS might enable those actions as part of Power Platform for Admins connectors. We would need to wait till **May 2022** when this feature will be **GA**.

The original announcement can be found [here](https://docs.microsoft.com/en-us/poer-platform-release-plan/2022wave1/power-apps-portals/support-portal-actions-using-admin-apis).

## Conclusion

In this post, I highlighted the features that I think are most interesting in the upcoming release. But there are much more changes waiting for you in documentation, so check it [out](https://docs.microsoft.com/en-us/power-platform-release-plan/2022wave1/).

Screenshots of new functionality are taken from Microsoft release wave documentation.
