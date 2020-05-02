---
layout: post
title:  PowerWheel  Ep1 - Show only entity form buttons
date:   2019-07-16 00:25:20 +0300
description: PowerWheel Ep1 - How to show only entity form buttons
img: 2019-07-15-create-button.jpg
image: /assets/img/2019-07-15-create-button.jpg
tags: [D365, Portal, PowerWheel]
---

## Introduction

I set a goal for myself - to write at least two articles per week on a regular basis. I will have the following schedule - on Tuesday I will have a short article in the series I called - PowerWheel Episodes and on Friday there will be full sized article primarily about PowerApps and Portals.

There is a website called - Wheel Decide, where you can build a wheel with topics that you need to choose from. I thought it would be a good idea to write some short article about a random part of a PowerPlatform each week. They will contain some useful tips and tricks. So I created a wheel with topics I currently working on and interested in - Portals, Flow, PowerApps, D365 for Sales, D365 for Customer Service, D365 AI, Azure. I will spin this wheel and it will decide what article on which topic should I write. That's what PowerWheel Episodes are about.

## How to show only entity form buttons

The first episode is about Portals. Some time ago I built a great webpage for our portal. It showed information about the specific record. Because it was a read-only page and company had a very specific design I didn't use any entity forms - just liquid tags. However as it always is requirements changed - the user should be able to change one field by the button click. Because of the page design, I wasn't able just to replace it with an entity form. But I found a way - add entity form, but show only action buttons from it.

You can do it fairly easily - just add this CSS line to your web template:

{% capture code %}
.entity-form{
    display: none;
}
{% endcapture %}
{% include code.html code=code lang="css" %}

That's it. It will hide the form content but still will show whatever buttons you add to entity form.

**SECURITY NOTE:** you need to be very careful with this, as you just hide the form content from the page. It is still available there and anyone with HTML and CSS knowledge can make it visible again. So either put there some read-only fields data from which user can see any way or preferably you can just show a section of the form that doesn't contain any fields.

That's it. Hope you like my short article and it might be useful to you. Next week we will talk about Dynamics 365 AI (see PowerWheel spin below).

![PW Ep1]({{site.baseurl}}/assets/videos/pw-ep1.gif){: .center-gif }
