const React = require("react");
const { css } = require("emotion");

const Page = require("../components/page");
const markdownStyles = require("../components/markdown-styles");
const CodeBlock = require("../components/markdown/code-block");
const Navigation = require("../components/navigation");
const Window = require("../components/photon/window");
const BrowserWindow = require("../components/photon/browser-window");
const RunKit = require("@petrified/runkit");

const { readFileSync } = require("fs");
const toBase64 = require("./getting-started/to-base64");

const IFrameInjectionPreamble = readFileSync(
    require.resolve("./getting-started/iframe-injection-preamble"), "utf-8");

const InjectedIFrameBase64 = toBase64(require("./getting-started/injected-iframe"));
const InlineScript = require("./getting-started/inline-script");


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
    const BrowserWindowStyle =
    {
        position:"absolute",
        top:"50px",
        left:"600px",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        overflow:"hidden",
        width: "500px"
    }

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
                            <main>
                                <RunKit
                                    style = { { margin:"-1px", width: "500px", height: 500 } }
                                    gutterStyle = "inside"
                                    hideEndpointLogs = { true }
                                    preamble = { IFrameInjectionPreamble }
                                    mode = "endpoint"
                                    onLoad = "onLoad"
                                    children = { [code] } />
                            </main>
                        </Window>
                        <InlineScript
                            from = { RUN }
                            constants = { { InjectedIFrameBase64 } } />
                        <BrowserWindow
                            displayURL = "https://localhost"
                            style = { BrowserWindowStyle }
                            innerHeight = "490px" />
                    </main>
                </body>
            </Page>;
}

const code =`
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\\n');
});

server.listen(port, hostname, () => {
  console.log("Server running at http://{hostname}:{port}/");
});`;

function RUN()
{
    window.onLoad = function (embed)
    {
        
        embed
            .getShareableURL()
            .then(function ()
            {
                const endpointURL = embed.endpointURL;
                const iframe = document.getElementById("FIXME-browser-iframe");
/*
                window.addEventListener("message", function ({ source, origin, data })
                {
                    if (source !== iframe.contentWindow)
                        return;

                    if (data === "ready")
                        iframe.src = embed.endpointURL;
                });*/

                setTimeout(function () {
                iframe.src = embed.endpointURL +
                    "/jefkasjdfkjasdklfjsldkf/iframe?base64=" +
                    encodeURIComponent("InjectedIFrameBase64");
                }, 1000);
            });
    }
}

//https://untitled-i2i0dnt2fghj.runkit.sh
//"https://untitled-mgqqsut1u44l.tonic.sh?url=" + encodeURIComponent(shareableURL);

