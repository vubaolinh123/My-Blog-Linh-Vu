export const formatDate = (time: string)=>{
    const dateFormat =  new Date(time).toLocaleTimeString("en-GB", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    return dateFormat.slice(0, 11)
}

export const formatDateTime = (time: string)=>{
    const dateFormat =  new Date(time).toLocaleTimeString("en-GB", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    return dateFormat.slice(0, 17)
}