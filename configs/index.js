module.exports = {
    HOST: 'localhost',
    ROOM_OPTIONS: [
        'speed',
        'maxPlayers',
        'privacy',
        'mode',
    ],
    DEFAULT_ROOM_OPTIONS: {
        speed: 1000,
        maxPlayers: 1,
        privacy: 'public',
        mode: 'single',
    },
    MAX_PLAYERS: 10,
    MIN_PLAYERS: 2,
    MODE_SINGLE: 'single',
    PLAYGROUND_HEIGHT: 20,
    PLAYGROUND_WIDTH: 10,
    COLORS: [1, 2, 3, 4, 5],
    COLOR_BLOCKED_LINE: 6,
    MOVE_DOWN: 40,
    MOVE_UP: 38,
    MOVE_LEFT: 37,
    MOVE_RIGHT: 39,
    MOVE_DEEP_DOWN: 32,
    HTML_ENTITIES: {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    },
    MIN_SPEED: 200,
    MAX_SPEED: 1500,
    ORIGIN: 'http://localhost:3001'
}
