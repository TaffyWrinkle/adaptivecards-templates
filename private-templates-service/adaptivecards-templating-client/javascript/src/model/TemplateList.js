/*
 * adaptivecards-templating-service-javascript-sdk
 * Adaptive Cards Templating Service API definition.
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.12
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/NewTemplate'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./NewTemplate'));
  } else {
    // Browser globals (root is window)
    if (!root.AdaptivecardsTemplatingServiceJavascriptSdk) {
      root.AdaptivecardsTemplatingServiceJavascriptSdk = {};
    }
    root.AdaptivecardsTemplatingServiceJavascriptSdk.TemplateList = factory(root.AdaptivecardsTemplatingServiceJavascriptSdk.ApiClient, root.AdaptivecardsTemplatingServiceJavascriptSdk.NewTemplate);
  }
}(this, function(ApiClient, NewTemplate) {
  'use strict';

  /**
   * The TemplateList model module.
   * @module model/TemplateList
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>TemplateList</code>.
   * @alias module:model/TemplateList
   * @class
   * @extends Array
   */
  var exports = function() {
  };

  /**
   * Constructs a <code>TemplateList</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TemplateList} obj Optional instance to populate.
   * @return {module:model/TemplateList} The populated <code>TemplateList</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      ApiClient.constructFromObject(data, obj, 'NewTemplate');
    }
    return obj;
  }

  Object.setPrototypeOf(exports.prototype, new Array());
  return exports;

}));