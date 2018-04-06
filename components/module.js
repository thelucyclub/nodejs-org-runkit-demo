const React = require("react");
const { css } = require("emotion");

const Page = require("./page");
const markdownStyles = require("./markdown-styles");
const CodeBlock = require("./markdown/code-block");


module.exports = function ({ children, ...rest })
{
    if (!children)
        return <div/>;

    const sections = toSections(children);

    return  <Page { ...rest }>
                <head>
                    <link rel = "stylesheet" href = "https://fonts.googleapis.com/css?family=Roboto" />
                </head>
                <body css = "font-family: Roboto; font-size:16px;" >
                    <main className = { markdownStyles + " margins fluid-content" } >
                    {
                        sections.map(section =>
                            <section css = "display: flex">
                                <div css = "flex:1; position: sticky" >
                                    { section.header }
                                    { section.children }
                                </div>
                                <div css = "flex:1; position: sticky; border-left:1px solid rgb(221, 221, 221); 
;background: #f5f5f5; box-sizing:border-box; padding:50px;" >
                                    { section.example }
                                </div>
                            </section>)
                    }
                    </main>
                </body>
            </Page>;
}

function toSections(children)
{
    const sections = [];

    for (const child of children)
    {
        console.log(child);

        if (child.props.level === 1 || child.props.level === 2 || child.props.level === 3)
            sections.push({ header:[child], children:[] });

        else if (child.type === CodeBlock)
            sections[sections.length - 1].example = child;
        else
            sections[sections.length - 1].children.push(child);
    }
    
    return sections;
}

