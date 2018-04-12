const React = require("react");
const { css } = require("emotion");
const Defaults = { };


module.exports = Window;

function Window({ className, title = "", style, innerHeight, children })
{
    const { header, main, rest } = find(["header", "main"], children);

    return  <div className = { `window ${styles()}` } style = { style } >
                <Toolbar header = { header } title = { title } />
                { rest }
                <WindowContent { ...{ main, innerHeight } } />
            </div>
}

Window.Tabs = function Tabs({ items })
{
    return  <div className = "tab-group">
            {
                items.map(({ active, closable, title }, index) =>
                    <div    key = { index }
                            className = { `tab-item ${active ? "active" : "" }` }  >
                        {
                            closable &&
                            <span className = "icon icon-cancel icon-close-tab" />
                        }
                        { title }
                    </div>)
            }
            </div>;
}

function Toolbar({ header, title })
{
    if (!header)
        return  <header className = "toolbar toolbar-header">
                    <WindowButtons />
                    <h1 id = "title" className = "title">{ title }</h1>
                </header>;

    const props = header.props;
    const className = "toolbar toolbar-header" + (props.className || "");
    const children = [<WindowButtons />].concat(props.children || []);

    return <header { ... { ...props, className, children } } />;
}

function WindowContent({ main, innerHeight })
{
    const props = main ? main.props : { };
    const className = "window-content" + (props.className || "");

    const style = innerHeight !== void(0) ?
        { ...props.style, height: innerHeight } :
        props.style;

    return  <main { ...{ ...props, style, className } } />;
}

function WindowButtons()
{
    return  <div className = "window-buttons">
                <button className = "close"></button>
                <button className = "minimize"></button>
                <button className = "maximize"></button>
            </div>
}

function styles()
{
    return css `
        font-family: system, -apple-system, 
            ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica,
            "Segoe UI", sans-serif;
        font-size: 13px;
        top: initial;
        left: initial;
        right: initial;
        bottom: initial;
        box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 30px 0px;
        border-top-left-radius:6px;
        border-top-right-radius:6px;
        border:1px solid rgb(190, 190, 190);

        /* don't understand. */
        .tab-group
        {
            z-index: 100;
        }

        .window-buttons
        {
            margin:0;
            padding: 0;
            margin-left: 15px;
            height:100%;
            min-height:20px;
            position: absolute;
            width: calc(12px * 3 + 8px * 2);
            display: flex;
            flex-direction: row;
            align-items: center;
            align-content: center;
            justify-content:space-between;
        }
    
        .window-buttons button
        {
            border-radius: 50%;
            height: 12px;
            width: 12px;
            flex: none;
            margin: 0;
            padding: 0;
        }
    
        .window-buttons button.close
        {
            background-color:rgba(255,69,68,1);
            border:1px solid rgba(245,19,19,1);
        }
    
        .window-buttons button.minimize
        {
            background-color:rgba(255,192,0,1);
            border:1px solid rgba(233,161,19,1);
        }
    
        .window-buttons button.maximize
        {
            background-color:rgba(0,214,70,1);
            border:1px solid rgba(19, 182, 47, 1);
        }
    
        .window
        {
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            overflow-x: hidden;

            box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 30px 0px;
            -webkit-box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 30px 0px;
            box-sizing: border-box;

            border-radius:6px;
            border:1px solid rgb(190, 190, 190);
            position:relative;

            z-index: 1;
            margin:0 auto;
        }
    
        .toolbar
        {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            position: relative;
        }

        .window-content
        {
            width: auto;
            min-width: 100%;
            overflow: inherit;
            user-select: default;
            display: block;
        }
    
      
    
        body
        {
            padding:20px;
        }
        
        /*
    .window-content
    {
        border:0px;
        vertical-align: top;
        border-bottom-left-radius:5px;
        border-bottom-right-radius:5px;
        overflow: hidden;-webkit-user-select: text;
        color:white;
        font:14px 'Menlo';
        padding:3px 5px;
        line-height: 20px;
        margin: 0;
        word-wrap: break-word;
        display:block;
        overflow: scroll;
        background-color:black;
        min-height:300px;
    }

    #content
    {
        white-space: pre;
        -webkit-user-select: text;
    }

    #measure
    {
        font:14px 'Menlo', monospace;
        position:fixed;
        top:-10000px;
    }

    #content
    {
        white-space: pre;
        -webkit-user-select: text;
    }*/
    `;
}


function find(tags, children)
{
    const names = tags.reduce((names, tag) =>
        Object.assign(names, { [tag]: tag }),
        Object.create(null));
    const rest = [];

    return [].concat(children)
        .reduce((findings, child) =>
            child && typeof child.type === "string" &&
            hasOwnProperty.call(names, child.type) ?
                Object.assign(findings, { [child.type]: child }) :
                (rest.push(child), findings),
            { rest });
}
