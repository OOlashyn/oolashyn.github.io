---
layout: post
title:  Custom Lookup filtering on PowerApps Portals
date:   2019-11-13 01:10:20 +0300
description: How to filter lookup fields with custom code on PowerApps Portals
img: 2019-11-12-street-sign.jpg
image: /assets/img/2019-11-12-street-sign.jpg
tags: [D365, Portal]
---
## Introduction

One of the common tasks in Dynamics 365 CE is to apply related records filtering, usually between two or more lookup fields. And luckily Microsoft provided us with great and most importantly out of the box way to achieve that. You just go to the form(in Classic interface), open lookup that you are interested in, scroll to Related Record Filtering and specify all necessary conditions. This type of tasks was usual for me for our Portal development as well. And it worked just fine. However last week I found that not everything is unicorns and rainbows - for some reason filtering didn't work on a create entity form. First I thought there was a bug. So I contacted Microsoft support. And to my surprise, they replied to me that indeed it wasn't working and it was expected behaviour. Related record filtering works only on edit forms. For us those requirements were critical, so I started thinking about how I can solve this problem. And soon I found the solution.

## Custom Lookup Filtering

Imagine we have a custom entity called Categorization. We have two lookup fields on Contact - Primary Categorization and Secondary Categorization. We need to filter Secondary Categorization by the value in Primary Categorization.

Let's step back and  start with investigation what lookup is on the portal. It is an input field that will open a popup with the list of records. Unfortunately, you cannot specify any filter on the field. You also cannot specify possible values directly. Or at least you cannot do it if lookup will be rendered as-is. And luckily for us, there is a way to change default rendering behaviour - entity form metadata.

### Entity Form Metadata

What is Entity Form Metadata? I will quote Microsoft on this one:
>Entity Form Metadata contains additional behaviour modification logic to augment or override the functionality of form fields that is otherwise not possible with native entity form editing capabilities.

Using this you can specify additional properties of fields, sections, tabs and other parts of the entity (or web) forms. That allows doing all kind of thing starting with specifying additional values on save, add additional CSS classes, etc. One particularly interesting thing is that we can enable lookup to be rendered as a dropdown.  What it will do is instead of regular input with popup window it will render it as an HTML select field. And this field we can manipulate easily. Select will contain options, that will have value with record id.

Here is how you can easily add entity form metadata.

Open your Portal Management app (or Dynamics 365 Portals app if you have Dynamics portal). There find an entity form on which you need to add metadata (in my case Create Contact Demo form). There find an Entity Form Metadata tab. It will contain a subgrid with all related Entity Form Metadata records. Press the New Entity Form Metadata button.

![Entity From Metadata Grid]({{site.baseurl}}/assets/img/2019-11-12-entityformmetadata-grid.jpg){: .center-image }

It will open a creation form. In the Type field select Attribute. Then in Attribute Logical Name select attribute that you want (in my case dwc_secondarycategorization).

![Entity From Metadata Attribute Type]({{site.baseurl}}/assets/img/2019-11-12-attribute-type.jpg){: .center-image }

Then scroll to Control Style section. In the Control Style field select Render Lookup as Dropdown.

![Entity From Metadata Control Style]({{site.baseurl}}/assets/img/2019-11-12-control-style.jpg){: .center-image }

Hit save and that's it.

I done the same to the Primary Categorization field to make it look similar on the form.

What we need next is to have a list of records that we can easily turn into options. But how can we do that? Well, let's use some liquid magic.

### Liquid Page Templates

Some time ago I found great articles ([first][first-liquid-article] and [second][second-liquid-article]) from Colin Vermander about using liquid and fetchxml to get records. I definitely recommend you to read them as I will use their outcome in my solution with just a basic explanation. In short, you create a web template which contain liquid with necessary fetchxml query. You can configure it to receive parameters and return json as a result, so it will act as our own web service.

So for our task, we will need to create a web template with correct fetchxml query that will receive as a parameter id of the main dropdown and will return us a list of records that we will add to our select.

I will go to Web template and create a new one with a code below:

![Fetchxml Code]({{site.baseurl}}/assets/img/2019-11-12-fetchxmlcode.jpg){: .center-image }

Now when we have all parts of the solution at our disposal let's put it together.

## Add custom code to the form

Open entity form that we are working on (in my case Create Contact). Select Additional Settings and scroll down to Custom Javascriptn section. There you can add custom code that will run when form will load.

![Custom Javascript]({{site.baseurl}}/assets/img/2019-11-12-custom-javascript.jpg){: .center-image }

What we need to do is register function onchage of main field (in my case dwc_primarycategorization). That function should call our web page with correct parameter, consume response and update our dependend field.

You can find my custom code with explanation below:

{% capture code %}
$(document).ready(function () {
    // register onPrimaryChange function to run on change of dwc_primarycategorization field
    $("#dwc_primarycategorization").change(onPrimaryChange);
    $("#dwc_primarycategorization").change();
  
 });

function onPrimaryChange(){
    // get id of selected primary field
    // this will work only if you render primary field as dropdown
    let primaryValue = $("#dwc_primarycategorization option:selected").val();
    
    // remove all option from dependent field
    $("#dwc_secondarycategorization").empty();

    if(primaryValue != null && primaryValue !=""){
        // request to our custom page with id as parameter
        $.getJSON( "/categorization-json?id="+primaryValue, function( data ) {
            if(data.results.length>0){
                //create option for each returned entity
                data.results.forEach(element => {
                    let option = document.createElement("option");
                    option.value = element.Id;
                    option.innerText = element.Name;

                    $("#dwc_secondarycategorization").append(option);                   
                });
            } 
        }
        );
    }
}{% endcapture %}
{% include code.html code=code lang="javascript" %}

## Conclusion

In this article I described a way to filter lookup using custom code and entity form metadata. You can use this approach on any type of form. However I would recommend default filtering when applicable. Hope you find this article useful.

[first-liquid-article]: https://colinvermander.wordpress.com/2017/04/17/dynamics-365-portals-use-liquid-to-return-json-or-xml/
[second-liquid-article]: https://colinvermander.wordpress.com/2018/06/26/dynamics-365-portal-use-liquid-fetchxml-with-paging-cookie/