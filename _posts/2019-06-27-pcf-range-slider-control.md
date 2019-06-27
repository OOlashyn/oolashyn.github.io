---
layout: post
title:  PCF Range Slider Control
date:   2019-06-27 22:26:20 +0300
description: PCF Range Slider Control - simple range slider control (buily using noUiSlider library)
img: 2019-06-27-slider.jpg
image: /assets/img/2019-06-27-slider.jpg
tags: [PCF, D365]
---

This is my second PCF control. You can find more about the first one in my previous [post][first-control].

After the first control, I was looking for an idea for a new one. And after seeing range slider control on one web site I understand - I need to try and build something like that. And you can see the final result below.

![Demo](https://github.com/OOlashyn/PCF-RangeSliderControl/blob/master/Screenshots/demo-v1.gif?raw=true)

You can download it from [here][download-link].

This control is build using [noUiSlider][noUiSlider-link] - a great lightweight javascript range slider library. It is pretty easy to use and it is highly customizable. Some of the available customizations are built in version 1 of my control and are accessible via simple configurations (see image below).

![Configs]({{site.baseurl}}/assets/img/2019-06-27-slider-config.jpg){: .center-image }

There are 4 main configuration parameters:

* **MinValue** -  Attribute to use as the minimal value for sliders range.
* **MaxValue** -  Attribute to use as the maximum value for sliders range.
* **LowerValue** -   Attribute to use as starting lower value for the slider. It should be bound to the field.
* **UpperValue** -  Attribute to use as starting upper value for the slider. It should be bound to the field.

All other values are optional and just extends behaviour and look of slider. You can find more about them on the control [GitHub page][project-link].

Demos of range slider control with different configurations.

![DemoScale](https://github.com/OOlashyn/PCF-RangeSliderControl/blob/master/Screenshots/demo-scale-v1.gif?raw=true)

![DemoStep](https://github.com/OOlashyn/PCF-RangeSliderControl/blob/master/Screenshots/demo-step-v1.gif?raw=true)

[first-control]: https://www.dancingwithcrm.com/first-pcf-control/
[download-link]: https://github.com/OOlashyn/PCF-RangeSliderControl/releases
[noUiSlider-link]: https://refreshless.com/nouislider/
[project-link]: https://github.com/OOlashyn/PCF-RangeSliderControl
