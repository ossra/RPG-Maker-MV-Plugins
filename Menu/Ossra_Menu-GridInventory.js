// +====================================================================================+
// |||  Menu | Grid Inventory
// +====================================================================================+
/*:
 *  @plugindesc [1.17] Creates a Grid Inventory.
 *  @author Ossra
 *
 * @help
 * ==| Plugin                  |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.17 [RPG Maker MV 1.6.2]
 *   - Release : 2nd September 2019
 *   - Updated : 8th October 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param headerGridInventory
 * @text Grid Inventory
 * @type text
 * @default ------------------------------------
 *
 * @param category
 * @text Item Category Window
 * @desc Options for the Item Category Window.
 * @parent headerGridInventory
 * @type struct<windowItemCategory>
 *
 * @param list
 * @text Item List Window
 * @desc Options for the Item List Window.
 * @parent headerGridInventory
 * @type struct<windowItemList>
 *
 * @param help
 * @text Item Help Window
 * @desc Options for the Item Help Window.
 * @parent headerGridInventory
 * @type struct<windowHelp>
 *
 * @param select
 * @text Select Item Window
 * @desc Options for the Select Item Window.
 * @parent headerGridInventory
 * @type struct<windowSelectItem>
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
 * @default ossra-b5cjfd4wCKzSaOf
 */
