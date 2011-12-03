function prettyDate(time) {
	var date = (time instanceof Date) ? time : new Date((time || '').replace(/-/g,'/').replace(/[TZ]/g,' ')),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
	if (isNaN(day_diff) || day_diff >= 31) {
		return;
	}
		
    if (day_diff < 0) {
		return prettyInDate(time);
    }
			
	return day_diff == 0 && (
			diff < 60 && 'just now' ||
			diff < 120 && '1 minute ago' ||
			diff < 3600 && Math.floor( diff / 60 ) + ' minutes ago' ||
			diff < 7200 && '1 hour ago' ||
			diff < 86400 && Math.floor( diff / 3600 ) + ' hours ago') ||
		day_diff == 1 && 'Yesterday' ||
		day_diff < 7 && day_diff + ' days ago' ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + ' weeks ago';
}

function prettyInDate(time) {
	var date = (time instanceof Date) ? time : new Date((time || '').replace(/-/g,'/').replace(/[TZ]/g,' ')),
		diff = ((date.getTime() - (new Date()).getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);

	return day_diff == 0 && (
			diff < 60 && 'soon' ||
			diff < 120 && 'in' + ' 1 minute' ||
			diff < 3600 && 'in' + ' ' + Math.floor( diff / 60 ) + ' minutes' ||
			diff < 7200 && 'in' + ' 1 hour' ||
			diff < 86400 && 'in' + ' ' + Math.floor( diff / 3600 ) + ' hours') ||
		day_diff == 1 && 'tommorrow' ||
		day_diff < 7 && 'in' + ' ' + day_diff + ' days' ||
		day_diff < 31 && 'in' + ' ' + Math.ceil( day_diff / 7 ) + ' weeks';
}

function prettyLeftDate(time) {
	var date = (time instanceof Date) ? time : new Date((time || '').replace(/-/g,'/').replace(/[TZ]/g,' ')),
		diff = ((date.getTime() - (new Date()).getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);

	return day_diff == 0 && (
			diff < 60 && 'soon' ||
			diff < 120 && '1 minute left' ||
			diff < 3600 && Math.floor( diff / 60 ) + ' minutes left' ||
			diff < 7200 && '1 hour left' ||
			diff < 86400 && Math.floor( diff / 3600 ) + ' hours left') ||
		day_diff == 1 && 'tommorrow' ||
		day_diff < 7 && day_diff + ' days left' ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + ' weeks left';
}
