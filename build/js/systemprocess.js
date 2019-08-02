class systemVisual {

    renderSystemStatus(online) {
        let healthelement = document.getElementById("health");
        if(online){
            healthelement.innerText = "ONLINE";
            healthelement.className = "bg-success";
        }else{
            healthelement.innerText = "OFFLINE";
            healthelement.className = "bg-danger";
            errorvisuals.addError("System offline");
        }
    }

    renderSystemMemory(data) {
        let memoryelement = document.getElementById("memory");
        let totalmemory = Math.floor(parseInt(data.system.totalmem) / 1048576);
        let usedbytesmemory = parseInt(data.system.totalmem) - parseInt(data.system.freemem);
        let usedmemory = parseFloat(usedbytesmemory / 1048576).toFixed(2);
        let memoryscale = "Mb";

        if(totalmemory > 1024){
            totalmemory = parseInt(Math.floor(totalmemory / 1000));
            usedmemory = parseFloat(usedmemory / 1000).toFixed(2);
            memoryscale = "Gb";
        }

        let percentagememory = usedmemory / totalmemory * 100;
        memoryelement.innerHTML = usedmemory + memoryscale + " <span>/ " + totalmemory + memoryscale + " memory used</span>";
        if(percentagememory > data.alerts.danger){
            memoryelement.className = "bg-danger";
            errorvisuals.addError("System memory dangerously low");
        }else if(percentagememory > data.alerts.warning){
            memoryelement.className = "bg-warning";
            // We are not logging low memory due to the differences of how OS's use or reserve their memory
            // errorvisuals.addError("System memory low", "WARN");
        }else{
            memoryelement.className = "bg-success";
        }
    }

    renderSystemAvgLoad(data){
        let loadelement = document.getElementById("cpuload");
        let cpus = data.system.cpus.length;
        let loadavg = data.system.loadavg[0];

        let percentageload = Math.ceil(loadavg / cpus * 100);
        loadelement.innerHTML = percentageload +  "% <span>cpu load (linux only)</span>";
        if(percentageload > data.alerts.danger){
            loadelement.className = "bg-danger";
            errorvisuals.addError("Average CPU load dangerously high");
        }else if(percentageload > data.alerts.warning){
            loadelement.className = "bg-warning";
            errorvisuals.addError("Average CPU load high", "WARN");
        }else{
            loadelement.className = "bg-success";
        }
    }
}