// +====================================================================================+
// |||  Window | Choice List
// +====================================================================================+
/*:
 * @plugindesc [1.27] Controls various choice list window options.
 * @author Ossra
 *
 * @param Default Properties
 * @type text
 * @default ------------------------------------
 *
 * @param Window
 * @parent Default Properties
 * @desc The default properties of the choice list window.
 * @type struct<optionsWindow>
 *
 * @param Item
 * @parent Default Properties
 * @desc The default properties of each option on the choice list window.
 * @type struct<optionsItem>
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
 *   - Version : 1.27
 *   - Release : 11th September 2019
 *   - Updated : 24th September 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * ==| Plugin Commands         |=================================================
 *
 *  (+) ossra ChoiceList set section property value retain
 *  (+) ossra ChoiceList set section property,property value,value retain
 *   |--------------------------------------------------------------------------|
 *   | Sets one or more properties of the choice list.
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | section         String
 *   | property        String
 *   | value           Any
 *   | retain          Boolean         Temporarily sets the value as default.
 *   |--------------------------------------------------------------------------|
 *
 *  (+) ossra ChoiceList clear section
 *  (+) ossra ChoiceList clear section property
 *  (+) ossra ChoiceList clear section property,property
 *   |--------------------------------------------------------------------------|
 *   | Clears the specified properties of the choice list.
 *   |--------------------------------------------------------------------------|
 */
