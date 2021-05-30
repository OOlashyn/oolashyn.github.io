---
layout: post
title: More Toggles PCF Control
date: 2021-05-30 18:31:20 +0100
description: My new More Toggles PCF control allows you to replace the standard "Yes/No" control with a wide variety of toggles from the MoreToggles.css library.
excerpt: My new More Toggles PCF control allows you to replace the standard "Yes/No" control with a wide variety of toggles from the MoreToggles.css library.
img: 2021-05-30-cover.jpg
image: /assets/img/2021-05-30-cover.jpg
tags: [PCF]
---

## Introduction

Recently I saw an awesome library - [MoreToggles.css](https://jnkkkk.github.io/MoreToggles.css/allToggles.html) which allows you to create a wide variety of interesting toggles. And I decided to create a PCF control that will allow me to use it in Power Apps. You can find a demo and configuration details below. Click to [DOWNLOAD](https://github.com/OOlashyn/PCF-MoreTogglesControl/releases) this control.

{% include video.html webm="moretoggles.webm" mp4="moretoggles.mp4" %}

## Configuration

This is the list of parameters that can be set on the control

* **Toggle Class** : css class from MoreToggles.css (.mt-check-garden by default)
* **Toggle Size** : Allows you to control size of the toggle in pixels (provide coresponding number of pixels) (**TIP** set to 8 if you want to have the size of the stadnard dataverse control)
* **Show Lable** : Show lable for the selected option (No by default)
