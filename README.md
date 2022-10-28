# Note à l'attention de la MACIF en vue de la passation technique

Ce Readme.md provient de la documentation de React, l'outil que nous avons utilisé pour développer l'interface du front. Il est complet concernant l'utilisation que la MACIF peut avoir et détaille les quelques commandes à utiliser lors de la première utilisation du projet (npm install convient pour installer les dépendances et les librairies que nous utilisons). À chaque utilisation, il convient ensuite de lancer "npm start" comme détaillé di-dessous pour que le projet se lance et soit accessible depuis le naviguateur. 


Pour créer l'image docker qui sera nécessaire au déploiement du projet, il faudra lancer la commande suivante : `docker build -t front .`
depuis le répertoire ici présent, ou dans un ficher de configuration, un dockerfile, ... annexe qui lancera l'ensemble des "briques" du projet simultanément.
Les instructions pour "build" cette image, nommée "front" grâce au paramètre "-t", sont présentes dans le répertoire courant "." dans le dockerfile.

Aucune commande non présente sur ce Readme.md n'est nécessaire au bon fonctionnement de l'application.

## Version de Node
`node:16.17`
# React README.md 

## Install npm

In the project directory you can run :

### `npm install`

## Variables d'environnement
Ici, il n'y a que `baseURL` comme variable d'environnement. Il s'agit de la base url du back, pour ensuite lancer les requêtes au back.
Cette variable est hardcodé (parce que le front doit être build), dans le fichier `/src/assets/Const.tsx`, sur la ligne 1.

## Lancement du front
Vous disposez ici aussi d'un Dockerfile qui permet de lancer le front.
Il faut ici aussi build l'image avant de la lancer avec `docker build -t client .`.

Dans le Dockerfile, il faut build le front: `npm run build` et ensuite copier `/app/build` dans `/usr/share/nginx/html` pour avoir une configuration nginx.
Cette configuration est ensuite mise dans `/etc/nginx/conf.d/default.conf`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

