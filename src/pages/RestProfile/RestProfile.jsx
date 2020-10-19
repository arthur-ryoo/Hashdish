import React from 'react';
import { Redirect } from 'react-router-dom';
import UpdateHours from '../../components/UpdateHours/UpdateHours';
import UpdatePhoto from '../../components/UpdatePhoto/UpdatePhoto';
import styles from './RestProfile.module.css';

function profileTime(timeArr) {
    let timeStringArr = []
    for(var time of timeArr) {
        var start = [String((Math.floor(time[0] / 100) % 12 === 0) ? 12 : Math.floor(time[0] / 100) % 12),":",('0' + String(time[0] % 100)).slice(-2), (time[0] / 100 >= 12) ? ' PM' : ' AM'].join("")
        var end = [String((Math.floor(time[1] / 100) % 12 === 0) ? 12 : Math.floor(time[1] / 100) % 12),":",('0' + String(time[1] % 100)).slice(-2), (time[0] / 100 >= 12) ? ' PM' : ' AM'].join("")
        timeStringArr.push(`${start} ~ ${end}`)
    }
    return timeStringArr.join(', ')
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const Profile = (props) => {
    return(
        <div>
            {props.myKitchen === null ?  <Redirect to="/" />
            :
            <section className={styles.container}>
                {props.editProfPhoto ? 
                    <UpdatePhoto
                        handleFormToggle={props.handleFormToggle}
                        handleGetKitchen={props.handleGetKitchen}
                        handleClick={props.handleClick}
                    />
                    :
                    <div className={styles.logo}>
                        <img src={`https://homecookimages.blob.core.windows.net/pictures/${props.myKitchen.pictureKey}.jpg`} alt="restaurant logo"/>
                        <div className={styles.edit}>
                            <button id="editProfPhoto" onClick={props.handleClick}>Edit</button>
                        </div>
                    </div>
                }
                    <div className={styles.infocont}>
                        <div className={styles.title}>
                            <h1>{props.myKitchen.name}</h1>
                            <h2>{props.myKitchen.address}</h2>
                            <h2>{props.myKitchen.phoneNumber}</h2>
                        </div>
                    {props.editHours ? 
                        <UpdateHours
                            openHours={props.openHours} 
                            handleClick={props.handleClick}
                            handleFormToggle={props.handleFormToggle}
                        />
                        :
                        <div className={styles.info}>
                            {DAYS.map((DAY, idx) => 
                                <p key={idx}>{DAY}: {props.openHours[idx]?.length > 0 ? `${profileTime(props.openHours[idx])}` : "Closed"}</p>
                            )}
                            <div className={styles.edit}>
                                <button id="editHours" onClick={props.handleClick}>Edit</button>
                            </div>
                        </div>
                    
                    }
                    </div>
            </section>
            }
        </div>
    )
}

export default Profile;