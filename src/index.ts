/**
 * yag-env
 *
 * @copyright Copyright (c) 2016, Yassel Avila Gil (http://yasselavila.com)
 * @license   BSD 3 Clause (see LICENSE.txt)
 * @link      https://github.com/yasselavila/npm-env
 */

import {BaseData, ProcessData, Data} from './data';
import {processEnvData} from './process';

/* Env data source: process.env */

let envData: ProcessData;

try {
  /*
   * This only works on Node.js
   *
   * With Webpack you can use DefinePlugin to replace 'process.env':
   *    ```js
   *    var env = require('yag-env');
   *    ...
   *    plugins: [
   *      new DefinePlugin({
   *        'process.env': JSON.stringify(env.default)
   *      })
   *    ]
   *    ...
   *    ```
   *
   * On other build-tools you must use something similar
   */
  envData = process.env;
} catch(e) {
  /* Fallback for browsers */
  envData = {};
}

/* Data */

/* This helps with tree-shaking when closure-compiler
 * is used to compile browser bundles ;-) */
let data: Data = !envData.$PROCESSED ? processEnvData(envData) : (<Data>envData);

/* Exports */

export const ENV: string = data.ENV;
export const isProduction: boolean = data.isProduction;
export const isTesting: boolean = data.isTesting;
export const isStaging: boolean = data.isStaging;
export const isDevelopment: boolean = data.isDevelopment;
export const exported: BaseData = data.exported;

export default data;
