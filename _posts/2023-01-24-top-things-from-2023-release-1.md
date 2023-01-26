---
layout: post
title: Top 8 things from Power Platform 2023 release wave 1
date: 2023-01-24 21:45:20 -0500
description: Learn about top 8 things I think are the most interesting in Power Platform 2023 release wave 1
excerpt: Learn about top 8 things I think are the most interesting in Power Platform 2023 release wave 1
img: 2023-01-24-cover.jpg
image: /assets/img/2023-01-24-cover.jpg
tags: [D365, PowerPlatform, PowerPages]
---

Today Microsoft published their Power Platform and Dynamics 365 2023 release wave 1 notes (see [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/) for Power Platform and [here](https://learn.microsoft.com/en-us/dynamics365/release-plan/2023wave1/) for Dynamics 365) and let me tell you - it has a lot of awesome things in stock (especially for Power Pages folks). Below you can find my top things from this release in no particular order. If you are interested in older release notes check my previous [blogs](https://www.dancingwithcrm.com/top-things-from-2022-release-wave-1/) on this topic.

## Automated testing for model-driven apps

Running tests is important for any large-scale app development. They ensure the reliability and stability of your code. However, testing your UI was always a more problematic solution, especially if you do not have a dedicated team or specific tools. To tackle this some time ago Microsoft introduced Test Studio which allowed the creation of multiple testing scenarios for Canvas apps using Power FX. And now we finally will have the same capability for model-driven apps and custom pages. Utilizing the power of Playwright enhance Test Engine should allow for faster, more complex and robust testing.

Elevating this to the next level is the ability to run tests as part of your CI/CD pipeline. PAC CLI, Azure DevOps and GitHub Action will support running an updated Test Engine.

Both of these features will be available in **Public Preview** in **May 2023**. There is no **GA** date for now. The original announcement for the test studio can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/power-apps/run-automated-tests-custom-pages-model-driven-apps) and for CICD pipeline support [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/power-apps/test-power-apps-cicd-pipelines).

## Create virtual tables easily in Maker Portal

![Virtual tables]({{site.baseurl}}/assets/img/2023-01-25-virtual-table.jpg){: .center-image }

The virtual tables are part of the Power Platform for quite a while. However, from the beginning virtual tables had a lot of restrictions and were mostly accessible by developers only. Gradually more and more features were released making virtual tables a more valuable and effective component. And now one big step to make them more accessible has been made - makers can create a virtual table through the maker portal UI. A guided, step-by-step process will allow users to create a virtual table just in a few clicks. The new editor will also allow to create relationships between virtual and regular Dataverse tables.

This feature will be available for **Public Preview** in **Jan 2023** and should be **GA** in **Jun 2023**. The original announcement for the test studio can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/power-apps/create-virtual-tables-easily-maker-portal).

## Refreshed model-driven and canvas apps UI

![Fluent UI]({{site.baseurl}}/assets/img/2023-01-25-fluent-ui.jpg){: .center-image }

Model-driven and canvas apps will receive a UI update to align them with the latest changes in the Microsoft Fluent UI design system. This will include controls, fonts, colours, icons and more. For both model-driven and canvas, it will be an opt-in feature, so if for some business or other needs you need to keep your old design there is nothing to worry about. Changes will be gradual and things will be updated as MS will introduce new updates to the Fluent UI. This should make the design more modern and up-to-date overall.

For model-driven apps, **Public Preview** will start in **Jan 2023** with **GA** in **Apr 2023**. For canvas apps, **Public Preview** will start in **Feb 2023** with **GA** in **Jun 2023**. The original announcement for model-driven can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/power-apps/enjoy-new-look-feel-model-driven-power-apps) and for canvas [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/power-apps/build-canvas-apps-using-new-refreshed-controls).

## Cloud flow in Power Pages

![Cloud flow in Power Pages]({{site.baseurl}}/assets/img/2023-01-25-cloud-flow.png){: .center-image }

Calling cloud flow from Power Pages was possible for quite some time, however not in easy to use and manage fashion. You needed to create HTTP-triggered cloud flow, maintain different URLs between environments, and think about the security of your calls. All of that made the task of using cloud flow in Power Pages unnecessarily complex. With this release, this no longer will be the case - welcome native cloud flow in Power Pages.

A new connector will be available in Power Automate that will allow to create a cloud flow that can be easily and securely invoked from Power Pages. This connector will also support bi-directional data exchange which in many scenarios is a necessity for Power Pages.

