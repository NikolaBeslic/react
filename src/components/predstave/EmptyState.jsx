import Link from "next/link";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faCommentDots,
    faInbox,
} from "@fortawesome/free-regular-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
    listCheck: faListCheck,
    eye: faEye,
    comment: faCommentDots,
    inbox: faInbox,
};

const EmptyState = ({
    icon = "inbox",
    title,
    text,
    buttonText,
    href = "/",
    onClick,
    className = "",
}) => {
    const selectedIcon = iconMap[icon] || faInbox;

    return (
        <div className={`empty-state ${className}`}>
            <div className="empty-state__icon">
                <FontAwesomeIcon icon={selectedIcon} />
            </div>

            <h3 className="empty-state__title">{title}</h3>

            {text ? <p className="empty-state__text">{text}</p> : null}

            {onClick ? (
                <Button variant="primary" onClick={onClick}>
                    {buttonText}
                </Button>
            ) : (
                <Link href={href} passHref legacyBehavior>
                    <Button variant="primary">{buttonText}</Button>
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
