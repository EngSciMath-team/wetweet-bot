# twitter-vote

## Overview

This repo is for a slack app that allows consensus-based voting for pushing tweets
to twitter. It runs an expressjs server (using node v10.x), and is deployed on
an EC2 instance. It has an nginx reverse-proxy on the instance, and uses pm2 to
keep the node server running.

## Running

 - `npm run start` to start the local server
 - `npm run start:prod` to start pm2 on prod

## Deployment

Haven't done any automation on that yet, so current "deployment" is:

1. pushing git changes
2. SSHing into the server
3. pulling down latest
4. (re)starting pm2

What I'd _like_ to have is:
 - terraform (for initial server setup)
 - vagrant (or some other workspace provisioner)
 - sooomething else that tells pm2 to restart

## Other things

It's currently set up as a slack/twitter integration, but we may be moving to
something that's not slack soon so that will probably require some work to migrate
it. If you're restarting from scratch you'll need to
 - setup an ec2 instance
 - get twitter app set up
 - make a slack app for your workspace

