  var cocoa = {};

  cocoa.run = function(str, globals) {
    var methods = str.split(';');
    methods.forEach(function(method) {
      var token = method.split(':');
      if(token[0] == 'call') {
        if(token[1]) {
          var args = [];
          token.slice(2).forEach(function(argument) {
            var isString = argument.match(/([a-z])([a-z0-9]+)/i);
            var isNumber = argument.match(/([0-9])/i);
            if(isString.length != 0) {
              if(isString[0] == argument) {
                args.push(argument);
              }
            } else if(isNumber.length != 0) {
              if(isNumber[0] == argument) {
                args.push(argument.toNumber());
              }
            } else if(argument == 'true') {
              args.push(true);
            } else if(argument == 'false') {
              args.push(false);
            } else {
              args.push(null);
            }
          })
          if(globals[token[1]]) {
            globals[token[1]].apply(args);
          } else {
            throw new Error('\'call\' method requires a global function.');
            process.exit();
          }
        }
      }
    })
  }
