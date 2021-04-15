---
layout: post
title:  List of little known PowerApps Portal Site Settings and Content Snippets
date:   2020-11-18 23:01:20 +0200
description: List of little known and hidden Content Snippets and Site Settings for Power Apps Portals
excerpt: List of little known and hidden Content Snippets and Site Settings for Power Apps Portals
img: 2020-11-18-cover.jpg
image: /assets/img/2020-11-18-cover.jpg
tags: [Portal]
---

## Introduction

[Site Settings](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-site-settings) and [Content Snippets](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/customize-content-snippets) are good friends of Portal developers. They allow to configure and reuse a lot of different functionality. However, there is a lot of useful settings and snippets that aren't described in the documentation. Because Portal has a long history some of the settings & snippets that are available in different articles doesn't work anymore. That's why I decided to create a list of working, useful and less known setting and snippets that can be easily updated and maintained by different users. Do you know an interesting and useful setting/snippet? Contribute to the list and help other developers!

You can find a full list in [this Github Repository](https://github.com/OOlashyn/PowerAppsPortalSiteSettingsAndSnippets).

Below you can find a few examples from the list:

### Site Settings

- **Portal/Lookup/Modal/Grid/PageSize** - controls page size for lookup modal grids (Default: "10")

### Content Snippets

- **Head/Bottom** - allows to add content to the end of the head tag (useful for setting metadata, etc)
- **Portal/Lookup/Modal/Grid/Search/PlaceholderText** - text for lookup modal search placeholder (Default: "Search"). Applies to all lookup modals
- **Portal/Lookup/Modal/Grid/Search/TooltipText** - text for lookup modal search tooltip (Default: "To search on partial text, use the asterisk (*) wildcard character"). Applies to all lookup modals
