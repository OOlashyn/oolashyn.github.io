---
layout: post
title:  Date fields in Portals - deep dive
date:   2021-04-08 22:01:20 +0100
description: Learn how date & time fields work in Power Apps Portals
excerpt: Learn how date & time fields work in Power Apps Portals
img: 2021-04-06-cover.jpg
image: /assets/img/2021-04-06-cover.jpg
tags: [Portal]
---

Recently I encounter a post on the Power Apps forum about a need to register a change event on a date field. Before that, I never needed to do any programming interactions with date fields (except show hide them) and I was intrigued that there is more with a regular date field that meets the eye. In this post, we will have a deep dive into how Portal creates and works with date fields.

### bootstrap datepicker

It is not a secret that Portal uses a lot of libraries and UI snippets to render things (like bootstrap 3, jquery etc). In the case of the date fields, there is a library as well - [Bootstrap 3 Datepicker V4](https://getdatepicker.com/4/). This is a library to add datetime widget to the page.

### Portal date field structure

Let's take a look at the structure of the field.

![Code example]({{site.baseurl}}/assets/img/2021-04-08-code-inspection.jpg){: .center-image }

Inspecting of the element reveals an interesting picture - our actual field (**number 1** on the picture) is hidden and the field we see on the page (**number 2**) is a control created by the datepicker library. It consists of a wrapper div element that contains input and a span with icons. That's why when you just try to add event listeners on the change of the main field or influence it somehow you will have issues.

Below you can find a couple of usage examples. To find the list of full functionality and what you can do with this library please refer to the [original documentation](https://getdatepicker.com/4/).

### How to get datetimepicker object

To work with datetimepicker you need to obtain a div wrapper of the control. Because on the portal it will always render next to the actual field we can obtain it something like this:

{% capture code %}
$("#ID_OF_YOUR_DATE_FIELD").next()
{% endcapture %}
{% include code.html code=code lang="javascript" %}

### Working with events

To intercept events you again need to work on the div level. For the full list of available events see [here](https://getdatepicker.com/4/Events/).

One of the most important events is the **dp.change** event. This event fired when the date is changed + changes to a non-date (ie disabled, error in setting options, etc).

{% capture code %}
$("#ID_OF_YOUR_FIELD").next().on("dp.change", function(ev) {console.log("Dp change",ev)})
{% endcapture %}
{% include code.html code=code lang="javascript" %}

Event object will contain to important parameters:

* **date** - the date the picker was changed to. Type: moment object.
* **oldDate** - previous date. Type: moment object.

### Setting min and max available dates

There is a pretty common scenario to set min and max date for the date picker. You can easily achieve this with **minDate** and **maxDate** functions respectively.

{% capture code %}
$('#ID_OF_YOUR_FIELD').next().data("DateTimePicker").minDate();
{% endcapture %}
{% include code.html code=code lang="javascript" %}

{% capture importantText %}
All options and functions of the datepicker available through data attribute - <strong>.data("DateTimePicker").OPTIONS</strong>
{% endcapture %}
{% include important-block.html importantText=importantText %}

Example: setting min available date to the 1st of April
  
![Min date example]({{site.baseurl}}/assets/img/2021-04-08-min-date.jpg){: .center-image }

### Adding Today button

Another common requirement is adding today button. To add this we can use showTodayButton function.
  
{% capture code %}
$('#ID_OF_YOUR_FIELD').next().data("DateTimePicker").showTodayButton(true);
{% endcapture %}
{% include code.html code=code lang="javascript" %}

![Today button example]({{site.baseurl}}/assets/img/2021-04-08-today-button.jpg){: .center-image }

### Conclusion

The portal contains a lot of little hidden things and datetime field is one of those things. In this article, I highlighted the library that was used to create those fields and provide a couple of usage examples. For more examples and details on this library please visit [official docs](https://getdatepicker.com/4/).
