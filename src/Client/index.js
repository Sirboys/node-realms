const RealmsClient = require("./Methods")
const RealmsServerList = require("../Classes/RealmsServerList");
const RealmsServer = require("../Classes/RealmsServer");
const PlayerInfo = require("../Classes/PlayerInfo");
//const RealmsServer = require("../Classes/RealmsServer");
const RealmsNews = require("../Classes/RealmsNews");

class Realms{
    constructor (accessToken,version,username){
        this.client = new RealmsClient(accessToken,version,username);
    }
    
    /**
     * @returns {Boolean}
     */
    get trial(){
        return this.client.trial();
    }
    get availability(){
        return this.client.checkAvailable();
    }
    get compatible(){
        return this.client.checkCompatiables();
    }
    get invitesCount(){
        return this.client.invitesCount();
    }
    get worlds(){
        return new RealmsServerList(this.client.worlds(),this.client);
    }
    get news(){
        return new RealmsNews(this.client.news());
    }
    world(id){
        return new RealmsServer(this.client.world(id),this.client);
    }
    
}
module.exports = Realms;