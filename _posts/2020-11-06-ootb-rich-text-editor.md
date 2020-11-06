---
layout: post
title:  OOTB Rich Text Editor - more than catches the eye
date:   2020-11-06 00:01:20 +0200
description: As part of Release Wave 2, Microsoft shipped out of the box rich text control with embedding image support. And while trying it out I found more than I expected.
excerpt: As part of Release Wave 2, Microsoft shipped out of the box rich text control with embedding image support. And while trying it out I found more than I expected.
img: 2020-11-06-cover.jpg
image: /assets/img/2020-11-06-cover.jpg
tags: [D365]
---

## Introduction

As part of Release Wave 2, Microsoft shipped out of the box rich text control with embedding image support (more details [here](https://docs.microsoft.com/en-us/dynamics365-release-plan/2020wave2/service/dynamics365-customer-service/rich-text-control-embedded-images)). And while trying it out I found more than I expected.

![Editor Overview]({{site.baseurl}}/assets/img/2020-11-06-editor-overview.jpg){: .center-image }

## Under the hood

Let's start with the control itself. Proper rich text control was requested for a long time and it was one of the few custom PCF controls built as soon as PCF became a thing. If we inspect the page closer we can see that MS used CKE editor for their component.

![CKE Editor ]({{site.baseurl}}/assets/img/2020-11-06-cke-editor.jpg){: .center-image }

## Fantastic pictures and where to find them

Now let's move to the interesting part - adding pictures. I was really curious how Microsoft enable storing images or to be more precise where do they store them? Usually, attachments in CDS are stored as notes or as a "new" file fields. But to do the same thing with OOTB control would be impossible - what if someone would like to use it on the entity that doesn't have notes enabled? Also storing multiple files in one file field is not possible. And the solution used by MS was unexpected - use a new entity called Rich Text Attachment (**msdyn_richtextfile**).

If we inspect control with added images we can see that each image stored under separate **msdyn_richtextfile** record. Editor queries one field from that entity called Image Blob (**msdyn_imageblob**).

![OOTB editor ]({{site.baseurl}}/assets/img/2020-11-06-ootb-editor-code.jpg){: .center-image }

If we open Maker Portal and take a look into that field we can see that Image Blob is an Image field and also marked as a Primary Image field.

![Rich Text Entity]({{site.baseurl}}/assets/img/2020-11-06-rich-text-entity.jpg){: .center-image }

If you don't know what is Image field you can find more [here](https://docs.microsoft.com/en-us/powerapps/maker/common-data-service/types-of-fields#image-fields). Below is a small definition of this field type from Microsoft:

>Use image fields to display a single image per record in the application. Each entity can have one image field. You can add an image field to custom entities but not to standard entities. Some standard entities have image fields defined.

Maximum size for this field is 10 Mb but you cannot add a file bigger than 5Mb via the editor.

![Error message]({{site.baseurl}}/assets/img/2020-11-06-error-message.jpg){: .center-image }

## Conclusion

To be able to release OOTB rich text control MS created a new entity called Rich Text Attachment which is used to store images added to the component.
