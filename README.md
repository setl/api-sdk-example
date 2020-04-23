# SETL API SDK Example

The SETL API SDK Example's allowing your to connect to the SETL Blockchain using [`@setl/api-sdk`](https://www.npmjs.com/package/@setl/api-sdk) from NPM

## Documentation

See the [`SETL Labs` API docs](https://setllabs.io/labs/api) for more information (sign-up required).

You can also use our [`SETL API Explorer`](https://setl.io/labs/api/explorer) for ease of use

## Getting Started

To start using these examples you need to run

```sh
npm install
```

## Using the Example - App

The app.js examples shows logging into the SETL Blockchain and registering your first asset to going onto doing your first issuance

To use the app.js example you will need to setup for your SETL Labs account

Open up the app.js file and amend the URL to your hosted SETL Labs environment
```js
const client = new SetlApiSDK('https://example.setllabs.io');
```

Now you must update the login details to a user on your SETL Labs environment 
```js
const token = await client.login({
    username: 'demouser',
    password: 'password'
}).catch(errorHandler);
```

Once you have updated these to your details you can run using the following command

```
npm run start
```

## Using the Example - Express

The express.js examples shows serving an endpoint so you can easy change a response into an another system

Open up the express.js file and amend the URL to your hosted SETL Labs environment
```js
const client = new SetlApiSDK('https://example.setllabs.io');
```

Now you must update the login details to a user on your SETL Labs environment 
```js
const token = await client.login({
    username: 'demouser',
    password: 'password'
}).catch(errorHandler);
```

Once you have updated these to your details you can run using the following command

```
npm run express
```

## For ease of use

We have included all our endpoints in the file called `example.js` so you can see a working example