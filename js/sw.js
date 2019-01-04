self.addEventListener('fetch', function(event) {
	console.log('caught');
	const cache = caches.open('mycache');
	event.responsdWith(
		caches.match(event.request)
		.then(function(response) {
			return response || fetch(event.request);
		})
		.then(function(reponse) {
			cache.put(event.request, response)
			return response;
		})
	);
});