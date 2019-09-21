class ValueObject{
    /**
     * @override
     * @returns {String} String from JSON Class
     */
    toString(){
        var jsonClass = {};
        for (let field in this){
            jsonClass[field] = this[field]
        }
        return JSON.stringify(jsonClass)
    }
    /**
     * @returns {JSON} JSON object
     */
    toJSON(){
        var jsonClass = {};
        for (let field in this){
            jsonClass[field] = this[field]
        }
        return jsonClass
    }
}
module.exports = ValueObject;