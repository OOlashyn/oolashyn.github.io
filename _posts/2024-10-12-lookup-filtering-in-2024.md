---
layout: post
title: Custom Lookup Filtering in 2024
date: 2024-10-15 20:45:20 -0500
description: Learn how you can perform custom lookup filtering in Power Pages
excerpt: Have you ever needed to perform custom lookup filtering in Power Pages but weren't sure how do it? Check out my latest article to find an answer for your question.
shortDescription: Have you ever needed to perform custom lookup filtering in Power Pages but weren't sure how do it? Check this post to find an answer for your question.
img: 2024-10-15-cover.jpg
image: /assets/img/2024-10-15-cover-rss.jpg
tags: [PowerPages]
---

## Introduction

One of the most common questions I receive is how to perform custom lookup filtering in Power Pages / Power Apps Portals. Even [one of my most viewed posts][old-lookup-filtering] is about this topic.
However, that post was written in 2019 and a lot has changed in the last five years (although the question remains the same). So let's revisit that old question and provide an answer on how you can custom filter lookups in 2024.

## Approach

First, let's discuss our approach. We cannot filter results in the OOB modal window, as the site returns only a set of records per page. Applying a filter there will yield empty rows or even whole pages. So, we will not use the OOB modal experience at all and instead create our control to handle lookup selection.

In my previous article, I proposed using Form Metadata to render lookup as a dropdown, then fetch the data we need, and replace available options in the dropdown with the data we received. Although this can and will work, there is a big issue with the server-side validation. See, Power Pages validate your submission by comparing the values system originally provided with your submission. If your result was not on the list sent to you originally by the server (which can happen, especially with big datasets) you will have the server-side error.

To prevent this problem, the easiest way is to keep the original lookup control (and not render it as a dropdown), hide it and create a custom control instead, that will present available options and populate the value back to the original control. In this case, the system will only validate if the submitted record belongs to the original query.

{% capture importantText %}
Even with a custom control approach you still need to make sure that the value you submit will be included in the view for the lookup control. For example, if the view shows only active records and you try to submit inactive the system will still throw an error.
{% endcapture %}
{% include important-block.html importantText=importantText %}

## Custom Control

Now that we know the approach we will take let's see what can we do in terms of the control itself. We cannot use PCF Code Components, as at the time of writing, they aren't supporting Lookups. So, we need to create something on the fly. For this article, we will go with the simplest approach, which will be a basic dropdown, but in actual projects, you can create almost anything. See more complex implementation examples via external library Lookup to Select later in this article.

Before building control, we need to get the data. We have three main ways to get it:

1.  Power Pages Web API
2.  Custom Page that acts as an API endpoint
3.  Cloud Flows

### Fetching Power Pages Web API

Power Pages Web API provides a convenient way to get the data you need. You can easily apply filters, sort, etc. When I was writing my previous article, Web API wasn't an option. Right now though, it is the most straightforward way. For this article, we will use Web API in the following example.

However, there are some crucial things you need to consider before going with the Web API approach. The most important one is security. **Depending on the type of data you need to get, there might be cases when unfiltered data shouldn't be exposed to the user in any way, shape or form.** In those cases, using Web API might not be a choice, as users could just perform a query in the console and obtain information they shouldn't see. Also, when using Web API it is really important to just define the columns your users need to access.

You can learn more about using Power Pages Web API by visiting [Microsoft official documentation][official-web-api-docs] and my [Deep Dive into Web API post][web-api-deep-dive-post].

### Fetching with Custom Pages

One of the oldest ways to get data in Power Pages, before the Web API, was using liquid fetchxml requests and custom pages, which will serve as a custom API endpoint.

In short, you create a web template which contains liquid with the necessary fetchxml query. You can configure it to receive parameters and return json as a result, so it will act as our custom web API endpoint.

There are great articles from Colin Vermander ([first][colin-article-first] and [second][colin-article-second]) that explain this concept in more detail. So definitely check them out to learn more.

This approach is better from a security perspective if you need to hide additional filtering criteria and want to make sure your user cannot modify them via the request itself. For example, if you want to filter by users account and don't want them to see it.

### Fetching with Cloud Flows

One of the most recent additions to the Power Pages is the ability to call the cloud flows natively. This allows sending and receiving data from Power Automate and performing various actions that not yet available in Power Pages.

This approach is better from a security perspective, especially, if you want to provide access or filter the data that is not available for the portal users.

**The downside of this approach is potential licensing cost** - Cloud Flows aren't part of the Power Pages licensing and their consumptions and limits might restrict their usage.

To find more about how you can call Cloud Flows from Power Pages visit [this official documentation page][cloud-flow-doc-page].

### Creating the control

Now that we know how to get the data let's create a control. As stated above, in this example we will be creating a simple dropdown and fetch the data using Power Pages Web API.

{% capture code %}
// function that will return filtered response
// using Power Pages Web API
function getSampleFilteredResponse(filterCondition) {
  // webapi.safeAjax is a wrapper provided by Microsoft
  // to call Power Pages Web API (you need to manually add it to the page)
  // for the latest wrapper and sample please visit official documentation via link below
  // https://learn.microsoft.com/en-us/power-pages/configure/write-update-delete-operations#web-api-ajax-samples
  return webapi.safeAjax({
    type: "GET",
    url: `/_api/dwctst_countries?$select=dwctst_countryid,dwctst_name&$filter=startswith(dwctst_name,'${filterCondition}')`,
    contentType: "application/json",
    });
}

$(document).ready(async function () {
    const lookupToHideId = "dwctst_country";
    const lookupTableLogicalName = "dwctst_country";
    const idFieldName = "dwctst_countryid";
    const textFieldName = "dwctst_name";
    // hide original lookup
    $(`#${lookupToHideId}`).parent().hide();

    const customLookupId = "my_custom_lookup";
    // create custom select
    const customSelect = $(`<select class='form-control picklist' id='${customLookupId}'>`);
    // place custom select after existing lookup
    $(`#${lookupToHideId}`).parent().after(customSelect);

    // add default selected Select option
    // to mimic OOB select behavior
    customSelect.append(`<option selected="selected" value="" label="Select" aria-label="Select">Select</option>`);

    try {
        let results = await getSampleFilteredResponse("U");

        if (results.value.length > 0) {
            // create an option element for each result
            // and append it to custom select
            results.value.forEach(el =>
                customSelect.append(`<option value='${el[idFieldName]}'>${el[textFieldName]}</option>`)
            )
        }
    } catch (error) {
        // an error occured retrieving data
        // place your error processing logic here
        console.error(error);
    }

    // add onchange event to populate actual lookup
    customSelect.on("change", function () {
        // get selected id
        const selectedValue = customSelect.val();
        // get selected text
        const selectedValueLabel = $(`#${customLookupId} option:selected`).text();

        $(`#${lookupToHideId}`).val(selectedValue);
        $(`#${lookupToHideId}_entityname`).val(lookupTableLogicalName);
        $(`#${lookupToHideId}_name`).val(selectedValueLabel);

        // trigger change event on original lookup
        $(`#${lookupToHideId}`).trigger("change");
    });

});
{% endcapture %}
{% include code.html code=code lang="javascript" %}

See example below: only showing countries that starts with "U"

{% include video.html mp4="2024-10-15-simple-dropdown-demo.mp4" %}

## External library - Lookup to Select

To simplify, speed up implementation in complex scenarious and provide users with better experience you can use existing free (like [Select2][select2-url] or [jQuery UI Selectmenu][jquery-selectmenu-url]) or paid (like [Kendo UI jQuery DropDownList][kendo-url]) controls instead of simple dropdowns.

I created Power Page Lookup to Select (LtS for short) - a wrapper around the Select2 library. When you call LtS it hides OOB lookup control, creates a new instance of Select2 and an additional select field to hold possible values, and binds the custom select field to OOB control to propagate the value.

See LtS in action below:

{% include video.html mp4="2024-05-26-lts-full.mp4" %}

To find all the ways you can use LtS please visit [the official documentation website][lts-docs].

## Conclusion

In this article I described a simle way of filtering lookup:

- hide original control
- fetch data via Power Pages Web API/Custom Fetchxml Pages/Cloud Flows
- create custom dropdown with the retrieved data

You can use this approach on any type of form. Hope you find this article useful.

Cover Image by <a href="https://pixabay.com/users/pdpics-44804/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=389900">PDPics</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=389900">Pixabay</a>

[lts-docs]: https://www.dancingwithcrm.com/power-pages-lookup-to-select/
[old-lookup-filtering]: https://www.dancingwithcrm.com/custom-lookup-filtering-powerapps-portal/
[cloud-flow-doc-page]: https://learn.microsoft.com/en-us/power-pages/configure/cloud-flow-integration
[colin-article-first]: https://colinvermander.wordpress.com/2017/04/17/dynamics-365-portals-use-liquid-to-return-json-or-xml/
[colin-article-second]: https://colinvermander.wordpress.com/2018/06/26/dynamics-365-portal-use-liquid-fetchxml-with-paging-cookie/
[official-web-api-docs]: https://learn.microsoft.com/en-us/power-pages/configure/web-api-overview
[web-api-deep-dive-post]: https://www.dancingwithcrm.com/powerapps-portal-web-api-deep-dive/
[select2-url]: https://select2.org/
[jquery-selectmenu-url]: https://jqueryui.com/selectmenu/#default
[kendo-url]: https://demos.telerik.com/kendo-ui/dropdownlist/index
