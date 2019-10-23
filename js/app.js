$(function(){

	$('button').bind('click', function(){
		//var cidade = $('#cidade').val();
	//	var now = new Date();

		
		var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
		var method = 'GET';
		var app_id = 'dj0yJmk9ZmpscVVQOVNWVHNRJmQ9WVdrOVRIbEtUVzFQTTJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWM1';
		var consumer_key = '5f1b37ab25aad8615ae8c0598c99741e24de40b9';
		var consumer_secret = '5f1b37ab25aad8615ae8c0598c99741e24de40b9';
		var concat = '&';
		var query = {'location': 'sunnyvale,ca', 'format': 'json'};
		var oauth = {
	    'oauth_consumer_key': consumer_key,
	    'oauth_nonce': Math.random().toString(36).substring(2),
	    'oauth_signature_method': 'HMAC-SHA1',
	    'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
	    'oauth_version': '1.0'
	};

	var merged = {}; 
		$.extend(merged, query, oauth);
		// Note the sorting here is required
		var merged_arr = Object.keys(merged).sort().map(function(k) {
		  return [k + '=' + encodeURIComponent(merged[k])];
		});
		var signature_base_str = method
		  + concat + encodeURIComponent(url)
		  + concat + encodeURIComponent(merged_arr.join(concat));

		var composite_key = encodeURIComponent(consumer_secret) + concat;
		var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
		var signature = hash.toString(CryptoJS.enc.Base64);

		oauth['oauth_signature'] = signature;
		var auth_header = 'OAuth ' + Object.keys(oauth).map(function(k) {
		  return [k + '="' + oauth[k] + '"'];
		}).join(',');

		$.ajax({
		  url: url + '?' + $.param(query),
		  headers: {
		    'Authorization': auth_header,
		    'X-Yahoo-App-Id': app_id 
		  },
		  method: 'GET',
		  success: function(data){
		    console.log(data);
		  }
		});


			});
});