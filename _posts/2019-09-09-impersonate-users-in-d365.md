---
layout: post
title:  Impersonate users in D365
date:   2019-09-09 23:25:20 +0300
description: Learn how to easily impersonate usersin D365 for improved debugging and testing
img: 2019-09-09-microscope.jpg
image: /assets/img/2019-09-09-microscope.jpg
tags: [D365]
---
One of the features that we always wanted was to be able to impersonate some user to troubleshoot their issue much easier. And you know what? There is a way.

[ModHeader][modheader] extension for Chrome is an answer. It allows you to modify request and response headers on a page. Knowing that and the name of correct request header we are able to impersonate a user. The only limitation - this will work only in new UI (one more reason to switch from the legacy one if you didn't do it already). The header that we need to modify is **MSCRMCallerId**. As a value for this header, we need to provide Id of the user that we want to impersonate.

Let's see how it work in a real example. On the screenshot below you can see that I am signed in as my user and ModHeader extension is off.

![Default User]({{site.baseurl}}/assets/img/2019-09-09-default-user.jpg){: .center-image }

I want to impersonate user, let's say CRM Test user. I know his id. So I run ModHeader extension (or to be more precise unpause it). Then put Id of the user as the value of the request header.

![ModHeader]({{site.baseurl}}/assets/img/2019-09-09-modheader-crm-test.jpg){: .center-image }

Then I refresh the page and hurray - as you can see I am now CRM Test user. I have all of his permissions and security roles and can perform all actions needed for troubleshooting.

![CRM Test User]({{site.baseurl}}/assets/img/2019-09-09-crm-test-user.jpg){: .center-image }

After I finish I need to pause ModHeader and refresh the page to get back to my user.

This tool really improved our troubleshooting and also improved testing (you can save a couple of profile and switch between them). I hope it will help you as well.

[modheader]: https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj
