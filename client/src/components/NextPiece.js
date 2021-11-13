import React from 'react';
import { connect } from 'react-redux';
import types from '../store/actions';
import Piece from './Piece';

const NextPiece = ({ nextPiece, initNextPieceAction, nextPieceAction }) => {
	React.useEffect(() => {
		initNextPieceAction();
	}, []);
	return (
		<div className='arena arena__next-piece arena__center'>
			{nextPiece.length === 0 ? '' : nextPiece.map((line, key) => line.map((item, key) => <Piece value={item} key={key} />))}
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		nextPiece: state.nextPiece,
	};
};
export default connect(mapStateToProps, { initNextPieceAction: types.initNextPiece, nextPieceAction: types.nextPiece })(NextPiece);
