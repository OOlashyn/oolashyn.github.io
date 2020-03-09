---
layout: post
title:  Claims mapping for OpenID Connect on a Power Apps Portal
date:   2020-03-08 18:01:20 +0100
description:  Learn how you can configure claims mapping with OpenID Connect provider on a Power Apps Portal
excerpt: Learn how you can configure claims mapping with OpenID Connect provider on a Power Apps Portal
img: 2020-03-02-lock.jpg
image: /assets/img/2020-03-02-lock.jpg
tags: [Portal]
---
## Introduction

There are two main ways to authenticate on a Power Apps Portal - with a local or external provider. When using the external provider you can choose from a set of prebuild providers like Facebook, Google, Twitter etc or configure your providers like Azure AD B2C, OpenID Connect or  OAuth 2.0. When users sign in, for the first time or any next one, the identity provider will provide claims based with some info about the user that is signing in. These claims are configurable in the identity provider side. You can use those claims to support different scenarios. In this article, you will learn how to configure claims mapping using the OpenID Connect provider.

## OpenID Connect

In this article, I will not explain how you can configure the OpenID Connect provider in the Power Apps Portal. To do so please refer to [official doc](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-openid-settings).

If you check the documentation for OpenID Connect there are no words about claims mapping and settings that you can use with them. However, there is a section like this in Azure AD B2C [documentation](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/azure-ad-b2c). The settings provided there will that contain OpendIdConnect in their name or open placeholder will work both for Azure AD B2c and OpenID Connect.

## Registration process

Let's start with the registration process. To support it next setting exists

**Authentication/OpenIdConnect/[Federation-Name]/RegistrationClaimsMapping**

As the value of this setting, you need to provide a comma-separated list of **attribute=claim** pairs, where **attribute** is a field on a contact entity and **claim** is a claim from the token. The only required claim that you need to provide is a claim that will be mapped to the primary email field (emailaddress1).

For example, let's say we have a token that contains:

* email (claim: email),
* first name (claim: firstName),
* last name (claim: lastName)
* additional info field (claim: addInfo).

And in CDS on a contact entity, we have

* email (attribute: emailaddress1),
* first name (attribute: firstname),
* last name (attribute: lastname),
* special info field (attribute: dwc_specialinfo).

Then the value of the setting will look like this: **emailaddress1=email,firstname=firstName,lastname=lastName,dwc_specialinfo=addInfo**.

## Issue with existing contacts

When you create a Portal on the system with a lot of contacts you might encounter an issue while trying to sign in contact that already exists in the system. To avoid that usually, you need to use invitation and invitation codes. This will allow the system to connect using that is trying to sign in with correct acount. However, when you using external authentication it might not be possible. Well, there is a solution - site setting called

**Authentication/[Protocol]/[Provider]/AllowContactMappingWithEmail**

As per official doc:

>Specifies whether contacts are mapped to a corresponding email. When set to true, this setting associates a unique contact record with a matching email address, and then automatically assigns the external identity provider to the contact after the user has successfully signed in. By default, it is set to false.

But this option might not be enough by itself. To make sure that the sign-in process will be correct we need to have one additional setting

**Authentication/UserManager/UserValidator/RequireUniqueEmail**

It verifies if a unique email address is necessary for validating a user. By default, it is set to true. But if we want the previous setting to work properly we need to set it to false (if leave as is it might cause issues during authentication - check [official doc](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/azure-ad-b2c#allow-auto-association-to-a-contact-record-based-on-email)).

## Login

Next setting will help us with login scenario

**Authentication/OpenIdConnect/[Federation-Name]/LoginClaimsMapping** 

Again, as the value of this setting, you need to provide a similar list of **attribute=claim** pairs. According to MS, this list should be equal or a subset of the previous list. When the person will log in into system those claims will be used for updating information on contact.

## Conclusion

In this article, I described site settings that you can use to configure claims mapping for OpenID Connect provider. Hope you find this article useful.
