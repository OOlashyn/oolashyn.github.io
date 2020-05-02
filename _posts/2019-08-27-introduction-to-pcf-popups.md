---
layout: post
title:  Introduction to PCF Popups
date:   2019-08-27 20:25:20 +0300
description: How to use Popup in PowerApps Component Framework
img: 2019-08-27-firework.jpg
image: /assets/img/2019-08-27-firework.jpg
tags: [D365, PCF]
---

I like what PowerApps Component Framework allows you to do - possibility is almost limitless. However, as it is in preview not all features are documented or have a proper example. In this article, you will find an example of how to work with Popup possibilities of PCF.

## Working with Popup

Popup is a very useful feature - it allows you to manipulate with modal window easily. Let's see how it can be done with PCF.

First of all, you need to retrieve PopupService. It allows you to manage your popups. To retrieve you can use **getPopupService** method from context.factory (see code below).

{% capture code %}this._popUpService = context.factory.getPopupService();{% endcapture %}
{% include code.html code=code lang="javascript" %}

Now we can use the **createPopup** method from PopupSerice to create a new popup. As a parameter, we need to pass Popup object to it (you can find interface for it here - **ComponentFramework.FactoryApi.Popup.Popup**). We will need several options from it:

* **closeOnOutsideClick** - a boolean property that indicates whether popup close on an outside mouse click;
* **content** - html content of the popup;
* **name** - unique name of the popup;
* **type** - can be one of two options: 1 - if Root popup, 2 if Nested.

Looks pretty clear right? Well unfortunately if you try to use object just with these parameters for creating popup it will fail with **"Cannot read property 'display' of undefined"** error. After some investigation I found an answer in PowerApps forum - one of the PowerApps team replied that we need to use **popupStyle** property inside Popup object and it should be an empty object. Because PCF is still in preview, not all features are documented and they will add it soon as possible. However, if you just try to add a popupStyle property to your Popup object you will get an error because in Popup interface definition there is no popupStyle property. To fix this let's create our own interface that will extend the existing one with this property:

{% capture code %}
interface PopupDev extends ComponentFramework.FactoryApi.Popup.Popup {
    popupStyle: object;
}{% endcapture %}
{% include code.html code=code lang="typescript" %}

Great. Now we can use our own PopupDev interface instead of default Popup one.

Now when we know how to create popup let's build a simple control with a button that will open our popup.

Our control will have two private members: *_container* - html div element that will contain our control and *_popUpService* - which will hold our PopUpService.

{% capture code %}
private _container: HTMLDivElement;
private _popUpService: ComponentFramework.FactoryApi.Popup.PopupService;{% endcapture %}
{% include code.html code=code lang="typescript" %}

In the init method create a div element which will be our container:

{% capture code %}this._container = document.createElement('div');{% endcapture %}
{% include code.html code=code lang="typescript" %}

Then create a button to show our popup:

{% capture code %}
let popUpButton = document.createElement('button');
popUpButton.innerHTML = "Show Popup";
popUpButton.onclick = () => this.buttonClick();

this._container.appendChild(popUpButton);{% endcapture %}
{% include code.html code=code lang="typescript" %}

We will define buttonClick later - all it will do is open our popup.

Now let's create popup content itself - in this example, it will be a simple 'Hello World!' text inside of the small div with white background.

{% capture code %}
let popUpContent = document.createElement('div');
popUpContent.innerHTML = 'Hello World!';
popUpContent.style.width = "200px";
popUpContent.style.height = "200px";
popUpContent.style.backgroundColor = "white";{% endcapture %}
{% include code.html code=code lang="typescript" %}

Next, we need to define our Popup object.

{% capture code %}
let popUpOptions: PopupDev = {
    closeOnOutsideClick: true,
    content: popUpContent,
    name: 'dwcPopup', // unique popup name
    type: 1, // Root popup
    popupStyle: {}
};{% endcapture %}
{% include code.html code=code lang="typescript" %}

PopupDev is an interface that we defined earlier.

After we define Popup object we need to get PopupService and create Popup itself.

{% capture code %}
this._popUpService = context.factory.getPopupService();
this._popUpService.createPopup(popUpOptions);{% endcapture %}
{% include code.html code=code lang="typescript" %}

Great. The final line in our init method will be adding our _container to PCF container.

{% capture code %}container.appendChild(this._container);{% endcapture %}
{% include code.html code=code lang="typescript" %}

Now let's write our buttonClick function.

{% capture code %}
private buttonClick(){
    this._popUpService.openPopup('dwcPopup');
}{% endcapture %}
{% include code.html code=code lang="typescript" %}

Done. Now you can run your code and test that popup is working as expected (see demo below).

![Sample Popup]({{site.baseurl}}/assets/videos/popup-demo.gif){: .center-gif }

You can find full code in my [Sample PCF Popup][popup-repo] repository on GitHub.

[popup-repo]: https://github.com/OOlashyn/PCF-SamplePopup
