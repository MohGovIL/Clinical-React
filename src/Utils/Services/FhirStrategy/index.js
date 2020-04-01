
var FhirStrategy = function(){
    this.strategy = null;
}

FhirStrategy.prototype ={
    setStrategy : function(obj){
        this.strategy = obj;
    },
    doWork: function(params){
        return this.strategy.doWork(params)
    }
}

