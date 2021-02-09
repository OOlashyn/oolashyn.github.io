---
layout: post
title:  Typescript - selecting proper target version
date:   2021-02-09 08:01:20 +0100
description: Learn why you should choose proper target version in your tsconfig file and how it boost your code
excerpt: Learn why you should choose proper target version in your tsconfig file and how it boost your code
img: 2021-02-09-cover.jpg
image: /assets/img/2021-02-09-cover.jpg
tags: [Typescript, D365]
---

Lately, there was a lot of great articles about starting with TypeScript (from [Scott Durow](https://develop1.net/public/post/2018/06/09/Lets-start-TypeScript-Part-1),  [Oliver Flint](https://www.oliverflint.co.uk/2020/03/07/D365-Typescript-Webresources-Part-1/), [Benedikt Bergmann](https://benediktbergmann.eu/2020/12/04/setting-up-a-typescript-project-for-dataverse/) to name a few). Those are great articles and I definitely advise you to check them out. In this article we will not talk about how you can set up your ts project, rather we will talk about performance, unnecessary code and target version. Hope this article will be interesting not only for Power Platform folks but for developers in general.

## tsconfig

tsconfig file has a lot of options that allow you to control every bit of the typescript behaviour. One important piece is the **target** property. According to official docs:

>Target - Allows to specify ECMAScript target version.

Basically, you select to which ECMAScript version your code will be transpiled. In most cases, you will see es5 as a default option. And this is understandable - back in the day es5 features were supported by most browsers including IE and offered great functional features.
However, right now, according to [Google](https://web.dev/publish-modern-javascript), 95% of global web traffic comes from web sites that support at least es2017 feature set. This means that we can target es2017 as our transpile version and be pretty confident that it will be supported.

{% capture importantText %}
What if you need to support older browsers like IE 11? Well if we are talking about Power Platform space Microsoft will <strong>deprecate</strong> Dynamics support for IE11 in August 2021 (see <a href="https://docs.microsoft.com/en-us/power-platform/important-changes-coming#internet-explorer-11-support-for-dynamics-365-and-microsoft-power-platform-is-deprecated">here</a>) so you will need to update and that's a good time to improve code as well. If we are talking about web developers in general there is an approach of generating legacy code and set that as a fallback. Please check <a href="https://web.dev/publish-modern-javascript/#modern-with-legacy-fallback">this article</a> from Google for more information.
{% endcapture %}
{% include important-block.html importantText=importantText %}

## ES5 vs ES2017

Let's review how the change only in the target version will improve our code.

Below you can find sample ts code for the contact form. It consists of two async function - first runs on onload event and calls the second one to fetch the number of employees from parent account and then present it in the alert screen.

{% capture code %}
async function onLoad(executionContext: Xrm.Events.EventContext): Promise<void> {
    const formContext = executionContext.getFormContext();
    const parentAccount = formContext.getAttribute("parentcustomerid").getValue();
    const accountWithEmployees = await getNumberOfEmployees(parentAccount[0].id);

    if (accountWithEmployees !== null) {
        var alertStrings = { 
            confirmButtonLabel: "Yes", 
            text: "Number of Employess: " + accountWithEmployees.numberofemployees, 
            title: "Sample title" 
        };
        var alertOptions = { height: 120, width: 260 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    }
}

async function getNumberOfEmployees(accountId: string): Promise<any | null> {
    const options = "?$select=numberofemployees";
    const result: any = await Xrm.WebApi.online.retrieveRecord("account", accountId, options);
    return result;
}
{% endcapture %}
{% include code.html code=code lang="javascript" %}

### ES5

Now we will compile it to js using default tsconfig (with es5 as target)

{% capture code %}
{
  "compilerOptions": {
    "module": "es6",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outDir": "dist",
    "sourceMap": true,
    "target": "es5"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts", "dist"]
}
{% endcapture %}
{% include code.html code=code lang="json" %}

This is our result:

{% capture code %}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function onLoad(executionContext) {
    return __awaiter(this, void 0, void 0, function () {
        var formContext, parentAccount, accountWithEmployees, alertStrings, alertOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formContext = executionContext.getFormContext();
                    parentAccount = formContext.getAttribute("parentcustomerid").getValue();
                    return [4, getNumberOfEmployees(parentAccount[0].id)];
                case 1:
                    accountWithEmployees = _a.sent();
                    if (accountWithEmployees !== null) {
                        alertStrings = {
                            confirmButtonLabel: "Yes",
                            text: "Number of Employess: " + accountWithEmployees.numberofemployees,
                            title: "Sample title"
                        };
                        alertOptions = { height: 120, width: 260 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                    }
                    return [2];
            }
        });
    });
}
function getNumberOfEmployees(accountId) {
    return __awaiter(this, void 0, void 0, function () {
        var options, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = "?$select=numberofemployees";
                    return [4, Xrm.WebApi.online.retrieveRecord("account", accountId, options)];
                case 1:
                    result = _a.sent();
                    return [2, result];
            }
        });
    });
}
//# sourceMappingURL=sample-contact.js.map
{% endcapture %}
{% include code.html code=code lang="javascript" %}

