function stringToColor(str) {
    let hash = 0;
    if (!str) str = "test";
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
        "#e57373",
        "#64b5f6",
        "#81c784",
        "#ffb74d",
        "#ba68c8",
        "#4db6ac",
        "#f06292",
        "#7986cb",
    ];

    return colors[Math.abs(hash) % colors.length];
}

function getInitials(name = "") {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function UserAvatar({ name, size = 36 }) {
    const initials = getInitials(name);
    const bgColor = stringToColor(name);

    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: bgColor,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: size * 0.4,
                userSelect: "none",
            }}
        >
            {initials}
        </div>
    );
}
