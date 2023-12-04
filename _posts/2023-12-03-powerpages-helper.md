---
layout: post
title: Power Pages Helper
date: 2023-12-03 21:45:20 -0500
description: Learn about version 1.4.0 of my Power Pages Helper extension
excerpt: All things evolve and change. Especially, Microsoft's product naming. Power Apps Portal became Power Pages. So, my Visual Studio Code extension should evolve as well. Goodbye Power Apps Portal Helper, welcome Power Pages Helper. Beyond just the name change, the latest version packs a lot of new features like support for Enhance Data Model, per workspace settings and much more. Check out my latest article to learn more.
shortDescription: Latest release of my Power Pages Helper extension brings not only a new name, but also a bunch of new advanced settings and improvements. Check out this post to learn more.
img: 2023-12-03-cover.jpg
image: /assets/img/2023-12-03-cover-rss.jpg
tags: [PowerPlatform, PowerPages]
---

All things evolve and change. Especially, Microsoft's product naming. Power Apps Portal became Power Pages. So, my Visual Studio Code extension should evolve as well. Goodbye Power Apps Portal Helper, welcome Power Pages Helper. Beyond just the name change, the latest version packs a lot of new features like support for Enhance Data Model, per workspace settings and much more. Let's dive into what the latest release brings to the table.

## Enhanced Data Model support

Enhanced Data Model recently went GA and brought a lot of changes with it. If you tried to download the site via PAC CLI you might encounter an error saying that a website with a specific id wasn't found. And this is because to download an EDM site you need to specify to the CLI that this is an EDM site. To do so you need to pass the modelVersion 2 parameter to the request so it looks like this

{% capture code %}
pac powerpages download --path "C:\portals" --webSiteId "site-id" --modelVersion 2
{% endcapture %}
{% include code.html code=code lang="powershell" %}

With the latest version of Power Pages Helper, you can now select modelVersion when using **Download Portal** command.

You also have a new advanced setting to specify the version for the Download Latest command, so when you are using a shortcut it will add the correct model version automatically (see below for the full list of advanced settings).

## Migrate to Bootstrap 5

Added support for Migrate to Bootstrap 5 command that allows you to convert an existing portal to Bootstrap 5 (this action will create a new folder with the updated portal).

## Advanced Settings

### Settings in VS Code

Settings in VS Code have 2 scopes:

- **User Settings** - Settings that apply globally to any instance of VS Code you open.
- **Workspace Settings** - Settings are stored inside your workspace and only apply when the workspace is opened.

This allows you to create specific configurations for different projects. For example: if you have one standard portal and one enhanced data model portal you can configure them to use different sets of settings by specifying different Workspace settings.

### How to find and configure settings

To get to the settings go to **File > Preferences > Settings** and search for Power Pages Helper.

There you will see 5 different settings: 3 related to the Download Latest command and 2 related to the Download Portal command.

![List of Available setings]({{site.baseurl}}/assets/img/2023-12-03-settings-list.jpg){: .center-image }

### Download Latest settings

The **Exclude Entities** setting allows you to provide the list of entities' logical names to exclude during the site download using Download Latest command.

The **Include Entities** setting allows you to provide the list of entities' logical names to include during the site download using Download Latest command.

The **Model Version** setting allows you to specify the version of the model to download (1 or 2, where 1 - standard and 2 - enhanced) when using Download Latest command. If not specified, the version 1 will be used by default.

### Download Portal settings

**Skip Excluded Entities** settings allow you to skip the Excluded Entities step during the Download Portal command execution.

**Skip Included Entities** settings allow you to skip the Included Entities step during the Download Portal command execution.

## Miscellaneous

Switched to using the powerpages command instead of the paportal command, as per recommendation from Microsoft.

## Conclusion

I will keep evolving Power Pages Helper as I am constantly using it in my projects. If you haven't downloaded this extension already - give it a try to see how it can enhance your developer experience. And if you have any feedback - feel free to hop to the [Discussion section](https://github.com/OOlashyn/portal-helper-vscode/discussions) of the repository or open an [Issue](https://github.com/OOlashyn/portal-helper-vscode/issues). I would like this extension to be useful for all Power Pages developers, so your feedback matters.