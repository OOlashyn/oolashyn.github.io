---
layout: post
title:  PCF component in Canvas App setting
date:   2019-09-05 16:25:20 +0300
description: How to enable possibility to add PCF component to Canvas App
img: 2019-09-05-construction.jpg
image: /assets/img/2019-09-05-construction.jpg
tags: [D365, PCF]
---
Today doing some changes in new Admin Portal I found an option that I was waiting for - enable PowerApps component framework for canvas apps (well unfortunately not fully, but more about this later). To do so you need to go to **Settings > Features > PowerApps component framework for canvas apps**.

![Admin Center]({{site.baseurl}}/assets/img/2019-09-05-admin-center.jpg){: .center-image }

Let's see how you can add your custom component to Canvas App (or at least try to).

Create a Canvas App (or using an existing one). You need to enable PowerApps Components first. To do so you need to go to **File > App settings > Advanced settings > Components**.

![Component Settings]({{site.baseurl}}/assets/img/2019-09-05-components-app-setting.jpg){: .center-image }

Now to add component select **Insert > Components > Import component** in the toolbar.

![Component Toolbar]({{site.baseurl}}/assets/img/2019-09-05-import-component-toolbar.jpg){: .center-image }

In Import components select Code (experimental).

![Import Component Experimental]({{site.baseurl}}/assets/img/2019-09-05-import-component-experimental.jpg){: .center-image }

Now you can select from the list of the components in the system. Unfortunately I wasn't able to add any component (I even create sample one with newest version of PCF tooling). You can see it in the picture below. But it will be definitely changed soon.

![Import Error]({{site.baseurl}}/assets/img/2019-09-05-error.jpg){: .center-image }
