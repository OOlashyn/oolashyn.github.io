---
layout: post
title: Power Apps Portal Helper
date: 2021-05-03 07:01:20 +0100
description: My first VS Code extension - Power Apps Portal Helper to simplify working with Power Apps CLI for Portals
excerpt: My first VS Code extension - Power Apps Portal Helper to simplify working with Power Apps CLI for Portals
img: 2021-05-02-cover.jpg
image: /assets/img/2021-05-02-cover.jpg
tags: [Portal]
---

A couple of days ago Microsoft updated their Microsoft Power Apps CLI library to allow developer work with Power Apps Portals easily, by allowing to use commands to download and work with data locally in our favourite IDE of choice (see video [here](https://youtu.be/_EtE-DObJmA)). Inspired by [Danish Naglekar](https://powermaverick.dev/) and his awesome [PCF Builder](https://marketplace.visualstudio.com/items?itemName=danish-naglekar.pcf-builder) I decided to create something similar, but for Portals - welcome my first VS Code extension Power Apps Portal Helper. Now you don't need to remember commands and arguments for them to more easily work with CLI. You can download an extension from [here](https://marketplace.visualstudio.com/items?itemName=oleksandr-olashyn.portal-helper-vscode) or directly from your VS Code. You can find usage examples below.

## List of all available commands

| Command | Description |
| ------- | ----------------- |
| List Portals | Shows the list of available portals for current Dataverse organization |
| Download Portal | Download portal by id from current Dataverse org to specified local path |
| Upload Portal | Upload portal from local folder to current Dataverse org |
| Upload Current Portal | Upload portal from open workspace folder to current Dataverse org |
| Create New Auth Profile | Creates a new auth profile for specified Dataverse org |
| List Auth Profiles | Shows list of profiles that are authenticated with Dataverse orgs for current machine. |
| Delete Auth Profile | Deletes a specific profile from the current machine |
| Switch Auth Profile | Changes the default profile connected to Dataverse org |

## Usage examples

1. List Portals

    ![List-Portals](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/list-portals.gif?raw=true)

2. Upload Portal

    ![Upload-Portal](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/upload-portal.gif?raw=true)

3. Upload Current Portal

    ![Upload-Current-Portal](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/upload-current-portal.gif?raw=true)

4. Download Portal

    ![Download-Portal](https://github.com/OOlashyn/portal-helper-vscode/blob/master/assets/download-portal.gif?raw=true)