### ES5 results overview

That's a lot of code. **20 lines** of original code transpiled into **75 lines** of output code (size of the result file is **4.11 KB**). That's a lot of additional code (**375%** increase in the number of lines). And for the bigger code, this increase will be even bigger.

### ES2017

Now we will update tsconfig to es2017 and see how much improvement we got.

{% capture code %}
{
  "compilerOptions": {
    "module": "es6",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outDir": "dist",
    "sourceMap": true,
    "target": "es2017"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts", "dist"]
}
{% endcapture %}
{% include code.html code=code lang="json" %}

This is the result for es2017:

{% capture code %}
async function onLoad(executionContext) {
    const formContext = executionContext.getFormContext();
    const parentAccount = formContext.getAttribute("parentcustomerid").getValue();
    const accountWithEmployees = await getNumberOfEmployees(parentAccount[0].id);
    if (accountWithEmployees !== null) {
        var alertStrings = {
            confirmButtonLabel: "Yes",
            text: "Number of Employess: " + accountWithEmployees.numberofemployees,
            title: "Sample title"
        };
        var alertOptions = { height: 120, width: 260 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    }
}
async function getNumberOfEmployees(accountId) {
    const options = "?$select=numberofemployees";
    const result = await Xrm.WebApi.online.retrieveRecord("account", accountId, options);
    return result;
}
//# sourceMappingURL=sample-contact.js.map
{% endcapture %}
{% include code.html code=code lang="javascript" %}

### ES2017 results overview

As you can see our js code looks much better - only **20 lines** (same number as in original typescript code) and the size of the output file is only **907 bytes**. This is an enormous improvement vs es5 version. This is because es2017 brought native support for async/await operations and the biggest chunk of additional code in es5 version comes from the support of those operations in older browsers. If we would write our code with async operations improvement might be not that great but still be present.

And it is not only the number of lines of code and the size of the output file that matters but also the number of instructions that need be executed by the system. Transpiling to a newer version of the code will ensure that fewer instructions will be generated thus improving the speed of resulting code. For example, in [this video](https://youtu.be/cLxNdLK--yI?t=275), Google shows how simple one line of code that produces only 62 instructions after transpiling to the older es version will produce 1173 instructions, which will slow down the execution (6 times in this particular example).

## Conclusion

When you develop a project for web (either site, an app or D365 web resource) performance of the code and its size matters, as it could lead to improvements in the user usage experience. So if you work with Typescript files be sure to select proper target version as it can help you to ship more modern and thus more powerful code. At the moment of writing this article ES2017 is an ideal spot to cover as much web browsers as possible and at the same time ensure good code performance.
