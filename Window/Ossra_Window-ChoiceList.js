// +====================================================================================+
// |||  Window | Choice List
// +====================================================================================+
/*:
 * @plugindesc [1.00] Controls various choice list window options.
 * @author Ossra
 *
 * @param Plugin Data
 * @type text
 * @default ------------------------------------
 *
 * @param Global Identifier
 * @parent Plugin Data
 * @desc Global identification tag for internal use only. Do not edit.
 * @type text
 * @default ossra-bbCPaTCrLPwH6ow
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00
 *   - Release : 11th September 2019
 *   - Updated : 11th September 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * ==| Plugin Commands         |=================================================
 *
 *  (+) ossra ChoiceList setPosition x y retain
 *   |--------------------------------------------------------------------------|
 *   | Set the position of the choice list on the screen.
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | x               Integer
 *   | y               Integer
 *   | retain          Boolean         Uses current X,Y values until cleared
 *   |--------------------------------------------------------------------------|
 *
 *  (+) ossra ChoiceList clearPosition
 *   |--------------------------------------------------------------------------|
 *   | Resets the position of the choice list on the screen.
 *   |--------------------------------------------------------------------------|
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

  var ossData     = setNamespace(ossPlugin, 'Data');
  var ossCore     = setNamespace(ossPlugin, 'Core');
  var ossManager  = setNamespace(ossPlugin, 'Manager');
  var ossObject   = setNamespace(ossPlugin, 'Object');
  var ossScene    = setNamespace(ossPlugin, 'Scene');
  var ossSprite   = setNamespace(ossPlugin, 'Sprite');
  var ossWindow   = setNamespace(ossPlugin, 'Window');
  var ossCommand  = setNamespace(ossPlugin, 'Command');
  var ossFunc     = setNamespace(ossPlugin, 'Function');



  (function() {                                                                      // {

  // +=================================================|                      Functions |
  // | [Setup] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] getPlugin
  // +----------------------------------------------------------------------------------+

    function getPlugin (gid) {

      return $plugins.filter(function(plugin) {
        return plugin.parameters['Global Identifier'] === gid;
      })[0]['parameters'];

    }; // Setup << getPlugin

  // +----------------------------------------------------------------------------------+
  // | [Method] getAllParameters
  // +----------------------------------------------------------------------------------+

    function getAllParameters (gid, defaults, output) {

      var parameters = getPlugin(gid);
      parameters     = parseAllParameters(parameters);
      parameters     = parseDefaultData(parameters, defaults, output);

    }; // Setup << getAllParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] parseAllParameters
  // +----------------------------------------------------------------------------------+
    function parseAllParameters (input) {

      for (var [key, value] of Object.entries(input)) {
        try {
          input[key] = JSON.parse(value);

          parseAllParameters(input[key]);
        } catch (e) {

        }
      }

      return input;

    }; // Setup << parseAllParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] parseDefaultData
  // +----------------------------------------------------------------------------------+

    function parseDefaultData (input, defaults, output) {

      for (var [key, value] of Object.entries(defaults)) {
        var _key     = key.split(' ');
        _key[0]      = _key[0].toLowerCase();
        _key         = _key.join('');

        output[_key] = value.constructor();
        input        = input ? input : value.constructor();

        switch (value.constructor) {
          case Object:
            output[_key] = parseDefaultData(input[key], defaults[key], output[_key]);
            break;
          case Array:
            input[key].forEach(function (struct, index) {
              output[_key][index] = defaults[key][0].constructor();
              parseDefaultData(struct, defaults[key][0], output[_key][index]);
            });
            break;
          default:
            if (input !== undefined) {
              output[_key] = input[key] !== undefined ? input[key] : defaults[key];
            } else {
              output[_key] = defaults[key];
            }
            break;
        }
      }

      return output;

    }; // Setup << parseDefaultData



  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

  // [Setup] Configuration Defaults
    var ossDefaults = {

    }

  // [Setup] Prepare Configuration
    getAllParameters('ossra-bbCPaTCrLPwH6ow', ossDefaults, ossData);



  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|               Game_Interpreter |
  // | [Object] Game_Interpreter
  // +==================================================================================+

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] pluginCommand
  // +----------------------------------------------------------------------------------+

    if (typeof Ossra.Share.pluginCommand === 'undefined') {

      Ossra.Share.pluginCommand = Game_Interpreter.prototype.pluginCommand;

      Game_Interpreter.prototype.pluginCommand = function(command, args) {

        Ossra.Share.pluginCommand.call(this, command, args);

        if (command === 'ossra') {
          var path = Ossra.Command.find(function(command) {
            return command.plugin === args[0] && command.name === args[1];
          });

          if (path) {
            var group  = path.group;
            var plugin = path.plugin;
            var name   = path.name;
            var func   = Ossra.Plugin[group][plugin]['Command'][name];

            if (typeof func !== 'undefined') {
              func(args.slice(2, args.length), this);
            }
          }
        }

      }; // Game_Interpreter ‹‹ pluginCommand

    }

  // +=================================================|                       Commands |
  // | [Plugin] Commands
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] registerPluginCommand
  // +----------------------------------------------------------------------------------+

    function registerPluginCommand (command) {

      var namespace = pluginName.split('.');

      var path = {
        name: command,
        group: namespace[0],
        plugin: namespace[1]
      }

      Ossra.Command.push(path);

    }; // Util ‹‹ registerPluginCommand

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setPosition
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('setPosition');

    $.setPosition = function(args, interpreter) {

      if (args.length >= 2) {

        var x      = Number(args[0]);
        var y      = Number(args[1]);
        var retain = args[2] ? args[2] === 'true' : false;

        $gameMessage.setPositionOverride(x, y, retain);

      }

    }; // Commands ‹‹ setPosition

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clearPosition
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('clearPosition');

    $.clearPosition = function(args, interpreter) {

      $gameMessage.clearPositionOverride();

    }; // Commands ‹‹ clearPosition

  })(ossCommand);                                                                    // }



  (function($) {                                                                     // {

  // +=================================================|                   Game_Message |
  // | [Plugin] Game_Message
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Message');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] initialize
  // +----------------------------------------------------------------------------------+

    $obj.initialize = $.prototype.initialize;

    $.prototype.initialize = function() {

      $obj.initialize.call(this);

      this.clearPositionOverride();

    }; // Game_Message << initialize

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setPositionOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.setPositionOverride = function(x, y, retain) {

      this.__choicePositionOverride.enable = true;
      this.__choicePositionOverride.retain = retain;
      this.__choicePositionOverride.point.x = x;
      this.__choicePositionOverride.point.y = y;

    }; // Game_Message << setPositionOverride

  // NEW -------------------------------------------------------------------------------+
  // | [Method] getPositionOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.getPositionOverride = function() {

      return this.__choicePositionOverride;

    }; // Game_Message << getPositionOverride

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clearPositionOverride
  // +----------------------------------------------------------------------------------+

    $.prototype.clearPositionOverride = function() {

      this.__choicePositionOverride = {
        enable: false,
        retain: false,
        point: { x: 0, y: 0 }
      };

    }; // Game_Message << clearPositionOverride

  })(Game_Message);                                                                  // }



  (function($) {                                                                     // {

  // +=================================================|              Window_ChoiceList |
  // | [Plugin] Window_ChoiceList
  // +==================================================================================+

    var $win = setNamespace(ossObject, 'Window_ChoiceList');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] updatePlacement
  // +----------------------------------------------------------------------------------+

    $win.updatePlacement = $.prototype.updatePlacement;

    $.prototype.updatePlacement = function() {

      $win.updatePlacement.call(this);

      var override = $gameMessage.__choicePositionOverride;

      if (override.enable) {
        this.x = override.point.x;
        this.y = override.point.y;

        if (!override.retain) {
          $gameMessage.clearPositionOverride();
        }
      }

    }; // Window_ChoiceList << updatePlacement

  })(Window_ChoiceList);                                                             // }



})('Window.ChoiceList', 1.00);                                                       // }



// |///////////////////////////////////| End of File |//////////////////////////////////|