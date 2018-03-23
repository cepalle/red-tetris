import React from "react";
import {connect} from 'react-redux';
import {getPiece} from "../../common/pieces"

const PreviewFlowComponent = ({pieceFlow}) =>
  <div className="column">
    {pieceFlow.map((p, i) => {
        if (i > 0 && i < 4) {
          let pieceDscr = getPiece(p.num, p.rot);
          return <div key={i} className="row center">
            <div className="column pad">
              {pieceDscr.map((l, j) =>
                <div key={j} className="row">
                  {l.map((el, k) => <div key={k} className={"casePlayer + color" + el}/>)}
                </div>
              )}
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
