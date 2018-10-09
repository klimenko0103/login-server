'use strict';

exports.__esModule = true;

exports['default'] = function (_ref) {
  var Plugin = _ref.Plugin;
  var t = _ref.types;

  var visitor = {
    Property: {
      exit: function exit(node) {
        if (node.computed || node.key.name !== 'propTypes') {
          return;
        }

        var parent = this.findParent(function (parent) {
          if (parent.type !== 'CallExpression') {
            return false;
          }

          return parent.get('callee').matchesPattern('React.createClass');
        });

        if (parent) {
          this.dangerouslyRemove();
        }
      }
    },
    ClassProperty: function ClassProperty(node, parent, scope) {
      if (node.key.name === 'propTypes') {
        var className = scope.block.id.name;
        var binding = this.scope.getBinding(className);
        var superClass = binding.path.get('superClass');
        if (superClass.matchesPattern('React.Component') || superClass.matchesPattern('Component')) {
          this.dangerouslyRemove();
        }
      }
    },
    AssignmentExpression: function AssignmentExpression(node) {
      if (node.left.computed || !node.left.property || node.left.property.name !== 'propTypes') {
        return;
      }

      var className = node.left.object.name;
      var binding = this.scope.getBinding(className);
      if (!binding || !binding.path.isClassDeclaration()) {
        return;
      }

      var superClass = binding.path.get('superClass');
      if (superClass.matchesPattern('React.Component') || superClass.matchesPattern('Component')) {
        this.dangerouslyRemove();
      }
    }
  };

  return new Plugin('react-remove-prop-types', {
    visitor: visitor,
    metadata: {
      group: 'builtin-pre'
    }
  });
};

;
module.exports = exports['default'];