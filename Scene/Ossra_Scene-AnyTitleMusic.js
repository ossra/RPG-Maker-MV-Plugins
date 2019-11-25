// +====================================================================================+
// |||  Scene | Any Title Music
// +====================================================================================+
/*:
 * @plugindesc [1.07] Play a selected audio file on the Title Screen
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.07 [RPG Maker MV 1.6.2]
 *   - Release : 25th July 2016
 *   - Updated : 25th November 2019
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param optionsPluginOptions
 * @text Plugin Options
 * @type text
 * @default ------------------------------------
 *
 * @param audio
 * @text Audio File
 * @desc The parameters of the audio file.
 * @parent optionsPluginOptions
 * @type struct<optionsMe>
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
 * @default ossra-zO9wKkOE7HpTupE
 *
 */
// +===================================================|                        Structs |
// | [Plugin] Structs
// +====================================================================================+
/*~struct~optionsMe:
 * @param file__getType
 * @text File
 * @desc Name of the audio file.
 * @type file
 * @dir audio/
 *
 * @param volume
 * @text Volume
 * @desc Volume of the audio file.
 * @type number
 * @default 90
 * @max 100
 *
 * @param pitch
 * @text Pitch
 * @desc Pitch of the audio file.
 * @type number
 * @default 100
 * @max 200
 *
 * @param pan
 * @text Pan
 * @desc Pan of the audio file.
 * @type number
 * @default 0
 * @max 100
 * @min -100
 *
 * @param pos
 * @text Position
 * @desc Start position of the audio file in seconds.
 * Only supported by 'BGM' and 'BGS' audio types.
 * @type number
 * @decimals 2
 * @default 0
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
  // | [Method] getType
  // +----------------------------------------------------------------------------------+

    $.getType = function(param) {

      var obj = { type: '', name: '' };

      if (/^(.+)\/(.+)$/i.test(param)) {
        obj.type = RegExp.$1;
        obj.name = RegExp.$2;
      }

      return obj;

    }; // Functions << getType

  })(ossFunc);                                                                       // }



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
        var _key, _fnc, _val;
        return JSON.parse(json, function(key, value) {
          [_key, _fnc] = key.split('__');
          var _def = defaults[_key];
          _val = value !== '' ? value : _def;

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

      'audio':
      {
        'file':
        {
          'type': '',
          'name': ''
        },
        'volume': 90,
        'pitch': 100,
        'pan': 0,
        'pos': 0
      }

    };

  // +----------------------------------------------------------------------------------+
  // | [Setup] Set Configuration
  // +----------------------------------------------------------------------------------+

    createConfig('ossra-zO9wKkOE7HpTupE', ossDefaults);

  })();                                                                              // }



  (function($) {                                                                     // {

  // +=================================================|                    Scene_Title |
  // | [Plugin] Scene_Title
  // +==================================================================================+

    var $scn = setNamespace(ossScene, 'Scene_Title');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] playTitleMusic
  // +----------------------------------------------------------------------------------+

    $scn.playTitleMusic = $.prototype.playTitleMusic;

    $.prototype.playTitleMusic = function() {

      if (ossConfig.audio.file.name !== '') {
        AudioManager.stopAll();

        var data    = AudioManager.makeEmptyAudioObject();

        data.name   = ossConfig.audio.file.name;
        data.volume = ossConfig.audio.volume;
        data.pitch  = ossConfig.audio.pitch;
        data.pan    = ossConfig.audio.pan;
        data.pos    = ossConfig.audio.pos;

        switch (ossConfig.audio.file.type) {
          case 'bgm':
            AudioManager.playBgm(data, data.pos);
            break;
          case 'bgs':
            AudioManager.playBgs(data, data.pos);
            break;
          case 'me':
            AudioManager.playMe(data);
            break;
          case 'se':
            AudioManager.playSe(data);
            break;
        }
      } else {
        $scn.playTitleMusic.call(this);
      }

    }; // Scene_Title << playTitleMusic

  })(Scene_Title);                                                                   // }



})('Scene.AnyTitleMusic', 1.07);                                                     // }



// |///////////////////////////////////| End of File |//////////////////////////////////|