class instanceVisual {

    render(list) {
        list.pm2.forEach(element => {
            this.renderSingle(element);
        });
    }

    renderSingle(element){
        let rootdiv = document.getElementById("root");

        let newelement = document.createElement("div");
        newelement.id = element.name + "--" + element.pid + "--" + element.pm_id;
        newelement.className = "processelement panel";

        let title = document.createElement("h2");
        title.innerHTML = element.name + "   <span>(" + element.pm_id + " - " + element.pid + ")</span>";
        newelement.appendChild(title);

        let memorydiv = document.createElement("div");
        memorydiv.id = "memory--" + element.pid + "--" + element.pm_id;
        memorydiv.className = "width50";
            let memorychartwrapdiv = document.createElement("div");
            memorychartwrapdiv.className = "chartwrapper";
            memorydiv.appendChild(memorychartwrapdiv);
                let memorychartdiv = document.createElement("div");
                memorychartdiv.className = "chart";
                memorychartwrapdiv.appendChild(memorychartdiv);
            let memorytextdiv = document.createElement("div");
            memorytextdiv.className = "textcontent width100";
            memorydiv.appendChild(memorytextdiv);
        newelement.appendChild(memorydiv);

        let cpudiv = document.createElement("div");
        cpudiv.id = "cpu--" + element.pid + "--" + element.pm_id;
        cpudiv.className = "width50";
            let cpuchartwrapdiv = document.createElement("div");
            cpuchartwrapdiv.className = "chartwrapper";
            cpudiv.appendChild(cpuchartwrapdiv);
                let cpuchartdiv = document.createElement("div");
                cpuchartdiv.className = "chart";
                cpuchartwrapdiv.appendChild(cpuchartdiv);
            let cputextdiv = document.createElement("div");
            cputextdiv.className = "textcontent width100";
            cpudiv.appendChild(cputextdiv);
        newelement.appendChild(cpudiv);

        let instancediv = document.createElement("div");
        instancediv.id = "instance--" + element.pid + "--" + element.pm_id;
        instancediv.className = "width50 bg-dark padding15 centered font16";
        newelement.appendChild(instancediv);

        let statusdiv = document.createElement("div");
        statusdiv.id = "status--" + element.pid + "--" + element.pm_id;
        statusdiv.className = "width50  bg-dark padding15 centered font16";
        newelement.appendChild(statusdiv);

        rootdiv.appendChild(newelement);
    }

    renderComponents(data) {
        let rootdiv = document.getElementById("root");
        let elementsrendered = [];

        data.pm2.forEach(element => {
            if(!document.getElementById(element.name + "--" + element.pid + "--" + element.pm_id)){
                this.renderSingle(element);
            }
            elementsrendered.push(element.name + "--" + element.pid + "--" + element.pm_id);

            let memoryelementid = "memory--" + element.pid + "--" + element.pm_id;
            let memorylimit = (element.pm2_env.max_memory_restart) ? element.pm2_env.max_memory_restart : data.system.totalmem;
            let memoryused = element.monit.memory;
            let memoryfree = memorylimit - element.monit.memory;
            let memorypercentage = memoryused / memorylimit * 100;

            let cpuelementid = "cpu--" + element.pid + "--" + element.pm_id;
            let cpuused = element.monit.cpu;
            let cpufree = 100 - element.monit.cpu;

            new Chartist.Pie("#" + memoryelementid + " .chart", {
                series: [memoryused, memoryfree]
            }, {
                donut: true,
                donutWidth: 40,
                startAngle: 270,
                total: memorylimit * 2,
                showLabel: false
            });
            new Chartist.Pie("#" + cpuelementid + " .chart", {
                series: [cpuused, cpufree]
            }, {
                donut: true,
                donutWidth: 40,
                startAngle: 270,
                total: 200,
                showLabel: false,
                stroke: 'green'
            });

            let memoryelementtext = document.getElementById(memoryelementid).getElementsByClassName("textcontent")[0];
            let cpuelementtext = document.getElementById(cpuelementid).getElementsByClassName("textcontent")[0];

            let memoryusedmb = Math.ceil(memoryused / 1048576);
            let memoryavailablemb = Math.ceil(memorylimit / 1048576);
            let memorytext = memoryusedmb + "/" + memoryavailablemb + "Mb<br/><span>memory used</span>";
            let cputext = cpuused + "%<br/><span>cpu used</span>";

            memoryelementtext.innerHTML = memorytext;
            cpuelementtext.innerHTML = cputext;

            if(memorypercentage > data.alerts.danger){
                errorvisuals.addError(element.name + " process has high memory usage! (pid: " + element.pid + ")");
            }else if(memorypercentage > data.alerts.warning){
                errorvisuals.addError(element.name + " process has moderate memory usage! (pid: " + element.pid + ")", "WARN");
            }

            if(cpuused > data.alerts.danger){
                errorvisuals.addError(element.name + " process has high CPU load! (pid: " + element.pid + ")");
            }else if(cpuused > data.alerts.warning){
                errorvisuals.addError(element.name + " process has moderate CPU load! (pid: " + element.pid + ")", "WARN");
            }

            let instanceelement = document.getElementById("instance--" + element.pid + "--" + element.pm_id);
            let statuselement = document.getElementById("status--" + element.pid + "--" + element.pm_id);
            instanceelement.innerHTML = element.pm2_env.instances + " instances";
            statuselement.innerHTML = element.pm2_env.status;
            if(element.pm2_env.status != "online"){
                if(statuselement.classList.contains("color-success")){
                    statuselement.classList.remove("color-success");
                }
                statuselement.classList.add("color-danger");
            }else{
                if(statuselement.classList.contains("color-danger")){
                    statuselement.classList.remove("color-danger");
                }
                statuselement.classList.add("color-success");
            }

            if(element.pid == 0){
                //if process id is zero, remove text
                Array.from(document.getElementById(element.name + "--" + element.pid + "--" + element.pm_id).getElementsByClassName("textcontent")).forEach(divelement => {
                    divelement.innerHTML = "&nbsp;<br/><span>&nbsp;</span>";
                });
            }
        });

        let divs = rootdiv.childNodes;
        for (var i = 0; i < divs.length; i += 1) {
            if(elementsrendered.indexOf(divs[i].id) === -1){
                //add log that this process has been removed
                let processarray = divs[i].id.split('--');
                if(processarray[1] != 0){
                    errorvisuals.addError(processarray[0] + " process has been removed! (id: " + processarray[2] + " - pid: " + processarray[1] + ")");
                }

                //remove element from visual
                var elem = document.getElementById(divs[i].id);
                elem.parentNode.removeChild(elem);
            }
        }
    }
}