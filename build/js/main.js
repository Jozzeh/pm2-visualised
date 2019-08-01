//this starts an interval to update all charts
let utility = new Utility();
let fetcher = new fetches();
let instancevisuals = new instanceVisual();
let systemvisuals = new systemVisual();
let errorvisuals = new errorVisual();
fetcher.processdata().then(result => {
    systemvisuals.renderSystemStatus(1);
    systemvisuals.renderSystemMemory(result);
    systemvisuals.renderSystemAvgLoad(result);
    instancevisuals.render(result);

    setInterval(function(){
        fetcher.processdata().then(result => {
            systemvisuals.renderSystemStatus(1);
            systemvisuals.renderSystemMemory(result);
            systemvisuals.renderSystemAvgLoad(result);
            instancevisuals.renderComponents(result);
        }).catch(err => {
            console.log(err);
            systemvisuals.renderSystemStatus(0);
        });
    }, result.polldelay * 1000);
}).catch(err => {
    console.log(err);
    systemvisuals.renderSystemStatus(0);
});



document.getElementById("warningimg").addEventListener("click", function(){
    document.getElementById("warninglist").innerHTML = "";
});