class fetches{
    gup( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }

    processdata(){
        let token = this.gup('token', window.location.href);

        return fetch('/api?token='+token).then(result => {
            return result.json();
        }).then(json => {
            return json;
        }).catch(error => {
            console.log('ERROR');
            console.log(error);
            console.log(' --- ');

            systemvisuals.renderSystemStatus(0);
        });
    }
}