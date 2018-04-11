const React = require("react");


module.exports = Tabs({ items })
{
    return  <div className = "tab-group">    
            {
                items.map((item, index) =>
                    <div className = "tab-item" key = { index } >
                        <span className = "icon icon-cancel icon-close-tab" />
                        { item }
                    </div>)
            }
            </div>;
}
