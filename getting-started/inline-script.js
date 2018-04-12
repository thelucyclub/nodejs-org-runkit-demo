const React = require("react");


module.exports = function InlineScript({ from, constants })
{
    const __html = template("(" + from +")()", constants || { });
    return <script dangerouslySetInnerHTML = { { __html } } />
}

function template(template, constants)
{
    return Object.keys(constants).reduce((template, key) =>
        template.replace(new RegExp(key, "g"), constants[key]),
        template);
}
