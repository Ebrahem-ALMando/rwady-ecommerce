import NotificationHeader from "@/Components/Notification/NotificationCard/NotificationHeader/NotificationHeader";
import NotificationContent from "@/Components/Notification/NotificationCard/NotificationContent/NotificationContent";

const NotificationCard =
    ({ orderId=null,
         title,
         time,
         color,
         text,
         isAnyDetails = false ,
         lang,
    }) => {
    return (
        <>
            <NotificationHeader title={title} time={time} />
            <NotificationContent
                orderId={orderId}
                color={color}
                text={text}
                isAnyDetails={isAnyDetails}
                lang={lang}
            />
        </>
    );
};

export default NotificationCard;
