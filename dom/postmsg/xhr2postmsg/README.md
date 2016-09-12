
xhr2postmsg
===========
Display a patched version someone else's website using XHR and PostMessage.

There's this [tutorial from 1998][pbourke-pstut] that has a big
UX problem with its code examples: They code snippets are embedded
as images that link to a text version of the snippet, but that text
version is sent with a Content-Type that makes Firefox prompt to
download them instead of just displaying them.

Let's fix that!
Let's add each snippet's code as text in a resizeable textarea.

Since we cannot install the proxy page directly on the source website,
we'll ask our [proxy page on the Wayback Machine][wayback-proxy]
to give us an [archived version of the tutorial][wayback-pstut].

  [pbourke-pstut]: http://paulbourke.net/dataformats/postscript/
  [wayback-proxy]: http://web.archive.org/web/
  [wayback-pstut]: http://web.archive.org/web/20160401223404/http://paulbourke.net/dataformats/postscript/
