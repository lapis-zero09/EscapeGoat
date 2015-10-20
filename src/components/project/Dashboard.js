import React from 'react'

// UI
import Table from '../ui/Table/index.js'

// Store
import RecordStore from '../../stores/RecordStore.js'

function getRecordState() {
  return {
    basic: RecordStore.basic(),
    specialBasic: RecordStore.specialBasic(),
    special: RecordStore.special()
  }
}

function adjustRecord(records) {
  return (
    Object.keys(records).map(function(index) {
      let record = records[index]
      return [
        record.subjectCode,
        record.subjectName,
        record.score,
        record.unit
      ]
    })
  )
}

const Dashboard = React.createClass({
  getInitialState: function() {
    return getRecordState()
  },

  componentDidMount: function() {
    RecordStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function() {
    RecordStore.removeChangeListener(this._onChange)
  },

  render() {
    const tableHeader = ["科目番号", "科目名", "成績", "単位"]

    const basic = this.state.basic
    const specialBasic = this.state.specialBasic
    const special = this.state.special

    const required = specialBasic.required.credit + special.required.credit + basic.required.credit
    const optional = specialBasic.optional.credit + special.optional.credit + basic.optional.credit
    const free = specialBasic.free.credit + special.free.credit + basic.free.credit
    return (
      <div className="container">
        <div className="col-sm-12">
          <h1>Dashboard</h1>
          <h2>概要</h2>
          <div className="card-group">
            <div className="card col-sm-3">
              <div className="card-block">
                <h4 className="card-title">必修科目</h4>
                <p>{required}/51.5</p>
              </div>
            </div>
            <div className="card col-sm-3">
              <div className="card-block">
                <h4 className="card-title">選択科目</h4>
                <p>{optional}/62</p>
              </div>
            </div>
            <div className="card col-sm-3">
              <div className="card-block">
                <h4 className="card-title">自由科目</h4>
                <p>{free}/12</p>
              </div>
            </div>
            <div className="card col-sm-3">
              <div className="card-block">
                <h4 className="card-title">合計</h4>
                <p>{required + optional + free}/125.5</p>
              </div>
            </div>
          </div>
          <hr />

          <h2>基礎科目</h2>
          <hr />
          <div className="row">
            <div className="col-sm-4">
              <h3>
                必修科目(総合+体育)
                <small className="pull-right label label-pill label-default">{basic.required.credit}/10</small>
              </h3>
              <Table header={tableHeader} body={adjustRecord(basic.required.records)} />
            </div>
            <div className="col-sm-4">
              <h3>
                選択科目(外国語)
                <small className="pull-right label label-pill label-default">{basic.optional.credit}/9</small>
              </h3>
              <Table header={tableHeader} body={adjustRecord(basic.optional.records)} />
            </div>
            <div className="col-sm-4">
              <h3>
                自由科目
                <small className="pull-right label label-pill label-default">{basic.free.credit}/0</small>
              </h3>
              <Table header={tableHeader} body={adjustRecord(basic.free.records)} />
            </div>
          </div>

          <h2>専門基礎科目</h2>
          <hr />
          <div className="row">
            <div className="col-sm-4">
              <h3>
                必修科目
                <small className="pull-right label label-pill label-default">{specialBasic.required.credit}/22.5</small>
              </h3>
              <Table header={tableHeader} body={adjustRecord(specialBasic.required.records)} />
            </div>
            <div className="col-sm-4">
              <h3>
                選択科目
                <small className="pull-right label label-pill label-default">{specialBasic.optional.credit}/32</small>
              </h3>
              <Table header={tableHeader} body={adjustRecord(specialBasic.optional.records)} />
            </div>
            <div className="col-sm-4">
              <h3>
                自由科目
                <small className="pull-right label label-pill label-default">{specialBasic.free.credit}/0</small>
              </h3>
              <Table header={tableHeader} body={adjustRecord(specialBasic.free.records)} />
            </div>
          </div>

          <h2>専門科目</h2>
          <hr />
          <div className="row">
            <div className="col-sm-4">
              <h3>
                必修科目
                <small className="pull-right label label-pill label-default">{special.required.credit}/10</small>
              </h3>
              <Table header={tableHeader} body={adjustRecord(special.required.records)} />
            </div>
            <div className="col-sm-4">
              <h3>
                選択科目
                <small className="pull-right label label-pill label-default">{special.optional.credit}/30</small>
              </h3>
              <Table header={tableHeader} body={adjustRecord(special.optional.records)} />
            </div>
            <div className="col-sm-4">
              <h3>
                自由科目
                <small className="pull-right label label-pill label-default">{special.free.credit}/0</small>
              </h3>
              <Table header={tableHeader} body={adjustRecord(special.free.records)} />
            </div>
          </div>
        </div>
      </div>
    )
  },

  _onChange: function() {
    this.setState(getRecordState());
  }
})

module.exports = Dashboard
