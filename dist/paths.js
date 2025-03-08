'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('module-alias/register');
const module_alias_1 = require('module-alias');
(0, module_alias_1.addAliases)({
  $controllers: `${__dirname}/controllers`,
  $routes: `${__dirname}/routes`,
  $utils: `${__dirname}/utils`,
  $validations: `${__dirname}/validations`,
  $services: `${__dirname}/services`,
  $entities: `${__dirname}/entities`,
  $middlewares: `${__dirname}/middlewares`,
  $seeders: `${__dirname}/seeders`,
  $config: `${__dirname}/config`,
  $pkg: `${__dirname}/pkg`,
  $server: `${__dirname}/server`,
  $app: `${__dirname}/app`,
});
