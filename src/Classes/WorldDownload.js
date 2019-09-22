const ValueObject = require("./ValueObject");
//const https = require("https");

class WorldDownload extends ValueObject{
    constructor(unparsedJSON){
        super();
        try {
            let parsedJSON = JSON.parse(unparsedJSON);
            this.downloadLink = parsedJSON.downloadLink || "";
            this.resourcePackUrl = parsedJSON.resourcePackUrl || "";
            this.resourcePackHash = parsedJSON.resourcePackHash || "";
        } catch (error) {
            console.error("Could not parse WorldDownload: " + e);
        }
    }
}
module.exports = WorldDownload;