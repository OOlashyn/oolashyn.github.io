---
layout: post
title: Web Roles and Enhanced Data Model
date: 2023-11-12 21:45:20 -0500
description: Learn how to view and dynamically assign Web Roles in the Enhanced Data Model
excerpt: Web Roles are the core of the Power Pages security. They define who and how can access the data on our site. We are using them constantly. However, if you enabled the Enhanced Data Model you might notice that things are different - Related records missing associated Web Roles, and dynamically assigning web roles via adx relationship doesn't work anymore. Check my new blog to see what's going on with Web Roles in the new data model and how you can resolve both of the mentioned issues.
shortDescription: Having troubles finding Web Roles in the Enhanced Data Model? Or dynamically assigning them via adx relationship? In this post you will learn what's going on with Web Roles in the new data model and how you can resolve both of the mentioned issues.
img: 2023-11-12-cover.jpg
image: /assets/img/2023-11-12-cover-rss.jpg
tags: [PowerPlatform, PowerPages, PowerAutomate]
---

Web Roles are the core of the Power Pages security. They define who and how can access the data on our site. We are using them constantly. However, if you enabled the Enhanced Data Model you might notice that things are different: Related records missing associated Web Roles, and dynamically assigning web roles via adx relationship doesn't work anymore. In this article, I will show you what is going on with Web Roles in the new data model and how you can resolve both of the mentioned issues.

## How the Enhanced Data Model works

Enhanced Data Model doesn't have separate tables for many things. Instead, it uses a table called Site Components that holds everything (from Web Role, and Site Settings to Web Files). Then Microsoft uses plugins and some magic to present those records as separate tables via Virtual Tables. So the Web Role that you see for the Enhanced Data Model (table name mspp\_webrole) is actually just an abstraction on top of the Site Component table. Microsoft just presents it to use as separate tables in a familiar interface.

![Enhanced Data Model]({{site.baseurl}}/assets/img/2023-11-12-enhanced-data-model.png){: .center-image }

## How to find currently assigned roles

Previously, when you tried to find Web Roles assigned to a contact, you would go to the Related tab on the Portal Contact form and select Web Roles. However, if you do it now, it will show you the old adx\_webrole table. Unfortunately, you cannot show the virtual table in the Related section.

To view roles, currently assigned to a contact, open a contact using the **Portal Contact (Enhanced Form)** form, and navigate to the **General** tab > **Web Roles** section. There you will see a list of already assigned roles and can assign new ones as well.

![Web Roles on the Contact form]({{site.baseurl}}/assets/img/2023-11-12-portal-contact-form.jpg){: .center-image }

## How to dynamically assign roles

Previously, with the Standard Data Model, when you wanted to dynamically assign a web role, you would use, for example, Power Automate to associate the Contact table with the Web Role table via adx\_webrole\_contact relationship. But, with the Enhance Data Model, you need to use the Site Component table instead. On the Contact table, you have the Relationship called **powerpagecomponent\_mspp\_webrole\_contact** which links the Contact and Site Component table. Use that relationship and the odata id of the web role (**mspp\_webrole** one) to associate the table (you can get the Odata id if you get that web role via Get Row action or in the next format *https://ORGNAME.crm.dynamics.com/api/data/v9.1/mspp\_webroles(GUID)*.

![Associate web role dynamically]({{site.baseurl}}/assets/img/2023-11-12-associate-web-role.png){: .center-image }

## Conclusion

Enhanced Data Model is a big shift to make Power Pages more aligned with the usual ALM story for Power Platform, more performant and easier to update. And, although, from the surface, things might look the same, under the hood a lot has changed. This includes changes to the Web Roles and how we interact with them. In this article, you found how you can find current associated roles and how to dynamically assign new ones. Hope you find it useful.
