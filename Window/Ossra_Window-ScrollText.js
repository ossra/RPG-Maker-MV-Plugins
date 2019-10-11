//=============================================================================
// Window_Base
//=============================================================================

  //---------------------------------------------------------------------------
  // [ALIAS] initialize
  //---------------------------------------------------------------------------

  var tempAlias_WindowBase_initialize = Window_Base.prototype.initialize;

  Window_Base.prototype.initialize = function(x, y, width, height) {

    tempAlias_WindowBase_initialize.call(this, x, y, width, height);

    this.__scrollSpeed = 0;

  };

  //---------------------------------------------------------------------------
  // [ALIAS] update
  //---------------------------------------------------------------------------

  var tempAlias_WindowBase_update = Window_Base.prototype.update;

  Window_Base.prototype.update = function() {

    tempAlias_WindowBase_update.call(this);

    if (this.__scrollSpeed !== 0) {
      this._windowContentsSprite.origin.x += -this.__scrollSpeed;
    }

  };

  //---------------------------------------------------------------------------
  // [SUPER] __updateContents
  //---------------------------------------------------------------------------

  Window_Base.prototype._updateContents = function() {

    Window.prototype._updateContents.call(this);

    if (this.__scrollSpeed !== 0) {
      var w = this.contents.width;
      var h = this.contents.height;

      this._windowContentsSprite.setFrame(this.origin.x, this.origin.y, w, h);
    }

  };

  //---------------------------------------------------------------------------
  // [NEW] createScrollContents
  //---------------------------------------------------------------------------

  Window_Base.prototype.createScrollContents = function(tWidth, tSpeed) {

    this.__scrollSpeed = tSpeed;

    var cWidth   = this.contentsWidth();
    var cHeight  = this.contentsHeight();
    var cPadding = this.padding;
    var sIndex   = this.getChildIndex(this._windowContentsSprite);

    this.removeChild(this._windowContentsSprite);

    this._windowContentsSprite = new TilingSprite();
    this._windowContentsSprite.move(cPadding, cPadding, cWidth, cHeight);
    this._windowContentsSprite.bitmap = new Bitmap(tWidth, cHeight);

    this.addChildAt(this._windowContentsSprite, sIndex);

    this.resetFontSettings();

    this.contents.clear = this.clearScrollContents.bind(this);

  };

  //---------------------------------------------------------------------------
  // [NEW] clearScrollContents
  //---------------------------------------------------------------------------

  Window_Base.prototype.clearScrollContents = function() {

    this.__scrollSpeed = 0;

    var index = this.getChildIndex(this._windowContentsSprite);

    this.removeChild(this._windowContentsSprite);

    this._windowContentsSprite = new Sprite();

    this._refreshContents();

    this.addChildAt(this._windowContentsSprite, index);

    this.createContents();

  };

  //---------------------------------------------------------------------------
  // [ALIAS] processEscapeCharacter
  //---------------------------------------------------------------------------

  var tempAlias_WindowBase_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;

  Window_Base.prototype.processEscapeCharacter = function(code, textState) {

    switch (code) {
      case 'S':
        this.initScroll(textState);
        break;
      default:
        tempAlias_WindowBase_processEscapeCharacter.call(this, code, textState);
        break;
    }

  };

  //---------------------------------------------------------------------------
  // [NEW] initScroll
  //---------------------------------------------------------------------------

  Window_Base.prototype.initScroll = function(textState) {

    var regexp = /^\[(-?\d+\.?\d?),\s+(.+)\]/;
    var arr = regexp.exec(textState.text.slice(textState.index));

    if (arr) {
      textState.index += arr[0].length;

      var speed = parseFloat(arr[1]);
      var width = this.contents.measureTextWidth(arr[2]);
      var index = textState.index + 1;
      var text  = textState.text;

      this.createScrollContents(width, speed);

      textState.text = text.slice(0, index) + arr[2] + text.slice(index);
    } else {
      return '';
    }

  };