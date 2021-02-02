---
layout: post
title:  Using WebApi example - spreadsheet
date:   2020-09-24 20:01:20 +0200
description: Example of webapi usage - create Excel like experience on the Portal
excerpt: Example of webapi usage - create Excel like experience on the Portal
img: 2020-09-24-cover.jpg
image: /assets/img/2020-09-24-cover.jpg
tags: [Portal]
---

Some time ago, in my [previous post](https://www.dancingwithcrm.com/powerapps-portal-web-api-deep-dive/) about Web API I mentioned the example of its usage - creating Excel-like experience on the Portal. The time has come to show that example. In my code, I am using a third-party library called [jExcel](https://bossanova.uk/jexcel/v4/). Below you can find a video of how it looks like and sample code. The code may not reveal the best practices for jExcel library and provided only as a reference.

{% capture importantText %}
As the date of the article Web API is still in Preview and is not suitable for the production environment.
{% endcapture %}
{% include important-block.html importantText=importantText %}

{% include video.html webm="spreadsheet_example.webm" mp4="spreadsheet_example.mp4" %}

{% capture code %}
<script src="https://bossanova.uk/jexcel/v4/jexcel.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jexcel/v4/jexcel.css" type="text/css" />

<script src="https://bossanova.uk/jsuites/v2/jsuites.js"></script>
<link rel="stylesheet" href="https://bossanova.uk/jsuites/v2/jsuites.css" type="text/css" />

<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Material+Icons" />

<div class="container">
    <h1>Sample spreadsheet</h1>
    <div id="spreadsheet"></div>
</div>

{%raw%}
<!-- Fetching list of contacts -->
{% fetchxml contactList %}
<fetch version="1.0" mapping="logical">
    <entity name="contact">
        <attribute name="firstname"></attribute>
        <attribute name="lastname"></attribute>
        <attribute name="emailaddress1"></attribute>
        <attribute name="telephone1"></attribute>
        <attribute name="contactid"></attribute>
        <filter type="and">
            <condition attribute="fullname" operator="like" value="%(sample)%" />
        </filter>
    </entity>
</fetch>
{% endfetchxml %}
{%endraw%}

<script>
    //Web API ajax wrapper
    (function (webapi, $) {
        function safeAjax(ajaxOptions) {
            var deferredAjax = $.Deferred();
            shell.getTokenDeferred().done(function (token) {
                // Add headers for ajax
                if (!ajaxOptions.headers) {
                    $.extend(ajaxOptions, {
                        headers: {
                            "__RequestVerificationToken": token
                        }
                    });
                } else {
                    ajaxOptions.headers["__RequestVerificationToken"] = token;
                }
                $.ajax(ajaxOptions)
                    .done(function (data, textStatus, jqXHR) {
                        validateLoginSession(data, textStatus, jqXHR, deferredAjax.resolve);
                    }).fail(deferredAjax.reject); //ajax
            }).fail(function () {
                deferredAjax.rejectWith(this, arguments); // On token failure pass the token ajax and args
            });
            return deferredAjax.promise();
        }
        webapi.safeAjax = safeAjax;
    })(window.webapi = window.webapi || {}, jQuery)


    function saveContact(contactFieldsArr) {
        let contactObj = {
            "firstname": contactFieldsArr[0],
            "lastname": contactFieldsArr[1],
            "emailaddress1": contactFieldsArr[2],
            "telephone1": contactFieldsArr[3],
        }

        let requestURL = `/_api/contacts(${contactFieldsArr[4]})`;

        webapi.safeAjax({
            type: "PATCH",
            url: requestURL,
            contentType: "application/json",
            data: JSON.stringify(contactObj),
            success: function (res) {
                console.log(res);
            }
        });
    }


    function saveContacts() {
        for (let index = 0; index < changedRows.length; index++) {
            const rowIndex = changedRows[index];
            
            let rowData = table.getRowData(rowIndex);

            saveContact(rowData);
        }
    }

    // list of row indexes that were changed
    var changedRows = [];

    // function that will be called when data is changed in table
    var onDataChange = function(instance, cell, colNum, rowNum, value) {
        let findIndex = changedRows.findIndex(elem => elem == rowNum);

        if(findIndex == -1) {
            changedRows.push(rowNum);
        }
    }

    var data = [
        {%raw%}
        {% for entity in contactList.results.entities %}
        [
            "{{ entity.firstname }}",
            "{{ entity.lastname }}",
            "{{ entity.emailaddress1 }}",
            "{{ entity.telephone1 }}",
            "{{entity.contactid}}",
        ] {% unless forloop.last %}, {% endunless %}
        {% endfor %}
        {% endraw %}
    ];

    var table = jexcel(document.getElementById('spreadsheet'), {
        data: data,
        columns: [{
                type: 'text',
                title: 'First Name',
                width: 220
            },
            {
                type: 'text',
                title: 'Last Name',
                width: 220
            },
            {
                type: 'text',
                title: 'Email',
                width: 220
            },
            {
                type: 'text',
                title: 'Phone',
                width: 150
            },
            {
                type: 'text',
                title: 'Id',
                width: 120,
                readOnly: true
            }
        ],
        toolbar: [{
                type: 'i',
                content: 'undo',
                onclick: function () {
                    table.undo();
                }
            },
            {
                type: 'i',
                content: 'redo',
                onclick: function () {
                    table.redo();
                }
            },
            {
                type: 'i',
                content: 'save',
                onclick: function () {
                    saveContacts();
                }
            }
        ],
        onchange: onDataChange
    });
</script>{% endcapture %}
{% include code.html code=code lang="html" %}
