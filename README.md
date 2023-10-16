<h1 align="center">Web Scraper API</h1>
<h3 align="center">using Node JS, Javascript, Puppeteer & Parcel</h3>

<h3 align="left"> Guide & Use</h3>
  
-  Setting-up the project
  
-  Creating the scraper

-  Sentiment Analysis

-  Running & debugging
  
-  Discussions & Conclusions

<h3 align="left">Setting-up the project</h3>
<p align="left">
First, we want to make sure we have <a href="https://nodejs.org/ro">Node JS</a> installed. To check that, we need to open our <b>prefered command line interpretor</b> (CMD, Powershell, etc.) and type <code>node -v</code>. It will result in printing the version of your <b>Node JS</b>, if installed. 
</p>
<p align="left">
Similarly, verify that npm was installed correctly with <code>npm -v</code> This should return a string like: <code>8.20.0</code>
</p>
<p>Let's create the folder that will contain our Node.js web scraping project with <code>mkdir [folder-name]</code> and then change directory to it in your
interpretor by using <code>cd [folder-name]</code>. Now, initialize an npm project with <code> npm init -y</code></p>
<p>Your project should contain a package.json. We want to specify the <b>executable files</b> in the format of <code>"command" : "file-path"</code>. In my case,
I'm using one for building the front End, such as
  <code>"serve": "parcel serve src/index.html"</code>
</p>
<p>Afterwards, the code can be run via <b>terminal</b> using <code>npm run serve</code></p>
<p>For the Front-end, we'll be using more packages, and so we'll just install them at the same time by using <code>npm install express body-parser cors axios xmldom xpath bootstrap puppeteer</code> and finally install <bold>Parcel</bold> with <code>install -D parcel</code></p>
That's it! The project is now fully set-up!

<h3 align="left">Creating the scraper</h3>
<p>After researching & documenting about web scraping & the most popular frameworks to complete the work, I went wth <b>Puppeteer</b>. Later in the assignment, this choice was validated by the fact that we needed to <b>access links from the DOM and return data</b> from there, at which Puppeteer is very good at, by navigating in the browser.
</p>
<p>The next challenge (or the first, actually) imposed grabbing data from the dynamic classes. There are more ways of doing this, two of them being <b>CSS selectors</b> or <b>XPath selectors</b>. While CSS selectors are limited to selecting elements based on their properties, XPath can select elements based on their position in the document, which was the prefered solution in my case. For more information regarding CSS/XPath selectors, <a href="https://www.webscrapingapi.com/xpath-vs-css"> check this guide</a>.
</p>
<p>
  Some useful tools for testing I used to retrieve desired XPaths were the Chrome extension <b>XPath Helper</b> and <a href="https://devhints.io/xpath">XPath cheatsheet</a>.                                                                                                            
</p>
<p>The algorithm works as follows: </p>
<ol>
  <li>Launches the desired URL & renders its DOM</li>
  <li>Returns all data from the desired classes by their XPaths</li>
  <li>In a for loop, navigates to each article & <b>retrieve all text from the DOM</b></li>
  <li>Analyses the text & returns a sentiment</li>
  <li>Return formated data as payload</li>
  <li>Closes the browser</li>
</ol>
<p>Some things I've realised by working with puppeteer: 
<ul>
  <li>Puppeteer works on Chromium so if we want to use it with Chrome, we need to specify this by adding <code>`/path/to/Chrome`</code></li>
  <li>The whole aim is not to let browers realise we are using a bot. <b>Headless</b> browsers are easily detected, therefore we want to use <code>{headless: false}</code></li>
  <li>As the bot works very fast, errors can occur if your DOM was not yet rendered completely. This can be fixed by adding <code>{waitUntil: 'networkidle0'}></code></li>
</ul>
</p>

<h3 align="left">Sentiment Analysis</h3>
Sentiment Analysis was particulary interesting to do, especially without any libraries or AI. After researching about how it works, I chose to create a dictionary with both negative and positive words. The way it works is that it takes all words from the articles and matches them to the dictionary. If the word is (almost) similar to any instance of the dictionary, it will return a value. At the end, the sentiment score is returned by calculating its mean value (between 0 and 1). If the value is <b>< 0.3</b>, then the sentiment is negative. If it is <b>>0.7</b>, it is positive. Otherwise, it is neutral.
  
<h3 align="left">Running & debugging</h3>
<p>To run the code, we must first open the project in our prefered <b>integrated development environment (IDE)</b>. We must first run the scraper script, which then listens to requests from the Front End. We can achieve that in the terminal with the following command: <code>node src/server.js</code>.</p>
<p>Then, let's run the Front End. Open another terminal and type in the following command: <code>npm run serve</code>.</p>

<p>
  As an additional feature, I've chose to add the <b>Copy to Clipboard</b> feature, which lets the user copy the result with just one click, excluding the need of scrolling, selecting and copying all the text manually. 
</p>
<h3 align="left">Discussions & Conclusions</h3>
<p>Creating this app was an amazing experience! I wasn't accustomed to scraping beforehand. After hours of researching & implementing, small wins fueled me to keep going. I've been able to explore new technologies, use my logical & analytical thinking in a new fashion.</p>
<p>While the algorithm is fully functional, there are, as always, things to be improved upon it. Looking forward to explore this domain further on! </p>