Right now we don't have details about what endpoint we will need to use to invoke cloud flow or how exactly we will manage security, but I am excited about this feature as it will allow many citizen developers to create secure and custom endpoint enhancing Power Pages capabilities even more.

This feature will be available for **Public Preview** in **Jun 2023**. No **GA** date yet. The original announcement for this feature can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/power-pages/use-cloud-flows-power-pages-sites).

## Bootstrap 5

![Bootstrap 5]({{site.baseurl}}/assets/img/2023-01-25-bootstrap5.png){: .center-image }

Power Pages uses Bootstrap 3 as its CSS framework of choice. And let me tell you - upgrading from Boostrap 3 to a newer version was the number 1 request from the community for a long time. And finally, it is happening - Power Pages will start using Bootstrap 5 OOTB. Hooray!

Update to the latest version includes a bunch of benefits (like security fixes and UI improvements) but also allows a lot of new front-end developers to start with Power Pages more easily (as they might be more familiar with the most recent version of Bootstrap).

Power Pages will also provide you with a migration tool to upgrade your code to the latest version. The tool will provide reports on what was changed, so you can control and update code if necessary. 

This feature will be available for **Public Preview** in **Jun 2023**. No **GA** date yet. The original announcement for this feature can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/power-pages/use-bootstrap-version-5-power-pages).

## ALM Power Pages using solutions

ALM in Power Pages was always a tricky thing - from the get-go, you needed to separate your solution with Dateverse tables, plugins etc, and your portal configuration (web pages, web files, etc). With the introduction of PAC CLI support for Power Pages things became easier, but still, data lived separately. Well, all of this is about to change.

Introducing support for Power Pages in solutions. Finally, they will start to feel like a full part of the Power Platform. At this time we don't know how much we will actually include in the solution (only the website record or the whole configuration) or how PAC CLI will work with it. However, I am excited to see how much this will simplify ALM and help new developers and makers get started with Power Pages ALM more easily in a more familiar manner.

This feature will be available for **Public Preview** in **Apr 2023**. No **GA** date yet. The original announcement for this feature can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/power-pages/manage-power-pages-alm-using-solutions).

## Dependent assemblies in plugins

ILMerge no more! The ability to use external assemblies in your plugins became available in Public Preview back in Mar 2022. This was a big breakthrough as using an unsupported and hack-y way of ILMerge was considered not the best, but unfortunately, in many cases your only choice when you needed some external assemblies in your code. During the last year we patiently waited for the GA - and now we have it. Dependent assemblies should be **GA** in **Apr 2023**.

The original announcement for this feature can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/data-platform/include-dependent-assemblies-plug-ins).

## Data ingestion optimizations

![Data ingestion]({{site.baseurl}}/assets/img/2023-01-25-data.jpg){: .center-image }

There is plenty of scenarios when you need to perform various bulk operations. And as a developer, you are always in search of how you can make those operations as performant as you can to smooth your user experience. Well, now we have new messages just for this purpose: CreateMultiple, UpdateMultiple and UpsertMultiple.

There are 3 key improvements:

- these messages apply the change to the database for all records at the same time, not sequentially;
- common internal operations will be performed once for each request rather than for each row;
- you will be able to apply custom business logic in the plugin that will be invoked just once for a request and applied to all records in it.

These messages will not replace existing bulk methods like *$batch* or *ExecuteMultiple*. New messages cannot continue on error as operations are performed simultaneously not per row bases. Because of that, you should use new messages when you are sure that bulk operation will not fail and you need to optimize the performance.

Create and Update messages aren't deprecated, however, Microsoft recommends switching to CreateMultiple and UpdateMultiple messages respectively and updating your plugin code if additional performance is needed for certain tables.

Overall, this will spark a huge shift in plugin development and I am curious to see how this will go.

You might notice that there is no DeleteMultiple. This is because the Delete operation often involved cascading operations which cannot be properly evaluated and acted upon in the limited period of execution.

This feature will be **GA** in May **2023**. The original announcement for this feature can be found [here](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/data-platform/optimize-data-ingestion-performance-createmultiple-updatemultiple-apis). 

## Conclusion

In this post, I highlighted the features that I think are most interesting in the upcoming release. I am excited as there are many features that were requested for a long time and a lot of overall improvements. But there are much more changes waiting for you in the documentation, so check it [out](https://learn.microsoft.com/en-us/power-platform/release-plan/2023wave1/).

Screenshots of new functionality are taken from Microsoft release wave documentation.
