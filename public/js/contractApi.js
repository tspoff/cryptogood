const CONTRACT_ADDRESS = "n1rFJ6ro5GGotHgyiCBhRh2LMkkj1bgohR1";

class SmartContractApi {
    constructor(contractAdress) {
        let NebPay = require("nebpay"); 
        this.nebPay = new NebPay();
        this._contractAdress = contractAdress || CONTRACT_ADDRESS;
    }

    getContractAddress() {
        return this.contractAdress;
    }

    _simulateCall({ value = "0", callArgs = "[]", callFunction , callback }) {
        this.nebPay.simulateCall(this._contractAdress, value, callFunction, callArgs, {  
            callback: function(resp){
                if(callback){
                    callback(resp);
                }           
            }   
        });
    }
    
    _call({ value = "0", callArgs = "[]", callFunction , callback }) {
        this.nebPay.call(this._contractAdress, value, callFunction, callArgs, {  
            callback: function(resp){
                if(callback){
                    callback(resp);
                }           
            }   
        });
    } 
}

class ProjectContractApi extends SmartContractApi{
    createProject(project, cb) {
        this._call({
            callArgs : JSON.stringify([JSON.stringify(project)]),
            callFunction : "createProject", 
            callback: cb
        });
    }
    
    getProjectCount(cb) {
        this._simulateCall({
            callFunction : "getProjectCount", 
            callback: cb
        });
    }
    
    getProjectById(id, cb) {
        this._simulateCall({
            callArgs : `[${id}]`,
            callFunction : "getProjectById", 
            callback: cb
        });;
    }
    
    getProjectsByOwner(wallet, cb) {
        this._simulateCall({
            callArgs : `["${wallet}"]`,
            callFunction : "getProjectsByOwner", 
            callback: cb
        });;
    }

    getProjects(limit, offset, cb) {
        this._simulateCall({
            callArgs : `[${limit}, ${offset}]`,
            callFunction : "getProjectsWithContributions", 
            callback: cb
        });;
    }

    getSupportersByProject(id, cb) {
        this._simulateCall({
            callArgs: `[${id}]`,
            callFunction: "getProjectSupporters",
            callback: cb
        });;
    }

    getContributionsByProject(id, cb) {
        this._simulateCall({
            callArgs: `[${id}]`,
            callFunction: "getProjectContributions",
            callback: cb
        });;
    }

    addToFavorites(projectId, cb) {
        this._call({
            callArgs : `[${projectId}]`,
            callFunction : "addToFavorites", 
            callback: cb
        });;
    }

    removeFromFavorites(projectId, cb) {
        this._call({
            callArgs : `[${projectId}]`,
            callFunction : "removeFromFavorites", 
            callback: cb
        });;
    }

    getFavorites(cb) {
        this._simulateCall({
            callArgs : `[]`,
            callFunction : "getFavorites", 
            callback: cb
        });;
    }

    getSupported(cb) {
        this._simulateCall({
            callArgs : `[]`,
            callFunction : "getSupported", 
            callback: cb
        });;
    }

    support(projectId, cb) {
        this._call({
            callArgs : `[${projectId}]`,
            callFunction : "support", 
            callback: cb,
            value: ""        
        });;
    }
}
