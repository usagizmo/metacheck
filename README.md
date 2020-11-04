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

Set the basic authentication information and request URLs in settings.json

```bash
yarn setup
# => Copy .env.example to .env

cat settings.json
# {
#   "basicAuth": false,
#   "username": "",
#   "password": "",
#   "urlList": ["https://example.com"]
# }
```

## Execute

```bash
yarn start
# => console.log()
# => Save log to logs/{DATE}.txt
```
