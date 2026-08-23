// Restores the real path after the 404.html redirect (see public/404.html),
// before React Router reads the URL. Runs only when it sees the ?/ marker, so
// normal visits are untouched.
//
// This lives in its own file rather than inline in index.html so the Content
// Security Policy can use `script-src 'self'` without needing 'unsafe-inline'
// or a hash that would silently break the site if the snippet ever changed.
(function (l) {
  if (l.search[1] === '/') {
    var decoded = l.search
      .slice(1)
      .split('&')
      .map(function (s) {
        return s.replace(/~and~/g, '&');
      })
      .join('?');
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
})(window.location);
