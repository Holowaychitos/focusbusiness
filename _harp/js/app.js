function dispatch(label, optional) {
	console.info('DISPATCH: ', label);
	mixpanel.track(label);
}

$(function() {
	dispatch('pageview');

	$('[data-start-now]').on('click', function() {
		dispatch('register-first');

		window.setTimeout(function() {
			if (Math.random() > 0.5) {
				dispatch('register-second');
			}
		}, 500);

		$('[data-start-now]').each(function() {
			$(this).replaceWith('Oops... aún no estamos listos. ¡Gracias por mostrar interés!');
		});
	})
});