let Stubs = require("./contractStubs.js");

var Blockchain = Stubs.Blockchain;
var LocalContractStorage = Stubs.LocalContractStorage;

let ProjectContract = require("./projectContract.js");

let contract = new ProjectContract();
contract.init();

let project = {
    title: "Супер проект",
    goal: 777
};

//Меняем объект транзакции после каждого обращения к свойству Blockchain.transaction.
//Будет генерироваться новый кошелек (from) и размер тразакции (value) 
Blockchain.changeTransactionAfterGet = false;
let wallet = Blockchain.transaction.from;

contract.createProject(JSON.stringify(project));
let getted = contract.getProjectsByOwner(wallet);
console.log(getted);
