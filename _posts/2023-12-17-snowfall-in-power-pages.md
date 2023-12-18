---
layout: post
title: Snowfall animation for Power Pages
date: 2023-12-17 21:45:20 -0500
description: Learn how to add a simple snowfall animation to your Power Pages site
excerpt: Christmas is almost here and the festive atmosphere kicks in. Check my latest post to learn couple of ways to add a simple snowfall animation to your Power Pages site
shortDescription: Christmas is almost here and the festive atmosphere kicks in. Check this post to learn couple of ways to add a simple snowfall animation to your Power Pages site
img: 2023-12-17-cover.jpg
image: /assets/img/2023-12-17-cover-rss.jpg
tags: [PowerPlatform, PowerPages]
---

Christmas is almost here and the festive atmosphere kicks in. Let's learn how we can add some of that winter/holiday spirit to our Power Pages site. In this article, you will find a couple of ways to add a snowfall animation to your site.

## Snowfall with CSS only

In the first approach, we will be using [CSSnowflakes](https://github.com/pajasevi/CSSnowflakes), which is a combination of CSS and HTML without any JS.

This is what our final result will look like:

{% include video.html mp4="2023-12-17-snowfall-demo.mp4" %}

Let's start by creating a new Web Template called **"Snowfall with CSS Only"**. We will place the following code there:

{% capture code %}
<style>
/* customizable snowflake styling */
.snowflake {
  color: #fff;
  font-size: 1em;
  font-family: Arial, sans-serif;
  text-shadow: 0 0 5px #000;
}

.snowflake,.snowflake .inner{animation-iteration-count:infinite;animation-play-state:running}@keyframes snowflakes-fall{0%{transform:translateY(0)}100%{transform:translateY(110vh)}}@keyframes snowflakes-shake{0%,100%{transform:translateX(0)}50%{transform:translateX(80px)}}.snowflake{position:fixed;top:-10%;z-index:9999;-webkit-user-select:none;user-select:none;cursor:default;animation-name:snowflakes-shake;animation-duration:3s;animation-timing-function:ease-in-out}.snowflake .inner{animation-duration:10s;animation-name:snowflakes-fall;animation-timing-function:linear}.snowflake:nth-of-type(0){left:1%;animation-delay:0s}.snowflake:nth-of-type(0) .inner{animation-delay:0s}.snowflake:first-of-type{left:10%;animation-delay:1s}.snowflake:first-of-type .inner,.snowflake:nth-of-type(8) .inner{animation-delay:1s}.snowflake:nth-of-type(2){left:20%;animation-delay:.5s}.snowflake:nth-of-type(2) .inner,.snowflake:nth-of-type(6) .inner{animation-delay:6s}.snowflake:nth-of-type(3){left:30%;animation-delay:2s}.snowflake:nth-of-type(11) .inner,.snowflake:nth-of-type(3) .inner{animation-delay:4s}.snowflake:nth-of-type(4){left:40%;animation-delay:2s}.snowflake:nth-of-type(10) .inner,.snowflake:nth-of-type(4) .inner{animation-delay:2s}.snowflake:nth-of-type(5){left:50%;animation-delay:3s}.snowflake:nth-of-type(5) .inner{animation-delay:8s}.snowflake:nth-of-type(6){left:60%;animation-delay:2s}.snowflake:nth-of-type(7){left:70%;animation-delay:1s}.snowflake:nth-of-type(7) .inner{animation-delay:2.5s}.snowflake:nth-of-type(8){left:80%;animation-delay:0s}.snowflake:nth-of-type(9){left:90%;animation-delay:1.5s}.snowflake:nth-of-type(9) .inner{animation-delay:3s}.snowflake:nth-of-type(10){left:25%;animation-delay:0s}.snowflake:nth-of-type(11){left:65%;animation-delay:2.5s}
</style>
<div class="snowflakes" aria-hidden="true">
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
  <div class="snowflake">
    <div class="inner">❅</div>
  </div>
</div>
{% endcapture %}
{% include code.html code=code lang="html" %}


snowflake class allows us to change the properties of the snowflakes on our page (like size, colour, etc).

To add more snowflakes you would need to create new divs inside the snowflakes container and update the corresponding CSS (currently each snowflake has its own animation delay and position, so when adding a new one we need to create additional CSS for it).

The aria-hidden attribute is added to the snowflakes container to hide it from screen readers.

Then we will add a Site Setting called **Snowfall/Enabled** and set it to true. This setting will allow us to turn snow on and off without changes in our code.

Then we will add the following code to the **Header** web template, so it will apply to all pages with the header

{% capture code %}
{% raw %}
{% assign snowFall_enabled = settings['Snowfall/Enabled'] | boolean %}
{% if snowFall_enabled %}
  {% include "Snowfall with CSS Only" %}
{% endif %}
{% endraw %}
{% endcapture %}
{% include code.html code=code lang="liquid" %}

## Snowfall with JS

For the second approach, we will generate our snowfall using JS (from [this CodePen](https://codepen.io/ethancopping/pen/ExrGYGG)).

Our final result will look like this:

{% include video.html mp4="2023-12-17-snowfalljs-demo.mp4" %}

We will create a new Web Template called **"Snowfall with JS"**. We will place the following code there:

{% capture code %}
<style>
.snow-container {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    pointer-events: none;
}

.snowflake {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    opacity: 0.8;
    pointer-events: none;
}

@keyframes fall {
    0% {
        opacity: 0;
        transform: translateY(0);
    }
    10% {
        opacity: 1;
    }
    100% {
        opacity: 0.5;
        transform: translateY(100vh);
    }
}

@keyframes diagonal-fall {
    0% {
        opacity: 0;
        transform: translate(0, 0);
    }
    10% {
        opacity: 1;
    }
    100% {
        opacity: 0.25;
        transform: translate(10vw, 100vh);
    }
}
</style>
<script>
document.addEventListener("DOMContentLoaded", function () {
    const snowContainer = document.querySelector(".snow-container");

    const particlesPerThousandPixels = 0.1;
    const fallSpeed = 1; // controls fall speed
    const pauseWhenNotActive = true;
    const maxSnowflakes = 100; // controls max number of snowflakes
    const snowflakes = [];

    let snowflakeInterval;
    let isTabActive = true;

    function resetSnowflake(snowflake) {
        const size = Math.random() * 5 + 1;
        const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
        const viewportHeight = window.innerHeight;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
        snowflake.style.top = `-${size}px`;

        const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationTimingFunction = "linear";
        snowflake.style.animationName =
            Math.random() < 0.5 ? "fall" : "diagonal-fall";

        setTimeout(() => {
            if (parseInt(snowflake.style.top, 10) < viewportHeight) {
                resetSnowflake(snowflake);
            } else {
                snowflake.remove(); // Remove when it goes off the bottom edge
            }
        }, animationDuration * 1000);
    }

    function createSnowflake() {
        if (snowflakes.length < maxSnowflakes) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflakes.push(snowflake);
            snowContainer.appendChild(snowflake);
            resetSnowflake(snowflake);
        }
    }

    function generateSnowflakes() {
        const numberOfParticles =
            Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
            particlesPerThousandPixels;
        const interval = 5000 / numberOfParticles;

        clearInterval(snowflakeInterval);
        snowflakeInterval = setInterval(() => {
            if (isTabActive && snowflakes.length < maxSnowflakes) {
                requestAnimationFrame(createSnowflake);
            }
        }, interval);
    }

    function handleVisibilityChange() {
        if (!pauseWhenNotActive) return;

        isTabActive = !document.hidden;
        if (isTabActive) {
            generateSnowflakes();
        } else {
            clearInterval(snowflakeInterval);
        }
    }

    generateSnowflakes();

    window.addEventListener("resize", () => {
        clearInterval(snowflakeInterval);
        setTimeout(generateSnowflakes, 1000);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
});
</script>
<div class="snow-container" aria-hidden="true"></div>
{% endcapture %}
{% include code.html code=code lang="html" %}

This version of the code allows you to customize fall speed, number of snowflakes, if snowfall pauses if there is no interaction with the page for some time etc. See the code for the full list of available options.

The aria-hidden attribute is added to the snowflakes container to hide it from screen readers.

Similarly to the CSS-only approach we need to have a site setting to control our snowfall visibility without change to the code. Add a Site Setting called **Snowfall/Enabled** and set it to true if you didn't do so in the previous example.

Then we will add the following code to the *Header* web template, so it will apply to all pages with the header

{% capture code %}
{% raw %}
{% assign snowFall_enabled = settings['Snowfall/Enabled'] | boolean %}
{% if snowFall_enabled %}
  {% include "Snowfall with JS" %}
{% endif %}
{% endraw %}
{% endcapture %}
{% include code.html code=code lang="liquid" %}

## Conclusion

In this article, I showed you a couple of ways to add a winter spirit to your website by enabling snowfall animation. These code snippets can be further enhanced by adding, for example, a custom button that allows users to enable/disable animation dynamically.

