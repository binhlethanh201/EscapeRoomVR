const Session = require("../app/models/session");
const Room3 = require("../app/models/room3");
const Room1 = require("../app/models/room1");
const Room2 = require("../app/models/room2");

async function saveSession(req, room, type, name, data = {}) {
    const userId = req.session.userId;
    if (!userId) return;

    let session = await Session.findOne({ userId });
    if (!session) {
        session = new Session({
            _id: `session_${userId}_${new Date().getTime()}`,
            userId,
            gameData: {
                progress: {
                    roomsUnlocked: [room],
                    roomsCompleted: [],
                },
                roomProgress: {
                    room1: createEmptyRoomProgress(),
                    room2: createEmptyRoomProgress(),
                    room3: createEmptyRoomProgress(),
                },
                totalCluesFound: 0,
            },
        });
    }

    // 🔧 BỔ SUNG: cập nhật roomsUnlocked nếu chưa có phòng hiện tại
    if (!session.gameData.progress.roomsUnlocked.includes(room)) {
        session.gameData.progress.roomsUnlocked.push(room);
        session.markModified("gameData.progress.roomsUnlocked");
    }

    if (!session.gameData.roomProgress[room]) {
        session.gameData.roomProgress[room] = createEmptyRoomProgress();
    }

    const roomProgress = session.gameData.roomProgress[room];
    roomProgress.attempts += 1;
    session.markModified(`gameData.roomProgress.${room}.attempts`);

    if (!roomProgress.hotspotProgress) {
        roomProgress.hotspotProgress = {};
    }

    if (!roomProgress.hotspotProgress[name]) {
        roomProgress.hotspotProgress[name] = [];
    }

    roomProgress.hotspotProgress[name].push({
        interactedAt: new Date(),
        type,
        data,
    });

    const roomModelMap = {
        room3: Room3,
        room1: Room1,
        room2: Room2,
    };

    const RoomModel = roomModelMap[room];
    if (RoomModel) {
        const roomData = await RoomModel.findById(room);
        const hotspot = roomData?.hotspots?.[name];
        const clueId = hotspot?.clue;
        if (clueId && !roomProgress.cluesFound.includes(clueId)) {
            roomProgress.cluesFound.push(clueId);
            session.gameData.totalCluesFound += 1;
        }
    }

    roomProgress.lastVisited = new Date();
    session.markModified("gameData.roomProgress." + room + ".hotspotProgress");

    if (data.isCompleted === true) {
        if (!session.gameData.progress.roomsCompleted.includes(room)) {
            session.gameData.progress.roomsCompleted.push(room);
            session.markModified("gameData.progress.roomsCompleted");
        }
        session.gameData.roomProgress[room].isCompleted = true;
    }

    await session.save();
}

function createEmptyRoomProgress() {
    return {
        status: "available",
        attempts: 0,
        cluesFound: [],
        hotspotProgress: {},
        lastVisited: null,
        isCompleted: false,
    };
}

module.exports = saveSession;