// +====================================================================================+
 /*~struct~optionsWindow:
 * @param X Position
 * @desc The x coordinate of the choice window. Negative values are accepted.
 * @type number
 * @min -9999999
 *
 * @param Y Position
 * @desc The y coordinate of the choice window. Negative values are accepted.
 * @type number
 * @min -9999999
 *
 * @param Rows
 * @desc The number of rows the choice window will display.
 * @type number
 *
 * @param Columns
 * @desc The number of columns the choice window will display.
 * @type number
 */
 /*~struct~optionsItem:
 * @param Text Align
 * @desc The text alignment of each choice option.
 * @type select
 * @option left
 * @option center
 * @option right
 * @default left
 *
 * @param Width
 * @desc The maximum width of each choice option. Value is in pixels.
 * @type number
 *
 * @param Spacing
 * @desc The spacing between each choice option. Value is in pixels.
 * @type number
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



  (function($) {                                                                     // {

  // +=================================================|                      Functions |
  // | [Plugin] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] StyleContainer
  // +----------------------------------------------------------------------------------+

    $.StyleContainer = function () {
      this._data    = { };
      this._default = {
        value: null,
        enabled: false,
        retain: false,
        _default: null,
        clear: function () {
          this.value   = JSON.parse(JSON.stringify(this._default));
          this.enabled = this._default ? true : false;
          this.retain  = this._default ? true : false;
        }
      };

      this.add = function (section, property, defaults) {
        if (!this._data[section]) this._data[section] = { };

        this._data[section][property] = Object.assign({}, this._default);

        if (defaults && typeof defaults !== 'undefined') {
          this.set(section, property, defaults, true, true, defaults);
        }
      };

      this.get = function (section, property) {
        if (typeof property !== 'undefined') {
          return this._data[section][property];
        } else {
          return this._data[section];
        }
      };

      this.set = function (section, property, value, enabled, retain, defaults) {
        this._data[section][property].value   = value;
        this._data[section][property].enabled = enabled || false;
        this._data[section][property].retain  = retain  || false;

        if (defaults) {
          this._data[section][property]._default = defaults;
        }
      };

      this.clear = function (section, property, force) {
        if (typeof property !== 'undefined') {
          if (!this._data[section][property].retain || force) {
            this._data[section][property].clear();
          }
        } else {
          Object.keys(this._data[section]).forEach(function(key) {
            if (!this._data[section][key].retain || force) {
              this._data[section][key].clear();
            }
          }, this);
        }
      };

      this.reset = function () {
        Object.keys(this._data).forEach(function(key) {
          this.clear(key);
        }, this);
      };
    }; // Functions << StyleContainer

  })(ossFunc);                                                                       // }



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

      Object.keys(input).forEach(function(key) {
        try {
          input[key] = JSON.parse(input[key]);

          parseAllParameters(input[key]);
        } catch (e) {

        }
      });

      return input;

    }; // Setup << parseAllParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] parseDefaultData
  // +----------------------------------------------------------------------------------+

    function parseDefaultData (input, defaults, output) {

      function isUndefined(object) {
        return typeof object === 'undefined';
      };

      Object.keys(defaults).forEach(function(key) {
        var value = defaults[key];
        var type  = value ? value.constructor : null;
        output    = output ? output : { };

        switch (type) {
          case Object:
            input       = input ? input : { };
            output[key] = parseDefaultData(input[key], value, output[key]);
            break;
          case Array:
            input       = input ? input : [];
            output[key] = [];

            input[key].forEach(function (struct, index) {
              if (struct.constructor === Array || struct.constructor === Object) {
                parseDefaultData(struct, value[0], output[key][index]);
              } else {
                output[key][index] = struct;
              }
            });
            break;
          default:
            if (!isUndefined(input)) {
              output[key] = !isUndefined(input[key]) ? input[key] : value;
            } else {
              output[key] = value;
            }
            break;
        }
      });

      return output;

    }; // Setup << parseDefaultData

  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

  // [Setup] Configuration Defaults
    var ossDefaults = {
      'Window': {
        'X Position': null,
        'Y Position': null,
        'Rows': null,
        'Columns': null
      },
      'Item': {
        'Text Align': null,
        'Width': null,
        'Spacing': null
      }
    }

  // [Setup] Prepare Configuration
    getAllParameters('ossra-bbCPaTCrLPwH6ow', ossDefaults, ossConfig);

    ossData.style = new ossFunc.StyleContainer();

    ossData.style.add('window', 'x', ossConfig['Window']['X Position']);
    ossData.style.add('window', 'y', ossConfig['Window']['Y Position']);
    ossData.style.add('window', 'rows', ossConfig['Window']['Rows']);
    ossData.style.add('window', 'columns', ossConfig['Window']['Columns']);

    ossData.style.add('item', 'align', ossConfig['Item']['Text Align']);
    ossData.style.add('item', 'width', ossConfig['Item']['Width']);
    ossData.style.add('item', 'spacing', ossConfig['Item']['Spacing']);

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
          var path = Ossra.Command.filter(function(command) {
            return command.plugin === args[0] && command.name === args[1];
          });

          if (path.length) {
            var group  = path[0].group;
            var plugin = path[0].plugin;
            var name   = path[0].name;
            var func   = Ossra.Plugin[group][plugin]['Command'][name];

            if (typeof func !== 'undefined') {
              func.call(this, args.slice(2, args.length));
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
      };

      Ossra.Command.push(path);

    }; // Util ‹‹ registerPluginCommand

  // NEW -------------------------------------------------------------------------------+
  // | [Method] set
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('set');

    $.set = function(args) {

      if (args.length >= 3) {

        var section  = args[0];
        var property = args[1];
        var value    = JSON.parse(args[2]);
        var retain   = args[3] ? args[3] === 'true' : false;

        ossData.style.set(section, property, value, true, retain);

      }

    }; // Commands ‹‹ set

  // NEW -------------------------------------------------------------------------------+
  // | [Method] clear
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('clear');

    $.clear = function(args) {

      if (args.length >= 1) {

        var section  = args[0];
        var property = args[1];

        ossData.style.clear(section, property, true);

      }

    }; // Commands ‹‹ clear

  })(ossCommand);                                                                    // }



  (function($) {                                                                     // {

  // +=================================================|              Window_ChoiceList |
  // | [Plugin] Window_ChoiceList
  // +==================================================================================+

    var $win = setNamespace(ossWindow, 'Window_ChoiceList');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] updatePlacement
  // +----------------------------------------------------------------------------------+

    $win.updatePlacement = $.prototype.updatePlacement;

    $.prototype.updatePlacement = function() {

      $win.updatePlacement.call(this);

      var style = ossData.style.get('window');

      if (style.x.enabled) {
        this.x = style.x.value;
      }

      if (style.y.enabled) {
        this.y = style.y.value;
      }

    }; // Window_ChoiceList << updatePlacement

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] numVisibleRows
  // +----------------------------------------------------------------------------------+

    $win.numVisibleRows = $.prototype.numVisibleRows;

    $.prototype.numVisibleRows = function() {

      var style = ossData.style.get('window', 'rows');

      if (style.enabled) {
        return style.value;
      } else {
        return $win.numVisibleRows.call(this);
      }

    }; // Window_ChoiceList << numVisibleRows

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] maxCols
  // +----------------------------------------------------------------------------------+

    $win.maxCols = $.prototype.maxCols;

    $.prototype.maxCols = function() {

      var style = ossData.style.get('window', 'columns');

      if (style.enabled) {
        return style.value;
      } else {
        return $win.maxCols.call(this);
      }

    }; // Window_ChoiceList << maxCols

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] windowWidth
  // +----------------------------------------------------------------------------------+

    $win.windowWidth = $.prototype.windowWidth;

    $.prototype.windowWidth = function() {

      var style = ossData.style.get('window', 'columns');

      if (style.enabled) {
        var width = (this.maxChoiceWidth() * this.maxCols()) + (this.padding * 2);

        return width;
      } else {
        return $win.windowWidth.call(this);
      }

    }; // Window_ChoiceList << windowWidth

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] close
  // +----------------------------------------------------------------------------------+

    $win.close = $.prototype.close;

    $.prototype.close = function() {

      ossData.style.reset();

      $win.close.call(this);

    }; // Window_ChoiceList << close

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] maxChoiceWidth
  // +----------------------------------------------------------------------------------+

    $win.maxChoiceWidth = $.prototype.maxChoiceWidth;

    $.prototype.maxChoiceWidth = function() {

      var style = ossData.style.get('item', 'width');

      if (style.enabled) {
        return style.value;
      } else {
        return $win.maxChoiceWidth.call(this);
      }

    }; // Window_ChoiceList << maxChoiceWidth

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] spacing
  // +----------------------------------------------------------------------------------+

    $win.spacing = $.prototype.spacing;

    $.prototype.spacing = function() {

      var style = ossData.style.get('item', 'spacing');

      if (style.enabled) {
        return style.value;
      } else {
        return $win.spacing.call(this);
      }

    }; // Window_ChoiceList << spacing

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] itemRect
  // +----------------------------------------------------------------------------------+

    $win.itemRect = $.prototype.itemRect;

    $.prototype.itemRect = function(index) {
      var style = ossData.style.get('item', 'spacing');
      var rect  = $win.itemRect.call(this, index);

      if (style.enabled) {
        if (rect.y > 0) {
          var maxCols = this.maxCols();

          rect.y = rect.y + (style.value * Math.floor(index / maxCols));
        }
      }

      return rect;
    }; // Window_ChoiceList << itemRect

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] itemRectForText
  // +----------------------------------------------------------------------------------+

    $win.itemRectForText = $.prototype.itemRectForText;

    $.prototype.itemRectForText = function(index) {

      var style = ossData.style.get('item', 'align');

      if (style.enabled) {
        if (Imported.RS_MessageAlign) {
          $gameMessage.clearAlignLast();
        }

        var rect        = $win.itemRectForText.call(this, index);
        var choices     = $gameMessage.choices();
        var choiceWidth = this.textWidthEx(choices[index]);

        switch (style.value) {
          case 'center':
            rect.x += (rect.width / 2) - (choiceWidth / 2);
            break;
          case 'right':
            rect.x += rect.width - choiceWidth;
            break;
          default:
            break;
        }

        return rect;
      } else {

        return $win.itemRectForText.call(this, index);
      }

    }; // Window_ChoiceList << itemRectForText

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] contentsHeight
  // +----------------------------------------------------------------------------------+

    $win.contentsHeight = $.prototype.contentsHeight;

    $.prototype.contentsHeight = function() {

      var style = ossData.style.get('item', 'spacing');

      if (style.enabled) {
        var height  = $win.contentsHeight.call(this);
        var spacing = Math.floor(style.value * (this.numVisibleRows() - 1));

        return height + spacing;
      } else {
        return $win.contentsHeight.call(this);
      }

    }; // Window_ChoiceList << contentsHeight

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] fittingHeight
  // +----------------------------------------------------------------------------------+

    $win.fittingHeight = $.prototype.fittingHeight;

    $.prototype.fittingHeight = function(numLines) {

      var style = ossData.style.get('item', 'spacing');

      if (style.enabled) {
        var height  = (numLines * this.lineHeight()) + (this.standardPadding() * 2);
        var spacing = (style.value * (numLines - 1));

        return height + spacing;
      } else {
        return $win.fittingHeight.call(this, numLines);
      }
    }; // Window_ChoiceList << fittingHeight

  })(Window_ChoiceList);                                                             // }



})('Window.ChoiceList', 1.27);                                                       // }



// |///////////////////////////////////| End of File |//////////////////////////////////|