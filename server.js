const express = require('express');
const path = require('path');
const app = express();
const pm2 = require('pm2');
const os = require('os');

require('dotenv').config()

app.get('/api', function(req, res) {
    if(req.query.token){
        if(req.query.token == process.env.SITE_TOKEN){
            let returndata = {};
            returndata.alerts = {};
            returndata.alerts.warning = parseInt(process.env.SYSTEM_WARNING) ? parseInt(process.env.SYSTEM_WARNING) : 75;
            returndata.alerts.danger = parseInt(process.env.SYSTEM_DANGER) ? parseInt(process.env.SYSTEM_DANGER) : 90;;
            returndata.polldelay = parseFloat(process.env.SYSTEM_POLL_DELAY) ? parseFloat(process.env.SYSTEM_POLL_DELAY) : 5;
    
            returndata.system = {};
            returndata.system.cpus = os.cpus();
            returndata.system.loadavg = os.loadavg();
            returndata.system.totalmem = os.totalmem();
            returndata.system.freemem = os.freemem();
    
            pm2.connect(function(err) {
                if (err) {
                console.error(err);
                process.exit(2);
                }
                
    
                pm2.list(function(err, apps) {
                    returndata.pm2 = apps;
                    res.send(JSON.stringify(returndata));
                    pm2.disconnect();
                    if (err) throw err
                });
            });
        }else{
            res.status(401).send('missing or incorrect token')
        }
    }else{
        res.status(401).send('missing or incorrect token')
    }
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    if(req.query.token){
        if(req.query.token == process.env.SITE_TOKEN){
            res.sendFile(path.join(__dirname, 'build', 'entry.html'));
        }else{
            res.status(401).send('missing or incorrect token')
        }
    }else{
        res.status(401).send('missing or incorrect token')
    }
});

app.listen(1337);