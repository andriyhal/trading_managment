import {parseISO, format} from 'date-fns';
import {styles} from "../styles/styles";

export default function Time ({dateString}) {
    const time = parseISO(dateString);

    return (
        dateString ?
            <time style={styles.time} dateTime={dateString}>{format(time, 'HH:mm:ss dd.LL.yy ')}</time>
            : ""
    )
}