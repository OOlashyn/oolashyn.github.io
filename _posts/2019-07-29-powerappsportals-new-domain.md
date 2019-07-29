---
layout: post
title:  PowerWheel Ep3 - Update your Dynamics 365 Portal domain
date:   2019-07-29 21:25:20 +0300
description: Simple instruction to update to the new PowerApps Portals domain
img: 2019-07-29-domain.jpg
image: /assets/img/2019-07-29-domain.jpg
tags: [D365, PowerWheel]
---

While playing with the new PowerApps portal this weekend I mentioned a thing that I missed earlier - PowerApps portal has a new domain.

## New PowerApps Portals domain

If you set up already a new PowerApps Portal for yourself you might notice change in the domain name - new one will look like this **uniquename.powerappsportals.com** instead of old **uniquename.microsoftcrmportals.com**. But did you know that you can update your existing Dynamics 365 Portal with a new domain?

Go to PowerApps Portal Admin Center > Portal Actions > Update to PowerApps Portals domain.

![Portal Admin]({{site.baseurl}}/assets/img/2019-07-29-portal-admin.jpg){: .center-image }

Update to PowerApps domain window will show up. Enter your website name in Portal URL and press OK button.

![Update Domain]({{site.baseurl}}/assets/img/2019-07-29-update-domain.jpg){: .center-image }

And that's it - you are now on the new PowerApps domain.

## Revert to an old domain

But what if you want to return from the new domain to the old one? Well fear nothing - Microsoft got you covered in this one as well. If you go to  Update to PowerApps Portals domain while using the new domain you will see an option to revert to Microsoft Dynamics 365 portals domain.

![Reset Old Domain]({{site.baseurl}}/assets/img/2019-07-29-old-domain-reset.jpg){: .center-image }

**Small note:** Update to PowerApps domain option in Portal Actions was available only for old Dynamics 365 Portal instance. When I created a new one for testing purpose it wasn't available.  

## Next episode theme

I hope you found this short article useful. Next time I will talk about the Azure.
