(function ()
{
    const http = require("http");
    const originalCreateServer = http.createServer;
    const { parse } = require("url");
    
    http.createServer = function (handler)
    {
        return originalCreateServer.call(this, function (request, response)
        {
            const { pathname, query } = parse(request.url || request.originalUrl, true);

            if (pathname === "/jefkasjdfkjasdklfjsldkf/iframe")
            {
                const base64 = Buffer.from(query.base64, "base64").toString("utf-8");

                response.setHeader("content-type", "text/html; charset=utf-8");
                response.setHeader("content-length", base64.length);                
    
                return response.end(base64); 
            }
                
            return handler.apply(this, arguments);
        });
    };
})();