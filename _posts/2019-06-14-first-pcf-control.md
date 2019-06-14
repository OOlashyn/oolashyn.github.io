---
layout: post
title:  Things I learn building my first PCF control
date:   2019-06-14 01:10:20 +0300
description: Mistakes I made and things I learn while building my first PCF control
img: 2019-06-14-learning.jpg
image: /assets/img/2019-06-14-learning.jpg
youtubeId: 'oILXbhZEcQI'
tags: [PCF, D365]
---
In April Microsoft made PowerApps Control Framework available for public preview. It was a great news for me as a developer. But unfortunately I wasn't able to start playing with it back then. So week ago when I had some spare time I decided to check what this framework can offer.

My idea was simple - let's build gallery control with full screen preview of the image and related note information. I built it some time ago as webresource and I thought that build it in PCF would be an easy task. And obviously I was wrong. But let's start from the beginning.

First thing that I need to retrieve was entity name and record id. Well I thought it should be easy and MS should provide me with some tools do to so. Nope. They don't. So I start googling. And found [this]( https://nishantrana.me/2019/06/06/step-by-step-create-a-very-simple-powerapps-custom-component-to-show-the-guid-of-the-record/) article by [Nishant Rana](https://nishantrana.me/). In his control he uses Xrm.Page to get it. Easy and obvious. But after further inspection I found that Context object contains property called page. And in that property you can find both entityid and entityname. Also you can find appId there.

![Context Object]({{site.baseurl}}/assets/img/2019-06-14-page-object.jpg)

As for now if you try to access page property of context you will get an error in typescript, because Microsoft didn't include it in interface for context. I don't know how supported this method is, so you will use it on your own risk. 

First problem solved. Getting annotation was pretty easy task as Microsoft allowed us to use webApi in same manner as on form. Then some styling using w3.css library and soem testing locally. Everything works fine and opens in fullscreen. Now I was ready to deploy it to the system and check how it looks. So I packaged solution and imported it to the system. Then added it to control. Refreshed the form and check what we have there.

![Gallery Preview]({{site.baseurl}}/assets/img/2019-06-14-gallery-first-look.png)

On first look it looks good. But after I clicked on the image to view image in full size I found 2 issue. First of all it wasn't open in the full screen. It only takes the space of the body of the form. Second image that I used to show info icon doesn't load (image below). This issue I was able to solve, but the first one remain - for some reason my modal can take just the body space on the form and not the full screen. I tried again and again and eventually was able to do nothing with it. So, if anybody who reads this can tell me how to do it I will be very grateful.

![Info Image doesn't load]({{site.baseurl}}/assets/img/2019-06-14-broken-image.png)

Regarding the issue with image that was not loaded. Everything works fine when I tried to debug my code and run it locally. After some investigation I found solution on the MS article about one of their sample components. Solution was to use getResource function of resource object from context. Quote from MS: "getResource - Gets a CSS, HTML or img resource defined in the component manifest". It has 3 parameters - id of the resource, sucess callback and error callback. Result will be returned as base64 string. And when I tried to use it in debug mode it failed. It constantly returned to me undefined object. I spent a long time thinking what I was doing wrong. And guess what? I done everything correctly. For some reason it doesn't work localy. When I deployed my solution it works perfectly. So, I don't know is this a bug or what, but just be aware of it when you test your code localy. Gallery with correctly loaded image.

![Info Image loaded succesfully]({{site.baseurl}}/assets/img/2019-06-14-fixed-image.png)

You can check my final result in the video below.

{% include youtubePlayer.html id=page.youtubeId %}

That's it. Thank you for readying this post. Hope you find useful information for yourself and avoid my mistakes when you will build your own component.
Regarding my component - you can find it in my Github repository via this [link](https://github.com/OOlashyn/PCF-AttachmentGalleryControl). Work is still in progress as I hope that I will find a way to make it full screen. Also I have plans to rebuild UI and make it more friendly.

