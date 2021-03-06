var React = require('react');
var reactRouter = require('react-router');
var Link = reactRouter.Link;

// Store
var RecordStore = require('../../stores/RecordStore.js');

function getRecordState() {
  return {
    count: RecordStore.count()
  };
}

var Navbar = React.createClass({
  getInitialState: function() {
    return getRecordState();
  },

  componentDidMount: function() {
    RecordStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RecordStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <nav className="navbar navbar-dark bg-inverse">
        <div className="container">
          <Link className="brand" to="/usage" >
            <img src="assets/images/goat-head_gray.png" width="38" height="auto" />
          </Link>
          <ul className="nav navbar-nav pull-right">
            <li className="nav-item">
              { !this.state.count ?
              <Link className="nav-link disabled" to="">卒業判定</Link>:
              <Link className="nav-link" to="/dashboard" activeClassName="active">卒業判定</Link>
              }
            </li>
            <li className="nav-item">
              { !this.state.count ?
              <Link className="nav-link disabled" to="">司書資格</Link>:
              <Link className="nav-link" to="/librarian" activeClassName="active">司書資格</Link>
              }
            </li>
            <li className="nav-item">
              { !this.state.count ?
                <Link className="nav-link disabled" to="">履修科目一覧</Link>:
                <Link className="nav-link" to="/records" activeClassName="active">履修科目一覧</Link>
              }
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" activeClassName="active">アプリについて</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  },

  _onChange: function() {
    this.setState(getRecordState());
  }
});

module.exports = Navbar;
