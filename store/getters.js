export default {
    getOnlineClasses: (state) => {
        return state.liveClasses
    },
    getNotifications: (state) => {
        return state.notifications
    },
    getSkipTourSettingsValue: (state) => {
        return state.skipTourNextTime
    }
}