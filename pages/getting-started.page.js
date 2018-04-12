const React = require("react");
const { css } = require("emotion");

const Page = require("../components/page");
const markdownStyles = require("../components/markdown-styles");
const CodeBlock = require("../components/markdown/code-block");
const Navigation = require("../components/navigation");
const Window = require("../components/photon/window");
const BrowserWindow = require("../components/photon/browser-window");
const RunKit = require("@petrified/runkit");

const { readFileSync, readdirSync } = require("fs");
const toBase64 = require("./getting-started/to-base64");

const IFrameInjectionPreamble = readFileSync(
    require.resolve("./getting-started/iframe-injection-preamble"), "utf-8");

const InjectedIFrameBase64 = toBase64(require("./getting-started/injected-iframe"));
const InlineScript = require("./getting-started/inline-script");

const examplesPath = `${__dirname}/getting-started/examples/`;
const examples = readdirSync(examplesPath)
    .map((filename, index) =>
    ({
        title: filename.replace(/^\d+-/g, ""),
        source: readFileSync(`${examplesPath}/${filename}`, "utf-8"),
        active: index === 0
    }));

/*const articles = const examples = readdirSync(articlesPath)
    .map((filename, index) =>
    ({
        source: readFileSync(`${articlesPath}/${filename}`, "utf-8"),
        active: index === 0
    }));*/

const cm = require("@petrified/build/transform/common-mark")

function articles()
{
    const { readFileSync: read } = require("fs");
    const components = { CodeBlock: Article.Code };
    const articlesPath = `${__dirname}/getting-started/articles/`;

    return readdirSync(articlesPath)
        .filter(source => source.charAt(0) !== ".")
        .map(source => `${articlesPath}/${source}`)
        .map(source => ({ source, markdown: read(source, "utf-8"), components }))
        .map(items => ({ ...items, markup: cm.render(items) }));
}

module.exports = function ({ children, ...rest })
{
    const WindowStyle =
    {
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        position: "relative",
        margin: "0 auto"
    }
    const RunKitWindowStyle =
    {
        ...WindowStyle,
        overflow:"hidden"
    };

    return  <Page { ...rest }>
                <head>
                    <link rel = "stylesheet" href = "https://themes.runkitcdn.com/runkit-light.css" />
                    <link rel = "stylesheet" href = "/assets/css/photon.min.css" />
                </head>
                <body css = "padding: 0; margin: 0; background-image: linear-gradient(to right, rgba(6, 16, 65, 1.0) 235px, #fff 235px, #fff calc(117px + 50vw), #f5f5f5 calc(117px + 50vw));" >
                    <script src = "https://embed.tonic.work" />
                    <div css = "width: 235px; position:fixed; height: 100vh; overflow: scroll">
                        <Navigation/>
                    </div>
                    <main css = "margin-left:235px; width:calc(100vw - 235px);" >
                        { articles().map((article) => <Article article = { article }>{ article.markup }</Article>) }
                    </main>
                    <InlineScript
                            from = { RUN }
                            constants = { { InjectedIFrameBase64 } } />
                </body>
            </Page>;
}

function MD({ children })
{
    return  <div>
                <h1>Getting Started with Node.js</h1>
                <div className = { markdownStyles + " margins fluid-content" } >
                    { children }
                </div>
            </div>
}

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
                const progressBar = document.getElementById("FIXME-browser-progress-bar");

                window.addEventListener("message", function ({ source, origin, data })
                {
                    if (source !== iframe.contentWindow)
                        return;

                    if (data === "fetched")
                    {
                        progressBar.classList.remove("animate-load");
                        setTimeout(() =>
                            progressBar.classList.add("animate-load"), 0);
                    }
                });

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

function Article({ children })
{
    const styles = css`
        min-height: 100vh;
        display: block;
        width: 100%;
        user-select: initial;

        & > main
        {
            width: 50%;
            max-width: 50%;
            padding: 0px 50px 0px 50px;
        }
        
        & > figure
        {
            margin-top: 40px;
            display: flex;
            padding: 0px 50px;
            justify-content: space-between;
            align-items: stretch;
        }
        
        .window
        {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            position: relative;
            overflow: hidden;
            flex: 1 0 0;
        }
        
        .window:first-child { margin-right: 50px }
        .window:last-child { margin-left: 50px }
        
        main > code.inline
        {
            color: rgba(164,115,221,1.0);
            background: rgba(246,247,252,1.0);
            font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
            border-radius: 5pt;
            font-size: 0.77em;
            padding: 0.33em .55em;
        }
    
        main > p
        {
            font-size:16px;
            line-height:27.2px;
            margin-bottom: 1.2em;
            padding: 10px 0px 1px 0px;
        }
    
        main > h1
        {
            font-size: 2.2em;
            margin-top: 0.8em;
        }
    
        main > h2
        {
            margin-top: 1em;
            font-size: 1.2em;
            font-weight: bolder;
            text-transform: uppercase;
            margin: 30px 0 15px 0;
        }
        
        @keyframes motion {
            from { transform: rotate(0deg) translate(-7px) rotate(0deg); }
            to { transform: rotate(360deg) translate(-7px) rotate(-360deg); }
        }
/*
        .pointer
        {
            background: url(./images/pointer.svg);
            background-size: 100% 100%;
            position: absolute;
            color: white;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 0.9em;
            top: 68px;
            left: 250px;
            width: 170px;
            height: 61px;
            padding: 18px 0 0 2.2em;
            text-align: center;
            animation: motion 2s linear infinite;
        }*/`;

    const fence = require("@petrified/runkit/fence");
    const isCode = child => child.type === Article.Code;
    const lastExampleIndex = children.findIndex(isCode);
    const prose = children.slice(0, lastExampleIndex);
    const examples = children.slice(lastExampleIndex)
        .map(({ props: { literal, codeinfo } }) =>
            ({ literal, fence: fence(codeinfo) }));
    const tabs = examples.map(({ fence: { title } }, index) =>
        ({ title, active: index === 0 }));

    return  <article css = { styles }>
                <main>
                    { prose }
                </main>
                <figure>
                    <Window title = { examples[0].fence.title } >
                        { tabs.length > 1 && <Window.Tabs items = { tabs } /> }
                        <main>
                            {/* <div className = "pointer">
                                Try changing this
                            </div> */ }
                            <RunKit
                                style = { { margin:"-1px", height: 350 } }
                                gutterStyle = "inside"
                                hideEndpointLogs = { true }
                                preamble = { IFrameInjectionPreamble }
                                mode = "endpoint"
                                onLoad = "onLoad"
                                hideActionButton = { true }
                                children = { [examples[0].literal] } />
                        </main>
                    </Window>
                     <BrowserWindow
                        displayURL = "http://localhost:8000"
                        innerHeight = "100px" />
                </figure>
            </article>;
}

Article.Code = function ({ codeinfo, literal })
{
    return <code { ...{ codeinfo, literal } } />;
}


function styles()
{

}
