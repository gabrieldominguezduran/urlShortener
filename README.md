# URL Shortener

API build with Node. The API can be use alone or with database, the schema is hosted on mongodb atlas, the included views are and example of what this can do.

---

# Routes

The routes in this REST API, are the post route `'/getUrl'`, the index for the view `'/'` where you have the form for shortening the url and the `'/:route/stats'` where you can check the stats of the url.

## Shortening links

You can make an **post request** to `'/getUrl'` passing a URL to be shortened and an optional code as body parameters.

Example:

```
params: {
    "url":"https://github.com/gabrieldominguezduran"
}
```

If you want to use a custom code (must be at least 4 characters) you can pass it as a parameter:

```
params: {
    "url":"https://github.com/gabrieldominguezduran",
    "code":"myCode"
}
```

If the code exists already it will throw an error.

- **url**: it must be an valid URL.
- **code**: It's an optional parameter, can be digits upper and lower case letters, it's case sensitive.

## Redirecting to original URL

You can make a **get request** to `/:route` passing the code of the URL you want to be redirected to.

## Checking url stats

You can check the stats of any url visited on `/:route/stats`

If you want install the API use:

```
npm install

```

To install dependencies
