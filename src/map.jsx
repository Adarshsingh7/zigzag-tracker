/** @format */

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const GoogleMap = () => {
	const [pos, setPos] = useState({ lat: 26.3449, lng: 80.4527 });
	const mapRef = useRef(null);
	const [mapLoaded, setMapLoaded] = useState(false);
	const [tileLoaded, setTileLoaded] = useState(false);
	const [reloadKey, setReloadKey] = useState(0);
	const timeoutRef = useRef(null);
	const [apiLocation, setApiLocation] = useState(null);

	const handleMapLoad = () => {
		setMapLoaded(true);
	};

	const handleMapError = (error) => {
		console.error('Error loading Google Maps API:', error);
		setMapLoaded(false);
	};

	useEffect(() => {
		if (!mapLoaded || (mapLoaded && !tileLoaded)) {
			timeoutRef.current = setTimeout(() => {
				setReloadKey((prevKey) => prevKey + 1);
			}, 1000);
		} else if (mapLoaded && tileLoaded) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [mapLoaded, tileLoaded]);

	const fetchApiLocation = async () => {
		console.log('fetching api location');
		try {
			const response = await axios.get(
				'https://hammerhead-app-l8u9y.ondigitalocean.app/api/1'
			);
			const { latitude: lat, longitude: lng } = response.data.user;
			setApiLocation({ lat, lng });
		} catch (error) {
			console.error('Error fetching API location:', error);
		}
	};

	useEffect(() => {
		const timerInterval = setInterval(fetchApiLocation, 5000);
		return () => clearInterval(timerInterval);
	}, []);

	return (
		<APIProvider
			apiKey={import.meta.env.VITE_REACT_MAP_KEY}
			onLoad={handleMapLoad}
			onError={handleMapError}
		>
			{mapLoaded ? (
				<Map
					key={reloadKey}
					defaultZoom={13}
					defaultCenter={pos}
					disableDefaultUI={true}
					onTilesLoaded={(tile) => {
						mapRef.current = tile.map;
						setTileLoaded(true);
					}}
					fullscreenControl={true}
					zoomControl={true}
					style={{ height: '80vh', width: '80vw' }}
					mapId='da37f3254c6a6d1c'
				>
					{/* {tileLoaded && <Direction mapRef={mapRef} />} */}
					{apiLocation && (
						<Marker
							icon=''
							label={{
								text: '🚍',
								fontSize: '20px',
							}}
							position={apiLocation}
						/>
					)}
				</Map>
			) : (
				<div className='flex justify-center items-center'>
					<div className='spinner'></div>
				</div>
			)}
		</APIProvider>
	);
};
export default GoogleMap;
