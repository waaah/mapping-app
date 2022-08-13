export const getLocation = async ()=> {
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            resolve({lat, lng});
        }, (error)=> {
            reject(error);
        });
    })
}

