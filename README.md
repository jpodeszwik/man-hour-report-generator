# Man hour report generator
[![Build Status](https://travis-ci.org/jpodeszwik/man-hour-report-generator.svg?branch=master)](https://travis-ci.org/jpodeszwik/man-hour-report-generator)
[![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/jpodeszwik/man-hour-report-generator/blob/master/LICENSE)

Amazon lambda function that generates working hours reports.

## Build
Install dependencies first:

```yarn install```

Then run webpack

```webpack```

## Run locally
first build, and then run

```node local-run.js```

## Deploy
Copy contents of dist directory into amazon lambda function code

## Demo
```curl https://4kxc94uwn2.execute-api.eu-central-1.amazonaws.com/default/man-hour-report-generator -d '{"name": "Firstname Lastname", "month": "December", "year": 2018, "tasks": [{ "hours": 154, "task": "Some task name" }]}' -H'Content-Type: application/json' -H'Accept: application/pdf' -o report.pdf```
