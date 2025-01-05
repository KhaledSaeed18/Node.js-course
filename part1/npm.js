// ! NPM: Node Package Manager [https://www.npmjs.com/]
// ? npm is a package manager for Node.js that allows you to manage and install third-party, open-source packages and libraries.

// * npm init: Initializes a new package.json file, Configuration file (Contains information about the project) in the current directory

// * Install a package using npm: npm install <package-name> or npm i <package-name>

/*
    Two types of packages we can install:
    - Regular dependencies: packages containing code that we import into our project.
        ! npm install slugify, in old version: npm install slugify --save
    - Development dependencies: packages containing code that we use only during development, not needed for production.
        !npm install nodemon --save-dev or npm install --save-dev nodemon
        -nodemon is a tool that allows you to automatically restart your server when you make changes to your code
*/

/*
    npm global vs local install:
    - npm global install: installs a package globally, making it available for all projects in the device.
        ! npm install -g <package-name> or npm i -g <package-name>
        ? npm install -g nodemon: install nodemon globally and we can use it from any project ex: nodemon server.js
    - npm local install: installs a package locally, making it available only for the current project.
        ! npm install <package-name> or npm i <package-name>
        ? npm install nodemon: install nodemon locally and we can use it only from the current project ex:
        ? in the package.json file add new script: { "start": "nodemon server.js" } and execute: npm run start.
*/

/*
    Package versions: "package": "^z.y.z"
        ! z = major version (Huge changes and big new releases, the code is not stable and may break code may not work)
        ! y = minor version (New features (small changes), the code is stable and still working) 
        ! z = patch version (Bug fixes and security fixes)
        ! ^ = caret operator, Allows updates for non-breaking changes, it updates to the latest minor or patch versions but does not allow updates that would change the major version.
        ! ~ = tilde operator, Allows updates for patch versions only, updates to the latest patch version within the specified minor version.
        ! * = asterisk operator, it means "any version". It's a wildcard that matches all versions, effectively allowing npm to install the latest version available when the command is run.
        ! no operator: exact version
*/

/*
    npm outdated: Lists the outdated packages in the current project.
        ! npm outdated (check for outdated packages)

    npm install package@version: Installs a package with a specific version in the current project.
        !npm install <package-name>@<version> or npm install <package-name>@^z.y.z

    npm update: Updates the version of a package in the current project.
        ! npm update <package-name>

    npm uninstall: Uninstalls a package from the current project.
        ! npm uninstall <package-name>
*/

/*
    * node_modules: folder that contains all the dependencies installed by npm.
    * when sharing code no need to share the node_modules folder, or push it to github.
    * he contains tones of files and folders that are not needed for the project.
    * we can simply get him in other projects using the command: *npm install*
    * npm install will check the package.json file and install all the dependencies in the node_modules folder.
*/

/*
    * package-lock.json: file that contains the exact versions of all the dependencies in the project.
    * this file ensures that all the dependencies in the project are the same version.
*/

// ! when sharing the project or push it to github no need to share the node_modules folder we need package-lock.json and package.json