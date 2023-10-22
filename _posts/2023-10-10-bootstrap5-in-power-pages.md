---
layout: post
title: Bootstrap 5 migration
date: 2023-10-11 20:45:20 -0500
description: Learn how to migrate your Power Pages site to Bootstrap 5
excerpt: Bootstrap 5 - one of the most requested features for Power Pages - is finally here. In this post you will learn how to migrate your Power Pages site to Bootstrap 5 and what issues and gotchas you need to be aware about.
img: 2023-01-25-bootstrap5.png
image: /assets/img/2023-01-25-bootstrap5.png
tags: [PowerPlatform, PowerPages]
---

Bootstrap 5 is finally here. One of the most requested features for a very long time is available for us. So let's see what it can do.

Before we begin I would like to highlight that currently, this feature is in Preview status meaning it is not suitable for production. Although the GA date is set for November of this year I would advise to really test it out before moving to production.

## **How to migrate**

First, we need to enable Bootstrap 5 for our environment. To do so go to Power Platform Admin Center, select an environment that you need, and in the Resources tab select Power Pages sites, then in the header select Enable Bootstrap v5 for new sites (preview).

![Bootstrap 5 switch in Admin Center]({{site.baseurl}}/assets/img/2023-10-11-enable-bootstrap5.jpg){: .center-image }

Next, we would need to use PAC CLI to convert our site to use Bootstrap 5. Microsoft will not automatically convert your existing website to keep backward compatibility. Instead, they provide a new command **pac powerpages bootstrap-migrate** to migrate your site.

Connect to the environment you want via PAC CLI (either via auth command or through Power Platform Tools extension). Download your website via the **pac powerpages download** command. Then run **pac powerpages bootstrap-migrate -p "path-to-your-folder"**. You can also use my [Power Pages Helper extension](https://marketplace.visualstudio.com/items?itemName=oleksandr-olashyn.portal-helper-vscode) to invoke this command. 

Bootstrap-migrate will create a new folder with the Bootstrap 5 version of your site. In the folder,beside the updated portal, you will find a logs.txt document which will highlight which files were changed by the migration tool. This is useful for troubleshooting, validation and general knowledge purposes. For example, I have a template called bootstrap3-test that uses a Bootstrap 3 carousel for images. After migration in logs.txt, I can find a detailed description of which classes were removed or replaced with their Bootstrap 5 alternatives.

![Migration logs file]({{site.baseurl}}/assets/img/2023-10-11-logsfile.jpg){: .center-image }

Also in the Site Settings file, you can find a new setting called Site/BootstrapV5Enabled which says site to use Bootstrap 5.

![Migration logs file]({{site.baseurl}}/assets/img/2023-10-11-bootstrap5-setting.jpg){: .center-image }

After migration we just need to upload the updated version back to the system using the **pac powerpages upload** command and enjoy new styles.

## Version comparison

***Main Page and Navigation Menu Bootstrap 3***

![Main Page and Navigation Menu Bootstrap 3]({{site.baseurl}}/assets/img/2023-10-11-main-nav-bv3.jpg){: .center-image }

***Main Page and Navigation Menu Bootstrap 5***

![Main Page and Navigation Menu Bootstrap 5]({{site.baseurl}}/assets/img/2023-10-11-main-nav-bv5.jpg){: .center-image }

As you can see after migration navigation looks more condensed and paddings around links are completely different. Also, the logo and company name are shifted to the right.

***Contact Us form Bootstrap 3***

![Contact Us form Bootstrap 3]({{site.baseurl}}/assets/img/2023-10-11-form-bv3.jpg){: .center-image }

***Contact Us form Bootstrap 5***

![Contact Us form Bootstrap 5]({{site.baseurl}}/assets/img/2023-10-11-form-bv5.jpg){: .center-image }

Form controls look almost the same, but in the Bootstrap 5 version, they are more rounded by default.

As you can see not everything went smoothly - the navigation menu after migration requires additional CSS styling to look good. So be careful and make sure you inspect all pages as your styling might break in unexpected places.

## Other changes

Beyond Bootstrap 5 Microsoft also updated icons to use Font Awesome 6 - so you can enjoy a bigger selection of icons, styles and improved performance.

## Conclusion

Bootstrap 5 was long awaited update for Power Pages. This change will allow us to create more complex and modern-looking websites. However, the transition isn't smooth and will require effort to ensure that migrated styles work as well as the originals.