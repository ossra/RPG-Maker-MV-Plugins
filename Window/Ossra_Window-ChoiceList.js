// +====================================================================================+
// |||  Window | Choice List
// +====================================================================================+
/*:
 * @plugindesc [1.39] Controls various choice list window options.
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.39 [RPG Maker MV 1.6.2]
 *   - Release : 11th September 2019
 *   - Updated : 16th January 2020
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * ==| Plugin Commands         |=================================================
 *
 *  (+) ossra ChoiceList set section property value retain
 *  (+) ossra ChoiceList set section property,property value,value retain,retain
 *   |--------------------------------------------------------------------------|
 *   | Sets one or more properties of the choice list.
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | section         String          See list below for options.
 *   | property        String          See list below for options.
 *   | value           Any             See list below for values.
 *   | retain          Boolean         Temporarily sets the value as default.
 *   |--------------------------------------------------------------------------|
 *
 *   |--------------------------------------------------------------------------|
 *   | Section and Property List
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | window          String
 *   | | x             Number          X coordinate of the choice window.
 *   | | y             Number          Y coordinate of the choice window.
 *   | | ax            Number          X anchor of the choice window.
 *   | | ay            Number          Y anchor of the choice window.
 *   | | rows          Number          Number of rows to be displayed.
 *   | | columns       Number          Number of columns to be displayed.
 *   |
 *   | item            String
 *   | | align         String          Text alignment of items. Value must be
 *   | |                               in quotations. (e.g. - "center")
 *   | | spacing       Varies          Spacing between items. If value is
 *   | |                               numerical, both horizontal and vertical
 *   | |                               spacing is linked. If value is an
 *   | |                               array (e.g. - [15,25]), then the
 *   | |                               horizontal value is the first entry and
 *   | |                               the vertical value is the second entry.
 *   | | width         Number          Maximum width of items.
 *   |--------------------------------------------------------------------------|
 *
 *  (+) ossra ChoiceList clear section
 *  (+) ossra ChoiceList clear section property
 *  (+) ossra ChoiceList clear section property,property
 *   |--------------------------------------------------------------------------|
 *   | Clears the specified properties of the choice list.
 *   |--------------------------------------------------------------------------|
 *
 * @param defaultProperties
 * @text Default Properties
 * @type text
 * @default ------------------------------------
 *
 * @param window
 * @text Window
 * @parent defaultProperties
 * @desc The default properties of the choice list window.
 * @type struct<optionsWindow>
 *
 * @param item
 * @text Item
 * @parent defaultProperties
 * @desc The default properties of each option on the choice list window.
 * @type struct<optionsItem>
 *
 * @param pluginData
 * @text Plugin Data
 * @type text
 * @default ------------------------------------
 *
 * @param gid
 * @text Global Identifier
 * @parent pluginData
 * @desc Global identification tag for internal use only. Do not edit.
 * @type text
 * @default ossra-bbCPaTCrLPwH6ow
 */
