---
layout: post
title:  How to pass formContext and XRM to your html webresource
date:   2020-05-25 00:01:20 +0200
description:  Learn about suported way to pass formContext and XRM to your html webresource
excerpt: Learn about suported way to pass formContext and XRM to your html webresource
img: 2020-05-24-message.jpg
image: /assets/img/2020-05-24-message.jpg
tags: [D365]
---

Learn about suported way to pass formContext and XRM to your html webresource

## Introduction

Let's image that you created a simple HTML web resource that needs to do some work and then pass it back to the form. Previously to do so you would use parent.Xrm. However, the problem is that previous parent.Xrm and Xrm.Page is deprecated. But know you have supported way to do so - welcome **getContentWindow**.

This function will return you a promise that on success will contain [contentWindow](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow) property of your iframe that later can be used to pass some data back to iframe. Keep in mind that this instance is read-only, but its properties can be manipulated so you cannot use it to modify the internal content of iframe.

Call syntax will look like this:

{% capture code %}
// webResourceName - name of the webresource on the form
formContext.getControl(webResourceName).getContentWindow().then(successCallback, errorCallback);
{% endcapture %}
{% include code.html code=code lang="javascript" %}

## Usage example

Let's imagine that we have a simple HTML webresource that allow us to search pokemon by name and returns its height. Webresource contains one input for a pokemon name, button to search for pokemon and save button to save height back to the form.

First we need to create function that will be called from the form to set our XRM and formContext objects inside webresource:

{% capture code %}
// This function need to be added to your html webresource
function setClientApiContext(xrm, formContext){
    // You can set xrm and formContext to your variables or use them directly
    // Optionally set Xrm and formContext as global variables on the page.
    // globalThis is new way to access global this value
    // find more here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
    globalThis.Xrm = xrm;
    globalThis.formContext = formContext;
}{% endcapture %}
{% include code.html code=code lang="javascript" %}

Now we need to add function to our form on OnLoad event to pass the value of XRM and formContext. To do so we need to create a webresource with our function and associate script to a form. If you don't know how to do it check out [this tutorial](https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/walkthrough-write-your-first-client-script#objective) from Microsoft.

{% capture code %}
        // This should be added to the forms OnLoad event
        function passContextToWebResource(executionContext){
            // Name of the Web Resource on the form
            const webResourceName = "WebResource_PokeSearch";

            let formContext = executionContext.getFormContext();
            let webResouceControl = formContext.getControl(webResourceName);
            if (webResouceControl) {
                webResouceControl.getContentWindow()
                    .then((contentWindow) => {
                        //call our function to pass Xrm and formContext
                        contentWindow.setClientApiContext(Xrm, formContext);
                    });
            }
        }{% endcapture %}
{% include code.html code=code lang="javascript" %}

The result you can see below.

{% include video.html webm="2020-05-25-getcontentwindow.webm" mp4="2020-05-25-getcontentwindow.mp4" %}

Hope you will find this article useful.
