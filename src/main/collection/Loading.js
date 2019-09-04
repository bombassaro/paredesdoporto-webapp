import React from 'react';
class Component extends React.Component{
  render() {
    let dpto = "PAREDES DO PORTO"
    return ( 
      <div className="">
        <div className="topbar-fixed">
          <div className="topbar">
            <div className="topbar-cont">
              <p className="left-icon">
                <button>
                  <i className="material-icons">clear_all</i>
                </button>
              </p>
              <p className="title">{dpto}</p>
              <p className="right-icon">
                <button>
                  <i className="material-icons">clear_all</i>
                </button>
              </p>
            </div>
          </div>
          <div className="breadcrumb"></div>
        </div>
        <div className="board-cont">
          <div className="board-body">
            <div className="loader08"></div>
          </div>
        </div>
      </div>
    )
  }
}
export default Component;