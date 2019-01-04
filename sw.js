console.log('Registered Service Worker');
self.addEventListener('fetch', function(event) {

	event.respondWith(
		// Checking cache
		caches.match(event.request)
		.then(function(response) {
			// Found in cache
			if(response) {
				return response;
			}
			// Fetch from network
			else {
				addToCache(event);
				return fetch(event.request);
			}
		})
		.catch(error => throwError('cache matching', error))
	);
});

function addToCache(event) {

	// Check for http or https url
	if(event.request.url.startsWith('http')) {
		// Add to cache
		caches.open('mycache')
		.then(function(cache) {
			cache.add(event.request)
			.catch(error => throwError('adding file to cache', error));
		})
		.catch(error => throwError('cache opening', error));
	}
}

function throwError(location, error) {
	console.log(`Error in ${location}:  ${error}`)
}