// +===================================================|                        Structs |
// | [Plugin] Structs
// +====================================================================================+
 /*~struct~optionsWindow:
 * @param x
 * @text X Position
 * @desc The x coordinate of the choice window. Negative values are accepted.
 * @type number
 * @min -9999999
 *
 * @param y
 * @text Y Position
 * @desc The y coordinate of the choice window. Negative values are accepted.
 * @type number
 * @min -9999999
 *
 * @param ax
 * @text X Anchor
 * @desc The x anchor of the choice window.
 * @type number
 * @decimals 1
 * @max 1
 *
 * @param ay
 * @text Y Anchor
 * @desc The y anchor of the choice window.
 * @type number
 * @decimals 1
 * @max 1
 *
 * @param rows
 * @text Rows
 * @desc The number of rows the choice window will display.
 * @type number
 *
 * @param columns
 * @text Columns
 * @desc The number of columns the choice window will display.
 * @type number
 */
 /*~struct~optionsItem:
 * @param textAlign
 * @text Text Align
 * @desc The text alignment of each choice option.
 * @type select
 * @option left
 * @option center
 * @option right
 * @default left
 *
 * @param width
 * @text Width
 * @desc The maximum width of each choice option. Value is in pixels.
 * @type number
 *
 * @param spacing
 * @text Spacing
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

  // +=================================================|              Ossra_ChoiceStyle |
  // | [Object] Ossra_ChoiceStyle
  // +==================================================================================+

    $.Ossra_ChoiceStyle = function () {
      this.initialize.apply(this, arguments);
    }

    $ = $.Ossra_ChoiceStyle;

    $.prototype = Object.create(Object.prototype);
    $.prototype.constructor = $;

  // +----------------------------------------------------------------------------------+
  // | [Method] initialize
  // +----------------------------------------------------------------------------------+

    $.prototype.initialize = function() {

      this._data = { };

    }; // Ossra_ChoiceStyle << initialize

  // +----------------------------------------------------------------------------------+
  // | [Method] defaultData
  // +----------------------------------------------------------------------------------+

    $.prototype.defaultData = function() {

      return {
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

    }; // Ossra_ChoiceStyle << defaultData

  // +----------------------------------------------------------------------------------+
  // | [Method] add
  // +----------------------------------------------------------------------------------+

    $.prototype.add = function(section, property, defaults) {

      if (!this._data[section]) this._data[section] = { };

      this._data[section][property] = Object.assign({}, this.defaultData());

      if (defaults && typeof defaults !== 'undefined') {
        this.set(section, property, defaults, true, true, defaults);
      }

    }; // Ossra_ChoiceStyle << add

  // +----------------------------------------------------------------------------------+
  // | [Method] get
  // +----------------------------------------------------------------------------------+

    $.prototype.get = function(section, property) {

      if (typeof property !== 'undefined') {
        return this._data[section][property];
      } else {
        return this._data[section];
      }

    }; // Ossra_ChoiceStyle << get

  // +----------------------------------------------------------------------------------+
  // | [Method] set
  // +----------------------------------------------------------------------------------+

    $.prototype.set = function(section, property, value, enabled, retain, defaults) {

      this._data[section][property].value   = value;
      this._data[section][property].enabled = enabled || false;
      this._data[section][property].retain  = retain  || false;

      if (defaults) {
        this._data[section][property]._default = defaults;
      }

    }; // Ossra_ChoiceStyle << set

  // +----------------------------------------------------------------------------------+
  // | [Method] clear
  // +----------------------------------------------------------------------------------+

    $.prototype.clear = function(section, property, force) {

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

    }; // Ossra_ChoiceStyle << clear

  // +----------------------------------------------------------------------------------+
  // | [Method] reset
  // +----------------------------------------------------------------------------------+

    $.prototype.reset = function() {

      Object.keys(this._data).forEach(function(key) {
        this.clear(key);
      }, this);

    }; // Ossra_ChoiceStyle << reset

  })(ossObject);                                                                     // }



  (function() {                                                                      // {

  // +=================================================|                      Functions |
  // | [Setup] Functions
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Method] getPlugin
  // +----------------------------------------------------------------------------------+

    function getPlugin (gid) {

      return $plugins.filter(function(plugin) {
        return plugin.parameters['gid'] === gid;
      })[0]['parameters'];

    }; // Setup << getPlugin

  // +----------------------------------------------------------------------------------+
  // | [Method] parseAllParameters
  // +----------------------------------------------------------------------------------+

    function parseAllParameters (input, defaults) {

      Object.keys(input).forEach(function(key) {
        if (typeof defaults[key] === 'undefined') {
          delete input[key];
        } else {
          try {
            input[key] = JSON.parse(input[key], function(_key, _value) {
              if (/^(\w+)__(\w+)$/i.test(_key)) {
                this[RegExp.$1] = ossFunc[RegExp.$2].call(this, _value);
              } else {
                return _value;
              }
            });

            if (Array.isArray(input[key])) {
              for (var i = 0; i < input[key].length; i++) {
                input[key][i] = JSON.parse(input[key][i]);
                input[key][i] = parseAllParameters(input[key][i], defaults[key][0]);
              }
            } else {
              parseAllParameters(input[key], defaults[key]);
            }
          } catch (e) {
            if (input[key] === '') input[key] = defaults[key];
          }
        }
      });

      return input;

    }; // Setup << parseAllParameters

  // +----------------------------------------------------------------------------------+
  // | [Method] getAllParameters
  // +----------------------------------------------------------------------------------+

    function getAllParameters (gid, defaults) {

      var parameters = getPlugin(gid);
      parameters     = parseAllParameters(parameters, defaults);

      Object.assign(ossConfig, parameters);

    }; // Setup << getAllParameters

  // +=================================================|                  Configuration |
  // | [Setup] Configuration
  // +==================================================================================+

  // +----------------------------------------------------------------------------------+
  // | [Setup] Set Defaults
  // +----------------------------------------------------------------------------------+

    var ossDefaults = {
      'window': {
        'x': null,
        'y': null,
        'ax': null,
        'ay': null,
        'rows': null,
        'columns': null
      },
      'item': {
        'textAlign': null,
        'width': null,
        'spacing': null
      }
    }

  // +----------------------------------------------------------------------------------+
  // | [Setup] Parse Parameters
  // +----------------------------------------------------------------------------------+

    getAllParameters('ossra-bbCPaTCrLPwH6ow', ossDefaults);

  // +----------------------------------------------------------------------------------+
  // | [Setup] Set Configuration
  // +----------------------------------------------------------------------------------+

    ossData.style = new ossObject.Ossra_ChoiceStyle();

    ossData.style.add('window', 'x', ossConfig.window.x);
    ossData.style.add('window', 'y', ossConfig.window.y);
    ossData.style.add('window', 'ax', ossConfig.window.ax);
    ossData.style.add('window', 'ay', ossConfig.window.ay);
    ossData.style.add('window', 'rows', ossConfig.window.rows);
    ossData.style.add('window', 'columns', ossConfig.window.columns);

    ossData.style.add('item', 'align', ossConfig.item.textAlign);
    ossData.style.add('item', 'width', ossConfig.item.width);
    ossData.style.add('item', 'spacing', ossConfig.item.spacing);

  })();                                                                              // }



  (function() {                                                                      // {

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
          command = Ossra.Command.filter(function(element) {
            return element.plugin === args[0] && element.name === args[1];
          })[0];

          if (command) {
            command.func.call(this, args.slice(2, args.length));
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

    function registerPluginCommand (name, func) {

      var namespace = pluginName.split('.');

      var command = {
        group: namespace[0],
        plugin: namespace[1],
        name: name,
        func: func
      };

      Ossra.Command.push(command);

    }; // Util ‹‹ registerPluginCommand

  // NEW -------------------------------------------------------------------------------+
  // | [Command] set
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('set', function(args) {

      if (args.length < 3) return;

      try {
        var section  = args[0];
        var property = args[1].split(',');
        var value    = JSON.parse('[' + args[2] + ']');
        var retain   = args[3] ? args[3].split(',') : [];

        if (retain.length === 1 && property.length > 1) {
          retain = Array(property.length).fill(retain[0]);
        }

        for (var i = 0; i < property.length; i++) {
          if (value[i] !== undefined) {
            var _retain = retain[i] ? retain[i] === 'true' : false;

            ossData.style.set(section, property[i], value[i], true, _retain);
          }
        }
      } catch(error) {
        return;
      }

    }); // Commands ‹‹ set

  // NEW -------------------------------------------------------------------------------+
  // | [Command] clear
  // +----------------------------------------------------------------------------------+

    registerPluginCommand('clear', function(args) {

      if (args.length < 1) return;

      var section  = args[0];
      var property = args[1] ? args[1].split(',') : [];

      if (property.length > 0) {
        for (var i = 0; i < property.length; i++) {
          ossData.style.clear(section, property[i], true);
        }
      } else {
        ossData.style.clear(section, undefined, true);
      }

    }); // Commands ‹‹ clear

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|              Window_ChoiceList |
  // | [Window] Window_ChoiceList
  // +==================================================================================+

    var $win = setNamespace(ossWindow, 'Window_ChoiceList');
    var _fnc = setNamespace(ossFunc, 'Window_ChoiceList');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] canvasToLocalX
  // +----------------------------------------------------------------------------------+

    $win.canvasToLocalX = $.prototype.canvasToLocalX;

    $.prototype.canvasToLocalX = function(x) {

      var style = ossData.style.get('window');

      x = $win.canvasToLocalX.call(this, x);

      return style.ax.enabled ? this.pivot.x + x : x;

    }; // Window_ChoiceList << canvasToLocalX

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] canvasToLocalY
  // +----------------------------------------------------------------------------------+

    $win.canvasToLocalY = $.prototype.canvasToLocalY;

    $.prototype.canvasToLocalY = function(y) {

      var style = ossData.style.get('window');

      y = $win.canvasToLocalY.call(this, y);

      return style.ay.enabled ? this.pivot.y + y : y;

    }; // Window_ChoiceList << canvasToLocalY

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

      if (style.ax.enabled) {
        this.pivot.x = style.ax.value * this.width / this.scale.x;
      }

      if (style.ay.enabled) {
        this.pivot.y = style.ay.value * this.height / this.scale.y;
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
        var maxWidth = this.maxChoiceWidth();
        var maxCols  = this.maxCols();
        var padding  = this.padding;
        var width    = (maxWidth * maxCols) + (padding * 2);

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
        return _fnc.getSpacing(0);
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
          var spacing = (_fnc.getSpacing(1) * Math.floor(index / maxCols));

          rect.y = rect.y + spacing;
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
        var numRows = this.numVisibleRows();
        var spacing = Math.floor(_fnc.getSpacing(1) * (numRows - 1));

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
        var lineHeight = this.lineHeight();
        var padding    = this.standardPadding();
        var height     = (numLines * lineHeight) + (padding * 2);
        var spacing    = (_fnc.getSpacing(1) * (numLines - 1));

        return height + spacing;
      } else {
        return $win.fittingHeight.call(this, numLines);
      }

    }; // Window_ChoiceList << fittingHeight

  // NEW -------------------------------------------------------------------------------+
  // | [Method] getSpacing
  // +----------------------------------------------------------------------------------+

    _fnc.getSpacing = function(direction) {

      var style = ossData.style.get('item', 'spacing');
      var value = style.value;

      return Array.isArray(value) ? value[direction] : value;

    }; // Window_ChoiceList << getSpacing

  })(Window_ChoiceList);                                                             // }



})('Window.ChoiceList', 1.39);                                                       // }



// |///////////////////////////////////| End of File |//////////////////////////////////|