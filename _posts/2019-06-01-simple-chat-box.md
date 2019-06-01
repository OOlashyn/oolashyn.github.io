---
layout: post
title:  Simple chat window for VA on D365 Portals
date:   2019-06-01 20:00:20 +0300
description: Simple chat window for Virtual Agent on D365 Portals
img: 2019-06-01-chatbox.jpg
image: /assets/img/2019-06-01-chatbox.jpg
tags: [Portal]
---
Microsoft just released Virtual Agent for Dynamics 365 in public preview. So my task was to check out what is it and how we can use it. And to be honest it is quite cool and easy to use. Therefore, I created my chatbot and tested it - everything works great! Next thing to do was to deploy it and we are ready to present simple POC on a Portal. Just copy code from Deploy page and we are ready to go, right? No, unfortunately not. As for now link to a chatbot is just an iframe and will not render as simple chat window with open/close button on your website. So I have built small chat window for POC. You can see how it looks in a small video down below. I will share my code and step by step guide how to create one. So let’s start.

First we will need to create a button with chat icon. We want our button to be simple and self-explanatory. As for me, the best design is round button with message icon inside of it. In addition, it should be fixed on one place of the screen (for example right bottom corner) and flow over current web site. We will use default style from Bootstrap from our Portal to make it more consistent ('btn' and 'btn-primary' classes on a button). For message icon we will use comment icon from glyphicon, as it is already included with your bootstrap.

{% highlight html %}
<button class="chat-open-button btn btn-primary" onclick="openChat()">
    <span class="glyphicon glyphicon-comment"></span>
</button>
{% endhighlight %}

Ok, so far so good. Now let's style our button.

{% highlight css %}
.chat-open-button {
    cursor: pointer;
    outline:none;
    /* make button partially transperent  */
    opacity: 0.8;
    /* fix our button in the right buttom corner  */
    position: fixed;
    bottom: 23px;
    right: 28px;
    /* place it on top of the content of the page */
    z-index: 5;
    /* set button size */
    width: 50px;
    height: 50px;
    /* make it round */
    border-radius: 50%;
    /* set size of the icon inside the button */
    /* and place it at the center of the button */
    font-size: 26px;
    display: flex;
}

/* remove transparency on hover */
.chat-open-button:hover {
    opacity: none;
}
{% endhighlight %}

Great. Now our button is styled and correctly positioned. Next step is to create a chatbox container. It will contain two main parts - iframe and close button. See code below.

{% highlight html %}
<div class="chatbox-container" id="myChat">
    <iframe src="https://va.ai.dynamics.com/webchat/tenants/<YOUR_BOT>" frameborder="0"
     style="height:90%; width:100%;"></iframe>
    <button class="btn btn-primary btn-block" onclick="closeChat()">CLOSE</button>
</div>
{% endhighlight %}

To get the iframe just go to the Deploy page of your bot and copy it from there. Let's style our chat window.

{% highlight css %}
.chatbox-container {
    background-color: white;
    /* hide chatbox by default */
    display: none;
    /* position our chat window in the right bottom corner */
    position: fixed;
    bottom: 0;
    right: 15px;
    /* add small border */
    border: 3px solid #f1f1f1;
    /* place it on top of the content of the page */
    /* it must be bigger then z-index of open button */
    z-index: 9;
    /* chat window size */
    width: 360px;
    height: 400px;
}
{% endhighlight %}

In addition, we need to style our iframe. We will put our styling as style attribute on an iframe directly, because when I tried to apply styles by adding class it doesn’t work. We want our iframe to occupy all width and to take 90% of height (other 10% will take our close button).

Well we almost done. The last part is to show/hide our chat window. For this is we will create two functions: openChat function on open button and closeChat function on close button.

{% highlight javascript %}
    function openChat() {
        $("#myChat").show();
    }

    function closeChat() {
        $("#myChat").hide();
    }
{% endhighlight %}

Great. That's it. Now our chat window is ready and we can use it to hold iframe with chatbot. You can put this code in Content Snippet and easily reuse it in your Portal. Hope it was helpful. I will post more posts about Portal, so check my blog frequently. 

You can find full source code below.

{% highlight html %}
<style>
.chatbox-container {
    background-color: white;
    /* hide chatbox by default */
    display: none;
    /* position our chat window in the right bottom corner */
    position: fixed;
    bottom: 0;
    right: 15px;
    /* add small border */
    border: 3px solid #f1f1f1;
    /* place it on top of the content of the page */
    /* it must be bigger then z-index of open button */
    z-index: 9;
    /* chat window size */
    width: 360px;
    height: 400px;
}
</style>

<div class="chatbox-container" id="myChat">
    <iframe src="https://va.ai.dynamics.com/webchat/tenants/<YOUR_BOT>" frameborder="0"
    style="height:90%; width:100%;"></iframe>
    <button class="btn btn-primary btn-block" onclick="closeChat()">CLOSE</button>
</div>

<script>
    function openChat() {
        $("#myChat").show();
    }

    function closeChat() {
        $("#myChat").hide();
    }
</script>
{% endhighlight %}