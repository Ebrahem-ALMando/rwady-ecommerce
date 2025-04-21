import NotificationHeader from "@/Components/Notification/NotificationCard/NotificationHeader/NotificationHeader";
import NotificationContent from "@/Components/Notification/NotificationCard/NotificationContent/NotificationContent";

const NotificationCard = ({ title, time, color, text, isAnyDetails = false }) => {
    return (
        <>
            <NotificationHeader title={title} time={time} />
            <NotificationContent color={color} text={text} isAnyDetails={isAnyDetails} />
        </>
    );
};

export default NotificationCard;
