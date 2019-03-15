# url-utm-params [![Build Status](https://travis-ci.org/deepaksalve/url-utm-params.svg?branch=master)](https://travis-ci.org/deepaksalve/url-utm-params)
NodeJs utitlity to get UTM params from url and to build a url with UTM params.

UTM parameters as query params in a URL identify the campaign that refers to the traffic to a specific website.

## Install
```
$ npm install --save url-utm-params
```
## API
- #### utm(link, sep)
  - This takes two params a link and sep.
  - The `link` parameter is complete link with query params. This is a required param.
    - e.g.
      ```javascript
      utm('localhost.com/node-url-utm?utm_source=facebook&utm_medium=social');
      // {
      //   utm_source: 'facebook',
      //   utm_medium: 'social'
      // }
      ```
  - The `sep` is a optional parameter, but it is need to be specified if the url query has a separator other than '&'.
    - e.g.
      ```javascript
      utm('localhost.com/node-url-utm?utm_source=facebook,utm_medium=social', ',');
      // {
      //   utm_source: 'facebook',
      //   utm_medium: 'social'
      // }
      ```
  - This function always returns an object with or without UTM params.

- #### strict(link, sep)
  - This function is a special case of the function 'utm'. It returns an object of only those utm params which are valid.
  - The valid utm params are `'utm_source',  'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'`.

- ##### build(link, utms, isStrict)
  - This function is used to form a url with utm params.
  - It takes three params, link and utms are the required params and isStrict is flag used to build url only with the valid urls.
  - e.g.
    ```javascript
    const link = 'localhost.com/url-utm-params';
    const params = {
      utm_source: 'facebook',
      utm_medium: 'social',
      custom_param: 'custom'
    };
    const isStrict = true;

    build(link, params, isStrict); // 'localhost.com/url-utm-params?utm_source=facebook&utm_medium=social'
    ```

## License
MIT
