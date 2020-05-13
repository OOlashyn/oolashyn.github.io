---
layout: post
title:  Capture signature in PowerApps Portal
date:   2020-05-01 08:01:20 +0100
description:  Learn how you can capture and view signature in Power Apps Portal
excerpt: Learn how you can capture and view signature in Power Apps Portal
img: 2020-04-30-signature.jpg
image: /assets/img/2020-04-30-signature.jpg
tags: [Portal]
---
## Introduction

Ability to get customer signature without relying on printed documents is very important in our digital world. And in Dynamics 365 you were able to do so for quite some time with Pen Input component. However, it isn't possible to do so on the Power Apps Portal, at least with OOTB components. In this article, I will explain how you can easily add support for both capturing and viewing signatures in the Power Apps Portal. This tutorial will not show how to work with signature input inside Dynamics 365 itself. For that one, you can check out [this post](https://www.powerobjects.com/blog/2018/04/16/capturing-signatures-in-dynamics-365/) by PowerObjects. Below you can see the final result of this article.

{% include video.html webm="signature-pad.webm" mp4="signature-pad.mp4" %}

## Capture signature

First, let's start with the field that will hold our signature. It should be a field of Multiline Text type with Max length of at least 15000 characters. This is because the field will store the signature as a text representation of the image. I created this field on the Contact entity, named it Client Signature and put on both create and edit form.

Next, we need to select a library to actually capture signature in the web. There are a lot of different libraries you can choose from, but in this example, we will use the [Signature Pad](https://github.com/szimek/signature_pad) library. To add this library to our page we need to insert a script tag to our page (you can find it below).

{% capture code %}
<script src="https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js"></script>{% endcapture %}
{% include code.html code=code lang="html" %}

If you are using custom web template just add script tag at the end of your template. If you are using one of the pre-existing templates and don't want to change them you can add the script tag to the Page Copy part of the page (this will only work if you are using default MS templates or templates that include Page Copy as part of their template). To do so navigate to your web page, find Localized Content and open a web page for a language you need. There scroll to the Content section and in Copy (HTML) field switch to HTML view and add script tag.

After we added the library we need to add some JavaScript. What we will do is hide our signature field, add canvas and some buttons below it. You can find a code with explanations below. You can add this code to the template or to the Custom JavaScript field in the Advanced tab of the web page.

{% capture code %}
var signaturePad;

//helper function to properly size canvas
function resizeCanvas() {
    let canvas = document.getElementById("SignatureCanvas");
    let ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear(); // otherwise isEmpty() might return incorrect value
}

window.addEventListener("resize", resizeCanvas);

$( document ).ready(function() {
    // name of you signature text field
    let signatureTextFieldName = "dwc_clientsignature";
    // main container
    let signatureContainer = document.createElement("div");

    // container for action buttons
    let signatureActionButtons = document.createElement("div");

    // Clear signature button
    let clearBtn = document.createElement("button");
    clearBtn.innerText = "Clear";
    clearBtn.type = "button";
    clearBtn.addEventListener("click", () => {
        signaturePad.clear();
        $("#"+signatureTextFieldName).val();
    }); 

    // Undo last action
    let undoBtn = document.createElement("button");
    undoBtn.innerText = "Undo";
    undoBtn.type = "button";
    undoBtn.addEventListener("click", () => {
        let data = signaturePad.toData();

        if (data) {
          data.pop(); // remove the last dot or line
          signaturePad.fromData(data);
          $("#"+signatureTextFieldName).val(signaturePad.toDataURL());
        }
    }); 

    signatureActionButtons.appendChild(undoBtn);
    signatureActionButtons.appendChild(clearBtn);

    let canvas = document.createElement("canvas");
    canvas.id = "SignatureCanvas";
    canvas.style.width = "100%";
    canvas.style.border = "1px solid";

    signatureContainer.appendChild(canvas);
    signatureContainer.appendChild(signatureActionButtons);

    // Get div wrapper of text signature field
    let wrapperTextSignature = $("#"+signatureTextFieldName).parent();
    // Insert our signature container after original wrapper field
    $(signatureContainer).insertAfter(wrapperTextSignature);
    // Hide original field
    wrapperTextSignature.hide();
    
    // Initialize Signature Pad
    signaturePad = new SignaturePad(canvas, {
        //save signature every time the user ends stroke
        onEnd: () => $("#"+signatureTextFieldName).val(signaturePad.toDataURL())
    });

    resizeCanvas();
});{% endcapture %}
{% include code.html code=code lang="javascript" %}

## View signature

Now when we have a code to capture signature we need to have something to show it on an edit form (in a read-only format).

What we will do is add JavaScript code that will hide the original text field and place image tag below it to show the signature. You can find the code below. You can add this code to the template or to the Custom JavaScript field in the Advanced tab of the web page.

{% capture code %}
$( document ).ready(function() {
    let fieldName = "dwc_clientsignature";

    //create an image to show signature
    let img = document.createElement("img");
    img.id = "SignatureImage";
    img.style.width = "100%";
    img.style.border = "1px solid";
    img.src = $("#"+fieldName).val();

    //replace text signature field with an image
    let wrapperTextSignature = $("#"+fieldName).parent();
    $(img).insertAfter(wrapperTextSignature);
    wrapperTextSignature.hide();
});{% endcapture %}
{% include code.html code=code lang="javascript" %}

## Conclusion

In this article I described an easy way to capture and show signature on Power Apps Portal using Singanture Pad library. Hope you will find this article useful.
