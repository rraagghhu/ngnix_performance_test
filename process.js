const fs = require('fs');

const fileName = process.argv[2];
fs.readFile(fileName, 'utf8', function(err, contents) {
    let results = contents.split("END_RESULT");

    let res = "";
    for (let i=0; i < results.length; i++) {
    	let content = results[i].trim();

    	if (content.indexOf("START_COMMAND") === -1)
    		continue;

    	let n, c, failed, tpr, p99, rps;

    	// n & c
		let nc = content.substr(content.indexOf("START_COMMAND::") + "START_COMMAND::".length);
		nc = nc.substr(0, nc.indexOf("::END_COMMAND"));
    	c = parseInt(nc.split(' ')[5].substr(2));
    	n = parseInt(nc.split(' ')[6].substr(2));
    	
    	// failed
    	let lines = content.split('\n');
    	for (let j = 0; j < lines.length; j++) {
    		let line = lines[j];

    		if (line.startsWith('Non-2xx responses:')) {
    			failed = line.substr('Non-2xx responses:').trim();
    			failed = parseInt(p99);
    		} else {
    			failed = 0;
    		}

    		if (line.startsWith('Time per request:') && line.indexOf("(mean)") === -1) {
    			tpr = line.substr('Time per request:'.length).trim();
    			tpr = parseFloat(tpr);
    		}

    		if (line.indexOf('99%') > -1) {
    			p99 = line.substr(7).trim();
    			p99 = parseInt(p99);
    		}

    		if (line.startsWith('Requests per second:')) {
    			rps = line.substr('Requests per second:'.length).trim();
    			rps = parseFloat(rps);
    		}

    	}


    	// console.log(`n = ${n}`);
    	// console.log(`c = ${c}`);
    	// console.log(`failed = ${failed}`);
    	// console.log(`tpr = ${tpr}`);
    	// console.log(`p99 = ${p99}`);
    	// console.log(`rps = ${rps}`);
    	res += `${c}\t${n}\t${failed}\t${tpr}\t${p99}\t${rps}\n`;
    }

    fs.writeFile("js_"+fileName, res, () => console.log("Done!"));

});
