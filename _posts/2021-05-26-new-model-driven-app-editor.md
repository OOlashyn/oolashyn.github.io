---
layout: post
title: New model driven app designer
date: 2021-05-26 07:01:20 +0100
description: New model driven app designer is available in preview to simplify MDA creation
excerpt: New model driven app designer is available in preview to simplify MDA creation
img: 2021-05-26-cover.jpg
image: /assets/img/2021-05-26-cover.jpg
tags: [PowerApps, D365]
---

## Introduction

As part of their 2021 release wave 1, Microsoft announced a new improved model-driven app designer. And the day has come - we can finally try it as a preview feature.

## How to enable

To try this new feature you need to go to **make.preview.powerapps.com**. I am using it by default to be able to try new things early. After that, you have two options to try the new editor:

1) while creating an app select **"Modern app designer (preview)"**

![Create Model Driven App]({{site.baseurl}}/assets/img/2021-05-26-create-model-driven-app.jpg){: .center-image }

2) open a solution with an app, hit 3 dots and on the Edit option click on the arrow and select **"Edit in preview"**

![Edit Model Driven App]({{site.baseurl}}/assets/img/2021-05-26-edit-model-driven-app.jpg){: .center-image }

## New editor

When you open an app in a new editor you can see an editor similar to the familiar form editor, but this time whole app is available. In the toolbar on the left, we have 3 components: **Pages**, **Navigation**, **Data**.

![New Editor]({{site.baseurl}}/assets/img/2021-05-26-new-editor.jpg){: .center-image }

## Pages

The model-driven app now consists of pages. Pages allow you to show necessary data like table views and forms, dashboards, or via custom pages create a mixed experience by embedding canvas apps, custom controls and more. As of the date of the writing of this article, we can create only table and dashboard pages.

New Page dialog:

![New Page dialog]({{site.baseurl}}/assets/img/2021-05-26-create-page-dialog.jpg){: .center-image }

In the Page section, you can select a specific Page and configure it.

For table page:

* you can configure forms available for this table

![Configure forms]({{site.baseurl}}/assets/img/2021-05-26-page-edit-form.jpg){: .center-image }

* and you can configure available views

![Configure views]({{site.baseurl}}/assets/img/2021-05-26-page-edit-view.jpg){: .center-image }

For the dashboard page - you can edit the dashboard (which will open it in a separate window) or remove it.

![Edit dashboard]({{site.baseurl}}/assets/img/2021-05-26-page-dashboard-edit.jpg){: .center-image }

## Navigation

In the Navigation panel, we can configure the navigation of our app. As in the previous editor we are operating with Groups and Subareas.

![Navigation]({{site.baseurl}}/assets/img/2021-05-26-navigation-add.jpg){: .center-image }

As in the previous editor when we select a specific Subarea we can modify its content (ie Content Type, Table, Title, ID).

![Navigation Subarea]({{site.baseurl}}/assets/img/2021-05-26-navigation-subarea.jpg){: .center-image }

Right now to order subareas and groups we need to click on it and use the "Move up" and "Move down" buttons. Hopefully, the drag and drop option will be available as well in the future.

![Move subarea]({{site.baseurl}}/assets/img/2021-05-26-navigation-move.jpg){: .center-image }

## Data

In the Data panel, we can see what tables are already available in our app and also other tables in our environment. For now, we can only edit tables (they will be opened in a separate tab), but I assume in the future we will be able to add tables to our app without exposing them as pages from here (as we can do it in the regular editor).

![Data panel]({{site.baseurl}}/assets/img/2021-05-26-data.jpg){: .center-image }

## Conclusion

A new editor definitely makes it easier and more convenient to create model-driven apps and remove old UI elements that might confuse users. And when custom pages will be available old editor will for sure become thing of the past.