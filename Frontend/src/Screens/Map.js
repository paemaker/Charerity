import axios from 'axios';
import React from 'react';
import LoadingScreen from '../Components/LoadingScreen';
import { LoadScript, GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import { USER_ADDRESS_MAP_CONFIRM } from '../Components/Redux/Constants/AllConstants';
const libs = ['places'];
const defaultLocation = { lat: 16.474661202882587, lng: 102.82284637479385 };

export default function Map() {
    const [googleApiKey, setGoogleApiKey] = React.useState('');
    const [center, setCenter] = React.useState(defaultLocation);
    const [location, setLocation] = React.useState(center);
    const dispatch = useDispatch();

    const mapRef = React.useRef(null);
    const placeRef = React.useRef(null);
    const markerRef = React.useRef(null);

    const onLoad = (map) => {
        mapRef.current = map;
    };

    const onMarkerLoad = (marker) => {
        markerRef.current = marker;
    };

    const onLoadPlace = (place) => {
        placeRef.current = place;
    };

    const onIdle = () => {
        setLocation({
            lat: mapRef.current.lat(),
            lng: mapRef.current.lng(),
        });
    };

    const onPlaceChanged = () => {
        const place = placeRef.current.getPlaces()[0].geometry.location;
        setCenter({
            lat: place.lat(),
            lng: place.lng()
        });
        setLocation({
            lat: place.lat(),
            lng: place.lng()
        })
    };

    const onConfirm = () => {
        const places = placeRef.current.getPlaces();
        if(places && places.length === 1) {
            dispatch({
                type: USER_ADDRESS_MAP_CONFIRM,
                payload: {
                    lat: location.lat,
                    lng: location.lng,
                    address: places[0].formatted_address,
                    name: places[0].name,
                    vicinity: places[0].vicinity,
                    googleAddressId: places[0].id,
                },
            });

            alert('เลือกตำแหน่งสำเร็จ');
        } else {
            alert('โปรดใส่ที่อยู่ของคุณ');
        }
    }

    const getUserCurrentLoation = () => {
        if(!navigator.geolocation) {
            alert('แผนที่ไม่รองรับตำแหน่งของคุณ');
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: place.coords.latitude(),
                    lng: place.coords.longtitude()
                });
                setLocation({
                    lat: place.coords.latitude(),
                    lng: place.coords.longtitude()
                });
            })
        }
    };

    React.useEffect(() => {
        const Fetching = async () => {
            const { data } = await axios.get('api/config/google');
            setGoogleApiKey(data);
            getUserCurrentLoation();
        };
        Fetching();
    }, []);

    return googleApiKey ? (
            <React.Fragment>
                <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}></LoadScript>
                
                <GoogleMap>

                </GoogleMap>
                
            </React.Fragment>
    ) : <LoadingScreen />
}
