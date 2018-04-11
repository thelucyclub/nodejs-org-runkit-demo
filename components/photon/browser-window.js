const React = require("react");
const { css } = require("emotion");

const Window = require("./window");


module.exports = function BrowserWindow({ URL, displayURL = URL, ...rest })
{
    const __html = `
        @keyframes animate-load
        {
            0%   { width:0% }
            100% { width:100% }
        }

        .animate-load
        {
            animation-name: animate-load;
            animation-duration: 0.3s;
        }
    `;

    return  <Window { ...rest } >
                <header>
                    <style dangerouslySetInnerHTML = { { __html } } />
                    <button className = "btn btn-default" style = { styles.locationBar }>
                        <span className = "icon icon-cw" style = { { ...styles.reload, visibility:"hidden" } } />
                        <span style = { styles.location }>{ displayURL }</span>
                        <span className = "icon icon-cw" style = { styles.reload } />
                        <ProgressBar />
                    </button>
                </header>
                <main>
                    <iframe id = "FIXME-browser-iframe" { ...props.iframe } src = { URL } />
                </main>
            </Window>;
}


function ProgressBar()
{
    const style = css`
        position:absolute;
        width:0%;
        height:3px;
        background:rgb(0, 122, 255);
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
        bottom: 0;
        left: 0;`;

    return <span id = "FIXME-browser-progress-bar" className = { style } />
}

const styles =
{
    iframe: { border:0, marign:0, padding:0, height:"100%", width:"100%", background:"transparent" },
    locationBar: { display:"flex", width: "50%", margin:"4px auto", position: "relative" },
    location: { flex: "1 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    reload: { flex:"0 0 auto", transform:"rotate(-90deg)", marginTop:"0px" }
}

const props =
{
    iframe: { style: styles.iframe, frameBorder:0, allowtransparancy: "true", width: "100%", height: "100%" }
}

/*
<input style =  { { width: "45%", height: "25px", margin: "2px auto 3px auto", textAlign: "center" } } className="form-control" type="text" disabled = "true" placeholder="http://foo.com/" />
*/
