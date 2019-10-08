---
layout: post
title:  Introduction to PCF DataSet component
date:   2019-10-08 15:25:20 +0300
description: Short introudction to PCF DataSet component
img: 2019-10-08-idea.jpg
image: /assets/img/2019-10-08-idea.jpg
tags: [D365, PCF]
---
I build a couple of PCF components before, but all of them were field type components. There was however one type that I didn't touch before - dataset component. I spend some time trying to come up with a good idea and then I got it - I need to build a Tag Cloud. You can see a small demo of how it looks below. And you can download the component itself [here][control-page]. In this article, I will try to share with you what I learn building dataset component. I hope it will help you to create yours easier.

![Sample Control](https://github.com/OOlashyn/PCF-TagCloud/blob/master/Screenshots/tagcloud-v1.gif?raw=tru){: .center-gif }

## DataSet component manifest structure

Let's start from the beginning - from the manifest file. To define your DataSet you need to add the data-set node. There you need to specify the name of the component and its display name (the same as with field component). Then inside data-set node you need to specify property-set node - it is a unique field that each record of dataset needs to provide. Property-set has all the attributes that regular property has.

![Component Manifest]({{site.baseurl}}/assets/img/2019-10-08-manifest.jpg){: .center-image }

## Getting data from DataSet

Next thing to learn about DataSet is how to get data from it. The way that I used was using DataSet property called **sortedRecordIds** - it is sorted array of the Ids of records. You can go through it one by one and receive a record with that Id using **records** property of DataSet like this:

{% highlight javascript %}
for (let currentRecordId of dataSet.sortedRecordIds) {
    let currentRecord = dataSet.records[currentRecordId];
}
{% endhighlight %}

Now when you have record it is time to retrieve necessary attributes. You can retrieve only the attributes that you provided in the manifest file. To retrieve values from the record you can use two methods: **getFormattedValue** and **getValue**. They both accept the name of the attribute as the input parameter. For example, I defined two attributes - *NameAttribute* and *NumberAttribute*. To retrieve them I can use the next code:

{% highlight javascript %}
let name = currentRecord.getFormattedValue("NameAttribute");
let number = currentRecord.getValue("NumberAttribute");
{% endhighlight %}

### Difference between **getFormattedValue** and **getValue**

As you can tell from names of the method getValue returns raw value and getFormattedValue returns formatted value. And despite it didn't sound like a big thing it is quite important. Simple example: we have NumberAttribute which should be number type.  Let's say it will be equal to 2000. If you use getValue method you will receive '2000' as a response. So far so good. But if you use getFormattedValue you will receive '2,000' or '2.000' depending on your locale settings. This is because it returns 'formatted' value with all formating applicable. So be very careful which one you are using and when.

## DataSet and pagination

Next big thing that we need to discuss is pagination. By default, DataSet component will fetch only the first page. And that page can have a really small amount of rows. For example, the default number of rows in subgrid per page is 4. You can change this setting if you open subgrid properties (in Classic UI), go to Formatting tab and in Row Layout section change number of rows that are present per page.

![Subgrid settings]({{site.baseurl}}/assets/img/2019-10-08-subgrid-settings.jpg){: .center-image }

To make work with pagination much easier we have **paging** property on a DataSet. It contains properties and methods that help us with pagination. For example, we have **hasNextPage** - which is a boolean property that shows us do we have more page going forward. Similar we have **hasPreviousPage** - shows us do we have more pages going backwards. Respectively we have to methods **loadNextPage** and **loadPreviousPage** to retrieve records from pages. Both of those methods will cause DataSet to update and standard **updateView** will trigger - so do not forget to insert update logic there.

Last, but certainly not least is one small but very useful property on DataSet itself called **loading** - it indicates if the dataset property is in loading state or not. You can use it inside **updateView** function to prevent taking any action before data fully loads.

## Conclusion

This was a short introduction to DataSet components in PCF to help you more easily build your components. In this introduction, I didn't cover a lot of things available in the DataSet component - but I will try to cover them in the next article about DataSet components.

[control-page]: https://github.com/OOlashyn/PCF-TagCloud
