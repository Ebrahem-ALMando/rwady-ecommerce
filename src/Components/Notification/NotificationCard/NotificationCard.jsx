import NotificationHeader from "@/Components/Notification/NotificationCard/NotificationHeader/NotificationHeader";
import NotificationContent from "@/Components/Notification/NotificationCard/NotificationContent/NotificationContent";
const NotificationCard=(props)=>{
    return(
        <>
            <NotificationHeader
                title={props.title}
                time={props.time}
            />
            <NotificationContent
                color={props.color}
                text={props.text}
                isAnyDetails={props.isAnyDetails}
            />
        </>
    )
}
export default NotificationCard