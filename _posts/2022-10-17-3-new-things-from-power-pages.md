---
layout: post
title: 3 new things from Power Pages that you might have missed
date: 2022-10-17 22:05:20 -0400
description: Learn about 3 new things in Power Pages that you might have missed
excerpt: Learn about 3 new things in Power Pages that you might have missed
img: 2022-07-05-cover.jpg
image: /assets/img/2022-07-05-cover.jpg
tags: [Portal, PowerPages]
---

So it happened - Power Apps Portal no more! Long live Power Pages! With the official announcement of Power Pages GA, there is a lot of interesting new stuff - seamless transition from Portals to Pages, new templates, better editor (with support for ~~Advance~~ Multistep forms), refined licensing (Pay-as-you-go is now a thing), security and performance improvements, etc. There are so many new things and you can learn more about them in [the official post](https://powerpages.microsoft.com/en-us/blog/microsoft-power-pages-is-now-generally-available/) from MS or in [this awesome article](https://readyxrm.blog/2022/10/12/power-apps-portals-is-now-power-pages/) from Nick Doelmann.

However, some things are getting lost in this big announcement. That's why I decided to write about 3 new, awesome and maybe a bit overlooked features:

- Content Delivery Network or CDN
- Web Application Firewall
- Content Security Policy

## CDN

![CDN image]({{site.baseurl}}/assets/img/2022-10-17-cdn.jpg){: .center-image }

So what is a CDN? Well in short a content delivery network is just a group of servers that are located in different geographical locations that deliver Internet content (CSS and js files, images and videos, and other static content) to a user faster by serving a cached version of the content from locations that are physically closer to the user, which reduces latency and improves overall website performance.

CDN is a really popular way to improve your website performance. Here are some statistics about CDN usage:

- A CDN can also decrease website latency by an average of 83%.
- Using a CDN can take a load of 60% or more off your origin server.
- Using CDN can boost a website's SEO score.

Having said that, enabling CDN might not boost performance significantly for every website. For example, CDN for Power Pages doesn't serve files that are under the pages that are protected by Web Page Access Control rules for security reasons. This means if you have a website with a lot of private content your performance might not be boosted as much as a website that has a lot of public-facing images, videos etc.

Overall, I would say you should definitely enable CDN for Power Pages as any performance improvement and latency reduction is a positive thing for your user. Plus you don't need to pay for this feature, which is a great competitive advantage over other similar services.

You can find more about how to enable CDN in the official documentation [here](https://learn.microsoft.com/en-us/power-apps/maker/portals/configure/configure-cdn).

## Web Application Firewall

![Web Application Firewall]({{site.baseurl}}/assets/img/2022-10-17-wall.jpg){: .center-image }

The next awesome feature for Power Pages is the Web Application Firewall. In short, WAF help to protect your website by monitoring and filtering HTTP traffic between your website and the Internet. You can imagine it as a set of rules that find and blocks common malicious attacks.

Web Application Firewall for Power Pages is powered by the same technology as a CDN for Power Pages - by Azure Front Door - which in itself is a Microsoft CDN system.

{% capture importantText %}
To be able to use WAF you need to enable CDN first.
{% endcapture %}
{% include important-block.html importantText=importantText %}

Currently, WAF for Power Pages protects you against the next type of attacks:

- Cross-site scripting
- Local file inclusion
- Remote file inclusion
- Session fixation
- Protocol attackers
- Protocol enforcement

Unfortunately, as of now, you cannot configure the set of rules that are available for WAF, but even the initial set is covering the most common scenarios.

Overall, it is an awesome addition, that allows users to improve the security of the Power Pages without the need to understand how exactly WAF works and reduce implementation overhead. And the fact that you can enable this in one click is just the cherry on top. You can find more about how to enable WAF in the official documentation [here](https://learn.microsoft.com/en-us/power-pages/security/web-application-firewall).

However, if you do need to have more extended security and CDN capabilities you can always configure the core technology itself - Azure Front Door and connect it to your Power Page. To find out how to do that check [this official documentation](https://learn.microsoft.com/en-us/power-apps/maker/portals/azure-front-door).

## Content Security Policy

![Content Security Policy]({{site.baseurl}}/assets/img/2022-10-17-key.jpg){: .center-image }

Last in this article, but certainly not on the list overall is Content Security Policy or CSP. It is another great addition to the Power Pages security.

Content Security Policy allows you to specify a set of directives or rules, that help to control which resources (ie script files, CSS files etc) your website can load and from which sources. This helps to mitigate some common attacks like the distribution of malware or data theft.

If you were working with Power Apps Portal for a while you might say that CSP was part of the platform for a while. Indeed, now, the same as before, you need to configure HTTP/Content-Security-Policy site setting to make it work. However, previously this setting was hidden inside the documentation, often obscured and unexplained for regular users. Now, however, we finally have a clear reference on how and why you should use it in the platform.

You can find more about how to enable CSP in the official documentation [here](https://learn.microsoft.com/en-us/power-apps/maker/portals/configure/manage-content-security-policy).

## Conclusion

Power Pages is an awesome evolution of an existing product that brings a lot of new and awesome features to the table. I really like, that with the platform growth it offers more in terms of security and performance, which will help it to stand up against the competition.

