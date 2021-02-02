---
layout: post
title:  Customizing PowerBI report in Power Apps Portal
date:   2021-02-02 16:01:20 +0100
description: Learn how you can customize embedded PowerBI report in Power Apps Portal to fit your needs
excerpt: Learn how you can customize embedded PowerBI report in Power Apps Portal to fit your needs
img: 2021-02-01-cover.jpg
image: /assets/img/2021-02-01-cover.jpg
tags: [Portal]
---

Embedding PowerBI reports into the dashboard is a powerful feature. It allows sharing stunning PowerBI visuals without the hustle and complex configuration. However, there still commons issues like how to style report on the portal, etc. Below you will find answers on some common problems and issues that I faced. I will not go into details on how to configure Power BI visualization and how to embed report to the page - you can find answers for those questions here in the official documentation.

## Height and width of Power BI report

One of the most common questions is how to change the default height and width of the Power BI report. If we inspect the page we can find that report is embedded in the div element with class powerbi. This CSS class looks like this:

![powerbi css class]({{site.baseurl}}/assets/img/2021-02-02-report-css-class.jpg){: .center-image }

As you can see it restricts the height of the element to 600 px by default. So to make our report taller in the template of the page (or in CSS settings) we need to write next line:
{% capture code %}
.powerbi {
    /* provide necessary height */
    height: 85vh;
}
{% endcapture %}
{% include code.html code=code lang="css" %}

You can also add **!important** modifier to make sure that this class will not be overwritten. Similarly, you can change the width of the report.

## powerbi-client javascript library

When you enable support for powerbi MS also includes the powerbi-client library to the page that allows you to update report settings and handle events. Below we will take a look at a couple of interesting usage scenarios. You can find more about this library in the official documentation [here](https://github.com/microsoft/PowerBI-JavaScript#powerbi-client).

{% capture importantText %}
Be aware that portals ships with powerbi-client version <strong>2.6.5</strong> - which is a pretty dated version. So while reading docs always check starting from which version they added support for the feature you are interested in.
{% endcapture %}
{% include important-block.html importantText=importantText %}

## Removing filters and navigation

Default navigation in report and filtering are both really nice features. However sometimes, especially when the report contains only one page and doesn't have anything to filter those features just take up space on the screen. Using power-client we can update report settings to disable/enable those features. Check below code for details

{% capture code %}
$(window).load(function() {
    // get div container for powerbi report
    var embedContainer = $(".powerbi")[0];

    // get reference to the embedded report
    var report = powerbi.get(embedContainer);

    // register a function to execute when report will finish loading
    report.on("loaded", function(){
        // update existing setting of the reports
        // you can disable only one page or both at the same time
        report.updateSettings({
            panes: {
                filters :{
                    visible: false
                },
                pageNavigation:{
                    visible: false
                }
            }
        }).catch(function (errors) {
            console.log(errors);
        });
    })
});
{% endcapture %}
{% include code.html code=code lang="javascript" %}

{% capture importantText %}
In this example, I am using <strong>window.load</strong> instead of more frequent <strong>document.ready</strong> (that can be found in the official documentation <a href="https://docs.microsoft.com/en-us/powerapps/maker/portals/admin/add-powerbi-report#how-to-use-powerbi-client-javascript-library-in-portals">here</a>). This is because sometimes powerbi report wouldn't load when document ready event would be fired, thus making code unusable. Using <strong>window.load</strong> ensures that the page is fully loaded first.
{% endcapture %}
{% include important-block.html importantText=importantText %}

With filter and navigation panes:

![Report with filter and navigation panes]({{site.baseurl}}/assets/img/2021-02-02-report-with-filter-nav.jpg){: .center-image }

Without filter and navigation panes:

![Report without filter and navigation panes]({{site.baseurl}}/assets/img/2021-02-02-report-without-filter-nav.jpg){: .center-image }

## Fullscreen

Next scenario that we will cover is opening your report fullscreen. This is particularly useful for big reports with a lot of visuals or in general to have a better overview of data.

{% capture code %}
// get div container for powerbi report
var embedContainer = $(".powerbi")[0];

// get reference to the embedded report
var report = powerbi.get(embedContainer);

report.fullscreen();
{% endcapture %}
{% include code.html code=code lang="javascript" %}

## Print report

Sometimes we need to print generated report and we don't want to print the whole page with it. powerbi-client library got us covered
{% capture code %}
// get div container for powerbi report
var embedContainer = $(".powerbi")[0];

// get reference to the embedded report
var report = powerbi.get(embedContainer);

report.print()
    .catch(error = > { console.error(error); });
{% endcapture %}
{% include code.html code=code lang="javascript" %}

Print report dialog:

![print report]({{site.baseurl}}/assets/img/2021-02-02-report-print.jpg){: .center-image }

## Mobile layout

In our mobile-first ability to view everything in mobile is crucial. Unfortunately, if you will just embed standard report and try to show it on a mobile device it will look bad. That's because the system will just try to shrink it. To solve this issue you need to create a mobile layout for your report ( see [here](https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-create-phone-report) for more details ) and then using library change layout of report to mobile (if applicable).
{% capture code %}
//get enum of available models
//for mobile layout there is two options
//models.LayoutType.MobileLandscape and models.LayoutType.MobilePortrait
var models = window['powerbi-client'].models;

// get div container for powerbi report
var embedContainer = $(".powerbi")[0];

// get reference to the embedded report
var report = powerbi.get(embedContainer);

report.getPages().then(function (pages) {
    //check if report has mobile portrait layout
    pages[0].hasLayout(models.LayoutType.MobilePortrait).then(function (hasLayout) {

        if(hasLayout) {
            const newSettings = {
                layoutType: models.LayoutType.MobilePortrait
            };
            
            report.updateSettings(newSettings);
        }
    })
})
{% endcapture %}
{% include code.html code=code lang="javascript" %}

## Data selected event

Sometimes we need to handle events in a specific way - show notification when the data was selected etc. Luckily we can register custom event listeners on data selected event and perform our custom logic.
{% capture code %}
// get div container for powerbi report
var embedContainer = $(".powerbi")[0];

// get reference to the embedded report
var report = powerbi.get(embedContainer);

//Report.off removes a given event listener if it exists
report.off("dataSelected");
//Report.on will add an event list
report.on('dataSelected', function(event){
    console.log('Event - dataSelected:');
    console.log(event.detail);
})
{% endcapture %}
{% include code.html code=code lang="javascript" %}

Show alert on data click:

![handle data selected event]({{site.baseurl}}/assets/img/2021-02-02-report-event-click.jpg){: .center-image }

## Conclusion

PowerBI embedding is a powerful feature of Power Apps Portal that allows easily configure and share complex and beautiful visuals. powerbi-client library allows us to perform more complicated configuration of the reports to fit our needs. I hope that MS will soon update the version of the library used in the portal which will allow us to have even more control over the embedded report.
