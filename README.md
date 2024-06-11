
<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Movie Quotes</h1>
</div>

---
Movie Quote is a platform for people discover millions of quotes from different movies.

On movie quote platform you can register, create your own movies, post related quotes and show them to the world!

Here you also get reactions and comments from other users of movie quote platform!

#
### Table of Contents
* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Development](#development)
* [Deployment with CI / CD](#deployment-with-ci-\-cd)
* [Resources](#resources)


#
### Prerequisites


* <img src="https://blog.nativescript.org/images/0tw5g4s3bv4xoxr6espf.png" width="35" style="position: relative; top: 4px" /> *npm@6 and up*


#
### Tech Stack

* <img src="https://logosdownload.com/logo/vue.js-logo-big.png" height="18" style="position: relative; top: 4px" /> [Vue js - Composition API](https://vuejs.org/guide/introduction.html) - front-end framework
* <img src="https://logosdownload.com/logo/vue.js-logo-big.png" height="18" style="position: relative; top: 4px" /> [Pinia](https://vuex.vuejs.org/guide/) - state management for Vue.js
* <img src="https://logosdownload.com/logo/vue.js-logo-big.png" height="18" style="position: relative; top: 4px" /> [Vue-router](https://router.vuejs.org/) - routing for Vue.js
* <img src="https://trendgems.com/wp-content/uploads/2021/10/tailwind1-1080x675.jpg" height="18" style="position: relative; top: 4px" /> [Tailwind]([https://router.vuejs.org/](https://tailwindcss.com/docs/installation)) - Css framework
* <img src="https://logosdownload.com/logo/vue.js-logo-big.png" height="18" style="position: relative; top: 4px" /> [Pusher JS and Laravel Echo](https://vuejs.org/guide/introduction.html) - packages for broadcasting


#
### Getting Started
1\. First of all you need to clone Movie quotes repository from github:
```sh
git clone https://github.com/RedberryInternship/front-movie-quotes-nino-nonikashvili
```

2\. Iinstall all the JS dependencies:
```sh
npm install
```

and also:
```sh
npm run build
```
in order to build your JS/SaaS resources.

3\. Now we need to set our env file. Go to the root of your project and execute this command.
```sh
cp .env.example .env
```
And now you should provide **.env** file all the necessary environment variables:

#
**PUSHER CREDENTIALS:**
>VITE_PUSHER_APP_KEY=******

>VITE_PUSHER_APP_CLUSTER=**



#
### Development

You can execute the following commands:


```sh
  npm run dev
```
it builds your js files into executable scripts.
If you want to watch files during development, execute instead:

```sh
  npm run build:css
```
it will watch JS files and on change it'll rebuild them, so you don't have to manually build them.

#
### Deployment with CI \ CD


Continues Development / Continues Integration & Deployment steps:
* CI \ CD process first step is of course is development.
* After some time of development when you are ready to integrate and deploy your feature/fix/work you make a commit or pull request to gihub branch.
* That triggers github action which listens to pull requests and commits on development and main branch. Github actions will set up configure project.
* If process succeed then github actions will deploy your code to development or production server according to the branch you are making commit to.
* After deploying, github actions script will build your code and run migrations all to be up to date.

#
### Resources

* [Figma Design](https://www.figma.com/design/5uMXCg3itJwpzh9cVIK3hA/Movie-Quotes-Bootcamp-assignment?node-id=225-15639&t=vzKlex6ll1A8dC1m-0)
* [Postman API documentation](https://documenter.getpostman.com/view/33904104/2sA3XMhN9t)
* [Laravel API backend for this project](https://github.com/RedberryInternship/back-movie-quotes-nino-nonikashvili)

