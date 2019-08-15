---
layout: post
title:  PowerApps tracking using Azure Application Insights
date:   2019-08-15 20:25:20 +0300
description: How to use Azure Application Insights to track PowerApps usage
img: 2019-08-15-analytics.png
image: /assets/img/2019-08-15-analytics.png
tags: [D365, PowerApps, Azure]
---

Some time ago I wrote a blog post about tracking PowerApps Portals with Azure Application Insights. After playing with it for some time I decided that there is another good target for such tracking - PowerApps.

You might say that Canvas Apps has its own analytics. And that is correct. However, it is limited and sometimes we really need to have a more sophisticated tool for gathering analytics.

We will use Flow to connect PowerApps and Azure Function. As an alternative and more complex scenario, we could create a custom connection that would point directly to Azure Function and eliminate dependency to Flow, but I wanted to make this blog post as simple as I could. I will also create a sample Canvas App to demonstrate how it works.

You will need to create Azure App Insights to use it to monitor your app. To find how to do it please refer to [official documnetation][create-app-ins].

## Calling App Insights from Azure function

Let's start from the final part of the integration and walk our way back. You can create Azure Function either directly from Azure Portal or Visual Studio. In this post, I will show you how to do it from Visual Studio.

As a prerequisite, you need to have an Azure development workload installed in your Visual Studio instance (see image below).

![Azure Workload]({{site.baseurl}}/assets/img/2019-08-15-azure-workload.jpg){: .center-image }

Create a new Azure Function project. It will ask you about a version of Azure Function (select v2) and trigger (select Http trigger). Select Authorization level as Anonymus (**Security note**: use Anonymus level only for development purpose).

![Create Project]({{site.baseurl}}/assets/img/2019-08-15-create-new-project.jpg){: .center-image }

I named my function TrackEvent. Now we need to install the NuGet package to work with Azure Application Insights. Right-click on Dependency and select Manage NuGet Packages. Then search and install **Microsoft.ApplicationInsights.AspNetCore** package. After that go back to your function and these two lines at the beginning of the file:

