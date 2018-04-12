
module.exports = function toBase64(string)
{
    return Buffer.from(string, "utf-8").toString("base64");
}
