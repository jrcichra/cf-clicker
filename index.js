addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  //only accept GET requests to /
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.pathname !== '/') {
    return new Response('Not Found', { status: 404 })
  }
  const key = "clicks";
  let value = Number(await cf_clicker.get(key));
  if (value == null) {
    //need to put the key for the first time
    value = 1;
  } else {
    value += 1;
  }
  await cf_clicker.put(key, value);
  return new Response(`This page has been visited ${value} times`, {
    headers: { 'content-type': 'text/plain' },
  });

}
