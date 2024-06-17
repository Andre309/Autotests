/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // A path to a module which exports an async function that is triggered once before all test suites
    // globalSetup: undefined,

    // A path to a module which exports an async function that is triggered once after all test suites
    // globalTeardown: undefined,

    // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
    maxWorkers: 8,

    // Use this configuration option to add custom reporters to Jest
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                filename: 'api-tests-report.html',
                darkTheme: true,
                openReport: false,
            },
        ],
    ],

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/__tests__/**/?(*.)+(spec|test).js',
        // '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
}

export default config;