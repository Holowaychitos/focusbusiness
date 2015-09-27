function dispatch(label, optional) {
	console.info('DISPATCH: ', label);
	mixpanel.track(label);
}

$(function() {
	dispatch('pageview');

	$('[data-start-now]').on('click', function() {
		dispatch('register-first');

		var firstAmount = parseInt($('[data-start-amount]')[0].value, 10) || 0;
		var secondAmount = parseInt($('[data-start-amount]')[1].value, 10) || 0;

		var amount = Math.max(firstAmount, secondAmount, 5000);

		location.href = '/invest.html?amount=' + amount;
	})
});