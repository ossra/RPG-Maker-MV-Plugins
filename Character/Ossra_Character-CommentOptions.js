// +====================================================================================+
// |||  Character | Comment Options
// +====================================================================================+
/*:
 * @plugindesc [1.13] Options to apply various properties to events.
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
 * @default ossra-M2yunTHwbIo75yr
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.13
 *   - Release : 24rd July 2016
 *   - Updated : 12th September 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * ==| Comment Tags            |=================================================
 *
 *  (+) <ossra CommentOptions set property: value>
 *  (+) <ossra CommentOptions set property,property: value,value>
 *   |--------------------------------------------------------------------------|
 *   | Set the position of the choice list on the screen.
 *   |--------------------------------------------------------------------------|
 *   | < Name >        < Type >        < Note >
 *   | property        String
 *   | value           Any
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



  (function($) {                                                                     // {

  // +=================================================|                     Game_Event |
  // | [Plugin] Game_Event
  // +==================================================================================+

    var $obj = setNamespace(ossObject, 'Game_Event');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] refresh
  // +----------------------------------------------------------------------------------+

    $obj.refresh = $.prototype.refresh;

    $.prototype.refresh = function() {

      var newPageIndex = this._erased ? -1 : this.findProperPageIndex();
      var oldPageIndex = this._pageIndex;

      $obj.refresh.call(this);

      if (oldPageIndex !== newPageIndex) {
        ossFunc.setupComments.call(this);
      }

    }; // Game_Event << refresh

  // NEW -------------------------------------------------------------------------------+
  // | [Method] setupComments
  // +----------------------------------------------------------------------------------+

    ossFunc.setupComments = function() {

      if (this.page()) {

        this.page().list.forEach(function(data) {
          if (data.code == 108 || data.code == 408) {
            if (/<ossra CommentOptions set (.*):\s?(.*)>/i.test(data.parameters[0])) {
              ossFunc.processComment.call(this, RegExp.$1, RegExp.$2);
            }
          }
        }, this);

      }

    }; // Game_Event << setupComments

  // NEW -------------------------------------------------------------------------------+
  // | [Method] processComment
  // +----------------------------------------------------------------------------------+

    ossFunc.processComment = function(property, value) {

      property = property.split(',');
      value    = value.split(',');

      if (property.length === value.length) {

        for (var i = 0; i < property.length; i++) {
          var prop = property[i];
          var prop = this.hasOwnProperty('_' + prop) ? '_' + prop : prop;

          try {
            this[prop] = JSON.parse(value[i]);
          } catch (error) {
            this[prop] = value[i];
          }
        }

      }

    }; // Game_Event << processComment

  })(Game_Event);                                                                    // }



})('Character.CommentOptions', 1.13);                                                // }



// |///////////////////////////////////| End of File |//////////////////////////////////|