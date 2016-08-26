
MSIE 6 findings
===============

Regexp
------
* It can indeed split a string into an array of words with a g-flag regexp:
  ```js
  words = '  Hello world\n'.match(/\S+/g);      // verified 2016-08-26
  ```

