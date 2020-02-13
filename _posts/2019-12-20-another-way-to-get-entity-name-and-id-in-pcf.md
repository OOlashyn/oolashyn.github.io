---
layout: post
title:  Another way to get entity name and id in PCF in Model-Driven app
date:   2019-12-20 08:01:20 +0300
description:  Another way to get entity name and id in PCF in Model-Driven app
img: 2019-12-20-catch.jpg
image: /assets/img/2019-12-20-catch.jpg
tags: [D365, PCF]
---
## Introduction

When I started with PCF one of the first question that I have was how to retrieve the current record id. However, to my surprise, there was no out of the box supported solution. Some proposed to use old **Xrm.Page**. Some suggested using **context.page** and get properties from there (I used this in a couple of my components). Some proposed to use **context.mode.contextInfo** and get properties from there.

Unfortunately what unites all of the methods presented above is that they are not supported and undocumented, which means they might be deprecated in the upcoming releases.

But there might be a solution that sort of supported and will work (only for Model-Driven app),

**UPDATE** - please do not use this method in your production instance. Microsoft said that using URL can have incosistant behavior and other side effects.

## Solution

Let's step back and think what else do we have for our disposal that contains necessary info and are available through browser methods only? If you guessed page URL you are right.

Typical URL for the record for Model-Driven app looks like this:

{% highlight html%}
"org"."region".dynamics.com/main.aspx?appid="YOUR_APP_ID"&pagetype=entityrecord&etn="ENTITY_NAME"&id="RECORD_ID"
{% endhighlight %}

If you check your record URL it might look a bit different (might include additional parameter like formid), but in general all elements described above will be present. This means that we can extract everything we need from the URL and not depend on unsupported methods that might break.

Below code will extract all necessary data and return you the object that contains all available parameters from the URL.

{% highlight typescript %}
function getPageParameters():any{
    //get current page url
    const url = window.location.href;

    //get the part after question mark with parameters list
    const parametersString = url.split("?")[1]; 

    let parametersObj:any = {};

    if(parametersString){
        // split string to pair parameter=value
        for(let paramPairStr of parametersString.split("&")){
            let paramPair = paramPairStr.split("=");
            parametersObj[paramPair[0]] = paramPair[1];
        }
    }

    //as a result you will have something like this
    // {
    //     appid: f22d7a50-53fa-42c7-93d3-fd2526e23055,
    //     pagetype: entityrecord,
    //     etn: contact,
    //     id: 77ffee28-1e8f-453f-8d51-493442bbb327
    // }

    return parametersObj;
}
{% endhighlight %}

## Conclusion

The method described in this article will help you to avoid problems with unsupported methods until the PCF team will introduce supported one. However, this method will only work for Model-Driven app. Hope you find this article useful.
