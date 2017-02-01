var request = require('request');
request('https://jsonplaceholder.typicode.com/posts/1',{json: true}, function (error, response, body) {
if (!error && response.statusCode == 200) {
  console.log(response);
  console.log(body) // Show the HTML for the Google homepage.
}
})
