var assert = require('assert');
var chalk = require('chalk');
var stripAnsi = require('strip-ansi');
var fixedWidth = require('./');

describe('align', function(){
  it('should align to left by default', function(){
    assert(fixedWidth('test', 8) === 'test    ');
  });

  it('should align to left when wrong align value', function(){
    assert(fixedWidth('test', 8, { align: 'foo' }) === 'test    ');
  });

  it('should align to right when align option is "right"', function(){
    assert(fixedWidth('test', 8, { align: 'right' }) === '    test');
  });
});

describe('padding', function(){
  it('should pad with space by default', function(){
    assert(fixedWidth('test', 8) === 'test    ');
  });

  it('should pad with specified string', function(){
    assert(fixedWidth('test', 8, { padding: '.' }) === 'test....');
  });
});

describe('truncate', function(){
  it('should truncate with … by default', function(){
    assert(fixedWidth('hello world', 8) === 'hello w…');
  });

  it('should truncate with specified ellipsis string', function(){
    assert(fixedWidth('hello world', 8, { ellipsis: '...' }) === 'hello...');
  });
});

describe('fit to width colored string', function(){
  var str = chalk.blue(chalk.green('hello') + '_' + chalk.red('world'));

  it('default settings', function(){
    for (var i = 0; i < 12; i++)
      assert(stripAnsi(fixedWidth(str, i)).length === i);
  });

  it('truncate left', function(){
    for (var i = 0; i < 12; i++)
      assert(stripAnsi(fixedWidth(str, i, { truncate: 'left' })).length === i);
  });

  it('align right', function(){
    for (var i = 0; i < 12; i++)
      assert(stripAnsi(fixedWidth(str, i, { align: 'right' })).length === i);
  });

  it('align right truncate right', function(){
    for (var i = 0; i < 12; i++)
      assert(stripAnsi(fixedWidth(str, i, { align: 'right', truncate: 'right' })).length === i);
  });
});
