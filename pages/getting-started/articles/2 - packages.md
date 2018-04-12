# Using Packages

Another huge benefit of developing with Node is that it has the
largest and most active package ecosystem, [npm](http://npmjs.com).
With over **700,000 packages**, chances are someone's already
implemented the peices you need for your project! Let's write a
small utility that searches animated gifs and you'll see how it
feels like assembling the right parts. Just as before, feel
free to experiment and require other packages -- all 700,000
are already preinstalled in this tutorial.


```js runkit title=gif-search.js
const findGif = require("gif-search").query;
const app = require("express")();

app.get("/", async (req, res) => {
    const keywords = req.query.keywords;
    const img = `<img src = "${await findGif(keywords)}"/>`;
    const styles = `<style>
        img { display: block; margin: 0 auto }
    </style>`;

    res.send(img + styles);
})

app.listen(3000)
```
