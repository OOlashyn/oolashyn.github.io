---
layout: post
title: Top 11 things from Power Platform 2021 release wave 2
date: 2021-07-15 08:01:20 +0100
description: Learn about 11 things I think are most interesting in Power Platform 2021 release wave 2
excerpt: Learn about 11 things I think are most interesting in Power Platform 2021 release wave 2
img: 2021-07-15-cover.jpg
image: /assets/img/2021-07-15-cover.jpg
tags: [D365, PCF, Portal]
---

It feels that just a couple of months ago I wrote about [my top 8 things in 2021 release wave 1](https://www.dancingwithcrm.com/top-things-from-2021-release-wave-1/) and now Microsoft released their Power Platform and Dynamics 365 2021 release wave 2 plans. You can find them [here](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave2/). Below you can find my list of the 10 most interesting features from the release wave (in no particular order).

## Support for themes across Power Apps

The theming is a complicated question in Power Platform. In Model-driven and in Canvas app there were never an easy out of the box way to implement themes. And if in MDA it wasn't always critical, in canvas users need to get creative to support unified theming. But as both worlds are converging bridging this gap becomes a requirement. Luckily we will finally have a solution - the power apps function will have a theme-specific object that can be used to specify or dynamically switch themes. With this update you will be able to create theme aware component libraries. Also, this object will be host aware giving even more possibilities, especially with Teams embedding scenarios. This feature will be available for **public preview** in **August** and **GA** in **October**.

## Simplified Dataverse search configuration for admins and model-driven app makers

Search is and always was an important part of the Platform. In the previous release, MS made Relevance search our main search with plans to remove Categorized search with time. Now Relevance search is rebranded as Dataverse search. Previously, configuring search wasn't a streamlined and user-friendly task. Now app makers will be able to see what is available in the search index in the context of the solution and add/remove tables with the friendly UI. This feature will be available for early access in September and GA in October.

![Search Panel]({{site.baseurl}}/assets/img/2021-07-15-search.jpg){: .center-image }

## Fluent UI controls for canvas apps

Fluent UI is an awesome framework that helped MS to refresh the design of the Power Platform making it much more modern and slick. However, it wasn't the default choice for Canvas apps and components used there looked out of place if embedded in MDA. As a part of the effort of converging apps Fluent UI will become a default option for canvas and all familiar control will be updated. This feature will be available for early access in September and GA in October.

Classic controls

![Classi controls]({{site.baseurl}}/assets/img/2021-07-15-classic-controls.jpg){: .center-image }

Fluent UI controls

![Modern controls]({{site.baseurl}}/assets/img/2021-07-15-modern-controls.jpg){: .center-image }

## Reinvented maker experience for configuring model-driven apps for offline use

Ability to use MDA when offline is an awesome feature. However, configuring offline use isn't a straightforward thing for app makers - you need to select tables available for offline use, configure filters, profiles and update security roles. Soon it all will be a thing of the past - just one switch in the app configuration system will a generate default offline profile. Also if a user has access to the app he will have access to offline. This feature will be available for public preview in September and GA in October.

![Offline profile]({{site.baseurl}}/assets/img/2021-07-15-offline.jpg){: .center-image }

## Code component improvements

Power Apps Component framework was introduced more than 2 years ago. Since then it evolved a lot and the community create thousands of awesome components. PCF is even available for Portals. And upcoming changes will improve a lot of things:

* Virtual components - the thing that we wanted for a long time. Ability to create components that don't need to be bound to the fields and can be placed anywhere.
* Shared libraries support - finally we can use system React and Fluent UI libraries improving performance and loading times of the forms. And the ability to create our own shared libraries that can be reused across components will make allow us to truly create enterprise-level components.
* Support for events - now in the component we can define custom events or use system events just like in canvas components. This will allow us to make components that can influence much more complicated behaviour of the app.
* Lookup and Multiselect optionset support - we finally will be able to create custom components for those types of fields. This was one of the most requested tasks from the community.

## Model driven apps support multiple app side panes

The side pane is available in MDA for quite some time. But its usage was quite limited and didn't have wide appeal. Starting with the next wave a new set of APIs will allow for the creation of multiple side pains. This will allow opening a form or a view similar to navigateTo API. In the documentation it says that we would be able to use custom components to have more targeted experience, but no words for how exactly we will be able to do it, so for now we need to wait.

![Side Panel]({{site.baseurl}}/assets/img/2021-07-15-sidepanel.jpg){: .center-image }

Also, you can add a badge over the pane icon to draw users attention to it.

![Badge]({{site.baseurl}}/assets/img/2021-07-15-badge.jpg){: .center-image }

## Model-driven app removes the web client related "Dynamics 365 - custom" app

When we switched to a new UCI client as part of the legacy transition process "Dynamics 365 - custom" app was available to us as a replacement for the old UI. A lot of people were using it as some sort of an Admin app. Well, the time has come to create a proper admin app if needed as "custom" app will no longer be available.

![Custom App]({{site.baseurl}}/assets/img/2021-07-15-custom-app.jpg){: .center-image }

## Relevance Search integration in portals

Relevance Search (or based on the previous point about renaming Dataverse search) is an awesome feature, that allows an intelligent and also configurable search experience. But it wasn't available for the Portal, as there we were using search based on Lucene.NET library. Soon we will be able to switch to the new experience in the settings while applying the current configuration and restrictions from the old search. Relevance will replace old search in some future releases.

## Portals Web API support for Microsoft Dataverse custom actions and Read operations

Portal Web API helped to elevate the Portal UI experience to a new level. But it is still lacking some functionality like the ability to perform read operations and call custom actions. Well in upcoming releases these gaps will be filled.

In March 2022 (yes long time ahead) we will be able to call custom actions. Right now there is no information about additional security for custom actions, but I think more information will be added when we will get closer to release date.

For Read support we don't need to wait that long - it should be available for Public Preview this October. Finally, the web template style API approach can be avoided and we will be able to query data from the system ( with filters and conditions) on the fly as we need.

## Portals support for Power Apps component framework

As stated previously I love PCF. And the ability to bring them to the portal is an amazing opportunity. You can already add some components to the Portal but with limitations. But in December 2021 when this feature will go GA we will get much more:

* directly add components to the page using liquid
* support for Web API in components - right now only components that doesn't use web API are supported

Exaple of code components on the Portal

![Custom App]({{site.baseurl}}/assets/img/2021-07-15-custom-code-portal.jpg){: .center-image }

## Support for CI/CD of portals configuration

When MS introduced the ability to work with Power Apps Portal with Power Platform CLI it was a game-changer. Working with code in local development and submitting them back to the system all within the same CLI - amazing. It also meant that we could start to use proper CI/CD - at least partially as forms and views still needed to be transferred separately. And community created a lot of awesome tools - like [these tasks for Azure DevOps](https://arpitpowerguide.com/2021/05/28/powerapps-portals-build-tools-an-azure-devops-extension-to-automate-portal-deployment/) from Arpit Shrivastava. But one key missing thing was an inability to create new templates, pages, etc in CLI. For that you needed to go to the system and create it there, breaking your one-stop develop-all experience. Soon that's gonna change - MS will add support for the creation of content. We don't know yet what exactly we will be able to create but let's hope for the best.

## Conclusion

In this post, I highlighted the features that I think are most interesting in the upcoming release. But there are much more changes waiting for you in documentation, so check it [out](https://docs.microsoft.com/en-us/power-platform-release-plan/2021wave2).

Most of the screenshots of new functionality are taken from Microsoft release wave documentation.
