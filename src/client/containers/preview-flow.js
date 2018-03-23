import React from "react";
import {connect} from 'react-redux';
import {PIECES_NUM} from "../../common/pieces"
import {clonePiece} from "../util/clone-handler";
import {placePiece} from "../util/grid-piece-handler";

const PreviewFlowComponent = ({pieceFlow}) => {

  const piecesRender = pieceFlow.filter((e, i) => i > 0 && i < 4);

  let gridRender = [];

  gridRender.push(Array(4 + 2).fill(PIECES_NUM.wall));
  for (let i = 0; i < 3; i++) {
    gridRender.push([PIECES_NUM.wall, ...(Array(4).fill(PIECES_NUM.empty)), PIECES_NUM.wall]);
    gridRender.push([PIECES_NUM.wall, ...(Array(4).fill(PIECES_NUM.empty)), PIECES_NUM.wall]);
    gridRender.push([PIECES_NUM.wall, ...(Array(4).fill(PIECES_NUM.empty)), PIECES_NUM.wall]);
    gridRender.push([PIECES_NUM.wall, ...(Array(4).fill(PIECES_NUM.empty)), PIECES_NUM.wall]);
    gridRender.push(Array(4 + 2).fill(PIECES_NUM.wall));
  }

  for (let i = 0; i < piecesRender.length; i++) {
    const pieceCp = clonePiece(piecesRender[i]);
    pieceCp.pos.x = 1;
    pieceCp.pos.y = 1 + i * 5;
    gridRender = placePiece(gridRender, pieceCp);
  }

  return <div className="row center">
    <div className="column pad">
      {gridRender.map((l, j) =>
        <div key={j} className="row">
          {l.map((el, k) => {
            let geo = "casePlayer";
            if ((k === 0 || k === 5) && (j === 0 || j === 15 || j === 5 || j === 10)) {
              geo = "caseHalf";
            } else if (k === 0 || k === 5) {
              geo = "caseHalfWidth";
            } else if (j === 0 || j === 15 || j === 5 || j === 10) {
              geo = "caseHalfHeight";
            }
            return <div key={k} className={geo + " color" + el}/>;
          })}
        </div>
      )}
    </div>
  </div>;
};

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
