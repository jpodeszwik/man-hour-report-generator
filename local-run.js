process.chdir('dist');
const index = require('./dist/index');
const fs = require('fs');

const processResult = result => {
	const { statusCode, body } = result;

	if (statusCode === 200) {
		const buffer = Buffer.from(body, 'base64');
		fs.writeFile('../test.pdf', buffer, err => {
			if (err === null) {
				console.log('finished writing test.pdf file');
			} else {
				console.error(`error occured during writing file ${error}`)
			}
		});
	} else {
		console.error(`statusCode: ${statusCode}, message: ${body}`);
	} 
}

const body = {"name": "Firstname Lastname", "month": "December", "year": 2018, "tasks": [{ "hours": 160, "task": "Task name" }]};

index.handler({body: JSON.stringify(body)})
	.then(processResult);

