## Built with create react app and material ui

- pull some info/logos/assets from DC Rainmaker
- title, DC Rainmaker comment assessment
- allow for searching across months OR
- allow for layered searching
  - find all posts with certain keywords
  - capture all comments from those posts
- lsi: how to implement
  - one method would be to perform SVD on the comments then rank similarity to a 'positive words' vector
  - do the same for 'negative words'
  - two scores can now be weighted, maybe?
  - naive approach


# Create React App example with TypeScript

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/next | tar -xz --strip=2 material-ui-next/examples/create-react-app-with-typescript
cd create-react-app-with-typescript
```

Install it and run:

```sh
npm install
npm run start
```

## The idea behind the example

This example demonstrate how you can use [Create React App](https://github.com/facebookincubator/create-react-app) with [TypeScript](https://github.com/Microsoft/TypeScript).
