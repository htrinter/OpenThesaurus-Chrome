$(document).ready(function(){

	// enter key listener for text field
	$('#tword').keypress(function(e) {
        if(e.which == 13) {
        	lookUp($('#tword').val());
        }
    });

	// onlick listener for result items
	$(document).delegate("#results p span", "click", function(){
		var newWord = $(this).text();
		$('#tword').val(newWord);
		lookUp(newWord);
	});

});


// performs api request
function lookUp(word) {

	$.get('http://www.openthesaurus.de/synonyme/search?q=' + encodeURIComponent(word) + '&format=application/json')
		.done(function(data) {
			// display result
  			showResults(data);
  		}
  	);

	$('#tword').select();
}


// processes and displays data
function showResults(resultData) {
	result = "";

	// go through every synset
	for(var synsetIndex in resultData['synsets']) {

		var synsetResult = '';

		// go through every term in a synset
		for(var termIndex in resultData['synsets'][synsetIndex]['terms']) {
			var term = resultData['synsets'][synsetIndex]['terms'][termIndex]['term'];
			synsetResult = synsetResult + '<span>' + term + '</span>' + '<br>';
		}

		result = result +  '<p>' + synsetResult + '</p>\n';
		result = result.replace('<br></p>', '</p>');
	}

	// display results
	$('#results').html(result);
}