{% highlight c# %}
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.Extensibility;
{% endhighlight %}

Now we need to add TelemetryClient. This class will allow us to send data to Azure Application Insights. Add the next lines to your function

{% highlight c# %}
TelemetryConfiguration configuration = TelemetryConfiguration.CreateDefault();
configuration.InstrumentationKey = "YOUR INTRUMENTATION KEY";
TelemetryClient telemetry = new TelemetryClient(configuration);
{% endhighlight %}

You can find your instrumentation key on the main page of your Azure App Insight.
To obtain and manipulate data in a more structured way let's create a simple model class for it. Create a new class (I named it EventInfo). From my PowerApps, I would like to receive the next things: EventName, UserEmail, Screen, AppName and PASessionId- which will be the unique id of the user session in PowerApps. Our call will look like this:

{% highlight c# %}
public class EventInfo
    {
        public string Screen { get; set; }
        public string EventName { get; set; }
        public string UserEmail { get; set; }
        public string PASessionId { get; set; }
        public string AppName { get; set; }
    }
{% endhighlight %}

I will send a bunch of events from my PowerApp to Azure Function as an array of EventInfo objects, so we need to read it from the request body. (you can send only one event, I did multiple just to show what you can do).

{% highlight c# %}
string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
EventInfo[] eventsData = JsonConvert.DeserializeObject<EventInfo[]>(requestBody);
{% endhighlight %}

After getting all events we need to send them to Azure App Insights. To do so we will use TrackEvent method from TelemetryClient class. This method accepts one required and two optional parameters - eventName, properties and methods. We will use the first two. eventName - is just a string that represents a unique event name. properties is a Dictionary variable that contains custom properties and their values. Inside the properties, we will put all fields from EventInfo except EventName, which be the eventName. See code below.

{% highlight c# %}
foreach (var paEvent in eventsData)
{
    // Set up event custom properties
    var properties = new Dictionary<string, string>
    {
        { "UserEmail", paEvent.UserEmail},
        { "Screen", paEvent.Screen},
        { "PASessionId", paEvent.PASessionId},
        { "AppName", paEvent.AppName}
    };
    // Send event
    telemetry.TrackEvent(paEvent.EventName, properties);
}
{% endhighlight %}

That's it. After we tracked all events we need to return the OK result.

{% highlight c# %}
return new OkResult();
{% endhighlight %}

Now when we have our function ready we need to publish it. Publishing for the first time will ask you to create a new resource group or to select an existing one. To find more about publishing Azure Function refer to the [official tutorial][off-tutorial].

After publishing you will be able to access your function using next url: **Site_URL/api/function_name**. In my case it is **Site_URL/api/TrackEvent**. You can find you Site Url in Publish Page summary.

![Site URL]({{site.baseurl}}/assets/img/2019-08-15-site-url.jpg){: .center-image }

## Create Flow

Create a Flow inside a solution (then it would be easier to transfer it from one environment to another). I called this flow TrackEvent. As a template select PowerApps Button.

![Flow Template]({{site.baseurl}}/assets/img/2019-08-15-flow-template.jpg){: .center-image }

First, let's add Initialize variable step. I called it EventDetails. Select string as a type and Ask in PowerApps in Value. If you don't see Ask in PowerApps option press See more in Dynamic content pane.

![Flow Variable]({{site.baseurl}}/assets/img/2019-08-15-flow-variable.jpg){: .center-image }

It might seem like overkill here, but in case you would like to use input from PowerApps not only in Azure Function call but somewhere else as well it might be useful.

Now we need to add Http action. You need to select Post as Method, in the URI put url to your function, and put EventdDetails variable as Body.

![Http Request]({{site.baseurl}}/assets/img/2019-08-15-http-request.jpg){: .center-image }

That's it your flow is ready now.

## Track events from PowerApps

For the purpose of this tutorial, I created a sample app. It consists of two screens on which one user will be able to add two types of events: AwesomeEvent and FantasticEvent. Also, there is a button to send all events to App Insights. There is a table that shows what events are tracked.

![PowerApps view]({{site.baseurl}}/assets/img/2019-08-15-powerapps-view.jpg){: .center-image }

First of all, on OnStart event, we need to set a couple of useful global variables: gblUserEmail - with the current user email, gblSessionId - unique id of users session, gblAppName - the app name,  EventDetails collection with all events.

![PowerApp OnStart]({{site.baseurl}}/assets/img/2019-08-15-powerapps-onstart.jpg){: .center-image }

Next on OnVisible event on each screen add a command to set gblScreen variable to the current screen.

![PowerApp OnVisible]({{site.baseurl}}/assets/img/2019-08-15-powerapps-onvisible.jpg){: .center-image }

Then we need to set an event on OnSelect event of the Awesome and Fantastic buttons.

![PowerApp OnSelect]({{site.baseurl}}/assets/img/2019-08-15-powerapps-onselect.jpg){: .center-image }

Finally, we need to send all events to our flow on the press of Send Events button. Select that button, navigate to Action and select Flows. Then select flow that you create in the previous step (TrackEvent in my case). Now to call that flow we need to write **TrackEvent.Run(JSON(EventDetails))**. Let me explain - inside the Run method we need to provide an array of events as a string. To do so we will use very cool function - JSON. It will turn our Collection into an array of objects and then convert it to a string. You can find more about this function in [official docs][json-docs].

Great. That's it. Now when we press on the Send Event button all events will be sent to the flow and from there to Azure Function where they will be tracked in Azure Application Insights. It might take some time for events to appear in Azure App Insights.

In the images below you can see events that we sent from PowerApps, how they appear in App Insights and overview of one the events.

**Events in PowerApps**

![PowerApp Events]({{site.baseurl}}/assets/img/2019-08-15-powerapps-sendevents.jpg){: .center-image }

**Events in App Insights**

![App Insights Overview]({{site.baseurl}}/assets/img/2019-08-15-app-insight-overview.jpg){: .center-image }

**Event Details**

![App Insights Event Details]({{site.baseurl}}/assets/img/2019-08-15-app-insight-event-details.jpg){: .center-image }

I hope you found this article useful.

[create-app-ins]: https://docs.microsoft.com/en-us/azure/azure-monitor/app/create-new-resource
[off-tutorial]: https://tutorials.visualstudio.com/first-azure-function/publish
[json-docs]: https://docs.microsoft.com/en-us/powerapps/maker/canvas-apps/functions/function-json