// +===================================================|                        Structs |
// | [Plugin] Structs
// +====================================================================================+
/*~struct~windowItemCategory:
 * @param x
 * @text X
 * @desc X Coordinate of the Item Category Window.
 * Default: -1 (Use Default Coordinates).
 * @type number
 * @default -1
 * @min -1
 *
 * @param y
 * @text Y
 * @desc Y Coordinate of the Item Category Window.
 * Default: -1 (Use Default Coordinates).
 * @type number
 * @default -1
 * @min -1
 *
 * @param width
 * @text Width
 * @desc Width of the Item Category Window.
 * Default: -1 (Use Default Width).
 * @type number
 * @default -1
 * @min -1
 *
 * @param columns
 * @text Columns
 * @desc Number of Columns shown by the Item Category Window.
 * Default: -1 (Use Default Columns).
 * @type number
 * @default -1
 * @min -1
 */
 /*~struct~windowItemList:
 * @param x
 * @text X
 * @desc X Coordinate of the Item List Window.
 * Default: -1 (Use Default Coordinates).
 * @type number
 * @default -1
 * @min -1
 *
 * @param y
 * @text Y
 * @desc Y Coordinate of the Item List Window.
 * Default: -1 (Use Default Coordinates).
 * @type number
 * @default -1
 * @min -1
 *
 * @param width
 * @text Width
 * @desc Width of the Item List Window.
 * Default: -1 (Use Default Width).
 * @type number
 * @default -1
 * @min -1
 *
 * @param height
 * @text Height
 * @desc Height of the Item List Window.
 * Default: -1 (Use Default Height).
 * @type number
 * @default -1
 * @min -1
 *
 * @param text
 * @text Item Text
 * @desc Options for Item Text in all Item List Windows.
 * @type struct<itemListText>
 *
 * @param icon
 * @text Item Icon
 * @desc Options for Item Icons in all Item List Windows.
 * @type struct<itemListIcon>
 */
 /*~struct~itemListText:
 * @param x
 * @text Adjust X
 * @desc X Adjustment for the List Item Text. Negative values are accepted.
 * @type number
 * @default 0
 * @min -999999
 *
 * @param y
 * @text Adjust Y
 * @desc Y Adjustment for the List Item Text. Negative values are accepted.
 * @type number
 * @default 0
 * @min -999999
 *
 * @param size
 * @text Size
 * @desc Font Size of the List Item Text.
 * Default: -1 (Use Default Font Size).
 * @type number
 * @default -1
 * @min -1
 *
 * @param color
 * @text Color
 * @desc Font Color of the List Item Text. Use any valid CSS color values.
 * @type text
 * @default #ffffff
 *
 * @param opacity
 * @text Opacity
 * @desc Opacity of the List Item Text.
 * @type number
 * @default 255
 * @max 255
 *
 * @param bold
 * @text Bold
 * @desc Enable or Disable Bold for List Item Text.
 * @type boolean
 * @on Enable
 * @off Disable
 * @default false
 *
 * @param italics
 * @text Italic
 * @desc Enable or Disable Italics for List Item Text.
 * @type boolean
 * @on Enable
 * @off Disable
 * @default false
 *
 * @param outlineWidth
 * @text Outline Width
 * @desc Outline Width of the List Item Text.
 * @type number
 * @default -1
 * @min -1
 *
 * @param outlineColor
 * @text Outline Color
 * @desc Outline Color of the List Item Text. Use any valid CSS color values.
 * @type text
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param align
 * @text Alignment
 * @desc Text Alignment of the List Item Text.
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default right
 */
 /*~struct~itemListIcon:
 * @param size
 * @text Icon Size
 * @desc Icon Size of each List Item Icon.
 * @type number
 * @default 32
 *
 * @param padding
 * @text Icon Padding
 * @desc Icon Padding of each List Item Icon.
 * @type number
 * @default 4
 *
 * @param spacing
 * @text Icon Spacing
 * @desc Icon Spacing between each List Item Icon.
 * @type number
 * @default 24
 */
 /*~struct~windowHelp:
 * @param x
 * @text X
 * @desc X Coordinate of the Item Help Window.
 * Default: -1 (Use Default Coordinates).
 * @type number
 * @default -1
 * @min -1
 *
 * @param y
 * @text Y
 * @desc Y Coordinate of the Item Help Window.
 * Default: -1 (Use Default Coordinates).
 * @type number
 * @default -1
 * @min -1
 *
 * @param width
 * @text Width
 * @desc Width of the Item Help Window.
 * Default: -1 (Use Default Width).
 * @type number
 * @default -1
 * @min -1
 *
 * @param lines
 * @text Text Lines
 * @desc Number of Text Lines displayed by the Item Help Window.
 * Set value to 0 to hide the Item Help Window.
 * @type number
 * @default 2
 */
 /*~struct~windowSelectItem:
 * @param x
 * @text X
 * @desc X Coordinate of the Select Item Window.
 * Default: -1 (Use Default Coordinates).
 * @type number
 * @default -1
 * @min -1
 *
 * @param y
 * @text Y
 * @desc Y Coordinate of the Select Item Window.
 * Default: -1 (Use Default Coordinates).
 * @type number
 * @default -1
 * @min -1
 *
 * @param width
 * @text Width
 * @desc Width of the Select Item Window.
 * Default: -1 (Use Default Width).
 * @type number
 * @default -1
 * @min -1
 *
 * @param lines
 * @text Text Lines
 * @desc Number of Text Lines displayed by the Select Item Window.
 * Default: -1 (Use Default Lines).
 * @type number
 * @default -1
 * @min -1
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



  // +=================================================|                  Configuration |
  // | [Plugin] Configuration
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

      'category':
      {
        'x': -1,
        'y': -1,
        'width': -1,
        'columns': -1
      },
      'list':
      {
        'x': -1,
        'y': -1,
        'width': -1,
        'height': -1,
        'text':
        {
          'x': 0,
          'y': 0,
          'size': -1,
          'color': '#ffffff',
          'opacity': 255,
          'italics': false,
          'bold': false,
          'outlineWidth': -1,
          'outlineColor': 'rgba(0, 0, 0, 0.5)',
          'align': 'right'
        },
        'icon':
        {
          'size': 32,
          'padding': 4,
          'spacing': 24
        }
      },
      'help':
      {
        'x': -1,
        'y': -1,
        'width': -1,
        'lines': 2
      },
      'select':
      {
        'x': -1,
        'y': -1,
        'width': -1,
        'lines': -1
      }

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Parse Parameters
  // +----------------------------------------------------------------------------------+

    getAllParameters('ossra-b5cjfd4wCKzSaOf', ossDefaults);

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|            Window_ItemCategory |
  // | [Plugin] Window_ItemCategory
  // +==================================================================================+

    var $win = setNamespace(ossWindow, 'Window_ItemCategory');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] maxCols
  // +----------------------------------------------------------------------------------+

    $win.maxCols = $.prototype.maxCols;

    $.prototype.maxCols = function() {

      if (ossConfig.category.columns > 0) {
        return ossConfig.category.columns;
      } else {
        return $win.maxCols.call(this);
      }

    }; // Window_ItemCategory ‹‹ maxCols

  })(Window_ItemCategory);                                                           // }



  (function($) {                                                                     // {

  // +=================================================|                Window_ItemList |
  // | [Plugin] Window_ItemList
  // +==================================================================================+

    var $win = setNamespace(ossWindow, 'Window_ItemList');
    var _fnc = setNamespace(ossFunc, 'Window_ItemList');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] createContents
  // +----------------------------------------------------------------------------------+

    $win.createContents = $.prototype.createContents;
      
    $.prototype.createContents = function() {

      Window_Selectable.prototype.createContents.call(this);

      this.contents._makeFontNameText = _fnc.getFontStyle.bind(this);

    }; // Window_ItemList ‹‹ createContents

  // NEW -------------------------------------------------------------------------------+
  // | [Method] getFontStyle
  // +----------------------------------------------------------------------------------+

    _fnc.getFontStyle = function() {

      var fontFace   = this.contents.fontFace;
      var fontSize   = this.contents.fontSize;
      var fontItalic = ossConfig.list.text.italics;
      var fontBold   = ossConfig.list.text.bold;

      return (fontItalic ? 'Italic ' : '') +
             (fontBold ? 'Bold ' : '') +
              fontSize + 'px ' + fontFace;

    }; // Window_ItemList << getFontStyle

  // OVERWRITE -------------------------------------------------------------------------+
  // | [Method] maxCols
  // +----------------------------------------------------------------------------------+

    $.prototype.maxCols = function() {

      return Math.floor((this.width - (this.padding * 2)) / this.itemMaxSize());

    }; // Window_ItemList ‹‹ maxCols

  // OVERWRITE -------------------------------------------------------------------------+
  // | [Method] itemWidth
  // +----------------------------------------------------------------------------------+

    $.prototype.itemWidth = function() {

      return ossConfig.list.icon.size + ossConfig.list.icon.padding;

    }; // Window_ItemList ‹‹ itemWidth

  // OVERWRITE -------------------------------------------------------------------------+
  // | [Method] itemHeight
  // +----------------------------------------------------------------------------------+

    $.prototype.itemHeight = function() {

      return ossConfig.list.icon.size + ossConfig.list.icon.padding;

    }; // Window_ItemList ‹‹ itemHeight

  // OVERWRITE -------------------------------------------------------------------------+
  // | [Method] spacing
  // +----------------------------------------------------------------------------------+

    $.prototype.spacing = function() {

      return ossConfig.list.icon.spacing;

    }; // Window_ItemList ‹‹ spacing

  // NEW -------------------------------------------------------------------------------+
  // | [Method] itemMaxSize
  // +----------------------------------------------------------------------------------+

    $.prototype.itemMaxSize = function() {

      var iconSize    = ossConfig.list.icon.size;
      var iconPadding = ossConfig.list.icon.padding;
      var iconSpacing = ossConfig.list.icon.spacing;

      return iconSize + iconPadding + iconSpacing;

    }; // Window_ItemList ‹‹ itemMaxSize

  // OVERWRITE -------------------------------------------------------------------------+
  // | [Method] drawItem
  // +----------------------------------------------------------------------------------+

    $.prototype.drawItem = function(index) {

      var item = this._data[index];

      if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);

        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, 0);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
      }

    }; // Window_ItemList ‹‹ drawItem

  // OVERWRITE -------------------------------------------------------------------------+
  // | [Method] standardFontSize
  // +----------------------------------------------------------------------------------+

    $.prototype.standardFontSize = function() {

      if (ossConfig.list.text.size > -1) {
        return ossConfig.list.text.size;
      } else {
        return Window_Base.prototype.standardFontSize.call(this);
      }

    }; // Window_ItemList ‹‹ standardFontSize

  // OVERWRITE -------------------------------------------------------------------------+
  // | [Method] drawItemNumber
  // +----------------------------------------------------------------------------------+

    $.prototype.drawItemNumber = function(item, x, y, width) {

      if (this.needsNumber()) {
        var textAlign = ossConfig.list.text.align;

        x += ossConfig.list.text.x;
        y += ossConfig.list.text.y;

        if (ossConfig.list.text.color) {
          this.changeTextColor(ossConfig.list.text.color);
        }

        if (ossConfig.list.text.outlineWidth > -1) {
          this.contents.outlineWidth = ossConfig.list.text.outlineWidth;
        }

        if (ossConfig.list.text.outlineColor !== '') {
          this.contents.outlineColor = ossConfig.list.text.outlineColor;
        }

        if (ossConfig.list.text.opacity < 255) {
          this.contents.paintOpacity = ossConfig.list.text.opacity;
        }

        this.drawText($gameParty.numItems(item), x, y, width, textAlign);
        this.resetTextColor();
      }

    }; // Window_ItemList ‹‹ drawItemNumber

  // OVERWRITE -------------------------------------------------------------------------+
  // | [Method] drawItemName
  // +----------------------------------------------------------------------------------+

    $.prototype.drawItemName = function(item, x, y, width) {

      if (item) {
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
      }

    }; // Window_ItemList ‹‹ drawItemName

  })(Window_ItemList);                                                               // }



  (function($) {                                                                     // {

  // +=================================================|               Window_EventItem |
  // | [Plugin] Window_EventItem
  // +==================================================================================+

    var $win = setNamespace(ossWindow, 'Window_EventItem');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] updatePlacement
  // +----------------------------------------------------------------------------------+

    $win.updatePlacement = $.prototype.updatePlacement;

    $.prototype.updatePlacement = function() {

      if (ossConfig.select.x > -1) {
        this.x = ossConfig.select.x;
      }

      if (ossConfig.select.y > -1) {
        this.y = ossConfig.select.y;
      } else {
        $win.updatePlacement.call(this);
      }

      if (ossConfig.select.width > -1) {
        this.width = ossConfig.select.width;
      }

      if (ossConfig.select.lines > -1) {
        this.height = this.fittingHeight(ossConfig.select.lines);
      }

    }; // Window_ItemCategory ‹‹ maxCols

  })(Window_EventItem);                                                              // }



  (function($) {                                                                     // {

  // +=================================================|                     Scene_Item |
  // | [Plugin] Scene_Item
  // +==================================================================================+

    var $scn = setNamespace(ossScene, 'Scene_Item');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] createCategoryWindow
  // +----------------------------------------------------------------------------------+

    $scn.createCategoryWindow = $.prototype.createCategoryWindow;

    $.prototype.createCategoryWindow = function() {

      $scn.createCategoryWindow.call(this);

      if (ossConfig.category.x > -1) {
        this._categoryWindow.x = ossConfig.category.x;
      }

      if (ossConfig.category.y > -1) {
        this._categoryWindow.y = ossConfig.category.y;
      }

      if (ossConfig.category.width > -1) {
        this._categoryWindow.width = ossConfig.category.width;
      }

      this._categoryWindow.refresh();

    }; // Scene_Item ‹‹ createCategoryWindow

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] createItemWindow
  // +----------------------------------------------------------------------------------+

    $scn.createItemWindow = $.prototype.createItemWindow;

    $.prototype.createItemWindow = function() {

      $scn.createItemWindow.call(this);

      if (ossConfig.list.x > -1) {
        this._itemWindow.x = ossConfig.list.x;
      }

      if (ossConfig.list.y > -1) {
        this._itemWindow.y = ossConfig.list.y;
      }

      if (ossConfig.list.width > -1) {
        this._itemWindow.width = ossConfig.list.width;
      }

      if (ossConfig.list.height > -1) {
        this._itemWindow.height = ossConfig.list.height;
      }

      this._itemWindow.refresh();

    }; // Scene_Item ‹‹ createItemWindow

  // SUPER -----------------------------------------------------------------------------+
  // | [Method] createHelpWindow
  // +----------------------------------------------------------------------------------+

    $.prototype.createHelpWindow = function() {

      Scene_MenuBase.prototype.createHelpWindow.call(this);

      if (ossConfig.help.x > -1) {
        this._helpWindow.x = ossConfig.help.x;
      }

      if (ossConfig.help.y > -1) {
        this._helpWindow.y = ossConfig.help.y;
      }

      if (ossConfig.help.width > -1) {
        this._helpWindow.width = ossConfig.help.width;
      }

      if (ossConfig.help.lines > 0) {
        var height = this._helpWindow.fittingHeight(ossConfig.help.lines);
        this._helpWindow.height = height;
      } else {
        this._helpWindow.height = 0;
        this._helpWindow.hide();
      }

    }; // Scene_Item ‹‹ createHelpWindow

  })(Scene_Item);                                                                    // }



})('Menu.GridInventory', 1.17);                                                      // }



// |///////////////////////////////////| End of File |//////////////////////////////////|