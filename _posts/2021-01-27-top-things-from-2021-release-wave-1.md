---
layout: post
title:  Top 8 things from Power Platform 2021 release wave 1
date:   2021-01-27 16:01:20 +0100
description: Learn about 8 things I think are most interesting in Power Platform 2021 release wave 1
excerpt: Learn about 8 things I think are most interesting in Power Platform 2021 release wave 1
img: 2021-01-27-cover.jpg
image: /assets/img/2021-01-27-cover.jpg
tags: [D365, PCF, Portal]
---

Time flies fast. It seems that just recently I wrote about [my top 7 things in 2020 release wave 2](https://www.dancingwithcrm.com/7-things-from-2020-release-wave-2/) and today Microsoft released their Power Platform and Dynamics 365 2021 release wave 1 plans. You can find them [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/). Below you can find my list of 8 most interesting features from the release wave (in no particular order).

## Async OnSave events

We could register custom functionality for OnSave event in Model-driven apps for a really long time now. New async functionality opens even more doors - it will be especially useful for validation that requires some external async requests. And additional 10-second validation to block save of the record if the promise is not resolved is a cherry on top.

The feature should be available for **public preview** in **Feb 2021** and **GA** in **Apr 2021**. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-apps/async-onsave-events).

## Multi-line text controls expand in Quick View forms

![MUlti-line qvf]({{site.baseurl}}/assets/img/2021-01-27-multi-line-qvc.jpg){: .center-image }

This one is a nice and welcomed feature. It is a problem to view multi-line text in quick view form - you need to click on the field and scroll to view what is inside of it (and only one line is visible). This feature will automatically expand the multi-line field if data is present.

The feature should be available for **early access** in **Feb 2021** and **GA** in **Apr 2021**. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-apps/multi-line-text-controls-expand-quick-view-forms).

## Search quick actions

There are a lot of improvements to the search functionality recently (more intelligent, easier placement, etc). This feature will give users a set of frequently used actions (like call, assign, share) near search results which will drastically increase user experience.

The feature should be available for **early access** in **Feb 2021** and **GA** in **Apr 2021**. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-apps/search-quick-actions).

## Improved navigation in model-driven apps

For a long time experience for editing of related data in model-driven apps was limited in terms that you would need to leave a primary record - thus getting you out-of-context. Of course, recently we had some improvements like an ability to open lookup data in a modal on click or using editable grids. But sometimes this is not enough. This new feature will allow opening the page side pane on the far of the current page and stay open while the current page is open. Also, we would be able to override multi-session app navigation (like in omnichannel app for example) to allow click to open to a side pane. As for now, we don't know how exactly it will be implemented ie will it be on the level of the configuration of the form or some function that will need to call from code.

The feature should be available for **early access** in **Feb 2021** and **GA** in **Apr 2021**. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-apps/improved-navigation-model-driven-apps).

## Support for Microsoft Azure Analysis Services live connections and CustomData function

Native embedding of PowerBI reports into Power Apps Portal is a great advantage of the portal. However, for a long time if you would add a report that uses Azure Analysis Services with the live connection you would receive an error. In general, it might not be a big deal, but with the growth of popularity of Azure Analysis Services, this minor inconvenience became a deal-breaker for some users. So it is great to see that this will be supported soon.
Another great addition is support for CustomData PowerBI function. It allows users to pass some context information to power bi report. Currently, we can only filter data, but unable to pass some additional data. This feature will allow creating more complex and user-specific reports.

Unfortunately, there is no data about public preview or early access only **GA** date - **Apr 2021**. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-apps-portals/power-bi-integration-enhancements-support-azure-analysis-services-live-connections-customdata-function).

## Model-driven app adds in-app notifications

![Without Notification]({{site.baseurl}}/assets/img/2021-01-27-model-app-in-app-notification-toast.jpg){: .center-image }
![With notification]({{site.baseurl}}/assets/img/2021-01-27-model-app-in-app-notification-center.jpg){: .center-image }

Ability to add some sort of notification is a pretty common request. And even right now there are different solutions (teams notifications, flow notifications, custom solutions), but all of them have some disadvantages. This new feature will allow us to show notifications right inside model-driven apps as part of the seamless native experience. Notifications are directed to a specific user and can be sent through the various systems (Power Automate, within the system, custom external systems (I guess through a Web API)). An app creator will need to opt-in to this feature to make notifications available for the users.

The feature should be available for **public preview** in **Apr 2021** and **GA** in **Jun 2021**. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-apps/model-driven-app-adds-in-app-notifications).

## Admin reports to show API usage for users and flows

Licensing is one of the most complex parts of the Power Platform, especially regarding usage limits. API usage has a pretty specific usage limit that we need to keep in mind when designing complex solutions. And lack of visibility was and still is a common pain point. Luckily Microsoft extending possibilities of admins to see reports on API usage for flows and users via Power Platform Admin center.

The feature should be available for **public preview** in **Apr 2021** but there is no date for GA yet. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-automate/admin-reports-show-api-usage-users-flows).

## Custom reporting with Bring Your Own Azure Data Lake for Power Apps and Power Automate

This one would be particularly interesting for companies that want to have more complex and extended reporting on their apps and flows usage. It allows exporting all of your tenant data into users own Azure Data Lake Storage instance including full inventory for all apps, connectors and associated metadata as well as usage telemetry (starting from the date of the export).  After the first export, data will be updated by incremental daily changes.
Once the data will be present in the data lake you can leverage Power BI to build more sophisticated reports like

* Apps and flow usage based on business unit
* business unit specific usage trends
* list of users per business unit with the most apps and flows filtered by sessions or runs

The feature should be available for **public preview** in **Apr 2021** but there is no date for GA yet. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/power-platform-governance-administration/custom-reporting-bring-own-azure-data-lake-power-apps-power-automate).

## Conclusion

In this post, I highlighted the features that I think are most interesting in the upcoming release. But there are much more changes waiting for you in documentation (95 pages of exciting things) so check it [out](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave1/). I hope that Microsoft will continue delivering awesome changes to make Power Platform even more "powerful"!

All screenshots of new functionality are taken from Microsoft release wave documentation.
