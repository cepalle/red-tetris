import * as React from 'react';
import {InfoPanel} from './info-panel';
import {GridPlayer} from './grid-player';
import {Opponents} from './opponents';
import {IState} from '../reducers/reducer';
import {Dispatch} from 'redux';
import {ReduxAction} from '../actions/action-creators';
import {connect} from 'react-redux';
import {IMatch} from '@src/client/util/IMatch';

const mapStateToProps = (state: IState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => {
  return {};
};

interface IProps {
  match: IMatch
}

interface IStateComponent {
}

class TetrisGameComponent extends React.Component<IProps, IStateComponent> {
  public componentDidMount() {
    const {params} = this.props.match;
    const roomName = params.get('roomName');
    const playerName = params.get('playerName');
    // TODO use midelware
  }

  public componentWillUnmount() {
    // TODO
  }

  public render(): React.ReactNode {
    return (
      <div className={'column'}>
        <div className={'row center'}>
          <div className={'row color8 pad'}>
            <InfoPanel/>
            <GridPlayer/>
          </div>
        </div>
        <Opponents/>
      </div>
    );
  }
}

const TetrisGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TetrisGameComponent);

export {TetrisGame};
