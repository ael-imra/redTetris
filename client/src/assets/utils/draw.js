export const draw = (data, oldArena, color = 1) => {
	if (data && data.map)
		for (const map of data.map) {
			if (map && map.y < 20 && map.y >= 0 && map.x >= 0 && map.x < 10 && oldArena[map.y] && oldArena[map.y][map.x] === 0) oldArena[map.y][map.x] = color;
		}
	return JSON.parse(JSON.stringify(oldArena));
};
