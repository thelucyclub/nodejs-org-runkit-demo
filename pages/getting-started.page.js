const React = require("react");
const { css } = require("emotion");

const Page = require("../components/page");
const markdownStyles = require("../components/markdown-styles");
const CodeBlock = require("../components/markdown/code-block");
const Navigation = require("../components/navigation");
const Window = require("../components/photon/window");


module.exports = function ({ children, ...rest })
{
    return  <Page { ...rest }>
                <head>
                    <link rel = "stylesheet" href = "https://themes.runkitcdn.com/runkit-light.css" />
                    <link rel = "stylesheet" href = "/assets/css/photon.min.css" />
                </head>
                <body css = "padding: 0; margin: 0" >
                    <script src = "https://embed.tonic.work" />
                    <div css = "width: 235px; position:fixed; height: 100vh; overflow: scroll">
                        <Navigation/>
                    </div>
                    <main css = "margin-left:235px; width:calc(100vw - 235px)" >
                        <Window title = "server.js" style = { { position:"absolute", top:"50px", left:"100px", width: "500px" } }>
                            <div style = { { width: "100%" } } id = "x">5+5</div>
                            <script src = "https://embed.tonic.work"
                                data-gutter-style = "inside"
                                data-hide-endpoint-logs = "true"
                                data-mode = "endpoint"
                                data-element-id = "x"/>
                        </Window>
                    </main>
                </body>
            </Page>;
}
