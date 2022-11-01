---
layout: post
title: (Quick Tip) Hiding fields by default on Power Pages - CSS way
date: 2022-10-31 22:05:20 -0400
description: Learn a simple trick on how to hide fields by default in Power Pages with CSS
excerpt: Learn a simple trick on how to hide fields by default in Power Pages with CSS
img: 2022-10-31-cover.jpg
image: /assets/img/2022-10-31-cover.jpg
tags: [Portal, PowerPages]
---

One of the most common things you need to do as the Power Pages developer is conditionally hiding/showing fields/sections etc. This often includes hiding fields by default. And there is a quite straightforward way to do that - by using javascript (check [this article](https://oliverrodrigues365.com/2020/07/19/power-apps-portals-javascript-tip-01-hide-show-elements/) from Oliver Rodrigues to find out how to do that). However, with fields hidden by default, this can lead to a blinking page problem when, for a brief moment, your fields are visible and only then are hidden by the code. Blinking can be especially harsh on slow networks or forms with lots of hidden fields that are scattered across regular ones. 

## CSS to the rescue

So how we can hide fields by default without using JS? Using CSS may sound obvious, until we take a look at how the fields are rendered on Power Pages. Let's say we have a couple of fields (Issue Type, Issue Severity and Feature Priority) that should be hidden by default and later conditionally shown.

![Initial Form]({{site.baseurl}}/assets/img/2022-10-31-initial-form.jpg){: .center-image }

Let's take a closer look at the Issue Type (crfbd_issuetype). This is a simple text field. Usually, websites render text fields like label/input combo. But in Power Pages it looks a bit different (simplified HTML):

{% capture code %}
<tr>
<td>
    <div class="info">
        <label for="crfbd_issuetype" id="crfbd_issuetype_label" class="field-label">Issue Type</label>
    </div>
    <div class="control">
        <input type="text" maxlength="100" id="crfbd_issuetype" class="text form-control " >
    </div>
</td>
</tr>
{% endcapture %}
{% include code.html code=code lang="html" %}

As you can see label and input itself are in different containers. We can hide them by targeting input and label independently, but we would have an empty tr which wouldn't look nice on the form. So ideally we would need to somehow target their common parent. But there is no parent selector in CSS. Or is it?

Welcome **:has**. This selector allows you to target the parent or relative sibling of something. This opens the door for a wide variety of interesting styling options, including hiding the parent when some conditions satisfied for the child. Learn more about **:has** pseudo-class [here](https://developer.mozilla.org/en-US/docs/Web/CSS/:has).

In our case, CSS would look simple - tr as the tag name and id as a selector:

{% capture code %}
tr:has(#crfbd_issuetype) {
    display: none;
}
{% endcapture %}
{% include code.html code=code lang="css" %}

And that's it - now your fields are hidden by default, no JS necessary. Below you can find a small demo:

{% include video.html mp4="2022-10-31-demo.mp4" %}

Additional bonus - they are also hidden in the Power Page editor.

![Form in editor]({{site.baseurl}}/assets/img/2022-10-31-form-in-editor.jpg){: .center-image }

## Caveat

But this approach has a caveat. And in this case, it is a support across browsers. According to [caniuse](https://caniuse.com/css-has) - Firefox and some mobile browsers (like Opera Mini or Samsung Browser) don't support this pseudo-class. So to make sure it will work always I would advise using both CSS and JS - if the browser doesn't support :has JS will do the trick.

![Caniuseit]({{site.baseurl}}/assets/img/2022-10-31-caniuse.jpg){: .center-image }

## Conclusion

Now we have a clear way to hide fields by default using some CSS magic. And we can still use JS to ensure that it will work across the browsers.