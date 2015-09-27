let Colors = require('../../node_modules/material-ui/lib/styles/colors')
let ColorManipulator = require('../../node_modules/material-ui/lib/utils/color-manipulator')
let Spacing = require('../../node_modules/material-ui/lib/styles/spacing')

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.pinkA200,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.cyan100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.darkBlack,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
  }
}
