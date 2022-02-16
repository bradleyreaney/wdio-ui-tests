# Webdriver.IO UI Automation Boilerplate 

## What does this project do?
The following project is an example of how you can use the Webdriver.IO framework for automating web UI tests. 
It can also be used to automate testing on both native mobile and desktop applications.
For more information on this, please see the Webdriver.IO documentation - [What is Webdriver.IO?](https://webdriver.io/docs/what-is-webdriverio)

## How to set up the project
First, you'll need to install a few things.
1. Node.js - https://nodejs.org/en/download/
2. Any IDE - https://code.visualstudio.com/download
3. Docker - https://docs.docker.com/get-docker/
>**Note** - At the time of writing this the official docs suggested Node.js v12.16.1 or higher. Please see the [WDIO System Requirements](https://webdriver.io/docs/gettingstarted#system-requirements) page for more info.

Once you have the above installed, pull the project from GitHub. Open the project in your preferred IDE and either using the built-in terminal or the systems, navigate to the root directory of the project.

Once you've done that, simply run the `npm install` command and you’re all set up!

## How to run the project
##### Standard
To run the automation suite, run the `npx wdio` command in the terminal. This will look up the scripts in the `package.json` file which runs the `wdio run wdio.conf.js` command. This will look up the spec files to run from the `specs` section in the `wdio.conf.js` file. At present it's set to look for any JavaScript file in the specs folder`./test/specs/**/*.js`

##### Docker container
>**Note** - You will need headless mode enabled when running the tests using docker. See the "Features added to this project" section for more info.
Also, make sure you have docker open.

If this is the first time running the tests in docker or you've made some changes, you'll need to build it. To do this run the `docker build -t wdio -f Dockerfile .` command in the terminal.
Once this has completed you can then use the `docker run -it wdio` to run the tests.
At this point it just follows the standard flow and gets the specs from the `wdio.conf.js` file.

## Features added to this project
##### ChromeDriver
ChromeDriver is a standalone server that implements the W3C WebDriver standard. ChromeDriver is available for Chrome on Android and Chrome on Desktop (Mac, Linux, Windows and ChromeOS).
More info about Chromedriver and WDIO can be found here - [WDIO Chromedriver Service](https://webdriver.io/docs/wdio-chromedriver-service/)

##### Headless Chrome
A headless browser is a great tool for automated testing and server environments where you don't need a visible UI shell.
If you need to remove the headless feature and see what’s happening in the UI, open the `wdio.conf.js` file and comment out the chrome options like below.
```JavaScript
capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                //'--no-sandbox',
                //'--disable-infobars',
                //'--headless',
                //'--disable-gpu',
                //'--window-size=1440,735'
            ],
        }
    }],
```


For more information on Google Chrome options, see the `goog:chromeOptions` section under capabilities here - [WDIO capabilities](https://webdriver.io/docs/options#capabilities)

##### Docker
Docker is a powerful containerization technology that allows to encapsulate your test suite into a container that behaves the same on every system. This can avoid flakiness due to different browser or platform versions.
For more info see the [Docker](https://webdriver.io/docs/docker/) page in WDIOs docs

##### Allure reporter
Allure reporter can be used to provide a neat web report form to show how the tests performed. After each run of the tests, a collection of JSON files will be added to the specified directory. 
By default, this is `./allure-results` but can be changed in the `reporters` options in the `wdio.conf.js` file.

Just like the command to run the tests, the command to generate the report has been added to the `package.json` file. To generate the report just run the command `npm run allure`
For more info see the [Allure Reporter](https://webdriver.io/docs/allure-reporter) page in WDIOs docs

>**Note** - Allure will generate a lot of small JSON files that it uses to fill out the report. For this reason, both the `./allure-results` and `./allure-report` directories have been added to the `.gitignore` file.

##### Casual
This is just an npm package that can be used to generate fake data. 
A list of the different types of data it can generate can be found in their [GitHub Readme](https://github.com/boo1ean/casual#readme)

##### specOptions
This is just a method of being able to pass different bits of data into the tests. Each function that can accept as specOption has also been given a default value in case one isn't passed in.
For example.
At the top of the `./test/specs/storeExample.spec.js` file, you will see the following section to add specOptions
```JavaScript
const specOptions = {
    name: 'Bradley Reaney',
    city: 'Sheffield',
}
```
These are then passed into the functions called in the specs. For example, below is how these are passed into a function that completes the order form along with default options provided by Casual.

```JavaScript
async completeOrderForm(specOptions) {
        await browser.pause(1000);
        await this.orderName.setValue(specOptions.name || casual.full_name);
        await this.orderCountry.setValue(specOptions.country || casual.country);
        await this.orderCity.setValue(specOptions.city || casual.city);
        await this.orderCreditCardNumber.setValue(specOptions.cardNumber || casual.card_number());
        await this.orderCreditCardMonth.setValue(specOptions.cardMonth || '12');
        await this.orderCreditCardYear.setValue(specOptions.cardYear || '30');
    }
```

## Useful links
* Creating a project from scratch or adding it to an existing location - [Getting Started](https://webdriver.io/docs/gettingstarted)
* Other WDIO boilerplate projects - [WDIO Boilerplates](https://webdriver.io/docs/boilerplates)
* Option you can pass into WDIO - [WDIO Options](https://webdriver.io/docs/options#webdriver-options)
* Writing tests in TypeScript - [WDIO TypeScript Setup](https://webdriver.io/docs/typescript)
* Integrating with other services like Jenkins - [Jenkins Integration](https://webdriver.io/docs/jenkins)
* Using the Selenium standalone service - [WDIO Selenium settings](https://webdriver.io/docs/selenium-standalone-service)