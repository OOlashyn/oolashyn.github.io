---
layout: post
title: Enhancing Power Pages interactivity with htmx
date: 2025-12-08 21:45:20 -0500
description: Learn how to use htmx to create an interactive UI without full-screen refreshes using Liquid (and no additional JS)
excerpt: What if I told you that you can create an interactive UI without full-screen refreshes using Liquid? What if I told you that you could do it without writing a single line of JS code? All you need is a small library called htmx. Don’t believe me? Well, see for yourself - check this post to find out how I did it and how you can do it too.
shortDescription: What if I told you that you can create an interactive UI without full-screen refreshes using Liquid? What if I told you that you could do it without writing a single line of JS code? All you need is a small library called htmx.
img: 2025-12-08-cover.jpg
image: /assets/img/2025-12-08-cover-rss.jpg
tags: [PowerPages]
---
What if I told you that you can create an interactive UI without full-screen refreshes using Liquid? What if I told you that you could do it without writing a single line of JS code? All you need is a small library called htmx. Don’t believe me? Well, see for yourself - active search and even an infinite scroll scenario, all without JS. Let’s find out how I did it and how you can do it too.

{% include video.html mp4="2025-12-08-htmx-with-powerpages.mp4" %}

## What is htmx?

htmx is a JavaScript library that lets you write less JS by extending HTML (hence the name HTMX). htmx allows you to extend HTML so that components can react to events, send HTTP requests, perform CSS transitions, and much more. You can find more about htmx by visiting [htmx official website](https://htmx.org/).

The simplest example of htmx will look like this.

{% capture code %}
  <button hx-post="/clicked" hx-swap="outerHTML">
    Click Me
  </button>
{% endcapture %}
{% include code.html code=code lang="html" %}

The **hx-post** and **hx-swap** attributes on this button tell htmx:

>“When a user clicks on this button, issue an AJAX request to **/clicked**, and replace the entire button with the HTML response.”

## Liquid and htmx

Liquid is a template language. This means that it is executed on the server. Because of this, any interactivity with liquid usually requires a full-page refresh. Which, in the modern web landscape, can feel outdated and slow for the users.

This is where htmx comes to play - we can use it to simplify getting Liquid from the server and making our pages much more dynamic.

Using Liquid with dynamic fetching is not a new idea. Way before we had Power Pages Web API, the most common way to get the data was to use a page as an API approach - a web template behind the page was using fetchxml to perform necessary queries, and print a formatted response as part of the page.

With htmx, we will use the same approach - create a new page to serve as an API. However, what makes this different from the usual way is twofold: htmx will make it easier to query and consume the page, and the page itself will return valid HTML instead of pseudo-JSON. Although we could achieve the same results while using JS, htmx allows us to write less code, keeping logic on the page cleaner and more understandable.

## Active Search

Imagine we have the following requirement: show the list of available courses and allow the user to search by the course name. The search should happen without a full page refresh.

Usually, we wouldn’t go with the Liquid and fetchxml - since we don’t want to have the full page refresh. However, using Power Pages Web API can require a lot of JS code and additional site setting configuration. And what if we need to have an additional hidden filtering condition (like only show a certain type of courses) that should not be visible to the user? You can, of course, use the new Server Logic; however, it is still in Preview, and we also want to keep our code simple. So let’s use htmx and Liquid to fulfill the requirement.

First, we need to understand how our page will work and which components we will need.

We would need the following components:

* an input that allows users to search for courses
* the list of courses
* a loading indicator to show to the users while we are searching

We can use htmx with the search input to both load the initial list and trigger a reload when the user inputs the search term. 
{% capture code %}
    <input class="form-control" 
       type="search"
       name="search" 
       placeholder="Begin Typing To Search Courses..."
       hx-get="/search-courses"
       hx-trigger="input changed delay:500ms, keyup[key=='Enter'], load"
       hx-target="#search-results"
       hx-indicator=".htmx-indicator">
{% endcapture %}
{% include code.html code=code lang="html" %}


The **hx-get** tells htmx to perform the GET request to the /search-courses URL. It will automatically include the value of our input as the *“search”* query parameter (because we defined the name of our control as “search”).

The **hx-trigger** attribute tells htmx to trigger on the input with a 500ms delay, to ensure we don’t trigger events on every key press. We pass the “changed” modifier to ensure that only when the value has actually changed, to perform a request. We added two additional comma-separated triggers: when users click Enter and on the initial page load.

The **hx-target** attribute tells htmx to swap the content of the element with the id *“search-results”* with the content of the response.

The **hx-indicator** attribute tells htmx that we are using an element with the class *“htmx-indicator”* as a loading indicator, so htmx will show it while waiting on the response, and will hide it as soon as the response is received.

Now let’s add a simple svg and *“Searching...”* text as a loading indicator.
{% capture code %}
  <div class="htmx-indicator d-flex align-items-center" id="htmx_search_indicator">
    <div style="width: 100px;">
      <!-- SVG goes here -->
    </div>
    <span style="font-size: 24px;">Searching...</span>
  </div>
{% endcapture %}
{% include code.html code=code lang="html" %}


Next, we will add the *“search-results”* element, where the list will be rendered. We will use the “dl” HTML - description list element.
{% capture code %}
<dl id="search-results"></dl>
{% endcapture %}
{% include code.html code=code lang="html" %}


Last, but certainly not least, we need to implement the /search-courses URL. For that, we will create a new web page that will use fetchxml to get the list of courses and then will render “dt” and “dd” tags for each course, with the corresponding course name and description. It will also use the provided “search” query parameter as the criteria. In case we have no results, we will simply return div with “No Results Found” text.
{% capture code %}
{% raw %}
{% fetchxml courses %}
<fetch mapping='logical'>
  <entity name='cr770_course'>
    <attribute name='cr770_courseid'></attribute>
    <attribute name='cr770_coursename'></attribute>
    <attribute name='cr770_description'></attribute>
    <order attribute='cr770_coursename'></order>
    <filter type='and'>
      <condition attribute='cr770_coursename' operator='like' value='%{{params.search}}%'></condition>
    </filter>
  </entity>
</fetch>
{% endfetchxml %}

{% if courses.results.entities.size > 0 %}
  {% for course in courses.results.entities %}
  <dt>{{course.cr770_coursename}}</dt>
  <dd>{{course.cr770_description}}</dd> 
  {% endfor %}
{% else %}
<div>No Results Found</div>
{% endif %}
{% endraw %}
{% endcapture %}
{% include code.html code=code lang="html" %}

Combining all of this (and a bit of CSS to style our list), we are getting the dynamic and interactive UI that we needed in just 50 lines of HTML with no extra JS code.

{% include video.html mp4="2025-12-08-active-search.mp4" %}

## Infinite Scroll

But what if we have too much data to load all at once? One of the modern ways to solve an issue like that is to implement an Infinite Scroll mechanism. It will work as follows: first, we will load a small subset of data, say 10 records. Then, as soon as we scroll to the last record, we will load the next set of 10 records. Repeat until all the data is loaded.

To make this happen, we need to adjust both our main page, the Liquid page, and the triggering logic for additional data load.

On the main page, we need to add a new loader indicator - specifically for when we load additional data. We will place it below the “search-results” container, so it will always show at the bottom, where the new results will render. We also need to update the hx-indicator attribute on the search input to point to the id of the search indicator instead of the "htmx-indicator" class, which will exist on the new indicator as well.

Input with updated hx-indicator
{% capture code %}
    <input class="form-control" 
       type="search"
       name="search" 
       placeholder="Begin Typing To Search Courses..."
       hx-get="/search-courses"
       hx-trigger="input changed delay:500ms, keyup[key=='Enter'], load"
       hx-target="#search-results"
       hx-indicator="#htmx_search_indicator">
{% endcapture %}
{% include code.html code=code lang="html" %}


“search-results” with new loading indicator
{% capture code %}
    <dl id="search-results"></dl>
    <div class="htmx-indicator d-flex align-items-center justify-content-center" id="htmx_scroll_indicator">
      <div style="width: 100px;">
        <!-- SVG goes here -->
      </div>
      <span style="font-size: 24px;">Loading...</span>
    </div>
{% endcapture %}
{% include code.html code=code lang="html" %}


Now we need to adjust the Liquid side.

The fetchxml query will be restricted to 10 records per page, by using the count parameter and will accept the current page from the query parameters.

The triggering event for the next set of data, will also be specifed as part of this page - when we render the last element of the results, we will check if more records exists, and if true we will add new htmx attribute to the last dd tag, which will be responsible for triggering the next data load. The following attributes will be added:
* **hx-get** - to tell htmx to perform a GET request with the next page number and search term
* **hx-trigger** - to tell htmx to trigger when element becomes visible
* **hx-swap** - to tell htmx to append the respons html after this element
* **hx-indicator** - to tell htmx to use element with specified id as an indicator

We will also adjust No Results logic - it will only show that message if our query returns 0 results and we are on the first page (to eliminate showing No Results if we have multiple pages).

{% capture code %}
{% raw %}
{% assign pageNumber = request.params['page'] | default:1 %}

{% fetchxml courses %}
<fetch mapping='logical' page="{{ pageNumber }}" count="10">
  <entity name='cr770_course'>
    <attribute name='cr770_courseid'></attribute>
    <attribute name='cr770_coursename'></attribute>
    <attribute name='cr770_description'></attribute>
    <order attribute='cr770_coursename'></order>
    <filter type='and'>
      <condition attribute='cr770_coursename' operator='like' value='%{{params.search}}%'></condition>
    </filter>
  </entity>
</fetch>
{% endfetchxml %}

  {% for course in courses.results.entities %}
    {% if forloop.last and courses.results.more_records %}
      <dt>{{course.cr770_coursename}}</dt>
      <dd 
        hx-get="/search-courses/?page={{ pageNumber | integer | plus: 1}}&search={{params.search}}"
        hx-trigger="revealed"
        hx-swap="afterend"
        hx-indicator="#htmx_scroll_indicator"
        >{{course.cr770_description}}</dd> 
    {% else %}
      <dt>{{course.cr770_coursename}}</dt>
      <dd>{{course.cr770_description}}</dd> 
    {% endif %}
  {% endfor %}

  {% if courses.results.entities.size == 0 and pageNumber == 1 %}
    <dt>No results found</dt>
  {% endif %}
{% endraw %}
{% endcapture %}
{% include code.html code=code lang="html" %}

And here is how our implementation of the Infinite Scroll looks.

{% include video.html mp4="2025-12-08-infinite-scroll.mp4" %}

## Conclusion

htmx with Liquid breathes new life into the page interactivity. Obviously, this is not a replacement for Power Pages Web API and custom JS - we will always have complex scenarios and user interactions that the htmx approach cannot solve. However, it is an ideal combo for many easier, most common use cases, allowing you to create beautiful interactive experiences with less code and shorter timeframes. 

You can find the full code at [my GitHub repo](https://github.com/OOlashyn/htmx-with-powerpages).

## Credits

Cover image by [Eluj](https://pixabay.com/users/eluj-1927408/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3131802) from [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3131802)

[Animated SVG Preloaders by SVGBackgrounds.com](https://www.svgbackgrounds.com/elements/animated-svg-preloaders/)