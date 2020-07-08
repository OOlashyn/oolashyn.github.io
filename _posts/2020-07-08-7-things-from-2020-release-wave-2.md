---
layout: post
title:  Top 7 things from Power Platform 2020 release wave 2
date:   2020-07-08 20:01:20 +0200
description: Learn about 7 things I think are most interesting in Power Platform 2020 release wave 2
excerpt: Learn about 7 things I think are most interesting in Power Platform 2020 release wave 2
img: 2020-07-08-cover.jpg
image: /assets/img/2020-07-08-cover.jpg
tags: [D365, PCF, Portal]
---

Today Microsoft released there Power Platform and Dynamics 365 2020 release wave 2 plans. You can find them [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2020wave2/). Below you can find my list of 7 most interesting features from the release wave (in no particular order).

## Custom pages in Model-driven apps

![Custom Page]({{site.baseurl}}/assets/img/2020-07-08-custom-pages.jpg){: .center-image }

Ability to create a new completely custom experience inside the model-driven app with the ability to use PCF in it? Sounds amazing. For now, it is not clear what exactly we will be able to add there as images just show a different type of layouts we can choose from, but the description says that we will have more flexibility in the components, behaviour, and visuals so let's hope for the best. Public preview of this feature will start in **December 2020**. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2020wave2/power-apps/makers-add-custom-page-model-driven-app-designer).

## Reusable formulas in Canvas Apps

Power Apps formula language has a lot of powerful things and allow you to write pretty complex query (see small example below).

![PCF Formula]({{site.baseurl}}/assets/img/2020-07-08-powerapps-formula.jpg){: .center-image }

However, one thing that it was lacking is an ability to save and reuse custom formulas. Well starting from **October 2020** (in public preview) we will be able to create reusable logic to use across apps. General availability for this feature is not disclosed yet. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2020wave2/power-apps/organize-business-logic-app-components).

## PCF for Power Apps Portals

Power Apps component framework is a huge deal in terms of extending UI/UX of Power Platform. I really like image that Microsoft use to promote it that shows how you can extend standard functionality (see below)

![PCF in Power App Portal]({{site.baseurl}}/assets/img/2020-07-08-pcf-in-model-driven-app.jpg){: .center-image }

Almost from the announcement of PCF developers tried to bring it to Portal (for example [here](https://blog.dynamicscode.net/2020/01/10/build-different-with-power-apps-portal-episode-5-reuse-pcf-controls-on-the-portal/)), but it is not a trivial task. Being able to use PCF in Power Apps Portal out of the box is just amazing, as a library of available components is growing day by day.  Also, it will encourage more Power Apps Portal developer to learn PCF to be able to improve the portal experience even more. Public preview of this feature will start in **December 2020**. See the full feature descriptionw [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2020wave2/power-apps/power-apps-component-framework-control-support-power-apps-portals).

I hope that at some point in time we will be able to use custom components with liquid as part of the custom web templates, but this is only a dream of mine.

## Web API for Power Apps Portals

Using Web API in the Power Apps Portals was one of the most requested and most anticipated feature for a really long time. Right now to be able to perform CRUD operation we need to create a lot of workaround and unnecessary work (web templates that serve as web api endpoints, companion apps and Power Automate or Azure Function calls). All of those will go away in **February of 2021** as this is the date of GA (which is encouraging). We don't know when we will be able to try this, but I assume that it will be somewhere in December as working Web API is a necessary part for Power Apps component framework to work and it should be available in December 2020. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2020wave2/power-apps/power-apps-portals-web-api-generally).

## New model-driven site map app designer experience

![New Designer]({{site.baseurl}}/assets/img/2020-07-08-new-designer.jpg){: .center-image }

Changing the site map for the app might be pretty confusing for some users as the layout of the items in the designer is different form users see in the app. This is mostly because the current designer experience was targeting for the old Dynamics CRM sitemap layout. Moving everything to the maker shell and allowing to have a preview of how the app looks will really improve user experience and allow easier user adoption. Also, the new designer will allow adding pages including custom pages another interesting feature (described above). Public preview will be available in **December 2020**. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2020wave2/power-apps/preview-modern-model-driven-app-designer-sitemap-enable-more-productive).

## A new global search for model-driven apps

![New Global Search]({{site.baseurl}}/assets/img/2020-07-08-new-global-search.jpg){: .center-image }

This one is a pretty interesting one. Right now you have two type of search in the system - Categorized and Relevance search. Starting from **October 2020** (date of GA) completely new experience will be available for the users with records suggestions, recent records and new results page. The search bar will be always available on the application ribbon to allow fast and seamless search experience. I think this a great usability improvement as previous experience forced you to redirect to a different page and removed context that might be helpful for users. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2020wave2/power-apps/new-improved-global-search-experience-model-driven-apps).

## CDS diagnostics in Azure Application Insights

Last, but certainly not the least is one of the most awaited features - ability to see CDS diagnostics in Azure Application Insights. This will allow us to get not only errors from model-driven forms and plugins but also performance data as internal platform logged data will be available to us. And this opens the whole new universe of scenarios including proactive maintenance of the system, by enabling alerts and deeper understanding of issues faced by the user without the necessity of the reproducing the issue (hooray!). And as a cherry on top - Microsoft mention that you will be able to separate if the issue is caused by custom or platform code. This feature will be available in the Public preview from **October 2020** without any GA announced. See the full feature description [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2020wave2/power-platform-governance-administration/common-data-service-errors-performance-data-diagnostics-data-customers-own-azure-application-insights).

## Conclusion

In this post, I highlighted the features that I think are most interesting in the upcoming release. But there are much more changes waiting for you in documentation (108 pages of exciting things) so check it [out](https://docs.microsoft.com/en-us/power-platform-release-plan/2020wave2/). I hope that Microsoft will continue delivering awesome changes to make Power Platform even more "powerful"!

All screenshots of new functionality are taken from Microsoft release wave documentation.
