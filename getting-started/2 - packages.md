# Packages Make Programming Easier

Now let's make a significantly more advanced server with very little extra
work. The example below responses with *screenshots* of other websites. 
The reason this is so easy is because Node has the **largest and most active 
package ecosystem**. With over 700,000 packages, chances are someone's 
already implemented what you're looking for!

```js runkit title=simple.js
const http = require("http");

// Create a server that always returns "Hello World!".
const server = http.createServer((req, res) => {
  res.end("Hello World!");
});

// Start the server
server.listen(8000, () => {
  console.log("Server started on port 8000!");
});
```
