import React from "react";
import {connect} from 'react-redux';
import {getColorNum} from "../util/css-handler";
import {getPiece} from "../../common/pieces"

const PreviewFlowComponent = ({pieceFlow}) =>
  <div className="column">
    {pieceFlow.map((p, i) => {
        if (i > 0 && i < 4) {
          let pieceDscr = getPiece(p.num, p.rot);
          return <div key={i} className="row center">
            <div className="column pad">
              {
                pieceDscr.map((l, j) =>
                  <div key={j} className="row">
                    {
                      l.map((el, k) => {
                        let cssClass = "color" + getColorNum(el);
                        cssClass += (el > 0 ? " casePiece" : " case");
                        return <div key={k} className={cssClass}/>;
                      })
                    }
                  </div>
                )
              }
            </div>
          </div>;
        }
      }
    )}
  </div>
;

const mapStateToProps = state => {
  return {
    pieceFlow: state.piecesFlow.map(e => e),
  }
};

const PreviewFlow = connect(
  mapStateToProps,
  undefined
)(PreviewFlowComponent);

export {PreviewFlow};
