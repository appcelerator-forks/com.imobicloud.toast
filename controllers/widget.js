var args = arguments[0] || {},
	cancelHide = false,
	hasGap = OS_IOS && args.hasNavBar == 'false';

init();
function init() {
	if (hasGap) {
		$.toast.add( $.UI.create('View', { height: 20 }) );
	}
}

/*
 e= {
 	message: '', // required
 	
 	type: 'error', // success, error, info
 	duration: 3000, // duration == 0 will disable auto hide
 	title: '',
	callback: function(e){},
	timeout: function(e){},
	singleton: false
 }
 * */
exports.show = function(e) {
	var container = $.toast;
	
	if (e.singleton && container.children.length > (hasGap ? 1 : 0))	{
		return;
	}
	
	var message = Widget.createController('message', e).getView();
	message.addEventListener('toast:hide', hideToast);
	container.add(message);
	
	var children = container.children,
		count = children.length;
		
	if (hasGap) {
		children[0].backgroundColor = children[1].backgroundColor;
		count--;
	}
	
	if (count > 1) {
		cancelHide = true;
	} else {
		container.animate({ opacity: 1, duration: 300 });
	}
};

function hideToast() {
	var children = $.toast.children,
		count = children.length;
	
	if (hasGap) {
		if (count > 1) {
			children[0].backgroundColor = children[1].backgroundColor;
		}
		count--;
	}
	
	if (count == 0 && cancelHide == false) {
		$.toast.animate({ opacity: 0, duration: 300 });
	}
	
	cancelHide = false;
}