---
layout: post
title: Partial portal download with Portal CLI
date: 2022-08-21 22:31:20 -0400
description: Learn how to download only portal entities that you need with new PAC CLI update
excerpt: Learn how to download only portal entities that you need with new PAC CLI update
img: 2022-08-20-cover.jpg
image: /assets/img/2022-08-20-cover.jpg
tags: [Portal]
---

Recently, Microsoft announced the release of the new update for their Power Platform CLI, which included a lot of interesting improvements and additions. And there was a quiet one for portals as well - new parameters for download command.

## Download command

Before this release, when you downloaded the portal it was always all of it with all tables and files. Generally, this is not a huge problem and loading time is in the range of 30+ seconds. However, I saw projects, especially with older portals, with huge amounts of web files and pages where loading times were outrageous (the worst one downloaded portal in 5 min). And there was no way to solve this. But not anymore. Welcome release 1.17.5 and new optional parameters for download command - **includeEntities** and **excludeEntities**.

![Download Command with new parameters]({{site.baseurl}}/assets/img/2022-08-21-new-download-parameters.jpg){: .center-image }

For both of these parameters, you need to specify a list of comma-separated entity logical names. Include entities will define which entities the portal should download and will skip all others. Exclude entities will define which entities to omit during the download.

The example command will look something like this:

{% capture code %}
pac paportal download -p "c:\demo" -id guid -ie "adx_entityform,adx_webpage,adx_webtemplate"
{% endcapture %}
{% include code.html code=code lang="javascript" %}

The addition of those parameters makes using CLI much more effective, especially in edge case scenarios where portals are just too big to deal with them effectively. Also, if working in branches, it opens the door for the possibility of just loading entities that you will be working on (like content snippets, templates etc).

But what if you don't want to memorize the entity's logical name? Or don't want to mistype them? Well, the new update for my Portal VS Code extension might help you with that.

## Portal helper to the rescue

[Portal Helper](https://marketplace.visualstudio.com/items?itemName=oleksandr-olashyn.portal-helper-vscode) is an extension that I developed to help users to work with Portal CLI more efficiently. With this update, I am adding two new things.

Firstly, the Download command now supports both include and exclude entity parameters. More importantly, instead of the free text option, it is a selection of all available entities, by their friendly name, so you don't need to remember logical names and can just select them from the list.

{% include video.html mp4="2022-08-21-portal-helper-v1-3.mp4" %}

Secondly, my Download Latest command, which downloads the portal from the current folder, now supports setting include and exclude parameters in the VS Code settings. You can do this both on a global level or on a workspace level (meaning you can have different configurations for different portals).

To set those setting navigate to Settings and type Portal Helper. You will see two options available to you.

![VS Code settings for Portal Helper]({{site.baseurl}}/assets/img/2022-08-21-portal-helper-vscode-settings.jpg){: .center-image }

## Conclusion

I am really happy that MS continues to develop the portal part of MS Power Platform CLI allowing us to do much more. With each release, it becomes easier and more convenient to work inside VS Code. And I will continue to improve my extension to make VS Code experience even better.