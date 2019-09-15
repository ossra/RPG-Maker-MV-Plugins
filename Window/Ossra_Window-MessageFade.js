// +====================================================================================+
// |||  Window | Message Fade
// +====================================================================================+
/*:
 * @plugindesc [1.00]
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
 * @default ossra-9Qt0qS3kn4Xdryn
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.00
 *   - Release : 15th September 2019
 *   - Updated : 15th September 2019
 *   - License : Free for Commercial and Non-Commercial Usage
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

  // +=================================================|                 Window_Message |
  // | [Plugin] Window_Message
  // +==================================================================================+

    var $win = setNamespace(ossObject, 'Window_Message');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] updateOpen
  // +----------------------------------------------------------------------------------+

    $win.updateOpen = $.prototype.updateOpen;

    $.prototype.updateOpen = function() {

      $win.updateOpen.call(this);

      this.updateFade();

    }; // Window_Message << updateOpen

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] updateClose
  // +----------------------------------------------------------------------------------+

    $win.updateClose = $.prototype.updateClose;

    $.prototype.updateClose = function() {

      $win.updateClose.call(this);

      this.updateFade();

    }; // Window_Message << updateClose
    
  // NEW -------------------------------------------------------------------------------+
  // | [Method] updateFade
  // +----------------------------------------------------------------------------------+

    $.prototype.updateFade = function() {

      if (this._closing || this._opening) {
        if (this._background === 0) {
          this.opacity = this.openness;
        }
      }

    }; // Window_Message << updateFade

  })(Window_Message);                                                                // }



})('Window.MessageFade', 1.00);                                                      // }



// |///////////////////////////////////| End of File |//////////////////////////////////|
