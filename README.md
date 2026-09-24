Test tool is written with Typescript + Playwright
Contains ui tests for the app https://www.online-calculator.com/full-screen-calculator

check that you have node and npm before execution

install playwright by running the following command: npx playwright install

tests are designed for 1920x1080 viewport execution

by default, tests are executed in 5 threads
pre-defined headed and headless executions in [package.json](package.json)
for the following browsers: chrome, firefox, edge

report is also available from there or by running command: playwright show-report
by default all failed tests are being recorded, records are available in the report

each test have defined tags which allows to run the tests depending on priority or type (refer to [tags.ts](enums/tags.ts))

framework structure:
[enums](enums) - common constants used in the project
[fixtures](fixtures) - fixtures for test setup
[page-objects](page-objects) - pages
[tests](tests) - tests itself splitted into folders for better visibility
[package.json](package.json)
[package-lock.json](package-lock.json)
[playwright.config.ts](playwright.config.ts)
[README.md](README.md)
[tsconfig.json](tsconfig.json)

tests can be executed via github actions - yaml file with configuration here [playwright.yaml](.github/workflows/playwright.yaml)