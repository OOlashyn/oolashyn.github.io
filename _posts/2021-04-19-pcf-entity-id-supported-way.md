---
layout: post
title: Supported way to get Entity Id and Logical Name in PCF
date: 2021-04-19 06:01:20 +0100
description: Learn about supported way to get Entity Id and Logical Name in yout PCF component
excerpt: Learn about supported way to get Entity Id and Logical Name in yout PCF component
img: 2021-04-18-cover.jpg
image: /assets/img/2021-04-18-cover.jpg
tags: [PCF]
---

## Introduction

What is the question about PCF that we, as developers, were asking the most? I would say probably this one - *"What is a supported way to get Entity Id and Logical Name of the entity?"*. There were different ways to obtain that information (see my [previous post](https://www.dancingwithcrm.com/another-way-to-get-entity-name-and-id-in-pcf/)), but we finally got an answer.

## Solution

We would need to have two new mandatory fields for our components one for Entity Id and one for Entity Logical Name (you can name them whatever you would like). Their *type* need to be **SingleLine.Text** and *usage* need to be **input**. Then when configuring those fields the user will need to select **"Bind to a value on a field"** and in the list of fields the user will be able to see the id field for the entity (accountid for example) and at the end of the list specific field called **entitylogicalname**, which is self-explanatory.

Id field:

![Entity Id]({{site.baseurl}}/assets/img/2021-04-18-entityid.jpg){: .center-image }

Logical Name field:

![Entity Name]({{site.baseurl}}/assets/img/2021-04-18-entityname.jpg){: .center-image }

## Conclusion

So we finally have a "supported way" to get information that we need in our components. However, this requires a bit more action from our users (especially regarding entity id which users might have troubles finding), but at least now we shouldn't be afraid that our code will stop working as unsupported.
