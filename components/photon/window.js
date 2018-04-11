const React = require("react");
const { css } = require("emotion");


module.exports = function Window({ title = "", style, children })
{
    return  <div className = { `window ${styles()}` } style = { style } >
                <header className = "toolbar toolbar-header">
                    <div className = "window-buttons">
                        <button className = "close"></button>
                        <button className = "minimize"></button>
                        <button className = "maximize"></button>
                    </div>
                    <h1 id = "title" className = "title">{ title }</h1>
                </header>
                <main id = "window-content" className = "window-content">
                    { children }
                </main>
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

        .window-buttons
        {
            margin:0;
            padding: 0;
            margin-left: 5px;
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
            display:inline-block;

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
