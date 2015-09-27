import React from 'react'
import _ from 'lodash'

var injectTapEventPlugin = require('react-tap-event-plugin')

injectTapEventPlugin()

const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
monthNames.push(...monthNames)
monthNames.push(...monthNames)
monthNames.push(...monthNames)

const RaisedButton = require('material-ui/lib/raised-button')
const AppBar = require('material-ui/lib/app-bar')
// const Checkbox = require('material-ui/lib/checkbox')
const Toolbar = require('material-ui/lib/toolbar/toolbar')
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group')
// const ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title')
const ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator')
const DropDownMenu = require('material-ui/lib/drop-down-menu')
// const FontIcon = require('material-ui/lib/font-icon')
// const DropDownIcon = require('material-ui/lib/drop-down-icon')
const TextField = require('material-ui/lib/text-field')

const Table = require('material-ui/lib/table/table')
const TableRow = require('material-ui/lib/table/table-row')
const TableRowColumn = require('material-ui/lib/table/table-row-column')
const TableBody = require('material-ui/lib/table/table-body')
const TableHeader = require('material-ui/lib/table/table-header')
const TableHeaderColumn = require('material-ui/lib/table/table-header-column')
// const TableFooter = require('material-ui/lib/table/table-footer')

const LineChart = require('react-chartjs').Line

const tableConfig = {
  fixedHeader: false,
  fixedFooter: false,
  stripedRows: false,
  showRowHover: false,
  selectable: false,
  multiSelectable: false,
  enableSelectAll: false,
  deselectOnClickaway: true
}

var tableData = [{
  name: 'Santander',
  performancePercent: 4,
  minAmount: 1000,
  minTerm: 7,
  risk: 0.1,
  category: 'Banco'
}, {
  name: 'Uber',
  performancePercent: 9,
  minAmount: 120000,
  minTerm: 6,
  risk: 1.1,
  category: 'Alto riesgo'
}, {
  name: 'Yotepresto',
  performancePercent: 7,
  minAmount: 1000,
  minTerm: 6,
  risk: 0.2,
  category: 'Prestamos'
}, {
  name: 'CETES',
  performancePercent: 3,
  minAmount: 1000,
  minTerm: 6,
  risk: 0.3,
  category: 'Prestamos'
}]

var termOptions = [
  { payload: 3, text: '3 meses' },
  { payload: 6, text: '6 meses' },
  { payload: 12, text: '12 meses' },
  { payload: 24, text: '24 meses' },
  { payload: 36, text: '36 meses' }
]

var outcomeOptions = [
  { payload: '0.5', text: 'Excelente' },
  { payload: '0.25', text: 'Bueno' },
  { payload: '0', text: 'Promedio' },
  { payload: '-0.25', text: 'Malo' },
  { payload: '-0.5', text: 'Pésimo' }
]

function toMoney (val) {
  return '$' + val.toFixed(2).toLocaleString('es-MX', {
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

function getResults (amount, performance, term, risk, outcome) {
  if (term === 0) return amount

  var riskFactor = Math.pow(1 + outcome, term * risk * 0.25)

  var riskVariation = (Math.pow(-1, term + Math.floor(risk * 10)) * risk) / 100 + 1
  riskVariation = 1

  return (amount * Math.pow((performance / 100 + 1), term)) * riskFactor * riskVariation
}

export const App = React.createClass({

  getInitialState () {
    return {
      investAmount: 5000,
      investTerm: 6,
      outcome: '0'
    }
  },

  onChangeInvestAmount (evt) {
    this.setState({
      investAmount: evt.target.value
    })
  },

  onChangeTerm (evt) {
    this.setState({
      investTerm: evt.target.value
    })
  },

  onChangeOutcome (evt) {
    this.setState({
      outcome: evt.target.value
    })
  },

  render () {
    var investAmount = parseInt(this.state.investAmount || 0, 10)
    var investTerm = parseInt(this.state.investTerm || 0, 10)
    var outcome = parseFloat(this.state.outcome || 0)

    var months = monthNames.slice(9, 9 + investTerm)

    return (
      <div>
        <AppBar
          title='Focus Business' />

        <Toolbar>
          <ToolbarGroup key={0}>
            <TextField
              hintText='Dinero a invertir'
              style={{marginTop: '0.25em'}}
              value={investAmount}
              onChange={this.onChangeInvestAmount} />
          </ToolbarGroup>
          <ToolbarGroup key={1}>
            <DropDownMenu menuItems={termOptions} value={investTerm} onChange={this.onChangeTerm} />
          </ToolbarGroup>
          <ToolbarGroup key={2}>
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup key={3}>
            <DropDownMenu menuItems={outcomeOptions} value={'' + outcome} onChange={this.onChangeOutcome} />
          </ToolbarGroup>
          <ToolbarGroup key={4} float='right'>
            <RaisedButton label='Aprende algo, dinero' primary />
          </ToolbarGroup>
        </Toolbar>

        <Table
          fixedHeader={tableConfig.fixedHeader}
          fixedFooter={tableConfig.fixedFooter}
          selectable={tableConfig.selectable}
          multiSelectable={tableConfig.multiSelectable}
          onRowSelection={this._onRowSelection}>
          <TableHeader enableSelectAll={tableConfig.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn>Nombre</TableHeaderColumn>
              <TableHeaderColumn>Rendimiento</TableHeaderColumn>
              <TableHeaderColumn>Riesgo</TableHeaderColumn>
              <TableHeaderColumn>Categoría</TableHeaderColumn>
              <TableHeaderColumn>Expected</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={tableConfig.deselectOnClickaway}
            showRowHover={tableConfig.showRowHover}
            stripedRows={tableConfig.stripedRows}>

            {_.map(tableData, (el, index) => {
              var profits = getResults(investAmount, el.performancePercent, investTerm, el.risk, outcome)

              return (
                <TableRow key={index}>
                  <TableRowColumn>{el.name}</TableRowColumn>
                  <TableRowColumn>{el.performancePercent}%</TableRowColumn>
                  <TableRowColumn>{el.risk}</TableRowColumn>
                  <TableRowColumn>{el.category}</TableRowColumn>
                  <TableRowColumn>{(() => {
                    return toMoney(profits) + ' (' + (profits / investAmount * 100 - 100).toFixed(2) + '%)'
                  })()}
                  </TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton label='Me interesa' />
                  </TableRowColumn>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>

        <LineChart key={months.length} data={
          {
            labels: months,
            datasets: _.map(tableData, (invest) => {
              return {
                label: invest.name,
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: _.map(months, (month, index) => {
                  var profits = getResults(investAmount, invest.performancePercent, index, invest.risk, outcome)
                  return profits
                })
              }
            })
          }} />

      </div>
    )
  }
})

module.exports = App
