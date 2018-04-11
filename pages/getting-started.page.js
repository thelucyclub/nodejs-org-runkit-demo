const React = require("react");
const { css } = require("emotion");

const Page = require("../components/page");
const markdownStyles = require("../components/markdown-styles");
const CodeBlock = require("../components/markdown/code-block");
const Navigation = require("../components/navigation");
const Window = require("../components/photon/window");
const RunKit = require("@petrified/runkit");


module.exports = function ({ children, ...rest })
{
    const RunKitWindowStyle =
    {
        position:"absolute",
        top:"50px",
        left:"100px",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        overflow:"hidden"
    };

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
                        <Window
                            title = "server.js"
                            style = { RunKitWindowStyle }>
                            <RunKit
                                style = { { margin:"-1px", width: "500px", height: 500 } }
                                gutterStyle = "inside"
                                hideEndpointLogs = { true }
                                mode = "endpoint" >
                                5 + 5;
                            </RunKit>
                        </Window>
                    </main>
                </body>
            </Page>;
}
