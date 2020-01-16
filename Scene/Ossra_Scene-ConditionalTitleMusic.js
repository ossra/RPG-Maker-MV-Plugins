// +====================================================================================+
// |||  Scene | Conditional Title Music
// +====================================================================================+
/*:
 * @plugindesc [1.15] Conditionally play specified audio files on the title screen.
 * @author Ossra
 *
 * @help
 * ==| Plugin Information      |=================================================
 *
 *   - Author  : Ossra
 *   - Contact : garden.of.ossra [at] gmail
 *   - Version : 1.15 [RPG Maker MV 1.6.2]
 *   - Release : 25th July 2016
 *   - Updated : 15th January 2020
 *   - License : Free for Commercial and Non-Commercial Usage
 *
 * @param optionsPluginOptions
 * @text Plugin Options
 * @type text
 * @default ------------------------------------
 *
 * @param list
 * @text Play List
 * @desc The list of audio files and play conditions.
 * @parent optionsPluginOptions
 * @type struct<optionsList>[]
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
/*~struct~optionsList:
 * @param audio
 * @text File List
 * @desc The list of audio files to be played.
 * @type struct<optionsParameters>[]
 *
 * @param playIf__evalCondition
 * @text Play Condition
 * @desc Javascript evaluated condition. A result of 'true' will
 * cause the specified audio files to be played.
 * @type text
 */
/*~struct~optionsParameters:
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
  // | [Method] evalCondition
  // +----------------------------------------------------------------------------------+

    $.evalCondition = function(param) {

      var func = function () {
        "use strict"

        return eval(param);
      };

      return func.bind(null);

    }; // Functions << evalCondition

  // +----------------------------------------------------------------------------------+
  // | [Method] getType
  // +----------------------------------------------------------------------------------+

    $.getType = function(param) {

      var object = { 'type': '', 'name': '' };

      if (/^(.+)\/(.+)$/i.test(param)) {
        object.type = RegExp.$1;
        object.name = RegExp.$2;
      }

      this.name = object.name;

      return object;

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

      'list':
      [
        {
          'audio':
          [
            {
              'file': ossFunc.getType(),
              'volume': 90,
              'pitch': 100,
              'pan': 0,
              'pos': 0
            }
          ],
          'playIf': ossFunc.evalCondition('false')
        }
      ]

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
    var _fnc = setNamespace(ossFunc, 'Scene_Title');

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] playTitleMusic
  // +----------------------------------------------------------------------------------+

    $scn.playTitleMusic = $.prototype.playTitleMusic;

    $.prototype.playTitleMusic = function() {

      AudioManager.stopAll();

      if (_fnc.checkTitleMusic()) {
        $scn.playTitleMusic.call(this);
      }

    }; // Scene_Title << playTitleMusic

  // ALIAS -----------------------------------------------------------------------------+
  // | [Method] terminate
  // +----------------------------------------------------------------------------------+

    $scn.terminate = $.prototype.terminate;

    $.prototype.terminate = function() {

      $scn.terminate.call(this);

      AudioManager.stopAll();

    }; // Scene_Title << terminate

  // NEW -------------------------------------------------------------------------------+
  // | [Method] checkTitleMusic
  // +----------------------------------------------------------------------------------+

    _fnc.checkTitleMusic = function() {

      for (var id = 0; id < ossConfig.list.length; id++) {
        var list = ossConfig.list[id];

        if (list.playIf()) {
          _fnc.playMusicList(list.audio);

          return false;
        }
      }

      return true;

    }; // Scene_Title << checkTitleMusic

  // NEW -------------------------------------------------------------------------------+
  // | [Method] playMusicList
  // +----------------------------------------------------------------------------------+

    _fnc.playMusicList = function(list) {

      for (var id = 0; id < list.length; id++) {
        var audio = list[id];

        switch (audio.file.type) {
          case 'bgm':
            AudioManager.playBgm(audio, audio.pos);
            break;
          case 'bgs':
            AudioManager.playBgs(audio, audio.pos);
            break;
          case 'me':
            AudioManager.playMe(audio);
            break;
          case 'se':
            AudioManager.playSe(audio);
            break;
        }
      }

    }; // Scene_Title << playMusicList

  })(Scene_Title);                                                                   // }



})('Scene.ConditionalTitleMusic', 1.15);                                             // }



// |///////////////////////////////////| End of File |//////////////////////////////////|