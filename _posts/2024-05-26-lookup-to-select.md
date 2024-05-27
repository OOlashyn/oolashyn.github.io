---
layout: post
title: Power Pages Lookup to Select
date: 2024-05-26 21:45:20 -0500
description: Learn how you can easily replace your lookup control with Select2 control
excerpt: Have you ever wanted to replace your standard lookup control with a better experience like search/autocomplete functionality? Well, you're in luck - with my new jQuery plugin you can do just that! Check out my latest article to learn more.
shortDescription: Have you ever wanted to replace your standard lookup control with a better experience like search/autocomplete functionality? Well, you're in luck - with my new jQuery plugin you can do just that! Check out this post to learn more.
img: 2024-05-26-lts-hero.png
image: /assets/img/2024-05-26-lts-hero-rss.png
tags: [PowerPlatform, PowerPages]
---

One of the most common questions I have in my Power Pages projects is regarding lookup control:

*  can we change it to a dropdown?
*  can we add search/autocomplete?
*  can we show some additional information?

And the answer is usually the same - no. The introduction of custom code components via Power Apps Component Framework gives us a glimpse of hope, however, it is not available for the Power Pages, yet.

What if I told you that you could do all of the above with just a couple of lines of code? Welcome Power Pages Lookup to Select - a jQuery library, that allows you to replace your OOB lookup control with a much more capable [Select2](https://select2.org/) control.

See it in action below:

{% include video.html mp4="2024-05-26-lts-oob.mp4" %}

Visit [documentation](https://www.dancingwithcrm.com/power-pages-lookup-to-select/) to find more information on how to get started.

## How it works

Power Pages Lookup to Select (LtS for short) is a wrapper around the Select2 library. When you call LtS it hides OOB lookup control, creates a new instance of Select2 and an additional select field to hold possible values, and binds the custom select field to OOB control to propagate the value.

### What LtS can do

To find all the ways you can use LtS please visit [the official documentation website](https://www.dancingwithcrm.com/power-pages-lookup-to-select/).

### Basic configuration

In the most basic version, LtS provides search/autocomplete functionality

{% include video.html mp4="2024-05-26-lts-oob.mp4" %}

### Custom options rendering

LtS allows you to customize how your options are rendered to the user. This can be useful if you want to show additional information to make it easier to select the correct option.

{% include video.html mp4="2024-05-26-lts-custom-option.mp4" %}

### Custom grouping

LtS allows you to provide additional grouping for your option. This can be useful if you want to show additional information to make it easier to select the correct option.

{% include video.html mp4="2024-05-26-lts-custom-grouping.mp4" %}

## Open source and contribution

This project is open source - so if you have an idea of how to make it better feel free to contribute. There are multiple ways how to contribute:

*  open an issue to let us know about bugs or problems
*  look into existing issues to help to resolve existing problems
*  create a PR for new functionality or enhance existing one

Visit [the GitHub repository](https://github.com/OOlashyn/power-pages-lookup-to-select) for more information.

## Conclusion

I hope you will find LtS useful. I will continue to maintain and enhance it, and hope the community will do it as well. Visit [the official documentation site](https://www.dancingwithcrm.com/power-pages-lookup-to-select/) and [GitHub repository](https://github.com/OOlashyn/power-pages-lookup-to-select) for the most up-to-date information on the project.
