function dispatch(label, optional) {
	console.info('DISPATCH: ', label);
	mixpanel.track(label);
}

$(function() {
	dispatch('pageview');

	$('[data-start-now]').on('click', function() {
		dispatch('register-first');

		var amount = Math.max(parseInt($('[data-start-amount]')[0].val(), 10), parseInt($('[data-start-amount]')[1].val(), 10));

		console.warn(amount);

		// location.href = '/invest.html?amount=' + ;
	})
});