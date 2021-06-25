import copyImg from '../assets/copy.svg';

import '../styles/roomCode.scss';

type RoomCodeProps = {
    code: string;
}

function RoomCode(props: RoomCodeProps) {
    function copyRoomCode() {
        navigator.clipboard.writeText(props.code);
    }

    return (
        <button className="room-code" onClick={copyRoomCode}>
            <div>
                <img src={copyImg} alt="Copiar código da sala" />
            </div>
            <span>
                Sala #{props.code}
            </span>
        </button>
    )
}

export default RoomCode;