import React from 'react';
import { connect } from 'react-redux';
import ItemJoin from '../components/ItemJoin';

const ListRooms = ({ listRooms, socket }) => {
	return (
		<div>
			{listRooms.map((item, key) => (
				<ItemJoin
					text={item.name}
					range={item.maxPlayer}
					type={item.type}
					num={item.countPlayer}
					onclick={() => {
						socket.emit('join room', item.name);
					}}
					key={key}
				/>
			))}
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		listRooms: state.rooms.list,
		socket: state.socket,
	};
};
export default connect(mapStateToProps)(ListRooms);
