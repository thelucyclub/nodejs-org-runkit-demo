const React = require("react");
const { css } = require("emotion");

const Window = require("./window");


module.exports = function BrowserWindow({ URL, displayURL = URL, ...rest })
{
    return  <Window { ...rest } >
                <header>
                    <button className = "btn btn-default" style = { styles.locationBar }>
                        <span className = "icon icon-cw" style = { { ...styles.reload, visibility:"hidden" } } />
                        <span style = { styles.location }>{ URL }</span>
                        <span className = "icon icon-cw" style = { styles.reload } />
                    </button>
                </header>
                <main>
                    <iframe id = "FIXME-browser-iframe" { ...props.iframe } src = { URL } />
                </main>
            </Window>;
}


const styles =
{
    iframe: { border:0, marign:0, padding:0, height:"100%", width:"100%", background:"transparent" },
    locationBar: { display:"flex", width: "50%", margin:"4px auto" },
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
