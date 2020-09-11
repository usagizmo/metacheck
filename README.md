# metacheck

Get meta information of multiple URLs at once.  
It also supports basic authentication.

- canonical
- robots
- title
- og:site_name
- og:title
- twitter:title
- description
- og:description
- twitter:description
- og:url
- og:image
- twitter:image
- og:type
- twitter:card
- twitter:site
- twitter:creator

## Settings

Set the list of URLs to be checked in `settings.js`.

```js
module.exports = {
  urlList: [
    'https://example.com',
  ],
}
```

If you need basic authentication, set it in `.env`.

```bash
yarn setup
# => Copy .env.example to .env

cat .env
# USERNAME=
# ASSWORD=
```

## Execute

```bash
yarn start
# => console.log()
# => Save log to logs/{DATE}.txt
```
