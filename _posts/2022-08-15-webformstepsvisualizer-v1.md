---
layout: post
title:  Web Form Steps Visualizer v1
date:   2022-08-15 00:05:20 -0400
description:  Make it easier to work with Web Forms Steps by visualizing them Web Form Steps as a flow chart with my updated and improved Web Form Steps Visualizer PCF Component.
excerpt: Make it easier to work with Web Forms Steps by visualizing them Web Form Steps as a flow chart with my updated and improved Web Form Steps Visualizer PCF Component.
img: 2020-06-28-flow-chart.jpg
image: /assets/img/2020-06-28-flow-chart.jpg
tags: [PCF, Portal]
---

A long time ago I created a PCF component called Web Form Steps Visualizer (see [original post](https://www.dancingwithcrm.com/web-form-steps-visualizer/)). Its main purpose was to help you to visualize your web form steps as a flow chart. It provided very basic functionality, but did get the job done. As it was in early development stage I marked that version 0.0.2. I had a lot of things planned for it, but limitation of the library that I choose for a flow chart plus general focus on other projects drove me away from it. Not so long ago, Microsoft added new and awesome PCF control type - virtual. I decided to try it out and to rebuild Web Form Steps Visualizer from ground up to add all necessary features. So welcome new and improved Web Form Steps Visualizer version 1.0.0.0!

{% include video.html webm="WebFormStepVisualizer_v1.webm" mp4="WebFormStepVisualizer_v1.mp4" %}

## Version 1.0.0.0

The main purpose of this control is to simpify your work with advance (web) form steps, by allowing you to visualize their order and connections, update it, create new steps, update and delete existing.

{% capture importantText %}
This control will not replace regular experience. You still need to open web form steps to add metadata, specify forms that should be used, etc. Control just simplifies general management of steps.
{% endcapture %}
{% include important-block.html importantText=importantText %}

With Web Form Steps Visualizer you can perform next operations:

- Create new steps
- Update existing steps
- Delete steps
- Open step in a new tab
- Delete connection between step - this action clears lookup of target step to remove reference of the next step (or default next step for conditional step). To perform this you need to click on connection line (it will turn blue), then click Backspace on your keyboard, and then click Save changes button.

You can find demos of each action below.

You can find and download the latest version from [Release page](https://github.com/OOlashyn/PCF-WebFormStepVisualizer/releases) of my Github repo.

## Demo

### Create new step

{% include video.html mp4="wfs_create-new-step.mp4" %}

### Update existing step

{% include video.html mp4="wfs_update-existing.mp4" %}

### Update connection

{% include video.html mp4="wfs_add-connection.mp4" %}

### Delete step

{% include video.html mp4="wfs_delete-step.mp4" %}
