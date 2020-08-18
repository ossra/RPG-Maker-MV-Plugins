// +====================================================================================+
// |||  Character | Lock Move Speed
// +====================================================================================+
/*:
 * @plugindesc [1.00] Lock the movement speed of the player to a set value.
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00 [RPG Maker MV 1.6.2]
 *   - Release : 17th August 2020
 *   - Updated : 17th August 2020
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param optionsPluginOptions
 * @text Plugin Options
 * @type text
 * @default ------------------------------------
 *
 * @param lockSpeed
 * @text Lock Speed
 * @desc 
 * @parent optionsPluginOptions
 * @type boolean
 * @default false
 * @on Enable
 * @off Disable
 *
 * @param moveSpeed
 * @text Move Speed
 * @desc 
 * @parent optionsPluginOptions
 * @type number
 * @default 4
 * @decimals 1
 *
 * @param pluginData
 * @text Plugin Data
 * @type text
 * @default ------------------------------------
 *
 * @param gid
 * @text Global Identifier
 * @desc Global identification tag for internal use only. Do not change.
 * @parent pluginData
 * @default ossra-kIp5OZmqzZ6yaHG
 *
 */
// +====================================================================================+



// +===================================================|                      Namespace |
// | [Global] Namespace
// +====================================================================================+

var Imported   = Imported       || {};
Imported.Ossra = Imported.Ossra || {};

var Ossra      = Ossra          || {};
Ossra.Util     = Ossra.Util     || {};
Ossra.Share    = Ossra.Share    || {};
Ossra.Plugin   = Ossra.Plugin   || {};
Ossra.Command  = Ossra.Command  || [];



(function(pluginName, pluginVersion) {                                               // {

  'use strict';

  // +=================================================|                      Functions |
  // | [Plugin] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] setNamespace
  // +----------------------------------------------------------------------------------+

  function setNamespace (namespace, namestring, value) {

    var children = namestring.split('.'),
        parent   = namespace;

    for (var i = 0; i <= children.length - 1; i++) {
      if (typeof parent[children[i]] === 'undefined') {
        if (value && i == children.length - 1) {
          parent[children[i]] = value;
        } else {
          parent[children[i]] = {};
        }
      }
      parent = parent[children[i]];
    }

    return parent;

  }; // Functions << setNamespace



  // +=================================================|                      Namespace |
  // | [Plugin] Namespace
  // +==================================================================================+

  // [Namespace] Imported
  setNamespace(Imported.Ossra, pluginName, pluginVersion);

  // [Namespace] Plugin
  var ossPlugin   = setNamespace(Ossra.Plugin, pluginName);

  var ossCore     = setNamespace(ossPlugin, 'Core');
  var ossManager  = setNamespace(ossPlugin, 'Manager');
  var ossObject   = setNamespace(ossPlugin, 'Object');
  var ossScene    = setNamespace(ossPlugin, 'Scene');
  var ossSprite   = setNamespace(ossPlugin, 'Sprite');
  var ossWindow   = setNamespace(ossPlugin, 'Window');

  var ossData     = setNamespace(ossPlugin, 'Data');
  var ossConfig   = setNamespace(ossPlugin, 'Config');
  var ossRegExp   = setNamespace(ossPlugin, 'RegExp');
  var ossCommand  = setNamespace(ossPlugin, 'Command');
  var ossFunc     = setNamespace(ossPlugin, 'Function');



  (function() {                                                                      // {

  // +=================================================|                      Functions |
  // | [Setup] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] getParameters
  // +----------------------------------------------------------------------------------+

    function getParameters (gid) {

      return $plugins.filter(function(plugin) {
        return plugin.parameters['gid'] === gid;
      })[0]['parameters'];

    }; // Setup << getParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] parseParameters
  // +----------------------------------------------------------------------------------+

    function parseParameters (json, defaults) {

      try {
        return JSON.parse(json, function(key, value) {
          var _arr = key.split('__');
          var _key = _arr[0];
          var _fnc = _arr[1];
          var _def = defaults[_key];
          var _val = value !== '' ? value : _def;

          if (defaults.hasOwnProperty(_key)) {
            if (typeof _fnc !== 'undefined') {
              this[_key] = ossFunc[_fnc].call(this, _val);
            } else if (Array.isArray(_def)) {
              _val = value !== '' ? JSON.parse(_val) : [];

              for (var i = 0; i < _val.length; i++) {
                _val[i] = parseParameters(_val[i], _def[0]);
              }

              return _val;
            } else if (typeof _def === 'string')  {
              return _val;
            } else {
              return parseParameters(_val, _def);
            }
          } else {
            return _key !== '' ? undefined : _val;
          }
        });
      } catch (error) {
        return defaults;
      }

    }; // Setup << parseParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] createConfig
  // +----------------------------------------------------------------------------------+

    function createConfig (gid, defaults) {

      var parameters = getParameters(gid);
      parameters     = JSON.stringify(parameters);
      parameters     = parseParameters(parameters, defaults);

      Object.assign(ossConfig, parameters);

    }; // Setup << createConfig

  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Setup] Set Defaults
  // +----------------------------------------------------------------------------------+

    var ossDefaults = {

      'lockSpeed': false,
      'moveSpeed': 4

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Set Configuration
  // +----------------------------------------------------------------------------------+

    createConfig('ossra-kIp5OZmqzZ6yaHG', ossDefaults);

  })();                                                                              // }



  (function(_) {                                                                     // {

  // +=================================================|                    Game_Player |
  // | [Plugin] Game_Player
  // +==================================================================================+

    var _alias = setNamespace(ossScene, 'Game_Player');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] initMembers
  // +----------------------------------------------------------------------------------+

    _alias.initMembers = _.prototype.initMembers;

    _.prototype.initMembers = function() {

      _alias.initMembers.call(this);

      this.__moveSpeed = ossConfig.moveSpeed;

    }; // Game_Player << initMembers

    Object.defineProperty(_.prototype, '_moveSpeed', {

      get: function() {
        if (this._vehicleType !== 'walk') {
          return this.vehicle().moveSpeed();
        } else {
          return this.__moveSpeed;
        }
      },

      set: function(value) {
        if (ossConfig.lockSpeed) {
          this.__moveSpeed = ossConfig.moveSpeed;
        } else {
          this.__moveSpeed = value;
        }
      },

      configurable: false,
      enumerable: true

    });

  })(Game_Player);                                                                   // }



})('Character.LockMoveSpeed', 1.00);                                                 // }



// |///////////////////////////////////| End of File |//////////////////////////////////|