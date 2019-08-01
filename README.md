# pm2-visualised
A visualisation of all processes managed by PM2  

This project aims to visualise all running PM2 processes on a server.  

# Installation  
1. clone the directory  
2. create .env file (for content see below)  
3. run "npm install" command
4. run "pm2 start" command  

Your dashboard is now available on port 1337 and the chosen token in the .env file.  
If you receive missing or incorrect token message, please read the env documentation below.

# env variable
These are the variables that can be defined in the .env file  
SITE_TOKEN (Mandatory - a security token that is given in the URL as a parameter.)   
SYSTEM_WARNING (Optional - represents a percentage when the system needs to display a warning. Default: 75%)
SYSTEM_ALERT (Optional - represents a percentage when the system needs to display an alert. Default: 90%)
SYSTEM_POLL_DELAY (Optional - amount of seconds between each poll. Default: 5 seconds)

Example  
```
SITE_TOKEN=ChangeThisTokenBecauseItIsNotVerySecure-123  
SYSTEM_WARNING=75  
SYSTEM_DANGER=90  
SYSTEM_POLL_DELAY=5  
```  
With this env file, you're dashboard is available at <URL>:1337?token=ChangeThisTokenBecauseItIsNotVerySecure-123


# Roadmap  
Suggestions for this project can be made in the issues.  
However, this project is not my daily occupation, so pull requests with improvements are always welcome.  

**Improvements**   
1. Without a doubt, a load of css & javascript improvements
2. Use react (or a similar front-end framework) instead of vanilla js  
3. Multi-server (define multiple endpoints to visualise on 1 page)  
4. Change chart color according to state  
5. Use websocket to push changes (instead of pulling changes)  
6. Add a small sound when a danger is triggered  

# Choices  
Some choices are made and have a profound impact.  

Why does this project exist?  
Well, it's actually something I made to monitor one of my servers and to display some of the methodologies I know.  
Also, I enjoy using PM2 (even though I use other node process managers as well in production projects).  
PM2 has a lot more to offer than just process management, so do check out the features...  

Why work with an API url and fetch the data in json format.  
So others could easely integrate and consume this data. For example to create a native mobile app.  

Why are there a bunch of different methodologies mixed, such as regular css and BEM/utility-first or promises and callback/setInterval?  
See first question...  
