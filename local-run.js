const index = require('./index');
const body = {"name": "Firstname Lastname", "month": "December", "year": 2018, "tasks": [	{ "hours": 160, "task": "Task name" }]};

const result = index.handler({body: JSON.stringify(body)});

console.log(JSON.stringify(result));
